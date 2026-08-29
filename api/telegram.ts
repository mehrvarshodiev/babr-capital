import type { VercelRequest, VercelResponse } from '@vercel/node';
import { createClient } from '@supabase/supabase-js';

const BUTTON = '📋 Последние заявки';

function escapeHtml(value: string) {
  return value.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') return res.status(405).json({ ok: false });

  const token = process.env.TELEGRAM_BOT_TOKEN;
  const chatId = process.env.TELEGRAM_CHAT_ID;
  const supabaseUrl = process.env.SUPABASE_URL;
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!token || !supabaseUrl || !serviceKey) {
    return res.status(500).json({ ok: false, error: 'Bot/database environment is not configured' });
  }

  const update = req.body ?? {};
  const message = update.message;
  if (!message?.chat?.id) return res.status(200).json({ ok: true });

  const incomingChatId = String(message.chat.id);
  if (chatId && incomingChatId !== String(chatId)) return res.status(200).json({ ok: true });

  const telegram = async (method: string, body: Record<string, unknown>) => {
    const response = await fetch(`https://api.telegram.org/bot${token}/${method}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    });
    return response.ok;
  };

  const keyboard = {
    keyboard: [[{ text: BUTTON }]],
    resize_keyboard: true,
    persistent: true,
  };

  if (message.text === '/start') {
    await telegram('sendMessage', {
      chat_id: message.chat.id,
      text: '<b>🤖 Babr Capital</b>\n\nВыберите действие:',
      parse_mode: 'HTML',
      reply_markup: keyboard,
    });
    return res.status(200).json({ ok: true });
  }

  if (message.text === BUTTON) {
    const supabase = createClient(supabaseUrl, serviceKey, {
      auth: { autoRefreshToken: false, persistSession: false },
    });

    const { data, error } = await supabase
      .from('applications')
      .select('name, phone, message, created_at')
      .order('created_at', { ascending: false })
      .limit(10);

    if (error) {
      console.error('Supabase applications error:', error);
      await telegram('sendMessage', {
        chat_id: message.chat.id,
        text: '❌ Не удалось получить последние заявки.',
        reply_markup: keyboard,
      });
      return res.status(200).json({ ok: true });
    }

    if (!data?.length) {
      await telegram('sendMessage', {
        chat_id: message.chat.id,
        text: '📋 Последних заявок пока нет.',
        reply_markup: keyboard,
      });
      return res.status(200).json({ ok: true });
    }

    const formatter = new Intl.DateTimeFormat('ru-RU', {
      timeZone: 'Asia/Dushanbe',
      day: '2-digit', month: '2-digit', year: 'numeric',
      hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false,
    });

    const text = ['<b>📋 ПОСЛЕДНИЕ 10 ЗАЯВОК</b>', ''];
    data.forEach((item: any, index: number) => {
      const date = item.created_at ? formatter.format(new Date(item.created_at)) : '—';
      text.push(
        `<b>Заявка #${index + 1}</b>`,
        `👤 <b>Имя:</b> ${escapeHtml(item.name ?? '—')}`,
        `📞 <b>Телефон:</b> ${escapeHtml(item.phone ?? '—')}`,
        `💬 <b>Сообщение:</b> ${escapeHtml(item.message ?? '—')}`,
        `🕐 <b>Дата и время:</b> ${date}`,
        '🌐 <b>Источник:</b> Babr Capital Website',
        '',
      );
    });

    await telegram('sendMessage', {
      chat_id: message.chat.id,
      text: text.join('\n'),
      parse_mode: 'HTML',
      reply_markup: keyboard,
    });
  }

  return res.status(200).json({ ok: true });
}
