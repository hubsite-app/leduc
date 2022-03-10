import { UserDocument } from "@models";

const admin = (user: UserDocument, isAdmin: boolean) => {
  return new Promise<void>(async (resolve, reject) => {
    try {
      user.admin = isAdmin;

      resolve();
    } catch (e) {
      reject(e);
    }
  });
};

export default {
  admin,
};
