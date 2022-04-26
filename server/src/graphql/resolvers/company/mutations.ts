import { Company, CompanyDocument } from "@models";
import { Field, InputType } from "type-graphql";

@InputType()
export class CompanyCreateData {
  @Field({ nullable: false })
  public name!: string;
}

const create = async (data: CompanyCreateData): Promise<CompanyDocument> => {
  const company = await Company.createDocument(data);

  await company.save();

  return company;
};

export default {
  create,
};
