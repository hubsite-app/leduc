import {
  DailyReport,
  MaterialShipment,
  MaterialShipmentDocument,
} from "@models";
import { Field, Float, InputType } from "type-graphql";

@InputType()
export class MaterialShipmentUpdateData {
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

  @Field({ nullable: true })
  public supplier?: string;
}

@InputType()
export class MaterialShipmentCreateData extends MaterialShipmentUpdateData {}

const create = (dailyReportId: string, data: MaterialShipmentCreateData) => {
  return new Promise<MaterialShipmentDocument>(async (resolve, reject) => {
    try {
      const dailyReport = (await DailyReport.getById(dailyReportId, {
        throwError: true,
      }))!;

      const materialShipment = await MaterialShipment.createDocument({
        ...data,
        dailyReport,
      });

      await materialShipment.save();

      await dailyReport.save();

      resolve(materialShipment);
    } catch (e) {
      reject(e);
    }
  });
};

const update = (id: string, data: MaterialShipmentUpdateData) => {
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
