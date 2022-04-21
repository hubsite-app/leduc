import { ReportNoteDocument, FileDocument } from "@models";

const file = (reportNote: ReportNoteDocument, file: FileDocument) => {
  return new Promise<void>(async (resolve, reject) => {
    try {
      const index = reportNote.files.findIndex(
        (fileId) => fileId!.toString() === file._id.toString()
      );

      if (index !== -1) {
        reportNote.files.splice(index, 1);
      }

      resolve();
    } catch (e) {
      reject(e);
    }
  });
};

export default {
  file,
};
