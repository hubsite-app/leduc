import { Types } from "mongoose";

import {
  CrewDocument,
  CrewModel,
  DailyReport,
  DailyReportDocument,
  Employee,
  EmployeeDocument,
  Jobsite,
  JobsiteDocument,
  Vehicle,
  VehicleDocument,
} from "@models";
import { GetByIDOptions, ISearchOptions } from "@typescript/models";
import populateOptions from "@utils/populateOptions";
import { ICrewSearchObject } from "@typescript/crew";
import ElasticsearchClient from "@elasticsearch/client";
import ElasticSearchIndices from "@constants/ElasticSearchIndices";
import { IHit } from "@typescript/elasticsearch";

/**
 * ----- Static Methods -----
 */

const byIdDefaultOptions: GetByIDOptions = {
  throwError: false,
};
const byId = async (
  Crew: CrewModel,
  id: Types.ObjectId | string,
  options: GetByIDOptions = byIdDefaultOptions
): Promise<CrewDocument | null> => {
  options = populateOptions(options, byIdDefaultOptions);

  const crew = await Crew.findById(id);

  if (!crew && options.throwError) {
    throw new Error("Crew.getById: unable to find crew");
  }

  return crew;
};

const search = async (
  Crew: CrewModel,
  searchString: string,
  options?: ISearchOptions
): Promise<ICrewSearchObject[]> => {
  const res = await ElasticsearchClient.search({
    index: ElasticSearchIndices.Crew,
    body: {
      query: {
        multi_match: {
          query: searchString.toLowerCase(),
          fuzziness: "AUTO",
          fields: ["name^2"],
        },
      },
    },
    size: options?.limit,
  });

  let crewObjects: { id: string; score: number }[] = res.body.hits.hits.map(
    (item: IHit) => {
      return {
        id: item._id,
        score: item._score,
      };
    }
  );

  // Filter out blacklisted ids
  if (options?.blacklistedIds) {
    crewObjects = crewObjects.filter(
      (object) => !options.blacklistedIds?.includes(object.id)
    );
  }

  const crews: ICrewSearchObject[] = [];
  for (let i = 0; i < crewObjects.length; i++) {
    const crew = await Crew.getById(crewObjects[i].id);
    if (crew)
      crews.push({
        crew,
        score: crewObjects[i].score,
      });
  }

  return crews;
};

const list = async (Crew: CrewModel): Promise<CrewDocument[]> => {
  const crews = await Crew.find({});

  return crews;
};

const byVehicle = async (
  Crew: CrewModel,
  vehicle: VehicleDocument
): Promise<CrewDocument[]> => {
  const crews = await Crew.find({ vehicles: vehicle._id });

  return crews;
};

/**
 * ----- Methods -----
 */

const employees = async (crew: CrewDocument): Promise<EmployeeDocument[]> => {
  const employees: EmployeeDocument[] = await Employee.find({
    _id: { $in: crew.employees },
  });

  return employees;
};

const vehicles = async (crew: CrewDocument): Promise<VehicleDocument[]> => {
  const vehicles = await Vehicle.find({ _id: { $in: crew.vehicles } });

  return vehicles;
};

const jobsites = async (crew: CrewDocument): Promise<JobsiteDocument[]> => {
  const jobsites = await Jobsite.getByCrew(crew);

  return jobsites;
};

const dailyReports = async (
  crew: CrewDocument
): Promise<DailyReportDocument[]> => {
  const dailyReports = await DailyReport.find({ crew: crew._id }).sort({
    date: -1,
  });

  return dailyReports;
};

export default {
  byId,
  search,
  list,
  byVehicle,
  employees,
  vehicles,
  jobsites,
  dailyReports,
};
