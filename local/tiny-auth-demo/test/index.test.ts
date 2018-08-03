process.env.SECRET = "ABRACADABRA123545";
import { join } from "path";
import renderTemplate from "../src/mail/render-template";
import { writeFileSync } from "fs";
import { resolve } from "path";

/** */
describe(require(join(__dirname, "../package.json")).name, () => {
    /** */
    it("render-templates", async () => {
        const data = {
            user: {
                displayName: "Admin"
            },
            license: {
                displayName: "Demo Lic.",
                token: "ABrAcad4bra#!@"
            }
        };
        const html = await renderTemplate("deliver", data);
        writeFileSync(resolve(__dirname, "../templates", "deliver.html"), html);
        expect(html.trim() !== "").toBe(true);
        const txt = await renderTemplate("deliver-subject", data);
        expect(txt).toBe(`License: ${data.license.displayName} / Delivery`);
    });
})