import { Box, SimpleGrid, Text } from "@chakra-ui/react";
import React from "react";
import { useJobsiteFullQuery, UserRoles } from "../../../generated/graphql";
import Card from "../../Common/Card";
import DailyReportListCard from "../../Common/DailyReport/DailyReportListCard";
import Loading from "../../Common/Loading";
import Permission from "../../Common/Permission";
import Invoices from "./views/Invoices";
import JobsiteMaterialsCosting from "./views/JobsiteMaterials";
import TruckingRates from "./views/TruckingRates";

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
          <Permission minRole={UserRoles.ProjectManager}>
            <SimpleGrid columns={[1, 1, 1, 2]} spacingX={4} spacingY={2}>
              <JobsiteMaterialsCosting jobsite={jobsite} />
              <Invoices jobsite={jobsite} />
            </SimpleGrid>
            <TruckingRates jobsite={jobsite} />
          </Permission>
          <DailyReportListCard dailyReports={jobsite.dailyReports} />
        </Box>
      );
    } else return <Loading />;
  }, [data]);
};

export default JobsiteClientContent;
