import { Auth } from "@australis/tiny-auth-core";
/**
 * WRONG : should't auth-redux
 */
import { selector as authState } from "../auth-redux";
import { Dispatch } from "redux";
import { LoginViewProps } from "./types";
/** */
const selector = (state: {}, props: { auth: Auth, dispatch: Dispatch, image: any }): LoginViewProps => {    
    const { image } = props;
    return {
        authState: authState(state),        
        image  
    };
};
/** */
export default selector;