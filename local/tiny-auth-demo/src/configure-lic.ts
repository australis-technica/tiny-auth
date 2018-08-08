import { Express } from "express-serve-static-core";
import { validateHandler as validateLicense, deliver } from "./lic";
import auth from "./auth";
import { repo } from "./crud-licenses";
export default function(app: Express){
    const { authorize, requireRole } = auth.middleware;
      /** api/v1 */
      app.get("/api/v1/validate", validateLicense(repo.byId)); 
      app.post("/api/v1/deliver", authorize, requireRole(['user']), ...deliver())   
}