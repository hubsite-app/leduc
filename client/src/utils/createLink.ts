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

const jobsiteDailyReports = (jobsiteId: string) => {
  return `/jobsite/${jobsiteId}/daily-reports`;
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

const dailyReportPDF = (dailyReportId: string) => {
  return `/daily-report/${dailyReportId}/pdf`;
};

const company = (companyId: string) => {
  return `/company/${companyId}`;
};

const server_dailyReportExcelDownload = (dailyReportId: string) => {
  return `${(process.env.NEXT_PUBLIC_API_URL as string).replace(
    "/graphql",
    ""
  )}/file/daily-report/${dailyReportId}`;
};

const server_crewDailyReportMonthExcelDownload = (
  crewId: string,
  dateString: string
) => {
  return `${(process.env.NEXT_PUBLIC_API_URL as string).replace(
    "/graphql",
    ""
  )}/file/crew/${crewId}?start_of_month=${dateString}`;
};

const server_vehiclesExcelDownload = () => {
  return `${(process.env.NEXT_PUBLIC_API_URL as string).replace(
    "/graphql",
    ""
  )}/file/vehicles`;
};

const createLink = {
  employee,
  vehicle,
  crew,
  company,
  jobsite,
  jobsiteDailyReports,
  jobsiteMonthReport,
  jobsiteYearReport,
  jobsiteYearMasterReport,
  dailyReport,
  dailyReportPDF,
  server_dailyReportExcelDownload,
  server_crewDailyReportMonthExcelDownload,
  server_vehiclesExcelDownload,
};

export default createLink;
