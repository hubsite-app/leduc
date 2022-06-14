import {
  JobsiteYearMasterReportDocument,
  JobsiteYearMasterReportModel,
} from "@models";
import { GetByIDOptions, Id, UpdateStatus } from "@typescript/models";
import { getFileSignedUrl } from "@utils/fileStorage";
import monthsInYear from "@utils/monthsInYear";
import populateOptions from "@utils/populateOptions";
import dayjs from "dayjs";

/**
 * ----- Static Methods -----
 */

const byIdDefaultOptions: GetByIDOptions = {
  throwError: false,
};
const byId = async (
  JobsiteYearMasterReport: JobsiteYearMasterReportModel,
  id: Id,
  options: GetByIDOptions = byIdDefaultOptions
): Promise<JobsiteYearMasterReportDocument | null> => {
  options = populateOptions(options, byIdDefaultOptions);

  const jobsiteYearReport = await JobsiteYearMasterReport.findById(id);

  if (!jobsiteYearReport && options.throwError) {
    throw new Error(
      "JobsiteYearMasterReport.getById: unable to find jobsiteYearMasterReport"
    );
  }

  return jobsiteYearReport;
};

const byDate = async (
  JobsiteYearMasterReport: JobsiteYearMasterReportModel,
  date: Date
): Promise<JobsiteYearMasterReportDocument | null> => {
  const jobsiteYearMasterReport = await JobsiteYearMasterReport.findOne({
    startOfYear: dayjs(date).startOf("year").toDate(),
  });

  return jobsiteYearMasterReport;
};

const byUpdateRequested = async (
  JobsiteYearMasterReport: JobsiteYearMasterReportModel
): Promise<JobsiteYearMasterReportDocument[]> => {
  const reports = await JobsiteYearMasterReport.find({
    "update.status": UpdateStatus.Requested,
  });

  return reports;
};

const byUpdatePending = async (
  JobsiteYearMasterReport: JobsiteYearMasterReportModel
): Promise<JobsiteYearMasterReportDocument[]> => {
  const reports = await JobsiteYearMasterReport.find({
    "update.status": UpdateStatus.Pending,
  });

  return reports;
};

/**
 * ----- Methods -----
 */

const excelName = async (
  jobsiteYearMasterReport: JobsiteYearMasterReportDocument
) => {
  return `${process.env.APP_NAME}_Master_Costing_${dayjs(
    jobsiteYearMasterReport.startOfYear
  ).year()}`;
};

const monthIndices = async (
  jobsiteYearMasterReport: JobsiteYearMasterReportDocument
) => {
  const isCurrentYear = dayjs(jobsiteYearMasterReport.startOfYear).isSame(
    dayjs(),
    "year"
  );

  let months: number[] = [];

  if (isCurrentYear) {
    months = [...Array(dayjs().month() + 1).keys()];
  } else {
    months = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11];
  }

  return months;
};

const excelMonthNames = async (
  jobsiteYearMasterReport: JobsiteYearMasterReportDocument
) => {
  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const months = monthsInYear(jobsiteYearMasterReport.startOfYear);

  return months.map(
    (index) =>
      `${process.env.APP_NAME}_Master_Costing_${dayjs(
        jobsiteYearMasterReport.startOfYear
      ).year()}_${monthNames[index]}`
  );
};

const excelUrl = async (
  jobsiteYearMasterReport: JobsiteYearMasterReportDocument
) => {
  const url = await getFileSignedUrl(
    await jobsiteYearMasterReport.getExcelName()
  );

  return url;
};

export default {
  byId,
  byDate,
  byUpdateRequested,
  byUpdatePending,
  monthIndices,
  excelName,
  excelMonthNames,
  excelUrl,
};
