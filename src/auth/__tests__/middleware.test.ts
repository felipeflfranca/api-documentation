import { authenticatePartner } from "../middleware";
import { getUserRoles } from "../roles";
import { Request, Response, NextFunction } from "express";

describe("authenticatePartner middleware", () => {
  let req: Partial<Request & { oidc?: any; roles?: string[]; partnerId?: string }>;
  let res: Partial<Response>;
  let next: jest.Mock;

  beforeEach(() => {
    req = {};
    res = {
      status: jest.fn().mockReturnThis(),
      send: jest.fn(),
    };
    next = jest.fn();
  });

  it("should return 401 if user is not authenticated", () => {
    req.oidc = {};
    authenticatePartner(req as any, res as any, next);
    expect(res.status).toHaveBeenCalledWith(401);
    expect(res.send).toHaveBeenCalledWith("Usuário não autenticado");
    expect(next).not.toHaveBeenCalled();
  });

  it("should return 403 if user has no roles", () => {
    req.oidc = { user: {}, idTokenClaims: { roles: [] } };
    authenticatePartner(req as any, res as any, next);
    expect(res.status).toHaveBeenCalledWith(403);
    expect(res.send).toHaveBeenCalledWith("Sem permissão: nenhuma role atribuída.");
    expect(next).not.toHaveBeenCalled();
  });

  it("should set roles and partnerId and call next if authenticated and has roles", () => {
    req.oidc = {
      user: { name: "test" },
      idTokenClaims: { roles: ["admin"], preferred_username: "partner1" },
    };
    authenticatePartner(req as any, res as any, next);
    expect(req.roles).toEqual(["admin"]);
    expect(req.partnerId).toBe("partner1");
    expect(next).toHaveBeenCalled();
  });
});

describe("getUserRoles", () => {
  it("should extract roles from realm_access and resource_access", () => {
    const claims = {
      realm_access: { roles: ["admin"] },
      resource_access: { client1: { roles: ["user"] } },
    };
    expect(getUserRoles(claims)).toEqual(["admin", "user"]);
  });

  it("should return unique roles only", () => {
    const claims = {
      realm_access: { roles: ["admin"] },
      resource_access: { client1: { roles: ["admin", "user"] } },
    };
    expect(getUserRoles(claims)).toEqual(["admin", "user"]);
  });

  it("should return empty array if no roles present", () => {
    expect(getUserRoles({})).toEqual([]);
  });
}); 