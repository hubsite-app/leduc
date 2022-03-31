import { JobsiteDocument, JobsiteModel, System } from "@models";
import { IJobsiteCreate, TruckingRateTypes } from "@typescript/jobsite";

const document = (Jobsite: JobsiteModel, data: IJobsiteCreate) => {
  return new Promise<JobsiteDocument>(async (resolve, reject) => {
    try {
      const jobsite = new Jobsite({
        ...data,
      });

      const system = await System.getSystem();
      jobsite.truckingRates = system.materialShipmentVehicleTypeDefaults.map(
        (rate) => {
          return {
            rate: rate.rate,
            title: rate.title,
            type: TruckingRateTypes.Hour,
          };
        }
      );

      resolve(jobsite);
    } catch (e) {
      reject(e);
    }
  });
};

export default {
  document,
};
