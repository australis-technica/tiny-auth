import { StyleRulesCallback } from "@material-ui/core";

/**
 *
 */
const styles: StyleRulesCallback = theme => ({
    actions: {
      margin: theme.spacing.unit
    },
    button: {
      margin: theme.spacing.unit,
      width: "120px"
    },
    form: {
      display: "flex",
      flexWrap: "wrap",
      padding: theme.spacing.unit,
      minHeight: "300px"
    },
    textField: {
      margin: theme.spacing.unit
    },
    paper: {
      flex: "1 0",
      width: "100%",
      alignItems: "center",
      margin: theme.spacing.unit,
      marginTop: theme.spacing.unit * 2,
      paddingBottom: theme.spacing.unit,
      backgroundColor: theme.palette.background.default
    }
  });
export default styles;