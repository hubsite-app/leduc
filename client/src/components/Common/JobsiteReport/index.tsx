import { Heading, SimpleGrid, Stack } from "@chakra-ui/react";
import {
  JobsiteMonthReportFullSnippetFragment,
  JobsiteYearReportFullSnippetFragment,
} from "../../../generated/graphql";
import Card from "../Card";
import JobsiteReportCrewType from "./CrewType";
import JobsiteReportExpenseInvoices from "./ExpenseInvoices";
import JobsiteReportOnJobSummary from "./OnJobSummary";
import JobsiteReportRevenueInvoices from "./RevenueInvoices";
import JobsiteReportSummary from "./Summary";

interface IJobsiteReport {
  report:
    | JobsiteMonthReportFullSnippetFragment
    | JobsiteYearReportFullSnippetFragment;
}

const JobsiteReport = ({ report }: IJobsiteReport) => {
  return (
    <Stack spacing={2}>
      <JobsiteReportSummary report={report} />

      <SimpleGrid columns={[2]} spacingX={2}>
        <JobsiteReportExpenseInvoices report={report} />
        <JobsiteReportRevenueInvoices report={report} />
      </SimpleGrid>

      {report.crewTypes.map((crewType) => (
        <JobsiteReportCrewType
          crewType={crewType}
          key={crewType}
          report={report}
        />
      ))}

      <Card heading={<Heading size="md">On Job Summary</Heading>}>
        <JobsiteReportOnJobSummary dayReports={report.dayReports} />
      </Card>
    </Stack>
  );
};

export default JobsiteReport;
