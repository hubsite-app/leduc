import { JobsiteMaterial, JobsiteMaterialDocument } from "@models";
import _ids from "@testing/_ids";

export interface SeededJobsiteMaterials {
  jobsite_2_material_1: JobsiteMaterialDocument;
  jobsite_3_material_1: JobsiteMaterialDocument;
}

const createJobsiteMaterials = () => {
  return new Promise<SeededJobsiteMaterials>(async (resolve, reject) => {
    try {
      const jobsite_2_material_1 = new JobsiteMaterial({
        _id: _ids.jobsiteMaterials.jobsite_2_material_1._id,
        material: _ids.materials.material_1._id,
        supplier: _ids.companies.company_1._id,
        quantity: 2000,
        unit: "tonnes",
        rates: [
          {
            date: new Date(),
            rate: 10,
          },
        ],
      });

      const jobsite_3_material_1 = new JobsiteMaterial({
        _id: _ids.jobsiteMaterials.jobsite_3_material_1._id,
        material: _ids.materials.material_1._id,
        supplier: _ids.companies.company_1._id,
        quantity: 1000,
        unit: "tonnes",
        rates: [
          {
            date: new Date(),
            rate: 15,
          },
        ],
      });

      const jobsiteMaterials = {
        jobsite_2_material_1,
        jobsite_3_material_1,
      };

      for (let i = 0; i < Object.values(jobsiteMaterials).length; i++) {
        await Object.values(jobsiteMaterials)[i].save();
      }

      resolve(jobsiteMaterials);
    } catch (e) {
      reject(e);
    }
  });
};

export default createJobsiteMaterials;
