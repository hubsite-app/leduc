import React from "react";

import { Flex } from "@chakra-ui/react";
import { useJobsiteMonthlyReportsQuery } from "../../../../generated/graphql";
import Loading from "../../../Common/Loading";
import JobsiteMonthlyReportCard from "../../../Common/JobsiteMonthlyReport/Card";

interface IJobsiteReportsClientContent {
  id: string;
}

const JobsiteReportsClientContent = ({ id }: IJobsiteReportsClientContent) => {
  /**
   * ----- Hook Initialization -----
   */

  const { data, loading } = useJobsiteMonthlyReportsQuery({
    variables: {
      jobsiteId: id,
    },
  });

  /**
   * ----- Rendering -----
   */

  return React.useMemo(() => {
    if (data?.jobsiteMonthlyReports && !loading) {
      const reports = data.jobsiteMonthlyReports!;

      return (
        <Flex flexDir="column">
          {reports.map((report, index) => (
            <JobsiteMonthlyReportCard
              key={index}
              jobsiteMonthlyReport={report}
            />
          ))}
        </Flex>
      );
    } else {
      return <Loading />;
    }
  }, [data, loading]);
};

export default JobsiteReportsClientContent;
