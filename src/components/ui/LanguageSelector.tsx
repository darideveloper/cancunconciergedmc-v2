interface LanguageSelectorProps {
  lang: string;
  currentPath: string;
}

const LanguageSelector = ({ lang, currentPath }: LanguageSelectorProps) => {
  return (
    <div className="flex items-center gap-2">
      <a
        href={`/en${currentPath}`}
        className={`px-4 py-2 rounded text-base font-bold tracking-wider transition-colors duration-200 ${lang === 'en' ? 'text-gold' : 'text-blue'} hover:bg-gray-100`}
        style={{ minWidth: 48, minHeight: 40 }}
      >
        EN
      </a>
      <span className="text-blue text-lg font-bold">|</span>
      <a
        href={`/es${currentPath}`}
        className={`px-4 py-2 rounded text-base font-bold tracking-wider transition-colors duration-200 ${lang === 'es' ? 'text-gold' : 'text-blue'} hover:bg-gray-100`}
        style={{ minWidth: 48, minHeight: 40 }}
      >
        ES
      </a>
    </div>
  );
};

export default LanguageSelector; 