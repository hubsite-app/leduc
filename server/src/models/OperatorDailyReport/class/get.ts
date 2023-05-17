import {
  Employee,
  OperatorDailyReportDocument,
  OperatorDailyReportModel,
  User,
  Vehicle,
  VehicleIssue,
} from "@models";
import { GetByIDOptions, IListOptions } from "@typescript/models";
import populateOptions from "@utils/populateOptions";
import { Types } from "mongoose";

const byIdDefaultOptions: GetByIDOptions = {
  throwError: false,
};
const byId = async (
  OperatorDailyReport: OperatorDailyReportModel,
  id: Types.ObjectId | string,
  options: GetByIDOptions = byIdDefaultOptions
): Promise<OperatorDailyReportDocument | null> => {
  options = populateOptions(options, byIdDefaultOptions);

  const operatorDailyReport = await OperatorDailyReport.findById(id);

  if (!operatorDailyReport && options.throwError) {
    throw new Error(
      "OperatorDailyReport.getById: unable to find operator daily report"
    );
  }

  return operatorDailyReport;
};

const listDefaultOptions: IListOptions<OperatorDailyReportDocument> = {
  pageLimit: 25,
  offset: 0,
};
const list = async (
  OperatorDailyReport: OperatorDailyReportModel,
  options?: IListOptions<OperatorDailyReportDocument>
): Promise<OperatorDailyReportDocument[]> => {
  options = populateOptions(options, listDefaultOptions);

  if (options?.query) options.query.archivedAt = null;

  const operatorDailyReports = await OperatorDailyReport.find(
    options?.query || { archivedAt: null },
    undefined,
    {
      limit: options?.pageLimit,
      skip: options?.offset,
      sort: {
        startTime: "desc",
      },
    }
  );

  return operatorDailyReports;
};

/**
 * ----- Methods -----
 */

const vehicle = async (operatorDailyReport: OperatorDailyReportDocument) => {
  const vehicle = await Vehicle.getById(
    operatorDailyReport.vehicle?.toString() || ""
  );
  if (!vehicle)
    throw new Error("Unable to find vehicle associated with report");

  return vehicle;
};

const author = async (operatorDailyReport: OperatorDailyReportDocument) => {
  const author = await Employee.getById(
    operatorDailyReport.author?.toString() || ""
  );
  if (!author) throw new Error("Unable to find author of this report");

  return author;
};

const vehicleIssues = async (
  operatorDailyReport: OperatorDailyReportDocument
) => {
  const vehicleIssues = await VehicleIssue.getByVehicle(
    operatorDailyReport.vehicle?.toString() || ""
  );

  return vehicleIssues;
};

export default {
  byId,
  list,
  vehicle,
  author,
  vehicleIssues,
};
