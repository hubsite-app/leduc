import SearchIndices from "@constants/SearchIndices";
import { CompanyDocument } from "@models";
import SearchClient from "search/client";

export interface CompanySearchDocument {
  id: string;
  name: string;
}

export const CompanySearchIndex = SearchClient.index<CompanySearchDocument>(
  SearchIndices.Company
);
CompanySearchIndex.primaryKey = "id";

export const search_UpdateCompany = async (company: CompanyDocument) => {
  if (process.env.NODE_ENV === "test") return;

  if (!company.archivedAt) {
    await CompanySearchIndex.addDocuments([
      {
        id: company._id.toString(),
        name: company.name,
      },
    ]);
  } else {
    await CompanySearchIndex.deleteDocument(company._id.toString());
  }
};
