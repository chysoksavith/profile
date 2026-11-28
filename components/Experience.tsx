import Section from '@/components/Section';
import Tag from '@/components/Tag';
import { data } from '@/lib/data';

export default function Experience() {
  return (
    <Section id="experience" label="Experience">
      <ol className="space-y-8 border-l border-line pl-6">
        {data.experience.map((job) => (
          <li key={`${job.company}-${job.role}`} className="relative">
            <span
              aria-hidden="true"
              className="absolute top-1.5 -left-7 size-2 rounded-full bg-line-strong ring-4 ring-canvas"
            />

            <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
              <h3 className="font-medium">{job.role}</h3>
              <span className="text-xs text-subtle tabular-nums">
                {job.period}
              </span>
            </div>

            <p className="mt-1 text-sm text-muted">
              <span className="text-purple">{job.company}</span>
              <span aria-hidden="true" className="mx-1.5 text-subtle">
                ·
              </span>
              {job.type}
            </p>

            <p className="mt-2.5 text-sm leading-relaxed text-muted text-pretty">
              {job.description}
            </p>

            {job.stack && job.stack.length > 0 && (
              <div className="mt-3 flex flex-wrap gap-1.5">
                {job.stack.map((tech) => (
                  <Tag key={tech}>{tech}</Tag>
                ))}
              </div>
            )}
          </li>
        ))}
      </ol>
    </Section>
  );
}
