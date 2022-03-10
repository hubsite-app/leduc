export * from "./Crew";
export * from "./DailyReport";
export * from "./Employee";
export * from "./EmployeeWork";
export * from "./Jobsite";
export * from "./MaterialShipment";
export * from "./Production";
export * from "./ReportNote";
export * from "./Signup";
export * from "./User";
export * from "./Vehicle";
export * from "./VehicleWork";

import {
  getModelForClass,
  DocumentType,
  ReturnModelType,
} from "@typegoose/typegoose";

/**
 * ----- Crew -----
 */

import { CrewClass } from "./Crew/class";

export interface CrewDocument extends DocumentType<CrewClass> {}

export interface CrewModel extends ReturnModelType<typeof CrewClass> {}

export const Crew = getModelForClass(CrewClass, {
  schemaOptions: { collection: "crews" },
});

/**
 * ----- Employee -----
 */

import { EmployeeClass } from "./Employee/class";

export interface EmployeeDocument extends DocumentType<EmployeeClass> {}

export interface EmployeeModel extends ReturnModelType<typeof EmployeeClass> {}

export const Employee = getModelForClass(EmployeeClass, {
  schemaOptions: { collection: "employees" },
});

/**
 * ----- Daily Report -----
 */

import { DailyReportClass } from "./DailyReport/class";

export interface DailyReportDocument extends DocumentType<DailyReportClass> {}

export interface DailyReportModel
  extends ReturnModelType<typeof DailyReportClass> {}

export const DailyReport = getModelForClass(DailyReportClass, {
  schemaOptions: { collection: "dailyreports" },
});

/**
 * ----- Employee Work -----
 */

import { EmployeeWorkClass } from "./EmployeeWork/class";

export interface EmployeeWorkDocument extends DocumentType<EmployeeWorkClass> {}

export interface EmployeeWorkModel
  extends ReturnModelType<typeof EmployeeWorkClass> {}

export const EmployeeWork = getModelForClass(EmployeeWorkClass, {
  schemaOptions: { collection: "employeeworks" },
});

/**
 * ----- Jobsite -----
 */

import { JobsiteClass } from "./Jobsite/class";

export interface JobsiteDocument extends DocumentType<JobsiteClass> {}

export interface JobsiteModel extends ReturnModelType<typeof JobsiteClass> {}

export const Jobsite = getModelForClass(JobsiteClass, {
  schemaOptions: { collection: "jobsites" },
});

/**
 * ----- Material Shipment -----
 */

import { MaterialShipmentClass } from "./MaterialShipment/class";

export interface MaterialShipmentDocument
  extends DocumentType<MaterialShipmentClass> {}

export interface MaterialShipmentModel
  extends ReturnModelType<typeof MaterialShipmentClass> {}

export const MaterialShipment = getModelForClass(MaterialShipmentClass, {
  schemaOptions: { collection: "materialshipments" },
});

/**
 * ----- Production -----
 */

import { ProductionClass } from "./Production/class";

export interface ProductionDocument extends DocumentType<ProductionClass> {}

export interface ProductionModel
  extends ReturnModelType<typeof ProductionClass> {}

export const Production = getModelForClass(ProductionClass, {
  schemaOptions: { collection: "productions" },
});

/**
 * ----- Report Note -----
 */

import { ReportNoteClass } from "./ReportNote/class";

export interface ReportNoteDocument extends DocumentType<ReportNoteClass> {}

export interface ReportNoteModel
  extends ReturnModelType<typeof ReportNoteClass> {}

export const ReportNote = getModelForClass(ReportNoteClass, {
  schemaOptions: { collection: "reportnotes" },
});

/**
 * ----- Signup -----
 */

import { SignupClass } from "./Signup/class";

export interface SignupDocument extends DocumentType<SignupClass> {}

export interface SignupModel extends ReturnModelType<typeof SignupClass> {}

export const Signup = getModelForClass(SignupClass, {
  schemaOptions: { collection: "signups" },
});

/**
 * ----- User -----
 */

import { UserClass } from "./User/class";

export interface UserDocument extends DocumentType<UserClass> {}

export interface UserModel extends ReturnModelType<typeof UserClass> {}

export const User = getModelForClass(UserClass, {
  schemaOptions: { collection: "users" },
});

/**
 * ----- Vehicle -----
 */

import { VehicleClass } from "./Vehicle/class";

export interface VehicleDocument extends DocumentType<VehicleClass> {}

export interface VehicleModel extends ReturnModelType<typeof VehicleClass> {}

export const Vehicle = getModelForClass(VehicleClass, {
  schemaOptions: { collection: "vehicles" },
});

/**
 * ----- Vehicle Work -----
 */

import { VehicleWorkClass } from "./VehicleWork/class";

export interface VehicleWorkDocument extends DocumentType<VehicleWorkClass> {}

export interface VehicleWorkModel
  extends ReturnModelType<typeof VehicleWorkClass> {}

export const VehicleWork = getModelForClass(VehicleWorkClass, {
  schemaOptions: { collection: "vehicleworks" },
});
