import type { ReactNode } from 'react';

interface SectionProps {
  id?: string;
  /** Small uppercase label shown above the content. */
  label: string;
  /** Optional trailing element, e.g. a "view all" link. */
  action?: ReactNode;
  children: ReactNode;
  className?: string;
}

/**
 * Shared section shell: quiet label, hairline rule, content.
 * Keeps every section on the same rhythm.
 */
export default function Section({
  id,
  label,
  action,
  children,
  className = '',
}: SectionProps) {
  return (
    <section id={id} className={className}>
      <div className="mb-6 flex items-center gap-4">
        <h2 className="text-[11px] font-semibold uppercase tracking-[0.18em] text-subtle">
          {label}
        </h2>
        <span aria-hidden="true" className="h-px flex-1 bg-line" />
        {action}
      </div>
      {children}
    </section>
  );
}
