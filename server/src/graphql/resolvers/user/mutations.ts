import { Field, InputType } from "type-graphql";

import { Signup, User, UserDocument } from "@models";

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

const admin = (id: string, isAdmin: boolean) => {
  return new Promise<UserDocument>(async (resolve, reject) => {
    try {
      const user = (await User.getById(id, { throwError: true }))!;

      await user.isAdmin(isAdmin);

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
  admin,
};
