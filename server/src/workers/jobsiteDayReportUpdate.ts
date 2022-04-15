import { logger } from "@logger";
import JobsiteDayReportUpdateHelper from "./helpers/JobsiteDayReportUpdate";

export default setInterval(async () => {
  try {
    await JobsiteDayReportUpdateHelper();
  } catch (e: any) {
    logger.error(`JobsiteDayReport Worker Error: ${e.message}`);
  }
}, 1.5 * 60 * 1000);
