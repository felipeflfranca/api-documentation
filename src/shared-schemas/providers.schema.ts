import { attributeSchemas } from "../contracts/shared/attribute-schemas";
import { defineSchema } from "../contracts/shared/define-schema";

// export const ProvidersSchema = z
//   .object({
//     id: z.string(),
//     name: z.string(),
//     email: z.string().email(),
//     cpf: z.string(),
//   })
//   .openapi("Providers");

const { document, email, address, name, birth_date } = attributeSchemas;

export const ProvidersSchema = defineSchema({
  document,
  email,
  address,
  name,
  birth_date,
  cpf: document
}).openapi("Providers");
