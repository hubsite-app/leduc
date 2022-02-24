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
  reportNote: Array<ReportNoteClass>;
  reportNotes: Array<ReportNoteClass>;
  vehicleWork: Array<VehicleWorkClass>;
};

export type EmployeeClass = {
  __typename?: 'EmployeeClass';
  _id: Scalars['ID'];
  crews: Array<CrewClass>;
  jobTitle?: Maybe<Scalars['String']>;
  name: Scalars['String'];
  user: UserClass;
};

export type EmployeeWorkClass = {
  __typename?: 'EmployeeWorkClass';
  _id: Scalars['ID'];
  dailyReport: DailyReportClass;
  employee: EmployeeClass;
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
  endTime: Scalars['DateTime'];
  quantity: Scalars['Float'];
  shipmentType: Scalars['String'];
  startTime: Scalars['DateTime'];
  supplier: Scalars['String'];
  unit: Scalars['String'];
  vehicle?: Maybe<VehicleClass>;
  vehicleObject?: Maybe<VehicleObjectClass>;
};

export type Mutation = {
  __typename?: 'Mutation';
  login: Scalars['String'];
};


export type MutationLoginArgs = {
  data: LoginData;
};

export type ProductionClass = {
  __typename?: 'ProductionClass';
  _id: Scalars['ID'];
  dailyReport: DailyReportClass;
  description: Scalars['String'];
  endTime?: Maybe<Scalars['DateTime']>;
  jobTitle: Scalars['String'];
  quantity: Scalars['Float'];
  startTime?: Maybe<Scalars['DateTime']>;
  unit: Scalars['String'];
};

export type Query = {
  __typename?: 'Query';
  crew: CrewClass;
  crewList: Array<CrewClass>;
  currentUser: UserClass;
  dailyReport: DailyReportClass;
  employee: EmployeeClass;
  jobsite: JobsiteClass;
  user: UserClass;
  vehicle: VehicleClass;
};


export type QueryCrewArgs = {
  id: Scalars['String'];
};


export type QueryDailyReportArgs = {
  id: Scalars['String'];
};


export type QueryEmployeeArgs = {
  id: Scalars['String'];
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

export type ReportNoteClass = {
  __typename?: 'ReportNoteClass';
  _id: Scalars['ID'];
  dailyReport: DailyReportClass;
  note: Scalars['String'];
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
};

export type VehicleClass = {
  __typename?: 'VehicleClass';
  _id: Scalars['ID'];
  crews: Array<CrewClass>;
  name: Scalars['String'];
  rental: Scalars['Boolean'];
  sourceCompany: Scalars['String'];
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
  endTime: Scalars['DateTime'];
  hours: Scalars['Float'];
  jobTitle: Scalars['String'];
  startTime: Scalars['DateTime'];
  vehicle: VehicleClass;
};

export type FullUserSnippetFragment = { __typename?: 'UserClass', _id: string, name: string, email: string };

export type CurrentUserQueryVariables = Exact<{ [key: string]: never; }>;


export type CurrentUserQuery = { __typename?: 'Query', currentUser: { __typename?: 'UserClass', _id: string, name: string, email: string } };

export const FullUserSnippetFragmentDoc = gql`
    fragment FullUserSnippet on UserClass {
  _id
  name
  email
}
    `;
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