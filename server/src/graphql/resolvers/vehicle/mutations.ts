import { Crew, CrewDocument, Vehicle, VehicleDocument } from "@models";
import { Id } from "@typescript/models";
import { Field, InputType } from "type-graphql";

@InputType()
export class VehicleCreateData {
  @Field({ nullable: false })
  public name!: string;

  @Field({ nullable: false })
  public vehicleCode!: string;

  @Field({ nullable: false })
  public vehicleType!: string;

  @Field({ nullable: true })
  public rental?: boolean;

  @Field({ nullable: true })
  public sourceCompany?: string;
}

const create = (data: VehicleCreateData, crewId?: Id) => {
  return new Promise<VehicleDocument>(async (resolve, reject) => {
    try {
      const vehicle = await Vehicle.createDocument(data);

      let crew: CrewDocument | undefined;
      if (crewId) {
        crew = (await Crew.getById(crewId, { throwError: true }))!;

        await crew.addVehicle(vehicle._id);
      }

      await vehicle.save();

      if (crew) await crew.save();

      resolve(vehicle);
    } catch (e) {
      reject(e);
    }
  });
};

export default {
  create,
};
