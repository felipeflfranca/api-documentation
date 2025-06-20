type KeycloakClaims = {
  realm_access?: {
    roles?: string[];
  };
  resource_access?: {
    [client: string]: {
      roles?: string[];
    };
  };
};

export function getUserRoles(claims: KeycloakClaims): string[] {
  const roles: string[] = [];

  if (claims?.realm_access?.roles) {
    roles.push(...claims.realm_access.roles);
  }

  if (claims?.resource_access) {
    for (const client in claims.resource_access) {
      const clientRoles = claims.resource_access[client]?.roles || [];
      roles.push(...clientRoles);
    }
  }

  return [...new Set(roles)];
}
