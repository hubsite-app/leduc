import { JobsiteMaterialDocument } from "@models";

const requestUpdate = (jobsiteMaterial: JobsiteMaterialDocument) => {
  return new Promise<void>(async (resolve, reject) => {
    try {
      const jobsite = await jobsiteMaterial.getJobsite();

      await jobsite.requestGenerateDayReports();

      resolve();
    } catch (e) {
      reject(e);
    }
  });
};

export default {
  requestUpdate,
};
