import { ReportNoteDocument, ReportNoteModel } from "@models";
import { GetByIDOptions, Id } from "@typescript/models";
import populateOptions from "@utils/populateOptions";

/**
 * ----- Static Methods -----
 */

const byIdDefaultOptions: GetByIDOptions = {
  throwError: false,
};
const byId = (
  ReportNote: ReportNoteModel,
  id: Id,
  options: GetByIDOptions = byIdDefaultOptions
) => {
  return new Promise<ReportNoteDocument | null>(async (resolve, reject) => {
    try {
      options = populateOptions(options, byIdDefaultOptions);

      const reportNote = await ReportNote.findById(id);

      if (!reportNote && options.throwError) {
        throw new Error("ReportNote.getById: unable to find report note");
      }

      resolve(reportNote);
    } catch (e) {
      reject(e);
    }
  });
};

export default {
  byId,
};
