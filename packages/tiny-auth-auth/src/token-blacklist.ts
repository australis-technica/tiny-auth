import { TokenBlackList } from "@australis/tiny-auth-core";
import { debugModule } from "@australis/create-debug";
const debug = debugModule(module);
const blacklist: string[] = [];
export default function(): TokenBlackList {
  return {
    isBlackListed(token: string) {
      return Promise.resolve(blacklist.indexOf(token) !== -1);
    },
    add(token: string) {
      debug(
        "blacklisted:\n %s",
        blacklist.map((t, i) => `${i}: ${t}`).join("\n")
      );
      return Promise.resolve(blacklist.push(token));
    }
  };
}
