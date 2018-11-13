import Crypto from "@australis/tiny-auth-crypto";
const crypto = new Crypto({
    password: process.env.SECRET
});
export default crypto;