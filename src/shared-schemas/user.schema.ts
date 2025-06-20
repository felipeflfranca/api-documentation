import { attributeSchemas } from "../contracts/shared/attribute-schemas";
import { defineSchema } from "../contracts/shared/define-schema";

const { document, email, address, name, birth_date, city } = attributeSchemas;

export const UserSchema = defineSchema({
  document,
  email,
  address,
  name,
  birth_date,
  city
}).openapi("User");
