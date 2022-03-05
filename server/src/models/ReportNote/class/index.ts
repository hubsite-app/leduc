import { ReportNoteDocument, ReportNoteModel } from "@models";
import { GetByIDOptions, Id } from "@typescript/models";
import { IReportNoteCreate, IReportNoteUpdate } from "@typescript/reportNote";
import { ObjectType } from "type-graphql";
import { ReportNoteSchema } from "..";
import create from "./create";
import get from "./get";
import update from "./update";

@ObjectType()
export class ReportNoteClass extends ReportNoteSchema {
  /**
   * ----- Get -----
   */

  public static async getById(
    this: ReportNoteModel,
    id: Id,
    options?: GetByIDOptions
  ) {
    return get.byId(this, id, options);
  }

  /**
   * ----- Create -----
   */

  public static async createDocument(
    this: ReportNoteModel,
    data: IReportNoteCreate
  ) {
    return create.document(this, data);
  }

  /**
   * ----- Update -----
   */

  public async updateDocument(
    this: ReportNoteDocument,
    data: IReportNoteUpdate
  ) {
    return update.document(this, data);
  }
}
