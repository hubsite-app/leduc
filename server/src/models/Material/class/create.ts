import { MaterialDocument, MaterialModel } from "@models";
import { IMaterialCreate } from "@typescript/material";

const document = (Material: MaterialModel, data: IMaterialCreate) => {
  return new Promise<MaterialDocument>(async (resolve, reject) => {
    try {
      const existingMaterial = await Material.getByName(data.name);
      if (existingMaterial) throw new Error("This material already exists");

      const material = new Material({
        ...data,
      });

      resolve(material);
    } catch (e) {
      reject(e);
    }
  });
};

export default {
  document,
};
