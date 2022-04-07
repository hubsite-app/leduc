import { JobsiteMaterialDocument } from "@models";
import { IJobsiteMaterialUpdate } from "@typescript/jobsiteMaterial";

const document = (
  jobsiteMaterial: JobsiteMaterialDocument,
  data: IJobsiteMaterialUpdate
) => {
  return new Promise<void>(async (resolve, reject) => {
    try {
      jobsiteMaterial.supplier = data.supplier._id;

      jobsiteMaterial.quantity = data.quantity;

      jobsiteMaterial.unit = data.unit;

      jobsiteMaterial.rates = data.rates;

      resolve();
    } catch (e) {
      reject(e);
    }
  });
};

export default {
  document,
};
