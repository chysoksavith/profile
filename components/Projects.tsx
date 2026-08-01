import { ArrowUpRight } from 'lucide-react';
import GithubIcon from '@/components/GithubIcon';
import Section from '@/components/Section';
import Tag from '@/components/Tag';
import { data, profile } from '@/lib/data';

export default function Projects() {
  return (
    <Section
      id="projects"
      label="Projects"
      action={
        <a
          href={profile.github}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1 text-xs font-medium text-muted transition-colors hover:text-ink"
        >
          All repositories
          <ArrowUpRight size={12} />
        </a>
      }
    >
      <div className="grid gap-3 sm:grid-cols-2">
        {data.projects.map((project) => (
          <article
            key={project.title}
            className={`flex flex-col rounded-xl border border-line bg-surface p-5 transition-colors hover:border-line-strong ${
              project.featured ? 'sm:col-span-2' : ''
            }`}
          >
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
                    <li
                      key={highlight}
                      className="flex gap-2.5 text-sm text-muted"
                    >
                      <span
                        aria-hidden="true"
                        className="mt-[0.5em] size-1 shrink-0 rounded-full bg-line-strong"
                      />
                      <span className="leading-relaxed text-pretty">
                        {highlight}
                      </span>
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
              <div className="mt-4 flex items-center gap-4 border-t border-line pt-3.5">
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
        ))}
      </div>
    </Section>
  );
}
