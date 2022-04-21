import { IContext } from "@typescript/graphql";
import { AuthChecker } from "type-graphql";

const authChecker: AuthChecker<IContext> = ({ context }, roles) => {
  return new Promise(async (resolve) => {
    // if 'Authorized()', check only if user exists
    if (roles.length === 0) {
      resolve(!!context.user);
    }

    if (context.user) {
      const isDevelopment = process.env.NODE_ENV === "development";

      if (roles.includes("DEV") && isDevelopment && context.user) resolve(true);

      if (roles.includes("ADMIN") && context.user.role === 3) resolve(true);

      if (roles.includes("PM") && context.user.role >= 2) resolve(true);
    }

    resolve(false);
  });
};

export default authChecker;
