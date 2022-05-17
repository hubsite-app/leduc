import { getUserCrews } from "@graphql/helpers/general";
import { SearchClass } from "@graphql/types/search";
import { Crew, DailyReport, Employee, Jobsite, Vehicle } from "@models";
import { IContext } from "@typescript/graphql";

const search = async (
  searchString: string,
  context: IContext
): Promise<SearchClass[]> => {
  const employeeObjects = await Employee.search(searchString);

  const vehicleObjects = await Vehicle.search(searchString);

  const jobsiteObjects = await Jobsite.search(searchString);

  const dailyReportObjects = await DailyReport.search(searchString, {
    whitelistedCrews: await getUserCrews(context),
  });

  const crewReportObjects = await Crew.search(searchString);

  const searchObjects: SearchClass[] = [
    ...employeeObjects,
    ...vehicleObjects,
    ...jobsiteObjects,
    ...dailyReportObjects,
    ...crewReportObjects,
  ];

  searchObjects.sort((a, b) => b.score - a.score);

  return searchObjects;
};

export default {
  search,
};
