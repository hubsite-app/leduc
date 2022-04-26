import { Material, MaterialDocument } from "@models";
import { Field, InputType } from "type-graphql";

@InputType()
export class MaterialCreateData {
  @Field({ nullable: false })
  public name!: string;
}

const create = async (data: MaterialCreateData): Promise<MaterialDocument> => {
  const material = await Material.createDocument(data);

  await material.save();

  return material;
};

export default {
  create,
};
