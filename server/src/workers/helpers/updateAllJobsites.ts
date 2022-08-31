import { Jobsite, JobsiteDocument } from "@models";

const updateAllJobsites = async () => {
  const jobsites: JobsiteDocument[] = await Jobsite.find({});

  for (const jobsite of jobsites) {
    await jobsite.requestGenerateDayReports();
  }
};

export default updateAllJobsites;
