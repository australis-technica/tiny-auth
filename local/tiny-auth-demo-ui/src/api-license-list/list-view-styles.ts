import { StyleRulesCallback } from "@material-ui/core";

const styles: StyleRulesCallback = (theme) => {
        return {        
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