const technologies = [
  'React',
  'Node.js',
  'Express',
  'MongoDB',
  'JavaScript',
  'REST APIs',
  'CSS',
  'Git',
];

export function TechMarquee() {
  return (
    <section className="tech-strip" aria-label="Core technologies">
      <p className="sr-only">
        Core technologies: {technologies.join(', ')}.
      </p>
      <div className="marquee" aria-hidden="true">
        <div className="marquee__track">
          <div className="marquee__group">
            {technologies.map((technology) => (
              <span className="marquee__item" key={technology}>
                {technology}
                <span className="marquee__star">✦</span>
              </span>
            ))}
          </div>
          <div className="marquee__group">
            {technologies.map((technology) => (
              <span className="marquee__item" key={`duplicate-${technology}`}>
                {technology}
                <span className="marquee__star">✦</span>
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
