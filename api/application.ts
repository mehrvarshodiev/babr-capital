import type { VercelRequest, VercelResponse } from '@vercel/node';

const phonePattern = /^\+992 \(\d{2}\) \d{3}-\d{2}-\d{2}$/;

export default function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).json({ success: false, error: 'Method not allowed' });
  }

  const { name, phone, message } = req.body ?? {};

  if (typeof name !== 'string' || name.trim().length < 2) {
    return res.status(400).json({ success: false, error: 'Invalid name' });
  }

  if (typeof phone !== 'string' || !phonePattern.test(phone.trim())) {
    return res.status(400).json({ success: false, error: 'Invalid phone' });
  }

  if (typeof message !== 'string' || message.trim().length < 5) {
    return res.status(400).json({ success: false, error: 'Invalid message' });
  }

  // The endpoint now accepts validated applications. Persistence/CRM delivery
  // can be connected later through environment variables without changing the UI.
  return res.status(201).json({
    success: true,
    message: 'Application accepted',
  });
}
