import { RatesData } from "@graphql/types/mutation";
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

@InputType()
export class VehicleUpdateData {
  @Field({ nullable: false })
  public name!: string;

  @Field({ nullable: false })
  public vehicleType!: string;
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

const update = (id: Id, data: VehicleUpdateData) => {
  return new Promise<VehicleDocument>(async (resolve, reject) => {
    try {
      const vehicle = (await Vehicle.getById(id, { throwError: true }))!;

      await vehicle.updateDocument(data);

      await vehicle.save();

      resolve(vehicle);
    } catch (e) {
      reject(e);
    }
  });
};

const updateRates = (id: string, data: RatesData[]) => {
  return new Promise<VehicleDocument>(async (resolve, reject) => {
    try {
      const vehicle = (await Vehicle.getById(id, { throwError: true }))!;

      await vehicle.updateRates(data);

      await vehicle.save();

      resolve(vehicle);
    } catch (e) {
      reject(e);
    }
  });
};

export default {
  create,
  update,
  updateRates,
};
