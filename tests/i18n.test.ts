import { beforeEach, expect, it, vi } from 'vitest';
import {
  currentLanguage,
  languagePreference,
  resolveLanguage,
  setLanguagePreference,
  subscribeLanguage,
  t,
  translations,
  type TranslationKey,
} from '../src/client/i18n';

const storage = new Map<string, string>();

beforeEach(() => {
  storage.clear();
  vi.stubGlobal('localStorage', {
    getItem: (key: string) => storage.get(key) ?? null,
    setItem: (key: string, value: string) => storage.set(key, value),
    removeItem: (key: string) => storage.delete(key),
    clear: () => storage.clear(),
  });
  setLanguagePreference('system');
});

it('has complete translation parity between English and Spanish', () => {
  const enKeys = Object.keys(translations.en) as TranslationKey[];
  const esKeys = Object.keys(translations.es) as TranslationKey[];

  expect(esKeys.sort()).toEqual(enKeys.sort());

  for (const key of enKeys) {
    expect(translations.en[key]).toBeTruthy();
    expect(translations.es[key]).toBeTruthy();
  }
});

it('resolves explicit language preference', () => {
  expect(resolveLanguage('en')).toBe('en');
  expect(resolveLanguage('es')).toBe('es');
});

it('defaults to system language when no preference is saved', () => {
  expect(languagePreference()).toBe('system');
});

it('saves and updates language preference', () => {
  let notified = 0;
  const unsubscribe = subscribeLanguage(() => {
    notified++;
  });

  setLanguagePreference('es');
  expect(languagePreference()).toBe('es');
  expect(currentLanguage()).toBe('es');
  expect(storage.get('opendots-language')).toBe('es');
  expect(notified).toBe(1);

  setLanguagePreference('en');
  expect(languagePreference()).toBe('en');
  expect(currentLanguage()).toBe('en');
  expect(storage.get('opendots-language')).toBe('en');
  expect(notified).toBe(2);

  unsubscribe();
  setLanguagePreference('system');
  expect(storage.has('opendots-language')).toBe(false);
  expect(notified).toBe(2);
});

it('translates keys according to active language', () => {
  expect(t('settings', 'en')).toBe('Settings');
  expect(t('settings', 'es')).toBe('Configuración');

  expect(t('save', 'en')).toBe('Save');
  expect(t('save', 'es')).toBe('Guardar');
});

it('supports parameter interpolation in translations', () => {
  expect(t('messageDotPrompt', { name: 'Atlas' }, 'en')).toBe('Message Atlas…');
  expect(t('messageDotPrompt', { name: 'Atlas' }, 'es')).toBe(
    'Mensaje para Atlas…',
  );
  expect(t('editDotSettings', { name: 'Atlas' }, 'en')).toBe(
    'Edit Atlas settings',
  );
  expect(t('editDotSettings', { name: 'Atlas' }, 'es')).toBe(
    'Editar configuración de Atlas',
  );
});
