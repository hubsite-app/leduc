import {
  Company,
  CompanyDocument,
  JobsiteMaterialDocument,
  JobsiteMaterialModel,
  Material,
  MaterialDocument,
} from "@models";
import { GetByIDOptions, Id } from "@typescript/models";
import populateOptions from "@utils/populateOptions";

/**
 * ----- Static Methods -----
 */

const byIdDefaultOptions: GetByIDOptions = {
  throwError: false,
};
const byId = (
  JobsiteMaterial: JobsiteMaterialModel,
  id: Id,
  options: GetByIDOptions = byIdDefaultOptions
) => {
  return new Promise<JobsiteMaterialDocument | null>(
    async (resolve, reject) => {
      try {
        options = populateOptions(options, byIdDefaultOptions);

        const jobsiteMaterial = await JobsiteMaterial.findById(id);

        if (!jobsiteMaterial && options.throwError) {
          throw new Error(
            "JobsiteMaterial.getById: unable to find jobsiteMaterial"
          );
        }

        resolve(jobsiteMaterial);
      } catch (e) {
        reject(e);
      }
    }
  );
};

/**
 * ----- Methods -----
 */

const material = (jobsiteMaterial: JobsiteMaterialDocument) => {
  return new Promise<MaterialDocument>(async (resolve, reject) => {
    try {
      const material = (await Material.getById(
        jobsiteMaterial.material!.toString(),
        { throwError: true }
      ))!;

      resolve(material);
    } catch (e) {
      reject(e);
    }
  });
};

const supplier = (jobsiteMaterial: JobsiteMaterialDocument) => {
  return new Promise<CompanyDocument>(async (resolve, reject) => {
    try {
      const company = (await Company.getById(
        jobsiteMaterial.supplier!.toString(),
        { throwError: true }
      ))!;

      resolve(company);
    } catch (e) {
      reject(e);
    }
  });
};

export default {
  byId,
  material,
  supplier,
};
