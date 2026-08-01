import Image from 'next/image';
import { ArrowUpRight, Mail, MapPin } from 'lucide-react';
import CopyEmail from '@/components/CopyEmail';
import GithubIcon from '@/components/GithubIcon';
import { mailtoHref, profile } from '@/lib/data';
import { buttonPrimary, buttonSecondary } from '@/lib/styles';

export default function Hero() {
  return (
    <section id="top" className="reveal pt-28 pb-16 sm:pt-32">
      <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-xs">
        {profile.available && (
          <span className="inline-flex items-center gap-2 rounded-full border border-line bg-surface px-2.5 py-1 font-medium text-muted">
            <span className="relative flex size-1.5">
              <span className="absolute inline-flex size-full animate-ping rounded-full bg-positive opacity-70" />
              <span className="relative inline-flex size-1.5 rounded-full bg-positive" />
            </span>
            {profile.availability}
          </span>
        )}
        <span className="inline-flex items-center gap-1.5 text-subtle">
          <MapPin size={13} />
          {profile.location}
        </span>
      </div>

      <div className="mt-7 flex items-center gap-5">
        {profile.avatar && (
          <Image
            src={profile.avatar}
            alt={`Portrait of ${profile.name}`}
            width={192}
            height={192}
            priority
            className="size-20 shrink-0 rounded-full border border-line object-cover object-top sm:size-24"
          />
        )}

        <div className="min-w-0">
          <h1 className="text-3xl font-semibold tracking-tight text-balance sm:text-4xl">
            {profile.name}
          </h1>
          <p className="mt-1.5 text-base text-muted sm:text-lg">
            {profile.role}
          </p>
        </div>
      </div>

        

      <div className="mt-8 flex flex-wrap items-center gap-2.5">
        <a href={mailtoHref} className={buttonPrimary}>
          <Mail size={15} />
          Email me
        </a>

        <CopyEmail />

        {profile.resumeUrl && (
          <a
            href={profile.resumeUrl}
            className={buttonSecondary}
            target="_blank"
            rel="noopener noreferrer"
          >
            Résumé
            <ArrowUpRight size={15} />
          </a>
        )}

        <a
          href={profile.github}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="GitHub profile"
          className="rounded-lg border border-line bg-surface p-2.5 text-muted transition-colors hover:border-line-strong hover:text-ink"
        >
          <GithubIcon size={16} />
        </a>
      </div>
    </section>
  );
}
