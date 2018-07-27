/** */
export default function getErrorMessage(error?: string | Error | undefined): string | undefined {
    return !error ? undefined : typeof error === "string" ? error : error.message ? error.message : error.toString();
}