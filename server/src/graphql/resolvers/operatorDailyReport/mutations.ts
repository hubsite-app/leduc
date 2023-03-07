import { OperatorDailyReport, UserDocument, Vehicle } from "@models";
import { Id } from "@typescript/models";
import { EquipmentUsageUnits } from "@typescript/operatorDailyReport";
import { Field, Float, InputType } from "type-graphql";

@InputType()
class EquipmentUsage {
  @Field(() => Float)
  usage!: number;

  @Field(() => EquipmentUsageUnits)
  unit!: EquipmentUsageUnits;
}

@InputType()
class Checklist {
  @Field()
  walkaroundComplete!: boolean;

  @Field()
  visualInspectionComplete!: boolean;

  @Field()
  oilChecked!: boolean;

  @Field()
  coolantChecked!: boolean;

  @Field()
  fluidsChecked!: boolean;
}

@InputType()
class FunctionChecks {
  @Field()
  backupAlarm!: boolean;

  @Field()
  lights!: boolean;

  @Field()
  fireExtinguisher!: boolean;

  @Field()
  licensePlate!: boolean;
}

@InputType()
class Leak {
  @Field()
  type!: string;

  @Field()
  location!: string;
}

@InputType()
class FluidAdded {
  @Field()
  type!: string;

  @Field(() => Float)
  amount!: number;
}

@InputType()
export class OperatorDailyReportCreateData {
  @Field(() => EquipmentUsage)
  public equipmentUsage!: EquipmentUsage;

  @Field(() => Date)
  public startTime!: Date;

  @Field(() => Checklist)
  public checklist!: Checklist;

  @Field(() => FunctionChecks)
  public functionChecks!: FunctionChecks;

  @Field()
  public malfunction!: boolean;

  @Field()
  public damageObserved!: boolean;

  @Field(() => [Leak])
  public leaks!: Leak[];

  @Field(() => [FluidAdded])
  public fluidsAdded!: FluidAdded[];
}

const create = async (
  vehicleId: Id,
  author: UserDocument,
  data: OperatorDailyReportCreateData
) => {
  const vehicle = await Vehicle.getById(vehicleId);
  if (!vehicle) throw new Error("Unable to find this vehicle");

  const operatorDailyReport = await OperatorDailyReport.createDocument(
    vehicle,
    author,
    data
  );
  await operatorDailyReport.save();

  return operatorDailyReport;
};

export default {
  create,
};
