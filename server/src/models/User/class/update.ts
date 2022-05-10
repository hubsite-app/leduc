import { UserDocument } from "@models";
import createJWT from "@utils/createJWT";
import hashPassword from "@utils/hashPassword";
import { UserHomeViewSettings, UserRoles } from "@typescript/user";

const role = async (user: UserDocument, role: UserRoles) => {
  user.role = role;

  return;
};

const resetPasswordToken = async (user: UserDocument): Promise<string> => {
  const token = createJWT(
    {
      userId: user._id,
    },
    { expiresIn: 2 * 60 * 60 }
  );

  user.resetPasswordToken = token;

  return token;
};

const password = async (user: UserDocument, password: string) => {
  user.password = await hashPassword(password);

  return;
};

const homeView = async (user: UserDocument, homeView: UserHomeViewSettings) => {
  user.settings.homeView = homeView;

  return;
};

export default {
  role,
  resetPasswordToken,
  password,
  homeView,
};
