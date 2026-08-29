import { useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import WhatsAppButton from './components/WhatsAppButton/WhatsAppButton';
import './animations.css';

export default function App() {
  useEffect(() => {
    document.documentElement.classList.add('scroll-smooth');
    const revealTargets = document.querySelectorAll('main > section, main > div > section, .glass-hover, .metric-card, .value-card, .service-card, .application-card');
    const motions = ['up', 'left', 'right', 'zoom'];
    revealTargets.forEach((element, index) => {
      element.classList.add('scroll-reveal');
      element.setAttribute('data-reveal-delay', String(index % 4));
      element.setAttribute('data-motion', motions[index % motions.length]);
      element.addEventListener('pointermove', (event) => {
        const rect = element.getBoundingClientRect();
        const x = ((event.clientX - rect.left) / rect.width) * 100;
        const y = ((event.clientY - rect.top) / rect.height) * 100;
        element.style.setProperty('--mx', `${x}%`);
        element.style.setProperty('--my', `${y}%`);
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
      observer.disconnect();
      document.documentElement.classList.remove('scroll-smooth');
    };
  }, []);

  return <><Routes><Route path="*" element={<Home />} /></Routes><WhatsAppButton /></>;
}
