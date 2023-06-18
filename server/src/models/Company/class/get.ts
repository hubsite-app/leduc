import { Types } from "mongoose";
import {
  CompanyDocument,
  CompanyModel,
  Invoice,
  JobsiteDayReport,
  JobsiteMaterial,
  MaterialReportClass,
} from "@models";
import {
  CompanyMaterialReport,
  ICompanySearchObject,
} from "@typescript/company";
import {
  GetByIDOptions,
  IListOptions,
  ISearchOptions,
} from "@typescript/models";
import populateOptions from "@utils/populateOptions";
import { timezoneStartOfDayinUTC } from "@utils/time";
import { CompanySearchIndex, searchIndex } from "@search";

/**
 * ----- Static Methods -----
 */

const byIdDefaultOptions: GetByIDOptions = {
  throwError: false,
};
const byId = async (
  Company: CompanyModel,
  id: Types.ObjectId | string,
  options: GetByIDOptions = byIdDefaultOptions
): Promise<CompanyDocument | null> => {
  options = populateOptions(options, byIdDefaultOptions);

  const company = await Company.findById(id);

  if (!company && options.throwError) {
    throw new Error("Company.getById: unable to find company");
  }

  return company;
};

const byName = async (
  Company: CompanyModel,
  name: string
): Promise<CompanyDocument | null> => {
  const company = await Company.findOne({
    name: { $regex: new RegExp(name, "i") },
    archivedAt: null,
  });

  return company;
};

const search = async (
  Company: CompanyModel,
  searchString: string,
  options?: ISearchOptions
): Promise<ICompanySearchObject[]> => {
  const res = await searchIndex(CompanySearchIndex, searchString, options);

  let companyObjects: { id: string; score: number }[] = res.hits.map((item) => {
    return {
      id: item.id,
      score: 0,
    };
  });

  // Filter out blacklisted ids
  if (options?.blacklistedIds) {
    companyObjects = companyObjects.filter(
      (object) => !options.blacklistedIds?.includes(object.id)
    );
  }

  const companys: ICompanySearchObject[] = [];
  for (let i = 0; i < companyObjects.length; i++) {
    const company = await Company.getById(companyObjects[i].id);
    if (company)
      companys.push({
        company,
        score: companyObjects[i].score,
      });
  }

  return companys;
};

const listDefaultOptions: IListOptions<CompanyDocument> = {
  pageLimit: 9999,
  offset: 0,
};
const list = async (
  Company: CompanyModel,
  options?: IListOptions<CompanyDocument>
): Promise<CompanyDocument[]> => {
  options = populateOptions(options, listDefaultOptions);

  if (options?.query) options.query.archivedAt = null;

  const companys = await Company.find(
    options?.query || { archivedAt: null },
    undefined,
    {
      limit: options?.pageLimit,
      skip: options?.offset,
      sort: {
        name: "asc",
      },
    }
  );

  return companys;
};

/**
 * ----- Methods -----
 */

const materialReports = async (
  company: CompanyDocument
): Promise<CompanyMaterialReport[]> => {
  const jobsiteMaterials = await JobsiteMaterial.getByCompany(company._id);

  // Get unique list of all materials used
  const materialIdString: string[] = jobsiteMaterials
    .map((mat) => mat.material?.toString())
    .filter((mat): mat is string => mat !== undefined);
  const uniqueMaterials = [...new Set(materialIdString)];

  // Create catalog of jobsiteMaterial and it's material
  const jobsiteMaterialCatalog: { [key: string]: string } = {};
  for (let i = 0; i < jobsiteMaterials.length; i++) {
    if (jobsiteMaterials[i].material)
      jobsiteMaterialCatalog[jobsiteMaterials[i]._id.toString()] =
        jobsiteMaterials[i].material?.toString() || "";
  }

  // Instantiate material reports array
  const materialReports: CompanyMaterialReport[] = uniqueMaterials.map(
    (mat) => {
      return {
        material: mat,
        jobDays: [],
      };
    }
  );

  // Get all relevant day reports
  const jobsiteDayReports = await JobsiteDayReport.find({
    "materials.jobsiteMaterial": {
      $in: jobsiteMaterials.map((material) => material._id),
    },
  });

  interface MaterialReportCatalog {
    material: MaterialReportClass;
    date: Date;
    jobsite: string;
  }

  // Make an array of all day material reports
  let dayMaterialReports: MaterialReportCatalog[] = [];
  for (let i = 0; i < jobsiteDayReports.length; i++) {
    dayMaterialReports = [
      ...dayMaterialReports,
      ...jobsiteDayReports[i].materials.map((mat) => {
        return {
          material: mat,
          date: jobsiteDayReports[i].date,
          // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
          jobsite: jobsiteDayReports[i].jobsite!.toString(),
        };
      }),
    ];
  }

  // Populate material reports
  const emptyIndices: number[] = [];
  for (let i = 0; i < materialReports.length; i++) {
    const materialReport = materialReports[i];

    // Find all relevant material reports for this material
    const relevantMaterialReports: MaterialReportCatalog[] =
      dayMaterialReports.filter((mat) => {
        if (
          mat.material.jobsiteMaterial &&
          jobsiteMaterialCatalog[mat.material.jobsiteMaterial.toString()] &&
          materialReport.material ===
          jobsiteMaterialCatalog[mat.material.jobsiteMaterial.toString()]
        )
          return true;
        else return false;
      });

    // Populate material report jobDay array
    for (let i = 0; i < relevantMaterialReports.length; i++) {
      materialReport.jobDays.push({
        jobsite: relevantMaterialReports[i].jobsite,
        date: await timezoneStartOfDayinUTC(relevantMaterialReports[i].date),
        quantity: relevantMaterialReports[i].material.quantity,
      });
    }

    if (materialReport.jobDays.length === 0) emptyIndices.push(i);
  }

  // Remove all reports that don't have any days
  for (let i = 0; i < emptyIndices.length; i++) {
    materialReports.splice(emptyIndices[i] - i, 1);
  }

  return materialReports;
};

const invoices = async (company: CompanyDocument) => {
  const invoices = await Invoice.find({
    company: company._id,
  });

  return invoices;
};

export default {
  byId,
  byName,
  search,
  list,
  materialReports,
  invoices,
};
