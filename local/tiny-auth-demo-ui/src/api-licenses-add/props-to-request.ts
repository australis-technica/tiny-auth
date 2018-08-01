/** */
import { ViewProps } from "./view";
import { CrudApiRequest } from "../crud-api";
/** */
export default function propsToRequest(props: ViewProps): CrudApiRequest {
    const { formData,  } = props;
    const {
        customer,
        description,
        displayName,
        enabled,
        name,
        notes,
        product,
        featureValues
    } = formData;
    const features = featureValues; // JSON.stringify(featureValues);
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