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

    // App & Workspace Shell
    unlockTitle: 'Your own little corner.',
    unlockPrompt:
      'Enter the owner access token configured on this template’s server.',
    ownerAccessToken: 'Owner access token',
    tokenNotAccepted: 'Access token was not accepted.',
    tokenSessionStorage: 'The token stays in this tab’s session storage.',
    leaveDraftConfirm: 'Leave your unsaved page draft?',
    couldNotConnect: 'Could not connect to the server.',
    selfHosted: 'SELF-HOSTED',
    setupRequired: 'SETUP REQUIRED',
    resumeAllDots: 'Resume all Dots',
    pauseAllDots: 'Pause all Dots',
    resume: 'Resume',
    pause: 'Pause',
    hideComputer: 'Hide computer',
    showComputer: 'Show computer',
    dismissError: 'Dismiss error',
    allDotsPaused:
      'All Dots are paused. Active compute stops and scheduled tasks wait.',
    openDotsHome: 'OpenDots home',
    expandSidebar: 'Expand sidebar',
    collapseSidebar: 'Collapse sidebar',
    openNavigation: 'Open navigation',
    closeNavigation: 'Close navigation',
    activity: 'Activity',

    // Chat Empty & Setup
    editSpecialist: 'Edit specialist',
    connectYourDot: 'Connect your Dot',
    connectYourDotHint:
      'Connect your model and conversation service in Settings to start chatting. Your Spaces and Dot preferences are ready to use.',
    openSetupGuide: 'Open the setup guide',
    firstConversationHint: 'Your first conversation starts after setup.',
    startAConversation: 'Start a conversation',
    textAndCallsContinuing: 'Text and calls, one continuing conversation',
    startConversation: 'Start conversation',
    starterThinkThrough: 'Help me think this through',
    starterResearchPage: 'Research a public page',
    starterMakePlan: 'Make a plan I can follow',
    setupDetails: 'Setup details',
    setupTextChatToBegin:
      'Set up text chat to begin a persistent conversation.',

    // Memories View
    yourWorkspace: 'YOUR WORKSPACE',
    memoriesSubtitle: 'Preferences you choose to share with your Dots.',
    addMemory: 'Add memory',
    availableToPermittedDots: 'Available to permitted Dots',
    memoryUseDisabled: 'Memory use disabled',
    editMemory: 'Edit memory',
    deleteMemory: 'Delete memory',
    memoriesEmptyTitle: 'A little context goes a long way.',
    memoriesEmptyHint:
      'Add a preference like “Keep my research briefs short.” You can change or remove it anytime.',

    // Tasks & Activity View
    tasksTitle: 'A little follow-through.',
    tasksSubtitle:
      'Scheduled turns run on the server in their original conversation.',
    searchTasks: 'Search tasks',
    findATask: 'Find a task…',
    tasksEmptyTitle: 'Let a thought come back around.',
    tasksEmptyHint:
      'Open a conversation and use the clock button to schedule a server-side task.',
    couldNotSaveGeneric: 'Could not save.',
    newThought: 'A new thought',
    couldNotCreateConversation: 'Could not create the conversation.',
    workspaceNavigation: 'Workspace navigation',
    openActivity: 'Open activity',
    editDotSettings: 'Edit {name} settings',
    openSourceTemplate: 'OPEN SOURCE TEMPLATE',
    showNavigation: 'Show navigation',
    hideNavigation: 'Hide navigation',
    setupUsageNotice: 'Setup and usage metadata is collected by default.',
    trackingOptOutDetails: 'Tracking and opt-out details',
    messageDotPrompt: 'Message {name}…',
    repeatIntervalPrompt: 'Repeat interval in minutes (0 removes the schedule)',
    enterValidMinutes: 'Enter a valid number of minutes.',
    savedRuns: 'saved runs',
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

    // App & Workspace Shell
    unlockTitle: 'Tu propio rincón.',
    unlockPrompt:
      'Introduce el token de acceso de propietario configurado en el servidor.',
    ownerAccessToken: 'Token de acceso de propietario',
    tokenNotAccepted: 'El token de acceso no fue aceptado.',
    tokenSessionStorage:
      'El token permanece en el almacenamiento de sesión de esta pestaña.',
    leaveDraftConfirm: '¿Abandonar el borrador de página no guardado?',
    couldNotConnect: 'No se pudo conectar con el servidor.',
    selfHosted: 'AUTO-HOSPEDADO',
    setupRequired: 'CONFIGURACIÓN REQUERIDA',
    resumeAllDots: 'Reanudar todos los Dots',
    pauseAllDots: 'Pausar todos los Dots',
    resume: 'Reanudar',
    pause: 'Pausar',
    hideComputer: 'Ocultar computadora',
    showComputer: 'Mostrar computadora',
    dismissError: 'Descartar error',
    allDotsPaused:
      'Todos los Dots están pausados. La computación activa se detiene y las tareas programadas esperan.',
    openDotsHome: 'Inicio de OpenDots',
    expandSidebar: 'Expandir barra lateral',
    collapseSidebar: 'Contraer barra lateral',
    openNavigation: 'Abrir navegación',
    closeNavigation: 'Cerrar navegación',
    activity: 'Actividad',

    // Chat Empty & Setup
    editSpecialist: 'Editar especialista',
    connectYourDot: 'Conecta tu Dot',
    connectYourDotHint:
      'Conecta tu modelo y servicio de conversación en Configuración para comenzar a chatear. Tus Espacios y preferencias de Dots están listos para usar.',
    openSetupGuide: 'Abrir la guía de configuración',
    firstConversationHint:
      'Tu primera conversación comenzará después de la configuración.',
    startAConversation: 'Iniciar una conversación',
    textAndCallsContinuing: 'Texto y llamadas, una conversación continua',
    startConversation: 'Iniciar conversación',
    starterThinkThrough: 'Ayúdame a pensar en esto',
    starterResearchPage: 'Investigar una página pública',
    starterMakePlan: 'Haz un plan que pueda seguir',
    setupDetails: 'Detalles de configuración',
    setupTextChatToBegin:
      'Configura el chat de texto para iniciar una conversación persistente.',

    // Memories View
    yourWorkspace: 'TU ESPACIO DE TRABAJO',
    memoriesSubtitle: 'Preferencias que decides compartir con tus Dots.',
    addMemory: 'Añadir memoria',
    availableToPermittedDots: 'Disponible para Dots autorizados',
    memoryUseDisabled: 'Uso de memoria desactivado',
    editMemory: 'Editar memoria',
    deleteMemory: 'Eliminar memoria',
    memoriesEmptyTitle: 'Un poco de contexto marca la diferencia.',
    memoriesEmptyHint:
      'Añade una preferencia como “Mantén mis resúmenes breves”. Puedes cambiarla o eliminarla cuando quieras.',

    // Tasks & Activity View
    tasksTitle: 'Un poco de seguimiento.',
    tasksSubtitle:
      'Los turnos programados se ejecutan en el servidor en su conversación original.',
    searchTasks: 'Buscar tareas',
    findATask: 'Buscar una tarea…',
    tasksEmptyTitle: 'Deja que una idea vuelva a su momento.',
    tasksEmptyHint:
      'Abre una conversación y usa el botón del reloj para programar una tarea en el servidor.',
    couldNotSaveGeneric: 'No se pudo guardar.',
    newThought: 'Una nueva idea',
    couldNotCreateConversation: 'No se pudo crear la conversación.',
    workspaceNavigation: 'Navegación del espacio de trabajo',
    openActivity: 'Abrir actividad',
    editDotSettings: 'Editar configuración de {name}',
    openSourceTemplate: 'PLANTILLA DE CÓDIGO ABIERTO',
    showNavigation: 'Mostrar navegación',
    hideNavigation: 'Ocultar navegación',
    setupUsageNotice:
      'Los metadatos de configuración y uso se recopilan de forma predeterminada.',
    trackingOptOutDetails: 'Detalles de seguimiento y exclusión voluntaria',
    messageDotPrompt: 'Mensaje para {name}…',
    repeatIntervalPrompt:
      'Intervalo de repetición en minutos (0 elimina la programación)',
    enterValidMinutes: 'Introduce un número válido de minutos.',
    savedRuns: 'ejecuciones guardadas',
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

export function t(
  key: TranslationKey,
  paramsOrLang?: Record<string, string | number> | Language,
  lang?: Language,
): string {
  const params =
    typeof paramsOrLang === 'object' && paramsOrLang !== null
      ? paramsOrLang
      : undefined;
  const activeLang =
    typeof paramsOrLang === 'string'
      ? paramsOrLang
      : (lang ?? currentLanguage());
  const dict = translations[activeLang] ?? translations.en;
  let str: string = dict[key] ?? translations.en[key] ?? key;
  if (params) {
    for (const [k, v] of Object.entries(params)) {
      str = str.replaceAll(`{${k}}`, String(v));
    }
  }
  return str;
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
    t: (key: TranslationKey, params?: Record<string, string | number>) =>
      t(key, params, language),
    language,
    preference,
    setLanguagePreference,
  };
}
