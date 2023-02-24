import { registerEnumType } from "type-graphql";

export enum EquipmentUsageUnits {
  km = "kilometers",
  hours = "hours",
}

registerEnumType(EquipmentUsageUnits, {
  name: "EquipmentUsageUnits",
});
