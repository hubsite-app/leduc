import { Jobsite, JobsiteDocument } from "@models";

const updateAllJobsites = async () => {
  const jobsites: JobsiteDocument[] = await Jobsite.find({});

  for (const jobsite of jobsites) {
    console.log(`Requesting rebuild for ${jobsite.jobcode}`);
    await jobsite.requestGenerateDayReports();
  }
};

export default updateAllJobsites;
