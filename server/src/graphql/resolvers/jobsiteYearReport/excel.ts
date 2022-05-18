import { JobsiteYearReport } from "@models";
import { Id } from "@typescript/models";

const excel = async (id: Id) => {
  const jobsiteYearReport = await JobsiteYearReport.getById(id);
  if (!jobsiteYearReport) throw new Error("Can't find");

  await jobsiteYearReport.generateExcel();

  return;
};

export default excel;
