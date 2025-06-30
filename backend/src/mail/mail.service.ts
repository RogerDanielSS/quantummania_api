import { Injectable } from '@nestjs/common';
// eslint-disable-next-line @typescript-eslint/no-require-imports
const nodemailer = require('nodemailer');
import { Transporter } from 'nodemailer';

@Injectable()
export class MailService {
  private transporter: Transporter;

  constructor() {
    this.transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: Number(process.env.SMTP_PORT),
      secure: false,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });
  }

  async sendMail(to: string, subject: string, text: string, html?: string) {
    await this.transporter.sendMail({
      from: process.env.SMTP_USER,
      to,
      subject,
      text,
      html,
    });
  }
}
