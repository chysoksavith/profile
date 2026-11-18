'use client';

import { useSyncExternalStore } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { Sun, Moon } from 'lucide-react';

function subscribe(callback: () => void) {
  const observer = new MutationObserver(() => callback());
  observer.observe(document.documentElement, {
    attributes: true,
    attributeFilter: ['class'],
  });
  return () => observer.disconnect();
}

function getSnapshot() {
  return document.documentElement.classList.contains('dark') ? 'dark' : 'light';
}

function getServerSnapshot() {
  return 'dark';
}

export default function ThemeToggle() {
  const theme = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
  const isDark = theme === 'dark';

  const toggleTheme = () => {
    const nextTheme = isDark ? 'light' : 'dark';
    if (nextTheme === 'dark') {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  };

  return (
    <motion.button
      type="button"
      onClick={toggleTheme}
      whileHover={{ scale: 1.06 }}
      whileTap={{ scale: 0.94 }}
      transition={{ type: 'spring', stiffness: 350, damping: 20 }}
      aria-label={`Switch to ${isDark ? 'light' : 'dark'} mode`}
      title={`Current: ${isDark ? 'Dark' : 'Light'} Mode. Click to switch!`}
      className={`group relative inline-flex size-14 shrink-0 items-center justify-center rounded-full border-2 p-0.5 shadow-md transition-all duration-500 ease-out cursor-pointer ${
        isDark
          ? 'border-indigo-500/40 bg-zinc-900 hover:border-indigo-400 hover:shadow-[0_0_20px_rgba(165,180,252,0.45)]'
          : 'border-amber-400/50 bg-stone-100 hover:border-amber-500 hover:shadow-[0_0_20px_rgba(245,158,11,0.35)]'
      }`}
    >
      {/* Dual-Layer Seamless Morph Container */}
      <div className="relative size-full rounded-full overflow-hidden">
        {/* Dark Mode Image Layer */}
        <motion.div
          className="absolute inset-0 size-full"
          initial={false}
          animate={{
            opacity: isDark ? 1 : 0,
            scale: isDark ? 1 : 0.9,
            rotate: isDark ? 0 : -12,
          }}
          transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
        >
          <Image
            src="/logodark.jpeg"
            alt="Dark mode logo"
            fill
            sizes="56px"
            className="object-cover object-center select-none"
            priority
          />
        </motion.div>

        {/* Light Mode Image Layer */}
        <motion.div
          className="absolute inset-0 size-full"
          initial={false}
          animate={{
            opacity: isDark ? 0 : 1,
            scale: isDark ? 0.9 : 1,
            rotate: isDark ? 12 : 0,
          }}
          transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
        >
          <Image
            src="/logolight.jpeg"
            alt="Light mode logo"
            fill
            sizes="56px"
            className="object-cover object-center select-none"
            priority
          />
        </motion.div>
      </div>

      {/* Floating Corner Indicator Badge */}
      <div className="absolute -bottom-1 -right-1 flex size-5 items-center justify-center rounded-full border border-line bg-surface text-ink shadow-sm transition-colors duration-300">
        <AnimatePresence mode="wait" initial={false}>
          {isDark ? (
            <motion.span
              key="sun-badge"
              initial={{ scale: 0, rotate: -60, opacity: 0 }}
              animate={{ scale: 1, rotate: 0, opacity: 1 }}
              exit={{ scale: 0, rotate: 60, opacity: 0 }}
              transition={{ duration: 0.25, ease: 'easeOut' }}
              className="text-amber-400"
            >
              <Sun size={12} strokeWidth={2.5} />
            </motion.span>
          ) : (
            <motion.span
              key="moon-badge"
              initial={{ scale: 0, rotate: -60, opacity: 0 }}
              animate={{ scale: 1, rotate: 0, opacity: 1 }}
              exit={{ scale: 0, rotate: 60, opacity: 0 }}
              transition={{ duration: 0.25, ease: 'easeOut' }}
              className="text-indigo-500"
            >
              <Moon size={12} strokeWidth={2.5} />
            </motion.span>
          )}
        </AnimatePresence>
      </div>
    </motion.button>
  );
}
