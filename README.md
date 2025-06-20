# 📘 Documenter

Centralizador de documentação OpenAPI com autenticação via Keycloak e suporte a filtragem de rotas por roles de usuário.

## 📌 Visão Geral

O **Documenter** é uma aplicação Node.js + TypeScript que centraliza a documentação de múltiplas APIs REST, com controle de acesso via **Keycloak** e exibição dinâmica de rotas baseado nos papéis (roles) do usuário autenticado.

## 🚀 Funcionalidades Principais

| Funcionalidade                              | Descrição                                                                 |
|---------------------------------------------|---------------------------------------------------------------------------|
| 🔐 Autenticação via Keycloak                | Login SSO com controle por Realm/Client                                   |
| 📄 Swagger dinâmico com filtragem por role  | Cada usuário vê apenas os endpoints que pode acessar                      |
| 📚 Suporte a múltiplos contratos Zod        | Contratos gerados a partir de schemas Zod, convertidos com zod-to-openapi |
| 🚫 Linting e validação de schemas           | Impede o uso de `z.object()` fora do padrão `defineSchema()`              |
| 🧾 Glossário centralizado                   | Campos padrão (email, CPF, datas, etc.) reutilizáveis com validação Zod   |
| 🌐 Interface Swagger customizada            | Branding da empresa com favicon, título e botão de logout                 |

## 🗂️ Estrutura de Diretórios

```
documenter/
├── src/
│   ├── contracts/
│   │   ├── glossary/
│   │   └── shared/
│   ├── docs-api/
│   ├── scripts/
│   └── utils/
├── .eslintrc.js
├── package.json
└── tsconfig.json
```

## ⚙️ Scripts Importantes

```bash
npm run dev                   # Inicia servidor local
npm run lint                  # Verifica código e uso correto dos schemas
npm run check-schemas         # Validação manual de z.object()
npm run lint:schema           # Valida schemas do glossário
```

## ✅ Convenções de Código

**❌ Proibido:**

```ts
import { z } from "zod";

export const User = z.object({ ... }); // ERRO!
```

**✅ Obrigatório:**

```ts
import { attributeSchemas } from "../contracts/shared/attribute-schemas";
import { defineSchema } from "../contracts/shared/define-schema";

const { email, name } = attributeSchemas;

export const UserSchema = defineSchema({
  email,
  name,
}).openapi("User");
```

## 🔐 Autenticação

- Baseada em Keycloak via `express-openid-connect`
- Variáveis de ambiente:

```env
OIDC_ISSUER=http://localhost:8080/realms/master
OIDC_CLIENT_ID=documenter-web
OIDC_CLIENT_SECRET=...
OIDC_BASE_URL=http://localhost:3000
```

## 🧠 Swagger por Role

- `/docs`: interface protegida e personalizada do Swagger
- `/docs-json`: retorna o OpenAPI já filtrado com base nos roles do JWT
- Utiliza `jwtDecode()` e `filterOpenApiSpecByRoles()`

## 🛑 Proteção contra schemas fora do padrão

Valida automaticamente uso incorreto de `z.object()`:

```bash
❌ Forbidden use of z.object in: src/contracts/users/users.schema.ts
```

## ✨ Futuras melhorias

- Cache do OpenAPI por role
- Distribuição como pacote NPM interno
- Testes automatizados de schemas
- Suporte multilíngue ao Swagger
