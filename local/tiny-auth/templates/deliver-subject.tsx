export default (props: { license: { displayName: string } }) => {
    const { license } = props;
    return `License: ${license.displayName} / Delivery`
}