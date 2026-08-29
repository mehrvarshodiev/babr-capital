import { useEffect, useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import WhatsAppButton from './components/WhatsAppButton/WhatsAppButton';
import BabrPreloader from './components/BabrPreloader';
import './animations.css';

export default function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    document.documentElement.classList.add('scroll-smooth');

    const progress = document.createElement('div');
    progress.className = 'babr-scroll-progress';
    progress.setAttribute('aria-hidden', 'true');
    document.body.prepend(progress);

    const updateProgress = () => {
      const scrollTop = window.scrollY;
      const scrollable = document.documentElement.scrollHeight - window.innerHeight;
      const percent = scrollable > 0 ? (scrollTop / scrollable) * 100 : 0;
      progress.style.width = `${Math.min(100, Math.max(0, percent))}%`;
    };

    updateProgress();
    window.addEventListener('scroll', updateProgress, { passive: true });
    window.addEventListener('resize', updateProgress);

    const revealTargets = document.querySelectorAll('main > section, main > div > section, .glass-hover, .metric-card, .value-card, .service-card, .application-card');
    const motions = ['up', 'left', 'right', 'zoom'];
    revealTargets.forEach((element, index) => {
      const target = element as HTMLElement;
      target.classList.add('scroll-reveal');
      target.setAttribute('data-reveal-delay', String(index % 4));
      target.setAttribute('data-motion', motions[index % motions.length]);
      target.addEventListener('pointermove', (event: PointerEvent) => {
        const rect = target.getBoundingClientRect();
        const x = ((event.clientX - rect.left) / rect.width) * 100;
        const y = ((event.clientY - rect.top) / rect.height) * 100;
        target.style.setProperty('--mx', `${x}%`);
        target.style.setProperty('--my', `${y}%`);
      });
    });

    const header = document.querySelector('header');
    const footer = document.querySelector('footer');
    header?.classList.add('motion-header');
    footer?.classList.add('motion-footer', 'scroll-reveal');

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

    revealTargets.forEach((element) => observer.observe(element));
    if (footer) observer.observe(footer);

    return () => {
      window.removeEventListener('scroll', updateProgress);
      window.removeEventListener('resize', updateProgress);
      progress.remove();
      observer.disconnect();
      document.documentElement.classList.remove('scroll-smooth');
    };
  }, []);

  return (
    <>
      {loading && <BabrPreloader onComplete={() => setLoading(false)} />}
      <Routes><Route path="*" element={<Home />} /></Routes>
      <WhatsAppButton />
    </>
  );
}
