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
  /** The `Upload` scalar type represents a file upload. */
  Upload: any;
};

export type CompanyClass = {
  __typename?: 'CompanyClass';
  _id: Scalars['ID'];
  createdAt: Scalars['DateTime'];
  isBowMarkConcrete: Scalars['Boolean'];
  isBowMarkPaving: Scalars['Boolean'];
  name: Scalars['String'];
  schemaVersion: Scalars['Float'];
};

export type CompanyCreateData = {
  name: Scalars['String'];
};

export type CrewClass = {
  __typename?: 'CrewClass';
  _id: Scalars['ID'];
  dailyReports: Array<DailyReportClass>;
  employees: Array<EmployeeClass>;
  jobsites: Array<JobsiteClass>;
  name: Scalars['String'];
  schemaVersion: Scalars['Float'];
  type: Scalars['String'];
  vehicles: Array<VehicleClass>;
};

export type CrewCreateData = {
  name: Scalars['String'];
  type: Scalars['String'];
};

export type DailyReportClass = {
  __typename?: 'DailyReportClass';
  _id: Scalars['ID'];
  crew: CrewClass;
  date: Scalars['DateTime'];
  employeeWork: Array<EmployeeWorkClass>;
  jobCostApproved: Scalars['Boolean'];
  jobsite: JobsiteClass;
  materialShipment: Array<MaterialShipmentClass>;
  materialShipments: Array<MaterialShipmentClass>;
  payrollComplete: Scalars['Boolean'];
  production: Array<ProductionClass>;
  productions: Array<ProductionClass>;
  reportNote?: Maybe<ReportNoteClass>;
  schemaVersion: Scalars['Float'];
  temporaryEmployees: Array<EmployeeClass>;
  temporaryVehicles: Array<VehicleClass>;
  vehicleWork: Array<VehicleWorkClass>;
};

export type DailyReportCreateData = {
  crewId: Scalars['String'];
  date: Scalars['DateTime'];
  jobsiteId: Scalars['String'];
};

export type DailyReportListOptionData = {
  crews?: InputMaybe<Array<Scalars['String']>>;
  offset?: InputMaybe<Scalars['Float']>;
  pageLimit?: InputMaybe<Scalars['Float']>;
};

export type DailyReportNoteUpdateData = {
  note: Scalars['String'];
};

export type DailyReportUpdateData = {
  date: Scalars['DateTime'];
  jobsiteId: Scalars['ID'];
};

export type DefaultRateClass = {
  __typename?: 'DefaultRateClass';
  _id?: Maybe<Scalars['ID']>;
  rate: Scalars['Float'];
  title: Scalars['String'];
};

export type DefaultRateData = {
  _id?: InputMaybe<Scalars['ID']>;
  rate: Scalars['Float'];
  title: Scalars['String'];
};

export type EmployeeClass = {
  __typename?: 'EmployeeClass';
  _id: Scalars['ID'];
  crews: Array<CrewClass>;
  jobTitle?: Maybe<Scalars['String']>;
  name: Scalars['String'];
  rates: Array<Rate>;
  schemaVersion: Scalars['Float'];
  signup?: Maybe<SignupClass>;
  user?: Maybe<UserClass>;
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

export type FileClass = {
  __typename?: 'FileClass';
  _id: Scalars['ID'];
  buffer: Scalars['String'];
  createdAt: Scalars['DateTime'];
  description?: Maybe<Scalars['String']>;
  mimetype: Scalars['String'];
  schemaVersion: Scalars['Float'];
};

export type FileCreateData = {
  description?: InputMaybe<Scalars['String']>;
  file: Scalars['Upload'];
};

export type InvoiceClass = {
  __typename?: 'InvoiceClass';
  _id: Scalars['ID'];
  company: CompanyClass;
  cost: Scalars['Float'];
  createdAt: Scalars['DateTime'];
  description?: Maybe<Scalars['String']>;
  internal: Scalars['Boolean'];
  invoiceNumber: Scalars['String'];
  schemaVersion: Scalars['Float'];
};

export type InvoiceData = {
  companyId: Scalars['String'];
  cost: Scalars['Float'];
  description?: InputMaybe<Scalars['String']>;
  internal: Scalars['Boolean'];
  invoiceNumber: Scalars['String'];
};

export type JobsiteClass = {
  __typename?: 'JobsiteClass';
  _id: Scalars['ID'];
  active: Scalars['Boolean'];
  crews: Array<CrewClass>;
  dailyReports: Array<DailyReportClass>;
  description?: Maybe<Scalars['String']>;
  invoices: Array<InvoiceClass>;
  jobcode?: Maybe<Scalars['String']>;
  location_url?: Maybe<Scalars['String']>;
  materials: Array<JobsiteMaterialClass>;
  name: Scalars['String'];
  nonCostedMaterialShipments: Array<MaterialShipmentClass>;
  schemaVersion: Scalars['Float'];
  truckingRates: Array<TruckingRateClass>;
};

export type JobsiteCreateData = {
  description?: InputMaybe<Scalars['String']>;
  jobcode: Scalars['String'];
  name: Scalars['String'];
};

export type JobsiteMaterialClass = {
  __typename?: 'JobsiteMaterialClass';
  _id: Scalars['ID'];
  completedQuantity: Scalars['Float'];
  createdAt: Scalars['DateTime'];
  material: MaterialClass;
  quantity: Scalars['Float'];
  rate: Scalars['Float'];
  schemaVersion: Scalars['Float'];
  supplier: CompanyClass;
  unit: Scalars['String'];
};

export type JobsiteMaterialCreateData = {
  materialId: Scalars['String'];
  quantity: Scalars['Float'];
  rate: Scalars['Float'];
  supplierId: Scalars['String'];
  unit: Scalars['String'];
};

export type JobsiteMaterialUpdateData = {
  quantity: Scalars['Float'];
  rate: Scalars['Float'];
  supplierId: Scalars['String'];
  unit: Scalars['String'];
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

export type MaterialClass = {
  __typename?: 'MaterialClass';
  _id: Scalars['ID'];
  createdAt: Scalars['DateTime'];
  name: Scalars['String'];
  schemaVersion: Scalars['Float'];
};

export type MaterialCreateData = {
  name: Scalars['String'];
};

export type MaterialShipmentClass = {
  __typename?: 'MaterialShipmentClass';
  _id: Scalars['ID'];
  dailyReport: DailyReportClass;
  endTime?: Maybe<Scalars['DateTime']>;
  jobsiteMaterial?: Maybe<JobsiteMaterialClass>;
  noJobsiteMaterial?: Maybe<Scalars['Boolean']>;
  quantity: Scalars['Float'];
  schemaVersion: Scalars['Float'];
  shipmentType?: Maybe<Scalars['String']>;
  startTime?: Maybe<Scalars['DateTime']>;
  supplier?: Maybe<Scalars['String']>;
  unit?: Maybe<Scalars['String']>;
  vehicle?: Maybe<VehicleClass>;
  vehicleObject?: Maybe<VehicleObjectClass>;
};

export type MaterialShipmentCreateData = {
  shipments: Array<MaterialShipmentShipmentData>;
  vehicleObject: MaterialShipmentVehicleObjectData;
};

export type MaterialShipmentShipmentData = {
  endTime?: InputMaybe<Scalars['DateTime']>;
  jobsiteMaterialId?: InputMaybe<Scalars['String']>;
  noJobsiteMaterial: Scalars['Boolean'];
  quantity: Scalars['Float'];
  shipmentType?: InputMaybe<Scalars['String']>;
  startTime?: InputMaybe<Scalars['DateTime']>;
  supplier?: InputMaybe<Scalars['String']>;
  unit?: InputMaybe<Scalars['String']>;
};

export type MaterialShipmentVehicleObjectData = {
  source: Scalars['String'];
  truckingRateId: Scalars['String'];
  vehicleCode: Scalars['String'];
  vehicleType: Scalars['String'];
};

export type Mutation = {
  __typename?: 'Mutation';
  companyCreate: CompanyClass;
  crewAddEmployee: CrewClass;
  crewAddVehicle: CrewClass;
  crewCreate: CrewClass;
  crewRemoveEmployee: CrewClass;
  crewRemoveVehicle: CrewClass;
  dailyReportAddNoteFile: DailyReportClass;
  dailyReportAddTemporaryEmployee: DailyReportClass;
  dailyReportAddTemporaryVehicle: DailyReportClass;
  dailyReportCreate: DailyReportClass;
  dailyReportJobCostApprovalUpdate: DailyReportClass;
  dailyReportNoteUpdate: DailyReportClass;
  dailyReportPayrollCompleteUpdate: DailyReportClass;
  dailyReportUpdate: DailyReportClass;
  employeeCreate: EmployeeClass;
  employeeUpdateRates: EmployeeClass;
  employeeWorkCreate: Array<EmployeeWorkClass>;
  employeeWorkDelete: Scalars['String'];
  employeeWorkUpdate: EmployeeWorkClass;
  invoiceUpdate: InvoiceClass;
  jobsiteAddInvoice: JobsiteClass;
  jobsiteAddMaterial: JobsiteClass;
  jobsiteCreate: JobsiteClass;
  jobsiteMaterialUpdate: JobsiteMaterialClass;
  jobsiteSetTruckingRates: JobsiteClass;
  login: Scalars['String'];
  materialCreate: MaterialClass;
  materialShipmentCreate: Array<MaterialShipmentClass>;
  materialShipmentDelete: Scalars['String'];
  materialShipmentUpdate: MaterialShipmentClass;
  productionCreate: ProductionClass;
  productionDelete: Scalars['String'];
  productionUpdate: ProductionClass;
  reportNoteRemoveFile: ReportNoteClass;
  signup: Scalars['String'];
  signupCreate: SignupClass;
  systemUpdateCompanyVehicleTypeDefaults: SystemClass;
  systemUpdateMaterialShipmentVehicleTypeDefaults: SystemClass;
  systemUpdateUnitDefaults: SystemClass;
  userAdmin: UserClass;
  userPasswordReset: Scalars['Boolean'];
  userPasswordResetRequest: Scalars['Boolean'];
  vehicleCreate: VehicleClass;
  vehicleUpdateRates: VehicleClass;
  vehicleWorkCreate: Array<VehicleWorkClass>;
  vehicleWorkDelete: Scalars['String'];
  vehicleWorkUpdate: VehicleWorkClass;
};


export type MutationCompanyCreateArgs = {
  data: CompanyCreateData;
};


export type MutationCrewAddEmployeeArgs = {
  crewId: Scalars['String'];
  employeeId: Scalars['String'];
};


export type MutationCrewAddVehicleArgs = {
  crewId: Scalars['String'];
  vehicleId: Scalars['String'];
};


export type MutationCrewCreateArgs = {
  data: CrewCreateData;
};


export type MutationCrewRemoveEmployeeArgs = {
  crewId: Scalars['String'];
  employeeId: Scalars['String'];
};


export type MutationCrewRemoveVehicleArgs = {
  crewId: Scalars['String'];
  vehicleId: Scalars['String'];
};


export type MutationDailyReportAddNoteFileArgs = {
  data: FileCreateData;
  id: Scalars['String'];
};


export type MutationDailyReportAddTemporaryEmployeeArgs = {
  employeeId: Scalars['String'];
  id: Scalars['String'];
};


export type MutationDailyReportAddTemporaryVehicleArgs = {
  id: Scalars['String'];
  vehicleId: Scalars['String'];
};


export type MutationDailyReportCreateArgs = {
  data: DailyReportCreateData;
};


export type MutationDailyReportJobCostApprovalUpdateArgs = {
  approved: Scalars['Boolean'];
  id: Scalars['String'];
};


export type MutationDailyReportNoteUpdateArgs = {
  data: DailyReportNoteUpdateData;
  id: Scalars['String'];
};


export type MutationDailyReportPayrollCompleteUpdateArgs = {
  complete: Scalars['Boolean'];
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


export type MutationEmployeeUpdateRatesArgs = {
  data: Array<RatesData>;
  id: Scalars['String'];
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


export type MutationInvoiceUpdateArgs = {
  data: InvoiceData;
  id: Scalars['String'];
};


export type MutationJobsiteAddInvoiceArgs = {
  data: InvoiceData;
  jobsiteId: Scalars['String'];
};


export type MutationJobsiteAddMaterialArgs = {
  data: JobsiteMaterialCreateData;
  jobsiteId: Scalars['String'];
};


export type MutationJobsiteCreateArgs = {
  data: JobsiteCreateData;
};


export type MutationJobsiteMaterialUpdateArgs = {
  data: JobsiteMaterialUpdateData;
  id: Scalars['String'];
};


export type MutationJobsiteSetTruckingRatesArgs = {
  data: Array<TruckingRateData>;
  id: Scalars['String'];
};


export type MutationLoginArgs = {
  data: LoginData;
};


export type MutationMaterialCreateArgs = {
  data: MaterialCreateData;
};


export type MutationMaterialShipmentCreateArgs = {
  dailyReportId: Scalars['String'];
  data: Array<MaterialShipmentCreateData>;
};


export type MutationMaterialShipmentDeleteArgs = {
  id: Scalars['String'];
};


export type MutationMaterialShipmentUpdateArgs = {
  data: MaterialShipmentShipmentData;
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


export type MutationReportNoteRemoveFileArgs = {
  fileId: Scalars['String'];
  reportNoteId: Scalars['String'];
};


export type MutationSignupArgs = {
  data: SignupData;
  signupId: Scalars['String'];
};


export type MutationSignupCreateArgs = {
  employeeId: Scalars['String'];
};


export type MutationSystemUpdateCompanyVehicleTypeDefaultsArgs = {
  data: Array<DefaultRateData>;
};


export type MutationSystemUpdateMaterialShipmentVehicleTypeDefaultsArgs = {
  data: Array<DefaultRateData>;
};


export type MutationSystemUpdateUnitDefaultsArgs = {
  data: Array<Scalars['String']>;
};


export type MutationUserAdminArgs = {
  id: Scalars['String'];
  isAdmin: Scalars['Boolean'];
};


export type MutationUserPasswordResetArgs = {
  password: Scalars['String'];
  token: Scalars['String'];
};


export type MutationUserPasswordResetRequestArgs = {
  email: Scalars['String'];
};


export type MutationVehicleCreateArgs = {
  crewId?: InputMaybe<Scalars['String']>;
  data: VehicleCreateData;
};


export type MutationVehicleUpdateRatesArgs = {
  data: Array<RatesData>;
  id: Scalars['String'];
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
  companies: Array<CompanyClass>;
  company: CompanyClass;
  companySearch: Array<CompanyClass>;
  crew: CrewClass;
  crewList: Array<CrewClass>;
  crewSearch: Array<CrewClass>;
  currentUser: UserClass;
  dailyReport: DailyReportClass;
  dailyReports: Array<DailyReportClass>;
  dailyReportSearch: Array<DailyReportClass>;
  employee: EmployeeClass;
  employeeSearch: Array<EmployeeClass>;
  file: FileClass;
  jobsite: JobsiteClass;
  jobsiteSearch: Array<JobsiteClass>;
  material: MaterialClass;
  materials: Array<MaterialClass>;
  materialSearch: Array<MaterialClass>;
  search: Array<SearchClass>;
  signup: SignupClass;
  system: SystemClass;
  user?: Maybe<UserClass>;
  vehicle: VehicleClass;
  vehicleSearch: Array<VehicleClass>;
};


export type QueryCompaniesArgs = {
  options?: InputMaybe<ListOptionData>;
};


export type QueryCompanyArgs = {
  id: Scalars['String'];
};


export type QueryCompanySearchArgs = {
  options?: InputMaybe<SearchOptions>;
  searchString: Scalars['String'];
};


export type QueryCrewArgs = {
  id: Scalars['String'];
};


export type QueryCrewSearchArgs = {
  options?: InputMaybe<SearchOptions>;
  searchString: Scalars['String'];
};


export type QueryDailyReportArgs = {
  id: Scalars['String'];
};


export type QueryDailyReportsArgs = {
  options?: InputMaybe<DailyReportListOptionData>;
};


export type QueryDailyReportSearchArgs = {
  options?: InputMaybe<SearchOptions>;
  searchString: Scalars['String'];
};


export type QueryEmployeeArgs = {
  id: Scalars['String'];
};


export type QueryEmployeeSearchArgs = {
  options?: InputMaybe<SearchOptions>;
  searchString: Scalars['String'];
};


export type QueryFileArgs = {
  id: Scalars['String'];
};


export type QueryJobsiteArgs = {
  id: Scalars['String'];
};


export type QueryJobsiteSearchArgs = {
  options?: InputMaybe<SearchOptions>;
  searchString: Scalars['String'];
};


export type QueryMaterialArgs = {
  id: Scalars['String'];
};


export type QueryMaterialsArgs = {
  options?: InputMaybe<ListOptionData>;
};


export type QueryMaterialSearchArgs = {
  options?: InputMaybe<SearchOptions>;
  searchString: Scalars['String'];
};


export type QuerySearchArgs = {
  searchString: Scalars['String'];
};


export type QuerySignupArgs = {
  id: Scalars['String'];
};


export type QueryUserArgs = {
  query: UserQuery;
};


export type QueryVehicleArgs = {
  id: Scalars['String'];
};


export type QueryVehicleSearchArgs = {
  options?: InputMaybe<SearchOptions>;
  searchString: Scalars['String'];
};

export type Rate = {
  __typename?: 'Rate';
  _id?: Maybe<Scalars['ID']>;
  date: Scalars['DateTime'];
  rate: Scalars['Float'];
};

export type RatesData = {
  _id?: InputMaybe<Scalars['ID']>;
  date: Scalars['DateTime'];
  rate: Scalars['Float'];
};

export type ReportNoteClass = {
  __typename?: 'ReportNoteClass';
  _id: Scalars['ID'];
  dailyReport: DailyReportClass;
  files: Array<FileClass>;
  note: Scalars['String'];
  schemaVersion: Scalars['Float'];
};

export type SearchClass = {
  __typename?: 'SearchClass';
  crew?: Maybe<CrewClass>;
  dailyReport?: Maybe<DailyReportClass>;
  employee?: Maybe<EmployeeClass>;
  jobsite?: Maybe<JobsiteClass>;
  score: Scalars['Float'];
  vehicle?: Maybe<VehicleClass>;
};

export type SearchOptions = {
  blacklistedIds?: InputMaybe<Array<Scalars['String']>>;
  limit?: InputMaybe<Scalars['Float']>;
};

export type SignupClass = {
  __typename?: 'SignupClass';
  _id: Scalars['ID'];
  createdAt: Scalars['DateTime'];
  employee: EmployeeClass;
  schemaVersion: Scalars['Float'];
};

export type SignupData = {
  email: Scalars['String'];
  name: Scalars['String'];
  password: Scalars['String'];
};

export type SystemClass = {
  __typename?: 'SystemClass';
  _id: Scalars['ID'];
  companyVehicleTypeDefaults: Array<DefaultRateClass>;
  createdAt: Scalars['DateTime'];
  materialShipmentVehicleTypeDefaults: Array<DefaultRateClass>;
  schemaVersion: Scalars['Float'];
  unitDefaults: Array<Scalars['String']>;
};

export type TruckingRateClass = {
  __typename?: 'TruckingRateClass';
  _id?: Maybe<Scalars['ID']>;
  rate: Scalars['Float'];
  title: Scalars['String'];
  type: Scalars['String'];
};

export type TruckingRateData = {
  _id?: InputMaybe<Scalars['ID']>;
  rate: Scalars['Float'];
  title: Scalars['String'];
  type: Scalars['String'];
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
  resetPasswordToken?: Maybe<Scalars['String']>;
  schemaVersion: Scalars['Float'];
};

export type UserQuery = {
  id?: InputMaybe<Scalars['String']>;
  resetPasswordToken?: InputMaybe<Scalars['String']>;
};

export type VehicleClass = {
  __typename?: 'VehicleClass';
  _id: Scalars['ID'];
  crews: Array<CrewClass>;
  name: Scalars['String'];
  rates: Array<Rate>;
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
  truckingRateId?: Maybe<Scalars['ID']>;
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
  vehicle?: Maybe<VehicleClass>;
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

export type CompanyCardSnippetFragment = { __typename?: 'CompanyClass', _id: string, name: string };

export type CrewCardSnippetFragment = { __typename?: 'CrewClass', _id: string, name: string };

export type CrewFullSnippetFragment = { __typename?: 'CrewClass', _id: string, name: string, type: string, employees: Array<{ __typename?: 'EmployeeClass', _id: string, name: string, jobTitle?: string | null, rates: Array<{ __typename?: 'Rate', date: any, rate: number }> }>, vehicles: Array<{ __typename?: 'VehicleClass', _id: string, name: string, vehicleCode: string, vehicleType: string, rates: Array<{ __typename?: 'Rate', date: any, rate: number }> }>, dailyReports: Array<{ __typename?: 'DailyReportClass', _id: string }> };

export type CrewSsrSnippetFragment = { __typename?: 'CrewClass', _id: string, name: string, type: string };

export type DailyReportCardSnippetFragment = { __typename?: 'DailyReportClass', _id: string, date: any, jobCostApproved: boolean, payrollComplete: boolean, jobsite: { __typename?: 'JobsiteClass', _id: string, name: string }, crew: { __typename?: 'CrewClass', _id: string, name: string } };

export type DailyReportFullSnippetFragment = { __typename?: 'DailyReportClass', _id: string, date: any, jobCostApproved: boolean, payrollComplete: boolean, jobsite: { __typename?: 'JobsiteClass', _id: string, name: string, materials: Array<{ __typename?: 'JobsiteMaterialClass', _id: string, quantity: number, completedQuantity: number, unit: string, rate: number, material: { __typename?: 'MaterialClass', _id: string, name: string }, supplier: { __typename?: 'CompanyClass', _id: string, name: string } }>, truckingRates: Array<{ __typename?: 'TruckingRateClass', _id?: string | null, title: string, rate: number, type: string }> }, crew: { __typename?: 'CrewClass', _id: string, name: string, type: string, employees: Array<{ __typename?: 'EmployeeClass', _id: string, name: string, jobTitle?: string | null, rates: Array<{ __typename?: 'Rate', date: any, rate: number }> }>, vehicles: Array<{ __typename?: 'VehicleClass', _id: string, name: string, vehicleCode: string, vehicleType: string, rates: Array<{ __typename?: 'Rate', date: any, rate: number }> }>, dailyReports: Array<{ __typename?: 'DailyReportClass', _id: string }> }, employeeWork: Array<{ __typename?: 'EmployeeWorkClass', _id: string, jobTitle: string, startTime: any, endTime: any, employee: { __typename?: 'EmployeeClass', _id: string, name: string } }>, vehicleWork: Array<{ __typename?: 'VehicleWorkClass', _id: string, hours: number, jobTitle: string, vehicle?: { __typename?: 'VehicleClass', _id: string, name: string } | null }>, productions: Array<{ __typename?: 'ProductionClass', _id: string, jobTitle: string, quantity: number, unit: string, startTime: any, endTime: any, description: string }>, materialShipments: Array<{ __typename?: 'MaterialShipmentClass', _id: string, shipmentType?: string | null, supplier?: string | null, quantity: number, unit?: string | null, startTime?: any | null, endTime?: any | null, noJobsiteMaterial?: boolean | null, schemaVersion: number, jobsiteMaterial?: { __typename?: 'JobsiteMaterialClass', _id: string, quantity: number, completedQuantity: number, unit: string, rate: number, material: { __typename?: 'MaterialClass', _id: string, name: string }, supplier: { __typename?: 'CompanyClass', _id: string, name: string } } | null, vehicleObject?: { __typename?: 'VehicleObjectClass', source?: string | null, vehicleType?: string | null, vehicleCode?: string | null } | null }>, reportNote?: { __typename?: 'ReportNoteClass', _id: string, note: string, files: Array<{ __typename?: 'FileClass', _id: string, mimetype: string, description?: string | null }> } | null, temporaryEmployees: Array<{ __typename?: 'EmployeeClass', _id: string, name: string, jobTitle?: string | null, rates: Array<{ __typename?: 'Rate', date: any, rate: number }> }>, temporaryVehicles: Array<{ __typename?: 'VehicleClass', _id: string, name: string, vehicleCode: string, vehicleType: string, rates: Array<{ __typename?: 'Rate', date: any, rate: number }> }> };

export type DailyReportForMaterialShipmentSnippetFragment = { __typename?: 'DailyReportClass', _id: string, date: any, jobsite: { __typename?: 'JobsiteClass', materials: Array<{ __typename?: 'JobsiteMaterialClass', _id: string, quantity: number, completedQuantity: number, unit: string, rate: number, material: { __typename?: 'MaterialClass', _id: string, name: string }, supplier: { __typename?: 'CompanyClass', _id: string, name: string } }> } };

export type DailyReportPdfSnippetFragment = { __typename?: 'DailyReportClass', date: any, crew: { __typename?: 'CrewClass', name: string }, jobsite: { __typename?: 'JobsiteClass', name: string, jobcode?: string | null }, employeeWork: Array<{ __typename?: 'EmployeeWorkClass', _id: string, jobTitle: string, startTime: any, endTime: any, employee: { __typename?: 'EmployeeClass', _id: string, name: string } }>, vehicleWork: Array<{ __typename?: 'VehicleWorkClass', _id: string, hours: number, jobTitle: string, vehicle?: { __typename?: 'VehicleClass', _id: string, name: string } | null }>, productions: Array<{ __typename?: 'ProductionClass', _id: string, jobTitle: string, quantity: number, unit: string, startTime: any, endTime: any, description: string }>, materialShipments: Array<{ __typename?: 'MaterialShipmentClass', _id: string, shipmentType?: string | null, supplier?: string | null, quantity: number, unit?: string | null, startTime?: any | null, endTime?: any | null, noJobsiteMaterial?: boolean | null, schemaVersion: number, jobsiteMaterial?: { __typename?: 'JobsiteMaterialClass', _id: string, quantity: number, completedQuantity: number, unit: string, rate: number, material: { __typename?: 'MaterialClass', _id: string, name: string }, supplier: { __typename?: 'CompanyClass', _id: string, name: string } } | null, vehicleObject?: { __typename?: 'VehicleObjectClass', source?: string | null, vehicleType?: string | null, vehicleCode?: string | null } | null }>, reportNote?: { __typename?: 'ReportNoteClass', _id: string, note: string, files: Array<{ __typename?: 'FileClass', _id: string, mimetype: string, description?: string | null }> } | null };

export type DailyReportSsrSnippetFragment = { __typename?: 'DailyReportClass', _id: string, jobsite: { __typename?: 'JobsiteClass', _id: string, name: string, jobcode?: string | null }, crew: { __typename?: 'CrewClass', _id: string, name: string } };

export type DefaultRateSnippetFragment = { __typename?: 'DefaultRateClass', _id?: string | null, title: string, rate: number };

export type EmployeeWorkCardSnippetFragment = { __typename?: 'EmployeeWorkClass', _id: string, jobTitle: string, startTime: any, endTime: any, employee: { __typename?: 'EmployeeClass', _id: string, name: string } };

export type EmployeeCardSnippetFragment = { __typename?: 'EmployeeClass', _id: string, name: string, jobTitle?: string | null, rates: Array<{ __typename?: 'Rate', date: any, rate: number }> };

export type EmployeeFullSnippetFragment = { __typename?: 'EmployeeClass', _id: string, name: string, jobTitle?: string | null, user?: { __typename?: 'UserClass', _id: string, name: string, email: string, admin: boolean } | null, crews: Array<{ __typename?: 'CrewClass', _id: string, name: string }>, signup?: { __typename?: 'SignupClass', _id: string } | null, rates: Array<{ __typename?: 'Rate', date: any, rate: number }> };

export type EmployeeSsrSnippetFragment = { __typename?: 'EmployeeClass', _id: string, name: string, jobTitle?: string | null };

export type EmployeeSearchSnippetFragment = { __typename?: 'EmployeeClass', _id: string, name: string };

export type FileFullSnippetFragment = { __typename?: 'FileClass', buffer: string, _id: string, mimetype: string, description?: string | null };

export type FilePreloadSnippetFragment = { __typename?: 'FileClass', _id: string, mimetype: string, description?: string | null };

export type InvoiceCardSnippetFragment = { __typename?: 'InvoiceClass', _id: string, invoiceNumber: string, cost: number, description?: string | null, internal: boolean, company: { __typename?: 'CompanyClass', _id: string, name: string } };

export type JobsiteMaterialCardSnippetFragment = { __typename?: 'JobsiteMaterialClass', _id: string, quantity: number, completedQuantity: number, unit: string, rate: number, material: { __typename?: 'MaterialClass', _id: string, name: string }, supplier: { __typename?: 'CompanyClass', _id: string, name: string } };

export type JobsiteCardSnippetFragment = { __typename?: 'JobsiteClass', _id: string, name: string, jobcode?: string | null };

export type JobsiteForDailyReportSnippetFragment = { __typename?: 'JobsiteClass', _id: string, name: string, materials: Array<{ __typename?: 'JobsiteMaterialClass', _id: string, quantity: number, completedQuantity: number, unit: string, rate: number, material: { __typename?: 'MaterialClass', _id: string, name: string }, supplier: { __typename?: 'CompanyClass', _id: string, name: string } }>, truckingRates: Array<{ __typename?: 'TruckingRateClass', _id?: string | null, title: string, rate: number, type: string }> };

export type JobsiteFullSnippetFragment = { __typename?: 'JobsiteClass', _id: string, name: string, jobcode?: string | null, description?: string | null, location_url?: string | null, active: boolean, crews: Array<{ __typename?: 'CrewClass', _id: string, name: string }>, dailyReports: Array<{ __typename?: 'DailyReportClass', _id: string, date: any, jobCostApproved: boolean, payrollComplete: boolean, jobsite: { __typename?: 'JobsiteClass', _id: string, name: string }, crew: { __typename?: 'CrewClass', _id: string, name: string } }>, materials: Array<{ __typename?: 'JobsiteMaterialClass', _id: string, quantity: number, completedQuantity: number, unit: string, rate: number, material: { __typename?: 'MaterialClass', _id: string, name: string }, supplier: { __typename?: 'CompanyClass', _id: string, name: string } }>, invoices: Array<{ __typename?: 'InvoiceClass', _id: string, invoiceNumber: string, cost: number, description?: string | null, internal: boolean, company: { __typename?: 'CompanyClass', _id: string, name: string } }>, truckingRates: Array<{ __typename?: 'TruckingRateClass', _id?: string | null, title: string, rate: number, type: string }>, nonCostedMaterialShipments: Array<{ __typename?: 'MaterialShipmentClass', _id: string, shipmentType?: string | null, supplier?: string | null, quantity: number, unit?: string | null, startTime?: any | null, endTime?: any | null, noJobsiteMaterial?: boolean | null, schemaVersion: number, dailyReport: { __typename?: 'DailyReportClass', _id: string, date: any, jobsite: { __typename?: 'JobsiteClass', materials: Array<{ __typename?: 'JobsiteMaterialClass', _id: string, quantity: number, completedQuantity: number, unit: string, rate: number, material: { __typename?: 'MaterialClass', _id: string, name: string }, supplier: { __typename?: 'CompanyClass', _id: string, name: string } }> } }, jobsiteMaterial?: { __typename?: 'JobsiteMaterialClass', _id: string, quantity: number, completedQuantity: number, unit: string, rate: number, material: { __typename?: 'MaterialClass', _id: string, name: string }, supplier: { __typename?: 'CompanyClass', _id: string, name: string } } | null, vehicleObject?: { __typename?: 'VehicleObjectClass', source?: string | null, vehicleType?: string | null, vehicleCode?: string | null } | null }> };

export type JobsiteSsrSnippetFragment = { __typename?: 'JobsiteClass', _id: string, name: string, jobcode?: string | null };

export type JobsiteSearchSnippetFragment = { __typename?: 'JobsiteClass', _id: string, name: string, jobcode?: string | null };

export type MaterialShipmentCardSnippetFragment = { __typename?: 'MaterialShipmentClass', _id: string, shipmentType?: string | null, supplier?: string | null, quantity: number, unit?: string | null, startTime?: any | null, endTime?: any | null, noJobsiteMaterial?: boolean | null, schemaVersion: number, jobsiteMaterial?: { __typename?: 'JobsiteMaterialClass', _id: string, quantity: number, completedQuantity: number, unit: string, rate: number, material: { __typename?: 'MaterialClass', _id: string, name: string }, supplier: { __typename?: 'CompanyClass', _id: string, name: string } } | null, vehicleObject?: { __typename?: 'VehicleObjectClass', source?: string | null, vehicleType?: string | null, vehicleCode?: string | null } | null };

export type MaterialShipmentNonCostedSnippetFragment = { __typename?: 'MaterialShipmentClass', _id: string, shipmentType?: string | null, supplier?: string | null, quantity: number, unit?: string | null, startTime?: any | null, endTime?: any | null, noJobsiteMaterial?: boolean | null, schemaVersion: number, dailyReport: { __typename?: 'DailyReportClass', _id: string, date: any, jobsite: { __typename?: 'JobsiteClass', materials: Array<{ __typename?: 'JobsiteMaterialClass', _id: string, quantity: number, completedQuantity: number, unit: string, rate: number, material: { __typename?: 'MaterialClass', _id: string, name: string }, supplier: { __typename?: 'CompanyClass', _id: string, name: string } }> } }, jobsiteMaterial?: { __typename?: 'JobsiteMaterialClass', _id: string, quantity: number, completedQuantity: number, unit: string, rate: number, material: { __typename?: 'MaterialClass', _id: string, name: string }, supplier: { __typename?: 'CompanyClass', _id: string, name: string } } | null, vehicleObject?: { __typename?: 'VehicleObjectClass', source?: string | null, vehicleType?: string | null, vehicleCode?: string | null } | null };

export type MaterialCardSnippetFragment = { __typename?: 'MaterialClass', _id: string, name: string };

export type MaterialFullSnippetFragment = { __typename?: 'MaterialClass', _id: string, name: string };

export type ProductionCardSnippetFragment = { __typename?: 'ProductionClass', _id: string, jobTitle: string, quantity: number, unit: string, startTime: any, endTime: any, description: string };

export type RateSnippetFragment = { __typename?: 'Rate', date: any, rate: number };

export type ReportNoteFullSnippetFragment = { __typename?: 'ReportNoteClass', _id: string, note: string, files: Array<{ __typename?: 'FileClass', _id: string, mimetype: string, description?: string | null }> };

export type SearchSnippetFragment = { __typename?: 'SearchClass', score: number, employee?: { __typename?: 'EmployeeClass', _id: string, name: string, jobTitle?: string | null } | null, vehicle?: { __typename?: 'VehicleClass', _id: string, name: string, vehicleType: string, vehicleCode: string } | null, jobsite?: { __typename?: 'JobsiteClass', _id: string, name: string, jobcode?: string | null } | null, dailyReport?: { __typename?: 'DailyReportClass', _id: string, date: any, jobCostApproved: boolean, payrollComplete: boolean, jobsite: { __typename?: 'JobsiteClass', _id: string, name: string }, crew: { __typename?: 'CrewClass', _id: string, name: string } } | null, crew?: { __typename?: 'CrewClass', _id: string, name: string } | null };

export type SignupFullSnippetFragment = { __typename?: 'SignupClass', _id: string, employee: { __typename?: 'EmployeeClass', _id: string, name: string } };

export type SystemSnippetFragment = { __typename?: 'SystemClass', unitDefaults: Array<string>, companyVehicleTypeDefaults: Array<{ __typename?: 'DefaultRateClass', _id?: string | null, title: string, rate: number }>, materialShipmentVehicleTypeDefaults: Array<{ __typename?: 'DefaultRateClass', _id?: string | null, title: string, rate: number }> };

export type TruckingRateSnippetFragment = { __typename?: 'TruckingRateClass', _id?: string | null, title: string, rate: number, type: string };

export type UserCardSnippetFragment = { __typename?: 'UserClass', _id: string, name: string, email: string, admin: boolean };

export type FullUserSnippetFragment = { __typename?: 'UserClass', _id: string, name: string, email: string, admin: boolean, projectManager: boolean, employee: { __typename?: 'EmployeeClass', _id: string, name: string, jobTitle?: string | null, crews: Array<{ __typename?: 'CrewClass', _id: string, name: string }> } };

export type VehicleWorkCardSnippetFragment = { __typename?: 'VehicleWorkClass', _id: string, hours: number, jobTitle: string, vehicle?: { __typename?: 'VehicleClass', _id: string, name: string } | null };

export type VehicleCardSnippetFragment = { __typename?: 'VehicleClass', _id: string, name: string, vehicleCode: string, vehicleType: string, rates: Array<{ __typename?: 'Rate', date: any, rate: number }> };

export type VehicleFullSnippetFragment = { __typename?: 'VehicleClass', _id: string, name: string, vehicleCode: string, vehicleType: string, crews: Array<{ __typename?: 'CrewClass', _id: string, name: string }>, rates: Array<{ __typename?: 'Rate', date: any, rate: number }> };

export type VehicleSsrSnippetFragment = { __typename?: 'VehicleClass', _id: string, name: string, vehicleCode: string, vehicleType: string };

export type VehicleSearchSnippetFragment = { __typename?: 'VehicleClass', _id: string, name: string, vehicleCode: string, vehicleType: string };

export type CompanyCreateMutationVariables = Exact<{
  data: CompanyCreateData;
}>;


export type CompanyCreateMutation = { __typename?: 'Mutation', companyCreate: { __typename?: 'CompanyClass', _id: string, name: string } };

export type CrewAddEmployeeMutationVariables = Exact<{
  crewId: Scalars['String'];
  employeeId: Scalars['String'];
}>;


export type CrewAddEmployeeMutation = { __typename?: 'Mutation', crewAddEmployee: { __typename?: 'CrewClass', _id: string, name: string, type: string, employees: Array<{ __typename?: 'EmployeeClass', _id: string, name: string, jobTitle?: string | null, rates: Array<{ __typename?: 'Rate', date: any, rate: number }> }>, vehicles: Array<{ __typename?: 'VehicleClass', _id: string, name: string, vehicleCode: string, vehicleType: string, rates: Array<{ __typename?: 'Rate', date: any, rate: number }> }>, dailyReports: Array<{ __typename?: 'DailyReportClass', _id: string }> } };

export type CrewAddVehicleMutationVariables = Exact<{
  crewId: Scalars['String'];
  vehicleId: Scalars['String'];
}>;


export type CrewAddVehicleMutation = { __typename?: 'Mutation', crewAddVehicle: { __typename?: 'CrewClass', _id: string, name: string, type: string, employees: Array<{ __typename?: 'EmployeeClass', _id: string, name: string, jobTitle?: string | null, rates: Array<{ __typename?: 'Rate', date: any, rate: number }> }>, vehicles: Array<{ __typename?: 'VehicleClass', _id: string, name: string, vehicleCode: string, vehicleType: string, rates: Array<{ __typename?: 'Rate', date: any, rate: number }> }>, dailyReports: Array<{ __typename?: 'DailyReportClass', _id: string }> } };

export type CrewCreateMutationVariables = Exact<{
  data: CrewCreateData;
}>;


export type CrewCreateMutation = { __typename?: 'Mutation', crewCreate: { __typename?: 'CrewClass', _id: string, name: string, type: string, employees: Array<{ __typename?: 'EmployeeClass', _id: string, name: string, jobTitle?: string | null, rates: Array<{ __typename?: 'Rate', date: any, rate: number }> }>, vehicles: Array<{ __typename?: 'VehicleClass', _id: string, name: string, vehicleCode: string, vehicleType: string, rates: Array<{ __typename?: 'Rate', date: any, rate: number }> }>, dailyReports: Array<{ __typename?: 'DailyReportClass', _id: string }> } };

export type CrewRemoveEmployeeMutationVariables = Exact<{
  crewId: Scalars['String'];
  employeeId: Scalars['String'];
}>;


export type CrewRemoveEmployeeMutation = { __typename?: 'Mutation', crewRemoveEmployee: { __typename?: 'CrewClass', _id: string, name: string, type: string, employees: Array<{ __typename?: 'EmployeeClass', _id: string, name: string, jobTitle?: string | null, rates: Array<{ __typename?: 'Rate', date: any, rate: number }> }>, vehicles: Array<{ __typename?: 'VehicleClass', _id: string, name: string, vehicleCode: string, vehicleType: string, rates: Array<{ __typename?: 'Rate', date: any, rate: number }> }>, dailyReports: Array<{ __typename?: 'DailyReportClass', _id: string }> } };

export type CrewRemoveVehicleMutationVariables = Exact<{
  crewId: Scalars['String'];
  vehicleId: Scalars['String'];
}>;


export type CrewRemoveVehicleMutation = { __typename?: 'Mutation', crewRemoveVehicle: { __typename?: 'CrewClass', _id: string, name: string, type: string, employees: Array<{ __typename?: 'EmployeeClass', _id: string, name: string, jobTitle?: string | null, rates: Array<{ __typename?: 'Rate', date: any, rate: number }> }>, vehicles: Array<{ __typename?: 'VehicleClass', _id: string, name: string, vehicleCode: string, vehicleType: string, rates: Array<{ __typename?: 'Rate', date: any, rate: number }> }>, dailyReports: Array<{ __typename?: 'DailyReportClass', _id: string }> } };

export type DailyReportAddNoteFileMutationVariables = Exact<{
  dailyReportId: Scalars['String'];
  data: FileCreateData;
}>;


export type DailyReportAddNoteFileMutation = { __typename?: 'Mutation', dailyReportAddNoteFile: { __typename?: 'DailyReportClass', _id: string, date: any, jobCostApproved: boolean, payrollComplete: boolean, jobsite: { __typename?: 'JobsiteClass', _id: string, name: string, materials: Array<{ __typename?: 'JobsiteMaterialClass', _id: string, quantity: number, completedQuantity: number, unit: string, rate: number, material: { __typename?: 'MaterialClass', _id: string, name: string }, supplier: { __typename?: 'CompanyClass', _id: string, name: string } }>, truckingRates: Array<{ __typename?: 'TruckingRateClass', _id?: string | null, title: string, rate: number, type: string }> }, crew: { __typename?: 'CrewClass', _id: string, name: string, type: string, employees: Array<{ __typename?: 'EmployeeClass', _id: string, name: string, jobTitle?: string | null, rates: Array<{ __typename?: 'Rate', date: any, rate: number }> }>, vehicles: Array<{ __typename?: 'VehicleClass', _id: string, name: string, vehicleCode: string, vehicleType: string, rates: Array<{ __typename?: 'Rate', date: any, rate: number }> }>, dailyReports: Array<{ __typename?: 'DailyReportClass', _id: string }> }, employeeWork: Array<{ __typename?: 'EmployeeWorkClass', _id: string, jobTitle: string, startTime: any, endTime: any, employee: { __typename?: 'EmployeeClass', _id: string, name: string } }>, vehicleWork: Array<{ __typename?: 'VehicleWorkClass', _id: string, hours: number, jobTitle: string, vehicle?: { __typename?: 'VehicleClass', _id: string, name: string } | null }>, productions: Array<{ __typename?: 'ProductionClass', _id: string, jobTitle: string, quantity: number, unit: string, startTime: any, endTime: any, description: string }>, materialShipments: Array<{ __typename?: 'MaterialShipmentClass', _id: string, shipmentType?: string | null, supplier?: string | null, quantity: number, unit?: string | null, startTime?: any | null, endTime?: any | null, noJobsiteMaterial?: boolean | null, schemaVersion: number, jobsiteMaterial?: { __typename?: 'JobsiteMaterialClass', _id: string, quantity: number, completedQuantity: number, unit: string, rate: number, material: { __typename?: 'MaterialClass', _id: string, name: string }, supplier: { __typename?: 'CompanyClass', _id: string, name: string } } | null, vehicleObject?: { __typename?: 'VehicleObjectClass', source?: string | null, vehicleType?: string | null, vehicleCode?: string | null } | null }>, reportNote?: { __typename?: 'ReportNoteClass', _id: string, note: string, files: Array<{ __typename?: 'FileClass', _id: string, mimetype: string, description?: string | null }> } | null, temporaryEmployees: Array<{ __typename?: 'EmployeeClass', _id: string, name: string, jobTitle?: string | null, rates: Array<{ __typename?: 'Rate', date: any, rate: number }> }>, temporaryVehicles: Array<{ __typename?: 'VehicleClass', _id: string, name: string, vehicleCode: string, vehicleType: string, rates: Array<{ __typename?: 'Rate', date: any, rate: number }> }> } };

export type DailyReportAddTemporaryEmployeeMutationVariables = Exact<{
  id: Scalars['String'];
  employeeId: Scalars['String'];
}>;


export type DailyReportAddTemporaryEmployeeMutation = { __typename?: 'Mutation', dailyReportAddTemporaryEmployee: { __typename?: 'DailyReportClass', _id: string, date: any, jobCostApproved: boolean, payrollComplete: boolean, jobsite: { __typename?: 'JobsiteClass', _id: string, name: string, materials: Array<{ __typename?: 'JobsiteMaterialClass', _id: string, quantity: number, completedQuantity: number, unit: string, rate: number, material: { __typename?: 'MaterialClass', _id: string, name: string }, supplier: { __typename?: 'CompanyClass', _id: string, name: string } }>, truckingRates: Array<{ __typename?: 'TruckingRateClass', _id?: string | null, title: string, rate: number, type: string }> }, crew: { __typename?: 'CrewClass', _id: string, name: string, type: string, employees: Array<{ __typename?: 'EmployeeClass', _id: string, name: string, jobTitle?: string | null, rates: Array<{ __typename?: 'Rate', date: any, rate: number }> }>, vehicles: Array<{ __typename?: 'VehicleClass', _id: string, name: string, vehicleCode: string, vehicleType: string, rates: Array<{ __typename?: 'Rate', date: any, rate: number }> }>, dailyReports: Array<{ __typename?: 'DailyReportClass', _id: string }> }, employeeWork: Array<{ __typename?: 'EmployeeWorkClass', _id: string, jobTitle: string, startTime: any, endTime: any, employee: { __typename?: 'EmployeeClass', _id: string, name: string } }>, vehicleWork: Array<{ __typename?: 'VehicleWorkClass', _id: string, hours: number, jobTitle: string, vehicle?: { __typename?: 'VehicleClass', _id: string, name: string } | null }>, productions: Array<{ __typename?: 'ProductionClass', _id: string, jobTitle: string, quantity: number, unit: string, startTime: any, endTime: any, description: string }>, materialShipments: Array<{ __typename?: 'MaterialShipmentClass', _id: string, shipmentType?: string | null, supplier?: string | null, quantity: number, unit?: string | null, startTime?: any | null, endTime?: any | null, noJobsiteMaterial?: boolean | null, schemaVersion: number, jobsiteMaterial?: { __typename?: 'JobsiteMaterialClass', _id: string, quantity: number, completedQuantity: number, unit: string, rate: number, material: { __typename?: 'MaterialClass', _id: string, name: string }, supplier: { __typename?: 'CompanyClass', _id: string, name: string } } | null, vehicleObject?: { __typename?: 'VehicleObjectClass', source?: string | null, vehicleType?: string | null, vehicleCode?: string | null } | null }>, reportNote?: { __typename?: 'ReportNoteClass', _id: string, note: string, files: Array<{ __typename?: 'FileClass', _id: string, mimetype: string, description?: string | null }> } | null, temporaryEmployees: Array<{ __typename?: 'EmployeeClass', _id: string, name: string, jobTitle?: string | null, rates: Array<{ __typename?: 'Rate', date: any, rate: number }> }>, temporaryVehicles: Array<{ __typename?: 'VehicleClass', _id: string, name: string, vehicleCode: string, vehicleType: string, rates: Array<{ __typename?: 'Rate', date: any, rate: number }> }> } };

export type DailyReportAddTemporaryVehicleMutationVariables = Exact<{
  id: Scalars['String'];
  vehicleId: Scalars['String'];
}>;


export type DailyReportAddTemporaryVehicleMutation = { __typename?: 'Mutation', dailyReportAddTemporaryVehicle: { __typename?: 'DailyReportClass', _id: string, date: any, jobCostApproved: boolean, payrollComplete: boolean, jobsite: { __typename?: 'JobsiteClass', _id: string, name: string, materials: Array<{ __typename?: 'JobsiteMaterialClass', _id: string, quantity: number, completedQuantity: number, unit: string, rate: number, material: { __typename?: 'MaterialClass', _id: string, name: string }, supplier: { __typename?: 'CompanyClass', _id: string, name: string } }>, truckingRates: Array<{ __typename?: 'TruckingRateClass', _id?: string | null, title: string, rate: number, type: string }> }, crew: { __typename?: 'CrewClass', _id: string, name: string, type: string, employees: Array<{ __typename?: 'EmployeeClass', _id: string, name: string, jobTitle?: string | null, rates: Array<{ __typename?: 'Rate', date: any, rate: number }> }>, vehicles: Array<{ __typename?: 'VehicleClass', _id: string, name: string, vehicleCode: string, vehicleType: string, rates: Array<{ __typename?: 'Rate', date: any, rate: number }> }>, dailyReports: Array<{ __typename?: 'DailyReportClass', _id: string }> }, employeeWork: Array<{ __typename?: 'EmployeeWorkClass', _id: string, jobTitle: string, startTime: any, endTime: any, employee: { __typename?: 'EmployeeClass', _id: string, name: string } }>, vehicleWork: Array<{ __typename?: 'VehicleWorkClass', _id: string, hours: number, jobTitle: string, vehicle?: { __typename?: 'VehicleClass', _id: string, name: string } | null }>, productions: Array<{ __typename?: 'ProductionClass', _id: string, jobTitle: string, quantity: number, unit: string, startTime: any, endTime: any, description: string }>, materialShipments: Array<{ __typename?: 'MaterialShipmentClass', _id: string, shipmentType?: string | null, supplier?: string | null, quantity: number, unit?: string | null, startTime?: any | null, endTime?: any | null, noJobsiteMaterial?: boolean | null, schemaVersion: number, jobsiteMaterial?: { __typename?: 'JobsiteMaterialClass', _id: string, quantity: number, completedQuantity: number, unit: string, rate: number, material: { __typename?: 'MaterialClass', _id: string, name: string }, supplier: { __typename?: 'CompanyClass', _id: string, name: string } } | null, vehicleObject?: { __typename?: 'VehicleObjectClass', source?: string | null, vehicleType?: string | null, vehicleCode?: string | null } | null }>, reportNote?: { __typename?: 'ReportNoteClass', _id: string, note: string, files: Array<{ __typename?: 'FileClass', _id: string, mimetype: string, description?: string | null }> } | null, temporaryEmployees: Array<{ __typename?: 'EmployeeClass', _id: string, name: string, jobTitle?: string | null, rates: Array<{ __typename?: 'Rate', date: any, rate: number }> }>, temporaryVehicles: Array<{ __typename?: 'VehicleClass', _id: string, name: string, vehicleCode: string, vehicleType: string, rates: Array<{ __typename?: 'Rate', date: any, rate: number }> }> } };

export type DailyReportCreateMutationVariables = Exact<{
  data: DailyReportCreateData;
}>;


export type DailyReportCreateMutation = { __typename?: 'Mutation', dailyReportCreate: { __typename?: 'DailyReportClass', _id: string, date: any, jobCostApproved: boolean, payrollComplete: boolean, jobsite: { __typename?: 'JobsiteClass', _id: string, name: string, materials: Array<{ __typename?: 'JobsiteMaterialClass', _id: string, quantity: number, completedQuantity: number, unit: string, rate: number, material: { __typename?: 'MaterialClass', _id: string, name: string }, supplier: { __typename?: 'CompanyClass', _id: string, name: string } }>, truckingRates: Array<{ __typename?: 'TruckingRateClass', _id?: string | null, title: string, rate: number, type: string }> }, crew: { __typename?: 'CrewClass', _id: string, name: string, type: string, employees: Array<{ __typename?: 'EmployeeClass', _id: string, name: string, jobTitle?: string | null, rates: Array<{ __typename?: 'Rate', date: any, rate: number }> }>, vehicles: Array<{ __typename?: 'VehicleClass', _id: string, name: string, vehicleCode: string, vehicleType: string, rates: Array<{ __typename?: 'Rate', date: any, rate: number }> }>, dailyReports: Array<{ __typename?: 'DailyReportClass', _id: string }> }, employeeWork: Array<{ __typename?: 'EmployeeWorkClass', _id: string, jobTitle: string, startTime: any, endTime: any, employee: { __typename?: 'EmployeeClass', _id: string, name: string } }>, vehicleWork: Array<{ __typename?: 'VehicleWorkClass', _id: string, hours: number, jobTitle: string, vehicle?: { __typename?: 'VehicleClass', _id: string, name: string } | null }>, productions: Array<{ __typename?: 'ProductionClass', _id: string, jobTitle: string, quantity: number, unit: string, startTime: any, endTime: any, description: string }>, materialShipments: Array<{ __typename?: 'MaterialShipmentClass', _id: string, shipmentType?: string | null, supplier?: string | null, quantity: number, unit?: string | null, startTime?: any | null, endTime?: any | null, noJobsiteMaterial?: boolean | null, schemaVersion: number, jobsiteMaterial?: { __typename?: 'JobsiteMaterialClass', _id: string, quantity: number, completedQuantity: number, unit: string, rate: number, material: { __typename?: 'MaterialClass', _id: string, name: string }, supplier: { __typename?: 'CompanyClass', _id: string, name: string } } | null, vehicleObject?: { __typename?: 'VehicleObjectClass', source?: string | null, vehicleType?: string | null, vehicleCode?: string | null } | null }>, reportNote?: { __typename?: 'ReportNoteClass', _id: string, note: string, files: Array<{ __typename?: 'FileClass', _id: string, mimetype: string, description?: string | null }> } | null, temporaryEmployees: Array<{ __typename?: 'EmployeeClass', _id: string, name: string, jobTitle?: string | null, rates: Array<{ __typename?: 'Rate', date: any, rate: number }> }>, temporaryVehicles: Array<{ __typename?: 'VehicleClass', _id: string, name: string, vehicleCode: string, vehicleType: string, rates: Array<{ __typename?: 'Rate', date: any, rate: number }> }> } };

export type DailyReportJobCostApprovalUpdateMutationVariables = Exact<{
  id: Scalars['String'];
  approved: Scalars['Boolean'];
}>;


export type DailyReportJobCostApprovalUpdateMutation = { __typename?: 'Mutation', dailyReportJobCostApprovalUpdate: { __typename?: 'DailyReportClass', _id: string, date: any, jobCostApproved: boolean, payrollComplete: boolean, jobsite: { __typename?: 'JobsiteClass', _id: string, name: string, materials: Array<{ __typename?: 'JobsiteMaterialClass', _id: string, quantity: number, completedQuantity: number, unit: string, rate: number, material: { __typename?: 'MaterialClass', _id: string, name: string }, supplier: { __typename?: 'CompanyClass', _id: string, name: string } }>, truckingRates: Array<{ __typename?: 'TruckingRateClass', _id?: string | null, title: string, rate: number, type: string }> }, crew: { __typename?: 'CrewClass', _id: string, name: string, type: string, employees: Array<{ __typename?: 'EmployeeClass', _id: string, name: string, jobTitle?: string | null, rates: Array<{ __typename?: 'Rate', date: any, rate: number }> }>, vehicles: Array<{ __typename?: 'VehicleClass', _id: string, name: string, vehicleCode: string, vehicleType: string, rates: Array<{ __typename?: 'Rate', date: any, rate: number }> }>, dailyReports: Array<{ __typename?: 'DailyReportClass', _id: string }> }, employeeWork: Array<{ __typename?: 'EmployeeWorkClass', _id: string, jobTitle: string, startTime: any, endTime: any, employee: { __typename?: 'EmployeeClass', _id: string, name: string } }>, vehicleWork: Array<{ __typename?: 'VehicleWorkClass', _id: string, hours: number, jobTitle: string, vehicle?: { __typename?: 'VehicleClass', _id: string, name: string } | null }>, productions: Array<{ __typename?: 'ProductionClass', _id: string, jobTitle: string, quantity: number, unit: string, startTime: any, endTime: any, description: string }>, materialShipments: Array<{ __typename?: 'MaterialShipmentClass', _id: string, shipmentType?: string | null, supplier?: string | null, quantity: number, unit?: string | null, startTime?: any | null, endTime?: any | null, noJobsiteMaterial?: boolean | null, schemaVersion: number, jobsiteMaterial?: { __typename?: 'JobsiteMaterialClass', _id: string, quantity: number, completedQuantity: number, unit: string, rate: number, material: { __typename?: 'MaterialClass', _id: string, name: string }, supplier: { __typename?: 'CompanyClass', _id: string, name: string } } | null, vehicleObject?: { __typename?: 'VehicleObjectClass', source?: string | null, vehicleType?: string | null, vehicleCode?: string | null } | null }>, reportNote?: { __typename?: 'ReportNoteClass', _id: string, note: string, files: Array<{ __typename?: 'FileClass', _id: string, mimetype: string, description?: string | null }> } | null, temporaryEmployees: Array<{ __typename?: 'EmployeeClass', _id: string, name: string, jobTitle?: string | null, rates: Array<{ __typename?: 'Rate', date: any, rate: number }> }>, temporaryVehicles: Array<{ __typename?: 'VehicleClass', _id: string, name: string, vehicleCode: string, vehicleType: string, rates: Array<{ __typename?: 'Rate', date: any, rate: number }> }> } };

export type DailyReportNoteUpdateMutationVariables = Exact<{
  id: Scalars['String'];
  data: DailyReportNoteUpdateData;
}>;


export type DailyReportNoteUpdateMutation = { __typename?: 'Mutation', dailyReportNoteUpdate: { __typename?: 'DailyReportClass', _id: string, date: any, jobCostApproved: boolean, payrollComplete: boolean, jobsite: { __typename?: 'JobsiteClass', _id: string, name: string, materials: Array<{ __typename?: 'JobsiteMaterialClass', _id: string, quantity: number, completedQuantity: number, unit: string, rate: number, material: { __typename?: 'MaterialClass', _id: string, name: string }, supplier: { __typename?: 'CompanyClass', _id: string, name: string } }>, truckingRates: Array<{ __typename?: 'TruckingRateClass', _id?: string | null, title: string, rate: number, type: string }> }, crew: { __typename?: 'CrewClass', _id: string, name: string, type: string, employees: Array<{ __typename?: 'EmployeeClass', _id: string, name: string, jobTitle?: string | null, rates: Array<{ __typename?: 'Rate', date: any, rate: number }> }>, vehicles: Array<{ __typename?: 'VehicleClass', _id: string, name: string, vehicleCode: string, vehicleType: string, rates: Array<{ __typename?: 'Rate', date: any, rate: number }> }>, dailyReports: Array<{ __typename?: 'DailyReportClass', _id: string }> }, employeeWork: Array<{ __typename?: 'EmployeeWorkClass', _id: string, jobTitle: string, startTime: any, endTime: any, employee: { __typename?: 'EmployeeClass', _id: string, name: string } }>, vehicleWork: Array<{ __typename?: 'VehicleWorkClass', _id: string, hours: number, jobTitle: string, vehicle?: { __typename?: 'VehicleClass', _id: string, name: string } | null }>, productions: Array<{ __typename?: 'ProductionClass', _id: string, jobTitle: string, quantity: number, unit: string, startTime: any, endTime: any, description: string }>, materialShipments: Array<{ __typename?: 'MaterialShipmentClass', _id: string, shipmentType?: string | null, supplier?: string | null, quantity: number, unit?: string | null, startTime?: any | null, endTime?: any | null, noJobsiteMaterial?: boolean | null, schemaVersion: number, jobsiteMaterial?: { __typename?: 'JobsiteMaterialClass', _id: string, quantity: number, completedQuantity: number, unit: string, rate: number, material: { __typename?: 'MaterialClass', _id: string, name: string }, supplier: { __typename?: 'CompanyClass', _id: string, name: string } } | null, vehicleObject?: { __typename?: 'VehicleObjectClass', source?: string | null, vehicleType?: string | null, vehicleCode?: string | null } | null }>, reportNote?: { __typename?: 'ReportNoteClass', _id: string, note: string, files: Array<{ __typename?: 'FileClass', _id: string, mimetype: string, description?: string | null }> } | null, temporaryEmployees: Array<{ __typename?: 'EmployeeClass', _id: string, name: string, jobTitle?: string | null, rates: Array<{ __typename?: 'Rate', date: any, rate: number }> }>, temporaryVehicles: Array<{ __typename?: 'VehicleClass', _id: string, name: string, vehicleCode: string, vehicleType: string, rates: Array<{ __typename?: 'Rate', date: any, rate: number }> }> } };

export type DailyReportPayrollCompleteUpdateMutationVariables = Exact<{
  id: Scalars['String'];
  complete: Scalars['Boolean'];
}>;


export type DailyReportPayrollCompleteUpdateMutation = { __typename?: 'Mutation', dailyReportPayrollCompleteUpdate: { __typename?: 'DailyReportClass', _id: string, date: any, jobCostApproved: boolean, payrollComplete: boolean, jobsite: { __typename?: 'JobsiteClass', _id: string, name: string, materials: Array<{ __typename?: 'JobsiteMaterialClass', _id: string, quantity: number, completedQuantity: number, unit: string, rate: number, material: { __typename?: 'MaterialClass', _id: string, name: string }, supplier: { __typename?: 'CompanyClass', _id: string, name: string } }>, truckingRates: Array<{ __typename?: 'TruckingRateClass', _id?: string | null, title: string, rate: number, type: string }> }, crew: { __typename?: 'CrewClass', _id: string, name: string, type: string, employees: Array<{ __typename?: 'EmployeeClass', _id: string, name: string, jobTitle?: string | null, rates: Array<{ __typename?: 'Rate', date: any, rate: number }> }>, vehicles: Array<{ __typename?: 'VehicleClass', _id: string, name: string, vehicleCode: string, vehicleType: string, rates: Array<{ __typename?: 'Rate', date: any, rate: number }> }>, dailyReports: Array<{ __typename?: 'DailyReportClass', _id: string }> }, employeeWork: Array<{ __typename?: 'EmployeeWorkClass', _id: string, jobTitle: string, startTime: any, endTime: any, employee: { __typename?: 'EmployeeClass', _id: string, name: string } }>, vehicleWork: Array<{ __typename?: 'VehicleWorkClass', _id: string, hours: number, jobTitle: string, vehicle?: { __typename?: 'VehicleClass', _id: string, name: string } | null }>, productions: Array<{ __typename?: 'ProductionClass', _id: string, jobTitle: string, quantity: number, unit: string, startTime: any, endTime: any, description: string }>, materialShipments: Array<{ __typename?: 'MaterialShipmentClass', _id: string, shipmentType?: string | null, supplier?: string | null, quantity: number, unit?: string | null, startTime?: any | null, endTime?: any | null, noJobsiteMaterial?: boolean | null, schemaVersion: number, jobsiteMaterial?: { __typename?: 'JobsiteMaterialClass', _id: string, quantity: number, completedQuantity: number, unit: string, rate: number, material: { __typename?: 'MaterialClass', _id: string, name: string }, supplier: { __typename?: 'CompanyClass', _id: string, name: string } } | null, vehicleObject?: { __typename?: 'VehicleObjectClass', source?: string | null, vehicleType?: string | null, vehicleCode?: string | null } | null }>, reportNote?: { __typename?: 'ReportNoteClass', _id: string, note: string, files: Array<{ __typename?: 'FileClass', _id: string, mimetype: string, description?: string | null }> } | null, temporaryEmployees: Array<{ __typename?: 'EmployeeClass', _id: string, name: string, jobTitle?: string | null, rates: Array<{ __typename?: 'Rate', date: any, rate: number }> }>, temporaryVehicles: Array<{ __typename?: 'VehicleClass', _id: string, name: string, vehicleCode: string, vehicleType: string, rates: Array<{ __typename?: 'Rate', date: any, rate: number }> }> } };

export type DailyReportUpdateMutationVariables = Exact<{
  id: Scalars['String'];
  data: DailyReportUpdateData;
}>;


export type DailyReportUpdateMutation = { __typename?: 'Mutation', dailyReportUpdate: { __typename?: 'DailyReportClass', _id: string, date: any, jobCostApproved: boolean, payrollComplete: boolean, jobsite: { __typename?: 'JobsiteClass', _id: string, name: string, materials: Array<{ __typename?: 'JobsiteMaterialClass', _id: string, quantity: number, completedQuantity: number, unit: string, rate: number, material: { __typename?: 'MaterialClass', _id: string, name: string }, supplier: { __typename?: 'CompanyClass', _id: string, name: string } }>, truckingRates: Array<{ __typename?: 'TruckingRateClass', _id?: string | null, title: string, rate: number, type: string }> }, crew: { __typename?: 'CrewClass', _id: string, name: string, type: string, employees: Array<{ __typename?: 'EmployeeClass', _id: string, name: string, jobTitle?: string | null, rates: Array<{ __typename?: 'Rate', date: any, rate: number }> }>, vehicles: Array<{ __typename?: 'VehicleClass', _id: string, name: string, vehicleCode: string, vehicleType: string, rates: Array<{ __typename?: 'Rate', date: any, rate: number }> }>, dailyReports: Array<{ __typename?: 'DailyReportClass', _id: string }> }, employeeWork: Array<{ __typename?: 'EmployeeWorkClass', _id: string, jobTitle: string, startTime: any, endTime: any, employee: { __typename?: 'EmployeeClass', _id: string, name: string } }>, vehicleWork: Array<{ __typename?: 'VehicleWorkClass', _id: string, hours: number, jobTitle: string, vehicle?: { __typename?: 'VehicleClass', _id: string, name: string } | null }>, productions: Array<{ __typename?: 'ProductionClass', _id: string, jobTitle: string, quantity: number, unit: string, startTime: any, endTime: any, description: string }>, materialShipments: Array<{ __typename?: 'MaterialShipmentClass', _id: string, shipmentType?: string | null, supplier?: string | null, quantity: number, unit?: string | null, startTime?: any | null, endTime?: any | null, noJobsiteMaterial?: boolean | null, schemaVersion: number, jobsiteMaterial?: { __typename?: 'JobsiteMaterialClass', _id: string, quantity: number, completedQuantity: number, unit: string, rate: number, material: { __typename?: 'MaterialClass', _id: string, name: string }, supplier: { __typename?: 'CompanyClass', _id: string, name: string } } | null, vehicleObject?: { __typename?: 'VehicleObjectClass', source?: string | null, vehicleType?: string | null, vehicleCode?: string | null } | null }>, reportNote?: { __typename?: 'ReportNoteClass', _id: string, note: string, files: Array<{ __typename?: 'FileClass', _id: string, mimetype: string, description?: string | null }> } | null, temporaryEmployees: Array<{ __typename?: 'EmployeeClass', _id: string, name: string, jobTitle?: string | null, rates: Array<{ __typename?: 'Rate', date: any, rate: number }> }>, temporaryVehicles: Array<{ __typename?: 'VehicleClass', _id: string, name: string, vehicleCode: string, vehicleType: string, rates: Array<{ __typename?: 'Rate', date: any, rate: number }> }> } };

export type EmployeeCreateMutationVariables = Exact<{
  data: EmployeeCreateData;
  crewId?: InputMaybe<Scalars['String']>;
}>;


export type EmployeeCreateMutation = { __typename?: 'Mutation', employeeCreate: { __typename?: 'EmployeeClass', _id: string, name: string, jobTitle?: string | null, rates: Array<{ __typename?: 'Rate', date: any, rate: number }> } };

export type EmployeeUpdateRatesMutationVariables = Exact<{
  id: Scalars['String'];
  data: Array<RatesData> | RatesData;
}>;


export type EmployeeUpdateRatesMutation = { __typename?: 'Mutation', employeeUpdateRates: { __typename?: 'EmployeeClass', _id: string, name: string, jobTitle?: string | null, rates: Array<{ __typename?: 'Rate', date: any, rate: number }> } };

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

export type InvoiceUpdateMutationVariables = Exact<{
  id: Scalars['String'];
  data: InvoiceData;
}>;


export type InvoiceUpdateMutation = { __typename?: 'Mutation', invoiceUpdate: { __typename?: 'InvoiceClass', _id: string, invoiceNumber: string, cost: number, description?: string | null, internal: boolean, company: { __typename?: 'CompanyClass', _id: string, name: string } } };

export type JobsiteAddInvoiceMutationVariables = Exact<{
  jobsiteId: Scalars['String'];
  data: InvoiceData;
}>;


export type JobsiteAddInvoiceMutation = { __typename?: 'Mutation', jobsiteAddInvoice: { __typename?: 'JobsiteClass', _id: string, name: string, jobcode?: string | null, description?: string | null, location_url?: string | null, active: boolean, crews: Array<{ __typename?: 'CrewClass', _id: string, name: string }>, dailyReports: Array<{ __typename?: 'DailyReportClass', _id: string, date: any, jobCostApproved: boolean, payrollComplete: boolean, jobsite: { __typename?: 'JobsiteClass', _id: string, name: string }, crew: { __typename?: 'CrewClass', _id: string, name: string } }>, materials: Array<{ __typename?: 'JobsiteMaterialClass', _id: string, quantity: number, completedQuantity: number, unit: string, rate: number, material: { __typename?: 'MaterialClass', _id: string, name: string }, supplier: { __typename?: 'CompanyClass', _id: string, name: string } }>, invoices: Array<{ __typename?: 'InvoiceClass', _id: string, invoiceNumber: string, cost: number, description?: string | null, internal: boolean, company: { __typename?: 'CompanyClass', _id: string, name: string } }>, truckingRates: Array<{ __typename?: 'TruckingRateClass', _id?: string | null, title: string, rate: number, type: string }>, nonCostedMaterialShipments: Array<{ __typename?: 'MaterialShipmentClass', _id: string, shipmentType?: string | null, supplier?: string | null, quantity: number, unit?: string | null, startTime?: any | null, endTime?: any | null, noJobsiteMaterial?: boolean | null, schemaVersion: number, dailyReport: { __typename?: 'DailyReportClass', _id: string, date: any, jobsite: { __typename?: 'JobsiteClass', materials: Array<{ __typename?: 'JobsiteMaterialClass', _id: string, quantity: number, completedQuantity: number, unit: string, rate: number, material: { __typename?: 'MaterialClass', _id: string, name: string }, supplier: { __typename?: 'CompanyClass', _id: string, name: string } }> } }, jobsiteMaterial?: { __typename?: 'JobsiteMaterialClass', _id: string, quantity: number, completedQuantity: number, unit: string, rate: number, material: { __typename?: 'MaterialClass', _id: string, name: string }, supplier: { __typename?: 'CompanyClass', _id: string, name: string } } | null, vehicleObject?: { __typename?: 'VehicleObjectClass', source?: string | null, vehicleType?: string | null, vehicleCode?: string | null } | null }> } };

export type JobsiteAddMaterialMutationVariables = Exact<{
  jobsiteId: Scalars['String'];
  data: JobsiteMaterialCreateData;
}>;


export type JobsiteAddMaterialMutation = { __typename?: 'Mutation', jobsiteAddMaterial: { __typename?: 'JobsiteClass', _id: string, name: string, jobcode?: string | null, description?: string | null, location_url?: string | null, active: boolean, crews: Array<{ __typename?: 'CrewClass', _id: string, name: string }>, dailyReports: Array<{ __typename?: 'DailyReportClass', _id: string, date: any, jobCostApproved: boolean, payrollComplete: boolean, jobsite: { __typename?: 'JobsiteClass', _id: string, name: string }, crew: { __typename?: 'CrewClass', _id: string, name: string } }>, materials: Array<{ __typename?: 'JobsiteMaterialClass', _id: string, quantity: number, completedQuantity: number, unit: string, rate: number, material: { __typename?: 'MaterialClass', _id: string, name: string }, supplier: { __typename?: 'CompanyClass', _id: string, name: string } }>, invoices: Array<{ __typename?: 'InvoiceClass', _id: string, invoiceNumber: string, cost: number, description?: string | null, internal: boolean, company: { __typename?: 'CompanyClass', _id: string, name: string } }>, truckingRates: Array<{ __typename?: 'TruckingRateClass', _id?: string | null, title: string, rate: number, type: string }>, nonCostedMaterialShipments: Array<{ __typename?: 'MaterialShipmentClass', _id: string, shipmentType?: string | null, supplier?: string | null, quantity: number, unit?: string | null, startTime?: any | null, endTime?: any | null, noJobsiteMaterial?: boolean | null, schemaVersion: number, dailyReport: { __typename?: 'DailyReportClass', _id: string, date: any, jobsite: { __typename?: 'JobsiteClass', materials: Array<{ __typename?: 'JobsiteMaterialClass', _id: string, quantity: number, completedQuantity: number, unit: string, rate: number, material: { __typename?: 'MaterialClass', _id: string, name: string }, supplier: { __typename?: 'CompanyClass', _id: string, name: string } }> } }, jobsiteMaterial?: { __typename?: 'JobsiteMaterialClass', _id: string, quantity: number, completedQuantity: number, unit: string, rate: number, material: { __typename?: 'MaterialClass', _id: string, name: string }, supplier: { __typename?: 'CompanyClass', _id: string, name: string } } | null, vehicleObject?: { __typename?: 'VehicleObjectClass', source?: string | null, vehicleType?: string | null, vehicleCode?: string | null } | null }> } };

export type JobsiteCreateMutationVariables = Exact<{
  data: JobsiteCreateData;
}>;


export type JobsiteCreateMutation = { __typename?: 'Mutation', jobsiteCreate: { __typename?: 'JobsiteClass', _id: string, name: string, jobcode?: string | null, description?: string | null, location_url?: string | null, active: boolean, crews: Array<{ __typename?: 'CrewClass', _id: string, name: string }>, dailyReports: Array<{ __typename?: 'DailyReportClass', _id: string, date: any, jobCostApproved: boolean, payrollComplete: boolean, jobsite: { __typename?: 'JobsiteClass', _id: string, name: string }, crew: { __typename?: 'CrewClass', _id: string, name: string } }>, materials: Array<{ __typename?: 'JobsiteMaterialClass', _id: string, quantity: number, completedQuantity: number, unit: string, rate: number, material: { __typename?: 'MaterialClass', _id: string, name: string }, supplier: { __typename?: 'CompanyClass', _id: string, name: string } }>, invoices: Array<{ __typename?: 'InvoiceClass', _id: string, invoiceNumber: string, cost: number, description?: string | null, internal: boolean, company: { __typename?: 'CompanyClass', _id: string, name: string } }>, truckingRates: Array<{ __typename?: 'TruckingRateClass', _id?: string | null, title: string, rate: number, type: string }>, nonCostedMaterialShipments: Array<{ __typename?: 'MaterialShipmentClass', _id: string, shipmentType?: string | null, supplier?: string | null, quantity: number, unit?: string | null, startTime?: any | null, endTime?: any | null, noJobsiteMaterial?: boolean | null, schemaVersion: number, dailyReport: { __typename?: 'DailyReportClass', _id: string, date: any, jobsite: { __typename?: 'JobsiteClass', materials: Array<{ __typename?: 'JobsiteMaterialClass', _id: string, quantity: number, completedQuantity: number, unit: string, rate: number, material: { __typename?: 'MaterialClass', _id: string, name: string }, supplier: { __typename?: 'CompanyClass', _id: string, name: string } }> } }, jobsiteMaterial?: { __typename?: 'JobsiteMaterialClass', _id: string, quantity: number, completedQuantity: number, unit: string, rate: number, material: { __typename?: 'MaterialClass', _id: string, name: string }, supplier: { __typename?: 'CompanyClass', _id: string, name: string } } | null, vehicleObject?: { __typename?: 'VehicleObjectClass', source?: string | null, vehicleType?: string | null, vehicleCode?: string | null } | null }> } };

export type JobsiteMaterialUpdateMutationVariables = Exact<{
  id: Scalars['String'];
  data: JobsiteMaterialUpdateData;
}>;


export type JobsiteMaterialUpdateMutation = { __typename?: 'Mutation', jobsiteMaterialUpdate: { __typename?: 'JobsiteMaterialClass', _id: string, quantity: number, completedQuantity: number, unit: string, rate: number, material: { __typename?: 'MaterialClass', _id: string, name: string }, supplier: { __typename?: 'CompanyClass', _id: string, name: string } } };

export type JobsiteSetTruckingRatesMutationVariables = Exact<{
  id: Scalars['String'];
  data: Array<TruckingRateData> | TruckingRateData;
}>;


export type JobsiteSetTruckingRatesMutation = { __typename?: 'Mutation', jobsiteSetTruckingRates: { __typename?: 'JobsiteClass', _id: string, name: string, jobcode?: string | null, description?: string | null, location_url?: string | null, active: boolean, crews: Array<{ __typename?: 'CrewClass', _id: string, name: string }>, dailyReports: Array<{ __typename?: 'DailyReportClass', _id: string, date: any, jobCostApproved: boolean, payrollComplete: boolean, jobsite: { __typename?: 'JobsiteClass', _id: string, name: string }, crew: { __typename?: 'CrewClass', _id: string, name: string } }>, materials: Array<{ __typename?: 'JobsiteMaterialClass', _id: string, quantity: number, completedQuantity: number, unit: string, rate: number, material: { __typename?: 'MaterialClass', _id: string, name: string }, supplier: { __typename?: 'CompanyClass', _id: string, name: string } }>, invoices: Array<{ __typename?: 'InvoiceClass', _id: string, invoiceNumber: string, cost: number, description?: string | null, internal: boolean, company: { __typename?: 'CompanyClass', _id: string, name: string } }>, truckingRates: Array<{ __typename?: 'TruckingRateClass', _id?: string | null, title: string, rate: number, type: string }>, nonCostedMaterialShipments: Array<{ __typename?: 'MaterialShipmentClass', _id: string, shipmentType?: string | null, supplier?: string | null, quantity: number, unit?: string | null, startTime?: any | null, endTime?: any | null, noJobsiteMaterial?: boolean | null, schemaVersion: number, dailyReport: { __typename?: 'DailyReportClass', _id: string, date: any, jobsite: { __typename?: 'JobsiteClass', materials: Array<{ __typename?: 'JobsiteMaterialClass', _id: string, quantity: number, completedQuantity: number, unit: string, rate: number, material: { __typename?: 'MaterialClass', _id: string, name: string }, supplier: { __typename?: 'CompanyClass', _id: string, name: string } }> } }, jobsiteMaterial?: { __typename?: 'JobsiteMaterialClass', _id: string, quantity: number, completedQuantity: number, unit: string, rate: number, material: { __typename?: 'MaterialClass', _id: string, name: string }, supplier: { __typename?: 'CompanyClass', _id: string, name: string } } | null, vehicleObject?: { __typename?: 'VehicleObjectClass', source?: string | null, vehicleType?: string | null, vehicleCode?: string | null } | null }> } };

export type LoginMutationVariables = Exact<{
  data: LoginData;
}>;


export type LoginMutation = { __typename?: 'Mutation', login: string };

export type MaterialCreateMutationVariables = Exact<{
  data: MaterialCreateData;
}>;


export type MaterialCreateMutation = { __typename?: 'Mutation', materialCreate: { __typename?: 'MaterialClass', _id: string, name: string } };

export type MaterialShipmentCreateMutationVariables = Exact<{
  dailyReportId: Scalars['String'];
  data: Array<MaterialShipmentCreateData> | MaterialShipmentCreateData;
}>;


export type MaterialShipmentCreateMutation = { __typename?: 'Mutation', materialShipmentCreate: Array<{ __typename?: 'MaterialShipmentClass', _id: string, shipmentType?: string | null, supplier?: string | null, quantity: number, unit?: string | null, startTime?: any | null, endTime?: any | null, noJobsiteMaterial?: boolean | null, schemaVersion: number, jobsiteMaterial?: { __typename?: 'JobsiteMaterialClass', _id: string, quantity: number, completedQuantity: number, unit: string, rate: number, material: { __typename?: 'MaterialClass', _id: string, name: string }, supplier: { __typename?: 'CompanyClass', _id: string, name: string } } | null, vehicleObject?: { __typename?: 'VehicleObjectClass', source?: string | null, vehicleType?: string | null, vehicleCode?: string | null } | null }> };

export type MaterialShipmentDeleteMutationVariables = Exact<{
  id: Scalars['String'];
}>;


export type MaterialShipmentDeleteMutation = { __typename?: 'Mutation', materialShipmentDelete: string };

export type MaterialShipmentUpdateMutationVariables = Exact<{
  id: Scalars['String'];
  data: MaterialShipmentShipmentData;
}>;


export type MaterialShipmentUpdateMutation = { __typename?: 'Mutation', materialShipmentUpdate: { __typename?: 'MaterialShipmentClass', _id: string, shipmentType?: string | null, supplier?: string | null, quantity: number, unit?: string | null, startTime?: any | null, endTime?: any | null, noJobsiteMaterial?: boolean | null, schemaVersion: number, jobsiteMaterial?: { __typename?: 'JobsiteMaterialClass', _id: string, quantity: number, completedQuantity: number, unit: string, rate: number, material: { __typename?: 'MaterialClass', _id: string, name: string }, supplier: { __typename?: 'CompanyClass', _id: string, name: string } } | null, vehicleObject?: { __typename?: 'VehicleObjectClass', source?: string | null, vehicleType?: string | null, vehicleCode?: string | null } | null } };

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

export type ReportNoteRemoveFileMutationVariables = Exact<{
  reportNoteId: Scalars['String'];
  fileId: Scalars['String'];
}>;


export type ReportNoteRemoveFileMutation = { __typename?: 'Mutation', reportNoteRemoveFile: { __typename?: 'ReportNoteClass', _id: string, note: string, files: Array<{ __typename?: 'FileClass', _id: string, mimetype: string, description?: string | null }> } };

export type SignupMutationVariables = Exact<{
  signupId: Scalars['String'];
  data: SignupData;
}>;


export type SignupMutation = { __typename?: 'Mutation', signup: string };

export type SignupCreateMutationVariables = Exact<{
  employeeId: Scalars['String'];
}>;


export type SignupCreateMutation = { __typename?: 'Mutation', signupCreate: { __typename?: 'SignupClass', _id: string } };

export type SystemUpdateCompanyVehicleTypeDefaultsMutationVariables = Exact<{
  data: Array<DefaultRateData> | DefaultRateData;
}>;


export type SystemUpdateCompanyVehicleTypeDefaultsMutation = { __typename?: 'Mutation', systemUpdateCompanyVehicleTypeDefaults: { __typename?: 'SystemClass', unitDefaults: Array<string>, companyVehicleTypeDefaults: Array<{ __typename?: 'DefaultRateClass', _id?: string | null, title: string, rate: number }>, materialShipmentVehicleTypeDefaults: Array<{ __typename?: 'DefaultRateClass', _id?: string | null, title: string, rate: number }> } };

export type SystemUpdateMaterialShipmentVehicleTypeDefaultsMutationVariables = Exact<{
  data: Array<DefaultRateData> | DefaultRateData;
}>;


export type SystemUpdateMaterialShipmentVehicleTypeDefaultsMutation = { __typename?: 'Mutation', systemUpdateMaterialShipmentVehicleTypeDefaults: { __typename?: 'SystemClass', unitDefaults: Array<string>, companyVehicleTypeDefaults: Array<{ __typename?: 'DefaultRateClass', _id?: string | null, title: string, rate: number }>, materialShipmentVehicleTypeDefaults: Array<{ __typename?: 'DefaultRateClass', _id?: string | null, title: string, rate: number }> } };

export type SystemUpdateUnitDefaultsMutationVariables = Exact<{
  data: Array<Scalars['String']> | Scalars['String'];
}>;


export type SystemUpdateUnitDefaultsMutation = { __typename?: 'Mutation', systemUpdateUnitDefaults: { __typename?: 'SystemClass', unitDefaults: Array<string>, companyVehicleTypeDefaults: Array<{ __typename?: 'DefaultRateClass', _id?: string | null, title: string, rate: number }>, materialShipmentVehicleTypeDefaults: Array<{ __typename?: 'DefaultRateClass', _id?: string | null, title: string, rate: number }> } };

export type UserAdminMutationVariables = Exact<{
  id: Scalars['String'];
  isAdmin: Scalars['Boolean'];
}>;


export type UserAdminMutation = { __typename?: 'Mutation', userAdmin: { __typename?: 'UserClass', _id: string, name: string, email: string, admin: boolean } };

export type UserPasswordResetMutationVariables = Exact<{
  password: Scalars['String'];
  token: Scalars['String'];
}>;


export type UserPasswordResetMutation = { __typename?: 'Mutation', userPasswordReset: boolean };

export type UserPasswordResetRequestMutationVariables = Exact<{
  email: Scalars['String'];
}>;


export type UserPasswordResetRequestMutation = { __typename?: 'Mutation', userPasswordResetRequest: boolean };

export type VehicleCreateMutationVariables = Exact<{
  data: VehicleCreateData;
  crewId?: InputMaybe<Scalars['String']>;
}>;


export type VehicleCreateMutation = { __typename?: 'Mutation', vehicleCreate: { __typename?: 'VehicleClass', _id: string, name: string, vehicleCode: string, vehicleType: string, rates: Array<{ __typename?: 'Rate', date: any, rate: number }> } };

export type VehicleUpdateRatesMutationVariables = Exact<{
  id: Scalars['String'];
  data: Array<RatesData> | RatesData;
}>;


export type VehicleUpdateRatesMutation = { __typename?: 'Mutation', vehicleUpdateRates: { __typename?: 'VehicleClass', _id: string, name: string, vehicleCode: string, vehicleType: string, rates: Array<{ __typename?: 'Rate', date: any, rate: number }> } };

export type VehicleWorkCreateMutationVariables = Exact<{
  dailyReportId: Scalars['String'];
  data: Array<VehicleWorkCreateData> | VehicleWorkCreateData;
}>;


export type VehicleWorkCreateMutation = { __typename?: 'Mutation', vehicleWorkCreate: Array<{ __typename?: 'VehicleWorkClass', _id: string, hours: number, jobTitle: string, vehicle?: { __typename?: 'VehicleClass', _id: string, name: string } | null }> };

export type VehicleWorkDeleteMutationVariables = Exact<{
  id: Scalars['String'];
}>;


export type VehicleWorkDeleteMutation = { __typename?: 'Mutation', vehicleWorkDelete: string };

export type VehicleWorkUpdateMutationVariables = Exact<{
  id: Scalars['String'];
  data: VehicleWorkUpdateData;
}>;


export type VehicleWorkUpdateMutation = { __typename?: 'Mutation', vehicleWorkUpdate: { __typename?: 'VehicleWorkClass', _id: string, hours: number, jobTitle: string, vehicle?: { __typename?: 'VehicleClass', _id: string, name: string } | null } };

export type CompaniesQueryVariables = Exact<{
  options?: InputMaybe<ListOptionData>;
}>;


export type CompaniesQuery = { __typename?: 'Query', companies: Array<{ __typename?: 'CompanyClass', _id: string, name: string }> };

export type CompanySearchQueryVariables = Exact<{
  searchString: Scalars['String'];
  options?: InputMaybe<SearchOptions>;
}>;


export type CompanySearchQuery = { __typename?: 'Query', companySearch: Array<{ __typename?: 'CompanyClass', _id: string, name: string }> };

export type CompanyCardQueryVariables = Exact<{
  id: Scalars['String'];
}>;


export type CompanyCardQuery = { __typename?: 'Query', company: { __typename?: 'CompanyClass', _id: string, name: string } };

export type CrewSearchQueryVariables = Exact<{
  searchString: Scalars['String'];
  options?: InputMaybe<SearchOptions>;
}>;


export type CrewSearchQuery = { __typename?: 'Query', crewSearch: Array<{ __typename?: 'CrewClass', _id: string, name: string }> };

export type CrewCardQueryVariables = Exact<{
  id: Scalars['String'];
}>;


export type CrewCardQuery = { __typename?: 'Query', crew: { __typename?: 'CrewClass', _id: string, name: string } };

export type CrewFullQueryVariables = Exact<{
  id: Scalars['String'];
}>;


export type CrewFullQuery = { __typename?: 'Query', crew: { __typename?: 'CrewClass', _id: string, name: string, type: string, employees: Array<{ __typename?: 'EmployeeClass', _id: string, name: string, jobTitle?: string | null, rates: Array<{ __typename?: 'Rate', date: any, rate: number }> }>, vehicles: Array<{ __typename?: 'VehicleClass', _id: string, name: string, vehicleCode: string, vehicleType: string, rates: Array<{ __typename?: 'Rate', date: any, rate: number }> }>, dailyReports: Array<{ __typename?: 'DailyReportClass', _id: string }> } };

export type CrewSsrQueryVariables = Exact<{
  id: Scalars['String'];
}>;


export type CrewSsrQuery = { __typename?: 'Query', crew: { __typename?: 'CrewClass', _id: string, name: string, type: string } };

export type CurrentUserQueryVariables = Exact<{ [key: string]: never; }>;


export type CurrentUserQuery = { __typename?: 'Query', currentUser: { __typename?: 'UserClass', _id: string, name: string, email: string, admin: boolean, projectManager: boolean, employee: { __typename?: 'EmployeeClass', _id: string, name: string, jobTitle?: string | null, crews: Array<{ __typename?: 'CrewClass', _id: string, name: string }> } } };

export type DailyReportCardQueryVariables = Exact<{
  id: Scalars['String'];
}>;


export type DailyReportCardQuery = { __typename?: 'Query', dailyReport: { __typename?: 'DailyReportClass', _id: string, date: any, jobCostApproved: boolean, payrollComplete: boolean, jobsite: { __typename?: 'JobsiteClass', _id: string, name: string }, crew: { __typename?: 'CrewClass', _id: string, name: string } } };

export type DailyReportFullQueryVariables = Exact<{
  id: Scalars['String'];
}>;


export type DailyReportFullQuery = { __typename?: 'Query', dailyReport: { __typename?: 'DailyReportClass', _id: string, date: any, jobCostApproved: boolean, payrollComplete: boolean, jobsite: { __typename?: 'JobsiteClass', _id: string, name: string, materials: Array<{ __typename?: 'JobsiteMaterialClass', _id: string, quantity: number, completedQuantity: number, unit: string, rate: number, material: { __typename?: 'MaterialClass', _id: string, name: string }, supplier: { __typename?: 'CompanyClass', _id: string, name: string } }>, truckingRates: Array<{ __typename?: 'TruckingRateClass', _id?: string | null, title: string, rate: number, type: string }> }, crew: { __typename?: 'CrewClass', _id: string, name: string, type: string, employees: Array<{ __typename?: 'EmployeeClass', _id: string, name: string, jobTitle?: string | null, rates: Array<{ __typename?: 'Rate', date: any, rate: number }> }>, vehicles: Array<{ __typename?: 'VehicleClass', _id: string, name: string, vehicleCode: string, vehicleType: string, rates: Array<{ __typename?: 'Rate', date: any, rate: number }> }>, dailyReports: Array<{ __typename?: 'DailyReportClass', _id: string }> }, employeeWork: Array<{ __typename?: 'EmployeeWorkClass', _id: string, jobTitle: string, startTime: any, endTime: any, employee: { __typename?: 'EmployeeClass', _id: string, name: string } }>, vehicleWork: Array<{ __typename?: 'VehicleWorkClass', _id: string, hours: number, jobTitle: string, vehicle?: { __typename?: 'VehicleClass', _id: string, name: string } | null }>, productions: Array<{ __typename?: 'ProductionClass', _id: string, jobTitle: string, quantity: number, unit: string, startTime: any, endTime: any, description: string }>, materialShipments: Array<{ __typename?: 'MaterialShipmentClass', _id: string, shipmentType?: string | null, supplier?: string | null, quantity: number, unit?: string | null, startTime?: any | null, endTime?: any | null, noJobsiteMaterial?: boolean | null, schemaVersion: number, jobsiteMaterial?: { __typename?: 'JobsiteMaterialClass', _id: string, quantity: number, completedQuantity: number, unit: string, rate: number, material: { __typename?: 'MaterialClass', _id: string, name: string }, supplier: { __typename?: 'CompanyClass', _id: string, name: string } } | null, vehicleObject?: { __typename?: 'VehicleObjectClass', source?: string | null, vehicleType?: string | null, vehicleCode?: string | null } | null }>, reportNote?: { __typename?: 'ReportNoteClass', _id: string, note: string, files: Array<{ __typename?: 'FileClass', _id: string, mimetype: string, description?: string | null }> } | null, temporaryEmployees: Array<{ __typename?: 'EmployeeClass', _id: string, name: string, jobTitle?: string | null, rates: Array<{ __typename?: 'Rate', date: any, rate: number }> }>, temporaryVehicles: Array<{ __typename?: 'VehicleClass', _id: string, name: string, vehicleCode: string, vehicleType: string, rates: Array<{ __typename?: 'Rate', date: any, rate: number }> }> } };

export type DailyReportPdfQueryVariables = Exact<{
  id: Scalars['String'];
}>;


export type DailyReportPdfQuery = { __typename?: 'Query', dailyReport: { __typename?: 'DailyReportClass', date: any, crew: { __typename?: 'CrewClass', name: string }, jobsite: { __typename?: 'JobsiteClass', name: string, jobcode?: string | null }, employeeWork: Array<{ __typename?: 'EmployeeWorkClass', _id: string, jobTitle: string, startTime: any, endTime: any, employee: { __typename?: 'EmployeeClass', _id: string, name: string } }>, vehicleWork: Array<{ __typename?: 'VehicleWorkClass', _id: string, hours: number, jobTitle: string, vehicle?: { __typename?: 'VehicleClass', _id: string, name: string } | null }>, productions: Array<{ __typename?: 'ProductionClass', _id: string, jobTitle: string, quantity: number, unit: string, startTime: any, endTime: any, description: string }>, materialShipments: Array<{ __typename?: 'MaterialShipmentClass', _id: string, shipmentType?: string | null, supplier?: string | null, quantity: number, unit?: string | null, startTime?: any | null, endTime?: any | null, noJobsiteMaterial?: boolean | null, schemaVersion: number, jobsiteMaterial?: { __typename?: 'JobsiteMaterialClass', _id: string, quantity: number, completedQuantity: number, unit: string, rate: number, material: { __typename?: 'MaterialClass', _id: string, name: string }, supplier: { __typename?: 'CompanyClass', _id: string, name: string } } | null, vehicleObject?: { __typename?: 'VehicleObjectClass', source?: string | null, vehicleType?: string | null, vehicleCode?: string | null } | null }>, reportNote?: { __typename?: 'ReportNoteClass', _id: string, note: string, files: Array<{ __typename?: 'FileClass', _id: string, mimetype: string, description?: string | null }> } | null } };

export type DailyReportSsrQueryVariables = Exact<{
  id: Scalars['String'];
}>;


export type DailyReportSsrQuery = { __typename?: 'Query', dailyReport: { __typename?: 'DailyReportClass', _id: string, jobsite: { __typename?: 'JobsiteClass', _id: string, name: string, jobcode?: string | null }, crew: { __typename?: 'CrewClass', _id: string, name: string } } };

export type DailyReportsQueryVariables = Exact<{
  options?: InputMaybe<DailyReportListOptionData>;
}>;


export type DailyReportsQuery = { __typename?: 'Query', dailyReports: Array<{ __typename?: 'DailyReportClass', _id: string, date: any, jobCostApproved: boolean, payrollComplete: boolean, jobsite: { __typename?: 'JobsiteClass', _id: string, name: string }, crew: { __typename?: 'CrewClass', _id: string, name: string } }> };

export type EmployeeSearchQueryVariables = Exact<{
  searchString: Scalars['String'];
  options?: InputMaybe<SearchOptions>;
}>;


export type EmployeeSearchQuery = { __typename?: 'Query', employeeSearch: Array<{ __typename?: 'EmployeeClass', _id: string, name: string, jobTitle?: string | null, rates: Array<{ __typename?: 'Rate', date: any, rate: number }> }> };

export type EmployeeFullQueryVariables = Exact<{
  id: Scalars['String'];
}>;


export type EmployeeFullQuery = { __typename?: 'Query', employee: { __typename?: 'EmployeeClass', _id: string, name: string, jobTitle?: string | null, user?: { __typename?: 'UserClass', _id: string, name: string, email: string, admin: boolean } | null, crews: Array<{ __typename?: 'CrewClass', _id: string, name: string }>, signup?: { __typename?: 'SignupClass', _id: string } | null, rates: Array<{ __typename?: 'Rate', date: any, rate: number }> } };

export type EmployeeSsrQueryVariables = Exact<{
  id: Scalars['String'];
}>;


export type EmployeeSsrQuery = { __typename?: 'Query', employee: { __typename?: 'EmployeeClass', _id: string, name: string, jobTitle?: string | null } };

export type EmployeeFetchSearchQueryVariables = Exact<{
  id: Scalars['String'];
}>;


export type EmployeeFetchSearchQuery = { __typename?: 'Query', employee: { __typename?: 'EmployeeClass', _id: string, name: string } };

export type FileFullQueryVariables = Exact<{
  id: Scalars['String'];
}>;


export type FileFullQuery = { __typename?: 'Query', file: { __typename?: 'FileClass', buffer: string, _id: string, mimetype: string, description?: string | null } };

export type JobsiteSearchQueryVariables = Exact<{
  searchString: Scalars['String'];
  options?: InputMaybe<SearchOptions>;
}>;


export type JobsiteSearchQuery = { __typename?: 'Query', jobsiteSearch: Array<{ __typename?: 'JobsiteClass', _id: string, name: string, jobcode?: string | null }> };

export type JobsiteFullQueryVariables = Exact<{
  id: Scalars['String'];
}>;


export type JobsiteFullQuery = { __typename?: 'Query', jobsite: { __typename?: 'JobsiteClass', _id: string, name: string, jobcode?: string | null, description?: string | null, location_url?: string | null, active: boolean, crews: Array<{ __typename?: 'CrewClass', _id: string, name: string }>, dailyReports: Array<{ __typename?: 'DailyReportClass', _id: string, date: any, jobCostApproved: boolean, payrollComplete: boolean, jobsite: { __typename?: 'JobsiteClass', _id: string, name: string }, crew: { __typename?: 'CrewClass', _id: string, name: string } }>, materials: Array<{ __typename?: 'JobsiteMaterialClass', _id: string, quantity: number, completedQuantity: number, unit: string, rate: number, material: { __typename?: 'MaterialClass', _id: string, name: string }, supplier: { __typename?: 'CompanyClass', _id: string, name: string } }>, invoices: Array<{ __typename?: 'InvoiceClass', _id: string, invoiceNumber: string, cost: number, description?: string | null, internal: boolean, company: { __typename?: 'CompanyClass', _id: string, name: string } }>, truckingRates: Array<{ __typename?: 'TruckingRateClass', _id?: string | null, title: string, rate: number, type: string }>, nonCostedMaterialShipments: Array<{ __typename?: 'MaterialShipmentClass', _id: string, shipmentType?: string | null, supplier?: string | null, quantity: number, unit?: string | null, startTime?: any | null, endTime?: any | null, noJobsiteMaterial?: boolean | null, schemaVersion: number, dailyReport: { __typename?: 'DailyReportClass', _id: string, date: any, jobsite: { __typename?: 'JobsiteClass', materials: Array<{ __typename?: 'JobsiteMaterialClass', _id: string, quantity: number, completedQuantity: number, unit: string, rate: number, material: { __typename?: 'MaterialClass', _id: string, name: string }, supplier: { __typename?: 'CompanyClass', _id: string, name: string } }> } }, jobsiteMaterial?: { __typename?: 'JobsiteMaterialClass', _id: string, quantity: number, completedQuantity: number, unit: string, rate: number, material: { __typename?: 'MaterialClass', _id: string, name: string }, supplier: { __typename?: 'CompanyClass', _id: string, name: string } } | null, vehicleObject?: { __typename?: 'VehicleObjectClass', source?: string | null, vehicleType?: string | null, vehicleCode?: string | null } | null }> } };

export type JobsiteSsrQueryVariables = Exact<{
  id: Scalars['String'];
}>;


export type JobsiteSsrQuery = { __typename?: 'Query', jobsite: { __typename?: 'JobsiteClass', _id: string, name: string, jobcode?: string | null } };

export type JobsiteFetchSearchQueryVariables = Exact<{
  id: Scalars['String'];
}>;


export type JobsiteFetchSearchQuery = { __typename?: 'Query', jobsite: { __typename?: 'JobsiteClass', _id: string, name: string, jobcode?: string | null } };

export type MaterialSearchQueryVariables = Exact<{
  searchString: Scalars['String'];
  options?: InputMaybe<SearchOptions>;
}>;


export type MaterialSearchQuery = { __typename?: 'Query', materialSearch: Array<{ __typename?: 'MaterialClass', _id: string, name: string }> };

export type MaterialCardQueryVariables = Exact<{
  id: Scalars['String'];
}>;


export type MaterialCardQuery = { __typename?: 'Query', material: { __typename?: 'MaterialClass', _id: string, name: string } };

export type MaterialsQueryVariables = Exact<{
  options?: InputMaybe<ListOptionData>;
}>;


export type MaterialsQuery = { __typename?: 'Query', materials: Array<{ __typename?: 'MaterialClass', _id: string, name: string }> };

export type SearchQueryVariables = Exact<{
  searchString: Scalars['String'];
}>;


export type SearchQuery = { __typename?: 'Query', search: Array<{ __typename?: 'SearchClass', score: number, employee?: { __typename?: 'EmployeeClass', _id: string, name: string, jobTitle?: string | null } | null, vehicle?: { __typename?: 'VehicleClass', _id: string, name: string, vehicleType: string, vehicleCode: string } | null, jobsite?: { __typename?: 'JobsiteClass', _id: string, name: string, jobcode?: string | null } | null, dailyReport?: { __typename?: 'DailyReportClass', _id: string, date: any, jobCostApproved: boolean, payrollComplete: boolean, jobsite: { __typename?: 'JobsiteClass', _id: string, name: string }, crew: { __typename?: 'CrewClass', _id: string, name: string } } | null, crew?: { __typename?: 'CrewClass', _id: string, name: string } | null }> };

export type SignupSsrQueryVariables = Exact<{
  id: Scalars['String'];
}>;


export type SignupSsrQuery = { __typename?: 'Query', signup: { __typename?: 'SignupClass', _id: string, employee: { __typename?: 'EmployeeClass', _id: string, name: string } } };

export type SystemQueryVariables = Exact<{ [key: string]: never; }>;


export type SystemQuery = { __typename?: 'Query', system: { __typename?: 'SystemClass', unitDefaults: Array<string>, companyVehicleTypeDefaults: Array<{ __typename?: 'DefaultRateClass', _id?: string | null, title: string, rate: number }>, materialShipmentVehicleTypeDefaults: Array<{ __typename?: 'DefaultRateClass', _id?: string | null, title: string, rate: number }> } };

export type UserForPasswordResetQueryVariables = Exact<{
  query: UserQuery;
}>;


export type UserForPasswordResetQuery = { __typename?: 'Query', user?: { __typename?: 'UserClass', _id: string, name: string } | null };

export type VehicleSearchQueryVariables = Exact<{
  searchString: Scalars['String'];
  options?: InputMaybe<SearchOptions>;
}>;


export type VehicleSearchQuery = { __typename?: 'Query', vehicleSearch: Array<{ __typename?: 'VehicleClass', _id: string, name: string, vehicleCode: string, vehicleType: string }> };

export type VehicleFullQueryVariables = Exact<{
  id: Scalars['String'];
}>;


export type VehicleFullQuery = { __typename?: 'Query', vehicle: { __typename?: 'VehicleClass', _id: string, name: string, vehicleCode: string, vehicleType: string, crews: Array<{ __typename?: 'CrewClass', _id: string, name: string }>, rates: Array<{ __typename?: 'Rate', date: any, rate: number }> } };

export type VehicleSsrQueryVariables = Exact<{
  id: Scalars['String'];
}>;


export type VehicleSsrQuery = { __typename?: 'Query', vehicle: { __typename?: 'VehicleClass', _id: string, name: string, vehicleCode: string, vehicleType: string } };

export type VehicleFetchSearchQueryVariables = Exact<{
  id: Scalars['String'];
}>;


export type VehicleFetchSearchQuery = { __typename?: 'Query', vehicle: { __typename?: 'VehicleClass', _id: string, name: string, vehicleCode: string, vehicleType: string } };

export const MaterialCardSnippetFragmentDoc = gql`
    fragment MaterialCardSnippet on MaterialClass {
  _id
  name
}
    `;
export const CompanyCardSnippetFragmentDoc = gql`
    fragment CompanyCardSnippet on CompanyClass {
  _id
  name
}
    `;
export const JobsiteMaterialCardSnippetFragmentDoc = gql`
    fragment JobsiteMaterialCardSnippet on JobsiteMaterialClass {
  _id
  material {
    ...MaterialCardSnippet
  }
  supplier {
    ...CompanyCardSnippet
  }
  quantity
  completedQuantity
  unit
  rate
}
    ${MaterialCardSnippetFragmentDoc}
${CompanyCardSnippetFragmentDoc}`;
export const TruckingRateSnippetFragmentDoc = gql`
    fragment TruckingRateSnippet on TruckingRateClass {
  _id
  title
  rate
  type
}
    `;
export const JobsiteForDailyReportSnippetFragmentDoc = gql`
    fragment JobsiteForDailyReportSnippet on JobsiteClass {
  _id
  name
  materials {
    ...JobsiteMaterialCardSnippet
  }
  truckingRates {
    ...TruckingRateSnippet
  }
}
    ${JobsiteMaterialCardSnippetFragmentDoc}
${TruckingRateSnippetFragmentDoc}`;
export const CrewSsrSnippetFragmentDoc = gql`
    fragment CrewSSRSnippet on CrewClass {
  _id
  name
  type
}
    `;
export const RateSnippetFragmentDoc = gql`
    fragment RateSnippet on Rate {
  date
  rate
}
    `;
export const EmployeeCardSnippetFragmentDoc = gql`
    fragment EmployeeCardSnippet on EmployeeClass {
  _id
  name
  jobTitle
  rates {
    ...RateSnippet
  }
}
    ${RateSnippetFragmentDoc}`;
export const VehicleCardSnippetFragmentDoc = gql`
    fragment VehicleCardSnippet on VehicleClass {
  _id
  name
  vehicleCode
  vehicleType
  rates {
    ...RateSnippet
  }
}
    ${RateSnippetFragmentDoc}`;
export const CrewFullSnippetFragmentDoc = gql`
    fragment CrewFullSnippet on CrewClass {
  ...CrewSSRSnippet
  employees {
    ...EmployeeCardSnippet
  }
  vehicles {
    ...VehicleCardSnippet
  }
  dailyReports {
    _id
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
  noJobsiteMaterial
  jobsiteMaterial {
    ...JobsiteMaterialCardSnippet
  }
  vehicleObject {
    source
    vehicleType
    vehicleCode
  }
  schemaVersion
}
    ${JobsiteMaterialCardSnippetFragmentDoc}`;
export const FilePreloadSnippetFragmentDoc = gql`
    fragment FilePreloadSnippet on FileClass {
  _id
  mimetype
  description
}
    `;
export const ReportNoteFullSnippetFragmentDoc = gql`
    fragment ReportNoteFullSnippet on ReportNoteClass {
  _id
  note
  files {
    ...FilePreloadSnippet
  }
}
    ${FilePreloadSnippetFragmentDoc}`;
export const DailyReportFullSnippetFragmentDoc = gql`
    fragment DailyReportFullSnippet on DailyReportClass {
  _id
  date
  jobCostApproved
  payrollComplete
  jobsite {
    ...JobsiteForDailyReportSnippet
  }
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
  temporaryEmployees {
    ...EmployeeCardSnippet
  }
  temporaryVehicles {
    ...VehicleCardSnippet
  }
}
    ${JobsiteForDailyReportSnippetFragmentDoc}
${CrewFullSnippetFragmentDoc}
${EmployeeWorkCardSnippetFragmentDoc}
${VehicleWorkCardSnippetFragmentDoc}
${ProductionCardSnippetFragmentDoc}
${MaterialShipmentCardSnippetFragmentDoc}
${ReportNoteFullSnippetFragmentDoc}
${EmployeeCardSnippetFragmentDoc}
${VehicleCardSnippetFragmentDoc}`;
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
  crew {
    _id
    name
  }
}
    `;
export const UserCardSnippetFragmentDoc = gql`
    fragment UserCardSnippet on UserClass {
  _id
  name
  email
  admin
}
    `;
export const EmployeeFullSnippetFragmentDoc = gql`
    fragment EmployeeFullSnippet on EmployeeClass {
  ...EmployeeCardSnippet
  user {
    ...UserCardSnippet
  }
  crews {
    _id
    name
  }
  signup {
    _id
  }
}
    ${EmployeeCardSnippetFragmentDoc}
${UserCardSnippetFragmentDoc}`;
export const EmployeeSsrSnippetFragmentDoc = gql`
    fragment EmployeeSSRSnippet on EmployeeClass {
  _id
  name
  jobTitle
}
    `;
export const EmployeeSearchSnippetFragmentDoc = gql`
    fragment EmployeeSearchSnippet on EmployeeClass {
  _id
  name
}
    `;
export const FileFullSnippetFragmentDoc = gql`
    fragment FileFullSnippet on FileClass {
  ...FilePreloadSnippet
  buffer
}
    ${FilePreloadSnippetFragmentDoc}`;
export const CrewCardSnippetFragmentDoc = gql`
    fragment CrewCardSnippet on CrewClass {
  _id
  name
}
    `;
export const DailyReportCardSnippetFragmentDoc = gql`
    fragment DailyReportCardSnippet on DailyReportClass {
  _id
  date
  jobCostApproved
  payrollComplete
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
export const InvoiceCardSnippetFragmentDoc = gql`
    fragment InvoiceCardSnippet on InvoiceClass {
  _id
  company {
    ...CompanyCardSnippet
  }
  invoiceNumber
  cost
  description
  internal
}
    ${CompanyCardSnippetFragmentDoc}`;
export const DailyReportForMaterialShipmentSnippetFragmentDoc = gql`
    fragment DailyReportForMaterialShipmentSnippet on DailyReportClass {
  _id
  date
  jobsite {
    materials {
      ...JobsiteMaterialCardSnippet
    }
  }
}
    ${JobsiteMaterialCardSnippetFragmentDoc}`;
export const MaterialShipmentNonCostedSnippetFragmentDoc = gql`
    fragment MaterialShipmentNonCostedSnippet on MaterialShipmentClass {
  dailyReport {
    ...DailyReportForMaterialShipmentSnippet
  }
  ...MaterialShipmentCardSnippet
}
    ${DailyReportForMaterialShipmentSnippetFragmentDoc}
${MaterialShipmentCardSnippetFragmentDoc}`;
export const JobsiteFullSnippetFragmentDoc = gql`
    fragment JobsiteFullSnippet on JobsiteClass {
  _id
  name
  jobcode
  description
  location_url
  active
  crews {
    ...CrewCardSnippet
  }
  dailyReports {
    ...DailyReportCardSnippet
  }
  materials {
    ...JobsiteMaterialCardSnippet
  }
  invoices {
    ...InvoiceCardSnippet
  }
  truckingRates {
    ...TruckingRateSnippet
  }
  nonCostedMaterialShipments {
    ...MaterialShipmentNonCostedSnippet
  }
}
    ${CrewCardSnippetFragmentDoc}
${DailyReportCardSnippetFragmentDoc}
${JobsiteMaterialCardSnippetFragmentDoc}
${InvoiceCardSnippetFragmentDoc}
${TruckingRateSnippetFragmentDoc}
${MaterialShipmentNonCostedSnippetFragmentDoc}`;
export const JobsiteSsrSnippetFragmentDoc = gql`
    fragment JobsiteSSRSnippet on JobsiteClass {
  _id
  name
  jobcode
}
    `;
export const JobsiteSearchSnippetFragmentDoc = gql`
    fragment JobsiteSearchSnippet on JobsiteClass {
  _id
  name
  jobcode
}
    `;
export const MaterialFullSnippetFragmentDoc = gql`
    fragment MaterialFullSnippet on MaterialClass {
  ...MaterialCardSnippet
}
    ${MaterialCardSnippetFragmentDoc}`;
export const JobsiteCardSnippetFragmentDoc = gql`
    fragment JobsiteCardSnippet on JobsiteClass {
  _id
  name
  jobcode
}
    `;
export const SearchSnippetFragmentDoc = gql`
    fragment SearchSnippet on SearchClass {
  score
  employee {
    _id
    name
    jobTitle
  }
  vehicle {
    _id
    name
    vehicleType
    vehicleCode
  }
  jobsite {
    ...JobsiteCardSnippet
  }
  dailyReport {
    ...DailyReportCardSnippet
  }
  crew {
    ...CrewCardSnippet
  }
}
    ${JobsiteCardSnippetFragmentDoc}
${DailyReportCardSnippetFragmentDoc}
${CrewCardSnippetFragmentDoc}`;
export const SignupFullSnippetFragmentDoc = gql`
    fragment SignupFullSnippet on SignupClass {
  _id
  employee {
    _id
    name
  }
}
    `;
export const DefaultRateSnippetFragmentDoc = gql`
    fragment DefaultRateSnippet on DefaultRateClass {
  _id
  title
  rate
}
    `;
export const SystemSnippetFragmentDoc = gql`
    fragment SystemSnippet on SystemClass {
  unitDefaults
  companyVehicleTypeDefaults {
    ...DefaultRateSnippet
  }
  materialShipmentVehicleTypeDefaults {
    ...DefaultRateSnippet
  }
}
    ${DefaultRateSnippetFragmentDoc}`;
export const FullUserSnippetFragmentDoc = gql`
    fragment FullUserSnippet on UserClass {
  _id
  name
  email
  admin
  projectManager
  employee {
    _id
    name
    jobTitle
    crews {
      ...CrewCardSnippet
    }
  }
}
    ${CrewCardSnippetFragmentDoc}`;
export const VehicleFullSnippetFragmentDoc = gql`
    fragment VehicleFullSnippet on VehicleClass {
  ...VehicleCardSnippet
  crews {
    ...CrewCardSnippet
  }
}
    ${VehicleCardSnippetFragmentDoc}
${CrewCardSnippetFragmentDoc}`;
export const VehicleSsrSnippetFragmentDoc = gql`
    fragment VehicleSSRSnippet on VehicleClass {
  _id
  name
  vehicleCode
  vehicleType
}
    `;
export const VehicleSearchSnippetFragmentDoc = gql`
    fragment VehicleSearchSnippet on VehicleClass {
  _id
  name
  vehicleCode
  vehicleType
}
    `;
export const CompanyCreateDocument = gql`
    mutation CompanyCreate($data: CompanyCreateData!) {
  companyCreate(data: $data) {
    ...CompanyCardSnippet
  }
}
    ${CompanyCardSnippetFragmentDoc}`;
export type CompanyCreateMutationFn = Apollo.MutationFunction<CompanyCreateMutation, CompanyCreateMutationVariables>;

/**
 * __useCompanyCreateMutation__
 *
 * To run a mutation, you first call `useCompanyCreateMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCompanyCreateMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [companyCreateMutation, { data, loading, error }] = useCompanyCreateMutation({
 *   variables: {
 *      data: // value for 'data'
 *   },
 * });
 */
export function useCompanyCreateMutation(baseOptions?: Apollo.MutationHookOptions<CompanyCreateMutation, CompanyCreateMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CompanyCreateMutation, CompanyCreateMutationVariables>(CompanyCreateDocument, options);
      }
export type CompanyCreateMutationHookResult = ReturnType<typeof useCompanyCreateMutation>;
export type CompanyCreateMutationResult = Apollo.MutationResult<CompanyCreateMutation>;
export type CompanyCreateMutationOptions = Apollo.BaseMutationOptions<CompanyCreateMutation, CompanyCreateMutationVariables>;
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
export const CrewCreateDocument = gql`
    mutation CrewCreate($data: CrewCreateData!) {
  crewCreate(data: $data) {
    ...CrewFullSnippet
  }
}
    ${CrewFullSnippetFragmentDoc}`;
export type CrewCreateMutationFn = Apollo.MutationFunction<CrewCreateMutation, CrewCreateMutationVariables>;

/**
 * __useCrewCreateMutation__
 *
 * To run a mutation, you first call `useCrewCreateMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCrewCreateMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [crewCreateMutation, { data, loading, error }] = useCrewCreateMutation({
 *   variables: {
 *      data: // value for 'data'
 *   },
 * });
 */
export function useCrewCreateMutation(baseOptions?: Apollo.MutationHookOptions<CrewCreateMutation, CrewCreateMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CrewCreateMutation, CrewCreateMutationVariables>(CrewCreateDocument, options);
      }
export type CrewCreateMutationHookResult = ReturnType<typeof useCrewCreateMutation>;
export type CrewCreateMutationResult = Apollo.MutationResult<CrewCreateMutation>;
export type CrewCreateMutationOptions = Apollo.BaseMutationOptions<CrewCreateMutation, CrewCreateMutationVariables>;
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
export const DailyReportAddNoteFileDocument = gql`
    mutation DailyReportAddNoteFile($dailyReportId: String!, $data: FileCreateData!) {
  dailyReportAddNoteFile(id: $dailyReportId, data: $data) {
    ...DailyReportFullSnippet
  }
}
    ${DailyReportFullSnippetFragmentDoc}`;
export type DailyReportAddNoteFileMutationFn = Apollo.MutationFunction<DailyReportAddNoteFileMutation, DailyReportAddNoteFileMutationVariables>;

/**
 * __useDailyReportAddNoteFileMutation__
 *
 * To run a mutation, you first call `useDailyReportAddNoteFileMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDailyReportAddNoteFileMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [dailyReportAddNoteFileMutation, { data, loading, error }] = useDailyReportAddNoteFileMutation({
 *   variables: {
 *      dailyReportId: // value for 'dailyReportId'
 *      data: // value for 'data'
 *   },
 * });
 */
export function useDailyReportAddNoteFileMutation(baseOptions?: Apollo.MutationHookOptions<DailyReportAddNoteFileMutation, DailyReportAddNoteFileMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DailyReportAddNoteFileMutation, DailyReportAddNoteFileMutationVariables>(DailyReportAddNoteFileDocument, options);
      }
export type DailyReportAddNoteFileMutationHookResult = ReturnType<typeof useDailyReportAddNoteFileMutation>;
export type DailyReportAddNoteFileMutationResult = Apollo.MutationResult<DailyReportAddNoteFileMutation>;
export type DailyReportAddNoteFileMutationOptions = Apollo.BaseMutationOptions<DailyReportAddNoteFileMutation, DailyReportAddNoteFileMutationVariables>;
export const DailyReportAddTemporaryEmployeeDocument = gql`
    mutation DailyReportAddTemporaryEmployee($id: String!, $employeeId: String!) {
  dailyReportAddTemporaryEmployee(id: $id, employeeId: $employeeId) {
    ...DailyReportFullSnippet
  }
}
    ${DailyReportFullSnippetFragmentDoc}`;
export type DailyReportAddTemporaryEmployeeMutationFn = Apollo.MutationFunction<DailyReportAddTemporaryEmployeeMutation, DailyReportAddTemporaryEmployeeMutationVariables>;

/**
 * __useDailyReportAddTemporaryEmployeeMutation__
 *
 * To run a mutation, you first call `useDailyReportAddTemporaryEmployeeMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDailyReportAddTemporaryEmployeeMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [dailyReportAddTemporaryEmployeeMutation, { data, loading, error }] = useDailyReportAddTemporaryEmployeeMutation({
 *   variables: {
 *      id: // value for 'id'
 *      employeeId: // value for 'employeeId'
 *   },
 * });
 */
export function useDailyReportAddTemporaryEmployeeMutation(baseOptions?: Apollo.MutationHookOptions<DailyReportAddTemporaryEmployeeMutation, DailyReportAddTemporaryEmployeeMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DailyReportAddTemporaryEmployeeMutation, DailyReportAddTemporaryEmployeeMutationVariables>(DailyReportAddTemporaryEmployeeDocument, options);
      }
export type DailyReportAddTemporaryEmployeeMutationHookResult = ReturnType<typeof useDailyReportAddTemporaryEmployeeMutation>;
export type DailyReportAddTemporaryEmployeeMutationResult = Apollo.MutationResult<DailyReportAddTemporaryEmployeeMutation>;
export type DailyReportAddTemporaryEmployeeMutationOptions = Apollo.BaseMutationOptions<DailyReportAddTemporaryEmployeeMutation, DailyReportAddTemporaryEmployeeMutationVariables>;
export const DailyReportAddTemporaryVehicleDocument = gql`
    mutation DailyReportAddTemporaryVehicle($id: String!, $vehicleId: String!) {
  dailyReportAddTemporaryVehicle(id: $id, vehicleId: $vehicleId) {
    ...DailyReportFullSnippet
  }
}
    ${DailyReportFullSnippetFragmentDoc}`;
export type DailyReportAddTemporaryVehicleMutationFn = Apollo.MutationFunction<DailyReportAddTemporaryVehicleMutation, DailyReportAddTemporaryVehicleMutationVariables>;

/**
 * __useDailyReportAddTemporaryVehicleMutation__
 *
 * To run a mutation, you first call `useDailyReportAddTemporaryVehicleMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDailyReportAddTemporaryVehicleMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [dailyReportAddTemporaryVehicleMutation, { data, loading, error }] = useDailyReportAddTemporaryVehicleMutation({
 *   variables: {
 *      id: // value for 'id'
 *      vehicleId: // value for 'vehicleId'
 *   },
 * });
 */
export function useDailyReportAddTemporaryVehicleMutation(baseOptions?: Apollo.MutationHookOptions<DailyReportAddTemporaryVehicleMutation, DailyReportAddTemporaryVehicleMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DailyReportAddTemporaryVehicleMutation, DailyReportAddTemporaryVehicleMutationVariables>(DailyReportAddTemporaryVehicleDocument, options);
      }
export type DailyReportAddTemporaryVehicleMutationHookResult = ReturnType<typeof useDailyReportAddTemporaryVehicleMutation>;
export type DailyReportAddTemporaryVehicleMutationResult = Apollo.MutationResult<DailyReportAddTemporaryVehicleMutation>;
export type DailyReportAddTemporaryVehicleMutationOptions = Apollo.BaseMutationOptions<DailyReportAddTemporaryVehicleMutation, DailyReportAddTemporaryVehicleMutationVariables>;
export const DailyReportCreateDocument = gql`
    mutation DailyReportCreate($data: DailyReportCreateData!) {
  dailyReportCreate(data: $data) {
    ...DailyReportFullSnippet
  }
}
    ${DailyReportFullSnippetFragmentDoc}`;
export type DailyReportCreateMutationFn = Apollo.MutationFunction<DailyReportCreateMutation, DailyReportCreateMutationVariables>;

/**
 * __useDailyReportCreateMutation__
 *
 * To run a mutation, you first call `useDailyReportCreateMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDailyReportCreateMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [dailyReportCreateMutation, { data, loading, error }] = useDailyReportCreateMutation({
 *   variables: {
 *      data: // value for 'data'
 *   },
 * });
 */
export function useDailyReportCreateMutation(baseOptions?: Apollo.MutationHookOptions<DailyReportCreateMutation, DailyReportCreateMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DailyReportCreateMutation, DailyReportCreateMutationVariables>(DailyReportCreateDocument, options);
      }
export type DailyReportCreateMutationHookResult = ReturnType<typeof useDailyReportCreateMutation>;
export type DailyReportCreateMutationResult = Apollo.MutationResult<DailyReportCreateMutation>;
export type DailyReportCreateMutationOptions = Apollo.BaseMutationOptions<DailyReportCreateMutation, DailyReportCreateMutationVariables>;
export const DailyReportJobCostApprovalUpdateDocument = gql`
    mutation DailyReportJobCostApprovalUpdate($id: String!, $approved: Boolean!) {
  dailyReportJobCostApprovalUpdate(id: $id, approved: $approved) {
    ...DailyReportFullSnippet
  }
}
    ${DailyReportFullSnippetFragmentDoc}`;
export type DailyReportJobCostApprovalUpdateMutationFn = Apollo.MutationFunction<DailyReportJobCostApprovalUpdateMutation, DailyReportJobCostApprovalUpdateMutationVariables>;

/**
 * __useDailyReportJobCostApprovalUpdateMutation__
 *
 * To run a mutation, you first call `useDailyReportJobCostApprovalUpdateMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDailyReportJobCostApprovalUpdateMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [dailyReportJobCostApprovalUpdateMutation, { data, loading, error }] = useDailyReportJobCostApprovalUpdateMutation({
 *   variables: {
 *      id: // value for 'id'
 *      approved: // value for 'approved'
 *   },
 * });
 */
export function useDailyReportJobCostApprovalUpdateMutation(baseOptions?: Apollo.MutationHookOptions<DailyReportJobCostApprovalUpdateMutation, DailyReportJobCostApprovalUpdateMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DailyReportJobCostApprovalUpdateMutation, DailyReportJobCostApprovalUpdateMutationVariables>(DailyReportJobCostApprovalUpdateDocument, options);
      }
export type DailyReportJobCostApprovalUpdateMutationHookResult = ReturnType<typeof useDailyReportJobCostApprovalUpdateMutation>;
export type DailyReportJobCostApprovalUpdateMutationResult = Apollo.MutationResult<DailyReportJobCostApprovalUpdateMutation>;
export type DailyReportJobCostApprovalUpdateMutationOptions = Apollo.BaseMutationOptions<DailyReportJobCostApprovalUpdateMutation, DailyReportJobCostApprovalUpdateMutationVariables>;
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
export const DailyReportPayrollCompleteUpdateDocument = gql`
    mutation DailyReportPayrollCompleteUpdate($id: String!, $complete: Boolean!) {
  dailyReportPayrollCompleteUpdate(id: $id, complete: $complete) {
    ...DailyReportFullSnippet
  }
}
    ${DailyReportFullSnippetFragmentDoc}`;
export type DailyReportPayrollCompleteUpdateMutationFn = Apollo.MutationFunction<DailyReportPayrollCompleteUpdateMutation, DailyReportPayrollCompleteUpdateMutationVariables>;

/**
 * __useDailyReportPayrollCompleteUpdateMutation__
 *
 * To run a mutation, you first call `useDailyReportPayrollCompleteUpdateMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDailyReportPayrollCompleteUpdateMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [dailyReportPayrollCompleteUpdateMutation, { data, loading, error }] = useDailyReportPayrollCompleteUpdateMutation({
 *   variables: {
 *      id: // value for 'id'
 *      complete: // value for 'complete'
 *   },
 * });
 */
export function useDailyReportPayrollCompleteUpdateMutation(baseOptions?: Apollo.MutationHookOptions<DailyReportPayrollCompleteUpdateMutation, DailyReportPayrollCompleteUpdateMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DailyReportPayrollCompleteUpdateMutation, DailyReportPayrollCompleteUpdateMutationVariables>(DailyReportPayrollCompleteUpdateDocument, options);
      }
export type DailyReportPayrollCompleteUpdateMutationHookResult = ReturnType<typeof useDailyReportPayrollCompleteUpdateMutation>;
export type DailyReportPayrollCompleteUpdateMutationResult = Apollo.MutationResult<DailyReportPayrollCompleteUpdateMutation>;
export type DailyReportPayrollCompleteUpdateMutationOptions = Apollo.BaseMutationOptions<DailyReportPayrollCompleteUpdateMutation, DailyReportPayrollCompleteUpdateMutationVariables>;
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
export const EmployeeUpdateRatesDocument = gql`
    mutation EmployeeUpdateRates($id: String!, $data: [RatesData!]!) {
  employeeUpdateRates(id: $id, data: $data) {
    ...EmployeeCardSnippet
  }
}
    ${EmployeeCardSnippetFragmentDoc}`;
export type EmployeeUpdateRatesMutationFn = Apollo.MutationFunction<EmployeeUpdateRatesMutation, EmployeeUpdateRatesMutationVariables>;

/**
 * __useEmployeeUpdateRatesMutation__
 *
 * To run a mutation, you first call `useEmployeeUpdateRatesMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useEmployeeUpdateRatesMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [employeeUpdateRatesMutation, { data, loading, error }] = useEmployeeUpdateRatesMutation({
 *   variables: {
 *      id: // value for 'id'
 *      data: // value for 'data'
 *   },
 * });
 */
export function useEmployeeUpdateRatesMutation(baseOptions?: Apollo.MutationHookOptions<EmployeeUpdateRatesMutation, EmployeeUpdateRatesMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<EmployeeUpdateRatesMutation, EmployeeUpdateRatesMutationVariables>(EmployeeUpdateRatesDocument, options);
      }
export type EmployeeUpdateRatesMutationHookResult = ReturnType<typeof useEmployeeUpdateRatesMutation>;
export type EmployeeUpdateRatesMutationResult = Apollo.MutationResult<EmployeeUpdateRatesMutation>;
export type EmployeeUpdateRatesMutationOptions = Apollo.BaseMutationOptions<EmployeeUpdateRatesMutation, EmployeeUpdateRatesMutationVariables>;
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
export const InvoiceUpdateDocument = gql`
    mutation InvoiceUpdate($id: String!, $data: InvoiceData!) {
  invoiceUpdate(id: $id, data: $data) {
    ...InvoiceCardSnippet
  }
}
    ${InvoiceCardSnippetFragmentDoc}`;
export type InvoiceUpdateMutationFn = Apollo.MutationFunction<InvoiceUpdateMutation, InvoiceUpdateMutationVariables>;

/**
 * __useInvoiceUpdateMutation__
 *
 * To run a mutation, you first call `useInvoiceUpdateMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useInvoiceUpdateMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [invoiceUpdateMutation, { data, loading, error }] = useInvoiceUpdateMutation({
 *   variables: {
 *      id: // value for 'id'
 *      data: // value for 'data'
 *   },
 * });
 */
export function useInvoiceUpdateMutation(baseOptions?: Apollo.MutationHookOptions<InvoiceUpdateMutation, InvoiceUpdateMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<InvoiceUpdateMutation, InvoiceUpdateMutationVariables>(InvoiceUpdateDocument, options);
      }
export type InvoiceUpdateMutationHookResult = ReturnType<typeof useInvoiceUpdateMutation>;
export type InvoiceUpdateMutationResult = Apollo.MutationResult<InvoiceUpdateMutation>;
export type InvoiceUpdateMutationOptions = Apollo.BaseMutationOptions<InvoiceUpdateMutation, InvoiceUpdateMutationVariables>;
export const JobsiteAddInvoiceDocument = gql`
    mutation JobsiteAddInvoice($jobsiteId: String!, $data: InvoiceData!) {
  jobsiteAddInvoice(jobsiteId: $jobsiteId, data: $data) {
    ...JobsiteFullSnippet
  }
}
    ${JobsiteFullSnippetFragmentDoc}`;
export type JobsiteAddInvoiceMutationFn = Apollo.MutationFunction<JobsiteAddInvoiceMutation, JobsiteAddInvoiceMutationVariables>;

/**
 * __useJobsiteAddInvoiceMutation__
 *
 * To run a mutation, you first call `useJobsiteAddInvoiceMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useJobsiteAddInvoiceMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [jobsiteAddInvoiceMutation, { data, loading, error }] = useJobsiteAddInvoiceMutation({
 *   variables: {
 *      jobsiteId: // value for 'jobsiteId'
 *      data: // value for 'data'
 *   },
 * });
 */
export function useJobsiteAddInvoiceMutation(baseOptions?: Apollo.MutationHookOptions<JobsiteAddInvoiceMutation, JobsiteAddInvoiceMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<JobsiteAddInvoiceMutation, JobsiteAddInvoiceMutationVariables>(JobsiteAddInvoiceDocument, options);
      }
export type JobsiteAddInvoiceMutationHookResult = ReturnType<typeof useJobsiteAddInvoiceMutation>;
export type JobsiteAddInvoiceMutationResult = Apollo.MutationResult<JobsiteAddInvoiceMutation>;
export type JobsiteAddInvoiceMutationOptions = Apollo.BaseMutationOptions<JobsiteAddInvoiceMutation, JobsiteAddInvoiceMutationVariables>;
export const JobsiteAddMaterialDocument = gql`
    mutation JobsiteAddMaterial($jobsiteId: String!, $data: JobsiteMaterialCreateData!) {
  jobsiteAddMaterial(jobsiteId: $jobsiteId, data: $data) {
    ...JobsiteFullSnippet
  }
}
    ${JobsiteFullSnippetFragmentDoc}`;
export type JobsiteAddMaterialMutationFn = Apollo.MutationFunction<JobsiteAddMaterialMutation, JobsiteAddMaterialMutationVariables>;

/**
 * __useJobsiteAddMaterialMutation__
 *
 * To run a mutation, you first call `useJobsiteAddMaterialMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useJobsiteAddMaterialMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [jobsiteAddMaterialMutation, { data, loading, error }] = useJobsiteAddMaterialMutation({
 *   variables: {
 *      jobsiteId: // value for 'jobsiteId'
 *      data: // value for 'data'
 *   },
 * });
 */
export function useJobsiteAddMaterialMutation(baseOptions?: Apollo.MutationHookOptions<JobsiteAddMaterialMutation, JobsiteAddMaterialMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<JobsiteAddMaterialMutation, JobsiteAddMaterialMutationVariables>(JobsiteAddMaterialDocument, options);
      }
export type JobsiteAddMaterialMutationHookResult = ReturnType<typeof useJobsiteAddMaterialMutation>;
export type JobsiteAddMaterialMutationResult = Apollo.MutationResult<JobsiteAddMaterialMutation>;
export type JobsiteAddMaterialMutationOptions = Apollo.BaseMutationOptions<JobsiteAddMaterialMutation, JobsiteAddMaterialMutationVariables>;
export const JobsiteCreateDocument = gql`
    mutation JobsiteCreate($data: JobsiteCreateData!) {
  jobsiteCreate(data: $data) {
    ...JobsiteFullSnippet
  }
}
    ${JobsiteFullSnippetFragmentDoc}`;
export type JobsiteCreateMutationFn = Apollo.MutationFunction<JobsiteCreateMutation, JobsiteCreateMutationVariables>;

/**
 * __useJobsiteCreateMutation__
 *
 * To run a mutation, you first call `useJobsiteCreateMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useJobsiteCreateMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [jobsiteCreateMutation, { data, loading, error }] = useJobsiteCreateMutation({
 *   variables: {
 *      data: // value for 'data'
 *   },
 * });
 */
export function useJobsiteCreateMutation(baseOptions?: Apollo.MutationHookOptions<JobsiteCreateMutation, JobsiteCreateMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<JobsiteCreateMutation, JobsiteCreateMutationVariables>(JobsiteCreateDocument, options);
      }
export type JobsiteCreateMutationHookResult = ReturnType<typeof useJobsiteCreateMutation>;
export type JobsiteCreateMutationResult = Apollo.MutationResult<JobsiteCreateMutation>;
export type JobsiteCreateMutationOptions = Apollo.BaseMutationOptions<JobsiteCreateMutation, JobsiteCreateMutationVariables>;
export const JobsiteMaterialUpdateDocument = gql`
    mutation JobsiteMaterialUpdate($id: String!, $data: JobsiteMaterialUpdateData!) {
  jobsiteMaterialUpdate(id: $id, data: $data) {
    ...JobsiteMaterialCardSnippet
  }
}
    ${JobsiteMaterialCardSnippetFragmentDoc}`;
export type JobsiteMaterialUpdateMutationFn = Apollo.MutationFunction<JobsiteMaterialUpdateMutation, JobsiteMaterialUpdateMutationVariables>;

/**
 * __useJobsiteMaterialUpdateMutation__
 *
 * To run a mutation, you first call `useJobsiteMaterialUpdateMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useJobsiteMaterialUpdateMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [jobsiteMaterialUpdateMutation, { data, loading, error }] = useJobsiteMaterialUpdateMutation({
 *   variables: {
 *      id: // value for 'id'
 *      data: // value for 'data'
 *   },
 * });
 */
export function useJobsiteMaterialUpdateMutation(baseOptions?: Apollo.MutationHookOptions<JobsiteMaterialUpdateMutation, JobsiteMaterialUpdateMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<JobsiteMaterialUpdateMutation, JobsiteMaterialUpdateMutationVariables>(JobsiteMaterialUpdateDocument, options);
      }
export type JobsiteMaterialUpdateMutationHookResult = ReturnType<typeof useJobsiteMaterialUpdateMutation>;
export type JobsiteMaterialUpdateMutationResult = Apollo.MutationResult<JobsiteMaterialUpdateMutation>;
export type JobsiteMaterialUpdateMutationOptions = Apollo.BaseMutationOptions<JobsiteMaterialUpdateMutation, JobsiteMaterialUpdateMutationVariables>;
export const JobsiteSetTruckingRatesDocument = gql`
    mutation JobsiteSetTruckingRates($id: String!, $data: [TruckingRateData!]!) {
  jobsiteSetTruckingRates(id: $id, data: $data) {
    ...JobsiteFullSnippet
  }
}
    ${JobsiteFullSnippetFragmentDoc}`;
export type JobsiteSetTruckingRatesMutationFn = Apollo.MutationFunction<JobsiteSetTruckingRatesMutation, JobsiteSetTruckingRatesMutationVariables>;

/**
 * __useJobsiteSetTruckingRatesMutation__
 *
 * To run a mutation, you first call `useJobsiteSetTruckingRatesMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useJobsiteSetTruckingRatesMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [jobsiteSetTruckingRatesMutation, { data, loading, error }] = useJobsiteSetTruckingRatesMutation({
 *   variables: {
 *      id: // value for 'id'
 *      data: // value for 'data'
 *   },
 * });
 */
export function useJobsiteSetTruckingRatesMutation(baseOptions?: Apollo.MutationHookOptions<JobsiteSetTruckingRatesMutation, JobsiteSetTruckingRatesMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<JobsiteSetTruckingRatesMutation, JobsiteSetTruckingRatesMutationVariables>(JobsiteSetTruckingRatesDocument, options);
      }
export type JobsiteSetTruckingRatesMutationHookResult = ReturnType<typeof useJobsiteSetTruckingRatesMutation>;
export type JobsiteSetTruckingRatesMutationResult = Apollo.MutationResult<JobsiteSetTruckingRatesMutation>;
export type JobsiteSetTruckingRatesMutationOptions = Apollo.BaseMutationOptions<JobsiteSetTruckingRatesMutation, JobsiteSetTruckingRatesMutationVariables>;
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
export const MaterialCreateDocument = gql`
    mutation MaterialCreate($data: MaterialCreateData!) {
  materialCreate(data: $data) {
    ...MaterialFullSnippet
  }
}
    ${MaterialFullSnippetFragmentDoc}`;
export type MaterialCreateMutationFn = Apollo.MutationFunction<MaterialCreateMutation, MaterialCreateMutationVariables>;

/**
 * __useMaterialCreateMutation__
 *
 * To run a mutation, you first call `useMaterialCreateMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useMaterialCreateMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [materialCreateMutation, { data, loading, error }] = useMaterialCreateMutation({
 *   variables: {
 *      data: // value for 'data'
 *   },
 * });
 */
export function useMaterialCreateMutation(baseOptions?: Apollo.MutationHookOptions<MaterialCreateMutation, MaterialCreateMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<MaterialCreateMutation, MaterialCreateMutationVariables>(MaterialCreateDocument, options);
      }
export type MaterialCreateMutationHookResult = ReturnType<typeof useMaterialCreateMutation>;
export type MaterialCreateMutationResult = Apollo.MutationResult<MaterialCreateMutation>;
export type MaterialCreateMutationOptions = Apollo.BaseMutationOptions<MaterialCreateMutation, MaterialCreateMutationVariables>;
export const MaterialShipmentCreateDocument = gql`
    mutation MaterialShipmentCreate($dailyReportId: String!, $data: [MaterialShipmentCreateData!]!) {
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
    mutation MaterialShipmentUpdate($id: String!, $data: MaterialShipmentShipmentData!) {
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
export const ReportNoteRemoveFileDocument = gql`
    mutation ReportNoteRemoveFile($reportNoteId: String!, $fileId: String!) {
  reportNoteRemoveFile(reportNoteId: $reportNoteId, fileId: $fileId) {
    ...ReportNoteFullSnippet
  }
}
    ${ReportNoteFullSnippetFragmentDoc}`;
export type ReportNoteRemoveFileMutationFn = Apollo.MutationFunction<ReportNoteRemoveFileMutation, ReportNoteRemoveFileMutationVariables>;

/**
 * __useReportNoteRemoveFileMutation__
 *
 * To run a mutation, you first call `useReportNoteRemoveFileMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useReportNoteRemoveFileMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [reportNoteRemoveFileMutation, { data, loading, error }] = useReportNoteRemoveFileMutation({
 *   variables: {
 *      reportNoteId: // value for 'reportNoteId'
 *      fileId: // value for 'fileId'
 *   },
 * });
 */
export function useReportNoteRemoveFileMutation(baseOptions?: Apollo.MutationHookOptions<ReportNoteRemoveFileMutation, ReportNoteRemoveFileMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<ReportNoteRemoveFileMutation, ReportNoteRemoveFileMutationVariables>(ReportNoteRemoveFileDocument, options);
      }
export type ReportNoteRemoveFileMutationHookResult = ReturnType<typeof useReportNoteRemoveFileMutation>;
export type ReportNoteRemoveFileMutationResult = Apollo.MutationResult<ReportNoteRemoveFileMutation>;
export type ReportNoteRemoveFileMutationOptions = Apollo.BaseMutationOptions<ReportNoteRemoveFileMutation, ReportNoteRemoveFileMutationVariables>;
export const SignupDocument = gql`
    mutation Signup($signupId: String!, $data: SignupData!) {
  signup(signupId: $signupId, data: $data)
}
    `;
export type SignupMutationFn = Apollo.MutationFunction<SignupMutation, SignupMutationVariables>;

/**
 * __useSignupMutation__
 *
 * To run a mutation, you first call `useSignupMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useSignupMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [signupMutation, { data, loading, error }] = useSignupMutation({
 *   variables: {
 *      signupId: // value for 'signupId'
 *      data: // value for 'data'
 *   },
 * });
 */
export function useSignupMutation(baseOptions?: Apollo.MutationHookOptions<SignupMutation, SignupMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<SignupMutation, SignupMutationVariables>(SignupDocument, options);
      }
export type SignupMutationHookResult = ReturnType<typeof useSignupMutation>;
export type SignupMutationResult = Apollo.MutationResult<SignupMutation>;
export type SignupMutationOptions = Apollo.BaseMutationOptions<SignupMutation, SignupMutationVariables>;
export const SignupCreateDocument = gql`
    mutation SignupCreate($employeeId: String!) {
  signupCreate(employeeId: $employeeId) {
    _id
  }
}
    `;
export type SignupCreateMutationFn = Apollo.MutationFunction<SignupCreateMutation, SignupCreateMutationVariables>;

/**
 * __useSignupCreateMutation__
 *
 * To run a mutation, you first call `useSignupCreateMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useSignupCreateMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [signupCreateMutation, { data, loading, error }] = useSignupCreateMutation({
 *   variables: {
 *      employeeId: // value for 'employeeId'
 *   },
 * });
 */
export function useSignupCreateMutation(baseOptions?: Apollo.MutationHookOptions<SignupCreateMutation, SignupCreateMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<SignupCreateMutation, SignupCreateMutationVariables>(SignupCreateDocument, options);
      }
export type SignupCreateMutationHookResult = ReturnType<typeof useSignupCreateMutation>;
export type SignupCreateMutationResult = Apollo.MutationResult<SignupCreateMutation>;
export type SignupCreateMutationOptions = Apollo.BaseMutationOptions<SignupCreateMutation, SignupCreateMutationVariables>;
export const SystemUpdateCompanyVehicleTypeDefaultsDocument = gql`
    mutation SystemUpdateCompanyVehicleTypeDefaults($data: [DefaultRateData!]!) {
  systemUpdateCompanyVehicleTypeDefaults(data: $data) {
    ...SystemSnippet
  }
}
    ${SystemSnippetFragmentDoc}`;
export type SystemUpdateCompanyVehicleTypeDefaultsMutationFn = Apollo.MutationFunction<SystemUpdateCompanyVehicleTypeDefaultsMutation, SystemUpdateCompanyVehicleTypeDefaultsMutationVariables>;

/**
 * __useSystemUpdateCompanyVehicleTypeDefaultsMutation__
 *
 * To run a mutation, you first call `useSystemUpdateCompanyVehicleTypeDefaultsMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useSystemUpdateCompanyVehicleTypeDefaultsMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [systemUpdateCompanyVehicleTypeDefaultsMutation, { data, loading, error }] = useSystemUpdateCompanyVehicleTypeDefaultsMutation({
 *   variables: {
 *      data: // value for 'data'
 *   },
 * });
 */
export function useSystemUpdateCompanyVehicleTypeDefaultsMutation(baseOptions?: Apollo.MutationHookOptions<SystemUpdateCompanyVehicleTypeDefaultsMutation, SystemUpdateCompanyVehicleTypeDefaultsMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<SystemUpdateCompanyVehicleTypeDefaultsMutation, SystemUpdateCompanyVehicleTypeDefaultsMutationVariables>(SystemUpdateCompanyVehicleTypeDefaultsDocument, options);
      }
export type SystemUpdateCompanyVehicleTypeDefaultsMutationHookResult = ReturnType<typeof useSystemUpdateCompanyVehicleTypeDefaultsMutation>;
export type SystemUpdateCompanyVehicleTypeDefaultsMutationResult = Apollo.MutationResult<SystemUpdateCompanyVehicleTypeDefaultsMutation>;
export type SystemUpdateCompanyVehicleTypeDefaultsMutationOptions = Apollo.BaseMutationOptions<SystemUpdateCompanyVehicleTypeDefaultsMutation, SystemUpdateCompanyVehicleTypeDefaultsMutationVariables>;
export const SystemUpdateMaterialShipmentVehicleTypeDefaultsDocument = gql`
    mutation SystemUpdateMaterialShipmentVehicleTypeDefaults($data: [DefaultRateData!]!) {
  systemUpdateMaterialShipmentVehicleTypeDefaults(data: $data) {
    ...SystemSnippet
  }
}
    ${SystemSnippetFragmentDoc}`;
export type SystemUpdateMaterialShipmentVehicleTypeDefaultsMutationFn = Apollo.MutationFunction<SystemUpdateMaterialShipmentVehicleTypeDefaultsMutation, SystemUpdateMaterialShipmentVehicleTypeDefaultsMutationVariables>;

/**
 * __useSystemUpdateMaterialShipmentVehicleTypeDefaultsMutation__
 *
 * To run a mutation, you first call `useSystemUpdateMaterialShipmentVehicleTypeDefaultsMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useSystemUpdateMaterialShipmentVehicleTypeDefaultsMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [systemUpdateMaterialShipmentVehicleTypeDefaultsMutation, { data, loading, error }] = useSystemUpdateMaterialShipmentVehicleTypeDefaultsMutation({
 *   variables: {
 *      data: // value for 'data'
 *   },
 * });
 */
export function useSystemUpdateMaterialShipmentVehicleTypeDefaultsMutation(baseOptions?: Apollo.MutationHookOptions<SystemUpdateMaterialShipmentVehicleTypeDefaultsMutation, SystemUpdateMaterialShipmentVehicleTypeDefaultsMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<SystemUpdateMaterialShipmentVehicleTypeDefaultsMutation, SystemUpdateMaterialShipmentVehicleTypeDefaultsMutationVariables>(SystemUpdateMaterialShipmentVehicleTypeDefaultsDocument, options);
      }
export type SystemUpdateMaterialShipmentVehicleTypeDefaultsMutationHookResult = ReturnType<typeof useSystemUpdateMaterialShipmentVehicleTypeDefaultsMutation>;
export type SystemUpdateMaterialShipmentVehicleTypeDefaultsMutationResult = Apollo.MutationResult<SystemUpdateMaterialShipmentVehicleTypeDefaultsMutation>;
export type SystemUpdateMaterialShipmentVehicleTypeDefaultsMutationOptions = Apollo.BaseMutationOptions<SystemUpdateMaterialShipmentVehicleTypeDefaultsMutation, SystemUpdateMaterialShipmentVehicleTypeDefaultsMutationVariables>;
export const SystemUpdateUnitDefaultsDocument = gql`
    mutation SystemUpdateUnitDefaults($data: [String!]!) {
  systemUpdateUnitDefaults(data: $data) {
    ...SystemSnippet
  }
}
    ${SystemSnippetFragmentDoc}`;
export type SystemUpdateUnitDefaultsMutationFn = Apollo.MutationFunction<SystemUpdateUnitDefaultsMutation, SystemUpdateUnitDefaultsMutationVariables>;

/**
 * __useSystemUpdateUnitDefaultsMutation__
 *
 * To run a mutation, you first call `useSystemUpdateUnitDefaultsMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useSystemUpdateUnitDefaultsMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [systemUpdateUnitDefaultsMutation, { data, loading, error }] = useSystemUpdateUnitDefaultsMutation({
 *   variables: {
 *      data: // value for 'data'
 *   },
 * });
 */
export function useSystemUpdateUnitDefaultsMutation(baseOptions?: Apollo.MutationHookOptions<SystemUpdateUnitDefaultsMutation, SystemUpdateUnitDefaultsMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<SystemUpdateUnitDefaultsMutation, SystemUpdateUnitDefaultsMutationVariables>(SystemUpdateUnitDefaultsDocument, options);
      }
export type SystemUpdateUnitDefaultsMutationHookResult = ReturnType<typeof useSystemUpdateUnitDefaultsMutation>;
export type SystemUpdateUnitDefaultsMutationResult = Apollo.MutationResult<SystemUpdateUnitDefaultsMutation>;
export type SystemUpdateUnitDefaultsMutationOptions = Apollo.BaseMutationOptions<SystemUpdateUnitDefaultsMutation, SystemUpdateUnitDefaultsMutationVariables>;
export const UserAdminDocument = gql`
    mutation UserAdmin($id: String!, $isAdmin: Boolean!) {
  userAdmin(id: $id, isAdmin: $isAdmin) {
    ...UserCardSnippet
  }
}
    ${UserCardSnippetFragmentDoc}`;
export type UserAdminMutationFn = Apollo.MutationFunction<UserAdminMutation, UserAdminMutationVariables>;

/**
 * __useUserAdminMutation__
 *
 * To run a mutation, you first call `useUserAdminMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUserAdminMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [userAdminMutation, { data, loading, error }] = useUserAdminMutation({
 *   variables: {
 *      id: // value for 'id'
 *      isAdmin: // value for 'isAdmin'
 *   },
 * });
 */
export function useUserAdminMutation(baseOptions?: Apollo.MutationHookOptions<UserAdminMutation, UserAdminMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UserAdminMutation, UserAdminMutationVariables>(UserAdminDocument, options);
      }
export type UserAdminMutationHookResult = ReturnType<typeof useUserAdminMutation>;
export type UserAdminMutationResult = Apollo.MutationResult<UserAdminMutation>;
export type UserAdminMutationOptions = Apollo.BaseMutationOptions<UserAdminMutation, UserAdminMutationVariables>;
export const UserPasswordResetDocument = gql`
    mutation UserPasswordReset($password: String!, $token: String!) {
  userPasswordReset(password: $password, token: $token)
}
    `;
export type UserPasswordResetMutationFn = Apollo.MutationFunction<UserPasswordResetMutation, UserPasswordResetMutationVariables>;

/**
 * __useUserPasswordResetMutation__
 *
 * To run a mutation, you first call `useUserPasswordResetMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUserPasswordResetMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [userPasswordResetMutation, { data, loading, error }] = useUserPasswordResetMutation({
 *   variables: {
 *      password: // value for 'password'
 *      token: // value for 'token'
 *   },
 * });
 */
export function useUserPasswordResetMutation(baseOptions?: Apollo.MutationHookOptions<UserPasswordResetMutation, UserPasswordResetMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UserPasswordResetMutation, UserPasswordResetMutationVariables>(UserPasswordResetDocument, options);
      }
export type UserPasswordResetMutationHookResult = ReturnType<typeof useUserPasswordResetMutation>;
export type UserPasswordResetMutationResult = Apollo.MutationResult<UserPasswordResetMutation>;
export type UserPasswordResetMutationOptions = Apollo.BaseMutationOptions<UserPasswordResetMutation, UserPasswordResetMutationVariables>;
export const UserPasswordResetRequestDocument = gql`
    mutation UserPasswordResetRequest($email: String!) {
  userPasswordResetRequest(email: $email)
}
    `;
export type UserPasswordResetRequestMutationFn = Apollo.MutationFunction<UserPasswordResetRequestMutation, UserPasswordResetRequestMutationVariables>;

/**
 * __useUserPasswordResetRequestMutation__
 *
 * To run a mutation, you first call `useUserPasswordResetRequestMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUserPasswordResetRequestMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [userPasswordResetRequestMutation, { data, loading, error }] = useUserPasswordResetRequestMutation({
 *   variables: {
 *      email: // value for 'email'
 *   },
 * });
 */
export function useUserPasswordResetRequestMutation(baseOptions?: Apollo.MutationHookOptions<UserPasswordResetRequestMutation, UserPasswordResetRequestMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UserPasswordResetRequestMutation, UserPasswordResetRequestMutationVariables>(UserPasswordResetRequestDocument, options);
      }
export type UserPasswordResetRequestMutationHookResult = ReturnType<typeof useUserPasswordResetRequestMutation>;
export type UserPasswordResetRequestMutationResult = Apollo.MutationResult<UserPasswordResetRequestMutation>;
export type UserPasswordResetRequestMutationOptions = Apollo.BaseMutationOptions<UserPasswordResetRequestMutation, UserPasswordResetRequestMutationVariables>;
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
export const VehicleUpdateRatesDocument = gql`
    mutation VehicleUpdateRates($id: String!, $data: [RatesData!]!) {
  vehicleUpdateRates(id: $id, data: $data) {
    ...VehicleCardSnippet
  }
}
    ${VehicleCardSnippetFragmentDoc}`;
export type VehicleUpdateRatesMutationFn = Apollo.MutationFunction<VehicleUpdateRatesMutation, VehicleUpdateRatesMutationVariables>;

/**
 * __useVehicleUpdateRatesMutation__
 *
 * To run a mutation, you first call `useVehicleUpdateRatesMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useVehicleUpdateRatesMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [vehicleUpdateRatesMutation, { data, loading, error }] = useVehicleUpdateRatesMutation({
 *   variables: {
 *      id: // value for 'id'
 *      data: // value for 'data'
 *   },
 * });
 */
export function useVehicleUpdateRatesMutation(baseOptions?: Apollo.MutationHookOptions<VehicleUpdateRatesMutation, VehicleUpdateRatesMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<VehicleUpdateRatesMutation, VehicleUpdateRatesMutationVariables>(VehicleUpdateRatesDocument, options);
      }
export type VehicleUpdateRatesMutationHookResult = ReturnType<typeof useVehicleUpdateRatesMutation>;
export type VehicleUpdateRatesMutationResult = Apollo.MutationResult<VehicleUpdateRatesMutation>;
export type VehicleUpdateRatesMutationOptions = Apollo.BaseMutationOptions<VehicleUpdateRatesMutation, VehicleUpdateRatesMutationVariables>;
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
export const CompaniesDocument = gql`
    query Companies($options: ListOptionData) {
  companies(options: $options) {
    ...CompanyCardSnippet
  }
}
    ${CompanyCardSnippetFragmentDoc}`;

/**
 * __useCompaniesQuery__
 *
 * To run a query within a React component, call `useCompaniesQuery` and pass it any options that fit your needs.
 * When your component renders, `useCompaniesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useCompaniesQuery({
 *   variables: {
 *      options: // value for 'options'
 *   },
 * });
 */
export function useCompaniesQuery(baseOptions?: Apollo.QueryHookOptions<CompaniesQuery, CompaniesQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<CompaniesQuery, CompaniesQueryVariables>(CompaniesDocument, options);
      }
export function useCompaniesLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<CompaniesQuery, CompaniesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<CompaniesQuery, CompaniesQueryVariables>(CompaniesDocument, options);
        }
export type CompaniesQueryHookResult = ReturnType<typeof useCompaniesQuery>;
export type CompaniesLazyQueryHookResult = ReturnType<typeof useCompaniesLazyQuery>;
export type CompaniesQueryResult = Apollo.QueryResult<CompaniesQuery, CompaniesQueryVariables>;
export const CompanySearchDocument = gql`
    query CompanySearch($searchString: String!, $options: SearchOptions) {
  companySearch(searchString: $searchString, options: $options) {
    ...CompanyCardSnippet
  }
}
    ${CompanyCardSnippetFragmentDoc}`;

/**
 * __useCompanySearchQuery__
 *
 * To run a query within a React component, call `useCompanySearchQuery` and pass it any options that fit your needs.
 * When your component renders, `useCompanySearchQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useCompanySearchQuery({
 *   variables: {
 *      searchString: // value for 'searchString'
 *      options: // value for 'options'
 *   },
 * });
 */
export function useCompanySearchQuery(baseOptions: Apollo.QueryHookOptions<CompanySearchQuery, CompanySearchQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<CompanySearchQuery, CompanySearchQueryVariables>(CompanySearchDocument, options);
      }
export function useCompanySearchLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<CompanySearchQuery, CompanySearchQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<CompanySearchQuery, CompanySearchQueryVariables>(CompanySearchDocument, options);
        }
export type CompanySearchQueryHookResult = ReturnType<typeof useCompanySearchQuery>;
export type CompanySearchLazyQueryHookResult = ReturnType<typeof useCompanySearchLazyQuery>;
export type CompanySearchQueryResult = Apollo.QueryResult<CompanySearchQuery, CompanySearchQueryVariables>;
export const CompanyCardDocument = gql`
    query CompanyCard($id: String!) {
  company(id: $id) {
    ...CompanyCardSnippet
  }
}
    ${CompanyCardSnippetFragmentDoc}`;

/**
 * __useCompanyCardQuery__
 *
 * To run a query within a React component, call `useCompanyCardQuery` and pass it any options that fit your needs.
 * When your component renders, `useCompanyCardQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useCompanyCardQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useCompanyCardQuery(baseOptions: Apollo.QueryHookOptions<CompanyCardQuery, CompanyCardQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<CompanyCardQuery, CompanyCardQueryVariables>(CompanyCardDocument, options);
      }
export function useCompanyCardLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<CompanyCardQuery, CompanyCardQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<CompanyCardQuery, CompanyCardQueryVariables>(CompanyCardDocument, options);
        }
export type CompanyCardQueryHookResult = ReturnType<typeof useCompanyCardQuery>;
export type CompanyCardLazyQueryHookResult = ReturnType<typeof useCompanyCardLazyQuery>;
export type CompanyCardQueryResult = Apollo.QueryResult<CompanyCardQuery, CompanyCardQueryVariables>;
export const CrewSearchDocument = gql`
    query CrewSearch($searchString: String!, $options: SearchOptions) {
  crewSearch(searchString: $searchString, options: $options) {
    ...CrewCardSnippet
  }
}
    ${CrewCardSnippetFragmentDoc}`;

/**
 * __useCrewSearchQuery__
 *
 * To run a query within a React component, call `useCrewSearchQuery` and pass it any options that fit your needs.
 * When your component renders, `useCrewSearchQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useCrewSearchQuery({
 *   variables: {
 *      searchString: // value for 'searchString'
 *      options: // value for 'options'
 *   },
 * });
 */
export function useCrewSearchQuery(baseOptions: Apollo.QueryHookOptions<CrewSearchQuery, CrewSearchQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<CrewSearchQuery, CrewSearchQueryVariables>(CrewSearchDocument, options);
      }
export function useCrewSearchLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<CrewSearchQuery, CrewSearchQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<CrewSearchQuery, CrewSearchQueryVariables>(CrewSearchDocument, options);
        }
export type CrewSearchQueryHookResult = ReturnType<typeof useCrewSearchQuery>;
export type CrewSearchLazyQueryHookResult = ReturnType<typeof useCrewSearchLazyQuery>;
export type CrewSearchQueryResult = Apollo.QueryResult<CrewSearchQuery, CrewSearchQueryVariables>;
export const CrewCardDocument = gql`
    query CrewCard($id: String!) {
  crew(id: $id) {
    ...CrewCardSnippet
  }
}
    ${CrewCardSnippetFragmentDoc}`;

/**
 * __useCrewCardQuery__
 *
 * To run a query within a React component, call `useCrewCardQuery` and pass it any options that fit your needs.
 * When your component renders, `useCrewCardQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useCrewCardQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useCrewCardQuery(baseOptions: Apollo.QueryHookOptions<CrewCardQuery, CrewCardQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<CrewCardQuery, CrewCardQueryVariables>(CrewCardDocument, options);
      }
export function useCrewCardLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<CrewCardQuery, CrewCardQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<CrewCardQuery, CrewCardQueryVariables>(CrewCardDocument, options);
        }
export type CrewCardQueryHookResult = ReturnType<typeof useCrewCardQuery>;
export type CrewCardLazyQueryHookResult = ReturnType<typeof useCrewCardLazyQuery>;
export type CrewCardQueryResult = Apollo.QueryResult<CrewCardQuery, CrewCardQueryVariables>;
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
export const DailyReportCardDocument = gql`
    query DailyReportCard($id: String!) {
  dailyReport(id: $id) {
    ...DailyReportCardSnippet
  }
}
    ${DailyReportCardSnippetFragmentDoc}`;

/**
 * __useDailyReportCardQuery__
 *
 * To run a query within a React component, call `useDailyReportCardQuery` and pass it any options that fit your needs.
 * When your component renders, `useDailyReportCardQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useDailyReportCardQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useDailyReportCardQuery(baseOptions: Apollo.QueryHookOptions<DailyReportCardQuery, DailyReportCardQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<DailyReportCardQuery, DailyReportCardQueryVariables>(DailyReportCardDocument, options);
      }
export function useDailyReportCardLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<DailyReportCardQuery, DailyReportCardQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<DailyReportCardQuery, DailyReportCardQueryVariables>(DailyReportCardDocument, options);
        }
export type DailyReportCardQueryHookResult = ReturnType<typeof useDailyReportCardQuery>;
export type DailyReportCardLazyQueryHookResult = ReturnType<typeof useDailyReportCardLazyQuery>;
export type DailyReportCardQueryResult = Apollo.QueryResult<DailyReportCardQuery, DailyReportCardQueryVariables>;
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
    query DailyReports($options: DailyReportListOptionData) {
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
export const EmployeeFullDocument = gql`
    query EmployeeFull($id: String!) {
  employee(id: $id) {
    ...EmployeeFullSnippet
  }
}
    ${EmployeeFullSnippetFragmentDoc}`;

/**
 * __useEmployeeFullQuery__
 *
 * To run a query within a React component, call `useEmployeeFullQuery` and pass it any options that fit your needs.
 * When your component renders, `useEmployeeFullQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useEmployeeFullQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useEmployeeFullQuery(baseOptions: Apollo.QueryHookOptions<EmployeeFullQuery, EmployeeFullQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<EmployeeFullQuery, EmployeeFullQueryVariables>(EmployeeFullDocument, options);
      }
export function useEmployeeFullLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<EmployeeFullQuery, EmployeeFullQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<EmployeeFullQuery, EmployeeFullQueryVariables>(EmployeeFullDocument, options);
        }
export type EmployeeFullQueryHookResult = ReturnType<typeof useEmployeeFullQuery>;
export type EmployeeFullLazyQueryHookResult = ReturnType<typeof useEmployeeFullLazyQuery>;
export type EmployeeFullQueryResult = Apollo.QueryResult<EmployeeFullQuery, EmployeeFullQueryVariables>;
export const EmployeeSsrDocument = gql`
    query EmployeeSSR($id: String!) {
  employee(id: $id) {
    ...EmployeeSSRSnippet
  }
}
    ${EmployeeSsrSnippetFragmentDoc}`;

/**
 * __useEmployeeSsrQuery__
 *
 * To run a query within a React component, call `useEmployeeSsrQuery` and pass it any options that fit your needs.
 * When your component renders, `useEmployeeSsrQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useEmployeeSsrQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useEmployeeSsrQuery(baseOptions: Apollo.QueryHookOptions<EmployeeSsrQuery, EmployeeSsrQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<EmployeeSsrQuery, EmployeeSsrQueryVariables>(EmployeeSsrDocument, options);
      }
export function useEmployeeSsrLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<EmployeeSsrQuery, EmployeeSsrQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<EmployeeSsrQuery, EmployeeSsrQueryVariables>(EmployeeSsrDocument, options);
        }
export type EmployeeSsrQueryHookResult = ReturnType<typeof useEmployeeSsrQuery>;
export type EmployeeSsrLazyQueryHookResult = ReturnType<typeof useEmployeeSsrLazyQuery>;
export type EmployeeSsrQueryResult = Apollo.QueryResult<EmployeeSsrQuery, EmployeeSsrQueryVariables>;
export const EmployeeFetchSearchDocument = gql`
    query EmployeeFetchSearch($id: String!) {
  employee(id: $id) {
    ...EmployeeSearchSnippet
  }
}
    ${EmployeeSearchSnippetFragmentDoc}`;

/**
 * __useEmployeeFetchSearchQuery__
 *
 * To run a query within a React component, call `useEmployeeFetchSearchQuery` and pass it any options that fit your needs.
 * When your component renders, `useEmployeeFetchSearchQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useEmployeeFetchSearchQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useEmployeeFetchSearchQuery(baseOptions: Apollo.QueryHookOptions<EmployeeFetchSearchQuery, EmployeeFetchSearchQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<EmployeeFetchSearchQuery, EmployeeFetchSearchQueryVariables>(EmployeeFetchSearchDocument, options);
      }
export function useEmployeeFetchSearchLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<EmployeeFetchSearchQuery, EmployeeFetchSearchQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<EmployeeFetchSearchQuery, EmployeeFetchSearchQueryVariables>(EmployeeFetchSearchDocument, options);
        }
export type EmployeeFetchSearchQueryHookResult = ReturnType<typeof useEmployeeFetchSearchQuery>;
export type EmployeeFetchSearchLazyQueryHookResult = ReturnType<typeof useEmployeeFetchSearchLazyQuery>;
export type EmployeeFetchSearchQueryResult = Apollo.QueryResult<EmployeeFetchSearchQuery, EmployeeFetchSearchQueryVariables>;
export const FileFullDocument = gql`
    query FileFull($id: String!) {
  file(id: $id) {
    ...FileFullSnippet
  }
}
    ${FileFullSnippetFragmentDoc}`;

/**
 * __useFileFullQuery__
 *
 * To run a query within a React component, call `useFileFullQuery` and pass it any options that fit your needs.
 * When your component renders, `useFileFullQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useFileFullQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useFileFullQuery(baseOptions: Apollo.QueryHookOptions<FileFullQuery, FileFullQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<FileFullQuery, FileFullQueryVariables>(FileFullDocument, options);
      }
export function useFileFullLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<FileFullQuery, FileFullQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<FileFullQuery, FileFullQueryVariables>(FileFullDocument, options);
        }
export type FileFullQueryHookResult = ReturnType<typeof useFileFullQuery>;
export type FileFullLazyQueryHookResult = ReturnType<typeof useFileFullLazyQuery>;
export type FileFullQueryResult = Apollo.QueryResult<FileFullQuery, FileFullQueryVariables>;
export const JobsiteSearchDocument = gql`
    query JobsiteSearch($searchString: String!, $options: SearchOptions) {
  jobsiteSearch(searchString: $searchString, options: $options) {
    ...JobsiteCardSnippet
  }
}
    ${JobsiteCardSnippetFragmentDoc}`;

/**
 * __useJobsiteSearchQuery__
 *
 * To run a query within a React component, call `useJobsiteSearchQuery` and pass it any options that fit your needs.
 * When your component renders, `useJobsiteSearchQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useJobsiteSearchQuery({
 *   variables: {
 *      searchString: // value for 'searchString'
 *      options: // value for 'options'
 *   },
 * });
 */
export function useJobsiteSearchQuery(baseOptions: Apollo.QueryHookOptions<JobsiteSearchQuery, JobsiteSearchQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<JobsiteSearchQuery, JobsiteSearchQueryVariables>(JobsiteSearchDocument, options);
      }
export function useJobsiteSearchLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<JobsiteSearchQuery, JobsiteSearchQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<JobsiteSearchQuery, JobsiteSearchQueryVariables>(JobsiteSearchDocument, options);
        }
export type JobsiteSearchQueryHookResult = ReturnType<typeof useJobsiteSearchQuery>;
export type JobsiteSearchLazyQueryHookResult = ReturnType<typeof useJobsiteSearchLazyQuery>;
export type JobsiteSearchQueryResult = Apollo.QueryResult<JobsiteSearchQuery, JobsiteSearchQueryVariables>;
export const JobsiteFullDocument = gql`
    query JobsiteFull($id: String!) {
  jobsite(id: $id) {
    ...JobsiteFullSnippet
  }
}
    ${JobsiteFullSnippetFragmentDoc}`;

/**
 * __useJobsiteFullQuery__
 *
 * To run a query within a React component, call `useJobsiteFullQuery` and pass it any options that fit your needs.
 * When your component renders, `useJobsiteFullQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useJobsiteFullQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useJobsiteFullQuery(baseOptions: Apollo.QueryHookOptions<JobsiteFullQuery, JobsiteFullQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<JobsiteFullQuery, JobsiteFullQueryVariables>(JobsiteFullDocument, options);
      }
export function useJobsiteFullLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<JobsiteFullQuery, JobsiteFullQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<JobsiteFullQuery, JobsiteFullQueryVariables>(JobsiteFullDocument, options);
        }
export type JobsiteFullQueryHookResult = ReturnType<typeof useJobsiteFullQuery>;
export type JobsiteFullLazyQueryHookResult = ReturnType<typeof useJobsiteFullLazyQuery>;
export type JobsiteFullQueryResult = Apollo.QueryResult<JobsiteFullQuery, JobsiteFullQueryVariables>;
export const JobsiteSsrDocument = gql`
    query JobsiteSSR($id: String!) {
  jobsite(id: $id) {
    ...JobsiteSSRSnippet
  }
}
    ${JobsiteSsrSnippetFragmentDoc}`;

/**
 * __useJobsiteSsrQuery__
 *
 * To run a query within a React component, call `useJobsiteSsrQuery` and pass it any options that fit your needs.
 * When your component renders, `useJobsiteSsrQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useJobsiteSsrQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useJobsiteSsrQuery(baseOptions: Apollo.QueryHookOptions<JobsiteSsrQuery, JobsiteSsrQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<JobsiteSsrQuery, JobsiteSsrQueryVariables>(JobsiteSsrDocument, options);
      }
export function useJobsiteSsrLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<JobsiteSsrQuery, JobsiteSsrQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<JobsiteSsrQuery, JobsiteSsrQueryVariables>(JobsiteSsrDocument, options);
        }
export type JobsiteSsrQueryHookResult = ReturnType<typeof useJobsiteSsrQuery>;
export type JobsiteSsrLazyQueryHookResult = ReturnType<typeof useJobsiteSsrLazyQuery>;
export type JobsiteSsrQueryResult = Apollo.QueryResult<JobsiteSsrQuery, JobsiteSsrQueryVariables>;
export const JobsiteFetchSearchDocument = gql`
    query JobsiteFetchSearch($id: String!) {
  jobsite(id: $id) {
    ...JobsiteSearchSnippet
  }
}
    ${JobsiteSearchSnippetFragmentDoc}`;

/**
 * __useJobsiteFetchSearchQuery__
 *
 * To run a query within a React component, call `useJobsiteFetchSearchQuery` and pass it any options that fit your needs.
 * When your component renders, `useJobsiteFetchSearchQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useJobsiteFetchSearchQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useJobsiteFetchSearchQuery(baseOptions: Apollo.QueryHookOptions<JobsiteFetchSearchQuery, JobsiteFetchSearchQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<JobsiteFetchSearchQuery, JobsiteFetchSearchQueryVariables>(JobsiteFetchSearchDocument, options);
      }
export function useJobsiteFetchSearchLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<JobsiteFetchSearchQuery, JobsiteFetchSearchQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<JobsiteFetchSearchQuery, JobsiteFetchSearchQueryVariables>(JobsiteFetchSearchDocument, options);
        }
export type JobsiteFetchSearchQueryHookResult = ReturnType<typeof useJobsiteFetchSearchQuery>;
export type JobsiteFetchSearchLazyQueryHookResult = ReturnType<typeof useJobsiteFetchSearchLazyQuery>;
export type JobsiteFetchSearchQueryResult = Apollo.QueryResult<JobsiteFetchSearchQuery, JobsiteFetchSearchQueryVariables>;
export const MaterialSearchDocument = gql`
    query MaterialSearch($searchString: String!, $options: SearchOptions) {
  materialSearch(searchString: $searchString, options: $options) {
    ...MaterialCardSnippet
  }
}
    ${MaterialCardSnippetFragmentDoc}`;

/**
 * __useMaterialSearchQuery__
 *
 * To run a query within a React component, call `useMaterialSearchQuery` and pass it any options that fit your needs.
 * When your component renders, `useMaterialSearchQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useMaterialSearchQuery({
 *   variables: {
 *      searchString: // value for 'searchString'
 *      options: // value for 'options'
 *   },
 * });
 */
export function useMaterialSearchQuery(baseOptions: Apollo.QueryHookOptions<MaterialSearchQuery, MaterialSearchQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<MaterialSearchQuery, MaterialSearchQueryVariables>(MaterialSearchDocument, options);
      }
export function useMaterialSearchLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<MaterialSearchQuery, MaterialSearchQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<MaterialSearchQuery, MaterialSearchQueryVariables>(MaterialSearchDocument, options);
        }
export type MaterialSearchQueryHookResult = ReturnType<typeof useMaterialSearchQuery>;
export type MaterialSearchLazyQueryHookResult = ReturnType<typeof useMaterialSearchLazyQuery>;
export type MaterialSearchQueryResult = Apollo.QueryResult<MaterialSearchQuery, MaterialSearchQueryVariables>;
export const MaterialCardDocument = gql`
    query MaterialCard($id: String!) {
  material(id: $id) {
    ...MaterialCardSnippet
  }
}
    ${MaterialCardSnippetFragmentDoc}`;

/**
 * __useMaterialCardQuery__
 *
 * To run a query within a React component, call `useMaterialCardQuery` and pass it any options that fit your needs.
 * When your component renders, `useMaterialCardQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useMaterialCardQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useMaterialCardQuery(baseOptions: Apollo.QueryHookOptions<MaterialCardQuery, MaterialCardQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<MaterialCardQuery, MaterialCardQueryVariables>(MaterialCardDocument, options);
      }
export function useMaterialCardLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<MaterialCardQuery, MaterialCardQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<MaterialCardQuery, MaterialCardQueryVariables>(MaterialCardDocument, options);
        }
export type MaterialCardQueryHookResult = ReturnType<typeof useMaterialCardQuery>;
export type MaterialCardLazyQueryHookResult = ReturnType<typeof useMaterialCardLazyQuery>;
export type MaterialCardQueryResult = Apollo.QueryResult<MaterialCardQuery, MaterialCardQueryVariables>;
export const MaterialsDocument = gql`
    query Materials($options: ListOptionData) {
  materials(options: $options) {
    ...MaterialCardSnippet
  }
}
    ${MaterialCardSnippetFragmentDoc}`;

/**
 * __useMaterialsQuery__
 *
 * To run a query within a React component, call `useMaterialsQuery` and pass it any options that fit your needs.
 * When your component renders, `useMaterialsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useMaterialsQuery({
 *   variables: {
 *      options: // value for 'options'
 *   },
 * });
 */
export function useMaterialsQuery(baseOptions?: Apollo.QueryHookOptions<MaterialsQuery, MaterialsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<MaterialsQuery, MaterialsQueryVariables>(MaterialsDocument, options);
      }
export function useMaterialsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<MaterialsQuery, MaterialsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<MaterialsQuery, MaterialsQueryVariables>(MaterialsDocument, options);
        }
export type MaterialsQueryHookResult = ReturnType<typeof useMaterialsQuery>;
export type MaterialsLazyQueryHookResult = ReturnType<typeof useMaterialsLazyQuery>;
export type MaterialsQueryResult = Apollo.QueryResult<MaterialsQuery, MaterialsQueryVariables>;
export const SearchDocument = gql`
    query Search($searchString: String!) {
  search(searchString: $searchString) {
    ...SearchSnippet
  }
}
    ${SearchSnippetFragmentDoc}`;

/**
 * __useSearchQuery__
 *
 * To run a query within a React component, call `useSearchQuery` and pass it any options that fit your needs.
 * When your component renders, `useSearchQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useSearchQuery({
 *   variables: {
 *      searchString: // value for 'searchString'
 *   },
 * });
 */
export function useSearchQuery(baseOptions: Apollo.QueryHookOptions<SearchQuery, SearchQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<SearchQuery, SearchQueryVariables>(SearchDocument, options);
      }
export function useSearchLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<SearchQuery, SearchQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<SearchQuery, SearchQueryVariables>(SearchDocument, options);
        }
export type SearchQueryHookResult = ReturnType<typeof useSearchQuery>;
export type SearchLazyQueryHookResult = ReturnType<typeof useSearchLazyQuery>;
export type SearchQueryResult = Apollo.QueryResult<SearchQuery, SearchQueryVariables>;
export const SignupSsrDocument = gql`
    query SignupSSR($id: String!) {
  signup(id: $id) {
    ...SignupFullSnippet
  }
}
    ${SignupFullSnippetFragmentDoc}`;

/**
 * __useSignupSsrQuery__
 *
 * To run a query within a React component, call `useSignupSsrQuery` and pass it any options that fit your needs.
 * When your component renders, `useSignupSsrQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useSignupSsrQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useSignupSsrQuery(baseOptions: Apollo.QueryHookOptions<SignupSsrQuery, SignupSsrQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<SignupSsrQuery, SignupSsrQueryVariables>(SignupSsrDocument, options);
      }
export function useSignupSsrLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<SignupSsrQuery, SignupSsrQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<SignupSsrQuery, SignupSsrQueryVariables>(SignupSsrDocument, options);
        }
export type SignupSsrQueryHookResult = ReturnType<typeof useSignupSsrQuery>;
export type SignupSsrLazyQueryHookResult = ReturnType<typeof useSignupSsrLazyQuery>;
export type SignupSsrQueryResult = Apollo.QueryResult<SignupSsrQuery, SignupSsrQueryVariables>;
export const SystemDocument = gql`
    query System {
  system {
    ...SystemSnippet
  }
}
    ${SystemSnippetFragmentDoc}`;

/**
 * __useSystemQuery__
 *
 * To run a query within a React component, call `useSystemQuery` and pass it any options that fit your needs.
 * When your component renders, `useSystemQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useSystemQuery({
 *   variables: {
 *   },
 * });
 */
export function useSystemQuery(baseOptions?: Apollo.QueryHookOptions<SystemQuery, SystemQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<SystemQuery, SystemQueryVariables>(SystemDocument, options);
      }
export function useSystemLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<SystemQuery, SystemQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<SystemQuery, SystemQueryVariables>(SystemDocument, options);
        }
export type SystemQueryHookResult = ReturnType<typeof useSystemQuery>;
export type SystemLazyQueryHookResult = ReturnType<typeof useSystemLazyQuery>;
export type SystemQueryResult = Apollo.QueryResult<SystemQuery, SystemQueryVariables>;
export const UserForPasswordResetDocument = gql`
    query UserForPasswordReset($query: UserQuery!) {
  user(query: $query) {
    _id
    name
  }
}
    `;

/**
 * __useUserForPasswordResetQuery__
 *
 * To run a query within a React component, call `useUserForPasswordResetQuery` and pass it any options that fit your needs.
 * When your component renders, `useUserForPasswordResetQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useUserForPasswordResetQuery({
 *   variables: {
 *      query: // value for 'query'
 *   },
 * });
 */
export function useUserForPasswordResetQuery(baseOptions: Apollo.QueryHookOptions<UserForPasswordResetQuery, UserForPasswordResetQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<UserForPasswordResetQuery, UserForPasswordResetQueryVariables>(UserForPasswordResetDocument, options);
      }
export function useUserForPasswordResetLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<UserForPasswordResetQuery, UserForPasswordResetQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<UserForPasswordResetQuery, UserForPasswordResetQueryVariables>(UserForPasswordResetDocument, options);
        }
export type UserForPasswordResetQueryHookResult = ReturnType<typeof useUserForPasswordResetQuery>;
export type UserForPasswordResetLazyQueryHookResult = ReturnType<typeof useUserForPasswordResetLazyQuery>;
export type UserForPasswordResetQueryResult = Apollo.QueryResult<UserForPasswordResetQuery, UserForPasswordResetQueryVariables>;
export const VehicleSearchDocument = gql`
    query VehicleSearch($searchString: String!, $options: SearchOptions) {
  vehicleSearch(searchString: $searchString, options: $options) {
    ...VehicleSearchSnippet
  }
}
    ${VehicleSearchSnippetFragmentDoc}`;

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
export const VehicleFullDocument = gql`
    query VehicleFull($id: String!) {
  vehicle(id: $id) {
    ...VehicleFullSnippet
  }
}
    ${VehicleFullSnippetFragmentDoc}`;

/**
 * __useVehicleFullQuery__
 *
 * To run a query within a React component, call `useVehicleFullQuery` and pass it any options that fit your needs.
 * When your component renders, `useVehicleFullQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useVehicleFullQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useVehicleFullQuery(baseOptions: Apollo.QueryHookOptions<VehicleFullQuery, VehicleFullQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<VehicleFullQuery, VehicleFullQueryVariables>(VehicleFullDocument, options);
      }
export function useVehicleFullLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<VehicleFullQuery, VehicleFullQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<VehicleFullQuery, VehicleFullQueryVariables>(VehicleFullDocument, options);
        }
export type VehicleFullQueryHookResult = ReturnType<typeof useVehicleFullQuery>;
export type VehicleFullLazyQueryHookResult = ReturnType<typeof useVehicleFullLazyQuery>;
export type VehicleFullQueryResult = Apollo.QueryResult<VehicleFullQuery, VehicleFullQueryVariables>;
export const VehicleSsrDocument = gql`
    query VehicleSSR($id: String!) {
  vehicle(id: $id) {
    ...VehicleSSRSnippet
  }
}
    ${VehicleSsrSnippetFragmentDoc}`;

/**
 * __useVehicleSsrQuery__
 *
 * To run a query within a React component, call `useVehicleSsrQuery` and pass it any options that fit your needs.
 * When your component renders, `useVehicleSsrQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useVehicleSsrQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useVehicleSsrQuery(baseOptions: Apollo.QueryHookOptions<VehicleSsrQuery, VehicleSsrQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<VehicleSsrQuery, VehicleSsrQueryVariables>(VehicleSsrDocument, options);
      }
export function useVehicleSsrLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<VehicleSsrQuery, VehicleSsrQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<VehicleSsrQuery, VehicleSsrQueryVariables>(VehicleSsrDocument, options);
        }
export type VehicleSsrQueryHookResult = ReturnType<typeof useVehicleSsrQuery>;
export type VehicleSsrLazyQueryHookResult = ReturnType<typeof useVehicleSsrLazyQuery>;
export type VehicleSsrQueryResult = Apollo.QueryResult<VehicleSsrQuery, VehicleSsrQueryVariables>;
export const VehicleFetchSearchDocument = gql`
    query VehicleFetchSearch($id: String!) {
  vehicle(id: $id) {
    ...VehicleSearchSnippet
  }
}
    ${VehicleSearchSnippetFragmentDoc}`;

/**
 * __useVehicleFetchSearchQuery__
 *
 * To run a query within a React component, call `useVehicleFetchSearchQuery` and pass it any options that fit your needs.
 * When your component renders, `useVehicleFetchSearchQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useVehicleFetchSearchQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useVehicleFetchSearchQuery(baseOptions: Apollo.QueryHookOptions<VehicleFetchSearchQuery, VehicleFetchSearchQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<VehicleFetchSearchQuery, VehicleFetchSearchQueryVariables>(VehicleFetchSearchDocument, options);
      }
export function useVehicleFetchSearchLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<VehicleFetchSearchQuery, VehicleFetchSearchQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<VehicleFetchSearchQuery, VehicleFetchSearchQueryVariables>(VehicleFetchSearchDocument, options);
        }
export type VehicleFetchSearchQueryHookResult = ReturnType<typeof useVehicleFetchSearchQuery>;
export type VehicleFetchSearchLazyQueryHookResult = ReturnType<typeof useVehicleFetchSearchLazyQuery>;
export type VehicleFetchSearchQueryResult = Apollo.QueryResult<VehicleFetchSearchQuery, VehicleFetchSearchQueryVariables>;