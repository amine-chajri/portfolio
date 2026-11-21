function DashboardVisual() {
  return (
    <div className="project-visual project-visual--lime">
      <div className="project-visual__grid" />
      <div className="browser browser--dashboard">
        <div className="browser__bar">
          <span className="window-dots window-dots--dark">
            <i />
            <i />
            <i />
          </span>
          <span className="browser__address">northstar.app/overview</span>
          <span className="browser__action" />
        </div>
        <div className="dashboard">
          <aside className="dashboard__sidebar">
            <span className="dashboard__logo">N</span>
            <span className="dashboard__nav dashboard__nav--active" />
            <span className="dashboard__nav" />
            <span className="dashboard__nav" />
            <span className="dashboard__nav" />
            <span className="dashboard__avatar">AC</span>
          </aside>
          <div className="dashboard__main">
            <div className="dashboard__topline">
              <div>
                <span>Workspace</span>
                <strong>Overview</strong>
              </div>
              <span className="dashboard__live">
                <i />
                Live
              </span>
            </div>
            <div className="dashboard__metrics">
              <div>
                <span>MRR</span>
                <strong>$24.8k</strong>
                <small>+12.4%</small>
              </div>
              <div>
                <span>Activated</span>
                <strong>1,284</strong>
                <small>+8.1%</small>
              </div>
              <div>
                <span>Retention</span>
                <strong>68.2%</strong>
                <small>+4.6%</small>
              </div>
            </div>
            <div className="dashboard__chart">
              <div className="dashboard__chart-head">
                <span>Activation rate</span>
                <small>Last 30 days</small>
              </div>
              <svg viewBox="0 0 340 96" preserveAspectRatio="none">
                <defs>
                  <linearGradient id="northstar-area" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#d9ff57" stopOpacity="0.28" />
                    <stop offset="100%" stopColor="#d9ff57" stopOpacity="0" />
                  </linearGradient>
                </defs>
                <path
                  d="M0 82 C24 76, 36 64, 58 68 C80 72, 92 48, 116 53 C142 58, 152 37, 178 43 C202 49, 218 25, 242 31 C264 37, 282 18, 306 22 C322 24, 332 12, 340 9 L340 96 L0 96 Z"
                  fill="url(#northstar-area)"
                />
                <path
                  d="M0 82 C24 76, 36 64, 58 68 C80 72, 92 48, 116 53 C142 58, 152 37, 178 43 C202 49, 218 25, 242 31 C264 37, 282 18, 306 22 C322 24, 332 12, 340 9"
                  fill="none"
                  stroke="#d9ff57"
                  strokeWidth="2"
                  vectorEffect="non-scaling-stroke"
                />
                <circle cx="340" cy="9" r="3" fill="#d9ff57" />
              </svg>
              <div className="dashboard__axis">
                <span>Nov 01</span>
                <span>Nov 15</span>
                <span>Nov 30</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <span className="project-visual__tag">SaaS / Analytics</span>
      <span className="project-visual__mark">N°01</span>
    </div>
  );
}

function CommerceVisual() {
  return (
    <div className="project-visual project-visual--clay">
      <div className="project-visual__grid" />
      <div className="browser browser--shop">
        <div className="browser__bar">
          <span className="window-dots window-dots--dark">
            <i />
            <i />
            <i />
          </span>
          <span className="browser__address">soko.store</span>
          <span className="browser__action" />
        </div>
        <div className="shop">
          <header className="shop__header">
            <strong>SOKO</strong>
            <nav>
              <span>Shop</span>
              <span>Journal</span>
              <span>Cart (2)</span>
            </nav>
          </header>
          <div className="shop__hero">
            <div>
              <span className="shop__eyebrow">Made slowly / 2026</span>
              <h4>
                Objects made by hand,
                <br />
                <em>kept for years.</em>
              </h4>
            </div>
            <span className="shop__cta">Explore the collection ↗</span>
          </div>
          <div className="shop__products">
            <div className="shop-product">
              <span className="shop-product__image shop-product__image--vase" />
              <span className="shop-product__name">Sand Vase</span>
              <span className="shop-product__price">$84</span>
            </div>
            <div className="shop-product">
              <span className="shop-product__image shop-product__image--stone" />
              <span className="shop-product__name">Stone Bowl</span>
              <span className="shop-product__price">$62</span>
            </div>
            <div className="shop-product">
              <span className="shop-product__image shop-product__image--lamp" />
              <span className="shop-product__name">Arc Lamp</span>
              <span className="shop-product__price">$148</span>
            </div>
          </div>
        </div>
      </div>
      <span className="project-visual__tag">Commerce / Editorial</span>
      <span className="project-visual__mark">N°02</span>
    </div>
  );
}

function TerminalVisual() {
  return (
    <div className="project-visual project-visual--blue">
      <div className="project-visual__grid" />
      <div className="monitor">
        <div className="monitor__bar">
          <span className="monitor__logo">
            <i />
            RELAY
          </span>
          <span className="monitor__environment">production</span>
          <span className="monitor__menu">•••</span>
        </div>
        <div className="monitor__headline">
          <div>
            <span className="monitor__eyebrow">Service health</span>
            <strong>
              All systems
              <br />
              operational
            </strong>
          </div>
          <span className="monitor__status">
            <i />
            Live
          </span>
        </div>
        <div className="monitor__graph">
          <span className="monitor__threshold" />
          {[38, 57, 44, 72, 51, 64, 48, 80, 58, 42, 67, 53, 74, 46, 61, 55].map((height, index) => (
            <i
              key={`${height}-${index}`}
              className={index === 11 ? 'is-alert' : undefined}
              style={{ height: `${height}%` }}
            />
          ))}
        </div>
        <div className="monitor__legend">
          <span>Latency</span>
          <span>12:00</span>
          <span>12:30</span>
          <span>Now</span>
        </div>
        <div className="monitor__rows">
          <div>
            <span className="http-method">GET</span>
            <span>/api/projects</span>
            <span className="http-status">200</span>
            <span>82ms</span>
          </div>
          <div>
            <span className="http-method">POST</span>
            <span>/api/auth</span>
            <span className="http-status">201</span>
            <span>143ms</span>
          </div>
          <div className="is-error">
            <span className="http-method">GET</span>
            <span>/api/search</span>
            <span className="http-status">500</span>
            <span>804ms</span>
          </div>
        </div>
      </div>
      <span className="monitor__alert">
        <i />
        1 endpoint needs attention
      </span>
      <span className="project-visual__tag">Backend / Observability</span>
    </div>
  );
}

function EditorialVisual() {
  return (
    <div className="project-visual project-visual--paper">
      <div className="project-visual__grid project-visual__grid--dark" />
      <div className="paper">
        <header className="paper__header">
          <span className="paper__logo">INDEX®</span>
          <nav>
            <span>Work</span>
            <span>Studio</span>
            <span>Contact</span>
          </nav>
          <span className="paper__issue">ISSUE 04</span>
        </header>
        <div className="paper__hero">
          <div className="paper__copy">
            <span className="paper__eyebrow">Independent design studio</span>
            <h4>
              Ideas with
              <br />
              <em>room to breathe.</em>
            </h4>
            <span className="paper__link">View selected work ↘</span>
          </div>
          <div className="paper__art">
            <span className="paper__disc" />
            <span className="paper__line" />
            <span className="paper__caption">Form / Function / Feeling</span>
          </div>
        </div>
        <div className="paper__footer">
          <span>Brand systems</span>
          <span>Digital experiences</span>
          <span>Art direction</span>
          <span>©2026</span>
        </div>
      </div>
      <span className="project-visual__tag project-visual__tag--dark">Frontend / Studio</span>
    </div>
  );
}

export function ProjectVisual({ visual }) {
  if (visual === 'commerce') return <CommerceVisual />;
  if (visual === 'terminal') return <TerminalVisual />;
  if (visual === 'editorial') return <EditorialVisual />;
  return <DashboardVisual />;
}
