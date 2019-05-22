import React, { createContext, useState, useContext, useMemo } from 'react'

// I18n context, it's private
const I18nContext = createContext()

// A provider
export function I18nProvider({ translations, defaultLocale, children }) {
  const [locale, setLocale] = useState(defaultLocale);

  const value = useMemo(() => {
    return {
      locale,
      setLocale,
      translations
    };
  }, [locale, translations]);

  return (
    <I18nContext.Provider value={ value }>
      { children }
    </I18nContext.Provider>
  );
}

// A collector
export function useT(id) {
  const { translations, locale } =  useContext(I18nContext);

  return useMemo(() => translations[locale][id], [translations, locale, id])
}

// A simple component to render a translation key
export function T({ id }) {
  return useT(id)
}

// Hook to get the i18n context
export function useI18n() {
  return useContext(I18nContext)
}