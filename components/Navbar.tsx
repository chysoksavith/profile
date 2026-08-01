'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import { Menu, X } from 'lucide-react';
import { mailtoHref, nav, profile } from '@/lib/data';

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState(nav[0]?.href ?? '');

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Highlight the section currently nearest the top of the viewport.
  useEffect(() => {
    const sections = nav
      .map((item) => document.querySelector(item.href))
      .filter((el): el is Element => el !== null);

    if (sections.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const topMost = entries
          .filter((entry) => entry.isIntersecting)
          .sort(
            (a, b) => a.boundingClientRect.top - b.boundingClientRect.top,
          )[0];

        if (topMost) setActive(`#${topMost.target.id}`);
      },
      { rootMargin: '-72px 0px -65% 0px' },
    );

    sections.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 border-b transition-colors duration-200 ${
        scrolled
          ? 'border-line bg-canvas/85 backdrop-blur-md'
          : 'border-transparent'
      }`}
    >
      <div className="mx-auto flex max-w-3xl items-center justify-between gap-4 px-6 py-3.5">
        <a
          href="#top"
          aria-label="Back to top"
          className="shrink-0 transition-opacity hover:opacity-70"
        >
          {profile.avatar ? (
            <Image
              src={profile.avatar}
              alt=""
              width={72}
              height={72}
              className="size-8 rounded-full border border-line object-cover object-top"
            />
          ) : (
            <span className="grid size-8 place-items-center rounded-full bg-ink text-[10px] font-bold text-canvas">
              {profile.initials}
            </span>
          )}
        </a>

        <nav aria-label="Sections" className="hidden items-center gap-0.5 md:flex">
          {nav.map((item) => (
            <a
              key={item.href}
              href={item.href}
              aria-current={active === item.href ? 'true' : undefined}
              className={`rounded-full px-3 py-1.5 text-[13px] font-medium transition-colors ${
                active === item.href
                  ? 'bg-elevated text-ink'
                  : 'text-muted hover:text-ink'
              }`}
            >
              {item.label}
            </a>
          ))}
        </nav>

        <button
          type="button"
          onClick={() => setOpen((value) => !value)}
          aria-expanded={open}
          aria-controls="mobile-nav"
          aria-label={open ? 'Close menu' : 'Open menu'}
          className="-mr-1 rounded-md p-1.5 text-muted transition-colors hover:text-ink md:hidden"
        >
          {open ? <X size={18} /> : <Menu size={18} />}
        </button>
      </div>

      {open && (
        <nav
          id="mobile-nav"
          aria-label="Sections"
          className="border-t border-line bg-canvas px-6 py-3 md:hidden"
        >
          <ul className="flex flex-col">
            {nav.map((item) => (
              <li key={item.href}>
                <a
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className="block py-2 text-sm font-medium text-muted transition-colors hover:text-ink"
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
          <a
            href={mailtoHref}
            onClick={() => setOpen(false)}
            className="mt-2 block rounded-lg bg-ink py-2.5 text-center text-sm font-medium text-canvas"
          >
            Get in touch
          </a>
        </nav>
      )}
    </header>
  );
}
