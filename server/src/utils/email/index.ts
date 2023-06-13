import nodemailer from "nodemailer";
import transport from "./transport";

const sendEmail = async (
  email: string,
  subject: string,
  htmlContent: string
) => {
  try {
    const mailOptions: nodemailer.SendMailOptions = {
      from: `Bow Mark App <${process.env.EMAIL}>`,
      to: email,
      subject,
      html: htmlContent,
    };

    const info = await transport().sendMail(mailOptions);
    console.log(
      `Response from email sent to ${mailOptions.to}: ${info.response}`
    );

    return info;
  } catch (e: unknown) {
    throw new Error(`Unable to send mail: ${(e as Error).message}`);
  }
};

export default {
  sendEmail,
};
