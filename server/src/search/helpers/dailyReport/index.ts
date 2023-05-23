import { CrewDocument, DailyReportDocument, JobsiteDocument } from "@models";
import SearchClient from "search/client";
import SearchIndices from "@constants/SearchIndices";
import { logger } from "@logger";

export interface DailyReportSearchDocument {
  id: string;
  jobsiteName: string;
  jobsiteCode: string;
  crewName: string;
  // Timestamp in seconds
  date: number;
}

export const DailyReportSearchIndex =
  SearchClient.index<DailyReportSearchDocument>(SearchIndices.DailyReport);
DailyReportSearchIndex.primaryKey = "id";

export const search_UpdateDailyReport = async (
  dailyReport: DailyReportDocument
) => {
  if (process.env.NODE_ENV === "test") return;

  if (!dailyReport.archived !== true) {
    let crew: CrewDocument | undefined = undefined,
      jobsite: JobsiteDocument | undefined = undefined;
    try {
      jobsite = await dailyReport.getJobsite();
      crew = await dailyReport.getCrew();
    } catch (e: unknown) {
      logger.info(`Daily Report search update error: ${(e as Error).message}`);
    }

    await DailyReportSearchIndex.addDocuments([
      {
        id: dailyReport._id.toString(),
        jobsiteName: jobsite?.name || "",
        jobsiteCode: jobsite?.jobcode || "",
        crewName: crew?.name || "",
        date: Date.parse(dailyReport.date.toString()) / 1000,
      },
    ]);
  } else {
    await DailyReportSearchIndex.deleteDocument(dailyReport._id.toString());
  }
};
