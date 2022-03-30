import { Box, Text } from "@chakra-ui/react";
import React from "react";
import { useJobsiteFullQuery } from "../../../generated/graphql";
import AdminOnly from "../../Common/AdminOnly";
import Card from "../../Common/Card";
import DailyReportListCard from "../../Common/DailyReport/DailyReportListCard";
import Loading from "../../Common/Loading";
import Invoices from "./views/Invoices";
import JobsiteMaterialsCosting from "./views/JobsiteMaterials";

interface IJobsiteClientContent {
  id: string;
}

const JobsiteClientContent = ({ id }: IJobsiteClientContent) => {
  /**
   * ----- Hook Initialization -----
   */

  const { data } = useJobsiteFullQuery({
    variables: { id },
  });

  /**
   * ----- Rendering -----
   */

  return React.useMemo(() => {
    if (data?.jobsite) {
      const { jobsite } = data;

      return (
        <Box>
          <Card>
            <Text>
              <Text fontWeight="bold" as="span">
                Code:{" "}
              </Text>
              {jobsite.jobcode}
            </Text>
            {jobsite.description && (
              <Text>
                <Text fontWeight="bold" as="span">
                  Description:{" "}
                </Text>
                {jobsite.description}
              </Text>
            )}
          </Card>
          <AdminOnly>
            <JobsiteMaterialsCosting jobsite={jobsite} />
            <Invoices jobsite={jobsite} />
          </AdminOnly>
          <DailyReportListCard dailyReports={jobsite.dailyReports} />
        </Box>
      );
    } else return <Loading />;
  }, [data]);
};

export default JobsiteClientContent;
