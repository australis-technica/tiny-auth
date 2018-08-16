
export const isDev = process.env.NODE_ENV !== "production";
export const isAdmin = process.env.ADMIN === "true";
export const isValidate = process.env.VALIDATE === "true";
export const port = Number(process.env.PORT);