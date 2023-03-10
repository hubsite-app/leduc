import { Box, Heading } from "@chakra-ui/react";
import React from "react";
import { useJobsiteYearMasterReportCurrentQuery } from "../../../generated/graphql";
import formatDate from "../../../utils/formatDate";
import JobsiteYearMasterReportClientContent from "../../pages/jobsite-year-master-report/ClientContent";
import Loading from "../Loading";

const CurrentJobsiteYearMasterReport = () => {
  /**
   * --- Hook Initialization ---
   */

  const { data, loading } = useJobsiteYearMasterReportCurrentQuery();

  /**
   * --- Rendering ---
   */

  return React.useMemo(() => {
    if (data?.jobsiteYearMasterReportCurrent && !loading) {
      return (
        <Box>
          <Heading>
            {formatDate(
              data.jobsiteYearMasterReportCurrent.startOfYear,
              "YYYY",
              true
            )}
          </Heading>
          <JobsiteYearMasterReportClientContent
            id={data.jobsiteYearMasterReportCurrent._id}
          />
        </Box>
      );
    } else return <Loading />;
  }, [data?.jobsiteYearMasterReportCurrent, loading]);
};

export default CurrentJobsiteYearMasterReport;
