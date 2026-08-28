import { Menu, Moon, Sun, X } from 'lucide-react';
import { useEffect, useState } from 'react';
import type { Copy, Language } from '../../data/translations';
import { useTheme } from '../../hooks/useTheme';

export default function Navbar({ t, language, change }: { t: Copy; language: Language; change: (l: Language) => void }) {
  const [open, setOpen] = useState(false);
  const [visible, setVisible] = useState(true);
  const { theme, toggle } = useTheme();
  const links = [['about', t.nav.about], ['mission', t.nav.mission], ['values', t.nav.values], ['services', t.nav.services], ['contact', t.nav.contact]] as const;
  const go = (id: string) => { document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' }); setOpen(false); };

  useEffect(() => {
    let lastY = window.scrollY;
    let ticking = false;
    const updateVisibility = () => {
      const currentY = window.scrollY;
      const delta = currentY - lastY;
      if (Math.abs(delta) > 6) {
        if (currentY <= 24 || delta < 0) setVisible(true);
        else if (delta > 0) { setVisible(false); setOpen(false); }
        lastY = currentY;
      }
      ticking = false;
    };
    const onScroll = () => {
      if (!ticking) { window.requestAnimationFrame(updateVisibility); ticking = true; }
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header
      className={`site-navbar fixed inset-x-0 top-0 z-50 px-3 pt-3 sm:px-6 ${visible ? 'is-visible' : 'is-hidden'}`}
      style={{ transform: visible ? 'translateY(0)' : 'translateY(calc(-100% - 18px))', transition: 'transform 320ms cubic-bezier(.22,1,.36,1)' }}
    >
      <nav className="glass-soft nav-shell mx-auto flex max-w-7xl items-center justify-between rounded-2xl px-4 py-3 sm:px-5" style={{ opacity: 0.9 }}>
        <button onClick={() => go('top')} className="flex items-center gap-3 font-extrabold tracking-tight" aria-label="Babr Capital">
          <span className="brand-mark">B</span>
          <span className="hidden sm:block">BABR <span className="text-cyan-300">CAPITAL</span></span>
        </button>
        <div className="hidden items-center gap-1 lg:flex">
          {links.map(([id, label]) => <button key={id} onClick={() => go(id)} className="nav-link">{label}</button>)}
        </div>
        <div className="flex items-center gap-2">
          <div className="language-switcher glass-soft hidden md:flex">
            <button className={`lang-btn ${language === 'tg' ? 'active' : ''}`} onClick={() => change('tg')}>TJ</button>
            <button className={`lang-btn ${language === 'ru' ? 'active' : ''}`} onClick={() => change('ru')}>RU</button>
          </div>
          <button onClick={toggle} className="icon-btn" aria-label="Theme">{theme === 'dark' ? <Sun size={17} /> : <Moon size={17} />}</button>
          <button className="icon-btn lg:hidden" onClick={() => setOpen(!open)} aria-expanded={open} aria-label="Menu">{open ? <X size={19} /> : <Menu size={19} />}</button>
        </div>
      </nav>
      {open && (
        <div className="glass mx-auto mt-2 max-w-7xl rounded-2xl border border-white/10 bg-slate-950/90 p-3 shadow-2xl backdrop-blur-xl lg:hidden">
          <div className="flex flex-col gap-1">
            {links.map(([id, label]) => (
              <button key={id} onClick={() => go(id)} className="mobile-link w-full text-left text-slate-200 transition-colors hover:text-white">{label}</button>
            ))}
          </div>
        </div>
      )}
    </header>
  );
}
