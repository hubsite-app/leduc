import { logger } from "@logger";
import JobsiteYearReportUpdateHelper from "./helpers/JobsiteYearReportUpdate";

export default setInterval(async () => {
  try {
    await JobsiteYearReportUpdateHelper();
  } catch (e: unknown) {
    logger.error(`JobsiteYearReport Worker Error: ${(e as Error).message}`);
  }
}, 0.5 * 60 * 1000);
