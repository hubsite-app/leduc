import { SearchClass } from "@graphql/types/search";
import { Crew, DailyReport, Employee, Jobsite, Vehicle } from "@models";

const search = async (searchString: string): Promise<SearchClass[]> => {
  const employeeObjects = await Employee.search(searchString);

  const vehicleObjects = await Vehicle.search(searchString);

  const jobsiteObjects = await Jobsite.search(searchString);

  const dailyReportObjects = await DailyReport.search(searchString);

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
