import { DailyReport, Production, ProductionDocument } from "@models";
import { Field, Float, InputType } from "type-graphql";

@InputType()
export class ProductionUpdateData {
  @Field({ nullable: false })
  public jobTitle!: string;

  @Field(() => Float, { nullable: false })
  public quantity!: number;

  @Field({ nullable: false })
  public unit!: string;

  @Field(() => Date, { nullable: false })
  public startTime!: Date;

  @Field(() => Date, { nullable: false })
  public endTime!: Date;

  @Field({ nullable: true })
  public description?: string;
}

@InputType()
export class ProductionCreateData extends ProductionUpdateData {}

const create = (dailyReportId: string, data: ProductionCreateData) => {
  return new Promise<ProductionDocument>(async (resolve, reject) => {
    try {
      const dailyReport = (await DailyReport.getById(dailyReportId, {
        throwError: true,
      }))!;

      const production = await Production.createDocument({
        ...data,
        dailyReport,
      });

      await production.save();

      await dailyReport.save();

      resolve(production);
    } catch (e) {
      reject(e);
    }
  });
};

const update = (id: string, data: ProductionUpdateData) => {
  return new Promise<ProductionDocument>(async (resolve, reject) => {
    try {
      const production = (await Production.getById(id, { throwError: true }))!;

      await production.updateDocument(data);

      await production.save();

      resolve(production);
    } catch (e) {
      reject(e);
    }
  });
};

const remove = (id: string) => {
  return new Promise<string>(async (resolve, reject) => {
    try {
      const production = (await Production.getById(id, { throwError: true }))!;

      await production.fullDelete();

      resolve(production._id.toString());
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
