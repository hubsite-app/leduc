import { JobsiteYearReport } from "@models";
import { Id } from "@typescript/models";
import ExcelJS from "exceljs";
import { appendFile, writeFile } from "fs";
import path from "path";

function toArrayBuffer(buf: Buffer) {
  const ab = new ArrayBuffer(buf.length);
  const view = new Uint8Array(ab);
  for (let i = 0; i < buf.length; ++i) {
    view[i] = buf[i];
  }
  return view;
}

const excel = async (id: Id) => {
  const jobsiteYearReport = await JobsiteYearReport.getById(id);
  if (!jobsiteYearReport) throw new Error("Can't find");

  console.log(jobsiteYearReport);
  const workbook = new ExcelJS.Workbook();

  const worksheet = workbook.addWorksheet("Sheet 1");

  worksheet.columns = [
    { header: "Id", key: "id", width: 10 },
    { header: "Name", key: "name", width: 32 },
    { header: "D.O.B.", key: "dob", width: 15 },
  ];

  worksheet.addRow({ id: 1, name: "John Doe", dob: new Date(1970, 1, 1) });
  worksheet.addRow({ id: 2, name: "Jane Doe", dob: new Date(1965, 1, 7) });

  workbook.xlsx
    .writeFile(path.join(__dirname, "test.xlsx"))
    .then(() => console.log("saved"));

  return;
};

export default excel;
