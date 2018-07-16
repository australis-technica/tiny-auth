import { isString } from "util";
import { PasswordRulePolicyEnforcer } from "@australis/tiny-auth-core";

export default (
    function passwordPolicyEnforcer(newPassword: string) {
  const errors: string[] = [];
  if (!isString(newPassword)) {
    errors.push("password can't be empty");
  }
  if (newPassword.trim() === "") {
    errors.push("password can't be blank");
  }
  if (newPassword.length < 8) {
    errors.push(`password too short (${newPassword.length}/8)`);
  }
  if (!/\d/.test(newPassword)) {
    errors.push("password must contain digits");
  }
  if (!/[a-z]/.test(newPassword)) {
    errors.push("password must contain lower case characters");
  }
  if (!/[A-Z]/.test(newPassword)) {
    errors.push("password must contain upper case characters");
  }
  if (!/[!@#$%^&*_=]/.test(newPassword)) {
    errors.push("password must contain special charaters");
  }
  return errors;
}) as PasswordRulePolicyEnforcer;
