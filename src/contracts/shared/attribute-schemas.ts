import {
  ComplementSchema,
  DateSchema,
  DateTimeSchema,
  DddSchema,
  DocumentSchema,
  EmailSchema,
  GenderSchema,
  IdSchema,
  NumericIdSchema,
  PageSchema,
  PerPageSchema,
  PhoneSchema,
  TextSchema,
  ValueSchema,
  ZipCodeSchema,
} from "./base-schemas";

export const attributeSchemas = {
  document: DocumentSchema,
  birth_date: DateSchema,
  phone: PhoneSchema,
  gender: GenderSchema,
  email: EmailSchema,
  ddd: DddSchema,
  zip_code: ZipCodeSchema,
  page: PageSchema,
  per_page: PerPageSchema,
  value: ValueSchema,
  name: TextSchema,
  state: TextSchema,
  city: TextSchema,
  address: TextSchema,
  complement: ComplementSchema,
  id: IdSchema,
  initial_date: DateSchema,
  final_date: DateSchema,
  date: DateSchema,
  datetime: DateTimeSchema,
} as const;

export type AttributeSchemas = typeof attributeSchemas;
export type GlossaryAttributeKey = keyof AttributeSchemas;
