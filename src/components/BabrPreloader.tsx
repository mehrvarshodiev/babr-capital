import { useEffect, useState } from 'react';
import './babr-preloader.css';

type Props = { onComplete: () => void };

export default function BabrPreloader({ onComplete }: Props) {
  const [progress, setProgress] = useState(0);
  const [closing, setClosing] = useState(false);

  useEffect(() => {
    let value = 0;
    let finished = false;

    const timer = window.setInterval(() => {
      value = Math.min(100, value + Math.floor(Math.random() * 4) + 1);
      setProgress(value);

      if (value >= 100 && !finished) {
        finished = true;
        window.clearInterval(timer);
        window.setTimeout(() => setClosing(true), 350);
        window.setTimeout(onComplete, 1150);
      }
    }, 42);

    return () => window.clearInterval(timer);
  }, [onComplete]);

  return (
    <div className={`babr-preloader ${closing ? 'babr-preloader--closing' : ''}`} aria-label="Loading BABR Capital">
      <div className="babr-preloader__noise" />
      <div className="babr-preloader__ambient babr-preloader__ambient--one" />
      <div className="babr-preloader__ambient babr-preloader__ambient--two" />

      <main className="babr-preloader__content">
        <div className="babr-preloader__loading">
          <span className="babr-preloader__dot" />
          Loading...
        </div>

        <div className="babr-preloader__scene" aria-hidden="true">
          <div className="babr-preloader__glow" />
          <div className="babr-preloader__floor" />

          {/* Futuristic 3D ring — intentionally no BC lettering */}
          <div className="babr-preloader__ring-object">
            <div className="babr-preloader__ring">
              <div className="babr-preloader__ring-inner" />
              <div className="babr-preloader__ring-highlight" />
            </div>
            <div className="babr-preloader__ring-core" />
          </div>
        </div>

        <div className="babr-preloader__progress">
          <div className="babr-preloader__percent">
            <span>0</span>
            <strong>{progress}</strong>
            <span>100</span>
          </div>
          <div className="babr-preloader__track">
            <div className="babr-preloader__fill" style={{ width: `${progress}%` }} />
            <span className="babr-preloader__indicator" style={{ left: `${progress}%` }} />
          </div>
        </div>

        <div className="babr-preloader__brand">
          <div>BABR <span>CAPITAL</span></div>
          <small>FINANCIAL PARTNER</small>
        </div>
      </main>

      <div className="babr-preloader__bottom">EST. <span>TAJIKISTAN</span></div>
    </div>
  );
}
