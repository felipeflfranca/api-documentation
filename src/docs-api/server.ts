import dotenv from "dotenv";
import express from "express";
import { auth, requiresAuth } from "express-openid-connect";
import { jwtDecode } from "jwt-decode";
import swaggerUi from "swagger-ui-express";
import { openApiSpec } from "./openapi-generator";
import { filterOpenApiSpecByRoles } from "../utils/filter-openapi";

dotenv.config();

const app = express();

const { OIDC_CLIENT_ID, OIDC_CLIENT_SECRET, OIDC_ISSUER, OIDC_BASE_URL } =
  process.env;

if (!OIDC_CLIENT_ID || !OIDC_CLIENT_SECRET || !OIDC_ISSUER || !OIDC_BASE_URL) {
  throw new Error("Variáveis de ambiente obrigatórias não definidas.");
}

app.use(
  auth({
    authRequired: false,
    issuerBaseURL: OIDC_ISSUER,
    baseURL: OIDC_BASE_URL,
    clientID: OIDC_CLIENT_ID,
    clientSecret: OIDC_CLIENT_SECRET,
    secret: OIDC_CLIENT_SECRET,
    idpLogout: true,
    authorizationParams: {
      response_type: "code",
      scope: "openid profile email",
    },
  })
);

app.get("/", (req, res) => {
  if (req.oidc?.isAuthenticated()) return res.redirect("/docs");
  return res.redirect("/login");
  //res.send('<a href="/login">Entrar com Keycloak</a>');
});

app.get("/docs-json", requiresAuth(), (req, res) => {
  const rawToken = req.oidc?.accessToken?.access_token;

  if (!rawToken) {
    res.status(403).send("Token inválido");
    return;
  }

  interface KeycloakAccessToken {
    resource_access?: {
      [client: string]: {
        roles: string[];
      };
    };
  }

  const decoded = jwtDecode<KeycloakAccessToken>(rawToken);
  const roles = decoded.resource_access?.["documenter-web"]?.roles || [];

  const filtered = filterOpenApiSpecByRoles(openApiSpec, roles);
  res.json(filtered);
});

app.use("/static", express.static(__dirname + "/../components"));

app.use(
  "/docs",
  requiresAuth(),
  swaggerUi.serve,
  swaggerUi.setup(undefined, {
    swaggerUrl: "/docs-json",
    customfavIcon: "https://temsaude.com.br/images/favicon.png",
    customSiteTitle: "APIs Tem Saúde",
    customCss: `
    .swagger-ui .topbar {
      background-color:rgb(0, 170, 255);
      padding: 10px 20px;
    }

    // .swagger-ui .topbar-wrapper .link svg {
    //   display: none;
    // }

    // .swagger-ui .topbar-wrapper .link::before {
    //   content: "";
    //   display: inline-block;
    //   background-size: contain;
    //   background-repeat: no-repeat;
    //   width: 120px;
    //   height: 40px;
    // }

    .swagger-ui .topbar-wrapper span {
      display: none;
    }
  `,
    customJs: "/static/logout-button.js",
  })
);

app.get("/logout", (req, res) => {
  res.oidc.logout({ returnTo: process.env.OIDC_BASE_URL });
});

app.listen(3000, () => {
  console.log("✅ Swagger protegido: http://localhost:3000");
});
