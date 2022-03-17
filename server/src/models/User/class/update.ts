import { UserDocument } from "@models";
import createJWT from "@utils/createJWT";
import hashPassword from "@utils/hashPassword";

const admin = (user: UserDocument, isAdmin: boolean) => {
  return new Promise<void>(async (resolve, reject) => {
    try {
      user.admin = isAdmin;

      resolve();
    } catch (e) {
      reject(e);
    }
  });
};

const resetPasswordToken = (user: UserDocument) => {
  return new Promise<string>(async (resolve, reject) => {
    try {
      const token = createJWT(
        {
          userId: user._id,
        },
        { expiresIn: 2 * 60 * 60 }
      );

      user.resetPasswordToken = token;

      resolve(token);
    } catch (e) {
      reject(e);
    }
  });
};

const password = (user: UserDocument, password: string) => {
  return new Promise<void>(async (resolve, reject) => {
    try {
      user.password = await hashPassword(password);

      resolve();
    } catch (e) {
      reject(e);
    }
  });
};

export default {
  admin,
  resetPasswordToken,
  password,
};
