import { ui, defaultLang } from './ui';

export function getLangFromUrl(url: URL) {
  const [, lang] = url.pathname.split('/');
  if (lang in ui) return lang as keyof typeof ui;
  return defaultLang;
}

export function useTranslations(lang: keyof typeof ui) {
  return function t(key: string) {
    const keys = key.split('.'); // Split the key by dots for nested access
    let value: any = ui[lang];

    for (const k of keys) {
      value = value?.[k];
      if (value === undefined) break;
    }

    // Fallback to default language if the key doesn't exist
    if (value === undefined) {
      value = ui[defaultLang];
      for (const k of keys) {
        value = value?.[k];
        if (value === undefined) break;
      }
    }

    return value;
  };
}
