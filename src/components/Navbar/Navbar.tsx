import { Menu, Moon, Sun, X } from 'lucide-react';
import { useEffect, useState } from 'react';
import type { Copy, Language } from '../../data/translations';
import { useTheme } from '../../hooks/useTheme';

export default function Navbar({ t, language, change }: { t: Copy; language: Language; change: (l: Language) => void }) {
  const [open, setOpen] = useState(false);
  const [visible, setVisible] = useState(true);
  const [active, setActive] = useState('about');
  const { theme, toggle } = useTheme();
  const links = [['about', t.nav.about], ['mission', t.nav.mission], ['values', t.nav.values], ['services', t.nav.services], ['contact', t.nav.contact]] as const;

  const go = (id: string) => { setActive(id); document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' }); setOpen(false); };

  useEffect(() => {
    const sections = links.map(([id]) => document.getElementById(id)).filter((section): section is HTMLElement => Boolean(section));
    if (!sections.length) return;
    const observer = new IntersectionObserver((entries) => {
      const visibleEntries = entries.filter((entry) => entry.isIntersecting).sort((a, b) => b.intersectionRatio - a.intersectionRatio);
      if (visibleEntries[0]) setActive(visibleEntries[0].target.id);
    }, { root: null, rootMargin: '-18% 0px -58% 0px', threshold: [0.15, 0.35, 0.55, 0.75] });
    sections.forEach((section) => observer.observe(section));
    const syncFromScroll = () => { if (window.scrollY < 120) setActive('about'); };
    syncFromScroll(); window.addEventListener('scroll', syncFromScroll, { passive: true });
    return () => { observer.disconnect(); window.removeEventListener('scroll', syncFromScroll); };
  }, []);

  useEffect(() => {
    let lastY = window.scrollY; let ticking = false;
    const updateVisibility = () => { const currentY = window.scrollY; const delta = currentY - lastY; if (Math.abs(delta) > 6) { if (currentY <= 24 || delta < 0) setVisible(true); else if (delta > 0) { setVisible(false); setOpen(false); } lastY = currentY; } ticking = false; };
    const onScroll = () => { if (!ticking) { window.requestAnimationFrame(updateVisibility); ticking = true; } };
    window.addEventListener('scroll', onScroll, { passive: true }); return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const activeStyle = {
    color: theme === 'dark' ? '#eaffff' : '#075e68',
    background: theme === 'dark' ? 'linear-gradient(120deg, rgba(16,185,129,.18), rgba(6,182,212,.16), rgba(37,99,235,.14))' : 'linear-gradient(120deg, rgba(16,185,129,.13), rgba(6,182,212,.12), rgba(37,99,235,.10))',
    backgroundSize: '220% 100%',
    animation: 'navbar-glass-gradient 4s ease-in-out infinite',
    boxShadow: theme === 'dark' ? '0 0 14px rgba(34,211,238,.20), 0 0 24px rgba(16,185,129,.10), inset 0 1px 0 rgba(255,255,255,.14)' : '0 4px 16px rgba(8,145,178,.13), 0 0 18px rgba(16,185,129,.08), inset 0 1px 0 rgba(255,255,255,.55)',
    border: '1px solid rgba(34,211,238,.22)',
    backdropFilter: 'blur(18px) saturate(145%)',
    WebkitBackdropFilter: 'blur(18px) saturate(145%)',
  };

  return (
    <>
      <style>{`@keyframes navbar-glass-gradient{0%,100%{background-position:0% 50%}50%{background-position:100% 50%}}@media(prefers-reduced-motion:reduce){.nav-link{animation:none!important}}`}</style>
      <header className={`site-navbar fixed inset-x-0 top-0 z-50 px-3 pt-3 sm:px-6 ${visible ? 'is-visible' : 'is-hidden'}`} style={{ transform: visible ? 'translateY(0)' : 'translateY(calc(-100% - 18px))', transition: 'transform 320ms cubic-bezier(.22,1,.36,1)' }}>
        <nav className="glass nav-shell mx-auto flex max-w-7xl items-center justify-between rounded-2xl border px-4 py-3 sm:px-5" style={{ opacity: 1, background: theme === 'dark' ? 'rgba(7, 24, 36, 0.58)' : 'linear-gradient(135deg, rgba(255, 255, 255, 0.82), rgba(231, 246, 244, 0.78))', borderColor: theme === 'dark' ? 'rgba(148, 206, 216, 0.13)' : 'rgba(15, 23, 42, 0.10)', boxShadow: theme === 'dark' ? '0 16px 44px rgba(0,0,0,.16), inset 0 1px 0 rgba(255,255,255,.045)' : '0 12px 36px rgba(15,23,42,.08)', backdropFilter: 'blur(28px) saturate(155%)', WebkitBackdropFilter: 'blur(28px) saturate(155%)' }}>
          <button onClick={() => go('top')} className="flex items-center gap-3 font-extrabold tracking-tight" aria-label="Babr Capital"><span className="brand-mark">B</span><span className="hidden sm:block">BABR <span className="text-cyan-300">CAPITAL</span></span></button>
          <div className="hidden items-center gap-1 lg:flex">{links.map(([id, label]) => <button key={id} onClick={() => go(id)} className="nav-link" aria-current={active === id ? 'page' : undefined} style={active === id ? activeStyle : undefined}>{label}</button>)}</div>
          <div className="flex items-center gap-2"><div className="language-switcher glass-soft hidden md:flex"><button className={`lang-btn ${language === 'tg' ? 'active' : ''}`} onClick={() => change('tg')}>TJ</button><button className={`lang-btn ${language === 'ru' ? 'active' : ''}`} onClick={() => change('ru')}>RU</button></div><button onClick={toggle} className="icon-btn" aria-label="Theme">{theme === 'dark' ? <Sun size={17} /> : <Moon size={17} />}</button><button className="icon-btn lg:hidden" onClick={() => setOpen(!open)} aria-expanded={open} aria-label="Menu">{open ? <X size={19} /> : <Menu size={19} />}</button></div>
        </nav>
        {open && <div className="glass mx-auto mt-2 max-w-7xl rounded-2xl border border-white/10 bg-slate-950/90 p-3 shadow-2xl backdrop-blur-xl lg:hidden"><div className="flex flex-col gap-1">{links.map(([id, label]) => <button key={id} onClick={() => go(id)} className="mobile-link w-full text-left text-slate-200 transition-colors hover:text-white" aria-current={active === id ? 'page' : undefined} style={active === id ? activeStyle : undefined}>{label}</button>)}</div></div>}
      </header>
    </>
  );
}
