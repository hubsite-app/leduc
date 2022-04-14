import { Heading } from "@chakra-ui/react";
import { GetServerSideProps } from "next";
import Breadcrumbs from "../../components/Common/Breadcrumbs";
import Card from "../../components/Common/Card";
import Container from "../../components/Common/Container";
import JobsiteMonthCrewType from "../../components/pages/jobsite-month-report/CrewType";
import JobsiteMonthEmployeeReports from "../../components/pages/jobsite-month-report/Employees";
import JobsiteMonthExpenseInvoiceReports from "../../components/pages/jobsite-month-report/ExpenseInvoices";
import JobsiteMonthMaterialReports from "../../components/pages/jobsite-month-report/Materials";
import JobsiteMonthNonCostedMaterialReports from "../../components/pages/jobsite-month-report/NonCostedMaterials";
import JobsiteMonthRevenueInvoiceReports from "../../components/pages/jobsite-month-report/RevenueInvoices";
import JobsiteMonthSummary from "../../components/pages/jobsite-month-report/Summary";
import JobsiteMonthTruckingReports from "../../components/pages/jobsite-month-report/Trucking";
import JobsiteMonthVehicleReports from "../../components/pages/jobsite-month-report/Vehicles";
import {
  PageJobsiteMonthReportFullComp,
  ssrJobsiteMonthReportFull,
} from "../../generated/page";
import createLink from "../../utils/createLink";
import formatDate from "../../utils/formatDate";

const JobsiteMonthlyReport: PageJobsiteMonthReportFullComp = ({ data }) => {
  const jobsiteMonthReport = data?.jobsiteMonthReport!;

  /**
   * ----- Rendering -----
   */

  return (
    <Container>
      <Breadcrumbs
        crumbs={[
          {
            title: "Jobsites",
          },
          {
            title: `${jobsiteMonthReport.jobsite.jobcode} - ${jobsiteMonthReport.jobsite.name}`,
            link: createLink.jobsite(jobsiteMonthReport.jobsite._id),
          },
          {
            title: "Reports",
          },
          {
            title: formatDate(
              jobsiteMonthReport.startOfMonth,
              "MMMM YYYY",
              true
            ),
          },
        ]}
      />
      <Heading>
        {formatDate(jobsiteMonthReport.startOfMonth, "MMMM YYYY", true)}:{" "}
        {jobsiteMonthReport.jobsite.name} ({jobsiteMonthReport.jobsite.jobcode})
      </Heading>
      <JobsiteMonthSummary jobsiteMonthReport={jobsiteMonthReport} />
      <JobsiteMonthExpenseInvoiceReports
        jobsiteMonthReport={jobsiteMonthReport}
      />
      <JobsiteMonthRevenueInvoiceReports
        jobsiteMonthReport={jobsiteMonthReport}
      />
      {jobsiteMonthReport.crewTypes.map((crewType) => (
        <JobsiteMonthCrewType
          key={crewType}
          crewType={crewType}
          jobsiteMonthReport={jobsiteMonthReport}
        />
      ))}
    </Container>
  );
};

export const getServerSideProps: GetServerSideProps = async ({
  params,
  ...ctx
}) => {
  const res = await ssrJobsiteMonthReportFull.getServerPage(
    { variables: { id: params?.id as string } },
    ctx
  );

  let notFound = false;
  if (!res.props.data.jobsiteMonthReport) notFound = true;

  return { ...res, notFound };
};

export default JobsiteMonthlyReport;
