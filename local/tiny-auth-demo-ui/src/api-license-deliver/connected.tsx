import Deliver , { DeliverParams }from "./deliver";
import { connect } from "react-redux";
import bindActions from "./action-binder";
import api from "./api";
import { ComponentType } from "react";
import { createSelector } from "reselect";
const selector = createSelector(api.selector, apiState => ({
    apiState
}))
const Connected: ComponentType<DeliverParams> = connect(selector, bindActions)(Deliver);
export default Connected;