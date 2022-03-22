import * as Types from './graphql';

import * as Operations from './graphql';
import { NextPage } from 'next';
import { NextRouter, useRouter } from 'next/router'
import { QueryHookOptions, useQuery } from '@apollo/client';
import * as Apollo from '@apollo/client';
import type React from 'react';
import { getApolloClient , ApolloClientContext} from '../withApollo';



































export async function getServerPageCrewSearch
    (options: Omit<Apollo.QueryOptions<Types.CrewSearchQueryVariables>, 'query'>, ctx: ApolloClientContext ){
        const apolloClient = getApolloClient(ctx);
        
        const data = await apolloClient.query<Types.CrewSearchQuery>({ ...options, query: Operations.CrewSearchDocument });
        
        const apolloState = apolloClient.cache.extract();

        return {
            props: {
                apolloState: apolloState,
                data: data?.data,
                error: data?.error ?? data?.errors ?? null,
            },
        };
      }
export const useCrewSearch = (
  optionsFunc?: (router: NextRouter)=> QueryHookOptions<Types.CrewSearchQuery, Types.CrewSearchQueryVariables>) => {
  const router = useRouter();
  const options = optionsFunc ? optionsFunc(router) : {};
  return useQuery(Operations.CrewSearchDocument, options);
};
export type PageCrewSearchComp = React.FC<{data?: Types.CrewSearchQuery, error?: Apollo.ApolloError}>;
export const withPageCrewSearch = (optionsFunc?: (router: NextRouter)=> QueryHookOptions<Types.CrewSearchQuery, Types.CrewSearchQueryVariables>) => (WrappedComponent:PageCrewSearchComp) : NextPage  => (props) => {
                const router = useRouter()
                const options = optionsFunc ? optionsFunc(router) : {};
                const {data, error } = useQuery(Operations.CrewSearchDocument, options)    
                return <WrappedComponent {...props} data={data} error={error} /> ;
                   
            }; 
export const ssrCrewSearch = {
      getServerPage: getServerPageCrewSearch,
      withPage: withPageCrewSearch,
      usePage: useCrewSearch,
    }
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
export async function getServerPageEmployeeFull
    (options: Omit<Apollo.QueryOptions<Types.EmployeeFullQueryVariables>, 'query'>, ctx: ApolloClientContext ){
        const apolloClient = getApolloClient(ctx);
        
        const data = await apolloClient.query<Types.EmployeeFullQuery>({ ...options, query: Operations.EmployeeFullDocument });
        
        const apolloState = apolloClient.cache.extract();

        return {
            props: {
                apolloState: apolloState,
                data: data?.data,
                error: data?.error ?? data?.errors ?? null,
            },
        };
      }
export const useEmployeeFull = (
  optionsFunc?: (router: NextRouter)=> QueryHookOptions<Types.EmployeeFullQuery, Types.EmployeeFullQueryVariables>) => {
  const router = useRouter();
  const options = optionsFunc ? optionsFunc(router) : {};
  return useQuery(Operations.EmployeeFullDocument, options);
};
export type PageEmployeeFullComp = React.FC<{data?: Types.EmployeeFullQuery, error?: Apollo.ApolloError}>;
export const withPageEmployeeFull = (optionsFunc?: (router: NextRouter)=> QueryHookOptions<Types.EmployeeFullQuery, Types.EmployeeFullQueryVariables>) => (WrappedComponent:PageEmployeeFullComp) : NextPage  => (props) => {
                const router = useRouter()
                const options = optionsFunc ? optionsFunc(router) : {};
                const {data, error } = useQuery(Operations.EmployeeFullDocument, options)    
                return <WrappedComponent {...props} data={data} error={error} /> ;
                   
            }; 
export const ssrEmployeeFull = {
      getServerPage: getServerPageEmployeeFull,
      withPage: withPageEmployeeFull,
      usePage: useEmployeeFull,
    }
export async function getServerPageEmployeeSsr
    (options: Omit<Apollo.QueryOptions<Types.EmployeeSsrQueryVariables>, 'query'>, ctx: ApolloClientContext ){
        const apolloClient = getApolloClient(ctx);
        
        const data = await apolloClient.query<Types.EmployeeSsrQuery>({ ...options, query: Operations.EmployeeSsrDocument });
        
        const apolloState = apolloClient.cache.extract();

        return {
            props: {
                apolloState: apolloState,
                data: data?.data,
                error: data?.error ?? data?.errors ?? null,
            },
        };
      }
export const useEmployeeSsr = (
  optionsFunc?: (router: NextRouter)=> QueryHookOptions<Types.EmployeeSsrQuery, Types.EmployeeSsrQueryVariables>) => {
  const router = useRouter();
  const options = optionsFunc ? optionsFunc(router) : {};
  return useQuery(Operations.EmployeeSsrDocument, options);
};
export type PageEmployeeSsrComp = React.FC<{data?: Types.EmployeeSsrQuery, error?: Apollo.ApolloError}>;
export const withPageEmployeeSsr = (optionsFunc?: (router: NextRouter)=> QueryHookOptions<Types.EmployeeSsrQuery, Types.EmployeeSsrQueryVariables>) => (WrappedComponent:PageEmployeeSsrComp) : NextPage  => (props) => {
                const router = useRouter()
                const options = optionsFunc ? optionsFunc(router) : {};
                const {data, error } = useQuery(Operations.EmployeeSsrDocument, options)    
                return <WrappedComponent {...props} data={data} error={error} /> ;
                   
            }; 
export const ssrEmployeeSsr = {
      getServerPage: getServerPageEmployeeSsr,
      withPage: withPageEmployeeSsr,
      usePage: useEmployeeSsr,
    }
export async function getServerPageJobsiteSearch
    (options: Omit<Apollo.QueryOptions<Types.JobsiteSearchQueryVariables>, 'query'>, ctx: ApolloClientContext ){
        const apolloClient = getApolloClient(ctx);
        
        const data = await apolloClient.query<Types.JobsiteSearchQuery>({ ...options, query: Operations.JobsiteSearchDocument });
        
        const apolloState = apolloClient.cache.extract();

        return {
            props: {
                apolloState: apolloState,
                data: data?.data,
                error: data?.error ?? data?.errors ?? null,
            },
        };
      }
export const useJobsiteSearch = (
  optionsFunc?: (router: NextRouter)=> QueryHookOptions<Types.JobsiteSearchQuery, Types.JobsiteSearchQueryVariables>) => {
  const router = useRouter();
  const options = optionsFunc ? optionsFunc(router) : {};
  return useQuery(Operations.JobsiteSearchDocument, options);
};
export type PageJobsiteSearchComp = React.FC<{data?: Types.JobsiteSearchQuery, error?: Apollo.ApolloError}>;
export const withPageJobsiteSearch = (optionsFunc?: (router: NextRouter)=> QueryHookOptions<Types.JobsiteSearchQuery, Types.JobsiteSearchQueryVariables>) => (WrappedComponent:PageJobsiteSearchComp) : NextPage  => (props) => {
                const router = useRouter()
                const options = optionsFunc ? optionsFunc(router) : {};
                const {data, error } = useQuery(Operations.JobsiteSearchDocument, options)    
                return <WrappedComponent {...props} data={data} error={error} /> ;
                   
            }; 
export const ssrJobsiteSearch = {
      getServerPage: getServerPageJobsiteSearch,
      withPage: withPageJobsiteSearch,
      usePage: useJobsiteSearch,
    }
export async function getServerPageJobsiteFull
    (options: Omit<Apollo.QueryOptions<Types.JobsiteFullQueryVariables>, 'query'>, ctx: ApolloClientContext ){
        const apolloClient = getApolloClient(ctx);
        
        const data = await apolloClient.query<Types.JobsiteFullQuery>({ ...options, query: Operations.JobsiteFullDocument });
        
        const apolloState = apolloClient.cache.extract();

        return {
            props: {
                apolloState: apolloState,
                data: data?.data,
                error: data?.error ?? data?.errors ?? null,
            },
        };
      }
export const useJobsiteFull = (
  optionsFunc?: (router: NextRouter)=> QueryHookOptions<Types.JobsiteFullQuery, Types.JobsiteFullQueryVariables>) => {
  const router = useRouter();
  const options = optionsFunc ? optionsFunc(router) : {};
  return useQuery(Operations.JobsiteFullDocument, options);
};
export type PageJobsiteFullComp = React.FC<{data?: Types.JobsiteFullQuery, error?: Apollo.ApolloError}>;
export const withPageJobsiteFull = (optionsFunc?: (router: NextRouter)=> QueryHookOptions<Types.JobsiteFullQuery, Types.JobsiteFullQueryVariables>) => (WrappedComponent:PageJobsiteFullComp) : NextPage  => (props) => {
                const router = useRouter()
                const options = optionsFunc ? optionsFunc(router) : {};
                const {data, error } = useQuery(Operations.JobsiteFullDocument, options)    
                return <WrappedComponent {...props} data={data} error={error} /> ;
                   
            }; 
export const ssrJobsiteFull = {
      getServerPage: getServerPageJobsiteFull,
      withPage: withPageJobsiteFull,
      usePage: useJobsiteFull,
    }
export async function getServerPageJobsiteSsr
    (options: Omit<Apollo.QueryOptions<Types.JobsiteSsrQueryVariables>, 'query'>, ctx: ApolloClientContext ){
        const apolloClient = getApolloClient(ctx);
        
        const data = await apolloClient.query<Types.JobsiteSsrQuery>({ ...options, query: Operations.JobsiteSsrDocument });
        
        const apolloState = apolloClient.cache.extract();

        return {
            props: {
                apolloState: apolloState,
                data: data?.data,
                error: data?.error ?? data?.errors ?? null,
            },
        };
      }
export const useJobsiteSsr = (
  optionsFunc?: (router: NextRouter)=> QueryHookOptions<Types.JobsiteSsrQuery, Types.JobsiteSsrQueryVariables>) => {
  const router = useRouter();
  const options = optionsFunc ? optionsFunc(router) : {};
  return useQuery(Operations.JobsiteSsrDocument, options);
};
export type PageJobsiteSsrComp = React.FC<{data?: Types.JobsiteSsrQuery, error?: Apollo.ApolloError}>;
export const withPageJobsiteSsr = (optionsFunc?: (router: NextRouter)=> QueryHookOptions<Types.JobsiteSsrQuery, Types.JobsiteSsrQueryVariables>) => (WrappedComponent:PageJobsiteSsrComp) : NextPage  => (props) => {
                const router = useRouter()
                const options = optionsFunc ? optionsFunc(router) : {};
                const {data, error } = useQuery(Operations.JobsiteSsrDocument, options)    
                return <WrappedComponent {...props} data={data} error={error} /> ;
                   
            }; 
export const ssrJobsiteSsr = {
      getServerPage: getServerPageJobsiteSsr,
      withPage: withPageJobsiteSsr,
      usePage: useJobsiteSsr,
    }
export async function getServerPageMaterialSearch
    (options: Omit<Apollo.QueryOptions<Types.MaterialSearchQueryVariables>, 'query'>, ctx: ApolloClientContext ){
        const apolloClient = getApolloClient(ctx);
        
        const data = await apolloClient.query<Types.MaterialSearchQuery>({ ...options, query: Operations.MaterialSearchDocument });
        
        const apolloState = apolloClient.cache.extract();

        return {
            props: {
                apolloState: apolloState,
                data: data?.data,
                error: data?.error ?? data?.errors ?? null,
            },
        };
      }
export const useMaterialSearch = (
  optionsFunc?: (router: NextRouter)=> QueryHookOptions<Types.MaterialSearchQuery, Types.MaterialSearchQueryVariables>) => {
  const router = useRouter();
  const options = optionsFunc ? optionsFunc(router) : {};
  return useQuery(Operations.MaterialSearchDocument, options);
};
export type PageMaterialSearchComp = React.FC<{data?: Types.MaterialSearchQuery, error?: Apollo.ApolloError}>;
export const withPageMaterialSearch = (optionsFunc?: (router: NextRouter)=> QueryHookOptions<Types.MaterialSearchQuery, Types.MaterialSearchQueryVariables>) => (WrappedComponent:PageMaterialSearchComp) : NextPage  => (props) => {
                const router = useRouter()
                const options = optionsFunc ? optionsFunc(router) : {};
                const {data, error } = useQuery(Operations.MaterialSearchDocument, options)    
                return <WrappedComponent {...props} data={data} error={error} /> ;
                   
            }; 
export const ssrMaterialSearch = {
      getServerPage: getServerPageMaterialSearch,
      withPage: withPageMaterialSearch,
      usePage: useMaterialSearch,
    }
export async function getServerPageMaterials
    (options: Omit<Apollo.QueryOptions<Types.MaterialsQueryVariables>, 'query'>, ctx: ApolloClientContext ){
        const apolloClient = getApolloClient(ctx);
        
        const data = await apolloClient.query<Types.MaterialsQuery>({ ...options, query: Operations.MaterialsDocument });
        
        const apolloState = apolloClient.cache.extract();

        return {
            props: {
                apolloState: apolloState,
                data: data?.data,
                error: data?.error ?? data?.errors ?? null,
            },
        };
      }
export const useMaterials = (
  optionsFunc?: (router: NextRouter)=> QueryHookOptions<Types.MaterialsQuery, Types.MaterialsQueryVariables>) => {
  const router = useRouter();
  const options = optionsFunc ? optionsFunc(router) : {};
  return useQuery(Operations.MaterialsDocument, options);
};
export type PageMaterialsComp = React.FC<{data?: Types.MaterialsQuery, error?: Apollo.ApolloError}>;
export const withPageMaterials = (optionsFunc?: (router: NextRouter)=> QueryHookOptions<Types.MaterialsQuery, Types.MaterialsQueryVariables>) => (WrappedComponent:PageMaterialsComp) : NextPage  => (props) => {
                const router = useRouter()
                const options = optionsFunc ? optionsFunc(router) : {};
                const {data, error } = useQuery(Operations.MaterialsDocument, options)    
                return <WrappedComponent {...props} data={data} error={error} /> ;
                   
            }; 
export const ssrMaterials = {
      getServerPage: getServerPageMaterials,
      withPage: withPageMaterials,
      usePage: useMaterials,
    }
export async function getServerPageSearch
    (options: Omit<Apollo.QueryOptions<Types.SearchQueryVariables>, 'query'>, ctx: ApolloClientContext ){
        const apolloClient = getApolloClient(ctx);
        
        const data = await apolloClient.query<Types.SearchQuery>({ ...options, query: Operations.SearchDocument });
        
        const apolloState = apolloClient.cache.extract();

        return {
            props: {
                apolloState: apolloState,
                data: data?.data,
                error: data?.error ?? data?.errors ?? null,
            },
        };
      }
export const useSearch = (
  optionsFunc?: (router: NextRouter)=> QueryHookOptions<Types.SearchQuery, Types.SearchQueryVariables>) => {
  const router = useRouter();
  const options = optionsFunc ? optionsFunc(router) : {};
  return useQuery(Operations.SearchDocument, options);
};
export type PageSearchComp = React.FC<{data?: Types.SearchQuery, error?: Apollo.ApolloError}>;
export const withPageSearch = (optionsFunc?: (router: NextRouter)=> QueryHookOptions<Types.SearchQuery, Types.SearchQueryVariables>) => (WrappedComponent:PageSearchComp) : NextPage  => (props) => {
                const router = useRouter()
                const options = optionsFunc ? optionsFunc(router) : {};
                const {data, error } = useQuery(Operations.SearchDocument, options)    
                return <WrappedComponent {...props} data={data} error={error} /> ;
                   
            }; 
export const ssrSearch = {
      getServerPage: getServerPageSearch,
      withPage: withPageSearch,
      usePage: useSearch,
    }
export async function getServerPageSignupSsr
    (options: Omit<Apollo.QueryOptions<Types.SignupSsrQueryVariables>, 'query'>, ctx: ApolloClientContext ){
        const apolloClient = getApolloClient(ctx);
        
        const data = await apolloClient.query<Types.SignupSsrQuery>({ ...options, query: Operations.SignupSsrDocument });
        
        const apolloState = apolloClient.cache.extract();

        return {
            props: {
                apolloState: apolloState,
                data: data?.data,
                error: data?.error ?? data?.errors ?? null,
            },
        };
      }
export const useSignupSsr = (
  optionsFunc?: (router: NextRouter)=> QueryHookOptions<Types.SignupSsrQuery, Types.SignupSsrQueryVariables>) => {
  const router = useRouter();
  const options = optionsFunc ? optionsFunc(router) : {};
  return useQuery(Operations.SignupSsrDocument, options);
};
export type PageSignupSsrComp = React.FC<{data?: Types.SignupSsrQuery, error?: Apollo.ApolloError}>;
export const withPageSignupSsr = (optionsFunc?: (router: NextRouter)=> QueryHookOptions<Types.SignupSsrQuery, Types.SignupSsrQueryVariables>) => (WrappedComponent:PageSignupSsrComp) : NextPage  => (props) => {
                const router = useRouter()
                const options = optionsFunc ? optionsFunc(router) : {};
                const {data, error } = useQuery(Operations.SignupSsrDocument, options)    
                return <WrappedComponent {...props} data={data} error={error} /> ;
                   
            }; 
export const ssrSignupSsr = {
      getServerPage: getServerPageSignupSsr,
      withPage: withPageSignupSsr,
      usePage: useSignupSsr,
    }
export async function getServerPageUserForPasswordReset
    (options: Omit<Apollo.QueryOptions<Types.UserForPasswordResetQueryVariables>, 'query'>, ctx: ApolloClientContext ){
        const apolloClient = getApolloClient(ctx);
        
        const data = await apolloClient.query<Types.UserForPasswordResetQuery>({ ...options, query: Operations.UserForPasswordResetDocument });
        
        const apolloState = apolloClient.cache.extract();

        return {
            props: {
                apolloState: apolloState,
                data: data?.data,
                error: data?.error ?? data?.errors ?? null,
            },
        };
      }
export const useUserForPasswordReset = (
  optionsFunc?: (router: NextRouter)=> QueryHookOptions<Types.UserForPasswordResetQuery, Types.UserForPasswordResetQueryVariables>) => {
  const router = useRouter();
  const options = optionsFunc ? optionsFunc(router) : {};
  return useQuery(Operations.UserForPasswordResetDocument, options);
};
export type PageUserForPasswordResetComp = React.FC<{data?: Types.UserForPasswordResetQuery, error?: Apollo.ApolloError}>;
export const withPageUserForPasswordReset = (optionsFunc?: (router: NextRouter)=> QueryHookOptions<Types.UserForPasswordResetQuery, Types.UserForPasswordResetQueryVariables>) => (WrappedComponent:PageUserForPasswordResetComp) : NextPage  => (props) => {
                const router = useRouter()
                const options = optionsFunc ? optionsFunc(router) : {};
                const {data, error } = useQuery(Operations.UserForPasswordResetDocument, options)    
                return <WrappedComponent {...props} data={data} error={error} /> ;
                   
            }; 
export const ssrUserForPasswordReset = {
      getServerPage: getServerPageUserForPasswordReset,
      withPage: withPageUserForPasswordReset,
      usePage: useUserForPasswordReset,
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
export async function getServerPageVehicleSsr
    (options: Omit<Apollo.QueryOptions<Types.VehicleSsrQueryVariables>, 'query'>, ctx: ApolloClientContext ){
        const apolloClient = getApolloClient(ctx);
        
        const data = await apolloClient.query<Types.VehicleSsrQuery>({ ...options, query: Operations.VehicleSsrDocument });
        
        const apolloState = apolloClient.cache.extract();

        return {
            props: {
                apolloState: apolloState,
                data: data?.data,
                error: data?.error ?? data?.errors ?? null,
            },
        };
      }
export const useVehicleSsr = (
  optionsFunc?: (router: NextRouter)=> QueryHookOptions<Types.VehicleSsrQuery, Types.VehicleSsrQueryVariables>) => {
  const router = useRouter();
  const options = optionsFunc ? optionsFunc(router) : {};
  return useQuery(Operations.VehicleSsrDocument, options);
};
export type PageVehicleSsrComp = React.FC<{data?: Types.VehicleSsrQuery, error?: Apollo.ApolloError}>;
export const withPageVehicleSsr = (optionsFunc?: (router: NextRouter)=> QueryHookOptions<Types.VehicleSsrQuery, Types.VehicleSsrQueryVariables>) => (WrappedComponent:PageVehicleSsrComp) : NextPage  => (props) => {
                const router = useRouter()
                const options = optionsFunc ? optionsFunc(router) : {};
                const {data, error } = useQuery(Operations.VehicleSsrDocument, options)    
                return <WrappedComponent {...props} data={data} error={error} /> ;
                   
            }; 
export const ssrVehicleSsr = {
      getServerPage: getServerPageVehicleSsr,
      withPage: withPageVehicleSsr,
      usePage: useVehicleSsr,
    }