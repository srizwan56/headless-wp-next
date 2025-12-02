import type { NextApiRequest, NextApiResponse } from 'next';
import sgMail from '@sendgrid/mail';

sgMail.setApiKey(process.env.SENDGRID_API_KEY || '');

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') return res.status(405).end();
  const { name, email, message } = req.body;
  const msg = {
    to: 'you@yourdomain.com', // Apna email daalo yahan
    from: 'no-reply@yourdomain.com', // Apna verified sendgrid email daalo
    subject: `Contact Form: ${name}`,
    text: `${message}\n\nFrom: ${name} <${email}>`,
    html: `<p>${message}</p><p>From: ${name} &lt;${email}&gt;</p>`
  };
  try {
    await sgMail.send(msg);
    return res.status(200).json({ ok: true });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: 'send failed' });
  }
}
