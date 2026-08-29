import type { VercelRequest, VercelResponse } from '@vercel/node';

const phonePattern = /^\+992 \(\d{2}\) \d{3}-\d{2}-\d{2}$/;

function escapeHtml(value: string) {
  return value.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
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

  const botToken = process.env.TELEGRAM_BOT_TOKEN;
  const chatId = process.env.TELEGRAM_CHAT_ID;

  if (!botToken || !chatId) {
    console.error('Telegram environment variables are not configured');
    return res.status(500).json({ success: false, error: 'Telegram delivery is not configured' });
  }

  const now = new Date();
  const date = new Intl.DateTimeFormat('ru-RU', {
    timeZone: 'Asia/Dushanbe',
    day: '2-digit', month: '2-digit', year: 'numeric',
  }).format(now);
  const time = new Intl.DateTimeFormat('ru-RU', {
    timeZone: 'Asia/Dushanbe',
    hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false,
  }).format(now);

  const text = [
    '<b>📩 НОВАЯ ЗАЯВКА — BABR CAPITAL</b>',
    '',
    `👤 <b>Имя:</b> ${escapeHtml(name.trim())}`,
    `📱 <b>Телефон:</b> ${escapeHtml(phone.trim())}`,
    '',
    `💬 <b>Сообщение:</b>\n${escapeHtml(message.trim())}`,
    '',
    `📅 <b>Дата:</b> ${date}`,
    `🕐 <b>Время:</b> ${time} (Душанбе)`,
    '🌐 <b>Источник:</b> Babr Capital Website',
  ].join('\n');

  try {
    const telegramResponse = await fetch(`https://api.telegram.org/bot${botToken}/sendMessage`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ chat_id: chatId, text, parse_mode: 'HTML' }),
    });

    if (!telegramResponse.ok) {
      const details = await telegramResponse.text();
      console.error('Telegram API error:', details);
      return res.status(502).json({ success: false, error: 'Telegram delivery failed' });
    }
  } catch (error) {
    console.error('Telegram request failed:', error);
    return res.status(502).json({ success: false, error: 'Telegram delivery failed' });
  }

  return res.status(201).json({ success: true, message: 'Application sent' });
}
