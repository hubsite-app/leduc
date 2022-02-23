import { IContext } from "@typescript/graphql";
import { AuthChecker } from "type-graphql";

const authChecker: AuthChecker<IContext> = ({ context }) => {
  return new Promise(async (resolve) => {
    if (!context.user) resolve(false);

    resolve(true);
  });
};

export default authChecker;
