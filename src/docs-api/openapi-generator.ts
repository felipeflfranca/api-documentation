import {
  extendZodWithOpenApi,
  OpenApiGeneratorV3,
} from "@asteasolutions/zod-to-openapi";
import { z } from "zod";
import * as schemas from "../shared-schemas";
import { paths } from "./routes.openapi";
import { OpenAPIObject } from "openapi3-ts/oas30";

extendZodWithOpenApi(z);

const generator = new OpenApiGeneratorV3(Object.values(schemas));

const document: OpenAPIObject = generator.generateDocument({
  openapi: "3.0.0",
  info: {
    title: "Documentação API",
    version: "1.0.0",
  },
});

document.paths = paths;

export const openApiSpec = document;
