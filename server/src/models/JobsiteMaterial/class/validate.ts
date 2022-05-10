import { JobsiteMaterialDocument } from "@models";

const document = async (jobsiteMaterial: JobsiteMaterialDocument) => {
  await jobsiteMaterial.validate();

  if (jobsiteMaterial.delivered) {
    if (
      !jobsiteMaterial.deliveredRates ||
      jobsiteMaterial.deliveredRates.length === 0
    )
      throw new Error("Must provide delivered rates");
  } else {
    if (!jobsiteMaterial.rates || jobsiteMaterial.rates.length === 0)
      throw new Error("Must provide rates");
  }

  return;
};

export default {
  document,
};
