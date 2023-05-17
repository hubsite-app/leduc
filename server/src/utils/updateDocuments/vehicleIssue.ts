import { User, VehicleIssue } from "@models";

const updateToV2 = async () => {
  const vehicleIssues = await VehicleIssue.find({
    schemaVersion: 1,
  });

  if (vehicleIssues.length > 0) {
    console.log(
      `Updating ${vehicleIssues.length} VehicleIssue document(s) to Schema Version 2...`
    );

    for (let i = 0; i < vehicleIssues.length; i++) {
      const vehicleIssue = vehicleIssues[i];

      // Update `author` to reference employee instead of User
      if (vehicleIssue.author) {
        const authorUser = await User.getById(vehicleIssue.author);
        if (!authorUser) {
          throw new Error(
            `Unable to find user ${vehicleIssue.author} as author of vehicle issue ${vehicleIssue._id}`
          );
        }

        const authorEmployee = await authorUser?.getEmployee();
        if (!authorEmployee)
          throw new Error(`User ${authorUser._id} does not have an employee`);

        vehicleIssue.author = authorEmployee._id;
      }

      // Update `assignedTo` to reference employee instead of User
      if (vehicleIssue.assignedTo) {
        const assignedToUser = await User.getById(vehicleIssue.assignedTo);
        if (!assignedToUser) {
          // Cannot find user
          // Caused by user this referenced being deleted
          // This is why I am refactoring it to use employees,
          // as they are not deleted
          vehicleIssue.assignedTo = undefined;
        } else {
          const assignedToEmployee = await assignedToUser.getEmployee();
          if (!assignedToEmployee)
            throw new Error(
              `User ${assignedToUser._id} does not have an employee`
            );

          vehicleIssue.assignedTo = assignedToEmployee._id;
        }
      }

      vehicleIssue.schemaVersion = 2;

      await vehicleIssue.save();
    }

    console.log(
      `...successfully updated ${vehicleIssues.length} VehicleIssue document(s) to Schema Version 2.`
    );
  }

  return;
};

const updateVehicleIssues = async () => {
  await updateToV2();
};

export default updateVehicleIssues;
