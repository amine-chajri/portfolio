import { ArrowUpRight, Layers, Monitor, Server } from 'lucide-react';
import { site } from '../data/site.js';
import { Reveal } from './Reveal.jsx';
import { SectionIntro } from './SectionIntro.jsx';

const capabilityIcons = [Monitor, Server, Layers];

export function About() {
  return (
    <section className="section about" id="about" aria-labelledby="about-title">
      <div className="container">
        <Reveal>
          <SectionIntro
            index="01"
            label="About"
            titleId="about-title"
            title={
              <>
                Equal parts <em>engineer</em> and product thinker.
              </>
            }
            description="The space between a considered interface and a dependable system is where products succeed. That is where I like to work."
          />
        </Reveal>

        <Reveal className="about__stats" delay={80}>
          {site.stats.map((stat) => (
            <div className="stat" key={stat.label}>
              <strong>{stat.value}</strong>
              <span>{stat.label}</span>
            </div>
          ))}
        </Reveal>

        <div className="about__grid">
          <Reveal className="about__story">
            <span className="eyebrow">The short version</span>
            <p className="about__lead">
              I&apos;m Amine, a full-stack developer based in Casablanca. I build web products from
              the first data model to the final interaction, with a bias toward clarity, speed,
              and details that hold up in the real world.
            </p>
            <p>
              My work sits at the intersection of engineering and design. I care as much about an
              inclusive focus state as a clean API boundary, and I would rather ship something
              focused and dependable than something merely impressive.
            </p>
            <a className="text-link" href="#contact">
              Let&apos;s build something together
              <ArrowUpRight size={17} aria-hidden="true" />
            </a>
          </Reveal>

          <Reveal className="experience-card" delay={120}>
            <div className="experience-card__header">
              <span className="eyebrow">Experience</span>
              <span>2022 — Now</span>
            </div>
            <ol className="timeline">
              {site.experience.map((item) => (
                <li className="timeline__item" key={`${item.period}-${item.title}`}>
                  <span className="timeline__period">{item.period}</span>
                  <div className="timeline__content">
                    <h3>{item.title}</h3>
                    <p>{item.description}</p>
                  </div>
                </li>
              ))}
            </ol>
          </Reveal>
        </div>

        <div className="capabilities">
          {site.capabilities.map((capability, index) => {
            const Icon = capabilityIcons[index];
            return (
              <Reveal
                as="article"
                className="capability-card"
                delay={index * 80}
                key={capability.number}
              >
                <div className="capability-card__top">
                  <span className="capability-card__icon">
                    <Icon size={19} strokeWidth={1.7} aria-hidden="true" />
                  </span>
                  <span className="capability-card__number">{capability.number}</span>
                </div>
                <h3>{capability.title}</h3>
                <p>{capability.description}</p>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
