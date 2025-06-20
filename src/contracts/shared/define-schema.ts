/* eslint-disable */
import { z, ZodObject } from "zod";
import { attributeSchemas } from "./attribute-schemas";

export type AttributeSchemas = typeof attributeSchemas;
export type GlossaryAttributeKey = keyof AttributeSchemas;

export function defineSchema<
  T extends Partial<Pick<AttributeSchemas, keyof AttributeSchemas>>
>(shape: T): ZodObject<T> {
  return z.object(shape);
}
