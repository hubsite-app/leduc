import * as Types from './graphql';

import * as Operations from './graphql';
import { NextPage } from 'next';
import { NextRouter, useRouter } from 'next/router'
import { QueryHookOptions, useQuery } from '@apollo/client';
import * as Apollo from '@apollo/client';
import type React from 'react';
import { getApolloClient , ApolloClientContext} from '../withApollo';






















export async function getServerPageCrewFull
    (options: Omit<Apollo.QueryOptions<Types.CrewFullQueryVariables>, 'query'>, ctx: ApolloClientContext ){
        const apolloClient = getApolloClient(ctx);
        
        const data = await apolloClient.query<Types.CrewFullQuery>({ ...options, query: Operations.CrewFullDocument });
        
        const apolloState = apolloClient.cache.extract();

        return {
            props: {
                apolloState: apolloState,
                data: data?.data,
                error: data?.error ?? data?.errors ?? null,
            },
        };
      }
export const useCrewFull = (
  optionsFunc?: (router: NextRouter)=> QueryHookOptions<Types.CrewFullQuery, Types.CrewFullQueryVariables>) => {
  const router = useRouter();
  const options = optionsFunc ? optionsFunc(router) : {};
  return useQuery(Operations.CrewFullDocument, options);
};
export type PageCrewFullComp = React.FC<{data?: Types.CrewFullQuery, error?: Apollo.ApolloError}>;
export const withPageCrewFull = (optionsFunc?: (router: NextRouter)=> QueryHookOptions<Types.CrewFullQuery, Types.CrewFullQueryVariables>) => (WrappedComponent:PageCrewFullComp) : NextPage  => (props) => {
                const router = useRouter()
                const options = optionsFunc ? optionsFunc(router) : {};
                const {data, error } = useQuery(Operations.CrewFullDocument, options)    
                return <WrappedComponent {...props} data={data} error={error} /> ;
                   
            }; 
export const ssrCrewFull = {
      getServerPage: getServerPageCrewFull,
      withPage: withPageCrewFull,
      usePage: useCrewFull,
    }
export async function getServerPageCrewSsr
    (options: Omit<Apollo.QueryOptions<Types.CrewSsrQueryVariables>, 'query'>, ctx: ApolloClientContext ){
        const apolloClient = getApolloClient(ctx);
        
        const data = await apolloClient.query<Types.CrewSsrQuery>({ ...options, query: Operations.CrewSsrDocument });
        
        const apolloState = apolloClient.cache.extract();

        return {
            props: {
                apolloState: apolloState,
                data: data?.data,
                error: data?.error ?? data?.errors ?? null,
            },
        };
      }
export const useCrewSsr = (
  optionsFunc?: (router: NextRouter)=> QueryHookOptions<Types.CrewSsrQuery, Types.CrewSsrQueryVariables>) => {
  const router = useRouter();
  const options = optionsFunc ? optionsFunc(router) : {};
  return useQuery(Operations.CrewSsrDocument, options);
};
export type PageCrewSsrComp = React.FC<{data?: Types.CrewSsrQuery, error?: Apollo.ApolloError}>;
export const withPageCrewSsr = (optionsFunc?: (router: NextRouter)=> QueryHookOptions<Types.CrewSsrQuery, Types.CrewSsrQueryVariables>) => (WrappedComponent:PageCrewSsrComp) : NextPage  => (props) => {
                const router = useRouter()
                const options = optionsFunc ? optionsFunc(router) : {};
                const {data, error } = useQuery(Operations.CrewSsrDocument, options)    
                return <WrappedComponent {...props} data={data} error={error} /> ;
                   
            }; 
export const ssrCrewSsr = {
      getServerPage: getServerPageCrewSsr,
      withPage: withPageCrewSsr,
      usePage: useCrewSsr,
    }
export async function getServerPageCurrentUser
    (options: Omit<Apollo.QueryOptions<Types.CurrentUserQueryVariables>, 'query'>, ctx: ApolloClientContext ){
        const apolloClient = getApolloClient(ctx);
        
        const data = await apolloClient.query<Types.CurrentUserQuery>({ ...options, query: Operations.CurrentUserDocument });
        
        const apolloState = apolloClient.cache.extract();

        return {
            props: {
                apolloState: apolloState,
                data: data?.data,
                error: data?.error ?? data?.errors ?? null,
            },
        };
      }
export const useCurrentUser = (
  optionsFunc?: (router: NextRouter)=> QueryHookOptions<Types.CurrentUserQuery, Types.CurrentUserQueryVariables>) => {
  const router = useRouter();
  const options = optionsFunc ? optionsFunc(router) : {};
  return useQuery(Operations.CurrentUserDocument, options);
};
export type PageCurrentUserComp = React.FC<{data?: Types.CurrentUserQuery, error?: Apollo.ApolloError}>;
export const withPageCurrentUser = (optionsFunc?: (router: NextRouter)=> QueryHookOptions<Types.CurrentUserQuery, Types.CurrentUserQueryVariables>) => (WrappedComponent:PageCurrentUserComp) : NextPage  => (props) => {
                const router = useRouter()
                const options = optionsFunc ? optionsFunc(router) : {};
                const {data, error } = useQuery(Operations.CurrentUserDocument, options)    
                return <WrappedComponent {...props} data={data} error={error} /> ;
                   
            }; 
export const ssrCurrentUser = {
      getServerPage: getServerPageCurrentUser,
      withPage: withPageCurrentUser,
      usePage: useCurrentUser,
    }
export async function getServerPageDailyReportFull
    (options: Omit<Apollo.QueryOptions<Types.DailyReportFullQueryVariables>, 'query'>, ctx: ApolloClientContext ){
        const apolloClient = getApolloClient(ctx);
        
        const data = await apolloClient.query<Types.DailyReportFullQuery>({ ...options, query: Operations.DailyReportFullDocument });
        
        const apolloState = apolloClient.cache.extract();

        return {
            props: {
                apolloState: apolloState,
                data: data?.data,
                error: data?.error ?? data?.errors ?? null,
            },
        };
      }
export const useDailyReportFull = (
  optionsFunc?: (router: NextRouter)=> QueryHookOptions<Types.DailyReportFullQuery, Types.DailyReportFullQueryVariables>) => {
  const router = useRouter();
  const options = optionsFunc ? optionsFunc(router) : {};
  return useQuery(Operations.DailyReportFullDocument, options);
};
export type PageDailyReportFullComp = React.FC<{data?: Types.DailyReportFullQuery, error?: Apollo.ApolloError}>;
export const withPageDailyReportFull = (optionsFunc?: (router: NextRouter)=> QueryHookOptions<Types.DailyReportFullQuery, Types.DailyReportFullQueryVariables>) => (WrappedComponent:PageDailyReportFullComp) : NextPage  => (props) => {
                const router = useRouter()
                const options = optionsFunc ? optionsFunc(router) : {};
                const {data, error } = useQuery(Operations.DailyReportFullDocument, options)    
                return <WrappedComponent {...props} data={data} error={error} /> ;
                   
            }; 
export const ssrDailyReportFull = {
      getServerPage: getServerPageDailyReportFull,
      withPage: withPageDailyReportFull,
      usePage: useDailyReportFull,
    }
export async function getServerPageDailyReportPdf
    (options: Omit<Apollo.QueryOptions<Types.DailyReportPdfQueryVariables>, 'query'>, ctx: ApolloClientContext ){
        const apolloClient = getApolloClient(ctx);
        
        const data = await apolloClient.query<Types.DailyReportPdfQuery>({ ...options, query: Operations.DailyReportPdfDocument });
        
        const apolloState = apolloClient.cache.extract();

        return {
            props: {
                apolloState: apolloState,
                data: data?.data,
                error: data?.error ?? data?.errors ?? null,
            },
        };
      }
export const useDailyReportPdf = (
  optionsFunc?: (router: NextRouter)=> QueryHookOptions<Types.DailyReportPdfQuery, Types.DailyReportPdfQueryVariables>) => {
  const router = useRouter();
  const options = optionsFunc ? optionsFunc(router) : {};
  return useQuery(Operations.DailyReportPdfDocument, options);
};
export type PageDailyReportPdfComp = React.FC<{data?: Types.DailyReportPdfQuery, error?: Apollo.ApolloError}>;
export const withPageDailyReportPdf = (optionsFunc?: (router: NextRouter)=> QueryHookOptions<Types.DailyReportPdfQuery, Types.DailyReportPdfQueryVariables>) => (WrappedComponent:PageDailyReportPdfComp) : NextPage  => (props) => {
                const router = useRouter()
                const options = optionsFunc ? optionsFunc(router) : {};
                const {data, error } = useQuery(Operations.DailyReportPdfDocument, options)    
                return <WrappedComponent {...props} data={data} error={error} /> ;
                   
            }; 
export const ssrDailyReportPdf = {
      getServerPage: getServerPageDailyReportPdf,
      withPage: withPageDailyReportPdf,
      usePage: useDailyReportPdf,
    }
export async function getServerPageDailyReportSsr
    (options: Omit<Apollo.QueryOptions<Types.DailyReportSsrQueryVariables>, 'query'>, ctx: ApolloClientContext ){
        const apolloClient = getApolloClient(ctx);
        
        const data = await apolloClient.query<Types.DailyReportSsrQuery>({ ...options, query: Operations.DailyReportSsrDocument });
        
        const apolloState = apolloClient.cache.extract();

        return {
            props: {
                apolloState: apolloState,
                data: data?.data,
                error: data?.error ?? data?.errors ?? null,
            },
        };
      }
export const useDailyReportSsr = (
  optionsFunc?: (router: NextRouter)=> QueryHookOptions<Types.DailyReportSsrQuery, Types.DailyReportSsrQueryVariables>) => {
  const router = useRouter();
  const options = optionsFunc ? optionsFunc(router) : {};
  return useQuery(Operations.DailyReportSsrDocument, options);
};
export type PageDailyReportSsrComp = React.FC<{data?: Types.DailyReportSsrQuery, error?: Apollo.ApolloError}>;
export const withPageDailyReportSsr = (optionsFunc?: (router: NextRouter)=> QueryHookOptions<Types.DailyReportSsrQuery, Types.DailyReportSsrQueryVariables>) => (WrappedComponent:PageDailyReportSsrComp) : NextPage  => (props) => {
                const router = useRouter()
                const options = optionsFunc ? optionsFunc(router) : {};
                const {data, error } = useQuery(Operations.DailyReportSsrDocument, options)    
                return <WrappedComponent {...props} data={data} error={error} /> ;
                   
            }; 
export const ssrDailyReportSsr = {
      getServerPage: getServerPageDailyReportSsr,
      withPage: withPageDailyReportSsr,
      usePage: useDailyReportSsr,
    }
export async function getServerPageDailyReports
    (options: Omit<Apollo.QueryOptions<Types.DailyReportsQueryVariables>, 'query'>, ctx: ApolloClientContext ){
        const apolloClient = getApolloClient(ctx);
        
        const data = await apolloClient.query<Types.DailyReportsQuery>({ ...options, query: Operations.DailyReportsDocument });
        
        const apolloState = apolloClient.cache.extract();

        return {
            props: {
                apolloState: apolloState,
                data: data?.data,
                error: data?.error ?? data?.errors ?? null,
            },
        };
      }
export const useDailyReports = (
  optionsFunc?: (router: NextRouter)=> QueryHookOptions<Types.DailyReportsQuery, Types.DailyReportsQueryVariables>) => {
  const router = useRouter();
  const options = optionsFunc ? optionsFunc(router) : {};
  return useQuery(Operations.DailyReportsDocument, options);
};
export type PageDailyReportsComp = React.FC<{data?: Types.DailyReportsQuery, error?: Apollo.ApolloError}>;
export const withPageDailyReports = (optionsFunc?: (router: NextRouter)=> QueryHookOptions<Types.DailyReportsQuery, Types.DailyReportsQueryVariables>) => (WrappedComponent:PageDailyReportsComp) : NextPage  => (props) => {
                const router = useRouter()
                const options = optionsFunc ? optionsFunc(router) : {};
                const {data, error } = useQuery(Operations.DailyReportsDocument, options)    
                return <WrappedComponent {...props} data={data} error={error} /> ;
                   
            }; 
export const ssrDailyReports = {
      getServerPage: getServerPageDailyReports,
      withPage: withPageDailyReports,
      usePage: useDailyReports,
    }
export async function getServerPageEmployeeSearch
    (options: Omit<Apollo.QueryOptions<Types.EmployeeSearchQueryVariables>, 'query'>, ctx: ApolloClientContext ){
        const apolloClient = getApolloClient(ctx);
        
        const data = await apolloClient.query<Types.EmployeeSearchQuery>({ ...options, query: Operations.EmployeeSearchDocument });
        
        const apolloState = apolloClient.cache.extract();

        return {
            props: {
                apolloState: apolloState,
                data: data?.data,
                error: data?.error ?? data?.errors ?? null,
            },
        };
      }
export const useEmployeeSearch = (
  optionsFunc?: (router: NextRouter)=> QueryHookOptions<Types.EmployeeSearchQuery, Types.EmployeeSearchQueryVariables>) => {
  const router = useRouter();
  const options = optionsFunc ? optionsFunc(router) : {};
  return useQuery(Operations.EmployeeSearchDocument, options);
};
export type PageEmployeeSearchComp = React.FC<{data?: Types.EmployeeSearchQuery, error?: Apollo.ApolloError}>;
export const withPageEmployeeSearch = (optionsFunc?: (router: NextRouter)=> QueryHookOptions<Types.EmployeeSearchQuery, Types.EmployeeSearchQueryVariables>) => (WrappedComponent:PageEmployeeSearchComp) : NextPage  => (props) => {
                const router = useRouter()
                const options = optionsFunc ? optionsFunc(router) : {};
                const {data, error } = useQuery(Operations.EmployeeSearchDocument, options)    
                return <WrappedComponent {...props} data={data} error={error} /> ;
                   
            }; 
export const ssrEmployeeSearch = {
      getServerPage: getServerPageEmployeeSearch,
      withPage: withPageEmployeeSearch,
      usePage: useEmployeeSearch,
    }
export async function getServerPageVehicleSearch
    (options: Omit<Apollo.QueryOptions<Types.VehicleSearchQueryVariables>, 'query'>, ctx: ApolloClientContext ){
        const apolloClient = getApolloClient(ctx);
        
        const data = await apolloClient.query<Types.VehicleSearchQuery>({ ...options, query: Operations.VehicleSearchDocument });
        
        const apolloState = apolloClient.cache.extract();

        return {
            props: {
                apolloState: apolloState,
                data: data?.data,
                error: data?.error ?? data?.errors ?? null,
            },
        };
      }
export const useVehicleSearch = (
  optionsFunc?: (router: NextRouter)=> QueryHookOptions<Types.VehicleSearchQuery, Types.VehicleSearchQueryVariables>) => {
  const router = useRouter();
  const options = optionsFunc ? optionsFunc(router) : {};
  return useQuery(Operations.VehicleSearchDocument, options);
};
export type PageVehicleSearchComp = React.FC<{data?: Types.VehicleSearchQuery, error?: Apollo.ApolloError}>;
export const withPageVehicleSearch = (optionsFunc?: (router: NextRouter)=> QueryHookOptions<Types.VehicleSearchQuery, Types.VehicleSearchQueryVariables>) => (WrappedComponent:PageVehicleSearchComp) : NextPage  => (props) => {
                const router = useRouter()
                const options = optionsFunc ? optionsFunc(router) : {};
                const {data, error } = useQuery(Operations.VehicleSearchDocument, options)    
                return <WrappedComponent {...props} data={data} error={error} /> ;
                   
            }; 
export const ssrVehicleSearch = {
      getServerPage: getServerPageVehicleSearch,
      withPage: withPageVehicleSearch,
      usePage: useVehicleSearch,
    }