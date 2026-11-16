import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowLeft, ArrowUp, ArrowUpRight } from 'lucide-react';
import Footer from '@/components/Footer';
import GithubIcon from '@/components/GithubIcon';
import ProjectCard from '@/components/ProjectCard';
import ThemeToggle from '@/components/ThemeToggle';
import { data, profile } from '@/lib/data';

export const metadata: Metadata = {
  title: `Projects | ${profile.name}`,
  description: `Projects and engineering work built by ${profile.name}.`,
};

export default function ProjectsPage() {
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
          Projects
        </h1>
        <p className="mt-2 text-base text-muted">
          Check out what I’ve built, client systems, and ongoing software projects.
        </p>
      </header>

      {/* Projects List */}
      <section className="mt-12 space-y-8">
        {data.projects.map((project) => (
          <ProjectCard key={project.title} project={project} />
        ))}

        {/* GitHub link callout */}
        <div className="rounded-2xl border border-line/60 bg-elevated/40 p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <h3 className="text-base font-semibold text-ink">
              Looking for more repositories?
            </h3>
            <p className="text-sm text-muted mt-1">
              Explore more code and experiments directly on my GitHub profile.
            </p>
          </div>
          <a
            href={profile.github}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex shrink-0 items-center gap-2 rounded-xl border border-line bg-surface px-4 py-2.5 text-sm font-medium text-ink transition-colors hover:border-line-strong hover:bg-elevated"
          >
            <GithubIcon size={16} />
            GitHub Profile
            <ArrowUpRight size={14} />
          </a>
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
