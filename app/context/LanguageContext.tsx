'use client'

import { createContext, useContext, useState, useEffect, useLayoutEffect, ReactNode } from 'react'
import { Languages } from '@/app/enum/global'
import languagesData from '@/app/enum/languages.json'

type LanguageType = typeof languagesData[Languages];

type LanguageContextType = {
  currentLanguage: LanguageType
  setLanguage: (lang: Languages) => void
  getCurrentLang: () => Languages
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined)

/**
 * Runs as useLayoutEffect on the client (synchronous, before browser paints
 * → no flash) and falls back to useEffect on the server (SSR no-op).
 */
const useIsomorphicLayoutEffect =
  typeof window !== 'undefined' ? useLayoutEffect : useEffect

/** Map a Languages code to its translation object */
function langCodeToData(code: Languages): LanguageType {
  // Map enum code to JSON key
  return languagesData[code] || languagesData[Languages.ENGLISH];
}

/**
 * Language is now URL-driven. The server layout at app/[lang]/layout.tsx
 * reads params.lang and passes the resolved Languages code as initialLang.
 * useIsomorphicLayoutEffect syncs state when the route lang changes so the
 * UI updates before paint (no flash).
 */
export function LanguageProvider({
  children,
  initialLang,
}: {
  children: ReactNode
  initialLang: Languages
}) {
  const [currentLangCode, setCurrentLangCode] = useState<Languages>(initialLang)
  const [currentLanguage, setCurrentLanguage] = useState<LanguageType>(() => langCodeToData(initialLang))

  // Sync when the parent (server layout) supplies a different lang after navigation
  useIsomorphicLayoutEffect(() => {
    setCurrentLangCode(initialLang)
    setCurrentLanguage(langCodeToData(initialLang))
  }, [initialLang])

  const setLanguage = (lang: Languages) => {
    setCurrentLangCode(lang)
    setCurrentLanguage(langCodeToData(lang))
  }

  const getCurrentLang = () => currentLangCode

  return (
    <LanguageContext.Provider value={{ currentLanguage, setLanguage, getCurrentLang }}>
      {children}
    </LanguageContext.Provider>
  )
}

export function useLanguageContext() {
  const context = useContext(LanguageContext)
  if (!context) {
    throw new Error('useLanguageContext must be used within LanguageProvider')
  }
  return context
}
