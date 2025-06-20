import { OperationObject } from "openapi3-ts/oas30";

export interface OperationWithRoles extends OperationObject {
  "x-roles"?: string[];
}
