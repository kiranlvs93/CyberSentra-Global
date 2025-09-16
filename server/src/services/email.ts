import nodemailer from 'nodemailer';

import { config } from '../config/env';

const transporter = nodemailer.createTransport(
  config.smtpHost
    ? {
        host: config.smtpHost,
        port: config.smtpPort,
        secure: false,
        auth: config.smtpUser
          ? {
              user: config.smtpUser,
              pass: config.smtpPass,
            }
          : undefined,
      }
    : {
        streamTransport: true,
        newline: 'unix',
        buffer: true,
      },
);

interface SendMailOptions {
  to: string;
  subject: string;
  html: string;
  text: string;
}

const sendMail = async (options: SendMailOptions) => {
  const mailOptions = {
    from: config.mailFrom,
    ...options,
  };
  const info = await transporter.sendMail(mailOptions);
  if ('message' in info) {
    console.log(info.message.toString());
  }
  return info;
};

export const sendOtpEmail = async (to: string, code: string) => {
  const subject = 'Your Passless verification code';
  const text = `Use this one-time code to complete your sign-in: ${code}`;
  const html = `<p>Use this one-time code to complete your sign-in:</p><p><strong>${code}</strong></p>`;
  await sendMail({ to, subject, text, html });
};

export const sendMagicLinkEmail = async (to: string, link: string) => {
  const subject = 'Passless magic link';
  const text = `Click to verify your login: ${link}`;
  const html = `<p>Click to verify your login:</p><p><a href="${link}">${link}</a></p>`;
  await sendMail({ to, subject, text, html });
};
