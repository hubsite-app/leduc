import { Jobsite } from "@models";

const updateToV1 = () => {
  return new Promise<void>(async (resolve, reject) => {
    try {
      const jobsites = await Jobsite.find({
        schemaVersion: undefined,
      });

      if (jobsites.length > 0) {
        console.log(
          `Updating ${jobsites.length} Jobsite document(s) to Schema Version 1...`
        );

        for (let i = 0; i < jobsites.length; i++) {
          jobsites[i].schemaVersion = 1;

          await jobsites[i].save();
        }

        console.log(
          `...successfully updated ${jobsites.length} Jobsite document(s) to Schema Version 1.`
        );
      }

      resolve();
    } catch (e) {
      reject(e);
    }
  });
};

const updateJobsites = () => {
  return new Promise<void>(async (resolve, reject) => {
    try {
      await updateToV1();

      resolve();
    } catch (e) {
      reject(e);
    }
  });
};

export default updateJobsites;
