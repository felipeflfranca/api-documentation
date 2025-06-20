import { OperationWithRoles } from "../../types/openapi";

export const users: Record<"get", OperationWithRoles> = {
  get: {
    tags: ["User"],
    summary: "Listar usuários",
    "x-roles": ["PARCEIRO1_AGENDAMENTO"],
    responses: {
      "200": {
        description: "Lista de usuários",
        content: {
          "application/json": {
            schema: {
              type: "array",
              items: { $ref: "#/components/schemas/User" },
            },
          },
        },
      },
    },
  },
};
