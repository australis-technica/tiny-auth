import { StyleRulesCallback } from "@material-ui/core";

const styles: StyleRulesCallback = (theme) => {
    const button = { minWidth: "120px" };
    return {
        button,
        buttonOk: { ...button, backgroundColor: theme.palette.primary.light },
        buttonCancel: { ...button, },
        dialogActions: { paddingBottom: "1rem", paddingRight: "1rem" },
        dialogContent: { textAlign: "center", margin: "1rem", paddingRight: "1rem", minWidth: "350px" },
        dialogContentTitle: {
            width: "100%",
        },
        toolbar: {},
        toolbarTitle: {
            textTransform: "uppercase"
        },
        root: {
            paddingTop: "1rem"
        },
        searchField: {
            marginLeft: "2rem",
            
        }
    };
}
export default styles;