import { DailyReport, VehicleWork, VehicleWorkDocument } from "@models";
import { Field, Float, InputType } from "type-graphql";

@InputType()
export class VehicleWorkJobData {
  @Field(() => String, { nullable: false })
  public jobTitle!: string;

  @Field(() => Float, { nullable: false })
  public hours!: number;
}

@InputType()
export class VehicleWorkCreateData {
  @Field(() => [String], { nullable: false })
  public vehicles!: String[];

  @Field(() => [VehicleWorkJobData], { nullable: false })
  public jobs!: VehicleWorkJobData[];
}

@InputType()
export class VehicleWorkUpdateData {
  @Field({ nullable: false })
  public jobTitle!: string;

  @Field(() => Float, { nullable: false })
  public hours!: number;
}

const create = (dailyReportId: string, data: VehicleWorkCreateData[]) => {
  return new Promise<VehicleWorkDocument[]>(async (resolve, reject) => {
    try {
      const dailyReport = (await DailyReport.getById(dailyReportId, {
        throwError: true,
      }))!;

      const vehicleWorks: VehicleWorkDocument[] = [];

      for (let i = 0; i < data.length; i++) {
        const currentData = data[i];

        for (let j = 0; j < currentData.jobs.length; j++) {
          vehicleWorks.push.apply(
            vehicleWorks,
            await VehicleWork.createPerVehicle(
              { ...currentData.jobs[j], dailyReport },
              currentData.vehicles
            )
          );
        }
      }

      for (let i = 0; i < vehicleWorks.length; i++) {
        await vehicleWorks[i].save();
      }

      await dailyReport.save();

      resolve(vehicleWorks);
    } catch (e) {
      reject(e);
    }
  });
};

const update = (id: string, data: VehicleWorkUpdateData) => {
  return new Promise<VehicleWorkDocument>(async (resolve, reject) => {
    try {
      const vehicleWork = (await VehicleWork.getById(id, {
        throwError: true,
      }))!;

      await vehicleWork.updateDocument(data);

      await vehicleWork.save();

      resolve(vehicleWork);
    } catch (e) {
      reject(e);
    }
  });
};

const remove = (id: string) => {
  return new Promise(async (resolve, reject) => {
    try {
      const vehicleWork = (await VehicleWork.getById(id, {
        throwError: true,
      }))!;

      await vehicleWork.fullDelete();

      resolve(vehicleWork._id.toString());
    } catch (e) {
      reject(e);
    }
  });
};

export default {
  create,
  update,
  remove,
};
