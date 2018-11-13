/** TODO */
export default function validatorUrl() {
  const { LIC_BASE_URL, LIC_VALIDATOR_ENDPOINT } = process.env;
  if (!LIC_BASE_URL || !LIC_VALIDATOR_ENDPOINT) {
    throw new Error(`missing LIC_BASE_URL, LIC_VALIDATOR_ENDPOINT `);
  }
  const endpoint = LIC_VALIDATOR_ENDPOINT.startsWith("/")
    ? LIC_VALIDATOR_ENDPOINT
    : `/${LIC_VALIDATOR_ENDPOINT}`;
  return `${LIC_BASE_URL}${endpoint}`;
}
