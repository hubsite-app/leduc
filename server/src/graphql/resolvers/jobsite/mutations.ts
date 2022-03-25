import {
  Company,
  Jobsite,
  JobsiteDocument,
  JobsiteMaterial,
  Material,
} from "@models";
import { Field, InputType } from "type-graphql";
import { JobsiteMaterialCreateData } from "../jobsiteMaterial/mutations";

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

const addMaterial = (jobsiteId: string, data: JobsiteMaterialCreateData) => {
  return new Promise<JobsiteDocument>(async (resolve, reject) => {
    try {
      const jobsite = (await Jobsite.getById(jobsiteId, { throwError: true }))!;

      const material = (await Material.getById(data.materialId, {
        throwError: true,
      }))!;
      const supplier = (await Company.getById(data.supplierId, {
        throwError: true,
      }))!;

      const jobsiteMaterial = await JobsiteMaterial.createDocument({
        ...data,
        jobsite,
        material,
        supplier,
      });

      await jobsiteMaterial.save();

      await jobsite.save();

      resolve(jobsite);
    } catch (e) {
      reject(e);
    }
  });
};

export default {
  create,
  addMaterial,
};
