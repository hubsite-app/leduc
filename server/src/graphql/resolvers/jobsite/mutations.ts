import { Jobsite, JobsiteDocument } from "@models";
import { Field, InputType } from "type-graphql";

@InputType()
export class JobsiteCreateData {
  @Field({ nullable: false })
  public name!: string;

  @Field({ nullable: false })
  public jobcode!: string;

  @Field({ nullable: true })
  public description?: string;
}

const create = (data: JobsiteCreateData) => {
  return new Promise<JobsiteDocument>(async (resolve, reject) => {
    try {
      const jobsite = await Jobsite.createDocument(data);

      await jobsite.save();

      resolve(jobsite);
    } catch (e) {
      reject(e);
    }
  });
};

export default {
  create,
};
