import Link from 'next/link';
import { profile } from '@/lib/data';

export default function Footer() {
  return (
    <footer className="mt-16 border-t border-line/60 py-12 text-center text-xs text-subtle">
      <div className="mx-auto flex max-w-sm justify-around pb-6 text-sm">
        <Link
          href="/experience"
          className="text-muted transition-colors hover:text-ink"
        >
          Experience
        </Link>
        <Link
          href="/projects"
          className="text-muted transition-colors hover:text-ink"
        >
          Projects
        </Link>
        <Link
          href="/cv"
          className="text-muted transition-colors hover:text-ink"
        >
          CV
        </Link>
        <a
          href={profile.github}
          target="_blank"
          rel="noopener noreferrer"
          className="text-muted transition-colors hover:text-ink"
        >
          GitHub
        </a>
      </div>

      <p className="text-muted">
        © {new Date().getFullYear()} · {profile.name}
      </p>
      <p className="mt-1 text-[11px] text-subtle">
        Built with Next.js & Tailwind CSS · Phnom Penh, Cambodia
      </p>
    </footer>
  );
}
