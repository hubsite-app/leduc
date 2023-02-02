import React from "react";
import Container from "../../Common/Container";

enum ServiceStatus {
  ServiceRequired = "ServiceRequired",
  ServiceUnecessary = "ServiceUnecessary",
  ServicePotential = "ServicePotential",
}

enum Units {
  KM = "KM",
}

// Should this be a "survey", a state machine?
interface OperatorDailyReport {
  // employeeId: string // operator
  // vehicleId: string
  serviceRequired: ServiceStatus;
  odometer: {
    unit: Units;
    value: number;
  };
  walkAroundComplete: boolean;
  properFunction: boolean;
}

interface IssueTag {
  name: string;
  description: string;
}

interface MaintenanceIssue {
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

  /**
   * ----- Render -----
   */

  return <Container>client stuff</Container>;
};

export default PlaygroundClientOnly;
