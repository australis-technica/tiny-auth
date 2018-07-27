import {
  Button,
  Paper,
  TextField,
  Toolbar,
  Typography,
  withStyles,
  IconButton,
  Icon,
  Menu,
  MenuItem,
  ListItemText
} from "@material-ui/core";
import * as React from "react";
import { Component, Fragment, ComponentType } from "react";
import { connect } from "react-redux";
import { createSelector } from "reselect";
import adapter, { ViewState } from "./customer-add-state";
import {
  ClassNameMap,
  StyleRulesCallback
} from "@material-ui/core/styles/withStyles";
import { Dispatch } from "redux";
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
/**
 *
 */
const selector = createSelector(adapter.selector, state => ({ ...state }));
/**
 *
 */
interface ViewActions {
  setState(payload: Partial<ViewState>): any;
}
/**
 * parameters
 */
export interface ViewProps {
  // ...
}
const bindActions = (dispatch: Dispatch) => {
  return {
    setState: (payload: Partial<ViewState>) => {
      dispatch(adapter.actions.setState(payload));
    }
  };
};
/** */
const Connected: ComponentType<ViewProps> = connect(
  selector,
  bindActions
)(
  /** */
  withStyles(styles)(
    //** */
    class extends Component<
      ViewState & ViewActions & { classes: ClassNameMap }
    > {
      menuButton: any;
      /** */
      openMenu = () => this.props.setState({ isMenuOpen: true });
      /** */
      closeMenu = () => this.props.setState({ isMenuOpen: false });
      /** */
      handleMenuAction = (action: () => any) => {
        return () => {
          this.closeMenu();
          action();
        };
      };
      /** */
      render() {
        const { classes, isMenuOpen } = this.props;
        return (
          <Fragment>
            <Paper className={classes.paper} elevation={0.5}>
              <Toolbar>
                <Typography variant="title">Add Customer</Typography>
                <div style={{ flex: "1 0" }} />
                <Fragment>
                  <IconButton
                    onClick={this.openMenu}
                    buttonRef={x => (this.menuButton = x)}
                  >
                    <Icon children="more_vert" />
                  </IconButton>
                  <Menu
                    open={isMenuOpen}
                    onClose={this.closeMenu}
                    anchorEl={this.menuButton}
                  >
                    <MenuItem onClick={this.handleMenuAction(() => {})}>
                      <ListItemText children="Action:1" />
                    </MenuItem>
                  </Menu>
                </Fragment>
              </Toolbar>
              <form className={classes.form}>
                <TextField
                  className={classes.textField}
                  label="DisplayName"
                  helperText="important helper text"
                />
                <TextField
                  className={classes.textField}
                  label="Email"
                  helperText="important helper text"
                />
              </form>
              <div className={classes.actions}>
                <Button className={classes.button} variant="raised">
                  Cancel
                </Button>
                <Button
                  className={classes.button}
                  variant="raised"
                  color="primary"
                >
                  OK
                </Button>
              </div>
            </Paper>
          </Fragment>
        );
      }
    }
  )
);

export default class CustomerList extends Component<{}> {
  render() {
    return <Connected />;
  }
}
