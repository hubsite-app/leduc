import {
  OperatorDailyReportDocument,
  OperatorDailyReportModel,
  UserDocument,
  VehicleDocument,
} from "@models";
import { IOperatorDailyReportCreate } from "@typescript/operatorDailyReport";

const document = async (
  OperatorDailyReport: OperatorDailyReportModel,
  vehicle: VehicleDocument,
  author: UserDocument,
  data: IOperatorDailyReportCreate
): Promise<OperatorDailyReportDocument> => {
  const operatorDailyReport = new OperatorDailyReport({
    vehicle: vehicle._id,
    author: author._id,
    ...data,
  });

  await operatorDailyReport.validateDocument();

  return operatorDailyReport;
};

export default {
  document,
};
