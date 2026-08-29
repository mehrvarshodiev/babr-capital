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
  const digits = value.replace(/\D/g, '');
  const localDigits = digits.startsWith('992') ? digits.slice(3) : digits;
  return localDigits.length === 9;
}

export default function ApplicationForm({ t }: { t: Copy }) {
  const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [phone, setPhone] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [values, setValues] = useState({ name: '', message: '' });
  const [focused, setFocused] = useState<string | null>(null);
  const [touched, setTouched] = useState({ name: false, phone: false, message: false });

  const valid = {
    name: values.name.trim().length >= 2,
    phone: isValidTajikPhone(phone),
    message: values.message.trim().length >= 5,
  };

  const submit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (isSubmitting) return;
    setTouched({ name: true, phone: true, message: true });
    if (!valid.name || !valid.message || !valid.phone) {
      setStatus('error');
      return;
    }
    setStatus('idle');
    setIsSubmitting(true);
    try {
      const response = await fetch('/api/application', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: values.name.trim(), phone: phone.trim(), message: values.message.trim() }),
      });
      if (!response.ok) throw new Error('Application delivery failed');
      setStatus('success');
      setPhone('');
      setValues({ name: '', message: '' });
      setTouched({ name: false, phone: false, message: false });
      setFocused(null);
    } catch (error) {
      console.error('Application submission failed:', error);
      setStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  const updateValue = (field: 'name' | 'message', value: string) => {
    setValues((current) => ({ ...current, [field]: value }));
    setStatus('idle');
  };

  const fieldState = (isTouched: boolean, isValid: boolean) => {
    if (!isTouched) return '';
    return isValid ? 'is-valid' : 'is-invalid';
  };

  const renderMessage = (field: 'name' | 'phone' | 'message') => {
    if (!touched[field] || valid[field]) return null;
    const text = field === 'name' ? t.form.validation.name : field === 'phone' ? t.form.validation.phone : t.form.validation.message;
    return <span className="form-error"><CircleAlert size={14} />{text}</span>;
  };

  return (
    <section id="contact" className="section application-section">
      <div className="mx-auto max-w-7xl w-full px-4 sm:px-6">
        <div className="application-card w-full">
          <div className="application-copy">
            <span className="section-kicker !w-auto !h-auto min-h-0 px-3.5 py-2 rounded-full mb-5 inline-flex">{t.form.kicker}</span>
            <h2 className="!mt-0">{t.form.title}</h2>
            <p>{t.form.text}</p>
            <div className="application-privacy">
              <span className="privacy-icon"><LockKeyhole size={16} /></span>
              <span>{t.form.privacy}</span>
            </div>
          </div>

          <form onSubmit={submit} className="application-form" aria-busy={isSubmitting} noValidate>
            <div className={`form-field ${fieldState(touched.name, valid.name)}`}>
              <div className={`form-control ${focused === 'name' || values.name ? 'has-content' : ''}`}>
                <input id="application-name" name="name" autoComplete="name" value={values.name} disabled={isSubmitting} placeholder=" " onFocus={() => setFocused('name')} onBlur={() => { setFocused(null); setTouched((v) => ({ ...v, name: true })); }} onChange={(e) => updateValue('name', e.target.value)} aria-invalid={touched.name && !valid.name} />
                <label htmlFor="application-name">{t.form.name}</label>
                {touched.name && valid.name && <CheckCircle2 className="form-check" size={18} />}
              </div>
              {renderMessage('name')}
            </div>

            <div className={`form-field ${fieldState(touched.phone, valid.phone)}`}>
              <div className={`form-control ${focused === 'phone' || phone ? 'has-content' : ''}`}>
                <input id="application-phone" name="phone" type="tel" inputMode="tel" autoComplete="tel" value={phone} disabled={isSubmitting} placeholder=" " maxLength={19} onFocus={() => setFocused('phone')} onBlur={() => { setFocused(null); setTouched((v) => ({ ...v, phone: true })); }} onChange={(e) => { setPhone(formatPhone(e.target.value)); setStatus('idle'); }} aria-describedby="phone-hint" aria-invalid={touched.phone && !valid.phone} />
                <label htmlFor="application-phone">{t.form.phone}</label>
                {touched.phone && valid.phone && <CheckCircle2 className="form-check" size={18} />}
              </div>
              <span id="phone-hint" className="form-hint">{t.form.phoneHint}</span>
              {renderMessage('phone')}
            </div>

            <div className={`form-field form-field-message ${fieldState(touched.message, valid.message)}`}>
              <div className={`form-control ${focused === 'message' || values.message ? 'has-content' : ''}`}>
                <textarea id="application-message" name="message" rows={5} value={values.message} disabled={isSubmitting} placeholder=" " onFocus={() => setFocused('message')} onBlur={() => { setFocused(null); setTouched((v) => ({ ...v, message: true })); }} onChange={(e) => updateValue('message', e.target.value)} aria-invalid={touched.message && !valid.message} />
                <label htmlFor="application-message">{t.form.message}</label>
                {touched.message && valid.message && <CheckCircle2 className="form-check form-check-message" size={18} />}
              </div>
              {renderMessage('message')}
            </div>

            <div className="application-actions">
              <div className="form-status" aria-live="polite">
                {status === 'success' && <span className="success-message"><CheckCircle2 size={17} />{t.form.success}</span>}
                {status === 'error' && <span className="submit-error">{t.form.error}</span>}
              </div>
              <button className="gold-btn application-submit" type="submit" disabled={isSubmitting} aria-disabled={isSubmitting}>
                {isSubmitting ? <><Loader2 size={17} className="animate-spin" />{t.form.sending}</> : <>{t.form.send}<Send size={17} /></>}
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}
