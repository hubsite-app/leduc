import createQueryString from "./createQueryString";

const employee = (employeeId: string) => {
  return `/employee/${employeeId}`;
};

const vehicle = (vehicleId: string) => {
  return `/vehicle/${vehicleId}`;
};

const crew = (crewId: string) => {
  return `/crew/${crewId}`;
};

export enum JobsiteQueryKeys {
  jobsiteMaterial = "jobsite-material",
}
interface IJobsiteQueryString {
  jobsiteMaterialId?: string;
}
const jobsite = (jobsiteId: string, options?: IJobsiteQueryString) => {
  let queryString = "";
  if (options) {
    const optionObject: Record<string, string> = {};

    if (options.jobsiteMaterialId)
      optionObject[JobsiteQueryKeys.jobsiteMaterial] =
        options.jobsiteMaterialId;

    queryString = createQueryString(optionObject);
  }

  return `/jobsite/${jobsiteId}${queryString}`;
};

const jobsiteMonthReport = (reportId: string) => {
  return `/jobsite-month-report/${reportId}`;
};

const jobsiteYearReport = (reportId: string) => {
  return `/jobsite-year-report/${reportId}`;
};

const jobsiteYearMasterReport = (reportId: string) => {
  return `/jobsite-year-master-report/${reportId}`;
};

const dailyReport = (dailyReportId: string) => {
  return `/daily-report/${dailyReportId}`;
};

const createLink = {
  employee,
  vehicle,
  crew,
  jobsite,
  jobsiteMonthReport,
  jobsiteYearReport,
  jobsiteYearMasterReport,
  dailyReport,
};

export default createLink;
