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

export type DailyReportUpdateData = {
  date: Scalars['DateTime'];
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
  dailyReportUpdate: DailyReportClass;
  employeeWorkUpdate: EmployeeWorkClass;
  login: Scalars['String'];
};


export type MutationDailyReportUpdateArgs = {
  data: DailyReportUpdateData;
  id: Scalars['String'];
};


export type MutationEmployeeWorkUpdateArgs = {
  data: EmployeeWorkUpdateData;
  id: Scalars['String'];
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
  dailyReports: Array<DailyReportClass>;
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


export type QueryDailyReportsArgs = {
  options?: InputMaybe<ListOptionData>;
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

export type DailyReportCardSnippetFragment = { __typename?: 'DailyReportClass', _id: string, date: any, jobsite: { __typename?: 'JobsiteClass', name: string } };

export type DailyReportFullSnippetFragment = { __typename?: 'DailyReportClass', _id: string, date: any, crew: { __typename?: 'CrewClass', _id: string, name: string }, employeeWork: Array<{ __typename?: 'EmployeeWorkClass', _id: string, jobTitle: string, startTime: any, endTime: any, employee: { __typename?: 'EmployeeClass', name: string } }> };

export type DailyReportSsrSnippetFragment = { __typename?: 'DailyReportClass', _id: string, jobsite: { __typename?: 'JobsiteClass', _id: string, name: string, jobcode?: string | null } };

export type EmployeeWorkCardSnippetFragment = { __typename?: 'EmployeeWorkClass', _id: string, jobTitle: string, startTime: any, endTime: any, employee: { __typename?: 'EmployeeClass', name: string } };

export type FullUserSnippetFragment = { __typename?: 'UserClass', _id: string, name: string, email: string, employee: { __typename?: 'EmployeeClass', name: string, jobTitle?: string | null } };

export type DailyReportUpdateMutationVariables = Exact<{
  id: Scalars['String'];
  data: DailyReportUpdateData;
}>;


export type DailyReportUpdateMutation = { __typename?: 'Mutation', dailyReportUpdate: { __typename?: 'DailyReportClass', _id: string, date: any, crew: { __typename?: 'CrewClass', _id: string, name: string }, employeeWork: Array<{ __typename?: 'EmployeeWorkClass', _id: string, jobTitle: string, startTime: any, endTime: any, employee: { __typename?: 'EmployeeClass', name: string } }> } };

export type EmployeeWorkUpdateMutationVariables = Exact<{
  id: Scalars['String'];
  data: EmployeeWorkUpdateData;
}>;


export type EmployeeWorkUpdateMutation = { __typename?: 'Mutation', employeeWorkUpdate: { __typename?: 'EmployeeWorkClass', _id: string, jobTitle: string, startTime: any, endTime: any, employee: { __typename?: 'EmployeeClass', name: string } } };

export type LoginMutationVariables = Exact<{
  data: LoginData;
}>;


export type LoginMutation = { __typename?: 'Mutation', login: string };

export type CurrentUserQueryVariables = Exact<{ [key: string]: never; }>;


export type CurrentUserQuery = { __typename?: 'Query', currentUser: { __typename?: 'UserClass', _id: string, name: string, email: string, employee: { __typename?: 'EmployeeClass', name: string, jobTitle?: string | null } } };

export type DailyReportFullQueryVariables = Exact<{
  id: Scalars['String'];
}>;


export type DailyReportFullQuery = { __typename?: 'Query', dailyReport: { __typename?: 'DailyReportClass', _id: string, date: any, crew: { __typename?: 'CrewClass', _id: string, name: string }, employeeWork: Array<{ __typename?: 'EmployeeWorkClass', _id: string, jobTitle: string, startTime: any, endTime: any, employee: { __typename?: 'EmployeeClass', name: string } }> } };

export type DailyReportSsrQueryVariables = Exact<{
  id: Scalars['String'];
}>;


export type DailyReportSsrQuery = { __typename?: 'Query', dailyReport: { __typename?: 'DailyReportClass', _id: string, jobsite: { __typename?: 'JobsiteClass', _id: string, name: string, jobcode?: string | null } } };

export type DailyReportsQueryVariables = Exact<{
  options?: InputMaybe<ListOptionData>;
}>;


export type DailyReportsQuery = { __typename?: 'Query', dailyReports: Array<{ __typename?: 'DailyReportClass', _id: string, date: any, jobsite: { __typename?: 'JobsiteClass', name: string } }> };

export const DailyReportCardSnippetFragmentDoc = gql`
    fragment DailyReportCardSnippet on DailyReportClass {
  _id
  date
  jobsite {
    name
  }
}
    `;
export const EmployeeWorkCardSnippetFragmentDoc = gql`
    fragment EmployeeWorkCardSnippet on EmployeeWorkClass {
  _id
  jobTitle
  employee {
    name
  }
  startTime
  endTime
}
    `;
export const DailyReportFullSnippetFragmentDoc = gql`
    fragment DailyReportFullSnippet on DailyReportClass {
  _id
  date
  crew {
    _id
    name
  }
  employeeWork {
    ...EmployeeWorkCardSnippet
  }
}
    ${EmployeeWorkCardSnippetFragmentDoc}`;
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
  employee {
    name
    jobTitle
  }
}
    `;
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