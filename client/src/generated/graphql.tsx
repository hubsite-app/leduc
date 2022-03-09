import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
const defaultOptions = {} as const;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  /** The javascript `Date` as string. Type represents date and time as the ISO Date string. */
  DateTime: any;
};

export type CrewClass = {
  __typename?: 'CrewClass';
  _id: Scalars['ID'];
  employees: Array<EmployeeClass>;
  jobsites: Array<JobsiteClass>;
  name: Scalars['String'];
  schemaVersion: Scalars['Float'];
  type: Scalars['String'];
  vehicles: Array<VehicleClass>;
};

export type DailyReportClass = {
  __typename?: 'DailyReportClass';
  _id: Scalars['ID'];
  approved: Scalars['Boolean'];
  crew: CrewClass;
  date: Scalars['DateTime'];
  employeeWork: Array<EmployeeWorkClass>;
  jobsite: JobsiteClass;
  materialShipment: Array<MaterialShipmentClass>;
  materialShipments: Array<MaterialShipmentClass>;
  production: Array<ProductionClass>;
  productions: Array<ProductionClass>;
  reportNote?: Maybe<ReportNoteClass>;
  schemaVersion: Scalars['Float'];
  vehicleWork: Array<VehicleWorkClass>;
};

export type DailyReportNoteUpdateData = {
  note: Scalars['String'];
};

export type DailyReportUpdateData = {
  date: Scalars['DateTime'];
};

export type EmployeeClass = {
  __typename?: 'EmployeeClass';
  _id: Scalars['ID'];
  crews: Array<CrewClass>;
  jobTitle?: Maybe<Scalars['String']>;
  name: Scalars['String'];
  schemaVersion: Scalars['Float'];
  user: UserClass;
};

export type EmployeeCreateData = {
  jobTitle: Scalars['String'];
  name: Scalars['String'];
};

export type EmployeeWorkClass = {
  __typename?: 'EmployeeWorkClass';
  _id: Scalars['ID'];
  dailyReport: DailyReportClass;
  employee: EmployeeClass;
  endTime: Scalars['DateTime'];
  jobTitle: Scalars['String'];
  schemaVersion: Scalars['Float'];
  startTime: Scalars['DateTime'];
};

export type EmployeeWorkCreateData = {
  employees: Array<Scalars['String']>;
  jobs: Array<EmployeeWorkJobData>;
};

export type EmployeeWorkJobData = {
  endTime?: InputMaybe<Scalars['DateTime']>;
  jobTitle: Scalars['String'];
  startTime: Scalars['DateTime'];
};

export type EmployeeWorkUpdateData = {
  endTime: Scalars['DateTime'];
  jobTitle: Scalars['String'];
  startTime: Scalars['DateTime'];
};

export type JobsiteClass = {
  __typename?: 'JobsiteClass';
  _id: Scalars['ID'];
  active: Scalars['Boolean'];
  crews: Array<CrewClass>;
  dailyReports: Array<DailyReportClass>;
  description?: Maybe<Scalars['String']>;
  jobcode?: Maybe<Scalars['String']>;
  location_url?: Maybe<Scalars['String']>;
  name: Scalars['String'];
  schemaVersion: Scalars['Float'];
};

export type ListOptionData = {
  offset?: InputMaybe<Scalars['Float']>;
  pageLimit?: InputMaybe<Scalars['Float']>;
};

export type LoginData = {
  email: Scalars['String'];
  password: Scalars['String'];
  rememberMe: Scalars['Boolean'];
};

export type MaterialShipmentClass = {
  __typename?: 'MaterialShipmentClass';
  _id: Scalars['ID'];
  dailyReport: DailyReportClass;
  endTime?: Maybe<Scalars['DateTime']>;
  quantity: Scalars['Float'];
  schemaVersion: Scalars['Float'];
  shipmentType: Scalars['String'];
  startTime?: Maybe<Scalars['DateTime']>;
  supplier: Scalars['String'];
  unit: Scalars['String'];
  vehicle?: Maybe<VehicleClass>;
  vehicleObject?: Maybe<VehicleObjectClass>;
};

export type MaterialShipmentCreateData = {
  endTime?: InputMaybe<Scalars['DateTime']>;
  quantity: Scalars['Float'];
  shipmentType: Scalars['String'];
  startTime?: InputMaybe<Scalars['DateTime']>;
  supplier: Scalars['String'];
  unit: Scalars['String'];
  vehicleObject: MaterialShipmentVehicleObjectData;
};

export type MaterialShipmentUpdateData = {
  endTime?: InputMaybe<Scalars['DateTime']>;
  quantity: Scalars['Float'];
  shipmentType: Scalars['String'];
  startTime?: InputMaybe<Scalars['DateTime']>;
  supplier: Scalars['String'];
  unit: Scalars['String'];
};

export type MaterialShipmentVehicleObjectData = {
  source: Scalars['String'];
  vehicleCode: Scalars['String'];
  vehicleType: Scalars['String'];
};

export type Mutation = {
  __typename?: 'Mutation';
  crewAddEmployee: CrewClass;
  crewAddVehicle: CrewClass;
  crewRemoveEmployee: CrewClass;
  crewRemoveVehicle: CrewClass;
  dailyReportApprovalUpdate: DailyReportClass;
  dailyReportNoteUpdate: DailyReportClass;
  dailyReportUpdate: DailyReportClass;
  employeeCreate: EmployeeClass;
  employeeWorkCreate: Array<EmployeeWorkClass>;
  employeeWorkDelete: Scalars['String'];
  employeeWorkUpdate: EmployeeWorkClass;
  login: Scalars['String'];
  materialShipmentCreate: MaterialShipmentClass;
  materialShipmentDelete: Scalars['String'];
  materialShipmentUpdate: MaterialShipmentClass;
  productionCreate: ProductionClass;
  productionDelete: Scalars['String'];
  productionUpdate: ProductionClass;
  vehicleCreate: VehicleClass;
  vehicleWorkCreate: Array<VehicleWorkClass>;
  vehicleWorkDelete: Scalars['String'];
  vehicleWorkUpdate: VehicleWorkClass;
};


export type MutationCrewAddEmployeeArgs = {
  crewId: Scalars['String'];
  employeeId: Scalars['String'];
};


export type MutationCrewAddVehicleArgs = {
  crewId: Scalars['String'];
  vehicleId: Scalars['String'];
};


export type MutationCrewRemoveEmployeeArgs = {
  crewId: Scalars['String'];
  employeeId: Scalars['String'];
};


export type MutationCrewRemoveVehicleArgs = {
  crewId: Scalars['String'];
  vehicleId: Scalars['String'];
};


export type MutationDailyReportApprovalUpdateArgs = {
  approved: Scalars['Boolean'];
  id: Scalars['String'];
};


export type MutationDailyReportNoteUpdateArgs = {
  data: DailyReportNoteUpdateData;
  id: Scalars['String'];
};


export type MutationDailyReportUpdateArgs = {
  data: DailyReportUpdateData;
  id: Scalars['String'];
};


export type MutationEmployeeCreateArgs = {
  crewId?: InputMaybe<Scalars['String']>;
  data: EmployeeCreateData;
};


export type MutationEmployeeWorkCreateArgs = {
  dailyReportId: Scalars['String'];
  data: Array<EmployeeWorkCreateData>;
};


export type MutationEmployeeWorkDeleteArgs = {
  id: Scalars['String'];
};


export type MutationEmployeeWorkUpdateArgs = {
  data: EmployeeWorkUpdateData;
  id: Scalars['String'];
};


export type MutationLoginArgs = {
  data: LoginData;
};


export type MutationMaterialShipmentCreateArgs = {
  dailyReportId: Scalars['String'];
  data: MaterialShipmentCreateData;
};


export type MutationMaterialShipmentDeleteArgs = {
  id: Scalars['String'];
};


export type MutationMaterialShipmentUpdateArgs = {
  data: MaterialShipmentUpdateData;
  id: Scalars['String'];
};


export type MutationProductionCreateArgs = {
  dailyReportId: Scalars['String'];
  data: ProductionCreateData;
};


export type MutationProductionDeleteArgs = {
  id: Scalars['String'];
};


export type MutationProductionUpdateArgs = {
  data: ProductionUpdateData;
  id: Scalars['String'];
};


export type MutationVehicleCreateArgs = {
  crewId?: InputMaybe<Scalars['String']>;
  data: VehicleCreateData;
};


export type MutationVehicleWorkCreateArgs = {
  dailyReportId: Scalars['String'];
  data: Array<VehicleWorkCreateData>;
};


export type MutationVehicleWorkDeleteArgs = {
  id: Scalars['String'];
};


export type MutationVehicleWorkUpdateArgs = {
  data: VehicleWorkUpdateData;
  id: Scalars['String'];
};

export type ProductionClass = {
  __typename?: 'ProductionClass';
  _id: Scalars['ID'];
  dailyReport: DailyReportClass;
  description: Scalars['String'];
  endTime: Scalars['DateTime'];
  jobTitle: Scalars['String'];
  quantity: Scalars['Float'];
  schemaVersion: Scalars['Float'];
  startTime: Scalars['DateTime'];
  unit: Scalars['String'];
};

export type ProductionCreateData = {
  description?: InputMaybe<Scalars['String']>;
  endTime: Scalars['DateTime'];
  jobTitle: Scalars['String'];
  quantity: Scalars['Float'];
  startTime: Scalars['DateTime'];
  unit: Scalars['String'];
};

export type ProductionUpdateData = {
  description?: InputMaybe<Scalars['String']>;
  endTime: Scalars['DateTime'];
  jobTitle: Scalars['String'];
  quantity: Scalars['Float'];
  startTime: Scalars['DateTime'];
  unit: Scalars['String'];
};

export type Query = {
  __typename?: 'Query';
  crew: CrewClass;
  crewList: Array<CrewClass>;
  currentUser: UserClass;
  dailyReport: DailyReportClass;
  dailyReports: Array<DailyReportClass>;
  employee: EmployeeClass;
  employeeSearch: Array<EmployeeClass>;
  jobsite: JobsiteClass;
  user: UserClass;
  vehicle: VehicleClass;
  vehicleSearch: Array<VehicleClass>;
};


export type QueryCrewArgs = {
  id: Scalars['String'];
};


export type QueryDailyReportArgs = {
  id: Scalars['String'];
};


export type QueryDailyReportsArgs = {
  options?: InputMaybe<ListOptionData>;
};


export type QueryEmployeeArgs = {
  id: Scalars['String'];
};


export type QueryEmployeeSearchArgs = {
  options?: InputMaybe<SearchOptions>;
  searchString: Scalars['String'];
};


export type QueryJobsiteArgs = {
  id: Scalars['String'];
};


export type QueryUserArgs = {
  id: Scalars['String'];
};


export type QueryVehicleArgs = {
  id: Scalars['String'];
};


export type QueryVehicleSearchArgs = {
  options?: InputMaybe<SearchOptions>;
  searchString: Scalars['String'];
};

export type ReportNoteClass = {
  __typename?: 'ReportNoteClass';
  _id: Scalars['ID'];
  dailyReport: DailyReportClass;
  note: Scalars['String'];
  schemaVersion: Scalars['Float'];
};

export type SearchOptions = {
  blacklistedIds?: InputMaybe<Array<Scalars['String']>>;
  limit?: InputMaybe<Scalars['Float']>;
};

export type UserClass = {
  __typename?: 'UserClass';
  _id: Scalars['ID'];
  admin: Scalars['Boolean'];
  email: Scalars['String'];
  employee: EmployeeClass;
  name: Scalars['String'];
  password: Scalars['String'];
  projectManager: Scalars['Boolean'];
  resetPasswordExpires: Scalars['DateTime'];
  resetPasswordToken: Scalars['String'];
  schemaVersion: Scalars['Float'];
};

export type VehicleClass = {
  __typename?: 'VehicleClass';
  _id: Scalars['ID'];
  crews: Array<CrewClass>;
  name: Scalars['String'];
  rental: Scalars['Boolean'];
  schemaVersion: Scalars['Float'];
  sourceCompany: Scalars['String'];
  vehicleCode: Scalars['String'];
  vehicleType: Scalars['String'];
};

export type VehicleCreateData = {
  name: Scalars['String'];
  rental?: InputMaybe<Scalars['Boolean']>;
  sourceCompany?: InputMaybe<Scalars['String']>;
  vehicleCode: Scalars['String'];
  vehicleType: Scalars['String'];
};

export type VehicleObjectClass = {
  __typename?: 'VehicleObjectClass';
  source?: Maybe<Scalars['String']>;
  vehicleCode?: Maybe<Scalars['String']>;
  vehicleType?: Maybe<Scalars['String']>;
};

export type VehicleWorkClass = {
  __typename?: 'VehicleWorkClass';
  _id: Scalars['ID'];
  dailyReport: DailyReportClass;
  endTime?: Maybe<Scalars['DateTime']>;
  hours: Scalars['Float'];
  jobTitle: Scalars['String'];
  schemaVersion: Scalars['Float'];
  startTime?: Maybe<Scalars['DateTime']>;
  vehicle: VehicleClass;
};

export type VehicleWorkCreateData = {
  jobs: Array<VehicleWorkJobData>;
  vehicles: Array<Scalars['String']>;
};

export type VehicleWorkJobData = {
  hours: Scalars['Float'];
  jobTitle: Scalars['String'];
};

export type VehicleWorkUpdateData = {
  hours: Scalars['Float'];
  jobTitle: Scalars['String'];
};

export type CrewFullSnippetFragment = { __typename?: 'CrewClass', _id: string, name: string, type: string, employees: Array<{ __typename?: 'EmployeeClass', _id: string, name: string, jobTitle?: string | null }>, vehicles: Array<{ __typename?: 'VehicleClass', _id: string, name: string, vehicleCode: string, vehicleType: string }> };

export type CrewSsrSnippetFragment = { __typename?: 'CrewClass', _id: string, name: string, type: string };

export type DailyReportCardSnippetFragment = { __typename?: 'DailyReportClass', _id: string, date: any, approved: boolean, jobsite: { __typename?: 'JobsiteClass', _id: string, name: string }, crew: { __typename?: 'CrewClass', _id: string, name: string } };

export type DailyReportFullSnippetFragment = { __typename?: 'DailyReportClass', _id: string, date: any, approved: boolean, crew: { __typename?: 'CrewClass', _id: string, name: string, type: string, employees: Array<{ __typename?: 'EmployeeClass', _id: string, name: string, jobTitle?: string | null }>, vehicles: Array<{ __typename?: 'VehicleClass', _id: string, name: string, vehicleCode: string, vehicleType: string }> }, employeeWork: Array<{ __typename?: 'EmployeeWorkClass', _id: string, jobTitle: string, startTime: any, endTime: any, employee: { __typename?: 'EmployeeClass', _id: string, name: string } }>, vehicleWork: Array<{ __typename?: 'VehicleWorkClass', _id: string, hours: number, jobTitle: string, vehicle: { __typename?: 'VehicleClass', _id: string, name: string } }>, productions: Array<{ __typename?: 'ProductionClass', _id: string, jobTitle: string, quantity: number, unit: string, startTime: any, endTime: any, description: string }>, materialShipments: Array<{ __typename?: 'MaterialShipmentClass', _id: string, shipmentType: string, supplier: string, quantity: number, unit: string, startTime?: any | null, endTime?: any | null, vehicleObject?: { __typename?: 'VehicleObjectClass', source?: string | null, vehicleType?: string | null, vehicleCode?: string | null } | null }>, reportNote?: { __typename?: 'ReportNoteClass', note: string } | null };

export type DailyReportPdfSnippetFragment = { __typename?: 'DailyReportClass', date: any, crew: { __typename?: 'CrewClass', name: string }, jobsite: { __typename?: 'JobsiteClass', name: string, jobcode?: string | null }, employeeWork: Array<{ __typename?: 'EmployeeWorkClass', _id: string, jobTitle: string, startTime: any, endTime: any, employee: { __typename?: 'EmployeeClass', _id: string, name: string } }>, vehicleWork: Array<{ __typename?: 'VehicleWorkClass', _id: string, hours: number, jobTitle: string, vehicle: { __typename?: 'VehicleClass', _id: string, name: string } }>, productions: Array<{ __typename?: 'ProductionClass', _id: string, jobTitle: string, quantity: number, unit: string, startTime: any, endTime: any, description: string }>, materialShipments: Array<{ __typename?: 'MaterialShipmentClass', _id: string, shipmentType: string, supplier: string, quantity: number, unit: string, startTime?: any | null, endTime?: any | null, vehicleObject?: { __typename?: 'VehicleObjectClass', source?: string | null, vehicleType?: string | null, vehicleCode?: string | null } | null }>, reportNote?: { __typename?: 'ReportNoteClass', note: string } | null };

export type DailyReportSsrSnippetFragment = { __typename?: 'DailyReportClass', _id: string, jobsite: { __typename?: 'JobsiteClass', _id: string, name: string, jobcode?: string | null } };

export type EmployeeWorkCardSnippetFragment = { __typename?: 'EmployeeWorkClass', _id: string, jobTitle: string, startTime: any, endTime: any, employee: { __typename?: 'EmployeeClass', _id: string, name: string } };

export type EmployeeCardSnippetFragment = { __typename?: 'EmployeeClass', _id: string, name: string, jobTitle?: string | null };

export type MaterialShipmentCardSnippetFragment = { __typename?: 'MaterialShipmentClass', _id: string, shipmentType: string, supplier: string, quantity: number, unit: string, startTime?: any | null, endTime?: any | null, vehicleObject?: { __typename?: 'VehicleObjectClass', source?: string | null, vehicleType?: string | null, vehicleCode?: string | null } | null };

export type ProductionCardSnippetFragment = { __typename?: 'ProductionClass', _id: string, jobTitle: string, quantity: number, unit: string, startTime: any, endTime: any, description: string };

export type ReportNoteFullSnippetFragment = { __typename?: 'ReportNoteClass', note: string };

export type FullUserSnippetFragment = { __typename?: 'UserClass', _id: string, name: string, email: string, admin: boolean, projectManager: boolean, employee: { __typename?: 'EmployeeClass', name: string, jobTitle?: string | null } };

export type VehicleWorkCardSnippetFragment = { __typename?: 'VehicleWorkClass', _id: string, hours: number, jobTitle: string, vehicle: { __typename?: 'VehicleClass', _id: string, name: string } };

export type VehicleCardSnippetFragment = { __typename?: 'VehicleClass', _id: string, name: string, vehicleCode: string, vehicleType: string };

export type CrewAddEmployeeMutationVariables = Exact<{
  crewId: Scalars['String'];
  employeeId: Scalars['String'];
}>;


export type CrewAddEmployeeMutation = { __typename?: 'Mutation', crewAddEmployee: { __typename?: 'CrewClass', _id: string, name: string, type: string, employees: Array<{ __typename?: 'EmployeeClass', _id: string, name: string, jobTitle?: string | null }>, vehicles: Array<{ __typename?: 'VehicleClass', _id: string, name: string, vehicleCode: string, vehicleType: string }> } };

export type CrewAddVehicleMutationVariables = Exact<{
  crewId: Scalars['String'];
  vehicleId: Scalars['String'];
}>;


export type CrewAddVehicleMutation = { __typename?: 'Mutation', crewAddVehicle: { __typename?: 'CrewClass', _id: string, name: string, type: string, employees: Array<{ __typename?: 'EmployeeClass', _id: string, name: string, jobTitle?: string | null }>, vehicles: Array<{ __typename?: 'VehicleClass', _id: string, name: string, vehicleCode: string, vehicleType: string }> } };

export type CrewRemoveEmployeeMutationVariables = Exact<{
  crewId: Scalars['String'];
  employeeId: Scalars['String'];
}>;


export type CrewRemoveEmployeeMutation = { __typename?: 'Mutation', crewRemoveEmployee: { __typename?: 'CrewClass', _id: string, name: string, type: string, employees: Array<{ __typename?: 'EmployeeClass', _id: string, name: string, jobTitle?: string | null }>, vehicles: Array<{ __typename?: 'VehicleClass', _id: string, name: string, vehicleCode: string, vehicleType: string }> } };

export type CrewRemoveVehicleMutationVariables = Exact<{
  crewId: Scalars['String'];
  vehicleId: Scalars['String'];
}>;


export type CrewRemoveVehicleMutation = { __typename?: 'Mutation', crewRemoveVehicle: { __typename?: 'CrewClass', _id: string, name: string, type: string, employees: Array<{ __typename?: 'EmployeeClass', _id: string, name: string, jobTitle?: string | null }>, vehicles: Array<{ __typename?: 'VehicleClass', _id: string, name: string, vehicleCode: string, vehicleType: string }> } };

export type DailyReportApprovalUpdateMutationVariables = Exact<{
  id: Scalars['String'];
  approved: Scalars['Boolean'];
}>;


export type DailyReportApprovalUpdateMutation = { __typename?: 'Mutation', dailyReportApprovalUpdate: { __typename?: 'DailyReportClass', _id: string, date: any, approved: boolean, crew: { __typename?: 'CrewClass', _id: string, name: string, type: string, employees: Array<{ __typename?: 'EmployeeClass', _id: string, name: string, jobTitle?: string | null }>, vehicles: Array<{ __typename?: 'VehicleClass', _id: string, name: string, vehicleCode: string, vehicleType: string }> }, employeeWork: Array<{ __typename?: 'EmployeeWorkClass', _id: string, jobTitle: string, startTime: any, endTime: any, employee: { __typename?: 'EmployeeClass', _id: string, name: string } }>, vehicleWork: Array<{ __typename?: 'VehicleWorkClass', _id: string, hours: number, jobTitle: string, vehicle: { __typename?: 'VehicleClass', _id: string, name: string } }>, productions: Array<{ __typename?: 'ProductionClass', _id: string, jobTitle: string, quantity: number, unit: string, startTime: any, endTime: any, description: string }>, materialShipments: Array<{ __typename?: 'MaterialShipmentClass', _id: string, shipmentType: string, supplier: string, quantity: number, unit: string, startTime?: any | null, endTime?: any | null, vehicleObject?: { __typename?: 'VehicleObjectClass', source?: string | null, vehicleType?: string | null, vehicleCode?: string | null } | null }>, reportNote?: { __typename?: 'ReportNoteClass', note: string } | null } };

export type DailyReportNoteUpdateMutationVariables = Exact<{
  id: Scalars['String'];
  data: DailyReportNoteUpdateData;
}>;


export type DailyReportNoteUpdateMutation = { __typename?: 'Mutation', dailyReportNoteUpdate: { __typename?: 'DailyReportClass', _id: string, date: any, approved: boolean, crew: { __typename?: 'CrewClass', _id: string, name: string, type: string, employees: Array<{ __typename?: 'EmployeeClass', _id: string, name: string, jobTitle?: string | null }>, vehicles: Array<{ __typename?: 'VehicleClass', _id: string, name: string, vehicleCode: string, vehicleType: string }> }, employeeWork: Array<{ __typename?: 'EmployeeWorkClass', _id: string, jobTitle: string, startTime: any, endTime: any, employee: { __typename?: 'EmployeeClass', _id: string, name: string } }>, vehicleWork: Array<{ __typename?: 'VehicleWorkClass', _id: string, hours: number, jobTitle: string, vehicle: { __typename?: 'VehicleClass', _id: string, name: string } }>, productions: Array<{ __typename?: 'ProductionClass', _id: string, jobTitle: string, quantity: number, unit: string, startTime: any, endTime: any, description: string }>, materialShipments: Array<{ __typename?: 'MaterialShipmentClass', _id: string, shipmentType: string, supplier: string, quantity: number, unit: string, startTime?: any | null, endTime?: any | null, vehicleObject?: { __typename?: 'VehicleObjectClass', source?: string | null, vehicleType?: string | null, vehicleCode?: string | null } | null }>, reportNote?: { __typename?: 'ReportNoteClass', note: string } | null } };

export type DailyReportUpdateMutationVariables = Exact<{
  id: Scalars['String'];
  data: DailyReportUpdateData;
}>;


export type DailyReportUpdateMutation = { __typename?: 'Mutation', dailyReportUpdate: { __typename?: 'DailyReportClass', _id: string, date: any, approved: boolean, crew: { __typename?: 'CrewClass', _id: string, name: string, type: string, employees: Array<{ __typename?: 'EmployeeClass', _id: string, name: string, jobTitle?: string | null }>, vehicles: Array<{ __typename?: 'VehicleClass', _id: string, name: string, vehicleCode: string, vehicleType: string }> }, employeeWork: Array<{ __typename?: 'EmployeeWorkClass', _id: string, jobTitle: string, startTime: any, endTime: any, employee: { __typename?: 'EmployeeClass', _id: string, name: string } }>, vehicleWork: Array<{ __typename?: 'VehicleWorkClass', _id: string, hours: number, jobTitle: string, vehicle: { __typename?: 'VehicleClass', _id: string, name: string } }>, productions: Array<{ __typename?: 'ProductionClass', _id: string, jobTitle: string, quantity: number, unit: string, startTime: any, endTime: any, description: string }>, materialShipments: Array<{ __typename?: 'MaterialShipmentClass', _id: string, shipmentType: string, supplier: string, quantity: number, unit: string, startTime?: any | null, endTime?: any | null, vehicleObject?: { __typename?: 'VehicleObjectClass', source?: string | null, vehicleType?: string | null, vehicleCode?: string | null } | null }>, reportNote?: { __typename?: 'ReportNoteClass', note: string } | null } };

export type EmployeeCreateMutationVariables = Exact<{
  data: EmployeeCreateData;
  crewId?: InputMaybe<Scalars['String']>;
}>;


export type EmployeeCreateMutation = { __typename?: 'Mutation', employeeCreate: { __typename?: 'EmployeeClass', _id: string, name: string, jobTitle?: string | null } };

export type EmployeeWorkCreateMutationVariables = Exact<{
  dailyReportId: Scalars['String'];
  data: Array<EmployeeWorkCreateData> | EmployeeWorkCreateData;
}>;


export type EmployeeWorkCreateMutation = { __typename?: 'Mutation', employeeWorkCreate: Array<{ __typename?: 'EmployeeWorkClass', _id: string, jobTitle: string, startTime: any, endTime: any, employee: { __typename?: 'EmployeeClass', _id: string, name: string } }> };

export type EmployeeWorkDeleteMutationVariables = Exact<{
  id: Scalars['String'];
}>;


export type EmployeeWorkDeleteMutation = { __typename?: 'Mutation', employeeWorkDelete: string };

export type EmployeeWorkUpdateMutationVariables = Exact<{
  id: Scalars['String'];
  data: EmployeeWorkUpdateData;
}>;


export type EmployeeWorkUpdateMutation = { __typename?: 'Mutation', employeeWorkUpdate: { __typename?: 'EmployeeWorkClass', _id: string, jobTitle: string, startTime: any, endTime: any, employee: { __typename?: 'EmployeeClass', _id: string, name: string } } };

export type LoginMutationVariables = Exact<{
  data: LoginData;
}>;


export type LoginMutation = { __typename?: 'Mutation', login: string };

export type MaterialShipmentCreateMutationVariables = Exact<{
  dailyReportId: Scalars['String'];
  data: MaterialShipmentCreateData;
}>;


export type MaterialShipmentCreateMutation = { __typename?: 'Mutation', materialShipmentCreate: { __typename?: 'MaterialShipmentClass', _id: string, shipmentType: string, supplier: string, quantity: number, unit: string, startTime?: any | null, endTime?: any | null, vehicleObject?: { __typename?: 'VehicleObjectClass', source?: string | null, vehicleType?: string | null, vehicleCode?: string | null } | null } };

export type MaterialShipmentDeleteMutationVariables = Exact<{
  id: Scalars['String'];
}>;


export type MaterialShipmentDeleteMutation = { __typename?: 'Mutation', materialShipmentDelete: string };

export type MaterialShipmentUpdateMutationVariables = Exact<{
  id: Scalars['String'];
  data: MaterialShipmentUpdateData;
}>;


export type MaterialShipmentUpdateMutation = { __typename?: 'Mutation', materialShipmentUpdate: { __typename?: 'MaterialShipmentClass', _id: string, shipmentType: string, supplier: string, quantity: number, unit: string, startTime?: any | null, endTime?: any | null, vehicleObject?: { __typename?: 'VehicleObjectClass', source?: string | null, vehicleType?: string | null, vehicleCode?: string | null } | null } };

export type ProductionCreateMutationVariables = Exact<{
  dailyReportId: Scalars['String'];
  data: ProductionCreateData;
}>;


export type ProductionCreateMutation = { __typename?: 'Mutation', productionCreate: { __typename?: 'ProductionClass', _id: string, jobTitle: string, quantity: number, unit: string, startTime: any, endTime: any, description: string } };

export type ProductionDeleteMutationVariables = Exact<{
  id: Scalars['String'];
}>;


export type ProductionDeleteMutation = { __typename?: 'Mutation', productionDelete: string };

export type ProductionUpdateMutationVariables = Exact<{
  id: Scalars['String'];
  data: ProductionUpdateData;
}>;


export type ProductionUpdateMutation = { __typename?: 'Mutation', productionUpdate: { __typename?: 'ProductionClass', _id: string, jobTitle: string, quantity: number, unit: string, startTime: any, endTime: any, description: string } };

export type VehicleCreateMutationVariables = Exact<{
  data: VehicleCreateData;
  crewId?: InputMaybe<Scalars['String']>;
}>;


export type VehicleCreateMutation = { __typename?: 'Mutation', vehicleCreate: { __typename?: 'VehicleClass', _id: string, name: string, vehicleCode: string, vehicleType: string } };

export type VehicleWorkCreateMutationVariables = Exact<{
  dailyReportId: Scalars['String'];
  data: Array<VehicleWorkCreateData> | VehicleWorkCreateData;
}>;


export type VehicleWorkCreateMutation = { __typename?: 'Mutation', vehicleWorkCreate: Array<{ __typename?: 'VehicleWorkClass', _id: string, hours: number, jobTitle: string, vehicle: { __typename?: 'VehicleClass', _id: string, name: string } }> };

export type VehicleWorkDeleteMutationVariables = Exact<{
  id: Scalars['String'];
}>;


export type VehicleWorkDeleteMutation = { __typename?: 'Mutation', vehicleWorkDelete: string };

export type VehicleWorkUpdateMutationVariables = Exact<{
  id: Scalars['String'];
  data: VehicleWorkUpdateData;
}>;


export type VehicleWorkUpdateMutation = { __typename?: 'Mutation', vehicleWorkUpdate: { __typename?: 'VehicleWorkClass', _id: string, hours: number, jobTitle: string, vehicle: { __typename?: 'VehicleClass', _id: string, name: string } } };

export type CrewFullQueryVariables = Exact<{
  id: Scalars['String'];
}>;


export type CrewFullQuery = { __typename?: 'Query', crew: { __typename?: 'CrewClass', _id: string, name: string, type: string, employees: Array<{ __typename?: 'EmployeeClass', _id: string, name: string, jobTitle?: string | null }>, vehicles: Array<{ __typename?: 'VehicleClass', _id: string, name: string, vehicleCode: string, vehicleType: string }> } };

export type CrewSsrQueryVariables = Exact<{
  id: Scalars['String'];
}>;


export type CrewSsrQuery = { __typename?: 'Query', crew: { __typename?: 'CrewClass', _id: string, name: string, type: string } };

export type CurrentUserQueryVariables = Exact<{ [key: string]: never; }>;


export type CurrentUserQuery = { __typename?: 'Query', currentUser: { __typename?: 'UserClass', _id: string, name: string, email: string, admin: boolean, projectManager: boolean, employee: { __typename?: 'EmployeeClass', name: string, jobTitle?: string | null } } };

export type DailyReportFullQueryVariables = Exact<{
  id: Scalars['String'];
}>;


export type DailyReportFullQuery = { __typename?: 'Query', dailyReport: { __typename?: 'DailyReportClass', _id: string, date: any, approved: boolean, crew: { __typename?: 'CrewClass', _id: string, name: string, type: string, employees: Array<{ __typename?: 'EmployeeClass', _id: string, name: string, jobTitle?: string | null }>, vehicles: Array<{ __typename?: 'VehicleClass', _id: string, name: string, vehicleCode: string, vehicleType: string }> }, employeeWork: Array<{ __typename?: 'EmployeeWorkClass', _id: string, jobTitle: string, startTime: any, endTime: any, employee: { __typename?: 'EmployeeClass', _id: string, name: string } }>, vehicleWork: Array<{ __typename?: 'VehicleWorkClass', _id: string, hours: number, jobTitle: string, vehicle: { __typename?: 'VehicleClass', _id: string, name: string } }>, productions: Array<{ __typename?: 'ProductionClass', _id: string, jobTitle: string, quantity: number, unit: string, startTime: any, endTime: any, description: string }>, materialShipments: Array<{ __typename?: 'MaterialShipmentClass', _id: string, shipmentType: string, supplier: string, quantity: number, unit: string, startTime?: any | null, endTime?: any | null, vehicleObject?: { __typename?: 'VehicleObjectClass', source?: string | null, vehicleType?: string | null, vehicleCode?: string | null } | null }>, reportNote?: { __typename?: 'ReportNoteClass', note: string } | null } };

export type DailyReportPdfQueryVariables = Exact<{
  id: Scalars['String'];
}>;


export type DailyReportPdfQuery = { __typename?: 'Query', dailyReport: { __typename?: 'DailyReportClass', date: any, crew: { __typename?: 'CrewClass', name: string }, jobsite: { __typename?: 'JobsiteClass', name: string, jobcode?: string | null }, employeeWork: Array<{ __typename?: 'EmployeeWorkClass', _id: string, jobTitle: string, startTime: any, endTime: any, employee: { __typename?: 'EmployeeClass', _id: string, name: string } }>, vehicleWork: Array<{ __typename?: 'VehicleWorkClass', _id: string, hours: number, jobTitle: string, vehicle: { __typename?: 'VehicleClass', _id: string, name: string } }>, productions: Array<{ __typename?: 'ProductionClass', _id: string, jobTitle: string, quantity: number, unit: string, startTime: any, endTime: any, description: string }>, materialShipments: Array<{ __typename?: 'MaterialShipmentClass', _id: string, shipmentType: string, supplier: string, quantity: number, unit: string, startTime?: any | null, endTime?: any | null, vehicleObject?: { __typename?: 'VehicleObjectClass', source?: string | null, vehicleType?: string | null, vehicleCode?: string | null } | null }>, reportNote?: { __typename?: 'ReportNoteClass', note: string } | null } };

export type DailyReportSsrQueryVariables = Exact<{
  id: Scalars['String'];
}>;


export type DailyReportSsrQuery = { __typename?: 'Query', dailyReport: { __typename?: 'DailyReportClass', _id: string, jobsite: { __typename?: 'JobsiteClass', _id: string, name: string, jobcode?: string | null } } };

export type DailyReportsQueryVariables = Exact<{
  options?: InputMaybe<ListOptionData>;
}>;


export type DailyReportsQuery = { __typename?: 'Query', dailyReports: Array<{ __typename?: 'DailyReportClass', _id: string, date: any, approved: boolean, jobsite: { __typename?: 'JobsiteClass', _id: string, name: string }, crew: { __typename?: 'CrewClass', _id: string, name: string } }> };

export type EmployeeSearchQueryVariables = Exact<{
  searchString: Scalars['String'];
  options?: InputMaybe<SearchOptions>;
}>;


export type EmployeeSearchQuery = { __typename?: 'Query', employeeSearch: Array<{ __typename?: 'EmployeeClass', _id: string, name: string, jobTitle?: string | null }> };

export type VehicleSearchQueryVariables = Exact<{
  searchString: Scalars['String'];
  options?: InputMaybe<SearchOptions>;
}>;


export type VehicleSearchQuery = { __typename?: 'Query', vehicleSearch: Array<{ __typename?: 'VehicleClass', _id: string, name: string, vehicleCode: string, vehicleType: string }> };

export const DailyReportCardSnippetFragmentDoc = gql`
    fragment DailyReportCardSnippet on DailyReportClass {
  _id
  date
  approved
  jobsite {
    _id
    name
  }
  crew {
    _id
    name
  }
}
    `;
export const CrewSsrSnippetFragmentDoc = gql`
    fragment CrewSSRSnippet on CrewClass {
  _id
  name
  type
}
    `;
export const EmployeeCardSnippetFragmentDoc = gql`
    fragment EmployeeCardSnippet on EmployeeClass {
  _id
  name
  jobTitle
}
    `;
export const VehicleCardSnippetFragmentDoc = gql`
    fragment VehicleCardSnippet on VehicleClass {
  _id
  name
  vehicleCode
  vehicleType
}
    `;
export const CrewFullSnippetFragmentDoc = gql`
    fragment CrewFullSnippet on CrewClass {
  ...CrewSSRSnippet
  employees {
    ...EmployeeCardSnippet
  }
  vehicles {
    ...VehicleCardSnippet
  }
}
    ${CrewSsrSnippetFragmentDoc}
${EmployeeCardSnippetFragmentDoc}
${VehicleCardSnippetFragmentDoc}`;
export const EmployeeWorkCardSnippetFragmentDoc = gql`
    fragment EmployeeWorkCardSnippet on EmployeeWorkClass {
  _id
  jobTitle
  employee {
    _id
    name
  }
  startTime
  endTime
}
    `;
export const VehicleWorkCardSnippetFragmentDoc = gql`
    fragment VehicleWorkCardSnippet on VehicleWorkClass {
  _id
  hours
  jobTitle
  vehicle {
    _id
    name
  }
}
    `;
export const ProductionCardSnippetFragmentDoc = gql`
    fragment ProductionCardSnippet on ProductionClass {
  _id
  jobTitle
  quantity
  unit
  startTime
  endTime
  description
}
    `;
export const MaterialShipmentCardSnippetFragmentDoc = gql`
    fragment MaterialShipmentCardSnippet on MaterialShipmentClass {
  _id
  shipmentType
  supplier
  quantity
  unit
  startTime
  endTime
  vehicleObject {
    source
    vehicleType
    vehicleCode
  }
}
    `;
export const ReportNoteFullSnippetFragmentDoc = gql`
    fragment ReportNoteFullSnippet on ReportNoteClass {
  note
}
    `;
export const DailyReportFullSnippetFragmentDoc = gql`
    fragment DailyReportFullSnippet on DailyReportClass {
  _id
  date
  approved
  crew {
    ...CrewFullSnippet
  }
  employeeWork {
    ...EmployeeWorkCardSnippet
  }
  vehicleWork {
    ...VehicleWorkCardSnippet
  }
  productions {
    ...ProductionCardSnippet
  }
  materialShipments {
    ...MaterialShipmentCardSnippet
  }
  reportNote {
    ...ReportNoteFullSnippet
  }
}
    ${CrewFullSnippetFragmentDoc}
${EmployeeWorkCardSnippetFragmentDoc}
${VehicleWorkCardSnippetFragmentDoc}
${ProductionCardSnippetFragmentDoc}
${MaterialShipmentCardSnippetFragmentDoc}
${ReportNoteFullSnippetFragmentDoc}`;
export const DailyReportPdfSnippetFragmentDoc = gql`
    fragment DailyReportPDFSnippet on DailyReportClass {
  date
  crew {
    name
  }
  jobsite {
    name
    jobcode
  }
  employeeWork {
    ...EmployeeWorkCardSnippet
  }
  vehicleWork {
    ...VehicleWorkCardSnippet
  }
  productions {
    ...ProductionCardSnippet
  }
  materialShipments {
    ...MaterialShipmentCardSnippet
  }
  reportNote {
    ...ReportNoteFullSnippet
  }
}
    ${EmployeeWorkCardSnippetFragmentDoc}
${VehicleWorkCardSnippetFragmentDoc}
${ProductionCardSnippetFragmentDoc}
${MaterialShipmentCardSnippetFragmentDoc}
${ReportNoteFullSnippetFragmentDoc}`;
export const DailyReportSsrSnippetFragmentDoc = gql`
    fragment DailyReportSSRSnippet on DailyReportClass {
  _id
  jobsite {
    _id
    name
    jobcode
  }
}
    `;
export const FullUserSnippetFragmentDoc = gql`
    fragment FullUserSnippet on UserClass {
  _id
  name
  email
  admin
  projectManager
  employee {
    name
    jobTitle
  }
}
    `;
export const CrewAddEmployeeDocument = gql`
    mutation CrewAddEmployee($crewId: String!, $employeeId: String!) {
  crewAddEmployee(crewId: $crewId, employeeId: $employeeId) {
    ...CrewFullSnippet
  }
}
    ${CrewFullSnippetFragmentDoc}`;
export type CrewAddEmployeeMutationFn = Apollo.MutationFunction<CrewAddEmployeeMutation, CrewAddEmployeeMutationVariables>;

/**
 * __useCrewAddEmployeeMutation__
 *
 * To run a mutation, you first call `useCrewAddEmployeeMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCrewAddEmployeeMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [crewAddEmployeeMutation, { data, loading, error }] = useCrewAddEmployeeMutation({
 *   variables: {
 *      crewId: // value for 'crewId'
 *      employeeId: // value for 'employeeId'
 *   },
 * });
 */
export function useCrewAddEmployeeMutation(baseOptions?: Apollo.MutationHookOptions<CrewAddEmployeeMutation, CrewAddEmployeeMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CrewAddEmployeeMutation, CrewAddEmployeeMutationVariables>(CrewAddEmployeeDocument, options);
      }
export type CrewAddEmployeeMutationHookResult = ReturnType<typeof useCrewAddEmployeeMutation>;
export type CrewAddEmployeeMutationResult = Apollo.MutationResult<CrewAddEmployeeMutation>;
export type CrewAddEmployeeMutationOptions = Apollo.BaseMutationOptions<CrewAddEmployeeMutation, CrewAddEmployeeMutationVariables>;
export const CrewAddVehicleDocument = gql`
    mutation CrewAddVehicle($crewId: String!, $vehicleId: String!) {
  crewAddVehicle(crewId: $crewId, vehicleId: $vehicleId) {
    ...CrewFullSnippet
  }
}
    ${CrewFullSnippetFragmentDoc}`;
export type CrewAddVehicleMutationFn = Apollo.MutationFunction<CrewAddVehicleMutation, CrewAddVehicleMutationVariables>;

/**
 * __useCrewAddVehicleMutation__
 *
 * To run a mutation, you first call `useCrewAddVehicleMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCrewAddVehicleMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [crewAddVehicleMutation, { data, loading, error }] = useCrewAddVehicleMutation({
 *   variables: {
 *      crewId: // value for 'crewId'
 *      vehicleId: // value for 'vehicleId'
 *   },
 * });
 */
export function useCrewAddVehicleMutation(baseOptions?: Apollo.MutationHookOptions<CrewAddVehicleMutation, CrewAddVehicleMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CrewAddVehicleMutation, CrewAddVehicleMutationVariables>(CrewAddVehicleDocument, options);
      }
export type CrewAddVehicleMutationHookResult = ReturnType<typeof useCrewAddVehicleMutation>;
export type CrewAddVehicleMutationResult = Apollo.MutationResult<CrewAddVehicleMutation>;
export type CrewAddVehicleMutationOptions = Apollo.BaseMutationOptions<CrewAddVehicleMutation, CrewAddVehicleMutationVariables>;
export const CrewRemoveEmployeeDocument = gql`
    mutation CrewRemoveEmployee($crewId: String!, $employeeId: String!) {
  crewRemoveEmployee(crewId: $crewId, employeeId: $employeeId) {
    ...CrewFullSnippet
  }
}
    ${CrewFullSnippetFragmentDoc}`;
export type CrewRemoveEmployeeMutationFn = Apollo.MutationFunction<CrewRemoveEmployeeMutation, CrewRemoveEmployeeMutationVariables>;

/**
 * __useCrewRemoveEmployeeMutation__
 *
 * To run a mutation, you first call `useCrewRemoveEmployeeMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCrewRemoveEmployeeMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [crewRemoveEmployeeMutation, { data, loading, error }] = useCrewRemoveEmployeeMutation({
 *   variables: {
 *      crewId: // value for 'crewId'
 *      employeeId: // value for 'employeeId'
 *   },
 * });
 */
export function useCrewRemoveEmployeeMutation(baseOptions?: Apollo.MutationHookOptions<CrewRemoveEmployeeMutation, CrewRemoveEmployeeMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CrewRemoveEmployeeMutation, CrewRemoveEmployeeMutationVariables>(CrewRemoveEmployeeDocument, options);
      }
export type CrewRemoveEmployeeMutationHookResult = ReturnType<typeof useCrewRemoveEmployeeMutation>;
export type CrewRemoveEmployeeMutationResult = Apollo.MutationResult<CrewRemoveEmployeeMutation>;
export type CrewRemoveEmployeeMutationOptions = Apollo.BaseMutationOptions<CrewRemoveEmployeeMutation, CrewRemoveEmployeeMutationVariables>;
export const CrewRemoveVehicleDocument = gql`
    mutation CrewRemoveVehicle($crewId: String!, $vehicleId: String!) {
  crewRemoveVehicle(crewId: $crewId, vehicleId: $vehicleId) {
    ...CrewFullSnippet
  }
}
    ${CrewFullSnippetFragmentDoc}`;
export type CrewRemoveVehicleMutationFn = Apollo.MutationFunction<CrewRemoveVehicleMutation, CrewRemoveVehicleMutationVariables>;

/**
 * __useCrewRemoveVehicleMutation__
 *
 * To run a mutation, you first call `useCrewRemoveVehicleMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCrewRemoveVehicleMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [crewRemoveVehicleMutation, { data, loading, error }] = useCrewRemoveVehicleMutation({
 *   variables: {
 *      crewId: // value for 'crewId'
 *      vehicleId: // value for 'vehicleId'
 *   },
 * });
 */
export function useCrewRemoveVehicleMutation(baseOptions?: Apollo.MutationHookOptions<CrewRemoveVehicleMutation, CrewRemoveVehicleMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CrewRemoveVehicleMutation, CrewRemoveVehicleMutationVariables>(CrewRemoveVehicleDocument, options);
      }
export type CrewRemoveVehicleMutationHookResult = ReturnType<typeof useCrewRemoveVehicleMutation>;
export type CrewRemoveVehicleMutationResult = Apollo.MutationResult<CrewRemoveVehicleMutation>;
export type CrewRemoveVehicleMutationOptions = Apollo.BaseMutationOptions<CrewRemoveVehicleMutation, CrewRemoveVehicleMutationVariables>;
export const DailyReportApprovalUpdateDocument = gql`
    mutation DailyReportApprovalUpdate($id: String!, $approved: Boolean!) {
  dailyReportApprovalUpdate(id: $id, approved: $approved) {
    ...DailyReportFullSnippet
  }
}
    ${DailyReportFullSnippetFragmentDoc}`;
export type DailyReportApprovalUpdateMutationFn = Apollo.MutationFunction<DailyReportApprovalUpdateMutation, DailyReportApprovalUpdateMutationVariables>;

/**
 * __useDailyReportApprovalUpdateMutation__
 *
 * To run a mutation, you first call `useDailyReportApprovalUpdateMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDailyReportApprovalUpdateMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [dailyReportApprovalUpdateMutation, { data, loading, error }] = useDailyReportApprovalUpdateMutation({
 *   variables: {
 *      id: // value for 'id'
 *      approved: // value for 'approved'
 *   },
 * });
 */
export function useDailyReportApprovalUpdateMutation(baseOptions?: Apollo.MutationHookOptions<DailyReportApprovalUpdateMutation, DailyReportApprovalUpdateMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DailyReportApprovalUpdateMutation, DailyReportApprovalUpdateMutationVariables>(DailyReportApprovalUpdateDocument, options);
      }
export type DailyReportApprovalUpdateMutationHookResult = ReturnType<typeof useDailyReportApprovalUpdateMutation>;
export type DailyReportApprovalUpdateMutationResult = Apollo.MutationResult<DailyReportApprovalUpdateMutation>;
export type DailyReportApprovalUpdateMutationOptions = Apollo.BaseMutationOptions<DailyReportApprovalUpdateMutation, DailyReportApprovalUpdateMutationVariables>;
export const DailyReportNoteUpdateDocument = gql`
    mutation DailyReportNoteUpdate($id: String!, $data: DailyReportNoteUpdateData!) {
  dailyReportNoteUpdate(id: $id, data: $data) {
    ...DailyReportFullSnippet
  }
}
    ${DailyReportFullSnippetFragmentDoc}`;
export type DailyReportNoteUpdateMutationFn = Apollo.MutationFunction<DailyReportNoteUpdateMutation, DailyReportNoteUpdateMutationVariables>;

/**
 * __useDailyReportNoteUpdateMutation__
 *
 * To run a mutation, you first call `useDailyReportNoteUpdateMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDailyReportNoteUpdateMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [dailyReportNoteUpdateMutation, { data, loading, error }] = useDailyReportNoteUpdateMutation({
 *   variables: {
 *      id: // value for 'id'
 *      data: // value for 'data'
 *   },
 * });
 */
export function useDailyReportNoteUpdateMutation(baseOptions?: Apollo.MutationHookOptions<DailyReportNoteUpdateMutation, DailyReportNoteUpdateMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DailyReportNoteUpdateMutation, DailyReportNoteUpdateMutationVariables>(DailyReportNoteUpdateDocument, options);
      }
export type DailyReportNoteUpdateMutationHookResult = ReturnType<typeof useDailyReportNoteUpdateMutation>;
export type DailyReportNoteUpdateMutationResult = Apollo.MutationResult<DailyReportNoteUpdateMutation>;
export type DailyReportNoteUpdateMutationOptions = Apollo.BaseMutationOptions<DailyReportNoteUpdateMutation, DailyReportNoteUpdateMutationVariables>;
export const DailyReportUpdateDocument = gql`
    mutation DailyReportUpdate($id: String!, $data: DailyReportUpdateData!) {
  dailyReportUpdate(id: $id, data: $data) {
    ...DailyReportFullSnippet
  }
}
    ${DailyReportFullSnippetFragmentDoc}`;
export type DailyReportUpdateMutationFn = Apollo.MutationFunction<DailyReportUpdateMutation, DailyReportUpdateMutationVariables>;

/**
 * __useDailyReportUpdateMutation__
 *
 * To run a mutation, you first call `useDailyReportUpdateMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDailyReportUpdateMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [dailyReportUpdateMutation, { data, loading, error }] = useDailyReportUpdateMutation({
 *   variables: {
 *      id: // value for 'id'
 *      data: // value for 'data'
 *   },
 * });
 */
export function useDailyReportUpdateMutation(baseOptions?: Apollo.MutationHookOptions<DailyReportUpdateMutation, DailyReportUpdateMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DailyReportUpdateMutation, DailyReportUpdateMutationVariables>(DailyReportUpdateDocument, options);
      }
export type DailyReportUpdateMutationHookResult = ReturnType<typeof useDailyReportUpdateMutation>;
export type DailyReportUpdateMutationResult = Apollo.MutationResult<DailyReportUpdateMutation>;
export type DailyReportUpdateMutationOptions = Apollo.BaseMutationOptions<DailyReportUpdateMutation, DailyReportUpdateMutationVariables>;
export const EmployeeCreateDocument = gql`
    mutation EmployeeCreate($data: EmployeeCreateData!, $crewId: String) {
  employeeCreate(data: $data, crewId: $crewId) {
    ...EmployeeCardSnippet
  }
}
    ${EmployeeCardSnippetFragmentDoc}`;
export type EmployeeCreateMutationFn = Apollo.MutationFunction<EmployeeCreateMutation, EmployeeCreateMutationVariables>;

/**
 * __useEmployeeCreateMutation__
 *
 * To run a mutation, you first call `useEmployeeCreateMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useEmployeeCreateMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [employeeCreateMutation, { data, loading, error }] = useEmployeeCreateMutation({
 *   variables: {
 *      data: // value for 'data'
 *      crewId: // value for 'crewId'
 *   },
 * });
 */
export function useEmployeeCreateMutation(baseOptions?: Apollo.MutationHookOptions<EmployeeCreateMutation, EmployeeCreateMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<EmployeeCreateMutation, EmployeeCreateMutationVariables>(EmployeeCreateDocument, options);
      }
export type EmployeeCreateMutationHookResult = ReturnType<typeof useEmployeeCreateMutation>;
export type EmployeeCreateMutationResult = Apollo.MutationResult<EmployeeCreateMutation>;
export type EmployeeCreateMutationOptions = Apollo.BaseMutationOptions<EmployeeCreateMutation, EmployeeCreateMutationVariables>;
export const EmployeeWorkCreateDocument = gql`
    mutation EmployeeWorkCreate($dailyReportId: String!, $data: [EmployeeWorkCreateData!]!) {
  employeeWorkCreate(dailyReportId: $dailyReportId, data: $data) {
    ...EmployeeWorkCardSnippet
  }
}
    ${EmployeeWorkCardSnippetFragmentDoc}`;
export type EmployeeWorkCreateMutationFn = Apollo.MutationFunction<EmployeeWorkCreateMutation, EmployeeWorkCreateMutationVariables>;

/**
 * __useEmployeeWorkCreateMutation__
 *
 * To run a mutation, you first call `useEmployeeWorkCreateMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useEmployeeWorkCreateMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [employeeWorkCreateMutation, { data, loading, error }] = useEmployeeWorkCreateMutation({
 *   variables: {
 *      dailyReportId: // value for 'dailyReportId'
 *      data: // value for 'data'
 *   },
 * });
 */
export function useEmployeeWorkCreateMutation(baseOptions?: Apollo.MutationHookOptions<EmployeeWorkCreateMutation, EmployeeWorkCreateMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<EmployeeWorkCreateMutation, EmployeeWorkCreateMutationVariables>(EmployeeWorkCreateDocument, options);
      }
export type EmployeeWorkCreateMutationHookResult = ReturnType<typeof useEmployeeWorkCreateMutation>;
export type EmployeeWorkCreateMutationResult = Apollo.MutationResult<EmployeeWorkCreateMutation>;
export type EmployeeWorkCreateMutationOptions = Apollo.BaseMutationOptions<EmployeeWorkCreateMutation, EmployeeWorkCreateMutationVariables>;
export const EmployeeWorkDeleteDocument = gql`
    mutation EmployeeWorkDelete($id: String!) {
  employeeWorkDelete(id: $id)
}
    `;
export type EmployeeWorkDeleteMutationFn = Apollo.MutationFunction<EmployeeWorkDeleteMutation, EmployeeWorkDeleteMutationVariables>;

/**
 * __useEmployeeWorkDeleteMutation__
 *
 * To run a mutation, you first call `useEmployeeWorkDeleteMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useEmployeeWorkDeleteMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [employeeWorkDeleteMutation, { data, loading, error }] = useEmployeeWorkDeleteMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useEmployeeWorkDeleteMutation(baseOptions?: Apollo.MutationHookOptions<EmployeeWorkDeleteMutation, EmployeeWorkDeleteMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<EmployeeWorkDeleteMutation, EmployeeWorkDeleteMutationVariables>(EmployeeWorkDeleteDocument, options);
      }
export type EmployeeWorkDeleteMutationHookResult = ReturnType<typeof useEmployeeWorkDeleteMutation>;
export type EmployeeWorkDeleteMutationResult = Apollo.MutationResult<EmployeeWorkDeleteMutation>;
export type EmployeeWorkDeleteMutationOptions = Apollo.BaseMutationOptions<EmployeeWorkDeleteMutation, EmployeeWorkDeleteMutationVariables>;
export const EmployeeWorkUpdateDocument = gql`
    mutation EmployeeWorkUpdate($id: String!, $data: EmployeeWorkUpdateData!) {
  employeeWorkUpdate(id: $id, data: $data) {
    ...EmployeeWorkCardSnippet
  }
}
    ${EmployeeWorkCardSnippetFragmentDoc}`;
export type EmployeeWorkUpdateMutationFn = Apollo.MutationFunction<EmployeeWorkUpdateMutation, EmployeeWorkUpdateMutationVariables>;

/**
 * __useEmployeeWorkUpdateMutation__
 *
 * To run a mutation, you first call `useEmployeeWorkUpdateMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useEmployeeWorkUpdateMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [employeeWorkUpdateMutation, { data, loading, error }] = useEmployeeWorkUpdateMutation({
 *   variables: {
 *      id: // value for 'id'
 *      data: // value for 'data'
 *   },
 * });
 */
export function useEmployeeWorkUpdateMutation(baseOptions?: Apollo.MutationHookOptions<EmployeeWorkUpdateMutation, EmployeeWorkUpdateMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<EmployeeWorkUpdateMutation, EmployeeWorkUpdateMutationVariables>(EmployeeWorkUpdateDocument, options);
      }
export type EmployeeWorkUpdateMutationHookResult = ReturnType<typeof useEmployeeWorkUpdateMutation>;
export type EmployeeWorkUpdateMutationResult = Apollo.MutationResult<EmployeeWorkUpdateMutation>;
export type EmployeeWorkUpdateMutationOptions = Apollo.BaseMutationOptions<EmployeeWorkUpdateMutation, EmployeeWorkUpdateMutationVariables>;
export const LoginDocument = gql`
    mutation Login($data: LoginData!) {
  login(data: $data)
}
    `;
export type LoginMutationFn = Apollo.MutationFunction<LoginMutation, LoginMutationVariables>;

/**
 * __useLoginMutation__
 *
 * To run a mutation, you first call `useLoginMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useLoginMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [loginMutation, { data, loading, error }] = useLoginMutation({
 *   variables: {
 *      data: // value for 'data'
 *   },
 * });
 */
export function useLoginMutation(baseOptions?: Apollo.MutationHookOptions<LoginMutation, LoginMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<LoginMutation, LoginMutationVariables>(LoginDocument, options);
      }
export type LoginMutationHookResult = ReturnType<typeof useLoginMutation>;
export type LoginMutationResult = Apollo.MutationResult<LoginMutation>;
export type LoginMutationOptions = Apollo.BaseMutationOptions<LoginMutation, LoginMutationVariables>;
export const MaterialShipmentCreateDocument = gql`
    mutation MaterialShipmentCreate($dailyReportId: String!, $data: MaterialShipmentCreateData!) {
  materialShipmentCreate(dailyReportId: $dailyReportId, data: $data) {
    ...MaterialShipmentCardSnippet
  }
}
    ${MaterialShipmentCardSnippetFragmentDoc}`;
export type MaterialShipmentCreateMutationFn = Apollo.MutationFunction<MaterialShipmentCreateMutation, MaterialShipmentCreateMutationVariables>;

/**
 * __useMaterialShipmentCreateMutation__
 *
 * To run a mutation, you first call `useMaterialShipmentCreateMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useMaterialShipmentCreateMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [materialShipmentCreateMutation, { data, loading, error }] = useMaterialShipmentCreateMutation({
 *   variables: {
 *      dailyReportId: // value for 'dailyReportId'
 *      data: // value for 'data'
 *   },
 * });
 */
export function useMaterialShipmentCreateMutation(baseOptions?: Apollo.MutationHookOptions<MaterialShipmentCreateMutation, MaterialShipmentCreateMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<MaterialShipmentCreateMutation, MaterialShipmentCreateMutationVariables>(MaterialShipmentCreateDocument, options);
      }
export type MaterialShipmentCreateMutationHookResult = ReturnType<typeof useMaterialShipmentCreateMutation>;
export type MaterialShipmentCreateMutationResult = Apollo.MutationResult<MaterialShipmentCreateMutation>;
export type MaterialShipmentCreateMutationOptions = Apollo.BaseMutationOptions<MaterialShipmentCreateMutation, MaterialShipmentCreateMutationVariables>;
export const MaterialShipmentDeleteDocument = gql`
    mutation MaterialShipmentDelete($id: String!) {
  materialShipmentDelete(id: $id)
}
    `;
export type MaterialShipmentDeleteMutationFn = Apollo.MutationFunction<MaterialShipmentDeleteMutation, MaterialShipmentDeleteMutationVariables>;

/**
 * __useMaterialShipmentDeleteMutation__
 *
 * To run a mutation, you first call `useMaterialShipmentDeleteMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useMaterialShipmentDeleteMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [materialShipmentDeleteMutation, { data, loading, error }] = useMaterialShipmentDeleteMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useMaterialShipmentDeleteMutation(baseOptions?: Apollo.MutationHookOptions<MaterialShipmentDeleteMutation, MaterialShipmentDeleteMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<MaterialShipmentDeleteMutation, MaterialShipmentDeleteMutationVariables>(MaterialShipmentDeleteDocument, options);
      }
export type MaterialShipmentDeleteMutationHookResult = ReturnType<typeof useMaterialShipmentDeleteMutation>;
export type MaterialShipmentDeleteMutationResult = Apollo.MutationResult<MaterialShipmentDeleteMutation>;
export type MaterialShipmentDeleteMutationOptions = Apollo.BaseMutationOptions<MaterialShipmentDeleteMutation, MaterialShipmentDeleteMutationVariables>;
export const MaterialShipmentUpdateDocument = gql`
    mutation MaterialShipmentUpdate($id: String!, $data: MaterialShipmentUpdateData!) {
  materialShipmentUpdate(id: $id, data: $data) {
    ...MaterialShipmentCardSnippet
  }
}
    ${MaterialShipmentCardSnippetFragmentDoc}`;
export type MaterialShipmentUpdateMutationFn = Apollo.MutationFunction<MaterialShipmentUpdateMutation, MaterialShipmentUpdateMutationVariables>;

/**
 * __useMaterialShipmentUpdateMutation__
 *
 * To run a mutation, you first call `useMaterialShipmentUpdateMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useMaterialShipmentUpdateMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [materialShipmentUpdateMutation, { data, loading, error }] = useMaterialShipmentUpdateMutation({
 *   variables: {
 *      id: // value for 'id'
 *      data: // value for 'data'
 *   },
 * });
 */
export function useMaterialShipmentUpdateMutation(baseOptions?: Apollo.MutationHookOptions<MaterialShipmentUpdateMutation, MaterialShipmentUpdateMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<MaterialShipmentUpdateMutation, MaterialShipmentUpdateMutationVariables>(MaterialShipmentUpdateDocument, options);
      }
export type MaterialShipmentUpdateMutationHookResult = ReturnType<typeof useMaterialShipmentUpdateMutation>;
export type MaterialShipmentUpdateMutationResult = Apollo.MutationResult<MaterialShipmentUpdateMutation>;
export type MaterialShipmentUpdateMutationOptions = Apollo.BaseMutationOptions<MaterialShipmentUpdateMutation, MaterialShipmentUpdateMutationVariables>;
export const ProductionCreateDocument = gql`
    mutation ProductionCreate($dailyReportId: String!, $data: ProductionCreateData!) {
  productionCreate(dailyReportId: $dailyReportId, data: $data) {
    ...ProductionCardSnippet
  }
}
    ${ProductionCardSnippetFragmentDoc}`;
export type ProductionCreateMutationFn = Apollo.MutationFunction<ProductionCreateMutation, ProductionCreateMutationVariables>;

/**
 * __useProductionCreateMutation__
 *
 * To run a mutation, you first call `useProductionCreateMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useProductionCreateMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [productionCreateMutation, { data, loading, error }] = useProductionCreateMutation({
 *   variables: {
 *      dailyReportId: // value for 'dailyReportId'
 *      data: // value for 'data'
 *   },
 * });
 */
export function useProductionCreateMutation(baseOptions?: Apollo.MutationHookOptions<ProductionCreateMutation, ProductionCreateMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<ProductionCreateMutation, ProductionCreateMutationVariables>(ProductionCreateDocument, options);
      }
export type ProductionCreateMutationHookResult = ReturnType<typeof useProductionCreateMutation>;
export type ProductionCreateMutationResult = Apollo.MutationResult<ProductionCreateMutation>;
export type ProductionCreateMutationOptions = Apollo.BaseMutationOptions<ProductionCreateMutation, ProductionCreateMutationVariables>;
export const ProductionDeleteDocument = gql`
    mutation ProductionDelete($id: String!) {
  productionDelete(id: $id)
}
    `;
export type ProductionDeleteMutationFn = Apollo.MutationFunction<ProductionDeleteMutation, ProductionDeleteMutationVariables>;

/**
 * __useProductionDeleteMutation__
 *
 * To run a mutation, you first call `useProductionDeleteMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useProductionDeleteMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [productionDeleteMutation, { data, loading, error }] = useProductionDeleteMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useProductionDeleteMutation(baseOptions?: Apollo.MutationHookOptions<ProductionDeleteMutation, ProductionDeleteMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<ProductionDeleteMutation, ProductionDeleteMutationVariables>(ProductionDeleteDocument, options);
      }
export type ProductionDeleteMutationHookResult = ReturnType<typeof useProductionDeleteMutation>;
export type ProductionDeleteMutationResult = Apollo.MutationResult<ProductionDeleteMutation>;
export type ProductionDeleteMutationOptions = Apollo.BaseMutationOptions<ProductionDeleteMutation, ProductionDeleteMutationVariables>;
export const ProductionUpdateDocument = gql`
    mutation ProductionUpdate($id: String!, $data: ProductionUpdateData!) {
  productionUpdate(id: $id, data: $data) {
    ...ProductionCardSnippet
  }
}
    ${ProductionCardSnippetFragmentDoc}`;
export type ProductionUpdateMutationFn = Apollo.MutationFunction<ProductionUpdateMutation, ProductionUpdateMutationVariables>;

/**
 * __useProductionUpdateMutation__
 *
 * To run a mutation, you first call `useProductionUpdateMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useProductionUpdateMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [productionUpdateMutation, { data, loading, error }] = useProductionUpdateMutation({
 *   variables: {
 *      id: // value for 'id'
 *      data: // value for 'data'
 *   },
 * });
 */
export function useProductionUpdateMutation(baseOptions?: Apollo.MutationHookOptions<ProductionUpdateMutation, ProductionUpdateMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<ProductionUpdateMutation, ProductionUpdateMutationVariables>(ProductionUpdateDocument, options);
      }
export type ProductionUpdateMutationHookResult = ReturnType<typeof useProductionUpdateMutation>;
export type ProductionUpdateMutationResult = Apollo.MutationResult<ProductionUpdateMutation>;
export type ProductionUpdateMutationOptions = Apollo.BaseMutationOptions<ProductionUpdateMutation, ProductionUpdateMutationVariables>;
export const VehicleCreateDocument = gql`
    mutation VehicleCreate($data: VehicleCreateData!, $crewId: String) {
  vehicleCreate(data: $data, crewId: $crewId) {
    ...VehicleCardSnippet
  }
}
    ${VehicleCardSnippetFragmentDoc}`;
export type VehicleCreateMutationFn = Apollo.MutationFunction<VehicleCreateMutation, VehicleCreateMutationVariables>;

/**
 * __useVehicleCreateMutation__
 *
 * To run a mutation, you first call `useVehicleCreateMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useVehicleCreateMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [vehicleCreateMutation, { data, loading, error }] = useVehicleCreateMutation({
 *   variables: {
 *      data: // value for 'data'
 *      crewId: // value for 'crewId'
 *   },
 * });
 */
export function useVehicleCreateMutation(baseOptions?: Apollo.MutationHookOptions<VehicleCreateMutation, VehicleCreateMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<VehicleCreateMutation, VehicleCreateMutationVariables>(VehicleCreateDocument, options);
      }
export type VehicleCreateMutationHookResult = ReturnType<typeof useVehicleCreateMutation>;
export type VehicleCreateMutationResult = Apollo.MutationResult<VehicleCreateMutation>;
export type VehicleCreateMutationOptions = Apollo.BaseMutationOptions<VehicleCreateMutation, VehicleCreateMutationVariables>;
export const VehicleWorkCreateDocument = gql`
    mutation VehicleWorkCreate($dailyReportId: String!, $data: [VehicleWorkCreateData!]!) {
  vehicleWorkCreate(dailyReportId: $dailyReportId, data: $data) {
    ...VehicleWorkCardSnippet
  }
}
    ${VehicleWorkCardSnippetFragmentDoc}`;
export type VehicleWorkCreateMutationFn = Apollo.MutationFunction<VehicleWorkCreateMutation, VehicleWorkCreateMutationVariables>;

/**
 * __useVehicleWorkCreateMutation__
 *
 * To run a mutation, you first call `useVehicleWorkCreateMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useVehicleWorkCreateMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [vehicleWorkCreateMutation, { data, loading, error }] = useVehicleWorkCreateMutation({
 *   variables: {
 *      dailyReportId: // value for 'dailyReportId'
 *      data: // value for 'data'
 *   },
 * });
 */
export function useVehicleWorkCreateMutation(baseOptions?: Apollo.MutationHookOptions<VehicleWorkCreateMutation, VehicleWorkCreateMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<VehicleWorkCreateMutation, VehicleWorkCreateMutationVariables>(VehicleWorkCreateDocument, options);
      }
export type VehicleWorkCreateMutationHookResult = ReturnType<typeof useVehicleWorkCreateMutation>;
export type VehicleWorkCreateMutationResult = Apollo.MutationResult<VehicleWorkCreateMutation>;
export type VehicleWorkCreateMutationOptions = Apollo.BaseMutationOptions<VehicleWorkCreateMutation, VehicleWorkCreateMutationVariables>;
export const VehicleWorkDeleteDocument = gql`
    mutation VehicleWorkDelete($id: String!) {
  vehicleWorkDelete(id: $id)
}
    `;
export type VehicleWorkDeleteMutationFn = Apollo.MutationFunction<VehicleWorkDeleteMutation, VehicleWorkDeleteMutationVariables>;

/**
 * __useVehicleWorkDeleteMutation__
 *
 * To run a mutation, you first call `useVehicleWorkDeleteMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useVehicleWorkDeleteMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [vehicleWorkDeleteMutation, { data, loading, error }] = useVehicleWorkDeleteMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useVehicleWorkDeleteMutation(baseOptions?: Apollo.MutationHookOptions<VehicleWorkDeleteMutation, VehicleWorkDeleteMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<VehicleWorkDeleteMutation, VehicleWorkDeleteMutationVariables>(VehicleWorkDeleteDocument, options);
      }
export type VehicleWorkDeleteMutationHookResult = ReturnType<typeof useVehicleWorkDeleteMutation>;
export type VehicleWorkDeleteMutationResult = Apollo.MutationResult<VehicleWorkDeleteMutation>;
export type VehicleWorkDeleteMutationOptions = Apollo.BaseMutationOptions<VehicleWorkDeleteMutation, VehicleWorkDeleteMutationVariables>;
export const VehicleWorkUpdateDocument = gql`
    mutation VehicleWorkUpdate($id: String!, $data: VehicleWorkUpdateData!) {
  vehicleWorkUpdate(id: $id, data: $data) {
    ...VehicleWorkCardSnippet
  }
}
    ${VehicleWorkCardSnippetFragmentDoc}`;
export type VehicleWorkUpdateMutationFn = Apollo.MutationFunction<VehicleWorkUpdateMutation, VehicleWorkUpdateMutationVariables>;

/**
 * __useVehicleWorkUpdateMutation__
 *
 * To run a mutation, you first call `useVehicleWorkUpdateMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useVehicleWorkUpdateMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [vehicleWorkUpdateMutation, { data, loading, error }] = useVehicleWorkUpdateMutation({
 *   variables: {
 *      id: // value for 'id'
 *      data: // value for 'data'
 *   },
 * });
 */
export function useVehicleWorkUpdateMutation(baseOptions?: Apollo.MutationHookOptions<VehicleWorkUpdateMutation, VehicleWorkUpdateMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<VehicleWorkUpdateMutation, VehicleWorkUpdateMutationVariables>(VehicleWorkUpdateDocument, options);
      }
export type VehicleWorkUpdateMutationHookResult = ReturnType<typeof useVehicleWorkUpdateMutation>;
export type VehicleWorkUpdateMutationResult = Apollo.MutationResult<VehicleWorkUpdateMutation>;
export type VehicleWorkUpdateMutationOptions = Apollo.BaseMutationOptions<VehicleWorkUpdateMutation, VehicleWorkUpdateMutationVariables>;
export const CrewFullDocument = gql`
    query CrewFull($id: String!) {
  crew(id: $id) {
    ...CrewFullSnippet
  }
}
    ${CrewFullSnippetFragmentDoc}`;

/**
 * __useCrewFullQuery__
 *
 * To run a query within a React component, call `useCrewFullQuery` and pass it any options that fit your needs.
 * When your component renders, `useCrewFullQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useCrewFullQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useCrewFullQuery(baseOptions: Apollo.QueryHookOptions<CrewFullQuery, CrewFullQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<CrewFullQuery, CrewFullQueryVariables>(CrewFullDocument, options);
      }
export function useCrewFullLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<CrewFullQuery, CrewFullQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<CrewFullQuery, CrewFullQueryVariables>(CrewFullDocument, options);
        }
export type CrewFullQueryHookResult = ReturnType<typeof useCrewFullQuery>;
export type CrewFullLazyQueryHookResult = ReturnType<typeof useCrewFullLazyQuery>;
export type CrewFullQueryResult = Apollo.QueryResult<CrewFullQuery, CrewFullQueryVariables>;
export const CrewSsrDocument = gql`
    query CrewSSR($id: String!) {
  crew(id: $id) {
    ...CrewSSRSnippet
  }
}
    ${CrewSsrSnippetFragmentDoc}`;

/**
 * __useCrewSsrQuery__
 *
 * To run a query within a React component, call `useCrewSsrQuery` and pass it any options that fit your needs.
 * When your component renders, `useCrewSsrQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useCrewSsrQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useCrewSsrQuery(baseOptions: Apollo.QueryHookOptions<CrewSsrQuery, CrewSsrQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<CrewSsrQuery, CrewSsrQueryVariables>(CrewSsrDocument, options);
      }
export function useCrewSsrLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<CrewSsrQuery, CrewSsrQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<CrewSsrQuery, CrewSsrQueryVariables>(CrewSsrDocument, options);
        }
export type CrewSsrQueryHookResult = ReturnType<typeof useCrewSsrQuery>;
export type CrewSsrLazyQueryHookResult = ReturnType<typeof useCrewSsrLazyQuery>;
export type CrewSsrQueryResult = Apollo.QueryResult<CrewSsrQuery, CrewSsrQueryVariables>;
export const CurrentUserDocument = gql`
    query CurrentUser {
  currentUser {
    ...FullUserSnippet
  }
}
    ${FullUserSnippetFragmentDoc}`;

/**
 * __useCurrentUserQuery__
 *
 * To run a query within a React component, call `useCurrentUserQuery` and pass it any options that fit your needs.
 * When your component renders, `useCurrentUserQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useCurrentUserQuery({
 *   variables: {
 *   },
 * });
 */
export function useCurrentUserQuery(baseOptions?: Apollo.QueryHookOptions<CurrentUserQuery, CurrentUserQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<CurrentUserQuery, CurrentUserQueryVariables>(CurrentUserDocument, options);
      }
export function useCurrentUserLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<CurrentUserQuery, CurrentUserQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<CurrentUserQuery, CurrentUserQueryVariables>(CurrentUserDocument, options);
        }
export type CurrentUserQueryHookResult = ReturnType<typeof useCurrentUserQuery>;
export type CurrentUserLazyQueryHookResult = ReturnType<typeof useCurrentUserLazyQuery>;
export type CurrentUserQueryResult = Apollo.QueryResult<CurrentUserQuery, CurrentUserQueryVariables>;
export const DailyReportFullDocument = gql`
    query DailyReportFull($id: String!) {
  dailyReport(id: $id) {
    ...DailyReportFullSnippet
  }
}
    ${DailyReportFullSnippetFragmentDoc}`;

/**
 * __useDailyReportFullQuery__
 *
 * To run a query within a React component, call `useDailyReportFullQuery` and pass it any options that fit your needs.
 * When your component renders, `useDailyReportFullQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useDailyReportFullQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useDailyReportFullQuery(baseOptions: Apollo.QueryHookOptions<DailyReportFullQuery, DailyReportFullQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<DailyReportFullQuery, DailyReportFullQueryVariables>(DailyReportFullDocument, options);
      }
export function useDailyReportFullLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<DailyReportFullQuery, DailyReportFullQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<DailyReportFullQuery, DailyReportFullQueryVariables>(DailyReportFullDocument, options);
        }
export type DailyReportFullQueryHookResult = ReturnType<typeof useDailyReportFullQuery>;
export type DailyReportFullLazyQueryHookResult = ReturnType<typeof useDailyReportFullLazyQuery>;
export type DailyReportFullQueryResult = Apollo.QueryResult<DailyReportFullQuery, DailyReportFullQueryVariables>;
export const DailyReportPdfDocument = gql`
    query DailyReportPDF($id: String!) {
  dailyReport(id: $id) {
    ...DailyReportPDFSnippet
  }
}
    ${DailyReportPdfSnippetFragmentDoc}`;

/**
 * __useDailyReportPdfQuery__
 *
 * To run a query within a React component, call `useDailyReportPdfQuery` and pass it any options that fit your needs.
 * When your component renders, `useDailyReportPdfQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useDailyReportPdfQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useDailyReportPdfQuery(baseOptions: Apollo.QueryHookOptions<DailyReportPdfQuery, DailyReportPdfQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<DailyReportPdfQuery, DailyReportPdfQueryVariables>(DailyReportPdfDocument, options);
      }
export function useDailyReportPdfLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<DailyReportPdfQuery, DailyReportPdfQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<DailyReportPdfQuery, DailyReportPdfQueryVariables>(DailyReportPdfDocument, options);
        }
export type DailyReportPdfQueryHookResult = ReturnType<typeof useDailyReportPdfQuery>;
export type DailyReportPdfLazyQueryHookResult = ReturnType<typeof useDailyReportPdfLazyQuery>;
export type DailyReportPdfQueryResult = Apollo.QueryResult<DailyReportPdfQuery, DailyReportPdfQueryVariables>;
export const DailyReportSsrDocument = gql`
    query DailyReportSSR($id: String!) {
  dailyReport(id: $id) {
    ...DailyReportSSRSnippet
  }
}
    ${DailyReportSsrSnippetFragmentDoc}`;

/**
 * __useDailyReportSsrQuery__
 *
 * To run a query within a React component, call `useDailyReportSsrQuery` and pass it any options that fit your needs.
 * When your component renders, `useDailyReportSsrQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useDailyReportSsrQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useDailyReportSsrQuery(baseOptions: Apollo.QueryHookOptions<DailyReportSsrQuery, DailyReportSsrQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<DailyReportSsrQuery, DailyReportSsrQueryVariables>(DailyReportSsrDocument, options);
      }
export function useDailyReportSsrLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<DailyReportSsrQuery, DailyReportSsrQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<DailyReportSsrQuery, DailyReportSsrQueryVariables>(DailyReportSsrDocument, options);
        }
export type DailyReportSsrQueryHookResult = ReturnType<typeof useDailyReportSsrQuery>;
export type DailyReportSsrLazyQueryHookResult = ReturnType<typeof useDailyReportSsrLazyQuery>;
export type DailyReportSsrQueryResult = Apollo.QueryResult<DailyReportSsrQuery, DailyReportSsrQueryVariables>;
export const DailyReportsDocument = gql`
    query DailyReports($options: ListOptionData) {
  dailyReports(options: $options) {
    ...DailyReportCardSnippet
  }
}
    ${DailyReportCardSnippetFragmentDoc}`;

/**
 * __useDailyReportsQuery__
 *
 * To run a query within a React component, call `useDailyReportsQuery` and pass it any options that fit your needs.
 * When your component renders, `useDailyReportsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useDailyReportsQuery({
 *   variables: {
 *      options: // value for 'options'
 *   },
 * });
 */
export function useDailyReportsQuery(baseOptions?: Apollo.QueryHookOptions<DailyReportsQuery, DailyReportsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<DailyReportsQuery, DailyReportsQueryVariables>(DailyReportsDocument, options);
      }
export function useDailyReportsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<DailyReportsQuery, DailyReportsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<DailyReportsQuery, DailyReportsQueryVariables>(DailyReportsDocument, options);
        }
export type DailyReportsQueryHookResult = ReturnType<typeof useDailyReportsQuery>;
export type DailyReportsLazyQueryHookResult = ReturnType<typeof useDailyReportsLazyQuery>;
export type DailyReportsQueryResult = Apollo.QueryResult<DailyReportsQuery, DailyReportsQueryVariables>;
export const EmployeeSearchDocument = gql`
    query EmployeeSearch($searchString: String!, $options: SearchOptions) {
  employeeSearch(searchString: $searchString, options: $options) {
    ...EmployeeCardSnippet
  }
}
    ${EmployeeCardSnippetFragmentDoc}`;

/**
 * __useEmployeeSearchQuery__
 *
 * To run a query within a React component, call `useEmployeeSearchQuery` and pass it any options that fit your needs.
 * When your component renders, `useEmployeeSearchQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useEmployeeSearchQuery({
 *   variables: {
 *      searchString: // value for 'searchString'
 *      options: // value for 'options'
 *   },
 * });
 */
export function useEmployeeSearchQuery(baseOptions: Apollo.QueryHookOptions<EmployeeSearchQuery, EmployeeSearchQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<EmployeeSearchQuery, EmployeeSearchQueryVariables>(EmployeeSearchDocument, options);
      }
export function useEmployeeSearchLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<EmployeeSearchQuery, EmployeeSearchQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<EmployeeSearchQuery, EmployeeSearchQueryVariables>(EmployeeSearchDocument, options);
        }
export type EmployeeSearchQueryHookResult = ReturnType<typeof useEmployeeSearchQuery>;
export type EmployeeSearchLazyQueryHookResult = ReturnType<typeof useEmployeeSearchLazyQuery>;
export type EmployeeSearchQueryResult = Apollo.QueryResult<EmployeeSearchQuery, EmployeeSearchQueryVariables>;
export const VehicleSearchDocument = gql`
    query VehicleSearch($searchString: String!, $options: SearchOptions) {
  vehicleSearch(searchString: $searchString, options: $options) {
    ...VehicleCardSnippet
  }
}
    ${VehicleCardSnippetFragmentDoc}`;

/**
 * __useVehicleSearchQuery__
 *
 * To run a query within a React component, call `useVehicleSearchQuery` and pass it any options that fit your needs.
 * When your component renders, `useVehicleSearchQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useVehicleSearchQuery({
 *   variables: {
 *      searchString: // value for 'searchString'
 *      options: // value for 'options'
 *   },
 * });
 */
export function useVehicleSearchQuery(baseOptions: Apollo.QueryHookOptions<VehicleSearchQuery, VehicleSearchQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<VehicleSearchQuery, VehicleSearchQueryVariables>(VehicleSearchDocument, options);
      }
export function useVehicleSearchLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<VehicleSearchQuery, VehicleSearchQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<VehicleSearchQuery, VehicleSearchQueryVariables>(VehicleSearchDocument, options);
        }
export type VehicleSearchQueryHookResult = ReturnType<typeof useVehicleSearchQuery>;
export type VehicleSearchLazyQueryHookResult = ReturnType<typeof useVehicleSearchLazyQuery>;
export type VehicleSearchQueryResult = Apollo.QueryResult<VehicleSearchQuery, VehicleSearchQueryVariables>;