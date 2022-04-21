import {
  Company,
  CompanyDocument,
  Jobsite,
  JobsiteDocument,
  JobsiteMaterialDocument,
  JobsiteMaterialModel,
  Material,
  MaterialDocument,
  MaterialShipment,
} from "@models";
import { GetByIDOptions, Id } from "@typescript/models";
import getRateForTime from "@utils/getRateForTime";
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

const jobsite = (jobsiteMaterial: JobsiteMaterialDocument) => {
  return new Promise<JobsiteDocument>(async (resolve, reject) => {
    try {
      const jobsite = await Jobsite.findOne({ materials: jobsiteMaterial._id });

      if (!jobsite) throw new Error("This material does not have a jobsite");

      resolve(jobsite);
    } catch (e) {
      reject(e);
    }
  });
};

const completedQuantity = (jobsiteMaterial: JobsiteMaterialDocument) => {
  return new Promise<number>(async (resolve, reject) => {
    try {
      const materialShipments = await MaterialShipment.find({
        jobsiteMaterial: jobsiteMaterial._id,
        noJobsiteMaterial: false,
      });

      let quantity = 0;
      for (let i = 0; i < materialShipments.length; i++) {
        quantity += materialShipments[i].quantity;
      }

      resolve(quantity);
    } catch (e) {
      reject(e);
    }
  });
};

const rateForTime = (jobsiteMaterial: JobsiteMaterialDocument, date: Date) => {
  return new Promise<number>(async (resolve, reject) => {
    try {
      resolve(getRateForTime(jobsiteMaterial.rates, date));
    } catch (e) {
      reject(e);
    }
  });
};

export default {
  byId,
  material,
  supplier,
  jobsite,
  completedQuantity,
  rateForTime,
};
