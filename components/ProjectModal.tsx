'use client';

import { useEffect, useRef, useState, useCallback } from 'react';
import Image from 'next/image';
import { AnimatePresence, motion } from 'framer-motion';
import {
  X,
  ChevronLeft,
  ChevronRight,
  Monitor,
  Smartphone,
  ArrowUpRight,
} from 'lucide-react';
import GithubIcon from '@/components/GithubIcon';
import Tag from '@/components/Tag';
import type { Project } from '@/lib/data';

interface Props {
  project: Project;
  onClose: () => void;
}

export default function ProjectModal({ project, onClose }: Props) {
  const images = project.images ?? [];
  const webImages = images.filter((i) => i.type === 'web');
  const mobileImages = images.filter((i) => i.type === 'mobile');

  const [activeTab, setActiveTab] = useState<'web' | 'mobile'>(
    webImages.length > 0 ? 'web' : 'mobile',
  );
  const [idx, setIdx] = useState(0);
  const overlayRef = useRef<HTMLDivElement>(null);

  const gallery = activeTab === 'web' ? webImages : mobileImages;
  const current = gallery[idx] ?? null;

  // Reset index when switching tabs
  const switchTab = (tab: 'web' | 'mobile') => {
    setActiveTab(tab);
    setIdx(0);
  };

  const prev = useCallback(() => setIdx((i) => (i - 1 + gallery.length) % gallery.length), [gallery.length]);
  const next = useCallback(() => setIdx((i) => (i + 1) % gallery.length), [gallery.length]);

  // Keyboard navigation
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowLeft') prev();
      if (e.key === 'ArrowRight') next();
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [onClose, prev, next]);

  // Lock body scroll
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = ''; };
  }, []);

  return (
    <AnimatePresence>
      {/* Backdrop */}
      <motion.div
        key="backdrop"
        ref={overlayRef}
        className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6"
        style={{ background: 'rgba(0,0,0,0.75)', backdropFilter: 'blur(6px)' }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.2 }}
        onClick={(e) => { if (e.target === overlayRef.current) onClose(); }}
      >
        {/* Panel */}
        <motion.div
          key="panel"
          className="relative flex w-full max-w-5xl flex-col rounded-2xl border border-line bg-surface shadow-2xl overflow-hidden"
          style={{ maxHeight: '90vh' }}
          initial={{ opacity: 0, y: 24, scale: 0.97 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 16, scale: 0.97 }}
          transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
        >
          {/* Close button */}
          <button
            onClick={onClose}
            aria-label="Close"
            className="absolute right-4 top-4 z-10 flex size-8 items-center justify-center rounded-full border border-line bg-elevated text-muted transition-colors hover:border-line-strong hover:text-ink"
          >
            <X size={15} />
          </button>

          <div className="flex flex-col overflow-y-auto lg:flex-row lg:overflow-hidden" style={{ maxHeight: '90vh' }}>
            {/* ── Left: Gallery ── */}
            <div className="flex flex-col bg-canvas lg:w-[58%] lg:overflow-y-auto">
              {/* Platform tabs */}
              {webImages.length > 0 && mobileImages.length > 0 && (
                <div className="flex gap-1 border-b border-line px-4 pt-4">
                  <button
                    onClick={() => switchTab('web')}
                    className={`inline-flex items-center gap-1.5 rounded-t-md px-3 py-1.5 text-xs font-medium transition-colors ${
                      activeTab === 'web'
                        ? 'bg-surface text-ink border border-b-0 border-line'
                        : 'text-muted hover:text-ink'
                    }`}
                  >
                    <Monitor size={12} /> Web App
                  </button>
                  <button
                    onClick={() => switchTab('mobile')}
                    className={`inline-flex items-center gap-1.5 rounded-t-md px-3 py-1.5 text-xs font-medium transition-colors ${
                      activeTab === 'mobile'
                        ? 'bg-surface text-ink border border-b-0 border-line'
                        : 'text-muted hover:text-ink'
                    }`}
                  >
                    <Smartphone size={12} /> Mobile App
                  </button>
                </div>
              )}

              {/* Main screenshot */}
              {current && (
                <div className="relative flex flex-col items-center px-4 py-5">
                  {activeTab === 'web' ? (
                    /* Browser chrome frame */
                    <div className="w-full overflow-hidden rounded-xl border border-line shadow-lg">
                      {/* Browser top bar */}
                      <div className="flex items-center gap-1.5 border-b border-line bg-elevated px-3 py-2">
                        <span className="size-2.5 rounded-full bg-red-400" />
                        <span className="size-2.5 rounded-full bg-yellow-400" />
                        <span className="size-2.5 rounded-full bg-green-400" />
                        <div className="mx-2 flex-1 rounded bg-line px-2 py-0.5 text-[10px] text-subtle truncate">
                          company-erp.app
                        </div>
                      </div>
                      <div className="relative aspect-video w-full overflow-hidden bg-canvas">
                        <AnimatePresence mode="wait">
                          <motion.div
                            key={current.src}
                            className="absolute inset-0"
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -20 }}
                            transition={{ duration: 0.2 }}
                          >
                            <Image
                              src={current.src}
                              alt={current.label}
                              fill
                              className="object-cover object-top"
                              unoptimized
                            />
                          </motion.div>
                        </AnimatePresence>
                      </div>
                    </div>
                  ) : (
                    /* Phone frame */
                    <div className="mx-auto w-[220px]">
                      <div className="relative overflow-hidden rounded-[2.2rem] border-[7px] border-ink bg-ink shadow-2xl">
                        {/* Notch */}
                        <div className="absolute left-1/2 top-0 z-10 h-5 w-20 -translate-x-1/2 rounded-b-xl bg-ink" />
                        <div className="relative overflow-hidden rounded-[1.5rem] bg-white" style={{ aspectRatio: '9/19.5' }}>
                          <AnimatePresence mode="wait">
                            <motion.div
                              key={current.src}
                              className="absolute inset-0"
                              initial={{ opacity: 0, x: 20 }}
                              animate={{ opacity: 1, x: 0 }}
                              exit={{ opacity: 0, x: -20 }}
                              transition={{ duration: 0.2 }}
                            >
                              <Image
                                src={current.src}
                                alt={current.label}
                                fill
                                className="object-cover object-top"
                                unoptimized
                              />
                            </motion.div>
                          </AnimatePresence>
                        </div>
                        {/* Home indicator */}
                        <div className="flex justify-center bg-ink py-1.5">
                          <div className="h-1 w-16 rounded-full bg-elevated" />
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Caption + nav */}
                  <div className="mt-3 flex w-full items-center justify-between gap-2">
                    <button
                      onClick={prev}
                      disabled={gallery.length <= 1}
                      className="flex size-7 items-center justify-center rounded-full border border-line text-muted transition-colors hover:border-line-strong hover:text-ink disabled:opacity-30"
                    >
                      <ChevronLeft size={14} />
                    </button>
                    <span className="text-center text-xs font-medium text-muted">
                      {current.label}
                      <span className="ml-1.5 text-subtle">
                        ({idx + 1}/{gallery.length})
                      </span>
                    </span>
                    <button
                      onClick={next}
                      disabled={gallery.length <= 1}
                      className="flex size-7 items-center justify-center rounded-full border border-line text-muted transition-colors hover:border-line-strong hover:text-ink disabled:opacity-30"
                    >
                      <ChevronRight size={14} />
                    </button>
                  </div>
                </div>
              )}

              {/* Thumbnails */}
              {gallery.length > 1 && (
                <div className="flex flex-wrap gap-1.5 px-4 pb-4">
                  {gallery.map((img, i) => (
                    <button
                      key={img.src}
                      onClick={() => setIdx(i)}
                      className={`relative overflow-hidden rounded-md border transition-all ${
                        i === idx
                          ? 'border-accent ring-1 ring-accent'
                          : 'border-line opacity-60 hover:opacity-100'
                      }`}
                      style={{ width: 56, height: 36 }}
                    >
                      <Image
                        src={img.src}
                        alt={img.label}
                        fill
                        className="object-cover object-top"
                        unoptimized
                      />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* ── Right: Info ── */}
            <div className="flex flex-col gap-5 border-t border-line p-6 lg:w-[42%] lg:overflow-y-auto lg:border-l lg:border-t-0">
              {/* Header */}
              <div>
                <div className="flex flex-wrap items-center gap-2">
                  <h2 className="text-xl font-bold tracking-tight text-ink">
                    {project.title}
                  </h2>
                  {project.status && (
                    <span className="rounded bg-accent-soft px-2 py-0.5 text-[11px] font-medium text-accent">
                      {project.status}
                    </span>
                  )}
                </div>
                {project.role && (
                  <p className="mt-1 text-xs font-medium text-muted">
                    Role: <span className="text-ink">{project.role}</span>
                  </p>
                )}
                {project.period && (
                  <p className="mt-0.5 font-mono text-xs text-subtle">
                    {project.period}
                  </p>
                )}
              </div>

              {/* Description */}
              <p className="text-sm leading-relaxed text-muted">
                {project.description}
              </p>

              {/* Highlights */}
              {project.highlights && project.highlights.length > 0 && (
                <div>
                  <h3 className="mb-2 text-[11px] font-semibold uppercase tracking-wider text-subtle">
                    Key Features
                  </h3>
                  <ul className="space-y-2">
                    {project.highlights.map((h) => (
                      <li key={h} className="flex gap-2 text-sm text-muted">
                        <span
                          aria-hidden="true"
                          className="mt-[0.45em] size-1.5 shrink-0 rounded-full bg-accent"
                        />
                        <span className="leading-relaxed">{h}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Tech stack */}
              <div>
                <h3 className="mb-2 text-[11px] font-semibold uppercase tracking-wider text-subtle">
                  Tech Stack
                </h3>
                <div className="flex flex-wrap gap-1.5">
                  {project.tags.map((tag) => (
                    <Tag key={tag}>{tag}</Tag>
                  ))}
                </div>
              </div>

              {/* Platform summary */}
              <div className="rounded-xl border border-line bg-elevated/60 p-3.5">
                <h3 className="mb-2 text-[11px] font-semibold uppercase tracking-wider text-subtle">
                  Platforms
                </h3>
                <div className="space-y-1.5 text-sm text-muted">
                  {webImages.length > 0 && (
                    <div className="flex items-center gap-2">
                      <Monitor size={13} className="shrink-0 text-accent" />
                      <span>Web ERP — {webImages.length} screens</span>
                    </div>
                  )}
                  {mobileImages.length > 0 && (
                    <div className="flex items-center gap-2">
                      <Smartphone size={13} className="shrink-0 text-accent" />
                      <span>Flutter Mobile App — {mobileImages.length} screens</span>
                    </div>
                  )}
                </div>
              </div>

              {/* Links */}
              {(project.github || project.demo) && (
                <div className="flex items-center gap-4 border-t border-line pt-4">
                  {project.github && (
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 text-xs font-medium text-muted transition-colors hover:text-ink"
                    >
                      <GithubIcon size={14} /> Source code
                    </a>
                  )}
                  {project.demo && (
                    <a
                      href={project.demo}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 text-xs font-medium text-muted transition-colors hover:text-ink"
                    >
                      Live preview <ArrowUpRight size={13} />
                    </a>
                  )}
                </div>
              )}
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
