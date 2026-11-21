export function SectionIntro({
  index,
  label,
  title,
  description,
  className = '',
  titleId,
}) {
  return (
    <div className={`section-intro ${className}`.trim()}>
      <div className="section-label">
        <span className="section-label__index">{index}</span>
        <span>{label}</span>
      </div>
      <div className="section-intro__body">
        <h2 id={titleId}>{title}</h2>
        {description ? <p>{description}</p> : null}
      </div>
    </div>
  );
}
