import { describe, expect, it, vi } from 'vitest';
import { geminiCompatFetch } from '../src/server/gemini-compat.js';

describe('geminiCompatFetch', () => {
  it('unwraps array error responses into single error object', async () => {
    const errorBody = [
      {
        error: {
          code: 400,
          message: 'Function call is missing a thought_signature',
          status: 'INVALID_ARGUMENT',
        },
      },
    ];

    vi.spyOn(globalThis, 'fetch').mockResolvedValueOnce(
      new Response(JSON.stringify(errorBody), {
        status: 400,
        statusText: 'Bad Request',
        headers: { 'Content-Type': 'application/json' },
      }),
    );

    const res = await geminiCompatFetch(
      'https://generativelanguage.googleapis.com/v1beta/openai/chat/completions',
      {
        method: 'POST',
        body: JSON.stringify({ messages: [] }),
      },
    );

    expect(res.status).toBe(400);
    const data = (await res.json()) as {
      error?: { code?: number; message?: string };
    };
    expect(data).toHaveProperty('error');
    expect(data.error?.message).toBe(
      'Function call is missing a thought_signature',
    );
  });

  it('captures and reinjects thought_signature on subsequent tool calls', async () => {
    const streamChunk =
      'data: {"choices":[{"delta":{"role":"assistant","tool_calls":[{"extra_content":{"google":{"thought_signature":"sig_123"}},"function":{"name":"github__get_me","arguments":"{}"},"id":"call_abc","type":"function"}]}}]}\n\ndata: [DONE]\n\n';

    const encoder = new TextEncoder();
    const stream = new ReadableStream({
      start(controller) {
        controller.enqueue(encoder.encode(streamChunk));
        controller.close();
      },
    });

    vi.spyOn(globalThis, 'fetch').mockResolvedValueOnce(
      new Response(stream, {
        status: 200,
        headers: { 'Content-Type': 'text/event-stream' },
      }),
    );

    const streamRes = await geminiCompatFetch(
      'https://generativelanguage.googleapis.com/v1beta/openai/chat/completions',
      {
        method: 'POST',
        body: JSON.stringify({ messages: [{ role: 'user', content: 'test' }] }),
      },
    );

    // Drain the response stream so the transform stream captures the signature
    const reader = streamRes.body?.getReader();
    if (reader) {
      let done = false;
      while (!done) {
        const result = await reader.read();
        done = result.done;
      }
    }

    let outgoingBody: string | undefined;
    vi.spyOn(globalThis, 'fetch').mockImplementationOnce(
      async (_input, init) => {
        outgoingBody = init?.body as string;
        return new Response('{}', { status: 200 });
      },
    );

    // Second turn request with tool_calls missing extra_content
    await geminiCompatFetch(
      'https://generativelanguage.googleapis.com/v1beta/openai/chat/completions',
      {
        method: 'POST',
        body: JSON.stringify({
          messages: [
            { role: 'user', content: 'test' },
            {
              role: 'assistant',
              tool_calls: [
                {
                  id: 'call_abc',
                  type: 'function',
                  function: { name: 'github__get_me', arguments: '{}' },
                },
              ],
            },
            {
              role: 'tool',
              tool_call_id: 'call_abc',
              content: '{"login":"test"}',
            },
          ],
        }),
      },
    );

    expect(outgoingBody).toBeDefined();
    const parsed = JSON.parse(outgoingBody!) as {
      messages: Array<{
        role: string;
        tool_calls?: Array<{ id: string; extra_content?: unknown }>;
      }>;
    };
    const assistantMsg = parsed.messages.find((m) => m.role === 'assistant');
    expect(assistantMsg?.tool_calls?.[0]?.extra_content).toEqual({
      google: { thought_signature: 'sig_123' },
    });
  });

  it('leaves non-gemini requests unchanged', async () => {
    let capturedBody: string | undefined;
    vi.spyOn(globalThis, 'fetch').mockImplementationOnce(
      async (_input, init) => {
        capturedBody = init?.body as string;
        return new Response('{}', { status: 200 });
      },
    );

    const originalBody = JSON.stringify({
      messages: [
        {
          role: 'assistant',
          tool_calls: [{ id: 'call_unknown', type: 'function' }],
        },
      ],
    });

    await geminiCompatFetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      body: originalBody,
    });

    expect(capturedBody).toBe(originalBody);
  });
});
