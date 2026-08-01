import Section from '@/components/Section';
import { data } from '@/lib/data';

export default function Languages() {
  return (
    <Section id="languages" label="Languages">
      <ul>
        {data.languages.map((language) => (
          <li
            key={language.name}
            className="flex items-center justify-between gap-3 border-b border-line py-2.5 first:pt-0 last:border-0 last:pb-0"
          >
            <span className="text-sm font-medium">{language.name}</span>
            <span className="text-xs text-subtle">{language.level}</span>
          </li>
        ))}
      </ul>
    </Section>
  );
}
