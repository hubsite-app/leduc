import { UserDocument } from "@models";
import createJWT from "@utils/createJWT";
import hashPassword from "@utils/hashPassword";
import { UserHomeViewSettings, UserRoles } from "@typescript/user";

const role = (user: UserDocument, role: UserRoles) => {
  return new Promise<void>(async (resolve, reject) => {
    try {
      user.role = role;

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

const homeView = (user: UserDocument, homeView: UserHomeViewSettings) => {
  return new Promise<void>(async (resolve, reject) => {
    try {
      user.settings.homeView = homeView;

      resolve();
    } catch (e) {
      reject(e);
    }
  });
};

export default {
  role,
  resetPasswordToken,
  password,
  homeView,
};
