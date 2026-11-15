import { Mail, Phone, ArrowUpRight } from 'lucide-react';
import GithubIcon from '@/components/GithubIcon';
import { githubHandle, mailtoHref, profile, telHref } from '@/lib/data';

const channels = [
  {
    icon: GithubIcon,
    label: 'GitHub',
    value: githubHandle,
    href: profile.github,
    external: true,
  },
  {
    icon: Mail,
    label: 'Email',
    value: profile.email,
    href: mailtoHref,
    external: false,
  },
  {
    icon: Phone,
    label: 'Phone',
    value: profile.phone,
    href: telHref,
    external: false,
  },
];

export default function QuickConnect() {
  return (
    <article className="flex flex-col justify-between rounded-2xl border border-line bg-surface p-5 transition-all duration-200 hover:border-line-strong sm:p-6 md:col-span-2">
      <div className="flex flex-col gap-3">
        <h2 className="text-xs font-semibold uppercase tracking-wider text-subtle">
          Let’s connect
        </h2>

        <div className="grid grid-cols-1 gap-2.5 sm:grid-cols-3">
          {channels.map(({ icon: Icon, label, value, href, external }) => (
            <a
              key={label}
              href={href}
              {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
              className="group flex items-center justify-between gap-2.5 rounded-xl border border-line/60 bg-elevated/50 px-3.5 py-3 transition-colors hover:border-line-strong hover:bg-elevated"
            >
              <div className="flex min-w-0 items-center gap-2.5">
                <Icon size={16} className="shrink-0 text-subtle transition-colors group-hover:text-ink" />
                <span className="truncate text-xs font-medium text-muted transition-colors group-hover:text-ink sm:text-[13px]">
                  {value}
                </span>
              </div>
              <ArrowUpRight
                size={14}
                className="shrink-0 text-subtle transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-ink"
              />
            </a>
          ))}
        </div>
      </div>
    </article>
  );
}
