import type { Role } from "./content/experience";
import { toSlug } from "./slug";

export function roleNames(role: Pick<Role, "company" | "start">) {
  const key = `role-${toSlug(`${role.company} ${role.start}`)}`;
  return { key, row: `${key}-row`, details: `${key}-details`, mark: `${key}-mark`, company: `${key}-company`, dates: `${key}-dates` };
}
