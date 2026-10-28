'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import { ArrowUpRight, Menu, X } from 'lucide-react';
import { navItems } from '@/lib/church-content';

export function SiteNavigation() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const toggle = useRef<HTMLButtonElement>(null);
  const panel = useRef<HTMLDivElement>(null);
  const closeLink = (href: string) => {
    setOpen(false);
    if (pathname === href) toggle.current?.focus();
  };
  useEffect(() => {
    setOpen(false);
  }, [pathname]);
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
      <nav className="desktop-nav" aria-label="Main navigation">
        {navItems.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            aria-current={pathname === item.href ? 'page' : undefined}
          >
            {item.label}
          </Link>
        ))}
      </nav>
      <div className="header-actions">
        <Link
          className="language-link"
          href="/es"
          lang="es"
          aria-current={pathname === '/es' ? 'page' : undefined}
        >
          Español
        </Link>
        <Link href="/contact" className="button button-dark header-visit">
          Plan a visit
          <ArrowUpRight size={16} aria-hidden="true" />
        </Link>
        <button
          ref={toggle}
          className="menu-toggle icon-button"
          type="button"
          aria-label={open ? 'Close navigation' : 'Open navigation'}
          aria-expanded={open}
          aria-controls="mobile-navigation"
          title={open ? 'Close navigation' : 'Open navigation'}
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
        <nav aria-label="Mobile navigation">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => closeLink(item.href)}
              aria-current={pathname === item.href ? 'page' : undefined}
            >
              {item.label}
              <ArrowUpRight size={20} aria-hidden="true" />
            </Link>
          ))}
          <Link href="/es" lang="es" onClick={() => closeLink('/es')}>
            Español
            <ArrowUpRight size={20} aria-hidden="true" />
          </Link>
        </nav>
      </div>
    </>
  );
}
