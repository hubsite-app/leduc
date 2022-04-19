import { Th, Tr } from "@chakra-ui/react";
import React from "react";
import {
  CrewTypes,
  JobsiteYearMasterReportItemSnippetFragment,
  useJobsiteYearReportSummaryQuery,
} from "../../../generated/graphql";
import createLink from "../../../utils/createLink";
import formatNumber from "../../../utils/formatNumber";
import Loading from "../Loading";
import TextLink from "../TextLink";

interface IJobsiteMasterRow {
  reportItem: JobsiteYearMasterReportItemSnippetFragment;
  crewTypes: CrewTypes[];
}

const JobsiteMasterRow = ({ reportItem, crewTypes }: IJobsiteMasterRow) => {
  /**
   * ----- Hook Initialization -----
   */

  const { data, loading } = useJobsiteYearReportSummaryQuery({
    variables: {
      id: reportItem.report._id,
    },
  });

  /**
   * ----- Variables -----
   */

  const jobsiteYearReport = React.useMemo(() => {
    if (data?.jobsiteYearReport && !loading) return data?.jobsiteYearReport;
    else return undefined;
  }, [data?.jobsiteYearReport, loading]);

  const revenue = React.useMemo(() => {
    if (jobsiteYearReport) {
      return (
        jobsiteYearReport.summary.externalExpenseInvoiceValue +
        jobsiteYearReport.summary.internalExpenseInvoiceValue
      );
    } else return 0;
  }, [jobsiteYearReport]);

  const onSiteExpenses = React.useMemo(() => {
    return (
      reportItem.summary.employeeCost +
      reportItem.summary.vehicleCost +
      reportItem.summary.materialCost +
      reportItem.summary.truckingCost
    );
  }, [reportItem.summary]);

  const totalExpenses = React.useMemo(() => {
    if (jobsiteYearReport) {
      return (
        onSiteExpenses * 1.1 +
        jobsiteYearReport.summary.externalExpenseInvoiceValue +
        jobsiteYearReport.summary.internalExpenseInvoiceValue
      );
    } else return 0;
  }, [jobsiteYearReport, onSiteExpenses]);

  const netIncome = React.useMemo(() => {
    return revenue - totalExpenses;
  }, [revenue, totalExpenses]);

  const margin = React.useMemo(() => {
    return (netIncome / totalExpenses) * 100 || 0;
  }, [netIncome, totalExpenses]);

  const marginMinusConcrete = React.useMemo(() => {
    if (jobsiteYearReport) {
      return (
        (netIncome /
          (totalExpenses -
            jobsiteYearReport.summary.internalExpenseInvoiceValue)) *
          100 || 0
      );
    } else return 0;
  }, [jobsiteYearReport, netIncome, totalExpenses]);

  /**
   * ----- Rendering -----
   */

  return (
    <Tr>
      <Th>
        {jobsiteYearReport ? (
          <TextLink link={createLink.jobsite(jobsiteYearReport.jobsite._id)}>
            {jobsiteYearReport.jobsite.jobcode}
          </TextLink>
        ) : (
          <Loading />
        )}
      </Th>
      <Th>${formatNumber(revenue)}</Th>
      <Th>${formatNumber(onSiteExpenses)}</Th>
      <Th>${formatNumber(onSiteExpenses * 0.1)}</Th>
      <Th>${formatNumber(totalExpenses)}</Th>
      <Th color={netIncome < 0 ? "red.500" : undefined}>
        ${formatNumber(netIncome)}
      </Th>
      <Th color={margin < 0 ? "red.500" : undefined}>
        %{formatNumber(margin)}
      </Th>
      <Th color={marginMinusConcrete < 0 ? "red.500" : undefined}>
        %{formatNumber(marginMinusConcrete)}
      </Th>
      <Th>
        $
        {formatNumber(
          jobsiteYearReport?.summary.internalExpenseInvoiceValue || 0
        )}
      </Th>
      <Th>
        $
        {formatNumber(
          jobsiteYearReport?.summary.externalExpenseInvoiceValue || 0
        )}
      </Th>
      {crewTypes.map((crew) => (
        <>
          <Th>
            $
            {formatNumber(
              reportItem.summary.crewTypeSummaries.find(
                (summary) => summary.crewType === crew
              )?.employeeCost || 0
            )}
          </Th>
          <Th>
            $
            {formatNumber(
              reportItem.summary.crewTypeSummaries.find(
                (summary) => summary.crewType === crew
              )?.vehicleCost || 0
            )}
          </Th>
          <Th>
            $
            {formatNumber(
              reportItem.summary.crewTypeSummaries.find(
                (summary) => summary.crewType === crew
              )?.materialCost || 0
            )}
          </Th>
          <Th>
            $
            {formatNumber(
              reportItem.summary.crewTypeSummaries.find(
                (summary) => summary.crewType === crew
              )?.truckingCost || 0
            )}
          </Th>
        </>
      ))}
    </Tr>
  );
};

export default JobsiteMasterRow;
