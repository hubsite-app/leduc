import { DefaultRateData, RatesData } from "@graphql/types/mutation";
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

  @Field(() => [RatesData], { nullable: true })
  public rates!: RatesData[];

  @Field(() => Boolean, { nullable: false })
  public delivered!: boolean;

  @Field(() => [DefaultRateData], { nullable: true })
  public deliveredRates!: DefaultRateData[];
}

@InputType()
export class JobsiteMaterialUpdateData {
  @Field({ nullable: false })
  public supplierId!: string;

  @Field(() => Float, { nullable: false })
  public quantity!: number;

  @Field({ nullable: false })
  public unit!: string;

  @Field(() => [RatesData], { nullable: false })
  public rates!: RatesData[];

  @Field(() => Boolean, { nullable: false })
  public delivered!: boolean;

  @Field(() => [DefaultRateData], { nullable: true })
  public deliveredRates!: DefaultRateData[];
}

const update = async (
  id: string,
  data: JobsiteMaterialUpdateData
): Promise<JobsiteMaterialDocument> => {
  const jobsiteMaterial = await JobsiteMaterial.getById(id, {
    throwError: true,
  });
  if (!jobsiteMaterial) throw new Error("Unable to find jobsite material");

  const supplier = await Company.getById(data.supplierId, {
    throwError: true,
  });
  if (!supplier) throw new Error("Unable to find supplier");

  await jobsiteMaterial.updateDocument({
    ...data,
    supplier,
  });

  await jobsiteMaterial.save();

  return jobsiteMaterial;
};

export default {
  update,
};
