import { User, OperatorDailyReport } from "@models";

const updateToV2 = async () => {
  const operatorDailyReports = await OperatorDailyReport.find({
    schemaVersion: 1,
  });

  if (operatorDailyReports.length > 0) {
    console.log(
      `Updating ${operatorDailyReports.length} OperatorDailyReport document(s) to Schema Version 2...`
    );

    for (let i = 0; i < operatorDailyReports.length; i++) {
      const operatorDailyReport = operatorDailyReports[i];

      // Update `author` to reference employee instead of User
      if (operatorDailyReport.author) {
        const authorUser = await User.getById(operatorDailyReport.author);
        if (!authorUser) {
          throw new Error(
            `Unable to find user ${operatorDailyReport.author} as author of vehicle issue ${operatorDailyReport._id}`
          );
        }

        const authorEmployee = await authorUser?.getEmployee();
        if (!authorEmployee)
          throw new Error(`User ${authorUser._id} does not have an employee`);

        operatorDailyReport.author = authorEmployee._id;
      }

      operatorDailyReport.schemaVersion = 2;

      await operatorDailyReport.save();
    }

    console.log(
      `...successfully updated ${operatorDailyReports.length} OperatorDailyReport document(s) to Schema Version 2.`
    );
  }

  return;
};

const updateOperatorDailyReports = async () => {
  await updateToV2();
};

export default updateOperatorDailyReports;
