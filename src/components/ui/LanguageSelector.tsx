import { legalRoutes } from '../../i18n/routes';

interface LanguageSelectorProps {
  lang: string;
  currentPath: string;
}

const LanguageSelector = ({ lang, currentPath }: LanguageSelectorProps) => {
  const privacyPath = {
    en: `/${legalRoutes.privacy.en}`,
    es: `/${legalRoutes.privacy.es}`,
  };
  const isPrivacyPath =
    currentPath === privacyPath.en ||
    currentPath === privacyPath.es.replace(/^\/es/, '');

  const enHref = isPrivacyPath ? privacyPath.en : `/en${currentPath}`;
  const esHref = isPrivacyPath ? privacyPath.es : `/es${currentPath}`;

  return (
    <div className="flex items-center gap-2">
      <a
        href={enHref}
        className={`px-4 py-2 rounded text-base font-bold tracking-wider transition-colors duration-200 ${lang === 'en' ? 'text-gold' : 'text-blue'} hover:bg-gray-100`}
        style={{ minWidth: 48, minHeight: 40 }}
      >
        EN
      </a>
      <span className="text-blue text-lg font-bold">|</span>
      <a
        href={esHref}
        className={`px-4 py-2 rounded text-base font-bold tracking-wider transition-colors duration-200 ${lang === 'es' ? 'text-gold' : 'text-blue'} hover:bg-gray-100`}
        style={{ minWidth: 48, minHeight: 40 }}
      >
        ES
      </a>
    </div>
  );
};

export default LanguageSelector; 
