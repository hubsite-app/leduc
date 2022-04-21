import { SignupDocument, UserDocument, UserModel } from "@models";
import { IUserCreate } from "@typescript/user";

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
      });

      await user.updatePassword(data.password);

      resolve(user);
    } catch (e) {
      reject(e);
    }
  });
};

export default {
  document,
};
