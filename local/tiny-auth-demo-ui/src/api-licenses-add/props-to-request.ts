/** */
import { ViewProps } from "./view";
import { CrudApiRequest } from "../crud-api";
/** */
export default function propsToRequest(props: ViewProps): CrudApiRequest {
    const { formData, featureValues } = props;
    const {
        customer,
        description,
        displayName,
        enabled,
        name,
        notes,
        product
    } = formData;
    const features = JSON.stringify(featureValues);
    const body = {
        customer,
        description,
        displayName,
        enabled,
        features,
        name,
        notes,
        product
    };
    return {
        method: "PUT",
        body
    }
}