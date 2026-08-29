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
    const updateVisibility = () => {
      const currentY = window.scrollY; const delta = currentY - lastY;
      if (Math.abs(delta) > 3) {
        if (currentY <= 24 || delta < 0) setVisible(true);
        else if (delta > 0 && currentY > 90) { setVisible(false); setOpen(false); }
        lastY = currentY;
      }
      ticking = false;
    };
    const onScroll = () => { if (!ticking) { window.requestAnimationFrame(updateVisibility); ticking = true; } };
    window.addEventListener('scroll', onScroll, { passive: true }); return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const activeStyle = {
    color: theme === 'dark' ? '#eaffff' : '#075e68',
    background: theme === 'dark' ? 'linear-gradient(120deg, rgba(16,185,129,.10), rgba(6,182,212,.09), rgba(37,99,235,.08))' : 'linear-gradient(120deg, rgba(16,185,129,.07), rgba(6,182,212,.065), rgba(37,99,235,.055))',
    backgroundSize: '220% 100%', animation: 'navbar-glass-gradient 4s ease-in-out infinite',
    boxShadow: theme === 'dark' ? '0 0 12px rgba(34,211,238,.14), inset 0 1px 0 rgba(255,255,255,.12)' : '0 3px 12px rgba(8,145,178,.09), inset 0 1px 0 rgba(255,255,255,.48)',
    border: '1px solid rgba(34,211,238,.18)', backdropFilter: 'blur(18px) saturate(145%)', WebkitBackdropFilter: 'blur(18px) saturate(145%)',
  };

  const logoStyle = {
    fontFamily: 'Montserrat, Inter, system-ui, sans-serif',
    fontWeight: 900,
    fontSize: '32px',
    lineHeight: 1,
    letterSpacing: '-3px',
    width: 'auto',
    height: 'auto',
    borderRadius: 0,
    paddingRight: '2px',
    background: 'none',
    WebkitBackgroundClip: 'initial',
    WebkitTextFillColor: 'transparent',
    color: 'transparent',
    textShadow: theme === 'dark' ? '0 0 7px rgba(0,229,255,.95), 0 0 18px rgba(0,255,136,.7), 0 0 32px rgba(34,211,238,.45)' : '0 0 6px rgba(0,180,200,.45), 0 0 15px rgba(0,220,150,.28)',
    filter: 'drop-shadow(0 0 5px rgba(0,229,255,.35))',
    transition: 'filter 240ms ease, transform 240ms ease',
  };

  return (
    <>
      <style>{`@keyframes navbar-glass-gradient{0%,100%{background-position:0% 50%}50%{background-position:100% 50%}}@media(prefers-reduced-motion:reduce){.nav-link{animation:none!important}.navbar-reveal{transition:none!important}}@media(min-width:768px){.navbar-desktop-links{display:flex!important}.navbar-menu-button{display:none!important}.navbar-mobile-menu{display:none!important}}@media(max-width:767px){.navbar-desktop-links{display:none!important}.navbar-menu-button{display:grid!important}}@media(max-width:767px){.brand-logo-premium{font-size:28px!important;letter-spacing:-2.6px!important}}`}</style>
      <header className={`site-navbar navbar-reveal fixed inset-x-0 top-0 z-50 px-3 pt-3 sm:px-6 ${visible ? 'is-visible' : 'is-hidden'}`} style={{ transform: visible ? 'translate3d(0,0,0)' : 'translate3d(0,calc(-100% - 18px),0)', opacity: visible ? 1 : 0, transition: 'transform 420ms cubic-bezier(.22,1,.36,1), opacity 260ms ease' }}>
        <nav className="glass nav-shell mx-auto flex max-w-7xl items-center gap-3 rounded-2xl border px-3 py-2.5 sm:px-4 lg:px-5" style={{ background: theme === 'dark' ? 'rgba(7, 24, 36, 0.58)' : 'linear-gradient(135deg, rgba(255,255,255,.82), rgba(231,246,244,.78))', borderColor: theme === 'dark' ? 'rgba(148,206,216,.13)' : 'rgba(15,23,42,.10)', boxShadow: theme === 'dark' ? '0 16px 44px rgba(0,0,0,.16)' : '0 12px 36px rgba(15,23,42,.08)', backdropFilter: 'blur(28px) saturate(155%)', WebkitBackdropFilter: 'blur(28px) saturate(155%)' }}>
          <button onClick={() => go('top')} className="flex shrink-0 items-center gap-2.5 font-extrabold tracking-tight" aria-label="Babr Capital"><span className="brand-mark brand-logo-premium" style={logoStyle}>BC</span><span className="hidden xl:block">BABR <span className="text-cyan-300">CAPITAL</span></span></button>
          <div className="navbar-desktop-links min-w-0 flex-1 items-center justify-center gap-0.5">{links.map(([id, label]) => <button key={id} onClick={() => go(id)} className="nav-link whitespace-nowrap px-2 py-2 text-xs xl:px-3 xl:text-sm" aria-current={active === id ? 'page' : undefined} style={active === id ? activeStyle : undefined}>{label}</button>)}</div>
          <div className="ml-auto flex shrink-0 items-center gap-1.5"><div className="language-switcher glass-soft hidden md:flex"><button className={`lang-btn ${language === 'tg' ? 'active' : ''}`} onClick={() => change('tg')}>TJ</button><button className={`lang-btn ${language === 'ru' ? 'active' : ''}`} onClick={() => change('ru')}>RU</button></div><button onClick={toggle} className="icon-btn" aria-label="Theme">{theme === 'dark' ? <Sun size={17} /> : <Moon size={17} />}</button><button className="navbar-menu-button icon-btn lg:hidden" onClick={() => setOpen(!open)} aria-expanded={open} aria-label="Menu">{open ? <X size={19} /> : <Menu size={19} />}</button></div>
        </nav>
        {open && <div className="navbar-mobile-menu glass mx-auto mt-2 max-w-7xl rounded-2xl border border-white/10 bg-slate-950/90 p-3 shadow-2xl backdrop-blur-xl"><div className="flex flex-col gap-1">{links.map(([id, label]) => <button key={id} onClick={() => go(id)} className="mobile-link w-full text-left text-slate-200 transition-colors hover:text-white" aria-current={active === id ? 'page' : undefined} style={active === id ? activeStyle : undefined}>{label}</button>)}</div></div>}
      </header>
    </>
  );
}
