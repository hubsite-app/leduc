import { CompanyDocument } from "@models";

const archive = (company: CompanyDocument) => {
  if (!company.archivedAt) company.archivedAt = new Date();
};

export default {
  archive,
};
