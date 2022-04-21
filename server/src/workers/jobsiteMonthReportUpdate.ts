import { logger } from "@logger";
import JobsiteMonthReportUpdateHelper from "./helpers/JobsiteMonthReportUpdate";

export default setInterval(async () => {
  try {
    await JobsiteMonthReportUpdateHelper();
  } catch (e: any) {
    logger.error(`JobsiteMonthReport Worker Error: ${e.message}`);
  }
}, 5 * 60 * 1000);
