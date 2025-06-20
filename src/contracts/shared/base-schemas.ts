import { z } from "zod";

/**
 * Document: CPF or CNPJ (11 or 14 digits)
 * Example: 12345678901 or 12345678000199
 */
export const DocumentSchema = z
  .string()
  .regex(/^\d{11,14}$/, "Document must be a valid CPF or CNPJ")
  .describe("Document in numeric format, 11 or 14 digits");

/**
 * ISO date (format: YYYY-MM-DD)
 */
export const DateSchema = z
  .string()
  .regex(/^\d{4}-\d{2}-\d{2}$/, "Format must be YYYY-MM-DD")
  .describe("Date in ISO 8601 format");

/**
 * Phone number including area code (11 digits)
 * Example: 11999999999
 */
export const PhoneSchema = z
  .string()
  .regex(/^\d{11}$/, "Must include area code and number")
  .describe("Phone number with 11 digits");

/**
 * Gender: "Male" or "Female"
 */
export const GenderSchema = z.enum(["Male", "Female"]).describe("Gender");

/**
 * Valid email address
 */
export const EmailSchema = z
  .string()
  .email("Invalid email")
  .describe("Valid email address");

/**
 * Area code (DDD) - 2 digits
 */
export const DddSchema = z
  .string()
  .regex(/^\d{2}$/, "Area code must be 2 digits")
  .describe("Area code (2 digits)");

/**
 * ZIP code - Brazilian format (8 digits)
 */
export const ZipCodeSchema = z
  .string()
  .regex(/^\d{8}$/, "ZIP code must contain 8 numeric digits")
  .describe("Brazilian postal code");

/**
 * Page number (positive integer)
 */
export const PageSchema = z.number().int().positive().describe("Page number");

/**
 * Items per page (positive integer)
 */
export const PerPageSchema = z
  .number()
  .int()
  .positive()
  .describe("Number of items per page");

/**
 * Positive numeric value
 */
export const ValueSchema = z
  .number()
  .nonnegative()
  .describe("Positive numeric value");

/**
 * Required text field
 */
export const TextSchema = z.string().min(1).describe("Required text");

/**
 * Boolean value
 */
export const BooleanSchema = z.boolean().describe("Boolean value");

/**
 * UUID string
 */
export const IdSchema = z.string().uuid().describe("UUID identifier");

/**
 * Numeric ID (positive integer)
 */
export const NumericIdSchema = z
  .number()
  .int()
  .positive()
  .describe("Positive numeric identifier");

/**
 * ISO date-time with time (e.g. 2024-12-31T23:59:59Z)
 */
export const DateTimeSchema = z
  .string()
  .regex(
    /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(?:\.\d+)?Z$/,
    "Format must be ISO 8601 with time (e.g., 2024-12-31T23:59:59Z)"
  )
  .describe("Date and time in ISO 8601 format");

/**
 * Optional address complement
 */
export const ComplementSchema = z
  .string()
  .optional()
  .describe("Optional address complement");
