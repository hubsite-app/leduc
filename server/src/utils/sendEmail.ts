export interface IEmailData {
  subject: string;
  plainText: string;
  html: string;
}

const sendEmail = async (recipientEmail: string, data: IEmailData) => {
  console.log("recipientEmail", recipientEmail);
  console.log("data", data);

  return;
};

export default sendEmail;
