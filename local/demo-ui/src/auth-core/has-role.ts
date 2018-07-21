import { User } from "./types";
/**
 * 
 * @param profile 
 * @param role 
 */
export function hasRole(profile: User, role: string) {
    if (!Array.isArray(profile.roles)) return false;
    const found = profile.roles.find(x => x === "user");
    return found && found === role;
}