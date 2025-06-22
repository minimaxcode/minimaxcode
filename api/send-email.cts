import type { VercelRequest, VercelResponse } from '@vercel/node';
import { Resend } from 'resend';

// Vercel doesn't log console.log, but console.error
const log = (...args: any[]) => console.error(...args);

const apiKey = process.env.RESEND_API_KEY;
const resend = apiKey ? new Resend(apiKey) : null;

export default async (req: VercelRequest, res: VercelResponse) => {
  log('Function invoked. Method:', req.method);

  if (!resend || !apiKey) {
    log('RESEND_API_KEY is not set or Resend client failed to initialize.');
    return res.status(500).json({ message: 'Server configuration error.' });
  }

  if (req.method !== 'POST') {
    log('Method Not Allowed:', req.method);
    return res.status(405).json({ message: 'Method Not Allowed' });
  }

  const { name, email, company, phone, subject, message } = req.body;
  log('Received body:', { name, email, subject }); // Log only key fields for privacy

  if (!name || !email || !subject || !message) {
    log('Missing required fields:', { name: !!name, email: !!email, subject: !!subject, message: !!message });
    return res.status(400).json({ message: 'Missing required fields' });
  }

  try {
    log('Attempting to send email via Resend...');
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
      log('Resend API returned an error:', JSON.stringify(error, null, 2));
      return res.status(500).json({ message: 'Error sending email', error });
    }

    log('Email sent successfully. Data:', data);
    return res.status(200).json({ message: 'Email sent successfully', data });
  } catch (error: any) {
    log('An unexpected error occurred in try-catch block:', JSON.stringify(error, null, 2));
    return res.status(500).json({ message: 'An unexpected error occurred', error });
  }
}; 