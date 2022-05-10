import { JobsiteMaterialDocument } from "@models";
import { IJobsiteMaterialUpdate } from "@typescript/jobsiteMaterial";

const document = async (
  jobsiteMaterial: JobsiteMaterialDocument,
  data: IJobsiteMaterialUpdate
) => {
  jobsiteMaterial.supplier = data.supplier._id;

  jobsiteMaterial.quantity = data.quantity;

  jobsiteMaterial.unit = data.unit;

  jobsiteMaterial.rates = data.rates;

  jobsiteMaterial.delivered = data.delivered;

  jobsiteMaterial.deliveredRates = data.deliveredRates;

  await jobsiteMaterial.validateDocument();

  return;
};

export default {
  document,
};
