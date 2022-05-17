import { JobsiteDocument, JobsiteModel, System } from "@models";
import { IJobsiteCreate } from "@typescript/jobsite";

const document = async (
  Jobsite: JobsiteModel,
  data: IJobsiteCreate
): Promise<JobsiteDocument> => {
  const jobsite = new Jobsite({
    ...data,
  });

  const system = await System.getSystem();
  await jobsite.setTruckingRatesToDefault(system);

  return jobsite;
};

export default {
  document,
};
