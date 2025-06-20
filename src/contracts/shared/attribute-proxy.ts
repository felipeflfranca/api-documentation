import { attributeSchemas } from "./attribute-schemas";
import { GlossaryAttributeKey } from "./attribute-schemas";

export const a = new Proxy(attributeSchemas, {
  get(target, prop: string) {
    if (!(prop in target)) {
      throw new Error(
        `Atributo '${prop}' não está definido em attributeSchemas`
      );
    }
    return target[prop as GlossaryAttributeKey];
  },
});
