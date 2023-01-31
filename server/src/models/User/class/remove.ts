import { UserDocument } from "@models";

const fullDelete = async (user: UserDocument) => {
  await user.remove();

  return;
};

export default {
  fullDelete,
};
