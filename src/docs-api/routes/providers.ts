export const providers = {
  get: {
    tags: ["Providers"],
    summary: "Listar provedores",
    "x-roles": ["PARCEIRO1_REDE", "PARCEIRO1_AGENDAMENTO"],
    responses: {
      "200": {
        description: "Lista de provedores",
        content: {
          "application/json": {
            schema: {
              type: "array",
              items: { $ref: "#/components/schemas/Providers" },
            },
          },
        },
      },
    },
  },
};
