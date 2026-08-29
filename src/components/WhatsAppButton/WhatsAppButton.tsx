import { MessageCircle } from 'lucide-react';

const whatsappUrl = 'https://wa.me/992900013290';

export default function WhatsAppButton() {
  return (
    <a
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Связаться с Babr Capital в WhatsApp"
      title="WhatsApp Babr Capital"
      className="group fixed bottom-5 right-5 z-[60] grid h-14 w-14 place-items-center rounded-full bg-[#25D366] text-white shadow-[0_14px_45px_rgba(37,211,102,.5),0_0_30px_rgba(37,211,102,.45)] transition-all duration-300 hover:scale-110 hover:shadow-[0_18px_60px_rgba(37,211,102,.7),0_0_45px_rgba(37,211,102,.65)] focus:outline-none focus:ring-4 focus:ring-[#25D366]/30 sm:bottom-7 sm:right-7 sm:h-16 sm:w-16"
    >
      <span className="pointer-events-none absolute -inset-5 rounded-full bg-[#25D366]/45 blur-2xl opacity-80 animate-pulse transition-all duration-500 group-hover:-inset-7 group-hover:bg-[#25D366]/55 group-hover:opacity-100" />
      <span className="pointer-events-none absolute -inset-3 rounded-full bg-[#25D366]/35 blur-xl opacity-90 animate-[pulse_2s_ease-in-out_infinite] group-hover:scale-125" />
      <span className="pointer-events-none absolute -inset-1 rounded-full border border-[#25D366]/60 opacity-80 transition-transform duration-700 group-hover:scale-125 group-hover:rotate-180" />
      <span className="pointer-events-none absolute inset-0 rounded-full bg-[#25D366] opacity-0 transition-opacity duration-300 group-hover:animate-ping group-hover:opacity-30" />
      <MessageCircle size={28} strokeWidth={2.2} className="relative z-10 drop-shadow-[0_0_8px_rgba(255,255,255,.45)] sm:h-8 sm:w-8" />
      <span className="pointer-events-none absolute right-0 top-0 z-20 h-3.5 w-3.5 rounded-full border-2 border-white bg-emerald-300 shadow-[0_0_14px_rgba(167,243,208,1)]" />
    </a>
  );
}
