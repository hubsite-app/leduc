import { logger } from "@logger";
import JobsiteYearReportUpdateHelper from "./helpers/JobsiteYearReportUpdate";

export default setInterval(async () => {
  try {
    await JobsiteYearReportUpdateHelper();
  } catch (e: any) {
    logger.error(`JobsiteYearReport Worker Error: ${e.message}`);
  }
}, 5.5 * 60 * 1000);
