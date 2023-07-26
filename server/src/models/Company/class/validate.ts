import { CompanyModel } from "@models";

const companies = async (Company: CompanyModel) => {
  const isCompany = await Company.findOne({ isCompany: true });
  if (!isCompany) {
    const company = new Company({
      name: "LeDuc Milling & Asphalt",
      isCompany: true,
    });

    await company.save();
  }

  return;
};

export default {
  companies,
};
