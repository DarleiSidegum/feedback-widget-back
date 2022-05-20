import { MailAdapter, SendMailData } from '../mail-adapter';
import nodemailer from 'nodemailer';

const transport = nodemailer.createTransport({
    host: "smtp.mailtrap.io",
    port: 2525,
    auth: {
      user: "1e6e10f7f01191",
      pass: "5ac39d12483cf6"
    }
  });

export class NodemailerMailerAdapter implements MailAdapter{
    async sendMail({subject, body}: SendMailData){
        await transport.sendMail({
            from: "Equipe feedget <oi@feedget.com>",
            to: "Darlei <darleidasilvasidegum@hotmail.com>",
            subject,
            html: body
        })
    };
}