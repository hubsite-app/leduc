import { UserDocument, VehicleIssueDocument } from "@models";

const assignedTo = async (
  vehicleIssue: VehicleIssueDocument,
  assignedTo?: UserDocument
) => {
  vehicleIssue.assignedTo = assignedTo?._id;
};

const close = async (vehicleIssue: VehicleIssueDocument) => {
  vehicleIssue.closed = true;
};

export default {
  assignedTo,
  close,
};
