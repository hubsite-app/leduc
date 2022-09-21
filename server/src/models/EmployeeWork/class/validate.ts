import { EmployeeWorkDocument } from "@models";

const document = async (employeeWork: EmployeeWorkDocument) => {
  if (
    new Date(employeeWork.startTime).getTime() >
    new Date(employeeWork.endTime).getTime()
  )
    throw new Error("Start time must be after end time");
};

export default {
  document,
};
