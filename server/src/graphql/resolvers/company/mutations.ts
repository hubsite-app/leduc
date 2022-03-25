import { Company, CompanyDocument } from "@models";
import { Field, InputType } from "type-graphql";

@InputType()
export class CompanyCreateData {
  @Field({ nullable: false })
  public name!: string;
}

const create = (data: CompanyCreateData) => {
  return new Promise<CompanyDocument>(async (resolve, reject) => {
    try {
      const company = await Company.createDocument(data);

      await company.save();

      resolve(company);
    } catch (e) {
      reject(e);
    }
  });
};

export default {
  create,
};
