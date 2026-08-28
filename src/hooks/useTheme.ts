import { useEffect, useState } from 'react';
export function useTheme(){
  const [theme,setTheme] = useState<'dark'|'light'>(() => (localStorage.getItem('babr-theme') as 'dark'|'light') || 'dark');
  useEffect(()=>{ document.body.classList.toggle('light',theme==='light'); localStorage.setItem('babr-theme',theme); },[theme]);
  return {theme,toggle:()=>setTheme(v=>v==='dark'?'light':'dark')};
}
