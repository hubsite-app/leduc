import { Signup, SignupDocument } from "@models";

const create = (employeeId: string) => {
  return new Promise<SignupDocument>(async (resolve, reject) => {
    try {
      const signup = await Signup.createDocument(employeeId);

      await signup.save();

      resolve(signup);
    } catch (e) {
      reject(e);
    }
  });
};

export default {
  create,
};
