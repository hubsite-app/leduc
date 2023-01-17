import { DailyReport } from "@models";
import { SupportedMimeTypes } from "@typescript/file";
import { generateForDailyReport, getWorkbookBuffer } from "@utils/excel";
import dayjs from "dayjs";
import { Router } from "express";

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
    `attachment; filename=${jobsite.jobcode}-${crew.name}-${dayjs(
      dailyReport.date
    ).format("YYYY-MM-DD")}.xlsx`
  );

  return res.send(await getWorkbookBuffer(workbook));
});

export default router;
