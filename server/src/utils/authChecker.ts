import { IContext } from "@typescript/graphql";
import { AuthChecker } from "type-graphql";

const authChecker: AuthChecker<IContext> = ({ context }, roles) => {
  return new Promise(async (resolve) => {
    // if 'Authorized()', check only if user exists
    if (roles.length === 0) {
      resolve(!!context.user);
    }

    if (context.user) {
      if (roles.includes("ADMIN") && context.user.admin) resolve(true);

      if (roles.includes("PM") && context.user.projectManager) resolve(true);
    }

    resolve(false);
  });
};

export default authChecker;
