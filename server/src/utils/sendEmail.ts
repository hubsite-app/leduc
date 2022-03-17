export interface IEmailData {
  subject: string;
  plainText: string;
  html: string;
}

const sendEmail = (recipientEmail: string, data: IEmailData) => {
  return new Promise<void>(async (resolve, reject) => {
    try {
      console.log("recipientEmail", recipientEmail);
      console.log("data", data);

      resolve();
    } catch (e) {
      reject(e);
    }
  });
};

export default sendEmail;
