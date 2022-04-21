import { Button, Center, Heading } from "@chakra-ui/react";
import React from "react";
import { FiChevronUp } from "react-icons/fi";
import {
  CrewTypes,
  JobsiteMonthReportFullSnippetFragment,
  JobsiteYearReportFullSnippetFragment,
} from "../../../generated/graphql";
import Card from "../../Common/Card";
import JobsiteMonthEmployeeReports from "./Employees";
import JobsiteMonthMaterialReports from "./Materials";
import JobsiteMonthNonCostedMaterialReports from "./NonCostedMaterials";
import JobsiteMonthTruckingReports from "./Trucking";
import JobsiteMonthVehicleReports from "./Vehicles";

interface IJobsiteReportCrewType {
  crewType: CrewTypes;
  report:
    | JobsiteMonthReportFullSnippetFragment
    | JobsiteYearReportFullSnippetFragment;
}

const JobsiteReportCrewType = ({
  crewType,
  report,
}: IJobsiteReportCrewType) => {
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
            dayReports={report.dayReports}
            crewType={crewType}
          />
          <JobsiteMonthVehicleReports
            dayReports={report.dayReports}
            crewType={crewType}
          />
          <JobsiteMonthMaterialReports
            dayReports={report.dayReports}
            crewType={crewType}
          />
          <JobsiteMonthNonCostedMaterialReports
            dayReports={report.dayReports}
            crewType={crewType}
          />
          <JobsiteMonthTruckingReports
            dayReports={report.dayReports}
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

export default JobsiteReportCrewType;
