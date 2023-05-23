import { EmployeeDocument } from "@models";
import SearchClient from "search/client";
import SearchIndices from "@constants/SearchIndices";

export interface EmployeeSearchDocument {
  id: string;
  name: string;
  jobTitle?: string;
}

export const EmployeeSearchIndex = SearchClient.index<EmployeeSearchDocument>(
  SearchIndices.Employee
);
EmployeeSearchIndex.primaryKey = "id";

export const search_UpdateEmployee = async (employee: EmployeeDocument) => {
  if (process.env.NODE_ENV === "test") return;

  if (!employee.archivedAt) {
    await EmployeeSearchIndex.addDocuments([
      {
        id: employee._id.toString(),
        name: employee.name,
        jobTitle: employee.jobTitle,
      },
    ]);
  } else {
    await EmployeeSearchIndex.deleteDocument(employee._id.toString());
  }
};
