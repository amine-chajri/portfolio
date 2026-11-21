import { useRef } from 'react';
import { ArrowDown, ArrowUpRight, Check, Code2, Globe2, MapPin } from 'lucide-react';
import { site } from '../data/site.js';

export function Hero() {
  const visualRef = useRef(null);

  const handlePointerMove = (event) => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const element = visualRef.current;
    if (!element) return;

    const rect = element.getBoundingClientRect();
    element.style.setProperty('--pointer-x', `${event.clientX - rect.left}px`);
    element.style.setProperty('--pointer-y', `${event.clientY - rect.top}px`);
  };

  const handlePointerLeave = () => {
    const element = visualRef.current;
    if (!element) return;
    element.style.setProperty('--pointer-x', '50%');
    element.style.setProperty('--pointer-y', '35%');
  };

  return (
    <section className="hero" id="home" aria-labelledby="hero-title">
      <div className="hero__ambient" aria-hidden="true" />
      <div className="container hero__inner">
        <div className="hero__copy">
          <div className="hero__eyebrow">
            <span className="availability">
              <span className="availability__dot" aria-hidden="true" />
              {site.availability}
            </span>
            <span className="hero__eyebrow-divider" aria-hidden="true" />
            <span>{site.role}</span>
          </div>

          <h1 className="hero__title" id="hero-title">
            <span>From interface</span>
            <span className="hero__title-line">
              <em>to</em> infrastructure<span className="accent-dot">.</span>
            </span>
          </h1>

          <p className="hero__description">{site.description}</p>

          <div className="hero__actions">
            <a className="button button--accent" href="#work">
              Explore selected work
              <ArrowDown size={18} strokeWidth={2} aria-hidden="true" />
            </a>
            <a className="button button--ghost" href="#contact">
              Start a conversation
              <ArrowUpRight size={18} strokeWidth={2} aria-hidden="true" />
            </a>
          </div>

          <div className="hero__meta">
            <span>
              <MapPin size={15} aria-hidden="true" />
              {site.location}
            </span>
            <span className="hero__meta-separator" aria-hidden="true" />
            <span>
              <Globe2 size={15} aria-hidden="true" />
              Working worldwide
            </span>
          </div>
        </div>

        <div
          ref={visualRef}
          className="hero__visual"
          onPointerMove={handlePointerMove}
          onPointerLeave={handlePointerLeave}
          aria-hidden="true"
        >
          <div className="hero__pointer-glow" />
          <div className="hero__visual-grid" />

          <div className="hero-pill">
            <span className="hero-pill__icon">
              <Check size={12} strokeWidth={2.5} />
            </span>
            Open to select projects
          </div>

          <div className="code-window">
            <div className="code-window__bar">
              <span className="window-dots">
                <i />
                <i />
                <i />
              </span>
              <span className="code-window__file">
                <Code2 size={13} />
                developer.ts
              </span>
              <span className="code-window__live">
                <span />
                live
              </span>
            </div>

            <div className="code-window__body">
              <div className="dev-profile">
                <div className="dev-avatar">
                  <span>AC</span>
                  <i />
                </div>
                <div className="dev-profile__identity">
                  <strong>{site.name}</strong>
                  <span>{site.role}</span>
                </div>
                <span className="dev-profile__location">
                  <MapPin size={11} />
                  CAS
                </span>
              </div>

              <div className="code-lines">
                <div className="code-line">
                  <span className="code-line__number">01</span>
                  <span>
                    <span className="token-keyword">const</span>{' '}
                    <span className="token-name">amine</span>{' '}
                    <span className="token-punctuation">= {'{'}</span>
                  </span>
                </div>
                <div className="code-line">
                  <span className="code-line__number">02</span>
                  <span>
                    {'  '}
                    <span className="token-property">focus</span>
                    <span className="token-punctuation">:</span>{' '}
                    <span className="token-string">&apos;full-stack&apos;</span>
                    <span className="token-punctuation">,</span>
                  </span>
                </div>
                <div className="code-line">
                  <span className="code-line__number">03</span>
                  <span>
                    {'  '}
                    <span className="token-property">stack</span>
                    <span className="token-punctuation">:</span>{' '}
                    <span className="token-punctuation">[</span>
                    <span className="token-string">&apos;React&apos;</span>
                    <span className="token-punctuation">,</span>{' '}
                    <span className="token-string">&apos;Node&apos;</span>
                    <span className="token-punctuation">],</span>
                  </span>
                </div>
                <div className="code-line">
                  <span className="code-line__number">04</span>
                  <span>
                    {'  '}
                    <span className="token-property">mindset</span>
                    <span className="token-punctuation">:</span>{' '}
                    <span className="token-string">&apos;ship with care&apos;</span>
                    <span className="token-punctuation">,</span>
                  </span>
                </div>
                <div className="code-line">
                  <span className="code-line__number">05</span>
                  <span>
                    <span className="token-punctuation">{'}'}</span>
                    <span className="token-punctuation">;</span>
                  </span>
                </div>
              </div>

              <div className="code-terminal">
                <span className="code-terminal__prompt">~ $</span>
                <span>npm run ship</span>
                <span className="code-terminal__success">
                  <Check size={12} />
                  ready in 1.2s
                </span>
              </div>
            </div>
          </div>

          <div className="deploy-card">
            <span className="deploy-card__icon">
              <Check size={15} strokeWidth={2.5} />
            </span>
            <span className="deploy-card__copy">
              <span>Latest deploy</span>
              <strong>All systems go</strong>
            </span>
            <span className="deploy-card__time">12s ago</span>
          </div>

          <span className="hero__decorative-plus hero__decorative-plus--one">+</span>
          <span className="hero__decorative-plus hero__decorative-plus--two">+</span>
          <span className="hero__side-note">PORTFOLIO — 2026</span>
        </div>
      </div>

      <div className="container hero__foot">
        <a className="scroll-cue" href="#about">
          <span className="scroll-cue__line">
            <span />
          </span>
          Scroll to explore
        </a>
        <span className="hero__foot-note">Full-stack, in every sense.</span>
      </div>
    </section>
  );
}
