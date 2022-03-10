import { Types } from "mongoose";
import { ObjectType } from "type-graphql";

import { CrewDocument, JobsiteDocument, JobsiteModel } from "@models";
import { JobsiteSchema } from "..";
import get from "./get";
import { GetByIDOptions, ISearchOptions } from "@typescript/models";

@ObjectType()
export class JobsiteClass extends JobsiteSchema {
  /**
   * ----- Get -----
   */

  public static async getById(
    this: JobsiteModel,
    id: Types.ObjectId | string,
    options?: GetByIDOptions
  ) {
    return get.byId(this, id, options);
  }

  public static async search(
    this: JobsiteModel,
    searchString: string,
    options?: ISearchOptions
  ) {
    return get.search(this, searchString, options);
  }

  public static async getByCrew(this: JobsiteModel, crew: CrewDocument) {
    return get.byCrew(this, crew);
  }

  public async getCrews(this: JobsiteDocument) {
    return get.crews(this);
  }

  public async getDailyReports(this: JobsiteDocument) {
    return get.dailyReports(this);
  }
}
