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
      className="group fixed bottom-5 right-5 z-[60] grid h-14 w-14 place-items-center rounded-full bg-[#25D366] text-white shadow-[0_12px_38px_rgba(37,211,102,.42)] transition-all duration-300 hover:scale-110 hover:shadow-[0_16px_50px_rgba(37,211,102,.58)] focus:outline-none focus:ring-4 focus:ring-[#25D366]/30 sm:bottom-7 sm:right-7 sm:h-16 sm:w-16"
    >
      <span className="pointer-events-none absolute -inset-2 rounded-full bg-[#25D366]/35 blur-xl opacity-70 animate-pulse transition-all duration-500 group-hover:scale-125 group-hover:opacity-100" />
      <span className="pointer-events-none absolute -inset-1 rounded-full border border-[#25D366]/50 opacity-70 transition-transform duration-700 group-hover:scale-125 group-hover:rotate-180" />
      <span className="absolute inset-0 rounded-full bg-[#25D366] opacity-0 transition-opacity duration-300 group-hover:animate-ping group-hover:opacity-25" />
      <MessageCircle size={28} strokeWidth={2.2} className="relative z-10 sm:h-8 sm:w-8" />
      <span className="pointer-events-none absolute right-0 top-0 z-20 h-3.5 w-3.5 rounded-full border-2 border-white bg-emerald-300 shadow-[0_0_12px_rgba(167,243,208,.9)]" />
    </a>
  );
}
