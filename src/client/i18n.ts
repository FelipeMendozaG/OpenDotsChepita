import { useSyncExternalStore } from 'react';

export type Language = 'en' | 'es';
export type LanguagePreference = 'system' | 'en' | 'es';

const STORAGE_KEY = 'opendots-language';
let chosenPreference: LanguagePreference | undefined;
const listeners = new Set<() => void>();

export const translations = {
  en: {
    // Actions & Common
    save: 'Save',
    cancel: 'Cancel',
    delete: 'Delete',
    close: 'Close',
    create: 'Create',
    edit: 'Edit',
    back: 'Back',
    loading: 'Loading...',
    retry: 'Retry',
    search: 'Search',
    name: 'Name',
    description: 'Description',
    status: 'Status',
    system: 'System',
    title: 'Title',
    none: 'None',
    enabled: 'Enabled',
    disabled: 'Disabled',

    // Settings
    settings: 'Settings',
    appearance: 'Appearance',
    appearanceHint: 'Saved in this browser. System follows your device.',
    themeLight: 'Light',
    themeDark: 'Dark',
    themeSystem: 'System',
    language: 'Language',
    languageHint: 'Saved in this browser. Controls interface labels.',
    languageEn: 'English',
    languageEs: 'Español',
    languageSystem: 'System',
    serviceSetup: 'Service setup',
    configured: 'Configured',
    missing: 'Missing',

    // Navigation & Spaces
    spaces: 'Spaces',
    newSpace: 'New Space',
    editSpace: 'Edit Space',
    deleteSpace: 'Delete Space',
    library: 'Library',
    pages: 'Pages',
    newPage: 'New page',
    subpages: 'Subpages',
    untitled: 'Untitled',
    recent: 'Recent',
    newChat: 'New chat',
    createDot: 'Create Dot',
    createSpace: 'Create Space',
    scheduledAndActivity: 'Scheduled & activity',
    settingsAndSetup: 'Settings & setup',
    makeItYourOwn: 'Make it your own',
    unlockOpenDots: 'Unlock OpenDots',
    findingDots: 'Finding your dots…',
    noPagesYet: 'No pages yet',
    pageNotFound: 'Page not found',
    loadingPage: 'Loading page…',
    backToAllPages: 'Back to all pages',
    untitledPage: 'Untitled page',

    // Dots
    dots: 'Dots',
    newDot: 'New Dot',
    editDot: 'Edit Dot',
    deleteDot: 'Delete Dot',
    dotRole: 'Role / Instructions',
    instructions: 'Instructions',
    permittedTools: 'Permitted tools',
    research: 'Web research',
    memory: 'Memory',
    computerAccess: 'Computer access',
    defaultSpace: 'Default space',
    accessibleSpaces: 'Accessible spaces',

    // Chat, Calls & Timeline
    chat: 'Chat',
    chatPlaceholder: 'Message your Dot...',
    call: 'Call',
    endCall: 'End call',
    mute: 'Mute',
    unmute: 'Unmute',
    liveTimer: 'Call in progress',
    connecting: 'Connecting...',

    // Computer
    computer: 'Computer',
    browser: 'Browser',
    terminal: 'Terminal',
    files: 'Files',
    takeover: 'Take over',
    releaseTakeover: 'Release control',

    // Modal Titles
    titleSpace: 'A space for something.',
    titleEditDot: 'Make this Dot yours.',
    titleNewDot: 'Meet your next specialist.',
    titleSettings: 'Your workspace, your rules.',
    titleMemory: 'Something to remember.',
    titleSchedule: 'Let your Dot keep time.',

    // Dot & Space Dialog Fields
    fieldRoleInstructions: 'Role instructions',
    fieldWhatBelongsHere: 'What belongs here?',
    fieldPreferenceOrContext: 'Preference or context',
    fieldTaskToRevisit: 'Task to revisit',
    dotPlaceholder:
      'You are a thoughtful research partner. Compare evidence and be clear about uncertainty.',
    spaceAccess: 'Space access',
    spaceAccessHint: 'Choose where this Dot can read and edit pages.',
    defaultSpaceDestination: 'Default destination for saved pages',
    chooseASpace: 'Choose a Space',
    publicPageResearch: 'Public-page research',
    publicPageResearchHint:
      'Allow the server-side read-only browser tool. Global settings always take precedence.',
    useSavedMemories: 'Use saved memories',
    useSavedMemoriesHint:
      'Include your preferences in new turns. Changing permission stops active work.',
    automaticLearning: 'Automatic Learning',
    learningContainerId: 'Learning container ID',
    learningHelp:
      'Create this container in your Intelligence project first. New conversations will contribute evidence to it. Leave blank to keep new conversations out of Learning. Existing conversations retain their original assignment.',
    usePublishedSkills: 'Use published skills',
    usePublishedSkillsHint:
      'Load reviewed skills from each conversation’s assigned container. Enable delivery in Intelligence too. Turning this off stops skill loading; it does not stop evidence collection.',
    setupLearningLink: 'Set up Learning and review skills ↗',
    repeatAfterRun: 'Repeat after each successful run',
    repeatEveryMinute: 'Every minute (testing)',
    repeatEveryHour: 'Every hour',
    repeatEveryDay: 'Every day',
    repeatEveryWeek: 'Every week',
    scheduleHint:
      'Runs on the server in this same conversation, even with the tab closed. Failed or interrupted runs wait for manual retry. Review completed work before retrying an interrupted run.',
    memoryHint:
      'Memories are explicit preferences, not automatic learning. Avoid secrets; enabled memories go to your model provider.',
    couldNotSave: 'Could not save. Review the workspace error and retry.',

    // Connections (MCP)
    connections: 'Connections',
    connectionsHint:
      'Give this Dot tools from MCP servers. Read-only tools run on their own; anything else asks you in chat before it runs. Tokens stay on the server.',
    tokenSaved: 'token saved',
    readOnly: 'read-only',
    askFirst: 'Ask first',
    addMcpServer: 'Add an MCP server',
    mcpNamePlaceholder: 'Name, e.g. GitHub',
    mcpUrlPlaceholder: 'https://example.com/mcp',
    mcpTokenPlaceholder: 'Bearer token (optional)',
    connect: 'Connect',
    connectingStatus: 'Connecting…',
    noToolsOffered: 'This server offers no tools.',
    removeConnectionConfirm: 'Remove {name} from this Dot?',
  },
  es: {
    // Actions & Common
    save: 'Guardar',
    cancel: 'Cancelar',
    delete: 'Eliminar',
    close: 'Cerrar',
    create: 'Crear',
    edit: 'Editar',
    back: 'Atrás',
    loading: 'Cargando...',
    retry: 'Reintentar',
    search: 'Buscar',
    name: 'Nombre',
    description: 'Descripción',
    status: 'Estado',
    system: 'Sistema',
    title: 'Título',
    none: 'Ninguno',
    enabled: 'Activado',
    disabled: 'Desactivado',

    // Settings
    settings: 'Configuración',
    appearance: 'Apariencia',
    appearanceHint:
      'Guardado en este navegador. Sistema sigue a tu dispositivo.',
    themeLight: 'Claro',
    themeDark: 'Oscuro',
    themeSystem: 'Sistema',
    language: 'Idioma',
    languageHint:
      'Guardado en este navegador. Define los textos de la interfaz.',
    languageEn: 'English',
    languageEs: 'Español',
    languageSystem: 'Sistema',
    serviceSetup: 'Configuración de servicios',
    configured: 'Configurado',
    missing: 'Faltante',

    // Navigation & Spaces
    spaces: 'Espacios',
    newSpace: 'Nuevo Espacio',
    editSpace: 'Editar Espacio',
    deleteSpace: 'Eliminar Espacio',
    library: 'Biblioteca',
    pages: 'Páginas',
    newPage: 'Nueva página',
    subpages: 'Subpáginas',
    untitled: 'Sin título',
    recent: 'Reciente',
    newChat: 'Nuevo chat',
    createDot: 'Crear Dot',
    createSpace: 'Crear Espacio',
    scheduledAndActivity: 'Programado y actividad',
    settingsAndSetup: 'Configuración',
    makeItYourOwn: 'Personalízalo',
    unlockOpenDots: 'Desbloquear OpenDots',
    findingDots: 'Buscando tus dots…',
    noPagesYet: 'Aún no hay páginas',
    pageNotFound: 'Página no encontrada',
    loadingPage: 'Cargando página…',
    backToAllPages: 'Volver a todas las páginas',
    untitledPage: 'Página sin título',

    // Dots
    dots: 'Dots',
    newDot: 'Nuevo Dot',
    editDot: 'Editar Dot',
    deleteDot: 'Eliminar Dot',
    dotRole: 'Rol / Instrucciones',
    instructions: 'Instrucciones',
    permittedTools: 'Herramientas permitidas',
    research: 'Investigación web',
    memory: 'Memoria',
    computerAccess: 'Acceso a computadora',
    defaultSpace: 'Espacio por defecto',
    accessibleSpaces: 'Espacios accesibles',

    // Chat, Calls & Timeline
    chat: 'Chat',
    chatPlaceholder: 'Envía un mensaje a tu Dot...',
    call: 'Llamar',
    endCall: 'Finalizar llamada',
    mute: 'Silenciar',
    unmute: 'Activar sonido',
    liveTimer: 'Llamada en curso',
    connecting: 'Conectando...',

    // Computer
    computer: 'Computadora',
    browser: 'Navegador',
    terminal: 'Terminal',
    files: 'Archivos',
    takeover: 'Tomar control',
    releaseTakeover: 'Liberar control',

    // Modal Titles
    titleSpace: 'Un espacio para algo.',
    titleEditDot: 'Personaliza este Dot.',
    titleNewDot: 'Conoce a tu nuevo especialista.',
    titleSettings: 'Tu espacio de trabajo, tus reglas.',
    titleMemory: 'Algo para recordar.',
    titleSchedule: 'Deja que tu Dot gestione el tiempo.',

    // Dot & Space Dialog Fields
    fieldRoleInstructions: 'Instrucciones del rol',
    fieldWhatBelongsHere: '¿Qué pertenece aquí?',
    fieldPreferenceOrContext: 'Preferencia o contexto',
    fieldTaskToRevisit: 'Tarea para revisar',
    dotPlaceholder:
      'Eres un compañero de investigación reflexivo. Compara la evidencia y sé claro ante la incertidumbre.',
    spaceAccess: 'Acceso a espacios',
    spaceAccessHint: 'Elige dónde puede este Dot leer y editar páginas.',
    defaultSpaceDestination: 'Destino predeterminado para páginas guardadas',
    chooseASpace: 'Elige un Espacio',
    publicPageResearch: 'Investigación en páginas públicas',
    publicPageResearchHint:
      'Permite la herramienta de navegador de solo lectura en el servidor. La configuración global siempre tiene prioridad.',
    useSavedMemories: 'Usar memorias guardadas',
    useSavedMemoriesHint:
      'Incluye tus preferencias en nuevos turnos. Cambiar los permisos detiene el trabajo activo.',
    automaticLearning: 'Aprendizaje Automático',
    learningContainerId: 'ID de contenedor de aprendizaje',
    learningHelp:
      'Crea este contenedor primero en tu proyecto de Intelligence. Las nuevas conversaciones aportarán evidencias a este. Déjalo en blanco para mantener las nuevas conversaciones fuera de Aprendizaje. Las conversaciones existentes conservan su asignación original.',
    usePublishedSkills: 'Usar habilidades publicadas',
    usePublishedSkillsHint:
      'Carga habilidades revisadas del contenedor asignado de cada conversación. Habilita la entrega también en Intelligence. Desactivarlo detiene la carga de habilidades; no detiene la recopilación de evidencia.',
    setupLearningLink: 'Configurar Aprendizaje y revisar habilidades ↗',
    repeatAfterRun: 'Repetir tras cada ejecución exitosa',
    repeatEveryMinute: 'Cada minuto (pruebas)',
    repeatEveryHour: 'Cada hora',
    repeatEveryDay: 'Cada día',
    repeatEveryWeek: 'Cada semana',
    scheduleHint:
      'Se ejecuta en el servidor en esta misma conversación, incluso con la pestaña cerrada. Las ejecuciones fallidas o interrumpidas esperan reintento manual. Revisa el trabajo completado antes de reintentar.',
    memoryHint:
      'Las memorias son preferencias explícitas, no aprendizaje automático. Evita secretos; las memorias habilitadas van a tu proveedor de modelos.',
    couldNotSave:
      'No se pudo guardar. Revisa el error del espacio de trabajo y reintenta.',

    // Connections (MCP)
    connections: 'Conexiones',
    connectionsHint:
      'Dale a este Dot herramientas de servidores MCP. Las herramientas de solo lectura se ejecutan solas; cualquier otra pide confirmación en el chat antes de ejecutarse. Los tokens se mantienen en el servidor.',
    tokenSaved: 'token guardado',
    readOnly: 'solo lectura',
    askFirst: 'Preguntar antes',
    addMcpServer: 'Añadir un servidor MCP',
    mcpNamePlaceholder: 'Nombre, ej. GitHub',
    mcpUrlPlaceholder: 'https://ejemplo.com/mcp',
    mcpTokenPlaceholder: 'Token Bearer (opcional)',
    connect: 'Conectar',
    connectingStatus: 'Conectando…',
    noToolsOffered: 'Este servidor no ofrece herramientas.',
    removeConnectionConfirm: '¿Eliminar {name} de este Dot?',
  },
} as const;

export type TranslationKey = keyof typeof translations.en;

function notify() {
  for (const listener of listeners) {
    listener();
  }
}

function getSystemLanguage(): Language {
  if (typeof window !== 'undefined' && window.navigator) {
    const lang = (window.navigator.language || '').toLowerCase();
    if (lang.startsWith('es')) return 'es';
  }
  return 'en';
}

export function languagePreference(): LanguagePreference {
  if (chosenPreference) return chosenPreference;
  try {
    const value = localStorage.getItem(STORAGE_KEY);
    if (value === 'en' || value === 'es') return value;
  } catch {
    // Fall back to system
  }
  return 'system';
}

export function resolveLanguage(preference: LanguagePreference): Language {
  if (preference === 'system') return getSystemLanguage();
  return preference;
}

export function currentLanguage(): Language {
  return resolveLanguage(languagePreference());
}

export function setLanguagePreference(preference: LanguagePreference) {
  chosenPreference = preference;
  try {
    if (preference === 'system') {
      localStorage.removeItem(STORAGE_KEY);
    } else {
      localStorage.setItem(STORAGE_KEY, preference);
    }
  } catch {
    // Applies for this session only
  }
  notify();
}

export function subscribeLanguage(listener: () => void): () => void {
  listeners.add(listener);
  return () => {
    listeners.delete(listener);
  };
}

export function t(key: TranslationKey, lang?: Language): string {
  const activeLang = lang ?? currentLanguage();
  const dict = translations[activeLang] ?? translations.en;
  return dict[key] ?? translations.en[key] ?? key;
}

export function useLanguage(): Language {
  return useSyncExternalStore(
    subscribeLanguage,
    currentLanguage,
    currentLanguage,
  );
}

export function useLanguagePreference(): LanguagePreference {
  return useSyncExternalStore(
    subscribeLanguage,
    languagePreference,
    languagePreference,
  );
}

export function useTranslation() {
  const language = useLanguage();
  const preference = useLanguagePreference();

  return {
    t: (key: TranslationKey) => t(key, language),
    language,
    preference,
    setLanguagePreference,
  };
}
