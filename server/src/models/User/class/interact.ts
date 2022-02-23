import { UserDocument } from "@models";
import bcrypt from "bcryptjs";

const checkPassword = (user: UserDocument, password: string) => {
  return new Promise<boolean>(async (resolve, reject) => {
    try {
      const isMatch = await bcrypt.compare(password, user.password);

      resolve(isMatch);
    } catch (e) {
      reject(e);
    }
  });
};

export default {
  checkPassword,
};
