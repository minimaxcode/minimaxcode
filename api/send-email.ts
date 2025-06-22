import type { VercelRequest, VercelResponse } from '@vercel/node';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export default async (req: VercelRequest, res: VercelResponse) => {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method Not Allowed' });
  }

  const { name, email, company, phone, subject, message } = req.body;

  if (!name || !email || !subject || !message) {
    return res.status(400).json({ message: 'Missing required fields' });
  }

  try {
    const { data, error } = await resend.emails.send({
      from: 'MiniMaxCode <contact@minimaxcode.com>',
      to: ['info@minimaxcode.com'], // TODO: Replace with your actual receiving email address
      subject: `【Webサイトからのお問合せ】${subject}`,
      html: `
        <h1>Webサイトからのお問合せ</h1>
        <p><strong>お名前:</strong> ${name}</p>
        <p><strong>メールアドレス:</strong> ${email}</p>
        <p><strong>会社名:</strong> ${company || '未記入'}</p>
        <p><strong>電話番号:</strong> ${phone || '未記入'}</p>
        <hr>
        <h2>件名</h2>
        <p>${subject}</p>
        <h2>お問合せ内容</h2>
        <p>${message.replace(/\n/g, '<br>')}</p>
      `,
    });

    if (error) {
      console.error({ error });
      return res.status(500).json({ message: 'Error sending email', error });
    }

    return res.status(200).json({ message: 'Email sent successfully', data });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'An unexpected error occurred', error });
  }
}; 