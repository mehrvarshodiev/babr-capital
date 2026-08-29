import { MessageCircle } from 'lucide-react';

const whatsappUrl = 'https://wa.me/992870820700';

export default function WhatsAppButton() {
  return (
    <a href={whatsappUrl} target="_blank" rel="noopener noreferrer" aria-label="Связаться с Babr Capital в WhatsApp" title="WhatsApp Babr Capital" className="whatsapp-float group fixed bottom-5 right-5 z-[60] grid h-14 w-14 place-items-center rounded-full bg-[#25D366] text-white transition-all duration-300 hover:scale-110 focus:outline-none focus:ring-4 focus:ring-[#25D366]/30 sm:bottom-7 sm:right-7 sm:h-16 sm:w-16">
      <span className="whatsapp-ring pointer-events-none absolute -inset-1 rounded-full border-2 border-[#25D366]/55" />
      <span className="whatsapp-ring delay pointer-events-none absolute -inset-1 rounded-full border border-[#25D366]/45" />
      <span className="pointer-events-none absolute -inset-4 rounded-full bg-[#25D366]/25 blur-2xl opacity-80 transition-opacity duration-500 group-hover:opacity-100" />
      <MessageCircle size={28} strokeWidth={2.2} className="relative z-10 drop-shadow-[0_0_8px_rgba(255,255,255,.45)] sm:h-8 sm:w-8" />
      <span className="pointer-events-none absolute right-0 top-0 z-20 h-3.5 w-3.5 rounded-full border-2 border-white bg-emerald-300 shadow-[0_0_14px_rgba(167,243,208,1)]" />
    </a>
  );
}
