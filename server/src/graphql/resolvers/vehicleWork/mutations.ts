import { VehicleWork, VehicleWorkDocument } from "@models";
import { Field, Float, InputType } from "type-graphql";

@InputType()
export class VehicleWorkUpdateData {
  @Field({ nullable: false })
  public jobTitle!: string;

  @Field(() => Float, { nullable: false })
  public hours!: number;
}

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

export default {
  update,
};
