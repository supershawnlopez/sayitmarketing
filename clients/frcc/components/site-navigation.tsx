'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import { ArrowUpRight, Menu, X } from 'lucide-react';
import { navItems } from '@/lib/church-content';
import {
  localeFromPathname,
  localizedHref,
  localizedLabel,
} from '@/lib/locale';

let pendingLanguagePath: string | undefined;

export function LanguageSwitch({
  className,
  showArrow = false,
  onNavigate,
}: {
  className?: string;
  showArrow?: boolean;
  onNavigate?: () => void;
}) {
  const pathname = usePathname();
  const locale = localeFromPathname(pathname);
  const targetLocale = locale === 'es' ? 'en' : 'es';
  return (
    <Link
      className={className}
      href={localizedHref(pathname, targetLocale)}
      lang={targetLocale}
      hrefLang={targetLocale}
      scroll={true}
      onNavigate={() => {
        pendingLanguagePath = localizedHref(pathname, targetLocale);
        onNavigate?.();
        window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
      }}
    >
      {targetLocale === 'es' ? 'Español' : 'English'}
      {showArrow && <ArrowUpRight size={20} aria-hidden="true" />}
    </Link>
  );
}

export function SiteNavigation() {
  const pathname = usePathname();
  const locale = localeFromPathname(pathname);
  const currentPath = localizedHref(pathname, locale);
  const menuLabel =
    locale === 'es'
      ? (openLabel: boolean) =>
          openLabel ? 'Cerrar navegación' : 'Abrir navegación'
      : (openLabel: boolean) =>
          openLabel ? 'Close navigation' : 'Open navigation';
  const [open, setOpen] = useState(false);
  const toggle = useRef<HTMLButtonElement>(null);
  const panel = useRef<HTMLDivElement>(null);
  const closeLink = (href: string) => {
    setOpen(false);
    if (currentPath === href) toggle.current?.focus();
  };
  useEffect(() => {
    setOpen(false);
    document.documentElement.lang = locale;
    if (pendingLanguagePath === localizedHref(pathname, locale)) {
      window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
      pendingLanguagePath = undefined;
    }
  }, [pathname, locale]);
  useEffect(() => {
    if (!open) return;
    const escape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setOpen(false);
        toggle.current?.focus();
      }
    };
    const outside = (event: PointerEvent) => {
      const target = event.target as Node;
      if (!panel.current?.contains(target) && !toggle.current?.contains(target))
        setOpen(false);
    };
    const desktop = window.matchMedia('(min-width: 1024px)');
    const resize = () => {
      if (desktop.matches) setOpen(false);
    };
    document.addEventListener('keydown', escape);
    document.addEventListener('pointerdown', outside);
    desktop.addEventListener('change', resize);
    return () => {
      document.removeEventListener('keydown', escape);
      document.removeEventListener('pointerdown', outside);
      desktop.removeEventListener('change', resize);
    };
  }, [open]);
  return (
    <>
      <nav
        className="desktop-nav"
        aria-label={
          locale === 'es' ? 'Navegación principal' : 'Main navigation'
        }
      >
        {navItems.map((item) => (
          <Link
            key={item.href}
            href={localizedHref(item.href, locale)}
            aria-current={
              currentPath === localizedHref(item.href, locale)
                ? 'page'
                : undefined
            }
          >
            {localizedLabel(item.label, locale)}
          </Link>
        ))}
      </nav>
      <div className="header-actions">
        <LanguageSwitch
          className="language-link"
          onNavigate={() => setOpen(false)}
        />
        <Link
          href={localizedHref('/contact', locale)}
          className="button button-dark header-visit"
        >
          {locale === 'es' ? 'Planea tu visita' : 'Plan a visit'}
          <ArrowUpRight size={16} aria-hidden="true" />
        </Link>
        <button
          ref={toggle}
          className="menu-toggle icon-button"
          type="button"
          aria-label={menuLabel(open)}
          aria-expanded={open}
          aria-controls="mobile-navigation"
          title={menuLabel(open)}
          onClick={() => setOpen(!open)}
        >
          {open ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>
      <div
        ref={panel}
        id="mobile-navigation"
        className="mobile-navigation"
        hidden={!open}
        onBlur={(event) => {
          if (
            !event.currentTarget.contains(event.relatedTarget) &&
            event.relatedTarget !== toggle.current
          )
            setOpen(false);
        }}
      >
        <nav
          aria-label={
            locale === 'es' ? 'Navegación móvil' : 'Mobile navigation'
          }
        >
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={localizedHref(item.href, locale)}
              onClick={() => closeLink(localizedHref(item.href, locale))}
              aria-current={
                currentPath === localizedHref(item.href, locale)
                  ? 'page'
                  : undefined
              }
            >
              {localizedLabel(item.label, locale)}
              <ArrowUpRight size={20} aria-hidden="true" />
            </Link>
          ))}
          <LanguageSwitch showArrow onNavigate={() => setOpen(false)} />
        </nav>
      </div>
    </>
  );
}
