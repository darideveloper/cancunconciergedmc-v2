import { useState } from 'react';
import { navLinks } from '../../data/nav';

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [locale, setLocale] = useState('en');

  return (
    <header className="w-full flex items-center justify-between py-6 px-8 bg-white relative">
      <a href="/" className="flex flex-col items-center no-underline z-20">
        <img src="/logo.webp" alt="Logo" className="h-[71px] mb-1" />
      </a>

      {/* Navigation */}
      <nav className="flex items-center">
        {/* Language selector for desktop */}
        <div className="hidden xl:flex items-center gap-2 mr-6">
          <LanguageSelector locale={locale} setLocale={setLocale} />
        </div>
        
        {/* Hamburger menu for mobile */}
        <button
          className="flex flex-col justify-center w-8 h-8 cursor-pointer z-50 xl:hidden ml-4"
          aria-label="Toggle menu"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          <span className={`block h-1 w-full bg-blue rounded transition-all duration-300 ${menuOpen ? 'rotate-45 translate-y-2' : ''}`}></span>
          <span className={`block h-1 w-full bg-blue rounded transition-all duration-300 my-1 ${menuOpen ? 'opacity-0' : ''}`}></span>
          <span className={`block h-1 w-full bg-blue rounded transition-all duration-300 ${menuOpen ? '-rotate-45 -translate-y-2' : ''}`}></span>
        </button>

        {/* Navigation links - conditional styling for mobile/desktop */}
        <ul 
          className={`
            list-none p-0 font-sans text-blue tracking-[0.15em] font-normal
            ${menuOpen 
              ? 'fixed inset-0 flex flex-col items-center justify-center gap-8 bg-white z-40 text-xl' 
              : 'hidden xl:flex xl:gap-10 xl:m-0 text-base'}
          `}
        >
          {/* Logo in mobile menu when open */}
          {menuOpen && (
            <div className="absolute top-6 left-1/2 transform -translate-x-1/2">
              <div className="flex flex-col items-center">
                <img src="/logo.webp" alt="Logo" className="h-[71px] mb-1" />
              </div>
            </div>
          )}
          
          {/* Navigation links */}
          {navLinks.map(link => (
            <li key={link.text}>
              <a
                href={link.url}
                className="hover:text-gold transition-colors duration-200 no-underline"
                onClick={menuOpen ? () => setMenuOpen(false) : undefined}
              >
                {link.text.toUpperCase()}
              </a>
            </li>
          ))}
          
          {/* Language selector for mobile */}
          {menuOpen && (
            <li className="mt-4">
              <LanguageSelector locale={locale} setLocale={setLocale} />
            </li>
          )}
        </ul>
      </nav>
    </header>
  );
}

// Separate component for language selector to avoid duplication
const LanguageSelector = ({ locale, setLocale }: { locale: string; setLocale: (locale: string) => void }) => {
  return (
    <div className="flex items-center gap-2">
      <button 
        className={`text-xs tracking-wider ${locale === 'en' ? 'text-gold font-bold' : 'text-blue'}`}
        onClick={() => setLocale('en')}
      >
        EN
      </button>
      <span className="text-blue">|</span>
      <button 
        className={`text-xs tracking-wider ${locale === 'es' ? 'text-gold font-bold' : 'text-blue'}`}
        onClick={() => setLocale('es')}
      >
        ES
      </button>
    </div>
  );
};