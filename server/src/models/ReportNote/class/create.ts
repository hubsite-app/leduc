import { ReportNoteDocument, ReportNoteModel } from "@models";
import { IReportNoteCreate } from "@typescript/reportNote";

const document = (ReportNote: ReportNoteModel, data: IReportNoteCreate) => {
  return new Promise<ReportNoteDocument>(async (resolve, reject) => {
    try {
      const reportNote = new ReportNote({
        note: data.note,
      });

      await data.dailyReport.setReportNote(reportNote);

      resolve(reportNote);
    } catch (e) {
      reject(e);
    }
  });
};

export default {
  document,
};
