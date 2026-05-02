export const legalRoutes = {
  privacy: {
    en: 'privacy',
    es: 'es/privacidad',
  },
} as const

export type LegalPageKey = keyof typeof legalRoutes
export type SupportedLang = keyof (typeof legalRoutes)[LegalPageKey]

export function getLegalPath(pageKey: LegalPageKey, lang: SupportedLang) {
  return legalRoutes[pageKey][lang]
}
