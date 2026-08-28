import { FormEvent, useState } from 'react';
import { CheckCircle2, LockKeyhole, Send } from 'lucide-react';
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

  const submit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const f = new FormData(e.currentTarget);
    const name = String(f.get('name') || '').trim();
    const message = String(f.get('message') || '').trim();

    if (!name || !message || !isValidTajikPhone(phone)) {
      setStatus('error');
      return;
    }

    setStatus('success');
    setPhone('');
    e.currentTarget.reset();
  };

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

            <form onSubmit={submit} className="grid gap-5 sm:grid-cols-2">
              <label className="field">
                <span className="mb-1 text-sm font-medium text-slate-200">{t.form.name}</span>
                <input
                  name="name"
                  autoComplete="name"
                  placeholder={t.form.name}
                  className="min-h-12 w-full rounded-xl border border-white/15 bg-white/[0.07] px-4 py-3 text-base text-white shadow-sm outline-none transition placeholder:text-slate-500 hover:border-white/25 focus:border-[#c8923e] focus:bg-white/[0.09] focus:ring-4 focus:ring-[#c8923e]/10"
                />
              </label>

              <label className="field">
                <span className="mb-1 text-sm font-medium text-slate-200">{t.form.phone}</span>
                <input
                  name="phone"
                  type="tel"
                  inputMode="tel"
                  autoComplete="tel"
                  value={phone}
                  onChange={(e) => {
                    setPhone(formatPhone(e.target.value));
                    setStatus('idle');
                  }}
                  placeholder="+992 (__) ___-__-__"
                  maxLength={19}
                  aria-describedby="phone-hint"
                  className="min-h-12 w-full rounded-xl border border-white/15 bg-white/[0.07] px-4 py-3 text-base text-white shadow-sm outline-none transition placeholder:text-slate-500 hover:border-white/25 focus:border-[#c8923e] focus:bg-white/[0.09] focus:ring-4 focus:ring-[#c8923e]/10"
                />
                <span id="phone-hint" className="text-xs text-slate-500">+992 (XX) XXX-XX-XX</span>
              </label>

              <label className="field sm:col-span-2">
                <span className="mb-1 text-sm font-medium text-slate-200">{t.form.message}</span>
                <textarea
                  name="message"
                  rows={4}
                  placeholder={t.form.message}
                  className="min-h-32 w-full resize-y rounded-xl border border-white/15 bg-white/[0.07] px-4 py-3 text-base leading-6 text-white shadow-sm outline-none transition placeholder:text-slate-500 hover:border-white/25 focus:border-[#c8923e] focus:bg-white/[0.09] focus:ring-4 focus:ring-[#c8923e]/10"
                />
              </label>

              <div className="sm:col-span-2 flex flex-wrap items-center justify-between gap-3">
                <div className="min-h-6 text-sm">
                  {status === 'success' && (
                    <span className="flex items-center gap-2 text-emerald-300">
                      <CheckCircle2 size={16} />
                      {t.form.success}
                    </span>
                  )}
                  {status === 'error' && <span className="text-red-300">{t.form.error}</span>}
                </div>
                <button className="gold-btn" type="submit">
                  {t.form.send}
                  <Send size={16} />
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
