import { CrewDocument } from "@models";

export enum CrewTypes {
  Base = "Base",
  Paving = "Paving",
  Tech = "Tech",
  Shop = "Shop",
  Patch = "Patch",
  Concrete = "Concrete",
}

export interface ICrewCreate {
  name: string;
  type: CrewTypes;
}

export interface ICrewSearchObject {
  score: number;
  crew: CrewDocument;
}
