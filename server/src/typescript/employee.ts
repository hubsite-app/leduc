import { EmployeeDocument } from "@models";

export interface IEmployeeCreate {
  name: string;
  jobTitle?: string;
}

export interface IEmployeeSearchObject {
  score: number;
  employee: EmployeeDocument;
}
