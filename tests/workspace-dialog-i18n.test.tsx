import { renderToStaticMarkup } from 'react-dom/server';
import { beforeEach, expect, it, vi } from 'vitest';

const storage = vi.hoisted(() => new Map<string, string>());

vi.mock('../src/client/api', () => ({
  api: vi.fn(),
  token: '',
  setToken: vi.fn(),
}));

vi.stubGlobal('localStorage', {
  getItem: (key: string) => storage.get(key) ?? null,
  setItem: (key: string, value: string) => storage.set(key, value),
  removeItem: (key: string) => storage.delete(key),
});

import { WorkspaceDialog } from '../src/client/WorkspaceDialog';
import { setLanguagePreference } from '../src/client/i18n';
import type { Dot, State, WorkspaceState } from '../src/shared/types';

const mockState: State = {
  settings: {
    name: 'Dot',
    paused: false,
    researchAllowed: true,
    memoryAllowed: true,
  },
  tasks: [],
  memories: [],
  mode: 'live',
  configured: true,
};

const mockDot: Dot = {
  id: 'dot-1',
  name: 'Scout',
  instructions: 'Research partner',
  spaceId: 'space-1',
  spaceIds: ['space-1'],
  researchAllowed: true,
  memoryAllowed: true,
  createdAt: Date.now(),
};

const mockWorkspace: WorkspaceState = {
  spaces: [
    {
      id: 'space-1',
      name: 'Everyday',
      description: 'Default space',
      createdAt: Date.now(),
    },
  ],
  dots: [mockDot],
  conversations: [],
  calls: [],
  setup: {
    intelligence: true,
    model: true,
    browser: true,
    missing: [],
    slack: 'not_configured',
    voice: false,
  },
};

beforeEach(() => {
  storage.clear();
  setLanguagePreference('system');
});

it('renders language selector in settings dialog in English by default', () => {
  setLanguagePreference('en');
  const html = renderToStaticMarkup(
    <WorkspaceDialog
      dialog={{ type: 'settings' }}
      state={mockState}
      workspace={mockWorkspace}
      onClose={() => {}}
      mutate={async () => true}
    />,
  );

  expect(html).toContain('Appearance');
  expect(html).toContain('Language');
  expect(html).toContain('English');
  expect(html).toContain('Español');
  expect(html).toContain('Save');
});

it('renders settings dialog in Spanish when language preference is es', () => {
  setLanguagePreference('es');
  const html = renderToStaticMarkup(
    <WorkspaceDialog
      dialog={{ type: 'settings' }}
      state={mockState}
      workspace={mockWorkspace}
      onClose={() => {}}
      mutate={async () => true}
    />,
  );

  expect(html).toContain('Apariencia');
  expect(html).toContain('Idioma');
  expect(html).toContain('English');
  expect(html).toContain('Español');
  expect(html).toContain('Guardar');
});

it('renders Dot configuration dialog in English', () => {
  setLanguagePreference('en');
  const html = renderToStaticMarkup(
    <WorkspaceDialog
      dialog={{ type: 'dot', dot: mockDot, spaceId: 'space-1' }}
      state={mockState}
      workspace={mockWorkspace}
      onClose={() => {}}
      mutate={async () => true}
    />,
  );

  expect(html).toContain('Make this Dot yours.');
  expect(html).toContain('Name');
  expect(html).toContain('Role instructions');
  expect(html).toContain('Space access');
  expect(html).toContain('Default destination for saved pages');
  expect(html).toContain('Public-page research');
  expect(html).toContain('Use saved memories');
  expect(html).toContain('Automatic Learning');
});

it('renders Dot configuration dialog in Spanish', () => {
  setLanguagePreference('es');
  const html = renderToStaticMarkup(
    <WorkspaceDialog
      dialog={{ type: 'dot', dot: mockDot, spaceId: 'space-1' }}
      state={mockState}
      workspace={mockWorkspace}
      onClose={() => {}}
      mutate={async () => true}
    />,
  );

  expect(html).toContain('Personaliza este Dot.');
  expect(html).toContain('Nombre');
  expect(html).toContain('Instrucciones del rol');
  expect(html).toContain('Acceso a espacios');
  expect(html).toContain('Destino predeterminado para páginas guardadas');
  expect(html).toContain('Investigación en páginas públicas');
  expect(html).toContain('Usar memorias guardadas');
  expect(html).toContain('Aprendizaje Automático');
});
