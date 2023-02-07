import { Box, Heading, Stack, Text } from "@chakra-ui/react";
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

const Section = ({ children }: { children: React.ReactNode }) => {
  return <Stack my={5}>{children}</Stack>;
};

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
      <Box>
        <Heading>Operator Daily Report Demo</Heading>
        <Text as="p" fontStyle="italic">
          A demo of the Operator Daily Report. Assume this is already assigned
          to a particular vehicle.
        </Text>
        <Text as="p" fontStyle="italic">
          This demo is to finalize what we want in the Daily Report and how we
          want it presented to employees. Design will be cleaned up in final
          version.
        </Text>
        <FormComponents.Form submitHandler={() => {}}>
          <FormComponents.Odometer isLoading={isLoading} />
          <FormComponents.StartTime isLoading={isLoading} />
          <Box>
            <Section>
              <Heading size="md">General</Heading>
              <FormComponents.Checklist.WalkAround isLoading={isLoading} />
              <FormComponents.Checklist.VisualInspection
                isLoading={isLoading}
              />
              <FormComponents.ProperFunction isLoading={isLoading} />
              <FormComponents.WasDamageObserved isLoading={isLoading} />
              {wasDamageObserved && (
                <FormComponents.DamageObserved isLoading={isLoading} />
              )}
              <FormComponents.FunctionChecks.BackupAlarm
                isLoading={isLoading}
              />
              <FormComponents.FunctionChecks.Lights isLoading={isLoading} />
              <FormComponents.FunctionChecks.LicensePlate
                isLoading={isLoading}
              />
              <FormComponents.FunctionChecks.FireExtinguisher
                isLoading={isLoading}
              />
            </Section>
            <Section>
              <Heading size="md">Oil & Coolants</Heading>
              <FormComponents.Checklist.Oil isLoading={isLoading} />
              <FormComponents.OilAdded isLoading={isLoading} />
              <FormComponents.Checklist.Coolant isLoading={isLoading} />
              <FormComponents.CoolantAdded isLoading={isLoading} />
            </Section>
            <Section>
              <Heading size="md">Fluids</Heading>
              <FormComponents.Checklist.Fluids isLoading={isLoading} />
              <FormComponents.LeaksFound isLoading={isLoading} />
              <FormComponents.FluidsAdded isLoading={isLoading} />
            </Section>
          </Box>
        </FormComponents.Form>
      </Box>
    </Container>
  );
};

export default PlaygroundClientOnly;
