import { useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import WhatsAppButton from './components/WhatsAppButton/WhatsAppButton';

export default function App() {
  useEffect(() => { document.documentElement.classList.add('scroll-smooth'); return () => document.documentElement.classList.remove('scroll-smooth'); }, []);
  return <><Routes><Route path="*" element={<Home />} /></Routes><WhatsAppButton /></>;
}
