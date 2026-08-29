import { useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import WhatsAppButton from './components/WhatsAppButton/WhatsAppButton';

export default function App() {
  useEffect(() => {
    document.documentElement.classList.add('scroll-smooth');
    const revealTargets = document.querySelectorAll('main > section, main > div > section, .glass-hover, .metric-card, .value-card, .service-card, .application-card');
    revealTargets.forEach((element, index) => {
      element.classList.add('scroll-reveal');
      element.setAttribute('data-reveal-delay', String(Math.min(index % 4, 3)));
    });
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
    revealTargets.forEach((element) => observer.observe(element));
    return () => {
      observer.disconnect();
      document.documentElement.classList.remove('scroll-smooth');
    };
  }, []);

  return <><Routes><Route path="*" element={<Home />} /></Routes><WhatsAppButton /></>;
}
