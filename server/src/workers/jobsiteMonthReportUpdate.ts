import { logger } from "@logger";
import JobsiteMonthReportUpdateHelper from "./helpers/JobsiteMonthReportUpdate";

export default setInterval(async () => {
  try {
    await JobsiteMonthReportUpdateHelper();
  } catch (e: unknown) {
    logger.error(`JobsiteMonthReport Worker Error: ${(e as Error).message}`);
  }
}, 0.5 * 60 * 1000);
