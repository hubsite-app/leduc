import { Field, InputType } from "type-graphql";

import { Signup, User, UserDocument } from "@models";
import { decode, JwtPayload } from "jsonwebtoken";
import { Id } from "@typescript/models";
import { UserRoles } from "@typescript/user";

@InputType()
export class LoginData {
  @Field({ nullable: false })
  public email!: string;

  @Field({ nullable: false })
  public password!: string;

  @Field({ nullable: false })
  public rememberMe!: boolean;
}

@InputType()
export class SignupData {
  @Field({ nullable: false })
  public name!: string;

  @Field({ nullable: false })
  public email!: string;

  @Field({ nullable: false })
  public password!: string;
}

const login = (data: LoginData) => {
  return User.login(data.email, data.password, data.rememberMe);
};

const signup = (signupId: string, data: SignupData) => {
  return new Promise<string>(async (resolve, reject) => {
    try {
      const signup = (await Signup.getById(signupId, { throwError: true }))!;

      const user = await User.createDocument(signup, data);

      await user.save();

      await signup.remove();

      const token = await User.login(user.email, data.password, true);

      resolve(token);
    } catch (e) {
      reject(e);
    }
  });
};

const passwordResetRequest = (email: string) => {
  return new Promise<boolean>(async (resolve, reject) => {
    try {
      const user = await User.getByEmail(email);
      if (!user) throw new Error("Unable to find user with that email");

      const token = await user.setResetPasswordToken();

      await user.save();

      await user.sendEmail({
        subject: "Bow Mark - Password Reset",
        html: `Follow link to reset password: ${token}`,
        plainText: `Follow link to reset password: ${token}`,
      });

      resolve(true);
    } catch (e) {
      reject(e);
    }
  });
};

const passwordReset = (password: string, token: string) => {
  return new Promise<boolean>(async (resolve, reject) => {
    try {
      const user = await User.getByResetPasswordToken(token);
      if (!user) throw new Error("Invalid token, please try the process again");

      const decoded = decode(token) as JwtPayload;

      if (decoded.exp! * 1000 < new Date().getTime())
        throw new Error(
          "Your reset link has expired, pleas try the proocess again"
        );

      await user.updatePassword(password);

      await user.save();

      resolve(true);
    } catch (e) {
      reject(e);
    }
  });
};

const role = (id: Id, role: UserRoles) => {
  return new Promise<UserDocument>(async (resolve, reject) => {
    try {
      const user = (await User.getById(id, { throwError: true }))!;

      await user.updateRole(role);

      await user.save();

      resolve(user);
    } catch (e) {
      reject(e);
    }
  });
};

export default {
  login,
  signup,
  role,
  passwordResetRequest,
  passwordReset,
};
