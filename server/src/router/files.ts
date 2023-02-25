import { Crew, DailyReport } from "@models";
import { SupportedMimeTypes } from "@typescript/file";
import { generateForDailyReport, getWorkbookBuffer } from "@utils/excel";
import dayjs from "dayjs";
import { Router } from "express";
import archiver from "archiver";
import { generateForVehicles } from "@utils/excel/vehicles";

const router = Router();

router.get("/daily-report/:dailyReportId", async (req, res) => {
  const dailyReport = await DailyReport.getById(req.params.dailyReportId);

  if (!dailyReport) return res.status(404);

  const jobsite = await dailyReport.getJobsite();
  const crew = await dailyReport.getCrew();

  const workbook = await generateForDailyReport(dailyReport);

  res.setHeader("Content-Type", SupportedMimeTypes.XLSX);
  res.setHeader(
    "Content-Disposition",
    `attachment; filename=${dayjs(dailyReport.date).format("YYYY-MM-DD")}-(${jobsite.jobcode
    })-${crew.name}.xlsx`
  );

  return res.send(await getWorkbookBuffer(workbook));
});

router.get("/crew/:crewId", async (req, res) => {
  const crew = await Crew.getById(req.params.crewId);

  if (!crew) return res.status(404).send("Could not find Crew");

  const date = new Date(
    req.query.start_of_month?.toString() || "invalid string"
  );
  if (isNaN(date.getTime())) return res.status(400).send("Invalid date format");

  const dailyReports = await crew.getDailyReportsByMonth(date);

  const archive = archiver("zip", { zlib: { level: 9 } });
  archive.pipe(res);

  res.setHeader("Content-Type", "application/zip");
  res.setHeader(
    "Content-Disposition",
    `attachment; filename=${crew.name}-${dayjs(date).format("MMMM-YYYY")}.zip`
  );

  for (let i = 0; i < dailyReports.length; i++) {
    const workbook = await generateForDailyReport(dailyReports[i]);

    const crew = await dailyReports[i].getCrew();
    const jobsite = await dailyReports[i].getJobsite();

    const buffer = await getWorkbookBuffer(workbook);

    archive.append(buffer, {
      name: `${dayjs(dailyReports[i].date).format("YYYY-MM-DD")}-${crew.name}-${jobsite.jobcode
        }.xlsx`,
    });
  }

  archive.finalize();
});

router.get("/vehicles", async (_req, res) => {
  const workbook = await generateForVehicles();

  res.setHeader("Content-Type", SupportedMimeTypes.XLSX);
  res.setHeader(
    "Content-Disposition",
    "attachment; filename=Vehicle-List.xlsx"
  );

  return res.send(await getWorkbookBuffer(workbook));
});

export default router;
