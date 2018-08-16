import os from "os";
const hostname = os.hostname();
export default function issuer() {
    return hostname;
}