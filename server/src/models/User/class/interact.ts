import { UserDocument, UserModel } from "@models";
import createJWT from "@utils/createJWT";
import sendEmail, { IEmailData } from "@utils/sendEmail";
import bcrypt from "bcryptjs";

/**
 * ----- Static Methods -----
 */

const login = async (
  User: UserModel,
  email: string,
  password: string,
  rememberMe: boolean
): Promise<string> => {
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

  return token;
};

/**
 * ----- Methods -----
 */

const checkPassword = async (
  user: UserDocument,
  password: string
): Promise<boolean> => {
  const isMatch = await bcrypt.compare(password, user.password);

  return isMatch;
};

const email = async (user: UserDocument, data: IEmailData) => {
  await sendEmail(user.email, data);

  return;
};

export default {
  login,
  email,
  checkPassword,
};
