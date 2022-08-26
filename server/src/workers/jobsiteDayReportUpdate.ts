import errorHandler from "@utils/errorHandler";
import JobsiteDayReportUpdateHelper from "./helpers/JobsiteDayReportUpdate";

export default setInterval(async () => {
  try {
    await JobsiteDayReportUpdateHelper();
  } catch (e) {
    errorHandler("JobsiteDayReport Worker Error", e);
  }
}, 0.6 * 60 * 1000);
