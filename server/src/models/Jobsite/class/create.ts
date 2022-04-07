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
        (type) => {
          return {
            title: type.title,
            rates: type.rates.map((rate) => {
              return {
                date: rate.date,
                rate: rate.rate,
                type: TruckingRateTypes.Hour,
              };
            }),
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
