import { JobsiteDocument, JobsiteModel } from "@models";
import { IJobsiteCreate } from "@typescript/jobsite";

const document = (Jobsite: JobsiteModel, data: IJobsiteCreate) => {
  return new Promise<JobsiteDocument>(async (resolve, reject) => {
    try {
      const jobsite = new Jobsite({
        ...data,
      });

      resolve(jobsite);
    } catch (e) {
      reject(e);
    }
  });
};

export default {
  document,
};
