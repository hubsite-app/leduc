import {
  DailyReport,
  MaterialShipment,
  MaterialShipmentDocument,
} from "@models";
import { Field, Float, InputType } from "type-graphql";

@InputType()
export class MaterialShipmentShipmentData {
  @Field({ nullable: false })
  public shipmentType!: string;

  @Field(() => Float, { nullable: false })
  public quantity!: number;

  @Field({ nullable: false })
  public unit!: string;

  @Field(() => Date, { nullable: true })
  public startTime?: Date;

  @Field(() => Date, { nullable: true })
  public endTime?: Date;

  @Field({ nullable: false })
  public supplier!: string;
}

@InputType()
export class MaterialShipmentVehicleObjectData {
  @Field({ nullable: false })
  public source!: string;

  @Field({ nullable: false })
  public vehicleType!: string;

  @Field({ nullable: false })
  public vehicleCode!: string;
}

@InputType()
export class MaterialShipmentCreateData {
  @Field(() => [MaterialShipmentShipmentData])
  public shipments!: MaterialShipmentShipmentData[];

  @Field(() => MaterialShipmentVehicleObjectData, { nullable: false })
  public vehicleObject!: MaterialShipmentVehicleObjectData;
}

const create = (dailyReportId: string, data: MaterialShipmentCreateData[]) => {
  return new Promise<MaterialShipmentDocument[]>(async (resolve, reject) => {
    try {
      const dailyReport = (await DailyReport.getById(dailyReportId, {
        throwError: true,
      }))!;

      const materialShipments: MaterialShipmentDocument[] = [];

      for (let i = 0; i < data.length; i++) {
        const currentData = data[i];

        for (let j = 0; j < currentData.shipments.length; j++) {
          materialShipments.push(
            await MaterialShipment.createDocument({
              vehicleObject: currentData.vehicleObject,
              ...currentData.shipments[j],
              dailyReport,
            })
          );
        }
      }

      for (let i = 0; i < materialShipments.length; i++) {
        await materialShipments[i].save();
      }

      await dailyReport.save();

      resolve(materialShipments);
    } catch (e) {
      reject(e);
    }
  });
};

const update = (id: string, data: MaterialShipmentShipmentData) => {
  return new Promise<MaterialShipmentDocument>(async (resolve, reject) => {
    try {
      const materialShipment = (await MaterialShipment.getById(id, {
        throwError: true,
      }))!;

      await materialShipment.updateDocument(data);

      await materialShipment.save();

      resolve(materialShipment);
    } catch (e) {
      reject(e);
    }
  });
};

const remove = (id: string) => {
  return new Promise<string>(async (resolve, reject) => {
    try {
      const materialShipment = (await MaterialShipment.getById(id, {
        throwError: true,
      }))!;

      await materialShipment.fullDelete();

      resolve(materialShipment._id.toString());
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
