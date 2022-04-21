import { File, ReportNote, ReportNoteDocument } from "@models";
import { Id } from "@typescript/models";

const removeFile = (reportNoteId: Id, fileId: Id) => {
  return new Promise<ReportNoteDocument>(async (resolve, reject) => {
    try {
      const reportNote = (await ReportNote.getById(reportNoteId, {
        throwError: true,
      }))!;

      const file = (await File.getById(fileId, { throwError: true }))!;

      await reportNote.removeFile(file);

      await file.fullRemove();

      await reportNote.save();

      resolve(reportNote);
    } catch (e) {
      reject(e);
    }
  });
};

export default {
  removeFile,
};
