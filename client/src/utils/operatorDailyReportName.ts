import dayjs from "dayjs";
import { OperatorDailyReportCardSnippetFragment } from "../generated/graphql";

export default function operatorDailyReportName(
  operatorDailyReport: OperatorDailyReportCardSnippetFragment
) {
  return `${operatorDailyReport.vehicle.vehicleCode} on ${dayjs(
    operatorDailyReport.startTime
  ).format("dddd, MMM D, YYYY")}`;
}
