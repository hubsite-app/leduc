import { Field, InputType } from "type-graphql";

import { User } from "@models";

@InputType()
export class LoginData {
  @Field({ nullable: false })
  public email!: string;

  @Field({ nullable: false })
  public password!: string;

  @Field({ nullable: false })
  public rememberMe!: boolean;
}

const login = (data: LoginData) => {
  return User.login(data.email, data.password, data.rememberMe);
};

export default {
  login,
};
