import { CrewDocument } from "@models";
import { registerEnumType } from "type-graphql";

export enum CrewTypes {
  Base = "Base",
  Paving = "Paving",
  Tech = "Tech",
  Shop = "Shop",
  Patch = "Patch",
  Pour = "Pour",
  FormLineSetting = "Form/Line Setting",
  BasePrep = "Base Prep",
  FormTruck = "Form Truck",
  BreakoutCB = "Breakout / CB",
  Other = "Other",
}

registerEnumType(CrewTypes, {
  name: "CrewTypes",
});

export interface ICrewCreate {
  name: string;
  type: CrewTypes;
}

export interface ICrewUpdate {
  name: string;
}

export interface ICrewSearchObject {
  score: number;
  crew: CrewDocument;
}
