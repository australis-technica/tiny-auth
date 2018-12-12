import { StyleRulesCallback, withStyles } from "@material-ui/core";
import { ClassNameMap } from "@material-ui/core/styles/withStyles";
import * as React from "react";
import { Component } from "react";
import { connect } from "react-redux";
import { Dispatch } from "redux";
import adapter from "./adapter";
/**
 *
 */
interface HomeState {
  tabIndex: number;
  [key: string]: any;
}
/**
 *
 */
export interface HomeProps { }
/**
 *
 */
interface HomeActions {
  setState(payload: Partial<HomeState>): any;
}
/** */
const styles: StyleRulesCallback = theme => ({
  tabs: {
    flex: "1 0",
    width: "100%"
  }
});
/**
 *
 */
/** */
class Home extends Component<
  HomeProps & HomeState & HomeActions & { classes: ClassNameMap }
  > {
  state: { [key: string]: any } = {};
  /**
   *
   */
  set = (state: Partial<HomeProps>) => {
    this.props.setState(state);
  };
  /**
   *
   */
  setTabIndex = (tabIndex: number) => {
    return () => {
      this.set({ tabIndex });
    };
  };
  async getMessage(path: string): Promise<any> {
    try {
      const token = localStorage.getItem("token");
      const r = await fetch(`${process.env.REACT_APP_API_BASE}/${path}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      if (!r.ok) {
        let error = `${r.statusText} (${r.status})`;
        try {
          error = await r.text() || error;
        } catch (err) {
          console.log(err)
        }
        return {
          error: new Error(error),
        };
      }
      const message = await r.text();
      return {
        message
      };
    } catch (error) {
      return {
        error
      };
    }
  }

  async componentDidMount() {
    const getMessage = this.getMessage.bind(this);
    try {
      const { error, message } = await getMessage("admin");
      this.setState({ adminMessage: this.errorMessage(error) || message });
    } catch (error) {
      this.setState({ error: error });
    }
    try {
      const { error, message } = await getMessage("bob");;
      this.setState({ bobMessage: this.errorMessage(error) || message });
    } catch (error) {
      this.setState({ error: error });
    }
    try {
      const { error, message } = await getMessage("ok");;
      this.setState({ okMessage: this.errorMessage(error) || message });
    } catch (error) {
      this.setState({ error: error });
    }
  }

  errorMessage = (error: any) => {
    return (error && typeof error === "string" && error) || error &&  error.message 
  }

  /**
   *
   */
  render() {
    const { adminMessage, bobMessage, okMessage, error } = this.state;
    return (
      <React.Fragment>
        <div> Hello</div>
        <div>Admin Message (Admin required): {adminMessage}</div>
        <div>Bob Message (Bob Required): {bobMessage}</div>
        <div>OK Message (Auth Required): {okMessage}</div>
        {error && <div>Error: {this.getMessage(error) || ""}</div>}
      </React.Fragment>
    );
  }
}
/**
 *
 */
const selector = (state: {}) => {
  return adapter.selector(state);
};
/**
 *
 */
const bindActions = (dispatch: Dispatch) => {
  return {
    setState: (payload: Partial<HomeState>) => {
      dispatch(adapter.actions.setState(payload));
    }
  };
};
/**
 *
 */
export default connect(
  selector,
  bindActions
)(withStyles(styles)(Home)) as React.ComponentType;
