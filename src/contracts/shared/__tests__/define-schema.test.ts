import { z } from "zod";
import { defineSchema } from "../define-schema";
import { attributeSchemas } from "../attribute-schemas";

describe("defineSchema", () => {
  it("should create a Zod schema with the correct keys and types", () => {
    const schema = defineSchema({
      document: attributeSchemas.document,
      email: attributeSchemas.email,
    });

    const parsed = schema.parse({
      document: "12345678900",
      email: "teste@email.com",
    });

    expect(parsed.document).toBe("12345678900");
    expect(parsed.email).toBe("teste@email.com");
  });

  it("should throw an error if a required field is missing", () => {
    const schema = defineSchema({
      document: attributeSchemas.document,
      email: attributeSchemas.email,
    });

    expect(() => schema.parse({ document: "12345678900" })).toThrow();
  });

  it("should accept partial schemas", () => {
    const schema = defineSchema({
      phone: attributeSchemas.phone,
    });
    const parsed = schema.parse({ phone: "11999999999" });
    expect(parsed.phone).toBe("11999999999");
  });
}); 