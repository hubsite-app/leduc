import { MaterialDocument } from "@models";
import { IMaterialUpdate } from "@typescript/material";

const document = (material: MaterialDocument, data: IMaterialUpdate) => {
  material.name = data.name;
};

export default {
  document,
};
