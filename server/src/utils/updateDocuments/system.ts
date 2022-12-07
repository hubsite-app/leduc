import { System } from "@models";

const updateToV2 = async () => {
  const system = await System.findOne({
    schemaVersion: 1,
  });

  if (!system) return;

  console.log("Updating system document to Schema Version 2...");

  system.internalExpenseOverheadRate = [
    {
      date: new Date(),
      rate: 10,
    },
  ];
  system.schemaVersion = 2;

  await system.save();

  console.log("...successfully updated system document to Schema Version 2.");
};

const updateSystem = async () => {
  await updateToV2();
};

export default updateSystem;
