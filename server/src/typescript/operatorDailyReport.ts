import { registerEnumType } from "type-graphql";

export interface IOperatorDailyReportCreate {
  equipmentUsage: {
    usage: number;
    unit: EquipmentUsageUnits;
  };
  startTime: Date;
  checklist: {
    walkaroundComplete: boolean;
    visualInspectionComplete: boolean;
    oilChecked: boolean;
    coolantChecked: boolean;
    fluidsChecked: boolean;
  };
  functionChecks: {
    backupAlarm: boolean;
    lights: boolean;
    fireExtinguisher: boolean;
    licensePlate: boolean;
  };
  malfunction: boolean;
  damageObserved: boolean;
  leaks: {
    type: string;
    location: string;
  }[];
  fluidsAdded: {
    type: string;
    amount: number;
  }[];
}

export enum EquipmentUsageUnits {
  km = "kilometers",
  hours = "hours",
}

registerEnumType(EquipmentUsageUnits, {
  name: "EquipmentUsageUnits",
});
