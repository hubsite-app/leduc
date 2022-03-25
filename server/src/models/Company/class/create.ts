import { CompanyDocument, CompanyModel } from "@models";
import { ICompanyCreate } from "@typescript/company";

const document = (Company: CompanyModel, data: ICompanyCreate) => {
  return new Promise<CompanyDocument>(async (resolve, reject) => {
    try {
      const existingCompany = await Company.getByName(data.name);
      if (existingCompany) throw new Error("This company already exists");

      const company = new Company({
        ...data,
      });

      resolve(company);
    } catch (e) {
      reject(e);
    }
  });
};

export default {
  document,
};
