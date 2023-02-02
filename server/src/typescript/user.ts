import { registerEnumType } from "type-graphql";

export interface IUserCreate {
  name: string;
  email: string;
  password: string;
}

export enum UserRoles {
  User = 1, // Lowerest power in UserType
  ProjectManager = 2, // Highest power in UserType
  Admin = 3, // Type Independent, full power
}

export enum UserTypes {
  Operations = "Operations",
  VehicleMaintenance = "VehicleMaintenance",
}

// Trying to find a better way to manage roles
// eslint-disable-next-line @typescript-eslint/no-unused-vars
enum NewUserRoles {
  Admin = 1,
  ProjectManager = 2,
  Foreman = 3,
  Operator = 4,
}

registerEnumType(UserRoles, {
  name: "UserRoles",
});

export enum UserHomeViewSettings {
  DailyReports = 1,
  GeneralReports = 2,
}

registerEnumType(UserHomeViewSettings, {
  name: "UserHomeViewSettings",
});
