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
      replyTo: email,
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <style>
            body { font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; line-height: 1.6; color: #333; }
            .container { width: 100%; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #eee; border-radius: 10px; background-color: #f9f9f9; }
            .header { background-color: #0D0D0D; color: white; padding: 20px; text-align: center; border-radius: 8px 8px 0 0; }
            .header h1 { margin: 0; font-size: 24px; color: #50FA7B; }
            .content { padding: 30px; background-color: #ffffff; border-radius: 0 0 8px 8px; }
            .content h2 { color: #3F87F5; font-size: 20px; border-bottom: 2px solid #eee; padding-bottom: 10px; margin-bottom: 20px; }
            .field { margin-bottom: 15px; }
            .field strong { color: #555; display: block; margin-bottom: 5px; }
            .message-box { background-color: #f0f4f8; padding: 15px; border-radius: 5px; white-space: pre-wrap; word-wrap: break-word; }
            .footer { text-align: center; font-size: 12px; color: #999; margin-top: 20px; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>MiniMaxCode</h1>
              <p style="color: #ccc; font-size: 14px; margin: 5px 0 0;">Webサイトからのお問い合わせ</p>
            </div>
            <div class="content">
              <h2>お問い合わせ内容</h2>
              <div class="field">
                <strong>件名:</strong>
                <p>${subject}</p>
              </div>
              <div class="field">
                <strong>お問い合わせ詳細:</strong>
                <div class="message-box">${message.replace(/\n/g, '<br>')}</div>
              </div>
              
              <h2 style="margin-top: 30px;">お客様情報</h2>
              <div class="field">
                <strong>お名前:</strong>
                <p>${name}</p>
              </div>
              <div class="field">
                <strong>メールアドレス:</strong>
                <p><a href="mailto:${email}">${email}</a></p>
              </div>
              <div class="field">
                <strong>会社名:</strong>
                <p>${company || '未記入'}</p>
              </div>
              <div class="field">
                <strong>電話番号:</strong>
                <p>${phone || '未記入'}</p>
              </div>
            </div>
            <div class="footer">
              <p>このメールはMiniMaxCodeのウェブサイトから自動送信されました。</p>
            </div>
          </div>
        </body>
        </html>
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