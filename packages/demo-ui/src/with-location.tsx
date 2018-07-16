import { Location } from "history";
import * as React from "react";
import { connect } from "react-redux";
import { RouterState } from "react-router-redux";
export type WithLocationProps = {
    render: (location: Location) => React.ReactNode;
}
/** */
const WithLocation: React.ComponentType<WithLocationProps> = class WithLocation extends React.Component<RouterState & WithLocationProps> {
    render() {
        return this.props.render(this.props.locationBeforeTransitions as any as Location);
    }
}
/** */
export default connect(state => state["routing"])(
    /** */
    WithLocation
)