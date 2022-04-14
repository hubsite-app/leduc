import { Button, Center, Heading } from "@chakra-ui/react";
import React from "react";
import { FiChevronUp } from "react-icons/fi";
import {
  CrewTypes,
  JobsiteMonthReportFullSnippetFragment,
} from "../../../generated/graphql";
import Card from "../../Common/Card";
import JobsiteMonthEmployeeReports from "./Employees";
import JobsiteMonthMaterialReports from "./Materials";
import JobsiteMonthNonCostedMaterialReports from "./NonCostedMaterials";
import JobsiteMonthTruckingReports from "./Trucking";
import JobsiteMonthVehicleReports from "./Vehicles";

interface IJobsiteMonthCrewType {
  crewType: CrewTypes;
  jobsiteMonthReport: JobsiteMonthReportFullSnippetFragment;
}

const JobsiteMonthCrewType = ({
  crewType,
  jobsiteMonthReport,
}: IJobsiteMonthCrewType) => {
  /**
   * ----- Hook Initialization -----
   */

  const [collapsed, setCollapsed] = React.useState(true);

  /**
   * ----- Rendering -----
   */

  return (
    <Card key={crewType}>
      <Heading
        size="md"
        m={2}
        w="100%"
        cursor="pointer"
        onClick={() => setCollapsed(!collapsed)}
      >
        {crewType} Crew
      </Heading>
      {!collapsed && (
        <>
          <JobsiteMonthEmployeeReports
            dayReports={jobsiteMonthReport.dayReports}
            crewType={crewType}
          />
          <JobsiteMonthVehicleReports
            dayReports={jobsiteMonthReport.dayReports}
            crewType={crewType}
          />
          <JobsiteMonthMaterialReports
            dayReports={jobsiteMonthReport.dayReports}
            crewType={crewType}
          />
          <JobsiteMonthNonCostedMaterialReports
            dayReports={jobsiteMonthReport.dayReports}
            crewType={crewType}
          />
          <JobsiteMonthTruckingReports
            dayReports={jobsiteMonthReport.dayReports}
            crewType={crewType}
          />
          <Center>
            <Button
              leftIcon={<FiChevronUp />}
              rightIcon={<FiChevronUp />}
              mt={2}
              color="gray.600"
              p={0}
              variant="ghost"
              onClick={() => setCollapsed(true)}
              _focus={{ border: "none" }}
            >
              hide
            </Button>
          </Center>
        </>
      )}
    </Card>
  );
};

export default JobsiteMonthCrewType;
