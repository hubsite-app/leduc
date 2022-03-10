import { SignupDocument } from "@models";

const document = (signup: SignupDocument) => {
  return new Promise<void>(async (resolve, reject) => {
    try {
      await signup.remove();

      resolve();
    } catch (e) {
      reject(e);
    }
  });
};

export default {
  document,
};
