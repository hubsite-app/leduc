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
const byId = async (
  JobsiteMaterial: JobsiteMaterialModel,
  id: Id,
  options: GetByIDOptions = byIdDefaultOptions
): Promise<JobsiteMaterialDocument | null> => {
  options = populateOptions(options, byIdDefaultOptions);

  const jobsiteMaterial = await JobsiteMaterial.findById(id);

  if (!jobsiteMaterial && options.throwError) {
    throw new Error("JobsiteMaterial.getById: unable to find jobsiteMaterial");
  }

  return jobsiteMaterial;
};

const byMaterial = async (
  JobsiteMaterial: JobsiteMaterialModel,
  materialId: Id
): Promise<JobsiteMaterialDocument[]> => {
  return await JobsiteMaterial.find({
    material: materialId,
  });
};

/**
 * ----- Methods -----
 */

const material = async (
  jobsiteMaterial: JobsiteMaterialDocument
): Promise<MaterialDocument> => {
  const material = await Material.getById(
    jobsiteMaterial.material?.toString() || "",
    { throwError: true }
  );

  if (!material) throw new Error("Could not find jobsite materials material");

  return material;
};

const supplier = async (
  jobsiteMaterial: JobsiteMaterialDocument
): Promise<CompanyDocument> => {
  const company = await Company.getById(
    jobsiteMaterial.supplier?.toString() || "",
    {
      throwError: true,
    }
  );

  if (!company) throw new Error("Could not find jobsite materials supplier");

  return company;
};

const jobsite = async (
  jobsiteMaterial: JobsiteMaterialDocument
): Promise<JobsiteDocument> => {
  const jobsite = await Jobsite.findOne({ materials: jobsiteMaterial._id });

  if (!jobsite) throw new Error("This material does not have a jobsite");

  return jobsite;
};

const completedQuantity = async (
  jobsiteMaterial: JobsiteMaterialDocument
): Promise<number> => {
  const materialShipments = await MaterialShipment.find({
    jobsiteMaterial: jobsiteMaterial._id,
    noJobsiteMaterial: false,
  });

  let quantity = 0;
  for (let i = 0; i < materialShipments.length; i++) {
    quantity += materialShipments[i].quantity;
  }

  return quantity;
};

const rateForTime = async (
  jobsiteMaterial: JobsiteMaterialDocument,
  date: Date
): Promise<number> => {
  return getRateForTime(jobsiteMaterial.rates, date);
};

export default {
  byId,
  byMaterial,
  material,
  supplier,
  jobsite,
  completedQuantity,
  rateForTime,
};
