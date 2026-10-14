// Gemini OpenAI compatibility layer.
// Handles Google Gemini API quirks when accessed via OpenAI-compatible endpoints:
// 1. Thought signatures: Gemini requires `extra_content.google.thought_signature`
//    to be preserved in `tool_calls` on subsequent multi-turn requests.
// 2. Error body normalization: Gemini returns errors as `[{ error: ... }]` instead
//    of `{ error: ... }`, which causes the OpenAI SDK to report `status code (no body)`.

const MAX_SIGNATURES = 500;
const signatures = new Map<string, unknown>();

function rememberSignature(id: string, extraContent: unknown) {
  if (signatures.size >= MAX_SIGNATURES) {
    const firstKey = signatures.keys().next().value;
    if (firstKey !== undefined) signatures.delete(firstKey);
  }
  signatures.set(id, extraContent);
}

export function geminiCompatFetch(
  input: RequestInfo | URL,
  init?: RequestInit,
): Promise<Response> {
  const url =
    typeof input === 'string'
      ? input
      : input instanceof URL
        ? input.toString()
        : input.url;

  const isGemini = url.includes('generativelanguage.googleapis.com');

  let modifiedInit = init;
  if (isGemini && init?.body && typeof init.body === 'string') {
    try {
      const parsed = JSON.parse(init.body) as {
        messages?: Array<{
          role?: string;
          tool_calls?: Array<{ id?: string; extra_content?: unknown }>;
        }>;
      };

      if (Array.isArray(parsed.messages)) {
        let modified = false;
        for (const message of parsed.messages) {
          if (
            message.role === 'assistant' &&
            Array.isArray(message.tool_calls)
          ) {
            for (const toolCall of message.tool_calls) {
              if (
                toolCall.id &&
                !toolCall.extra_content &&
                signatures.has(toolCall.id)
              ) {
                toolCall.extra_content = signatures.get(toolCall.id);
                modified = true;
              }
            }
          }
        }
        if (modified) {
          modifiedInit = {
            ...init,
            body: JSON.stringify(parsed),
          };
        }
      }
    } catch {
      // Ignore JSON parse errors for non-JSON bodies.
    }
  }

  return fetch(input, modifiedInit).then(async (response) => {
    // Gemini returns errors wrapped in an array: `[{ error: ... }]`.
    // The OpenAI SDK parser only recognizes a root object with an `error` key,
    // so unwrapping it allows proper error messages to propagate.
    if (!response.ok && isGemini) {
      try {
        const text = await response.text();
        const json = JSON.parse(text) as unknown;
        if (
          Array.isArray(json) &&
          json.length > 0 &&
          typeof json[0] === 'object' &&
          json[0] !== null &&
          'error' in json[0]
        ) {
          return new Response(JSON.stringify(json[0]), {
            status: response.status,
            statusText: response.statusText,
            headers: response.headers,
          });
        }
        return new Response(text, {
          status: response.status,
          statusText: response.statusText,
          headers: response.headers,
        });
      } catch {
        return response;
      }
    }

    // Capture thought signatures from streaming responses
    if (isGemini && response.body) {
      let buffer = '';
      const transformStream = new TransformStream<Uint8Array, Uint8Array>({
        transform(chunk, controller) {
          try {
            buffer += new TextDecoder().decode(chunk);
            const lines = buffer.split('\n');
            buffer = lines.pop() ?? '';
            for (const line of lines) {
              if (line.startsWith('data: ') && !line.includes('[DONE]')) {
                try {
                  const data = JSON.parse(line.slice(6)) as {
                    choices?: Array<{
                      delta?: {
                        tool_calls?: Array<{
                          id?: string;
                          extra_content?: unknown;
                        }>;
                      };
                    }>;
                  };
                  const toolCalls = data.choices?.[0]?.delta?.tool_calls;
                  if (Array.isArray(toolCalls)) {
                    for (const tc of toolCalls) {
                      if (tc.id && tc.extra_content) {
                        rememberSignature(tc.id, tc.extra_content);
                      }
                    }
                  }
                } catch {
                  // Ignore malformed SSE lines
                }
              }
            }
          } catch {
            // Passthrough chunk if decoding fails
          }
          controller.enqueue(chunk);
        },
        flush() {
          if (buffer.startsWith('data: ') && !buffer.includes('[DONE]')) {
            try {
              const data = JSON.parse(buffer.slice(6)) as {
                choices?: Array<{
                  delta?: {
                    tool_calls?: Array<{
                      id?: string;
                      extra_content?: unknown;
                    }>;
                  };
                }>;
              };
              const toolCalls = data.choices?.[0]?.delta?.tool_calls;
              if (Array.isArray(toolCalls)) {
                for (const tc of toolCalls) {
                  if (tc.id && tc.extra_content) {
                    rememberSignature(tc.id, tc.extra_content);
                  }
                }
              }
            } catch {
              // Ignore malformed flush line
            }
          }
        },
      });

      return new Response(response.body.pipeThrough(transformStream), {
        status: response.status,
        statusText: response.statusText,
        headers: response.headers,
      });
    }

    return response;
  });
}
