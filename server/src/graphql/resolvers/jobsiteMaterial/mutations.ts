import { Company, JobsiteMaterial, JobsiteMaterialDocument } from "@models";
import { Field, Float, InputType } from "type-graphql";

@InputType()
export class JobsiteMaterialCreateData {
  @Field({ nullable: false })
  public materialId!: string;

  @Field({ nullable: false })
  public supplierId!: string;

  @Field(() => Float, { nullable: false })
  public quantity!: number;

  @Field({ nullable: false })
  public unit!: string;

  @Field(() => Float, { nullable: false })
  public rate!: number;
}

@InputType()
export class JobsiteMaterialUpdateData {
  @Field({ nullable: false })
  public supplierId!: string;

  @Field(() => Float, { nullable: false })
  public quantity!: number;

  @Field({ nullable: false })
  public unit!: string;

  @Field(() => Float, { nullable: false })
  public rate!: number;
}

const update = (id: string, data: JobsiteMaterialUpdateData) => {
  return new Promise<JobsiteMaterialDocument>(async (resolve, reject) => {
    try {
      const jobsiteMaterial = (await JobsiteMaterial.getById(id, {
        throwError: true,
      }))!;

      const supplier = (await Company.getById(data.supplierId, {
        throwError: true,
      }))!;

      await jobsiteMaterial.updateDocument({
        ...data,
        supplier,
      });

      await jobsiteMaterial.save();

      resolve(jobsiteMaterial);
    } catch (e) {
      reject(e);
    }
  });
};

export default {
  update,
};
