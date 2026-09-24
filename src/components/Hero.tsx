import React from 'react';
import { useTypewriter } from '../hooks/useTypewriter';

const HERO_TEXT =
  'Glad you stopped in. Good taste tends to find us. Now, what are we building?';

export const Hero: React.FC = () => {
  const { displayed, done } = useTypewriter(HERO_TEXT);

  return (
    <section className="hero-section">
      <div className="hero-content">
        <p className="hero-eyebrow">
          Hey there, meet A.R.I.A,
          <br />
          Mainframe's Adaptive Response Interface Agent
        </p>

        <p className="typewriter-text">
          {displayed}
          {!done && <span className="cursor-blink" />}
        </p>

        <div className="hero-actions">
          <a href="#labs" className="btn-pill hero-action-btn">Pitch us an idea</a>
          <a href="#studio" className="btn-pill hero-action-btn" style={{ animationDelay: '0.1s' }}>
            Come work here
          </a>
          <a href="#openings" className="btn-pill hero-action-btn" style={{ animationDelay: '0.2s' }}>
            Send a brief hello
          </a>
          <a href="#shop" className="btn-pill hero-action-btn" style={{ animationDelay: '0.3s' }}>
            See how we operate
          </a>
          <button
            type="button"
            className="btn-pill btn-pill-outline hero-action-btn"
            style={{ animationDelay: '0.4s' }}
            onClick={() => {
              navigator.clipboard.writeText('hello@mainframe.co');
            }}
          >
            Reach us: hello@mainframe.co
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
              <rect x="9" y="9" width="13" height="13" rx="2" />
              <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
            </svg>
          </button>
        </div>
      </div>

      {/* Photo overlay with gold treatment */}
      <div className="hero-photo-frame">
        <div className="hero-photo-inner">
          <img src="/photo.jpg" alt="Darmigan Baskar" />
        </div>
      </div>

      <div className="scroll-indicator">Scroll</div>
    </section>
  );
};
