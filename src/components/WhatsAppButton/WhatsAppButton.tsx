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
      className="group fixed bottom-5 right-5 z-[60] grid h-14 w-14 place-items-center rounded-full bg-[#25D366] text-white shadow-[0_10px_35px_rgba(37,211,102,.35)] ring-4 ring-white/80 transition-all duration-300 hover:scale-110 hover:shadow-[0_14px_42px_rgba(37,211,102,.48)] focus:outline-none focus:ring-4 focus:ring-[#25D366]/40 dark:ring-[#07111f] sm:bottom-7 sm:right-7 sm:h-16 sm:w-16"
    >
      <span className="absolute inset-0 rounded-full bg-[#25D366] opacity-0 transition-opacity duration-300 group-hover:animate-ping group-hover:opacity-30" />
      <MessageCircle size={28} strokeWidth={2.2} className="relative sm:h-8 sm:w-8" />
      <span className="pointer-events-none absolute right-0 top-0 h-3.5 w-3.5 rounded-full border-2 border-white bg-emerald-300 dark:border-[#07111f]" />
    </a>
  );
}
