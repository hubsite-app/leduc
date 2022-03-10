import { SignupDocument, UserDocument, UserModel } from "@models";
import { IUserCreate } from "@typescript/user";
import hashPassword from "@utils/hashPassword";

const document = (
  User: UserModel,
  signup: SignupDocument,
  data: IUserCreate
) => {
  return new Promise<UserDocument>(async (resolve, reject) => {
    try {
      const employee = await signup.getEmployee();

      const user = new User({
        ...data,
        employee: employee._id,
        password: await hashPassword(data.password),
      });

      resolve(user);
    } catch (e) {
      reject(e);
    }
  });
};

export default {
  document,
};
