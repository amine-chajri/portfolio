import { ArrowUpRight, Monitor, Server, Wrench } from 'lucide-react';
import { stackGroups } from '../data/stack.js';
import { Reveal } from './Reveal.jsx';
import { SectionIntro } from './SectionIntro.jsx';

const icons = {
  monitor: Monitor,
  server: Server,
  wrench: Wrench,
};

export function Stack() {
  return (
    <section className="section stack" id="stack" aria-labelledby="stack-title">
      <div className="container">
        <Reveal>
          <SectionIntro
            index="03"
            label="Toolkit"
            titleId="stack-title"
            title={
              <>
                One stack, the <em>whole</em> picture.
              </>
            }
            description="The tools are only part of it. I choose them for the job at hand, then use them to keep the product understandable from end to end."
          />
        </Reveal>

        <div className="stack__grid">
          {stackGroups.map((group, index) => {
            const Icon = icons[group.icon];
            return (
              <Reveal
                as="article"
                className="stack-card"
                delay={index * 90}
                key={group.id}
              >
                <div className="stack-card__header">
                  <span className="stack-card__icon">
                    <Icon size={22} strokeWidth={1.6} aria-hidden="true" />
                  </span>
                  <span className="stack-card__number">{group.number}</span>
                </div>
                <h3>{group.title}</h3>
                <p>{group.description}</p>
                <ul className="stack-card__items" aria-label={`${group.title} technologies`}>
                  {group.items.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </Reveal>
            );
          })}
        </div>

        <Reveal className="stack__note" delay={120}>
          <span className="stack__note-mark" aria-hidden="true">
            {'{ }'}
          </span>
          <p>
            Comfortable across the boundary between product and platform — and happiest when
            both sides speak the same language.
          </p>
          <a className="text-link" href="#contact">
            Work with me
            <ArrowUpRight size={17} aria-hidden="true" />
          </a>
        </Reveal>
      </div>
    </section>
  );
}
