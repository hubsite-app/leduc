import { JobsiteDocument, JobsiteModel, System } from "@models";
import { IJobsiteCreate, TruckingRateTypes } from "@typescript/jobsite";

const document = async (
  Jobsite: JobsiteModel,
  data: IJobsiteCreate
): Promise<JobsiteDocument> => {
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

  return jobsite;
};

export default {
  document,
};
