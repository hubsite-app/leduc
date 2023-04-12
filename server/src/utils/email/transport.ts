import nodemailer from "nodemailer";

let transportInstance: nodemailer.Transporter | null = null;

export default function transport() {
  if (transportInstance === null) {
    console.log("ENV", {
      host: process.env.EMAIL_HOST as string,
      port: parseInt(process.env.EMAIL_PORT as string),
      secure: true,
      auth: {
        user: process.env.EMAIL_USERNAME as string,
        pass: process.env.EMAIL_PASSWORD as string,
      },
    });
    transportInstance = nodemailer.createTransport({
      host: process.env.EMAIL_HOST as string,
      port: parseInt(process.env.EMAIL_PORT as string),
      secure: true,
      auth: {
        user: process.env.EMAIL_USERNAME as string,
        pass: process.env.EMAIL_PASSWORD as string,
      },
    });
  }

  return transportInstance;
}
