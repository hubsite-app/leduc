import { GetServerSideProps } from "next";
import React from "react";
import Card from "../components/Common/Card";

import Container from "../components/Common/Container";
import DailyReportCard from "../components/Common/DailyReportCard";
import CrewSearchCard from "../components/pages/search/CrewCard";
import EmployeeSearchCard from "../components/pages/search/EmployeeCard";
import JobsiteSearchCard from "../components/pages/search/JobsiteCard";
import VehicleSearchCard from "../components/pages/search/VehicleCard";
import { PageSearchComp, ssrSearch } from "../generated/page";

const Search: PageSearchComp = ({ data }) => {
  const results = data?.search!;

  /**
   * ----- Rendering -----
   */

  const list = React.useMemo(() => {
    return results.map((result) => {
      if (result.employee) {
        return <EmployeeSearchCard employee={result.employee} />;
      } else if (result.vehicle) {
        return <VehicleSearchCard vehicle={result.vehicle} />;
      } else if (result.jobsite) {
        return <JobsiteSearchCard jobsite={result.jobsite} />;
      } else if (result.dailyReport) {
        return <DailyReportCard dailyReport={result.dailyReport} />;
      } else if (result.crew) {
        return <CrewSearchCard crew={result.crew} />
      } else {
        return <Card>Error</Card>;
      }
    });
  }, [results]);

  return <Container>{list}</Container>;
};

export const getServerSideProps: GetServerSideProps = async ({
  params,
  ...ctx
}) => {
  const res = await ssrSearch.getServerPage(
    { variables: { searchString: ctx.query.search_string as string } },
    ctx
  );

  return { ...res };
};

export default Search;
