import { EmployeeWork } from "@models";
import dayjs from "dayjs";

import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";

dayjs.extend(utc);
dayjs.extend(timezone);

const updateToV1 = () => {
  return new Promise<void>(async (resolve, reject) => {
    try {
      const employeeWorks = await EmployeeWork.find({
        schemaVersion: undefined,
      });

      if (employeeWorks.length > 0) {
        console.log(
          `Updating ${employeeWorks.length} EmployeeWork document(s) to Schema Version 1...`
        );

        for (let i = 0; i < employeeWorks.length; i++) {
          const employeeWork = employeeWorks[i];

          if (employeeWork.startTime) {
            const offset = dayjs(employeeWork.startTime)
              .tz("America/Edmonton")
              .utcOffset();
            employeeWork.startTime = dayjs(employeeWork.startTime)
              .add(Math.abs(offset), "minutes")
              .toDate();
          } else {
            employeeWork.startTime = new Date();
          }

          if (employeeWork.endTime) {
            const offset = dayjs(employeeWork.endTime)
              .tz("America/Edmonton")
              .utcOffset();
            employeeWork.endTime = dayjs(employeeWork.endTime)
              .add(Math.abs(offset), "minutes")
              .toDate();
          } else {
            employeeWork.endTime = new Date();
          }

          employeeWork.schemaVersion = 1;

          await employeeWork.save();
        }

        console.log(
          `...successfully updated ${employeeWorks.length} EmployeeWork document(s) to Schema Version 1.`
        );
      }

      resolve();
    } catch (e) {
      reject(e);
    }
  });
};

const updateEmployeeWork = () => {
  return new Promise<void>(async (resolve, reject) => {
    try {
      await updateToV1();

      resolve();
    } catch (e) {
      reject(e);
    }
  });
};

export default updateEmployeeWork;
