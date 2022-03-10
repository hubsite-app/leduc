import { SearchClass } from "@graphql/types/search";
import { DailyReport, Employee, Jobsite, Vehicle } from "@models";

const search = (searchString: string) => {
  return new Promise<SearchClass[]>(async (resolve, reject) => {
    try {
      const employeeObjects = await Employee.search(searchString);

      const vehicleObjects = await Vehicle.search(searchString);

      const jobsiteObjects = await Jobsite.search(searchString);

      const dailyReportObjects = await DailyReport.search(searchString);

      const searchObjects: SearchClass[] = [
        ...employeeObjects,
        ...vehicleObjects,
        ...jobsiteObjects,
        ...dailyReportObjects,
      ];

      searchObjects.sort((a, b) => b.score - a.score);

      resolve(searchObjects);
    } catch (e) {
      reject(e);
    }
  });
};

export default {
  search,
};
