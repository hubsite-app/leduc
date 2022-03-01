import { FilterQuery } from "mongoose";

export interface GetByIDOptions {
  throwError?: boolean;
}

export interface IListOptions<Document> {
  offset?: number;
  pageLimit?: number;
  query?: FilterQuery<Document>;
}
