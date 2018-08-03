import sgMail from "@sendgrid/mail";
import { MailData } from "@sendgrid/helpers/classes/mail";
const { SENDGRID_API_KEY, SENDGRID_API_SENDER } = process.env;
/** */
sgMail.setApiKey(SENDGRID_API_KEY);
/** */
export default function sendMail(data: Partial<MailData>): Promise<any> {
    const { subject, from, ...rest } = data;
    return sgMail.send({ ...rest, from: from || SENDGRID_API_SENDER, subject: `${subject} [NO-REPLY]` });
};
