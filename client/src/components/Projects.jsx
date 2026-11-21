import { useState } from 'react';
import { ArrowUpRight, ExternalLink, Github } from 'lucide-react';
import { projects } from '../data/projects.js';
import { ProjectVisual } from './ProjectVisual.jsx';
import { Reveal } from './Reveal.jsx';
import { SectionIntro } from './SectionIntro.jsx';

const categories = ['All', ...new Set(projects.map((project) => project.category))];

export function Projects() {
  const [activeFilter, setActiveFilter] = useState('All');

  const filteredProjects =
    activeFilter === 'All'
      ? projects
      : projects.filter((project) => project.category === activeFilter);

  const isSingle = filteredProjects.length === 1;

  return (
    <section className="section projects" id="work" aria-labelledby="work-title">
      <div className="container">
        <Reveal>
          <SectionIntro
            index="02"
            label="Selected work"
            titleId="work-title"
            title={
              <>
                Built to <em>ship</em>, not just to demo.
              </>
            }
            description="A few full-stack products shaped from first sketch to production. Each one started with a real problem worth solving."
          />
        </Reveal>

        <Reveal className="projects__toolbar" delay={60}>
          <div className="project-filters" role="group" aria-label="Filter projects by discipline">
            {categories.map((category) => (
              <button
                key={category}
                type="button"
                className={`filter-button ${activeFilter === category ? 'is-active' : ''}`.trim()}
                aria-pressed={activeFilter === category}
                onClick={() => setActiveFilter(category)}
              >
                {category}
                <span className="filter-button__count">
                  {category === 'All'
                    ? projects.length
                    : projects.filter((project) => project.category === category).length}
                </span>
              </button>
            ))}
          </div>
          <span className="projects__count" aria-live="polite">
            {String(filteredProjects.length).padStart(2, '0')} project
            {filteredProjects.length === 1 ? '' : 's'}
          </span>
        </Reveal>

        <div
          className={`projects__grid ${isSingle ? 'projects__grid--single' : ''}`.trim()}
        >
          {filteredProjects.map((project, index) => (
            <Reveal
              as="article"
              className="project-card"
              delay={index * 70}
              key={project.id}
              threshold={0.05}
            >
              <div className="project-card__surface">
                <div className="project-card__visual-wrap">
                  <ProjectVisual visual={project.visual} />
                </div>

                <div className="project-card__body">
                  <div className="project-card__meta">
                    <span className="project-card__category">{project.category}</span>
                    <span>{project.year}</span>
                  </div>

                  <h3>{project.title}</h3>
                  <p className="project-card__subtitle">{project.subtitle}</p>
                  <p className="project-card__description">{project.description}</p>

                  <dl className="project-card__details">
                    <div>
                      <dt>Problem</dt>
                      <dd>{project.problem}</dd>
                    </div>
                    <div>
                      <dt>Architecture</dt>
                      <dd>{project.architecture}</dd>
                    </div>
                  </dl>

                  <ul className="project-card__tags" aria-label={`${project.title} tech stack`}>
                    {project.stack.map((technology) => (
                      <li key={technology}>{technology}</li>
                    ))}
                  </ul>

                  <div className="project-card__links">
                    <a
                      className="project-link project-link--primary"
                      href={project.demoUrl}
                      target="_blank"
                      rel="noreferrer"
                      aria-label={`${project.title} live demo (opens in a new tab)`}
                    >
                      Live demo
                      <ExternalLink size={15} strokeWidth={1.9} aria-hidden="true" />
                    </a>
                    <a
                      className="project-link"
                      href={project.repoUrl}
                      target="_blank"
                      rel="noreferrer"
                      aria-label={`${project.title} source code on GitHub (opens in a new tab)`}
                    >
                      <Github size={16} strokeWidth={1.7} aria-hidden="true" />
                      Source
                    </a>
                  </div>
                </div>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal className="projects__cta" delay={100}>
          <p>
            <span>Have a product in mind?</span>
            I&apos;m always interested in thoughtful problems.
          </p>
          <a className="text-link" href="#contact">
            Tell me about it
            <ArrowUpRight size={17} aria-hidden="true" />
          </a>
        </Reveal>
      </div>
    </section>
  );
}
