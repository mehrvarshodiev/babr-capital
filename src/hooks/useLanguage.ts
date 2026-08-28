import { useState } from 'react';
import { Language } from '../data/translations';
export function useLanguage(){ const [language,setLanguage]=useState<Language>(()=>(localStorage.getItem('babr-lang') as Language)||'tg'); const change=(l:Language)=>{setLanguage(l);localStorage.setItem('babr-lang',l);document.documentElement.lang=l}; return {language,change}; }
