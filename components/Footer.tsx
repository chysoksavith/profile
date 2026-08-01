import { Mail, Phone } from 'lucide-react';
import GithubIcon from '@/components/GithubIcon';
import { footer, mailtoHref, profile, telHref } from '@/lib/data';

const links = [
  { icon: Mail, label: 'Email', href: mailtoHref, external: false },
  { icon: Phone, label: 'Phone', href: telHref, external: false },
  { icon: GithubIcon, label: 'GitHub', href: profile.github, external: true },
];

export default function Footer() {
  return (
    <footer className="border-t border-line">
      <div className="mx-auto flex max-w-3xl flex-col items-center justify-between gap-4 px-6 py-8 text-xs text-subtle sm:flex-row">
        <p>
          © {new Date().getFullYear()} {profile.name}. {footer.note}
        </p>

        <ul className="flex items-center gap-5">
          {links.map(({ icon: Icon, label, href, external }) => (
            <li key={label}>
              <a
                href={href}
                {...(external
                  ? { target: '_blank', rel: 'noopener noreferrer' }
                  : {})}
                className="inline-flex items-center gap-1.5 transition-colors hover:text-ink"
              >
                <Icon size={13} />
                {label}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </footer>
  );
}
