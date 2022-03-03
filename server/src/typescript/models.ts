import { FilterQuery, Types } from "mongoose";

export interface GetByIDOptions {
  throwError?: boolean;
}

export interface IListOptions<Document> {
  offset?: number;
  pageLimit?: number;
  query?: FilterQuery<Document>;
}

export type Id = string | Types.ObjectId;
