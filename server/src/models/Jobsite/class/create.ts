import { JobsiteDocument, JobsiteModel, System } from "@models";
import { IJobsiteCreate } from "@typescript/jobsite";

const document = (Jobsite: JobsiteModel, data: IJobsiteCreate) => {
  return new Promise<JobsiteDocument>(async (resolve, reject) => {
    try {
      const jobsite = new Jobsite({
        ...data,
      });

      const system = await System.getSystem();
      jobsite.truckingRates = system.materialShipmentVehicleTypeDefaults;

      resolve(jobsite);
    } catch (e) {
      reject(e);
    }
  });
};

export default {
  document,
};
