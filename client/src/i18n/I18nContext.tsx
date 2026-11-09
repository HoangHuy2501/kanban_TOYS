import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react';

import {
  DICTIONARIES,
  LANGUAGES,
  type Language,
  type TranslationKey,
} from '@client/src/i18n/dictionary';

const STORAGE_KEY = 'f11-dashboard-lang';
const DEFAULT_LANGUAGE: Language = 'vi';

interface I18nContextValue {
  lang: Language;
  setLang: (lang: Language) => void;
  t: (key: TranslationKey, vars?: Record<string, string | number>) => string;
  targetLabelText: (rawLabel: string) => string;
}

const I18nContext = createContext<I18nContextValue | null>(null);

const isLanguage = (value: string | null): value is Language =>
  value !== null && (LANGUAGES as readonly string[]).includes(value);

const readStoredLanguage = (): Language => {
  const stored = window.localStorage.getItem(STORAGE_KEY);
  return isLanguage(stored) ? stored : DEFAULT_LANGUAGE;
};

export const I18nProvider = ({ children }: { children: ReactNode }) => {
  const [lang, setLangState] = useState<Language>(readStoredLanguage);

  useEffect(() => {
    window.localStorage.setItem(STORAGE_KEY, lang);
    document.documentElement.lang = lang;
  }, [lang]);

  const setLang = useCallback((next: Language) => {
    setLangState(next);
  }, []);

  const t = useCallback(
    (key: TranslationKey, vars?: Record<string, string | number>) => {
      const template = DICTIONARIES[lang][key];
      if (!vars) return template;
      return Object.entries(vars).reduce(
        (acc: string, [name, value]) => acc.split(`{${name}}`).join(String(value)),
        template,
      );
    },
    [lang],
  );

  const targetLabelText = useCallback(
    (rawLabel: string) => {
      if (lang === 'vi') return rawLabel;
      if (rawLabel === 'Kiểm hàng') return DICTIONARIES.en.targetInspection;
      if (rawLabel === 'Ép nhựa') return DICTIONARIES.en.targetInjection;
      if (rawLabel === 'Lắp ráp') return DICTIONARIES.en.targetAssembly;
      return rawLabel;
    },
    [lang],
  );

  const value = useMemo<I18nContextValue>(
    () => ({ lang, setLang, t, targetLabelText }),
    [lang, setLang, t, targetLabelText],
  );

  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>;
};

export const useI18n = (): I18nContextValue => {
  const context = useContext(I18nContext);
  if (!context) throw new Error('useI18n must be used inside I18nProvider');
  return context;
};
