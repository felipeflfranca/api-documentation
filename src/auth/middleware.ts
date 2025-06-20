import { Request, Response, NextFunction } from "express";

// Evita conflito com `RequestContext` da express-openid-connect
interface AuthExtras {
  roles?: string[];
  partnerId?: string;
}

// Tipagem segura combinada com o tipo original do Express
type AuthenticatedRequest = Request & AuthExtras;

export function authenticatePartner(
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
): void {
  const user = req.oidc?.user;
  const idTokenClaims = req.oidc?.idTokenClaims;

  if (!user || !idTokenClaims) {
    res.status(401).send("Usuário não autenticado");
    return;
  }

  const roles = idTokenClaims["roles"] as string[] | undefined;

  if (!roles || roles.length === 0) {
    console.warn("⚠️ Usuário autenticado, mas sem roles válidas.");
    res.status(403).send("Sem permissão: nenhuma role atribuída.");
    return;
  }

  req.roles = roles;
  req.partnerId =
    idTokenClaims?.preferred_username || idTokenClaims?.email || "";

  next();
}
