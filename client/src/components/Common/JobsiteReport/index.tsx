import {
  JobsiteMonthReportFullSnippetFragment,
  JobsiteYearReportFullSnippetFragment,
} from "../../../generated/graphql";
import JobsiteReportCrewType from "./CrewType";
import JobsiteReportExpenseInvoices from "./ExpenseInvoices";
import JobsiteReportRevenueInvoices from "./RevenueInvoices";
import JobsiteReportSummary from "./Summary";

interface IJobsiteReport {
  report:
    | JobsiteMonthReportFullSnippetFragment
    | JobsiteYearReportFullSnippetFragment;
}

const JobsiteReport = ({ report }: IJobsiteReport) => {
  return (
    <>
      <JobsiteReportSummary report={report} />
      <JobsiteReportExpenseInvoices report={report} />
      <JobsiteReportRevenueInvoices report={report} />
      {report.crewTypes.map((crewType) => (
        <JobsiteReportCrewType
          crewType={crewType}
          key={crewType}
          report={report}
        />
      ))}
    </>
  );
};

export default JobsiteReport;
