'use client';

import { Printer } from 'lucide-react';

export default function PrintCvButton() {
  return (
    <button
      type="button"
      onClick={() => window.print()}
      className="inline-flex items-center gap-2 rounded-xl border border-line bg-surface px-4 py-2 text-sm font-medium text-ink transition-colors hover:border-line-strong hover:bg-elevated cursor-pointer print:hidden"
    >
      <Printer size={15} />
      Print / Save as PDF
    </button>
  );
}
