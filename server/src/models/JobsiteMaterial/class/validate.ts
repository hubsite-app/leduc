import { JobsiteMaterialDocument } from "@models";

const document = (jobsiteMaterial: JobsiteMaterialDocument) => {
  return new Promise<void>(async (resolve, reject) => {
    try {
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

      resolve();
    } catch (e) {
      reject(e);
    }
  });
};

export default {
  document,
};
