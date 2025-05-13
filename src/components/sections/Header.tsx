import { useState } from 'react';
import { navLinks } from '../../data/nav';
import { Menu } from 'lucide-react';
import { useTranslations } from '../../i18n/utils';
import LanguageSelector from '../ui/LanguageSelector';
import clsx from 'clsx';

interface HeaderProps {
  lang: 'en' | 'es';
}

export default function Header({ lang }: HeaderProps) {
  const [menuOpen, setMenuOpen] = useState(false);
  const t = useTranslations(lang);

  // Get current path for language switching
  let currentPath = '';
  if (typeof window !== 'undefined') {
    currentPath = window.location.pathname.replace(/^\/(en|es)/, '');
  }

  // Prepare nav links with translation and lang prefix
  const navLinksLang = navLinks.map((item) => ({
    text: t(`nav.links.${item.text}`),
    url: `/${lang}${item.url}`,
  }));

  return (
    <header className={clsx(
      'w-full',
      'flex',
      'items-center',
      'justify-between',
      'py-6',
      'px-8',
      'bg-white',
      'relative'
    )}>
      <a href={`/${lang}/`} className={clsx(
        'flex',
        'flex-col',
        'items-center',
        'no-underline',
        'z-20'
      )}>
        <img src="/logo.webp" alt="Logo" className={clsx(
          'h-[71px]',
          'mb-1'
        )} />
      </a>

      {/* Navigation */}
      <nav className={clsx(
        'flex',
        'items-center'
      )}>
        {/* Language selector for desktop */}
        <div className={clsx(
          'hidden',
          'xl:flex',
          'items-center',
          'gap-2',
          'mr-6'
        )}>
          <LanguageSelector lang={lang} currentPath={currentPath} />
        </div>
        
        {/* Hamburger menu for mobile */}
        <button
          className={clsx(
            'flex',
            'items-center',
            'justify-center',
            'w-8',
            'h-8',
            'cursor-pointer',
            'z-50',
            'xl:hidden',
            'ml-4'
          )}
          aria-label="Toggle menu"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          <Menu className={clsx(
            'w-6',
            'h-6',
            'text-blue',
            'transition-transform',
            'duration-300',
            {
              'rotate-90': menuOpen
            }
          )} />
        </button>

        {/* Navigation links - conditional styling for mobile/desktop */}
        <ul className={clsx(
          'list-none',
          'p-0',
          'font-sans',
          'text-blue',
          'tracking-[0.15em]',
          'font-normal',
          menuOpen 
            ? 'fixed inset-0 flex flex-col items-center justify-center gap-8 bg-white z-40 text-xl' 
            : 'hidden xl:flex xl:gap-10 xl:m-0 text-base'
        )}>
          {/* Logo in mobile menu when open */}
          {menuOpen && (
            <div className={clsx(
              'absolute',
              'top-6',
              'left-1/2',
              'transform',
              '-translate-x-1/2'
            )}>
              <div className={clsx(
                'flex',
                'flex-col',
                'items-center'
              )}>
                <img src="/logo.webp" alt="Logo" className={clsx(
                  'h-[71px]',
                  'mb-1'
                )} />
              </div>
            </div>
          )}
          
          {/* Navigation links */}
          {navLinksLang.map(link => (
            <li key={link.text}>
              <a
                href={link.url}
                className={clsx(
                  'hover:text-gold',
                  'transition-colors',
                  'duration-200',
                  'no-underline'
                )}
                onClick={menuOpen ? () => setMenuOpen(false) : undefined}
              >
                {link.text.toUpperCase()}
              </a>
            </li>
          ))}
          
          {/* Language selector for mobile */}
          {menuOpen && (
            <li className={clsx(
              'mt-4'
            )}>
              <LanguageSelector lang={lang} currentPath={currentPath} />
            </li>
          )}
        </ul>
      </nav>
    </header>
  );
}