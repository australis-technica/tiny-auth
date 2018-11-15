import { debugModule } from "@australis/create-debug";
import licenses from "@australis/tiny-auth-licenses";
import verify from "./verify";
const debug = debugModule(module);
/**
 * 
 * @param id 
 * !important: return { license: {}} , its needed by template
 */
export default async function findById(id: string): Promise<{ license: {}}> {
    try {
      const license = await licenses.byId(id);
      const verified = verify(license.token);
      if(!verified) Promise.reject(new Error("Doesn't verify"));
      return {
        license
      }
    } catch (error) {
      debug(error);
      return Promise.reject(error);
    }
  }