import {
  UserDocument,
  VehicleDocument,
  VehicleIssueDocument,
  VehicleIssueModel,
} from "@models";
import { GetByIDOptions, Id, IListOptions } from "@typescript/models";
import { IVehicleIssueCreate } from "@typescript/vehicleIssue";
import { ObjectType } from "type-graphql";
import { VehicleIssueSchema } from "../schema";
import create from "./create";
import get from "./get";
import interact from "./interact";
import update from "./update";

@ObjectType()
export class VehicleIssueClass extends VehicleIssueSchema {
  /**
   * --- Get ---
   */

  public static async getById(
    this: VehicleIssueModel,
    id: Id,
    options?: GetByIDOptions
  ) {
    return get.byId(this, id, options);
  }

  public static async getList(
    this: VehicleIssueModel,
    options?: IListOptions<VehicleIssueDocument>
  ) {
    return get.list(this, options);
  }

  public static async getByVehicle(this: VehicleIssueModel, vehicleId: Id) {
    return get.byVehicle(this, vehicleId);
  }

  public async getVehicle(this: VehicleIssueDocument) {
    return get.vehicle(this);
  }

  public async getAuthor(this: VehicleIssueDocument) {
    return get.author(this);
  }

  public async getOperatorDailyReport(this: VehicleIssueDocument) {
    return get.operatorDailyReport(this);
  }

  public async getAssignedTo(this: VehicleIssueDocument) {
    return get.assignedTo(this);
  }

  public async getLink(this: VehicleIssueDocument) {
    return get.link(this);
  }

  /**
   * --- Create ---
   */

  public static async createDocument(
    this: VehicleIssueModel,
    vehicle: VehicleDocument,
    author: UserDocument,
    data: IVehicleIssueCreate
  ) {
    return create.document(this, vehicle, author, data);
  }

  /**
   * --- Update ---
   */

  public async updateAssignedTo(
    this: VehicleIssueDocument,
    assignedTo?: UserDocument
  ) {
    return update.assignedTo(this, assignedTo);
  }

  public async close(this: VehicleIssueDocument) {
    return update.close(this);
  }

  /**
   * --- Interact ---
   */

  public async sendNotifications(this: VehicleIssueDocument) {
    return interact.sendNotifications(this);
  }

  public async sendAssignedToNotification(this: VehicleIssueDocument) {
    return interact.sendAssignedToNotifiation(this);
  }

  public async sendSubscribedNotifications(this: VehicleIssueDocument) {
    return interact.sendSubscribedNotifications(this);
  }
}
