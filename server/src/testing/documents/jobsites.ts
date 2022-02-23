import { Jobsite, JobsiteDocument } from "@models";
import _ids from "@testing/_ids";

export interface SeededJobsites {
  jobsite_1: JobsiteDocument;
}

const createJobsites = () => {
  return new Promise<SeededJobsites>(async (resolve, reject) => {
    try {
      const jobsite_1 = new Jobsite({
        _id: _ids.jobsites.jobsite_1._id,
        name: "Jobsite 1",
        location_url: "https://goo.gl/maps/cG7UFkMup7siY89F6",
        description: "First Job",
        jobcode: "2022-1",
        active: true,
        crews: [_ids.crews.base_1._id],
      });

      const jobsites = {
        jobsite_1,
      };

      for (let i = 0; i < Object.values(jobsites).length; i++) {
        await Object.values(jobsites)[i].save();
      }

      resolve(jobsites);
    } catch (e) {
      reject(e);
    }
  });
};

export default createJobsites;
