import { CompanyDocument } from "@models";

export interface ICompanyCreate {
  name: string;
}

export interface ICompanySearchObject {
  score: number;
  company: CompanyDocument;
}
