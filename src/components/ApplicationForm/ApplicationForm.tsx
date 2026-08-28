import { FormEvent, useState } from 'react';
import { CheckCircle2, Loader2, LockKeyhole, Send } from 'lucide-react';
import type { Copy } from '../../data/translations';

function formatPhone(value: string) {
  let digits = value.replace(/\D/g, '');
  if (digits.startsWith('992')) digits = digits.slice(3);
  if (digits.startsWith('0')) digits = digits.slice(1);
  digits = digits.slice(0, 9);
  let formatted = '+992';
  if (digits.length) formatted += ` (${digits.slice(0, 2)}`;
  if (digits.length >= 2) formatted += ')';
  if (digits.length > 2) formatted += ` ${digits.slice(2, 5)}`;
  if (digits.length > 5) formatted += `-${digits.slice(5, 7)}`;
  if (digits.length > 7) formatted += `-${digits.slice(7, 9)}`;
  return formatted;
}

function isValidTajikPhone(value: string) {
  return /^\+992 \(\d{2}\) \d{3}-\d{2}-\d{2}$/.test(value);
}

export default function ApplicationForm({ t }: { t: Copy }) {
  const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [phone, setPhone] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const submit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (isSubmitting) return;
    const f = new FormData(e.currentTarget);
    const name = String(f.get('name') || '').trim();
    const message = String(f.get('message') || '').trim();

    if (!name || !message || !isValidTajikPhone(phone)) {
      setStatus('error');
      return;
    }

    setStatus('idle');
    setIsSubmitting(true);

    // Keep the current simulated submission behavior while giving the user clear feedback.
    window.setTimeout(() => {
      setIsSubmitting(false);
      setStatus('success');
      setPhone('');
      e.currentTarget.reset();
    }, 900);
  };

  const fieldClass = 'peer min-h-14 w-full rounded-xl border border-white/15 bg-white/[0.07] px-4 pb-3 pt-5 text-base text-white shadow-sm outline-none transition placeholder-transparent hover:border-white/25 focus:border-[#c8923e] focus:bg-white/[0.09] focus:ring-4 focus:ring-[#c8923e]/10';
  const labelClass = 'pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-sm text-slate-400 transition-all peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-sm peer-focus:top-2 peer-focus:translate-y-0 peer-focus:text-xs peer-focus:text-[#d6a04b] peer-not-placeholder-shown:top-2 peer-not-placeholder-shown:translate-y-0 peer-not-placeholder-shown:text-xs';

  return (
    <section id="contact" className="section">
      <div className="mx-auto max-w-7xl px-6">
        <div className="overflow-hidden rounded-[2rem] bg-[#07111f] p-6 text-white shadow-2xl sm:p-10">
          <div className="grid gap-10 lg:grid-cols-[.75fr_1.25fr] lg:items-center">
            <div>
              <span className="section-kicker">{t.form.kicker}</span>
              <h2 className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl">{t.form.title}</h2>
              <p className="mt-4 leading-7 text-slate-300">{t.form.text}</p>
              <div className="mt-6 flex items-center gap-2 text-xs text-slate-400">
                <LockKeyhole size={14} /> Ваши данные защищены
              </div>
            </div>

            <form onSubmit={submit} className="grid gap-5 sm:grid-cols-2" aria-busy={isSubmitting}>
              <label className="relative block">
                <input name="name" autoComplete="name" placeholder=" " disabled={isSubmitting} className={fieldClass} />
                <span className={labelClass}>{t.form.name}</span>
              </label>

              <label className="relative block">
                <input name="phone" type="tel" inputMode="tel" autoComplete="tel" value={phone} onChange={(e) => { setPhone(formatPhone(e.target.value)); setStatus('idle'); }} placeholder=" " maxLength={19} aria-describedby="phone-hint" disabled={isSubmitting} className={fieldClass} />
                <span className={labelClass}>{t.form.phone}</span>
                <span id="phone-hint" className="mt-1 block px-1 text-xs text-slate-500">+992 (XX) XXX-XX-XX</span>
              </label>

              <label className="relative block sm:col-span-2">
                <textarea name="message" rows={4} placeholder=" " disabled={isSubmitting} className={`${fieldClass} min-h-32 resize-y leading-6`} />
                <span className={labelClass}>{t.form.message}</span>
              </label>

              <div className="sm:col-span-2 flex flex-wrap items-center justify-between gap-3">
                <div className="min-h-6 text-sm" aria-live="polite">
                  {status === 'success' && <span className="flex items-center gap-2 text-emerald-300"><CheckCircle2 size={16} />{t.form.success}</span>}
                  {status === 'error' && <span className="text-red-300">{t.form.error}</span>}
                </div>
                <button className="gold-btn min-w-36 disabled:cursor-not-allowed disabled:opacity-70" type="submit" disabled={isSubmitting} aria-disabled={isSubmitting}>
                  {isSubmitting ? <><Loader2 size={16} className="animate-spin" /> Отправка...</> : <>{t.form.send}<Send size={16} /></>}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
