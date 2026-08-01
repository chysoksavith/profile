import type { ReactNode } from 'react';

/** Small pill used for tech tags and metadata. */
export default function Tag({ children }: { children: ReactNode }) {
  return (
    <span className="rounded-md border border-line bg-elevated px-2 py-0.5 text-[11px] font-medium text-muted">
      {children}
    </span>
  );
}
