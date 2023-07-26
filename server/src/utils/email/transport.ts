import nodemailer from "nodemailer";
import SMTPTransport from "nodemailer/lib/smtp-transport";

let transportInstance: nodemailer.Transporter | null = null;

export default function transport() {
  if (transportInstance === null) {
    const options: SMTPTransport | SMTPTransport.Options = {
      host: process.env.EMAIL_HOST as string,
      port: parseInt(process.env.EMAIL_PORT as string),
      // secure: true,
      auth: {
        user: process.env.EMAIL_USERNAME as string,
        pass: process.env.EMAIL_PASSWORD as string,
      },
    };
    console.log("ENV", options);
    transportInstance = nodemailer.createTransport(options);
  }

  return transportInstance;
}
