import { Material, MaterialDocument } from "@models";
import { Field, InputType } from "type-graphql";

@InputType()
export class MaterialCreateData {
  @Field({ nullable: false })
  public name!: string;
}

const create = (data: MaterialCreateData) => {
  return new Promise<MaterialDocument>(async (resolve, reject) => {
    try {
      const material = await Material.createDocument(data);

      await material.save();

      resolve(material);
    } catch (e) {
      reject(e);
    }
  });
};

export default {
  create,
};
