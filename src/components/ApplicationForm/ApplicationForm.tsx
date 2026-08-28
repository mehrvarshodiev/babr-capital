import { FormEvent, useState } from 'react';
import { CheckCircle2, CircleAlert, Loader2, LockKeyhole, Send } from 'lucide-react';
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
  const [values, setValues] = useState({ name: '', message: '' });
  const [touched, setTouched] = useState({ name: false, phone: false, message: false });

  const valid = {
    name: values.name.trim().length >= 2,
    phone: isValidTajikPhone(phone),
    message: values.message.trim().length >= 5,
  };

  const submit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (isSubmitting) return;
    setTouched({ name: true, phone: true, message: true });

    if (!valid.name || !valid.message || !valid.phone) {
      setStatus('error');
      return;
    }

    setStatus('idle');
    setIsSubmitting(true);

    window.setTimeout(() => {
      setIsSubmitting(false);
      setStatus('success');
      setPhone('');
      setValues({ name: '', message: '' });
      setTouched({ name: false, phone: false, message: false });
      e.currentTarget.reset();
    }, 900);
  };

  const fieldClass = 'peer min-h-14 w-full rounded-xl border bg-white/[0.07] px-4 pb-3 pt-5 text-base text-white shadow-sm outline-none transition placeholder-transparent disabled:cursor-not-allowed disabled:opacity-60';
  const labelClass = 'pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-sm text-slate-400 transition-all peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-sm peer-focus:top-2 peer-focus:translate-y-0 peer-focus:text-xs peer-focus:text-[#d6a04b] peer-not-placeholder-shown:top-2 peer-not-placeholder-shown:translate-y-0 peer-not-placeholder-shown:text-xs';

  const fieldState = (isTouched: boolean, isValid: boolean) =>
    isTouched ? (isValid ? 'border-emerald-400/70 focus:border-emerald-400 focus:ring-emerald-400/10' : 'border-red-400/70 focus:border-red-400 focus:ring-red-400/10') : 'border-white/15 hover:border-white/25 focus:border-[#c8923e] focus:ring-[#c8923e]/10';

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
                <input
                  name="name"
                  autoComplete="name"
                  placeholder=" "
                  value={values.name}
                  disabled={isSubmitting}
                  onChange={(e) => { setValues((v) => ({ ...v, name: e.target.value })); setStatus('idle'); }}
                  onBlur={() => setTouched((v) => ({ ...v, name: true }))}
                  aria-invalid={touched.name && !valid.name}
                  className={`${fieldClass} ${fieldState(touched.name, valid.name)}`}
                />
                <span className={labelClass}>{t.form.name}</span>
                {touched.name && !valid.name && <span className="mt-1 flex items-center gap-1 px-1 text-xs text-red-300"><CircleAlert size={13} />Введите имя и фамилию</span>}
                {touched.name && valid.name && <CheckCircle2 size={16} className="absolute right-4 top-1/2 -translate-y-1/2 text-emerald-300" />}
              </label>

              <label className="relative block">
                <input
                  name="phone"
                  type="tel"
                  inputMode="tel"
                  autoComplete="tel"
                  value={phone}
                  onChange={(e) => { setPhone(formatPhone(e.target.value)); setStatus('idle'); }}
                  onBlur={() => setTouched((v) => ({ ...v, phone: true }))}
                  placeholder=" "
                  maxLength={19}
                  aria-describedby="phone-hint"
                  aria-invalid={touched.phone && !valid.phone}
                  disabled={isSubmitting}
                  className={`${fieldClass} ${fieldState(touched.phone, valid.phone)}`}
                />
                <span className={labelClass}>{t.form.phone}</span>
                <span id="phone-hint" className="mt-1 block px-1 text-xs text-slate-500">+992 (XX) XXX-XX-XX</span>
                {touched.phone && !valid.phone && <span className="mt-1 flex items-center gap-1 px-1 text-xs text-red-300"><CircleAlert size={13} />Введите полный номер</span>}
                {touched.phone && valid.phone && <CheckCircle2 size={16} className="absolute right-4 top-1/2 -translate-y-1/2 text-emerald-300" />}
              </label>

              <label className="relative block sm:col-span-2">
                <textarea
                  name="message"
                  rows={4}
                  placeholder=" "
                  value={values.message}
                  disabled={isSubmitting}
                  onChange={(e) => { setValues((v) => ({ ...v, message: e.target.value })); setStatus('idle'); }}
                  onBlur={() => setTouched((v) => ({ ...v, message: true }))}
                  aria-invalid={touched.message && !valid.message}
                  className={`${fieldClass} min-h-32 resize-y leading-6 ${fieldState(touched.message, valid.message)}`}
                />
                <span className={labelClass}>{t.form.message}</span>
                {touched.message && !valid.message && <span className="mt-1 flex items-center gap-1 px-1 text-xs text-red-300"><CircleAlert size={13} />Сообщение должно содержать минимум 5 символов</span>}
                {touched.message && valid.message && <CheckCircle2 size={16} className="absolute right-4 top-6 text-emerald-300" />}
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
