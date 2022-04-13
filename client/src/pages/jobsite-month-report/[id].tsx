import { Breadcrumb, Heading } from "@chakra-ui/react";
import { GetServerSideProps } from "next";
import Breadcrumbs from "../../components/Common/Breadcrumbs";
import Card from "../../components/Common/Card";
import Container from "../../components/Common/Container";
import JobsiteMonthEmployeeReports from "../../components/pages/jobsite-month-report/Employees";
import {
  PageJobsiteMonthReportFullComp,
  ssrJobsiteMonthReportFull,
} from "../../generated/page";
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
      {jobsiteMonthReport.crewTypes.map((crewType) => (
        <Card
          key={crewType}
          heading={<Heading size="md">{crewType} Crew</Heading>}
        >
          <JobsiteMonthEmployeeReports
            dayReports={jobsiteMonthReport.dayReports}
            crewType={crewType}
          />
        </Card>
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
