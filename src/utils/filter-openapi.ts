import cloneDeep from "lodash.clonedeep";
import { OpenAPIObject } from "openapi3-ts/oas30";

/**
 * Filtra o OpenAPI Spec removendo rotas e schemas que não pertencem às roles do usuário.
 */
export function filterOpenApiSpecByRoles(
  openApiSpec: OpenAPIObject,
  userRoles: string[]
): OpenAPIObject {
  const spec = cloneDeep(openApiSpec);

  // Filtra rotas por x-roles
  for (const path in spec.paths) {
    const methods = spec.paths[path];

    for (const method of Object.keys(methods) as Array<keyof typeof methods>) {
      const operation = methods[method];
      const requiredRoles = operation?.["x-roles"];

      if (
        requiredRoles &&
        !requiredRoles.some((role: string) => userRoles.includes(role))
      ) {
        delete methods[method];
      }
    }

    if (Object.keys(methods).length === 0) {
      delete spec.paths[path];
    }
  }

  // Identifica schemas utilizados nas operações visíveis
  const usedSchemaRefs = new Set<string>();

  for (const path of Object.values(spec.paths)) {
    for (const operation of Object.values(path)) {
      const json = JSON.stringify(operation);
      const matches = [
        ...json.matchAll(/"\$ref":"#\/components\/schemas\/([^"]+)"/g),
      ];
      matches.forEach((m) => usedSchemaRefs.add(m[1]));
    }
  }

  // Remove schemas não utilizados
  if (spec.components?.schemas) {
    for (const schemaName of Object.keys(spec.components.schemas)) {
      if (!usedSchemaRefs.has(schemaName)) {
        delete spec.components.schemas[schemaName];
      }
    }
  }

  return spec;
}
