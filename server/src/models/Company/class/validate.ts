import { CompanyModel } from "@models";

const companies = (Company: CompanyModel) => {
  return new Promise<void>(async (resolve, reject) => {
    try {
      const paving = await Company.findOne({ isBowMarkPaving: true });
      if (!paving) {
        const bowMarkPaving = new Company({
          name: "Bow Mark Paving",
          isBowMarkPaving: true,
        });

        await bowMarkPaving.save();
      }

      const concrete = await Company.findOne({ isBowMarkConcrete: true });
      if (!concrete) {
        const bowMarkConcrete = new Company({
          name: "Bow Mark Concrete",
          isBowMarkConcrete: true,
        });

        await bowMarkConcrete.save();
      }

      resolve();
    } catch (e) {
      reject(e);
    }
  });
};

export default {
  companies,
};
