import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowLeft, Mail, MapPin, Phone } from 'lucide-react';
import GithubIcon from '@/components/GithubIcon';
import PrintCvButton from '@/components/PrintCvButton';
import ThemeToggle from '@/components/ThemeToggle';
import { data, githubHandle, mailtoHref, profile, telHref } from '@/lib/data';

export const metadata: Metadata = {
  title: `CV | ${profile.name}`,
  description: `Curriculum Vitae of ${profile.name} — Web Developer & IT Engineer.`,
};

function PrintSectionHeading({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="border-b border-black pb-0.5 text-[10.5pt] font-bold uppercase tracking-[0.08em] text-black">
      {children}
    </h2>
  );
}

export default function CvPage() {
  return (
    <div className="min-h-screen bg-canvas py-8 px-4 sm:px-6 md:py-12 print:min-h-0 print:bg-white print:p-0">
      {/* Screen View (unchanged) */}
      <div className="print:hidden">
        {/* Top action bar */}
        <div className="mx-auto max-w-3xl mb-8 flex items-center justify-between">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-sm text-muted transition-colors hover:text-ink"
          >
            <ArrowLeft size={16} />
            Back to portfolio
          </Link>

          <div className="flex items-center gap-3">
            <ThemeToggle />
            <PrintCvButton />
          </div>
        </div>

        {/* CV Paper Document */}
        <main className="mx-auto max-w-3xl rounded-2xl border border-line bg-surface p-7 sm:p-10 shadow-sm">
          {/* Header */}
          <header className="border-b border-line pb-6">
            <h1 className="text-3xl font-bold tracking-tight text-ink sm:text-4xl">
              {profile.name}
            </h1>
            <p className="mt-1 text-lg font-medium text-accent">
              {profile.role}
            </p>

            <div className="mt-4 flex flex-wrap gap-x-5 gap-y-2 text-xs text-muted sm:text-sm">
              <a
                href={telHref}
                className="inline-flex items-center gap-1.5 hover:text-ink"
              >
                <Phone size={14} className="shrink-0 text-subtle" />
                <span>{profile.phone}</span>
              </a>

              <a
                href={mailtoHref}
                className="inline-flex items-center gap-1.5 hover:text-ink"
              >
                <Mail size={14} className="shrink-0 text-subtle" />
                <span>{profile.email}</span>
              </a>

              <span className="inline-flex items-center gap-1.5">
                <MapPin size={14} className="shrink-0 text-subtle" />
                <span>{profile.location}</span>
              </span>

              <a
                href={profile.github}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 hover:text-ink"
              >
                <GithubIcon size={14} className="shrink-0 text-subtle" />
                <span>{githubHandle}</span>
              </a>
            </div>
          </header>

          {/* Professional Summary */}
          <section className="mt-6">
            <h2 className="text-xs font-semibold uppercase tracking-wider text-subtle">
              Professional Summary
            </h2>
            <p className="mt-2 text-sm leading-relaxed text-muted text-pretty">
              {profile.summary}
            </p>
          </section>

          {/* Experience */}
          <section className="mt-8">
            <h2 className="text-xs font-semibold uppercase tracking-wider text-subtle">
              Work Experience
            </h2>

            <div className="mt-4 space-y-6">
              {data.experience.map((job) => (
                <div key={`${job.company}-${job.role}`}>
                  <div className="flex flex-wrap items-baseline justify-between gap-2">
                    <h3 className="text-base font-semibold text-ink">
                      {job.role}
                    </h3>
                    <span className="text-xs text-subtle font-mono tabular-nums">
                      {job.period}
                    </span>
                  </div>

                  <div className="mt-0.5 text-xs font-medium text-accent">
                    {job.company} · {job.type}
                  </div>

                  <p className="mt-2 text-sm leading-relaxed text-muted">
                    {job.description}
                  </p>

                  {job.stack && (
                    <div className="mt-2.5 flex flex-wrap gap-1.5">
                      {job.stack.map((tech) => (
                        <span
                          key={tech}
                          className="rounded border border-line bg-elevated px-2 py-0.5 text-[11px] font-medium text-muted"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </section>

          {/* Key Projects */}
          <section className="mt-8 border-t border-line/60 pt-6">
            <h2 className="text-xs font-semibold uppercase tracking-wider text-subtle">
              Key Projects
            </h2>

            <div className="mt-4 space-y-5">
              {data.projects.map((project) => (
                <div key={project.title}>
                  <div className="flex flex-wrap items-baseline justify-between gap-2">
                    <h3 className="text-sm font-semibold text-ink">
                      {project.title}
                    </h3>
                    {project.period && (
                      <span className="text-xs text-subtle font-mono tabular-nums">
                        {project.period}
                      </span>
                    )}
                  </div>

                  <p className="mt-1 text-sm leading-relaxed text-muted">
                    {project.description}
                  </p>
                </div>
              ))}
            </div>
          </section>

          {/* Education */}
          <section className="mt-8 border-t border-line/60 pt-6">
            <h2 className="text-xs font-semibold uppercase tracking-wider text-subtle">
              Education
            </h2>

            <div className="mt-4 grid gap-4 sm:grid-cols-2">
              {data.education.map((item) => (
                <div key={item.degree} className="text-sm">
                  <div className="font-semibold text-ink">
                    {item.degree}
                  </div>
                  <div className="text-xs text-muted">
                    {item.institution}
                  </div>
                  <div className="mt-0.5 text-xs text-subtle font-mono tabular-nums">
                    {item.period} · {item.status}
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Skills */}
          <section className="mt-8 border-t border-line/60 pt-6">
            <h2 className="text-xs font-semibold uppercase tracking-wider text-subtle">
              Skills &amp; Competencies
            </h2>

            <div className="mt-3 grid gap-3 sm:grid-cols-2">
              {data.skills.map((group) => (
                <div key={group.category} className="text-xs">
                  <span className="font-semibold text-ink">
                    {group.category}:{' '}
                  </span>
                  <span className="text-muted">
                    {group.items.join(', ')}
                  </span>
                </div>
              ))}
            </div>
          </section>

          {/* Languages */}
          <section className="mt-8 border-t border-line/60 pt-6">
            <h2 className="text-xs font-semibold uppercase tracking-wider text-subtle">
              Languages
            </h2>

            <div className="mt-2 flex gap-6 text-xs text-muted">
              {data.languages.map((lang) => (
                <div key={lang.name}>
                  <span className="font-semibold text-ink">
                    {lang.name}:
                  </span>{' '}
                  {lang.level}
                </div>
              ))}
            </div>
          </section>
        </main>
      </div>

      {/* PDF / Print View (Harvard CV style, same font family) */}
      <article className="hidden font-sans text-black print:block print:px-5 print:py-4">
        {/* Centered Header */}
        <header className="text-center">
          <h1 className="text-[17pt] font-bold uppercase leading-tight tracking-[0.06em] text-black">
            {profile.name}
          </h1>

          <p className="mt-0.5 text-[10pt] italic text-black">
            {profile.role}
          </p>

          <div className="mt-1 flex flex-wrap items-center justify-center gap-x-2 text-[9.5pt] text-black">
            <span>{profile.location}</span>
            <span aria-hidden="true">•</span>
            <a href={telHref} className="text-black no-underline">
              {profile.phone}
            </a>
            <span aria-hidden="true">•</span>
            <a href={mailtoHref} className="text-black no-underline">
              {profile.email}
            </a>
            <span aria-hidden="true">•</span>
            <a
              href={profile.github}
              target="_blank"
              rel="noopener noreferrer"
              className="text-black no-underline"
            >
              {githubHandle}
            </a>
          </div>
        </header>

        {/* Summary */}
        <section className="mt-3.5 break-inside-avoid">
          <PrintSectionHeading>Summary</PrintSectionHeading>
          <p className="mt-1 text-[10pt] leading-[1.35] text-black text-pretty">
            {profile.summary}
          </p>
        </section>

        {/* Education */}
        <section className="mt-3.5 break-inside-avoid">
          <PrintSectionHeading>Education</PrintSectionHeading>

          <div className="mt-1.5 space-y-1.5">
            {data.education.map((item) => (
              <div key={item.degree} className="text-[10pt] leading-[1.32]">
                <div className="flex items-baseline justify-between gap-x-4">
                  <span className="font-bold text-black">
                    {item.institution}
                  </span>
                  <span className="text-[9.5pt] tabular-nums text-black">
                    {item.period}
                  </span>
                </div>
                <div className="flex items-baseline justify-between gap-x-4">
                  <span className="italic text-black">
                    {item.degree}
                  </span>
                  <span className="text-[9.5pt] italic text-black">
                    {item.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Experience */}
        <section className="mt-3.5">
          <PrintSectionHeading>Experience</PrintSectionHeading>

          <div className="mt-1.5 space-y-2.5">
            {data.experience.map((job) => (
              <div
                key={`${job.company}-${job.role}-${job.period}`}
                className="break-inside-avoid text-[10pt] leading-[1.32]"
              >
                <div className="flex items-baseline justify-between gap-x-4">
                  <span className="font-bold text-black">
                    {job.company}
                  </span>
                  <span className="text-[9.5pt] tabular-nums text-black">
                    {job.period}
                  </span>
                </div>

                <div className="flex items-baseline justify-between gap-x-4">
                  <span className="italic text-black">
                    {job.role}
                  </span>
                  <span className="text-[9.5pt] italic text-black">
                    {job.type}
                  </span>
                </div>

                <ul className="mt-0.5 list-disc space-y-0.5 pl-4 text-black">
                  <li>{job.description}</li>
                  {job.stack && job.stack.length > 0 && (
                    <li>
                      <span className="font-semibold">Technologies:</span>{' '}
                      {job.stack.join(', ')}
                    </li>
                  )}
                </ul>
              </div>
            ))}
          </div>
        </section>

        {/* Skills & Languages */}
        <section className="mt-3.5 break-inside-avoid">
          <PrintSectionHeading>Skills &amp; Languages</PrintSectionHeading>

          <div className="mt-1.5 space-y-0.5 text-[10pt] leading-[1.32]">
            {data.skills.map((group) => (
              <div key={group.category}>
                <span className="font-bold text-black">
                  {group.category}:{' '}
                </span>
                <span className="text-black">
                  {group.items.join(', ')}
                </span>
              </div>
            ))}

            <div>
              <span className="font-bold text-black">
                Languages:{' '}
              </span>
              <span className="text-black">
                {data.languages
                  .map((lang) => `${lang.name} (${lang.level})`)
                  .join(', ')}
              </span>
            </div>
          </div>
        </section>
      </article>
    </div>
  );
}
