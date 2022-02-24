import { UserDocument, UserModel } from "@models";
import createJWT from "@utils/createJWT";
import bcrypt from "bcryptjs";

/**
 * ----- Static Methods -----
 */

const login = (
  User: UserModel,
  email: string,
  password: string,
  rememberMe: boolean
) => {
  return new Promise<string>(async (resolve, reject) => {
    try {
      const user = await User.getByEmail(email);
      if (!user) throw new Error("Invalid email or password provided");

      if ((await user.checkPassword(password)) === false)
        throw new Error("Invalid email or password provided");

      let expiresIn = 24 * 60 * 60;
      if (rememberMe) expiresIn = 30 * 24 * 60 * 60;

      const token = createJWT(
        {
          userId: user._id,
        },
        { expiresIn }
      );

      resolve(token);
    } catch (e) {
      reject(e);
    }
  });
};

/**
 * ----- Methods -----
 */

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
  login,
  checkPassword,
};
