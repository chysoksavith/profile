import Link from 'next/link';
import { ArrowRight, FileText } from 'lucide-react';
import Footer from '@/components/Footer';
import QuickConnect from '@/components/QuickConnect';
import ThemeToggle from '@/components/ThemeToggle';
import { data, profile } from '@/lib/data';

export default function Home() {
  const currentRole = data.experience[0];

  return (
    <main className="mx-auto max-w-3xl px-4 py-10 sm:px-6 sm:py-16">
      <div className="grid grid-cols-1 gap-5 md:grid-cols-2 sm:gap-6">
        {/* Card 1: About Me (Span 2) */}
        <article className="flex flex-col justify-between rounded-2xl border border-line bg-surface p-5 transition-all duration-200 hover:border-line-strong sm:p-6 md:col-span-2">
          <div className="flex flex-col gap-5">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <h1 className="text-2xl font-bold tracking-tight text-ink sm:text-3xl">
                Hey! Savit here
              </h1>

              <div className="flex flex-wrap items-center gap-2.5">
                <Link
                  href="/cv"
                  className="inline-flex items-center gap-1.5 rounded-full border border-line bg-surface px-3 py-1 text-xs font-medium text-muted transition-colors hover:border-line-strong hover:text-ink"
                >
                  <FileText size={13} />
                  CV
                </Link>

                {profile.available && (
                  <span className="inline-flex items-center gap-2 rounded-full border border-line bg-elevated px-3 py-1 text-xs font-medium text-muted">
                    <span className="relative flex size-1.5">
                      <span className="absolute inline-flex size-full animate-ping rounded-full bg-positive opacity-75" />
                      <span className="relative inline-flex size-1.5 rounded-full bg-positive" />
                    </span>
                    {profile.availability}
                  </span>
                )}
                <ThemeToggle />
              </div>
            </div>

            <div className="space-y-3">
              <h2 className="text-xs font-semibold uppercase tracking-wider text-subtle">
                About me
              </h2>
              <p className="text-sm leading-relaxed text-muted sm:text-base">
                A Web Developer & IT Engineer based in Phnom Penh, Cambodia. Currently
                pursuing a Master of Information Technology Engineering at the{' '}
                <span className="text-ink font-medium">
                  Royal University of Phnom Penh (RUPP)
                </span>
                .
              </p>
              <p className="text-sm leading-relaxed text-muted sm:text-base">
                I care about clean, maintainable code and enjoy engineering high-performance
                web applications and scalable APIs with Vue.js, Node.js, Express, PHP,
                Laravel, and PostgreSQL.
              </p>
            </div>
          </div>
        </article>

        {/* Card 2: Current Role (Span 2) */}
        {currentRole && (
          <article className="flex flex-col justify-between rounded-2xl border border-line bg-surface p-5 transition-all duration-200 hover:border-line-strong sm:p-6 md:col-span-2">
            <div>
              <div className="flex items-center justify-between">
                <h2 className="text-xs font-semibold uppercase tracking-wider text-subtle">
                  Current Role
                </h2>
                <span className="text-xs text-subtle tabular-nums font-mono">
                  {currentRole.period}
                </span>
              </div>

              <div className="mt-3">
                <div className="text-lg font-semibold tracking-tight text-ink sm:text-xl">
                  {currentRole.role}
                </div>
                <div className="mt-0.5 text-sm font-medium text-muted">
                  {currentRole.company} · {currentRole.type}
                </div>
                <p className="mt-2 text-sm leading-relaxed text-muted">
                  {currentRole.description}
                </p>

                {currentRole.stack && (
                  <div className="mt-3.5 flex flex-wrap gap-1.5">
                    {currentRole.stack.map((tech) => (
                      <span
                        key={tech}
                        className="rounded-md border border-line bg-elevated px-2 py-0.5 text-xs text-muted"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </div>

            <div className="mt-4 border-t border-line/60 pt-3">
              <Link
                href="/experience"
                className="inline-flex items-center gap-1.5 text-sm font-medium text-accent transition-colors hover:underline"
              >
                View full work history
                <ArrowRight size={14} />
              </Link>
            </div>
          </article>
        )}

        {/* Card 3: Experience Link Card */}
        <article className="rounded-2xl border border-line bg-surface transition-all duration-200 hover:border-line-strong hover:bg-elevated/40">
          <Link
            href="/experience"
            className="group flex min-h-[6.5rem] h-full items-center justify-between p-5 sm:p-6"
          >
            <div className="flex flex-col">
              <h2 className="text-xl font-bold tracking-tight text-ink">
                Experience
              </h2>
              <p className="mt-1 text-sm text-muted">
                My professional journey & qualifications
              </p>
            </div>
            <ArrowRight
              size={18}
              className="text-subtle transition-transform duration-200 group-hover:translate-x-1 group-hover:text-ink"
            />
          </Link>
        </article>

        {/* Card 4: Projects Link Card */}
        <article className="rounded-2xl border border-line bg-surface transition-all duration-200 hover:border-line-strong hover:bg-elevated/40">
          <Link
            href="/projects"
            className="group flex min-h-[6.5rem] h-full items-center justify-between p-5 sm:p-6"
          >
            <div className="flex flex-col">
              <h2 className="text-xl font-bold tracking-tight text-ink">
                Projects
              </h2>
              <p className="mt-1 text-sm text-muted">
                Check out what I’ve built
              </p>
            </div>
            <ArrowRight
              size={18}
              className="text-subtle transition-transform duration-200 group-hover:translate-x-1 group-hover:text-ink"
            />
          </Link>
        </article>

        {/* Card 5: Quick Connect (Span 2) */}
        <QuickConnect />
      </div>

      <Footer />
    </main>
  );
}
