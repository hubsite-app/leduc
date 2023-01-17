import ExcelJS from "exceljs";
import { DailyReportDocument } from "@models";
import dayjs from "dayjs";

export const generateForDailyReport = async (
  dailyReport: DailyReportDocument
) => {
  const workbook = new ExcelJS.Workbook();

  const worksheet = workbook.addWorksheet("Report");

  const jobsite = await dailyReport.getJobsite();
  const crew = await dailyReport.getCrew();

  /**
   * Setup title and note row
   */

  const titleRow = worksheet.addRow([
    `${jobsite.name} (${jobsite.jobcode}) - ${crew.name}: ${dayjs(
      dailyReport.date
    ).format("MMMM D, YYYY")}`,
  ]);

  titleRow.getCell(1).font = {
    bold: true,
  };

  const reportNotes = await dailyReport.getReportNote();
  const noteRow = worksheet.addRow(["Notes:", reportNotes?.note || ""]);

  noteRow.getCell(1).font = {
    bold: true,
  };

  worksheet.mergeCells(
    `${noteRow.getCell(2).address}:${noteRow.getCell(8).address}`
  );

  /**
   * Employee Work
   */

  const FIRST_TABLE_ROW = 5;

  const employeeHours = await dailyReport.getEmployeeWork();

  if (employeeHours.length > 0) {
    const employeeWorkCatalog: {
      name: string;
      job: string;
      startTime: Date;
      endTime: Date;
      totalHours: number;
    }[] = [];
    for (let i = 0; i < employeeHours.length; i++) {
      const work = employeeHours[i];
      const employee = await work.getEmployee();

      employeeWorkCatalog.push({
        name: employee.name,
        job: work.jobTitle,
        startTime: work.startTime,
        endTime: work.endTime,
        totalHours: Math.abs(dayjs(work.startTime).diff(work.endTime, "hours")),
      });
    }

    worksheet.getRow(FIRST_TABLE_ROW - 1).getCell(1).value = "Employee Hours";
    worksheet.getRow(FIRST_TABLE_ROW - 1).getCell(1).font = {
      bold: true,
    };
    worksheet.addTable({
      name: "Employee_Hours",
      ref: worksheet.getRow(FIRST_TABLE_ROW).getCell(1).address,
      totalsRow: true,
      columns: [
        { name: "Employee", filterButton: true },
        { name: "Job", filterButton: true },
        { name: "Start Time", filterButton: true },
        { name: "End Time", filterButton: true },
        { name: "Hours", filterButton: true, totalsRowFunction: "sum" },
      ],
      rows: [
        ...employeeWorkCatalog.map((work) => {
          return [
            work.name,
            work.job,
            dayjs(work.startTime).format("h:mm a"),
            dayjs(work.endTime).format("h:mm a"),
            work.totalHours,
          ];
        }),
      ],
    });
  }

  /**
   * Vehicle Work
   */

  const vehicleWork = await dailyReport.getVehicleWork();

  if (vehicleWork.length > 0) {
    const vehicleWorkCatalog: {
      name: string;
      job: string;
      hours: number;
    }[] = [];
    for (let i = 0; i < vehicleWork.length; i++) {
      const work = vehicleWork[i];
      const vehicle = await work.getVehicle();

      let name = "Not Found";
      if (vehicle) {
        name = vehicle.name;
        if (vehicle.vehicleCode) name = `${vehicle.vehicleCode} - ` + name;
      }
      vehicleWorkCatalog.push({
        name,
        job: work.jobTitle || "",
        hours: work.hours,
      });
    }

    worksheet.getRow(FIRST_TABLE_ROW - 1).getCell(7).value = "Vehicle Hours";
    worksheet.getRow(FIRST_TABLE_ROW - 1).getCell(7).font = {
      bold: true,
    };
    worksheet.addTable({
      name: "Vehicle_Hours",
      ref: worksheet.getRow(FIRST_TABLE_ROW).getCell(7).address,
      totalsRow: true,
      columns: [
        { name: "Vehicle", filterButton: true },
        { name: "Job", filterButton: true },
        { name: "Hours", filterButton: true, totalsRowFunction: "sum" },
      ],
      rows: [
        ...vehicleWorkCatalog.map((work) => {
          return [work.name, work.job, work.hours];
        }),
      ],
    });
  }

  /**
   * Material Shipments
   */

  const SECOND_TABLE_ROW = (worksheet.lastRow?.number || 1) + 3;

  const materialShipments = await dailyReport.getMaterialShipments();

  if (materialShipments.length > 0) {
    const materialShipmentCatalog: {
      shipment: string;
      quantity: number;
      vehicle: string;
      hours: number;
    }[] = [];
    for (let i = 0; i < materialShipments.length; i++) {
      const shipment = materialShipments[i];

      let material = `${shipment.supplier} - ${shipment.shipmentType}`;
      if (!shipment.noJobsiteMaterial) {
        const jobsiteMaterial = await shipment.getJobsiteMaterial();
        if (jobsiteMaterial) {
          const supplier = await jobsiteMaterial.getSupplier();
          const materialDoc = await jobsiteMaterial.getMaterial();

          material = `${supplier.name} - ${materialDoc.name}`;
        }
      }

      materialShipmentCatalog.push({
        shipment: material,
        quantity: shipment.quantity,
        vehicle: `${shipment.vehicleObject?.source} / ${shipment.vehicleObject?.vehicleType} / ${shipment.vehicleObject?.vehicleCode}`,
        hours: Math.abs(
          dayjs(shipment.startTime).diff(shipment.endTime, "hours")
        ),
      });
    }

    worksheet.getRow(SECOND_TABLE_ROW - 1).getCell(1).value =
      "Material Shipments";
    worksheet.getRow(SECOND_TABLE_ROW - 1).getCell(1).font = {
      bold: true,
    };
    worksheet.addTable({
      name: "Material_Shipments",
      ref: worksheet.getRow(SECOND_TABLE_ROW).getCell(1).address,
      totalsRow: true,
      columns: [
        { name: "Shipment", filterButton: true },
        { name: "Quantity", filterButton: true, totalsRowFunction: "sum" },
        { name: "Vehicle", filterButton: true },
        { name: "Hours", filterButton: true, totalsRowFunction: "sum" },
      ],
      rows: [
        ...materialShipmentCatalog.map((work) => {
          return [work.shipment, work.quantity, work.vehicle, work.hours];
        }),
      ],
    });
  }

  // Auto Column Width
  worksheet.columns.forEach((column) => {
    let dataMax = 2;

    if (column.eachCell)
      column.eachCell((cell) => {
        cell.numFmt = "#,##0.00";
      });

    if (column.values) {
      column.values.forEach((value, index) => {
        if (
          index !== 1 &&
          index !== 2 &&
          value &&
          (typeof value === "string" || typeof value === "number") &&
          `${value}`.length > dataMax
        )
          dataMax = `${value}`.length + 4;
      });
    }

    column.width = dataMax;
  });

  return workbook;
};
