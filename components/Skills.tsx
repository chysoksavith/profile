import Section from '@/components/Section';
import Tag from '@/components/Tag';
import { data } from '@/lib/data';

export default function Skills() {
  return (
    <Section id="skills" label="Skills">
      <dl className="space-y-5">
        {data.skills.map((group) => (
          <div
            key={group.category}
            className="grid gap-2 sm:grid-cols-[7rem_1fr] sm:gap-4"
          >
            <dt className="text-[11px] font-semibold uppercase tracking-wider text-subtle sm:pt-1">
              {group.category}
            </dt>
            <dd className="flex flex-wrap gap-1.5">
              {group.items.map((item) => (
                <Tag key={item}>{item}</Tag>
              ))}
            </dd>
          </div>
        ))}
      </dl>
    </Section>
  );
}
