'use client';

import { useEffect, useRef, useState } from 'react';
import { Check, Copy } from 'lucide-react';
import { profile } from '@/lib/data';
import { buttonSecondary } from '@/lib/styles';

export default function CopyEmail() {
  const [copied, setCopied] = useState(false);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Avoid setting state after unmount.
  useEffect(
    () => () => {
      if (timer.current) clearTimeout(timer.current);
    },
    [],
  );

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(profile.email);
      setCopied(true);
      if (timer.current) clearTimeout(timer.current);
      timer.current = setTimeout(() => setCopied(false), 2000);
    } catch {
      // Clipboard is unavailable in insecure contexts or when blocked by the
      // user. The address is also a plain mailto link, so fail quietly.
    }
  };

  return (
    <button
      type="button"
      onClick={copy}
      className={buttonSecondary}
      title={`Copy ${profile.email}`}
    >
      {copied ? (
        <>
          <Check size={15} className="text-positive" />
          Copied
        </>
      ) : (
        <>
          <Copy size={15} />
          Copy email
        </>
      )}
      <span aria-live="polite" className="sr-only">
        {copied ? 'Email address copied to clipboard' : ''}
      </span>
    </button>
  );
}
