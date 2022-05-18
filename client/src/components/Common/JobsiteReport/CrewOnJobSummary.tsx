import React from "react";
import {
  CrewTypes,
  JobsiteDayReportFullSnippetFragment,
} from "../../../generated/graphql";
import JobsiteReportOnJobSummary from "./OnJobSummary";

interface IJobsiteReportCrewOnJobSummary {
  dayReports: JobsiteDayReportFullSnippetFragment[];
  crewType: CrewTypes;
}

const JobsiteReportCrewOnJobSummary = ({
  dayReports,
  crewType,
}: IJobsiteReportCrewOnJobSummary) => {
  /**
   * ----- Variables -----
   */

  /**
   * @desc all reports w/ employee reports for the crew type
   */
  const relevantReports: JobsiteDayReportFullSnippetFragment[] =
    React.useMemo(() => {
      return dayReports.filter((report) => report.crewTypes.includes(crewType));
    }, [crewType, dayReports]);

  /**
   * ----- Rendering -----
   */

  return (
    <JobsiteReportOnJobSummary
      crewType={crewType}
      dayReports={relevantReports}
      allDayReports={dayReports}
    />
  );
};

export default JobsiteReportCrewOnJobSummary;
