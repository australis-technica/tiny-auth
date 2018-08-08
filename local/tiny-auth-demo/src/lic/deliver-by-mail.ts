import { renderTemplate, sendMail } from "@australis/send-grid-mail";
/** */
export default function deliverByMail(templateName: string, receipient: string, data: {}) {
  const subject = renderTemplate(`${templateName}-subject`, data);
  const html = renderTemplate(templateName, data);
  const mailData = {
    to: receipient,
    subject,
    html
  };
  return sendMail(mailData);
}
const EMAIL_REGEX = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
/** */
export function validateReceipient(x: any): x is string {
  if (typeof x !== "string") return false;
  const receipients = x.split(",");
  for (const r of receipients) {
    if (!EMAIL_REGEX.test(r)) {
      return false;
    }
  }
  return true;
}