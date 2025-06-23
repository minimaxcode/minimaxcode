// 使用 require 导入模块
const { Resend } = require('resend');

const resend = new Resend(process.env.RESEND_API_KEY);

// 使用 module.exports 导出函数
module.exports = async (req, res) => {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method Not Allowed' });
  }

  try {
    const { name, email, company, phone, subject, message } = req.body;

    if (!name || !email || !subject || !message) {
      return res
        .status(400)
        .json({ message: 'Name, email, subject, and message are required' });
    }

    const htmlBody = `
      <body style="background-color: #0D0D0D; font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; -webkit-font-smoothing: antialiased; -moz-osx-font-smoothing: grayscale;">
        <div style="max-width: 600px; margin: 20px auto; background-color: #111827; border: 1px solid #374151; border-radius: 12px; overflow: hidden;">
          <div style="padding: 24px; border-bottom: 1px solid #374151;">
             <h1 style="margin: 0; font-size: 28px; font-weight: 600; color: #32E2C4;">
                New Website Inquiry
              </h1>
          </div>
          <div style="padding: 24px;">
            <h2 style="margin: 0 0 16px 0; font-size: 22px; color: #F9FAFB;">${subject}</h2>
            <table style="width: 100%; border-collapse: collapse;">
              <tr style="border-bottom: 1px solid #374151;">
                <th style="text-align: left; padding: 12px 16px; background-color: #1F2937; color: #9CA3AF; font-weight: 500; font-size: 14px; text-transform: uppercase; letter-spacing: 0.5px;">Name</th>
                <td style="text-align: left; padding: 12px 16px; color: #D1D5DB;">${name}</td>
              </tr>
              <tr style="border-bottom: 1px solid #374151;">
                <th style="text-align: left; padding: 12px 16px; background-color: #1F2937; color: #9CA3AF; font-weight: 500; font-size: 14px; text-transform: uppercase; letter-spacing: 0.5px;">Email</th>
                <td style="text-align: left; padding: 12px 16px; color: #D1D5DB;">${email}</td>
              </tr>
              ${company ? `
              <tr style="border-bottom: 1px solid #374151;">
                <th style="text-align: left; padding: 12px 16px; background-color: #1F2937; color: #9CA3AF; font-weight: 500; font-size: 14px; text-transform: uppercase; letter-spacing: 0.5px;">Company</th>
                <td style="text-align: left; padding: 12px 16px; color: #D1D5DB;">${company}</td>
              </tr>` : ''}
              ${phone ? `
              <tr style="border-bottom: 1px solid #374151;">
                <th style="text-align: left; padding: 12px 16px; background-color: #1F2937; color: #9CA3AF; font-weight: 500; font-size: 14px; text-transform: uppercase; letter-spacing: 0.5px;">Phone</th>
                <td style="text-align: left; padding: 12px 16px; color: #D1D5DB;">${phone}</td>
              </tr>` : ''}
            </table>
            <div style="margin-top: 24px;">
              <h3 style="margin: 0 0 12px 0; color: #9CA3AF; font-weight: 500; font-size: 14px; text-transform: uppercase; letter-spacing: 0.5px;">Message</h3>
              <div style="background-color: #1F2937; border-radius: 8px; padding: 16px; color: #D1D5DB; white-space: pre-wrap; word-wrap: break-word;">
                ${message}
              </div>
            </div>
          </div>
          <div style="background-color: #0D0D0D; text-align: center; padding: 16px; font-size: 12px; color: #6B7280;">
            <p style="margin: 0;">Sent from minimaxcode.com</p>
          </div>
        </div>
      </body>
    `;

    const { data, error } = await resend.emails.send({
      from: 'contact@minimaxcode.com',
      to: ['contact@minimaxcode.com'],
      subject: `New Inquiry: ${subject}`,
      html: htmlBody,
    });

    if (error) {
      console.error({ error });
      return res.status(500).json({ message: 'Error sending email' });
    }

    return res.status(200).json({ message: 'Email sent successfully', data });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ message: 'An unexpected error occurred' });
  }
};