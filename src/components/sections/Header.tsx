// Libs
import { useEffect, useState } from 'react';
import { useTranslations } from '../../i18n/utils';
import clsx from 'clsx';

// Icons
import { Menu } from 'lucide-react';

// Components
import LanguageSelector from '../ui/LanguageSelector';

// Data
import { navLinks } from '../../data/links';

interface HeaderProps {
  lang: 'en' | 'es';
  serverPathname?: string;
}

export default function Header({ lang, serverPathname }: HeaderProps) {
  // States
  const [menuOpen, setMenuOpen] = useState(false);
  const [navLinksLang, setNavLinksLang] = useState(navLinks);
  const [currentPath, setCurrentPath] = useState('/');

  // Translations
  const t = useTranslations(lang);

  // Helper function to normalize paths (remove trailing slashes and hash fragments)
  const normalizePath = (path: string): string => {
    return path
      .replace(/\/$/, '') // Remove trailing slash
      .replace(/#.*$/, '') // Remove hash fragment
      || '/'; // If empty after normalization, return '/'
  };

  // Calculate current path
  useEffect(() => {
    const pathOnClient = typeof window !== 'undefined' ? window.location.pathname : null;
    const authoritativePath = pathOnClient || serverPathname;

    let newCurrentPath: string;
    if (authoritativePath) {
      newCurrentPath = authoritativePath.replace(/^\/(en|es)/, '');
      // If after removing lang prefix, path is empty (e.g. original /en or /es), default to '/'
      if (newCurrentPath === '') {
        newCurrentPath = '/';
      }
    } else {
      // Fallback if no path information is available (should be rare)
      newCurrentPath = '/';
    }
    
    setCurrentPath(normalizePath(newCurrentPath));
  }, [serverPathname]);

  // Listen for Astro page transitions to update active state
  useEffect(() => {
    const handlePageLoad = () => {
      if (typeof window !== 'undefined') {
        const newPath = window.location.pathname.replace(/^\/(en|es)/, '') || '/';
        setCurrentPath(normalizePath(newPath));
      }
    };

    // Listen for Astro page transitions
    document.addEventListener('astro:page-load', handlePageLoad);
    
    // Also listen for regular navigation
    window.addEventListener('popstate', handlePageLoad);

    return () => {
      document.removeEventListener('astro:page-load', handlePageLoad);
      window.removeEventListener('popstate', handlePageLoad);
    };
  }, []);

  useEffect(() => {
    const navLinksLang = navLinks.map((item) => ({
      text: t(`nav.links.${item.text}`),
      url: item.url,
      urlLang: `/${lang}${item.url}`,
      active: normalizePath(item.url) === currentPath, // Normalize both paths for comparison
    }));
    setNavLinksLang(navLinksLang);
  }, [currentPath, t, lang]);

  return (
    <header className={clsx(
      'w-full',
      'flex',
      'items-center',
      'justify-between',
      'py-6',
      'px-8',
      'bg-white',
      'relative',
      'container',
      '!my-0',
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
                href={link.urlLang}
                className={clsx(
                  'hover:text-gold',
                  'transition-colors',
                  'duration-200',
                  'no-underline',
                  link.active && 'text-gold',
                  'text-sm'
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