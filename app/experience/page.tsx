import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowLeft, ArrowUp } from 'lucide-react';
import Footer from '@/components/Footer';
import Tag from '@/components/Tag';
import ThemeToggle from '@/components/ThemeToggle';
import { data, profile } from '@/lib/data';

export const metadata: Metadata = {
  title: `Experience | ${profile.name}`,
  description: `Professional work history, engineering roles, and academic qualifications of ${profile.name}.`,
};

export default function ExperiencePage() {
  return (
    <main id="top" className="mx-auto max-w-3xl px-4 py-10 sm:px-6 sm:py-14">
      {/* Top Bar with Back button & Theme toggle */}
      <div className="flex items-center justify-between">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-sm text-muted transition-colors hover:text-ink"
        >
          <ArrowLeft size={16} />
          Back home
        </Link>
        <ThemeToggle />
      </div>

      {/* Header */}
      <header className="mt-8 border-b border-line pb-8">
        <h1 className="text-3xl font-bold tracking-tight text-ink sm:text-4xl">
          Experience & Qualifications
        </h1>
        <p className="mt-2 text-base text-muted">
          My professional journey across software engineering, startup products, and academic background.
        </p>
      </header>

      {/* Work Experience */}
      <section className="mt-12 space-y-8">
        <h2 className="text-xs font-semibold uppercase tracking-wider text-subtle">
          Work History
        </h2>

        <div className="space-y-6">
          {data.experience.map((job) => (
            <article
              key={`${job.company}-${job.role}`}
              className="rounded-2xl border border-line bg-surface p-5 sm:p-6 transition-all duration-200 hover:border-line-strong"
            >
              <div className="flex flex-wrap items-baseline justify-between gap-2">
                <h3 className="text-lg font-semibold text-ink">{job.role}</h3>
                <span className="text-xs text-subtle tabular-nums font-mono">
                  {job.period}
                </span>
              </div>

              <div className="mt-1 text-sm font-medium">
                <span className="text-purple">{job.company}</span>
                <span className="mx-2 text-subtle">·</span>
                <span className="text-muted">{job.type}</span>
              </div>

              <p className="mt-3 text-sm leading-relaxed text-muted">
                {job.description}
              </p>

              {job.stack && job.stack.length > 0 && (
                <div className="mt-4 flex flex-wrap gap-1.5">
                  {job.stack.map((tech) => (
                    <Tag key={tech}>{tech}</Tag>
                  ))}
                </div>
              )}
            </article>
          ))}
        </div>
      </section>

      {/* Education */}
      <section className="mt-14 space-y-6">
        <h2 className="text-xs font-semibold uppercase tracking-wider text-subtle">
          Education
        </h2>

        <div className="grid gap-4 sm:grid-cols-2">
          {data.education.map((item) => (
            <article
              key={item.degree}
              className="rounded-2xl border border-line bg-surface p-5 transition-all duration-200 hover:border-line-strong"
            >
              <div className="flex items-start justify-between gap-3">
                <h3 className="text-sm font-semibold leading-snug text-ink">
                  {item.degree}
                </h3>
                <span
                  className={`shrink-0 rounded px-2 py-0.5 text-[10px] font-medium ${
                    item.status.toLowerCase() === 'in progress'
                      ? 'bg-accent-soft text-accent'
                      : 'bg-elevated text-subtle'
                  }`}
                >
                  {item.status}
                </span>
              </div>
              <p className="mt-2 text-xs text-muted">{item.institution}</p>
              <p className="mt-1 text-xs text-subtle tabular-nums font-mono">
                {item.period}
              </p>
            </article>
          ))}
        </div>
      </section>

      {/* Technical Skills */}
      <section className="mt-14 space-y-6">
        <h2 className="text-xs font-semibold uppercase tracking-wider text-subtle">
          Technical Skills
        </h2>

        <div className="rounded-2xl border border-line bg-surface p-5 sm:p-6 space-y-5">
          {data.skills.map((group) => (
            <div
              key={group.category}
              className="grid gap-2 sm:grid-cols-[7rem_1fr] sm:gap-4 items-baseline"
            >
              <div className="text-xs font-semibold uppercase tracking-wider text-subtle">
                {group.category}
              </div>
              <div className="flex flex-wrap gap-1.5">
                {group.items.map((item) => (
                  <Tag key={item}>{item}</Tag>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Languages */}
      <section className="mt-14 space-y-6">
        <h2 className="text-xs font-semibold uppercase tracking-wider text-subtle">
          Languages
        </h2>

        <div className="rounded-2xl border border-line bg-surface p-5 sm:p-6">
          <ul className="divide-y divide-line">
            {data.languages.map((language) => (
              <li
                key={language.name}
                className="flex items-center justify-between py-2.5 first:pt-0 last:pb-0 text-sm"
              >
                <span className="font-medium text-ink">{language.name}</span>
                <span className="text-xs text-subtle">{language.level}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Bottom quick navigation */}
      <div className="mt-14 flex items-center justify-between border-t border-line pt-6 text-sm">
        <Link
          href="/"
          className="inline-flex items-center gap-1.5 text-muted transition-colors hover:text-ink"
        >
          <ArrowLeft size={15} />
          Back home
        </Link>
        <a
          href="#top"
          className="inline-flex items-center gap-1 text-subtle transition-colors hover:text-ink"
        >
          To top
          <ArrowUp size={14} />
        </a>
      </div>

      <Footer />
    </main>
  );
}
