import {
  Jobsite,
  JobsiteDayReport,
  JobsiteDayReportDocument,
  JobsiteDocument,
  JobsiteYearReportDocument,
  JobsiteYearReportModel,
} from "@models";
import { GetByIDOptions, Id, UpdateStatus } from "@typescript/models";
import { getFileSignedUrl } from "@utils/fileStorage";
import populateOptions from "@utils/populateOptions";
import dayjs from "dayjs";

/**
 * ----- Static Methods -----
 */

const byIdDefaultOptions: GetByIDOptions = {
  throwError: false,
};
const byId = async (
  JobsiteYearReport: JobsiteYearReportModel,
  id: Id,
  options: GetByIDOptions = byIdDefaultOptions
): Promise<JobsiteYearReportDocument | null> => {
  options = populateOptions(options, byIdDefaultOptions);

  const jobsiteYearReport = await JobsiteYearReport.findById(id);

  if (!jobsiteYearReport && options.throwError) {
    throw new Error(
      "JobsiteYearReport.getById: unable to find jobsiteYearReport"
    );
  }

  return jobsiteYearReport;
};

const byJobsiteAndDate = async (
  JobsiteYearReport: JobsiteYearReportModel,
  jobsiteId: Id,
  date: Date
): Promise<JobsiteYearReportDocument | null> => {
  const jobsiteYearlyReport = await JobsiteYearReport.findOne({
    jobsite: jobsiteId,
    startOfYear: dayjs(date).startOf("year").toDate(),
  });

  return jobsiteYearlyReport;
};

const byDate = async (
  JobsiteYearReport: JobsiteYearReportModel,
  date: Date
): Promise<JobsiteYearReportDocument[]> => {
  const jobsiteYearlyReports = await JobsiteYearReport.find({
    startOfYear: dayjs(date).startOf("year").toDate(),
  });

  return jobsiteYearlyReports;
};

const byUpdateRequested = async (
  JobsiteYearReport: JobsiteYearReportModel
): Promise<JobsiteYearReportDocument[]> => {
  const reports = await JobsiteYearReport.find({
    "update.status": UpdateStatus.Requested,
  });

  return reports;
};

const byUpdatePending = async (
  JobsiteYearReport: JobsiteYearReportModel
): Promise<JobsiteYearReportDocument[]> => {
  const reports = await JobsiteYearReport.find({
    "update.status": UpdateStatus.Pending,
  });

  return reports;
};

/**
 * ----- Methods -----
 */

const dayReports = async (
  jobsiteYearReport: JobsiteYearReportDocument
): Promise<JobsiteDayReportDocument[]> => {
  const reports = await JobsiteDayReport.find({
    _id: { $in: jobsiteYearReport.dayReports },
  });

  console.log(reports.length);

  return reports;
};

const jobsite = async (
  jobsiteYearReport: JobsiteYearReportDocument
): Promise<JobsiteDocument> => {
  if (!jobsiteYearReport.jobsite)
    throw new Error("this report does not have a jobsite");

  const jobsite = await Jobsite.getById(jobsiteYearReport.jobsite);
  if (!jobsite) throw new Error("Could not find month report jobsite");

  console.log(jobsite);

  return jobsite;
};

const excelName = async (jobsiteYearReport: JobsiteYearReportDocument) => {
  const jobsite = await jobsiteYearReport.getJobsite();
  return `${jobsite.jobcode}_${dayjs(jobsiteYearReport.startOfYear).year()}`;
};

const excelUrl = async (jobsiteYearReport: JobsiteYearReportDocument) => {
  const url = await getFileSignedUrl(await jobsiteYearReport.getExcelName());

  return url;
};

export default {
  byId,
  byDate,
  byJobsiteAndDate,
  byUpdateRequested,
  byUpdatePending,
  dayReports,
  jobsite,
  excelName,
  excelUrl,
};
