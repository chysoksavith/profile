import { ArrowUpRight } from 'lucide-react';
import Section from '@/components/Section';
import ProjectCard from '@/components/ProjectCard';
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
          <ProjectCard key={project.title} project={project} />
        ))}
      </div>
    </Section>
  );
}
