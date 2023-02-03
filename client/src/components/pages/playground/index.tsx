import { Box, Heading, Stack } from "@chakra-ui/react";
import React from "react";
import { useOperatorDailyReportForm } from "../../../forms/operatorDailyReport";
import Container from "../../Common/Container";

enum Units {
  KM = "KM",
}

// Should this be a "survey", a state machine?
export interface OperatorDailyReportData {
  // employeeId: string // operator
  // vehicleId: string
  // date: Date
  startTime: Date;
  odometer: number;
  checklist: {
    walkAroundComplete: boolean;
    visualInspectionComplete: boolean;
    oilChecked: boolean;
    coolantChecked: boolean;
    fluidsChecked: boolean;
  };
  properFunction: boolean;
  wasDamageObserved: boolean;
  damageObserved?: string;
  wereLeaksFound: boolean;
  leaksFound: {
    type: string;
    location: string;
  }[];
  fluidsAdded: {
    type: string;
    litres: number;
  }[];
  backupAlarmFunctional: boolean;
  lightsFunctional: boolean;
  fireExtinguisherFunctional: boolean;
  licensePlateFunctional: boolean;
  notes: string;
}

interface IssueTag {
  name: string;
  description: string;
}

enum IssuePriority {
  Low = "Low",
  Medium = "Medium",
  High = "High",
}

interface VehicleIssue {
  title: string;
  description: string;
  tags: IssueTag[];

  // authorId: User;
  // vehicleId: Vehicle;
}

const PlaygroundClientOnly = () => {
  /**
   * ----- Hook Initialization -----
   */

  const { FormComponents, wasDamageObserved } = useOperatorDailyReportForm();
  const isLoading = false;

  /**
   * ----- Render -----
   */

  return (
    <Container>
      client stuff
      <Box>
        <Heading>Operator Daily Report</Heading>
        <FormComponents.Form submitHandler={() => { }}>
          <FormComponents.Odometer isLoading={isLoading} />
          <FormComponents.StartTime isLoading={isLoading} />
          <Box>
            <Heading size="md">Checklist</Heading>
            <Stack>
              <FormComponents.Checklist.WalkAround isLoading={isLoading} />
              <FormComponents.Checklist.VisualInspection
                isLoading={isLoading}
              />
              <FormComponents.Checklist.Oil isLoading={isLoading} />
              <FormComponents.Checklist.Coolant isLoading={isLoading} />
              <FormComponents.Checklist.Fluids isLoading={isLoading} />
            </Stack>
            <Stack>
              <Heading size="md">Findings</Heading>
              <i>Will only show up once checklist is complete</i>
              <FormComponents.ProperFunction isLoading={isLoading} />
              <FormComponents.WasDamageObserved isLoading={isLoading} />
              {wasDamageObserved && (
                <FormComponents.DamageObserved isLoading={isLoading} />
              )}
              <FormComponents.WereLeaksObserved isLoading={isLoading} />
            </Stack>
          </Box>
        </FormComponents.Form>
      </Box>
    </Container>
  );
};

export default PlaygroundClientOnly;
