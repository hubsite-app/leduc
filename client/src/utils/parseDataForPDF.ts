import dayjs from "dayjs";
import {
  EmployeeWorkCardSnippetFragment,
  VehicleWorkCardSnippetFragment,
} from "../generated/graphql";

export interface IParsedEmployeeWork {
  employee: {
    _id: string;
    name: string;
  };
  jobs: {
    jobTitle: string;
    startTime: Date;
    endTime: Date;
    hours: number;
  }[];
  totalHours: number;
}

const employeeWork = (employeeWorks: EmployeeWorkCardSnippetFragment[]) => {
  const parsedEmployeeWork: IParsedEmployeeWork[] = [];

  const allEmployeeIds = Array.from(
    new Set(employeeWorks.map((work) => work.employee._id))
  );

  for (let i = 0; i < allEmployeeIds.length; i++) {
    const employeesWork = employeeWorks.filter(
      (work) => work.employee._id === allEmployeeIds[i]
    );

    let totalHours = 0;
    const jobs: IParsedEmployeeWork["jobs"] = employeesWork.map((work) => {
      const hours =
        Math.abs(dayjs(work.startTime).diff(work.endTime, "minutes")) / 60;

      totalHours += hours;

      return {
        startTime: work.startTime,
        endTime: work.endTime,
        jobTitle: work.jobTitle,
        hours,
      };
    });

    parsedEmployeeWork.push({
      employee: {
        name: employeesWork[0].employee.name,
        _id: employeesWork[0]._id,
      },
      jobs,
      totalHours,
    });
  }

  return parsedEmployeeWork;
};

export interface IParsedVehicleWork {
  vehicle: {
    _id: string;
    name: string;
  };
  jobs: {
    jobTitle: string;
    hours: number;
  }[];
  totalHours: number;
}

const vehicleWork = (
  vehicleWork: VehicleWorkCardSnippetFragment[]
): IParsedVehicleWork[] => {
  const parsedVehicleWork: IParsedVehicleWork[] = [];

  const allVehicleIds = Array.from(
    new Set(vehicleWork.map((work) => work.vehicle._id))
  );

  for (let i = 0; i < allVehicleIds.length; i++) {
    const vehiclesWork = vehicleWork.filter(
      (work) => work.vehicle._id === allVehicleIds[i]
    );

    let totalHours = 0;
    const jobs: IParsedVehicleWork["jobs"] = vehiclesWork.map((work) => {
      totalHours += work.hours;

      return {
        jobTitle: work.jobTitle,
        hours: work.hours,
      };
    });

    parsedVehicleWork.push({
      vehicle: {
        name: vehiclesWork[0].vehicle.name,
        _id: vehiclesWork[0]._id,
      },
      jobs,
      totalHours,
    });
  }

  return parsedVehicleWork;
};

const parseDataForPDF = {
  employeeWork,
  vehicleWork,
};

export default parseDataForPDF;
