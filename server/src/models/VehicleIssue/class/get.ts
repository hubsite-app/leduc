import {
  OperatorDailyReport,
  User,
  Vehicle,
  VehicleIssueDocument,
  VehicleIssueModel,
} from "@models";
import { GetByIDOptions, Id, IListOptions } from "@typescript/models";
import populateOptions from "@utils/populateOptions";

const byIdDefaultOptions: GetByIDOptions = {
  throwError: false,
};
const byId = async (
  VehicleIssue: VehicleIssueModel,
  id: Id,
  options: GetByIDOptions = byIdDefaultOptions
): Promise<VehicleIssueDocument | null> => {
  options = populateOptions(options, byIdDefaultOptions);

  const vehicleIssue = await VehicleIssue.findById(id);

  if (!vehicleIssue && options.throwError) {
    throw new Error("VehicleIssue.getById: unable to find vehicle issue");
  }

  return vehicleIssue;
};

const listDefaultOptions: IListOptions<VehicleIssueDocument> = {
  pageLimit: 25,
  offset: 0,
};
const list = async (
  VehicleIssue: VehicleIssueModel,
  options?: IListOptions<VehicleIssueDocument>
): Promise<VehicleIssueDocument[]> => {
  options = populateOptions(options, listDefaultOptions);

  if (options?.query) options.query.archivedAt = null;

  const vehicleIssues = await VehicleIssue.find(
    options?.query || { closed: false },
    undefined,
    {
      limit: options?.pageLimit,
      skip: options?.offset,
      sort: {
        createdAt: "desc",
      },
    }
  );

  return vehicleIssues;
};

/**
 * --- Methods ---
 */

const vehicle = async (vehicleIssue: VehicleIssueDocument) => {
  const vehicle = await Vehicle.getById(vehicleIssue.vehicle?.toString() || "");
  if (!vehicle) throw new Error("Unable to find vehicle associated with issue");

  return vehicle;
};

const author = async (vehicleIssue: VehicleIssueDocument) => {
  const author = await User.getById(vehicleIssue.author?.toString() || "");
  if (!author) throw new Error("Unable to find author of this issue");

  return author;
};

const operatorDailyReport = async (vehicleIssue: VehicleIssueDocument) => {
  if (!vehicleIssue.operatorDailyReport) return;

  const operatorDailyReport = await OperatorDailyReport.getById(
    vehicleIssue.operatorDailyReport.toString()
  );
  if (!operatorDailyReport)
    throw new Error(
      "Unable to find operator daily report associated with this issue"
    );

  return operatorDailyReport;
};

const assignedTo = async (vehicleIssue: VehicleIssueDocument) => {
  if (!vehicleIssue.assignedTo) return;

  const assignedTo = await User.getById(vehicleIssue.assignedTo.toString());
  if (!assignedTo)
    throw new Error("Unable to find user this issue was assigned to");

  return assignedTo;
};

export default {
  byId,
  list,
  vehicle,
  author,
  operatorDailyReport,
  assignedTo,
};
