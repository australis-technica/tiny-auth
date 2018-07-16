import { StyleRulesCallback } from "@material-ui/core/styles";
/** */
const styles: StyleRulesCallback = (theme) => {
    return {
        app: {

        },
        appTitle: {
            color: theme.palette.primary.contrastText,
            cursor: "pointer"
        },
        content: {
            marginTop: "75px",
            // border: "1px solid pink"
        }
    }
};
/** */
export default styles;