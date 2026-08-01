import Section from '@/components/Section';
import { data } from '@/lib/data';

export default function Education() {
  return (
    <Section id="education" label="Education">
      <ul className="space-y-5">
        {data.education.map((item) => (
          <li key={item.degree}>
            <div className="flex items-start justify-between gap-3">
              <h3 className="text-sm font-medium leading-snug text-pretty">
                {item.degree}
              </h3>
              <span
                className={`shrink-0 rounded px-1.5 py-0.5 text-[10px] font-medium whitespace-nowrap ${
                  item.status.toLowerCase() === 'in progress'
                    ? 'bg-accent-soft text-accent'
                    : 'bg-elevated text-subtle'
                }`}
              >
                {item.status}
              </span>
            </div>
            <p className="mt-1 text-xs text-muted">{item.institution}</p>
            <p className="mt-0.5 text-xs text-subtle tabular-nums">
              {item.period}
            </p>
          </li>
        ))}
      </ul>
    </Section>
  );
}
