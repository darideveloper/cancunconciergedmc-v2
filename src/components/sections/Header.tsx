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

export default function Header({ lang = 'en', serverPathname }: HeaderProps) {
  // States
  const [menuOpen, setMenuOpen] = useState(false);
  const [navLinksLang, setNavLinksLang] = useState(navLinks);
  const [currentPath, setCurrentPath] = useState('/');
  const [isHydrated, setIsHydrated] = useState(false);

  // Translations
  const t = useTranslations(lang);

  // Helper function to normalize paths (remove trailing slashes, hash fragments, and index.html)
  const normalizePath = (path: string): string => {
    return path
      .replace(/\/$/, '') // Remove trailing slash
      .replace(/#.*$/, '') // Remove hash fragment
      .replace(/\/index\.html$/, '') // Remove index.html
      || '/'; // If empty after normalization, return '/'
  };

  // Function to get current path from URL
  const getCurrentPath = (): string => {
    if (typeof window !== 'undefined') {
      // Client-side: use window.location
      const path = window.location.pathname;
      // Handle root path as English
      if (path === '/') {
        return '/';
      }
      const normalized = path.replace(/^\/(en|es)/, '') || '/';
      return normalizePath(normalized);
    } else if (serverPathname) {
      // Server-side: use serverPathname
      // Handle root path as English
      if (serverPathname === '/') {
        return '/';
      }
      const normalized = serverPathname.replace(/^\/(en|es)/, '') || '/';
      return normalizePath(normalized);
    }
    return '/';
  };

  // Function to handle anchor link scrolling
  const scrollToAnchor = (hash: string) => {
    if (!hash) return;
    
    // Remove the # from the hash
    const elementId = hash.replace('#', '');
    const element = document.getElementById(elementId);
    
    if (element) {
      // Wait a bit for any animations or content to load
      setTimeout(() => {
        element.scrollIntoView({
          behavior: 'smooth',
          block: 'start',
        });
      }, 200);
    }
  };

  // Initialize current path
  useEffect(() => {
    const initialPath = getCurrentPath();
    setCurrentPath(initialPath);
    setIsHydrated(true);

    // Handle initial anchor link if present
    if (typeof window !== 'undefined' && window.location.hash) {
      scrollToAnchor(window.location.hash);
    }
  }, [serverPathname]);

  // Listen for Astro page transitions and navigation changes
  useEffect(() => {
    if (!isHydrated) return;

    const handleNavigation = () => {
      const newPath = getCurrentPath();
      setCurrentPath(newPath);
      
      // Handle anchor link after navigation
      if (window.location.hash) {
        scrollToAnchor(window.location.hash);
      }
    };

    // Listen for Astro page transitions
    document.addEventListener('astro:page-load', handleNavigation);
    
    // Listen for browser navigation
    window.addEventListener('popstate', handleNavigation);
    
    // Listen for hash changes (for anchor links)
    window.addEventListener('hashchange', (e) => {
      handleNavigation();
      // Also scroll to the new hash
      if (window.location.hash) {
        scrollToAnchor(window.location.hash);
      }
    });

    return () => {
      document.removeEventListener('astro:page-load', handleNavigation);
      window.removeEventListener('popstate', handleNavigation);
      window.removeEventListener('hashchange', handleNavigation);
    };
  }, [isHydrated]);

  // Update navigation links when current path changes
  useEffect(() => {
    if (!isHydrated) return;

    const navLinksLang = navLinks.map((item) => {
      // Handle URL generation based on current language
      let urlLang: string;
      if (lang === 'en') {
        // For English, use root path for home, others as-is
        urlLang = item.url === '/' ? '/' : item.url;
      } else {
        // For other languages, add language prefix
        urlLang = `/${lang}${item.url}`;
      }

      return {
        text: t(`nav.links.${item.text}`),
        url: item.url,
        urlLang,
        active: normalizePath(item.url) === currentPath,
      };
    });
    setNavLinksLang(navLinksLang);
  }, [currentPath, t, lang, isHydrated]);

  // Debug logging (remove in production)
  useEffect(() => {
    if (process.env.NODE_ENV === 'development') {
      console.log('Header Debug:', {
        serverPathname,
        currentPath,
        isHydrated,
        windowPath: typeof window !== 'undefined' ? window.location.pathname : 'N/A',
        hash: typeof window !== 'undefined' ? window.location.hash : 'N/A'
      });
    }
  }, [currentPath, serverPathname, isHydrated]);

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
      <a href={lang === 'en' ? '/' : `/${lang}/`} className={clsx(
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