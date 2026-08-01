import { Mail, MapPin, Phone } from 'lucide-react';
import GithubIcon from '@/components/GithubIcon';
import Section from '@/components/Section';
import {
  contact,
  githubHandle,
  mailtoHref,
  profile,
  telHref,
} from '@/lib/data';

const channels = [
  { icon: Mail, label: 'Email', value: profile.email, href: mailtoHref, external: false },
  { icon: Phone, label: 'Phone', value: profile.phone, href: telHref, external: false },
  { icon: GithubIcon, label: 'GitHub', value: githubHandle, href: profile.github, external: true },
];

export default function Contact() {
  return (
    <Section id="contact" label="Contact">
      <div className="grid items-start gap-8 sm:grid-cols-2 sm:gap-10">
        <div>
          <h3 className="text-lg font-medium tracking-tight">
            {contact.heading}
          </h3>
          <p className="mt-2.5 text-sm leading-relaxed text-muted text-pretty">
            {contact.intro}
          </p>
          <p className="mt-5 flex items-start gap-2 text-xs leading-relaxed text-subtle">
            <MapPin size={13} className="mt-0.5 shrink-0" />
            {profile.address}
          </p>
        </div>

        <ul className="space-y-1">
          {channels.map(({ icon: Icon, label, value, href, external }) => (
            <li key={label}>
              <a
                href={href}
                {...(external
                  ? { target: '_blank', rel: 'noopener noreferrer' }
                  : {})}
                className="group -mx-2 flex items-center gap-3 rounded-lg px-2 py-2 transition-colors hover:bg-elevated"
              >
                <Icon
                  size={15}
                  className="text-subtle transition-colors group-hover:text-ink"
                />
                <span className="text-xs text-subtle">{label}</span>
                <span className="ml-auto truncate text-sm font-medium">
                  {value}
                </span>
              </a>
            </li>
          ))}
        </ul>
      </div>
    </Section>
  );
}
