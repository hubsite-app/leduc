import { EmployeeWorkDocument } from "@models";
import { ObjectType } from "type-graphql";
import { EmployeeWorkSchema } from "..";
import get from "./get";

@ObjectType()
export class EmployeeWorkClass extends EmployeeWorkSchema {
  /**
   * ----- Get -----
   */

  public async getEmployee(this: EmployeeWorkDocument) {
    return get.employee(this);
  }
}
