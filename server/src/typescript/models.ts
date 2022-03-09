import { FilterQuery, Types } from "mongoose";

export interface GetByIDOptions {
  throwError?: boolean;
}

export interface IListOptions<Document> {
  offset?: number;
  pageLimit?: number;
  query?: FilterQuery<Document>;
}

export interface ISearchOptions {
  limit?: number;
  blacklistedIds?: string[];
}

export type Id = string | Types.ObjectId;
