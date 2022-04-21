import { logger } from "@logger";
import JobsiteYearMasterReportUpdateHelper from "./helpers/JobsiteYearMasterReportUpdate";

export default setInterval(async () => {
  try {
    await JobsiteYearMasterReportUpdateHelper();
  } catch (e: any) {
    logger.error(`JobsiteYearMasterReport Worker Error: ${e.message}`);
  }
}, 1 * 60 * 1000);
