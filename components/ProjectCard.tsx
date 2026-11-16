'use client';

import { useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import { Images } from 'lucide-react';
import GithubIcon from '@/components/GithubIcon';
import Tag from '@/components/Tag';
import ProjectModal from '@/components/ProjectModal';
import { ArrowUpRight } from 'lucide-react';
import type { Project } from '@/lib/data';

export default function ProjectCard({ project }: { project: Project }) {
  const [open, setOpen] = useState(false);
  const hasGallery = (project.images?.length ?? 0) > 0;

  return (
    <>
      <article
        className={`group relative flex flex-col rounded-xl border border-line bg-surface p-5 transition-colors hover:border-line-strong ${
          project.featured ? 'sm:col-span-2' : ''
        } ${hasGallery ? 'cursor-pointer' : ''}`}
        onClick={() => { if (hasGallery) setOpen(true); }}
        role={hasGallery ? 'button' : undefined}
        tabIndex={hasGallery ? 0 : undefined}
        onKeyDown={(e) => { if (hasGallery && (e.key === 'Enter' || e.key === ' ')) setOpen(true); }}
        aria-label={hasGallery ? `View ${project.title} details` : undefined}
      >
        {/* "View project" hint shown on hover when has gallery */}
        {hasGallery && (
          <span className="absolute right-4 top-4 inline-flex items-center gap-1 rounded-full border border-line bg-elevated px-2.5 py-1 text-[10px] font-medium text-muted opacity-0 transition-opacity group-hover:opacity-100">
            <Images size={10} />
            View project
          </span>
        )}

        <div className="flex flex-wrap items-center gap-x-3 gap-y-1.5">
          <h3 className="text-sm font-semibold">{project.title}</h3>

          {project.status && (
            <span className="rounded bg-accent-soft px-1.5 py-0.5 text-[10px] font-medium text-accent">
              {project.status}
            </span>
          )}

          {project.period && (
            <span className="text-xs text-subtle tabular-nums sm:ml-auto">
              {project.period}
            </span>
          )}
        </div>

        {project.role && (
          <p className="mt-1.5 text-xs text-muted">{project.role}</p>
        )}

        <div className="flex-1">
          <p className="mt-2 text-sm leading-relaxed text-muted text-pretty">
            {project.description}
          </p>

          {project.highlights && project.highlights.length > 0 && (
            <ul
              className={`mt-3.5 gap-x-6 gap-y-1.5 ${
                project.featured ? 'grid sm:grid-cols-2' : 'grid'
              }`}
            >
              {project.highlights.map((highlight) => (
                <li key={highlight} className="flex gap-2.5 text-sm text-muted">
                  <span
                    aria-hidden="true"
                    className="mt-[0.5em] size-1 shrink-0 rounded-full bg-line-strong"
                  />
                  <span className="leading-relaxed text-pretty">{highlight}</span>
                </li>
              ))}
            </ul>
          )}
        </div>

        <div className="mt-4 flex flex-wrap gap-1.5">
          {project.tags.map((tag) => (
            <Tag key={tag}>{tag}</Tag>
          ))}
        </div>

        {(project.github || project.demo) && (
          <div
            className="mt-4 flex items-center gap-4 border-t border-line pt-3.5"
            onClick={(e) => e.stopPropagation()} // don't open modal when clicking links
          >
            {project.github && (
              <a
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-xs font-medium text-muted transition-colors hover:text-ink"
              >
                <GithubIcon size={13} />
                Source
              </a>
            )}
            {project.demo && (
              <a
                href={project.demo}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 text-xs font-medium text-muted transition-colors hover:text-ink"
              >
                Live demo
                <ArrowUpRight size={13} />
              </a>
            )}
          </div>
        )}
      </article>

      {open && (
        <AnimatePresence>
          <ProjectModal project={project} onClose={() => setOpen(false)} />
        </AnimatePresence>
      )}
    </>
  );
}
