import { Company, CompanyDocument } from "@models";
import _ids from "@testing/_ids";

export interface SeededCompanies {
  company_1: CompanyDocument;
}

const createCompanies = () => {
  return new Promise<SeededCompanies>(async (resolve, reject) => {
    try {
      const company_1 = new Company({
        _id: _ids.companies.company_1._id,
        name: "Supplier Company 1",
      });

      const companies = {
        company_1,
      };

      for (let i = 0; i < Object.values(companies).length; i++) {
        await Object.values(companies)[i].save();
      }

      resolve(companies);
    } catch (e) {
      reject(e);
    }
  });
};

export default createCompanies;
