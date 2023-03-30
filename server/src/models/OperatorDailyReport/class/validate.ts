import { OperatorDailyReportDocument } from "@models";

const document = (operatorDailyReport: OperatorDailyReportDocument) => {
  if (!operatorDailyReport.equipmentUsage.usage)
    throw new Error("Must provide equipment usage");

  for (let i = 0; i < operatorDailyReport.leaks.length; i++) {
    const leak = operatorDailyReport.leaks[i];

    if (!leak.type) throw new Error("Leak must include type");
    if (!leak.location) throw new Error("Leak must include location");
  }

  for (let i = 0; i < operatorDailyReport.fluidsAdded.length; i++) {
    const fluidAdded = operatorDailyReport.fluidsAdded[i];

    if (!fluidAdded.type) throw new Error("Fluid added must include type");
    if (!fluidAdded.amount) throw new Error("Fluid added must include amount");
  }
};

export default {
  document,
};
