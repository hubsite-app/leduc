import { FileDocument, ReportNoteDocument } from "@models";
import { IReportNoteUpdate } from "@typescript/reportNote";

const document = (reportNote: ReportNoteDocument, data: IReportNoteUpdate) => {
  return new Promise<void>(async (resolve, reject) => {
    try {
      reportNote.note = data.note;

      resolve();
    } catch (e) {
      reject(e);
    }
  });
};

const addFile = (reportNote: ReportNoteDocument, file: FileDocument) => {
  return new Promise<void>(async (resolve, reject) => {
    try {
      reportNote.files.push(file._id);

      resolve();
    } catch (e) {
      reject(e);
    }
  });
};

export default {
  document,
  addFile,
};
