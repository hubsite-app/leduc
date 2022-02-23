import { DailyReport, DailyReportDocument } from "@models";
import _ids from "@testing/_ids";

export interface SeededDailyReports {
  jobsite_1_base_1_1: DailyReportDocument;
}

const createDailyReports = () => {
  return new Promise<SeededDailyReports>(async (resolve, reject) => {
    try {
      const jobsite_1_base_1_1 = new DailyReport({
        _id: _ids.dailyReports.jobsite_1_base_1_1._id,
        date: new Date("2022-02-23"),
        jobsite: _ids.jobsites.jobsite_1._id,
        crew: _ids.crews.base_1._id,
        approved: true,
        employeeWork: [_ids.employeeWork.jobsite_1_base_1_1_base_foreman_1._id],
        vehicleWork: [_ids.vehicleWork.jobsite_1_base_1_1_skidsteer_1._id],
        production: [_ids.productions.jobsite_1_base_1_1_production_1._id],
        materialShipment: [
          _ids.materialShipments.jobsite_1_base_1_1_shipment_1._id,
        ],
        reportNote: [_ids.reportNotes.jobsite_1_base_1_1_note_1._id],
      });

      const dailyReports = {
        jobsite_1_base_1_1,
      };

      for (let i = 0; i < Object.values(dailyReports).length; i++) {
        await Object.values(dailyReports)[i].save();
      }

      resolve(dailyReports);
    } catch (e) {
      reject(e);
    }
  });
};

export default createDailyReports;
