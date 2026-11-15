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

export default function CvPage() {
  return (
    <div className="min-h-screen bg-canvas py-8 px-4 sm:px-6 md:py-12 print:bg-white print:p-0">
      {/* Top action bar (hidden on print) */}
      <div className="mx-auto max-w-3xl mb-8 flex items-center justify-between print:hidden">
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
      <main className="mx-auto max-w-3xl rounded-2xl border border-line bg-surface p-7 sm:p-10 shadow-sm print:border-0 print:p-0 print:shadow-none print:text-black">
        {/* Header */}
        <header className="border-b border-line pb-6 print:border-gray-300">
          <h1 className="text-3xl font-bold tracking-tight text-ink sm:text-4xl print:text-black">
            {profile.name}
          </h1>
          <p className="mt-1 text-lg font-medium text-accent print:text-gray-700">
            {profile.role}
          </p>

          <div className="mt-4 flex flex-wrap gap-x-5 gap-y-2 text-xs text-muted sm:text-sm print:text-gray-600">
            <a
              href={telHref}
              className="inline-flex items-center gap-1.5 hover:text-ink print:text-black"
            >
              <Phone size={14} className="shrink-0 text-subtle print:hidden" />
              <span>{profile.phone}</span>
            </a>

            <a
              href={mailtoHref}
              className="inline-flex items-center gap-1.5 hover:text-ink print:text-black"
            >
              <Mail size={14} className="shrink-0 text-subtle print:hidden" />
              <span>{profile.email}</span>
            </a>

            <span className="inline-flex items-center gap-1.5">
              <MapPin size={14} className="shrink-0 text-subtle print:hidden" />
              <span>{profile.location}</span>
            </span>

            <a
              href={profile.github}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 hover:text-ink print:text-black"
            >
              <GithubIcon size={14} className="shrink-0 text-subtle print:hidden" />
              <span>{githubHandle}</span>
            </a>
          </div>
        </header>

        {/* Professional Summary */}
        <section className="mt-6">
          <h2 className="text-xs font-semibold uppercase tracking-wider text-subtle print:text-gray-800">
            Professional Summary
          </h2>
          <p className="mt-2 text-sm leading-relaxed text-muted text-pretty print:text-gray-700">
            {profile.summary}
          </p>
        </section>

        {/* Experience */}
        <section className="mt-8">
          <h2 className="text-xs font-semibold uppercase tracking-wider text-subtle print:text-gray-800">
            Work Experience
          </h2>

          <div className="mt-4 space-y-6">
            {data.experience.map((job) => (
              <div key={`${job.company}-${job.role}`}>
                <div className="flex flex-wrap items-baseline justify-between gap-2">
                  <h3 className="text-base font-semibold text-ink print:text-black">
                    {job.role}
                  </h3>
                  <span className="text-xs text-subtle font-mono tabular-nums print:text-gray-600">
                    {job.period}
                  </span>
                </div>

                <div className="mt-0.5 text-xs font-medium text-accent print:text-gray-800">
                  {job.company} · {job.type}
                </div>

                <p className="mt-2 text-sm leading-relaxed text-muted print:text-gray-700">
                  {job.description}
                </p>

                {job.stack && (
                  <div className="mt-2.5 flex flex-wrap gap-1.5">
                    {job.stack.map((tech) => (
                      <span
                        key={tech}
                        className="rounded border border-line bg-elevated px-2 py-0.5 text-[11px] font-medium text-muted print:border-gray-300 print:bg-gray-100 print:text-gray-800"
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
        <section className="mt-8 border-t border-line/60 pt-6 print:border-gray-300">
          <h2 className="text-xs font-semibold uppercase tracking-wider text-subtle print:text-gray-800">
            Key Projects
          </h2>

          <div className="mt-4 space-y-5">
            {data.projects.map((project) => (
              <div key={project.title}>
                <div className="flex flex-wrap items-baseline justify-between gap-2">
                  <h3 className="text-sm font-semibold text-ink print:text-black">
                    {project.title}
                  </h3>
                  {project.period && (
                    <span className="text-xs text-subtle font-mono tabular-nums print:text-gray-600">
                      {project.period}
                    </span>
                  )}
                </div>

                <p className="mt-1 text-sm leading-relaxed text-muted print:text-gray-700">
                  {project.description}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Education */}
        <section className="mt-8 border-t border-line/60 pt-6 print:border-gray-300">
          <h2 className="text-xs font-semibold uppercase tracking-wider text-subtle print:text-gray-800">
            Education
          </h2>

          <div className="mt-4 grid gap-4 sm:grid-cols-2">
            {data.education.map((item) => (
              <div key={item.degree} className="text-sm">
                <div className="font-semibold text-ink print:text-black">
                  {item.degree}
                </div>
                <div className="text-xs text-muted print:text-gray-700">
                  {item.institution}
                </div>
                <div className="mt-0.5 text-xs text-subtle font-mono tabular-nums print:text-gray-600">
                  {item.period} · {item.status}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Skills */}
        <section className="mt-8 border-t border-line/60 pt-6 print:border-gray-300">
          <h2 className="text-xs font-semibold uppercase tracking-wider text-subtle print:text-gray-800">
            Skills & Competencies
          </h2>

          <div className="mt-3 grid gap-3 sm:grid-cols-2">
            {data.skills.map((group) => (
              <div key={group.category} className="text-xs">
                <span className="font-semibold text-ink print:text-black">
                  {group.category}:{' '}
                </span>
                <span className="text-muted print:text-gray-700">
                  {group.items.join(', ')}
                </span>
              </div>
            ))}
          </div>
        </section>

        {/* Languages */}
        <section className="mt-8 border-t border-line/60 pt-6 print:border-gray-300">
          <h2 className="text-xs font-semibold uppercase tracking-wider text-subtle print:text-gray-800">
            Languages
          </h2>

          <div className="mt-2 flex gap-6 text-xs text-muted print:text-gray-700">
            {data.languages.map((lang) => (
              <div key={lang.name}>
                <span className="font-semibold text-ink print:text-black">
                  {lang.name}:
                </span>{' '}
                {lang.level}
              </div>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}
