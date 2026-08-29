(() => {
  const id = 'babr-capital-scroll-progress';

  function mount() {
    if (document.getElementById(id)) return;
    const bar = document.createElement('div');
    bar.id = id;
    bar.setAttribute('aria-hidden', 'true');
    document.documentElement.appendChild(bar);

    const update = () => {
      const root = document.documentElement;
      const max = root.scrollHeight - root.clientHeight;
      const progress = max > 0 ? Math.min(100, Math.max(0, (root.scrollTop / max) * 100)) : 0;
      bar.style.setProperty('--scroll-progress', `${progress}%`);
    };

    window.addEventListener('scroll', update, { passive: true });
    window.addEventListener('resize', update, { passive: true });
    update();
  }

  if (document.documentElement) mount();
  else new MutationObserver(() => {
    if (document.documentElement) {
      mount();
      this?.disconnect?.();
    }
  }).observe(document, { childList: true });
})();
