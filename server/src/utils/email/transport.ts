import nodemailer from "nodemailer";

export default function transport() {
  console.log("ENV", {
    host: process.env.EMAIL_HOST as string,
    port: parseInt(process.env.EMAIL_PORT as string),
    secure: true,
    auth: {
      user: process.env.EMAIL_USERNAME as string,
      pass: process.env.EMAIL_PASSWORD as string,
    },
  });
  return nodemailer.createTransport({
    host: process.env.EMAIL_HOST as string,
    port: parseInt(process.env.EMAIL_PORT as string),
    secure: true,
    auth: {
      user: process.env.EMAIL_USERNAME as string,
      pass: process.env.EMAIL_PASSWORD as string,
    },
  });
}
