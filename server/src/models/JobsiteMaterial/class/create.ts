import { JobsiteMaterialDocument, JobsiteMaterialModel } from "@models";
import { IJobsiteMaterialCreate } from "@typescript/jobsiteMaterial";

const document = (
  JobsiteMaterial: JobsiteMaterialModel,
  data: IJobsiteMaterialCreate
) => {
  return new Promise<JobsiteMaterialDocument>(async (resolve, reject) => {
    try {
      const jobsiteMaterial = new JobsiteMaterial({
        material: data.material._id,
        supplier: data.supplier._id,
        quantity: data.quantity,
        unit: data.unit,
        rates: data.rates,
      });

      await data.jobsite.addMaterial(jobsiteMaterial);

      resolve(jobsiteMaterial);
    } catch (e) {
      reject(e);
    }
  });
};

export default {
  document,
};
