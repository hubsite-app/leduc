import { User, UserDocument } from "@models";
import _ids from "@testing/_ids";
import hashPassword from "@utils/hashPassword";

export interface SeededUsers {
  base_foreman_1_user: UserDocument;
}

const createUsers = () => {
  return new Promise<SeededUsers>(async (resolve, reject) => {
    try {
      const base_foreman_1_user = new User({
        _id: _ids.users.base_foreman_1_user._id,
        name: "Base Foreman 1",
        email: "baseforeman1@bowmark.ca",
        password: await hashPassword("password"),
        employee: _ids.employees.base_foreman_1._id,
      });

      const users = {
        base_foreman_1_user,
      };

      for (let i = 0; i < Object.values(users).length; i++) {
        await Object.values(users)[i].save();
      }

      resolve(users);
    } catch (e) {
      reject(e);
    }
  });
};

export default createUsers;
