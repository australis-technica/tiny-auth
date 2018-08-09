import { Component, CSSProperties } from "react";
import * as React from "react";
import Paper from "@material-ui/core/Paper";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import { Typography, CircularProgress, Snackbar } from "@material-ui/core";
import SnackbarContentWrapper from "../snackbar-content-with-satus/snackbar-content-with-satus";
import * as jwt from "jsonwebtoken";
import { withRouter, RouteComponentProps } from "react-router-dom";
import { isError } from "flux-standard-action";

const log =
  process.env.NODE_ENV !== "production" ? console.log.bind(console) : () => {};

type Indexer = { [key: string]: any };

function tryDecode(token: string): Indexer {
  try {
    let value = jwt.decode(token);
    value = value && typeof value === "object" ? value : {};
    return value;
  } catch (error) {
    return {};
  }
}

/** */
interface ValidateState {
  token: string;
  isEmpty: boolean;
  error: string | undefined;
  busy: boolean;
  success: boolean;
  decoded: Indexer;
  validator: string | undefined;
  canValidate: boolean;
}
/** */
const paperStyle: CSSProperties = {
  marginTop: "15px",
  display: "flex",
  flexDirection: "column",
  width: "100%",
  // textAlign: "center",
  alignItems: "center",
  padding: "1rem"
};
const textFieldStyle: CSSProperties = {
  width: "350px"
};
const progressStyle: CSSProperties = {
  margin: "1rem",
  width: "1rem",
  height: "1rem"
};
const buttonStyle: CSSProperties = {
  height: "4rem",
  display: "flex",
  flexDirection: "row",
  // justifyContent: "flex-start",
  width: "10rem"
};

export type ValidateProps = {
  // ...
} & RouteComponentProps<{ token: string }>;

class Validate extends Component<ValidateProps, ValidateState> {
  /** */
  state = {
    token: "",
    isEmpty: true,
    error: undefined,
    busy: false,
    success: false,
    decoded: {},
    validator: undefined,
    canValidate: false
  };
  /** */
  static getDerivedStateFromProps(props: ValidateProps, state: ValidateState) {
    let { token, decoded, isEmpty, validator, canValidate, ...rest } = state;
    token = props.match.params.token || token;
    isEmpty = !token || !token.trim();
    decoded = tryDecode(token);
    return {
      ...rest,
      token,
      isEmpty,
      decoded,
      validator: decoded.validator,
      canValidate: !!decoded.validator && !!decoded.validator.trim()
    };
  }
  /** */
  componentDidMount() {
    if (this.props.match.params.token) {
      const segments = this.props.location.pathname.split("/");
      const back = segments.slice(0, segments.length - 1).join("/");
      this.props.history.replace(back);
    }
  }
  /** */
  setToken = (token: string) => {
    this.setState({
      token,
      success: false
    });
  };
  /** */
  handleTokenChanged: React.ChangeEventHandler<HTMLInputElement> = e => {
    const token = e.target.value;
    this.setToken(token);
  };

  /** */
  setBusy = (busy: boolean) => {
    this.setState({ busy });
  };
  /** */
  setError = (error: string | Error) => {
    const message =
      error &&
      (typeof error === "string"
        ? error
        : error.message
          ? error.message
          : error.toString());
    this.setState({ error: message });
  };
  /** */
  clearError = () => {
    this.setState({ error: undefined });
  };
  /** */
  setSuccess = (success: boolean) => {
    this.setState({ success });
  };
  /** */
  clearSuccess = () => this.setSuccess(false);
  /** */
  reset = () => {
    this.setState({
      error: undefined,
      success: false
    });
  };
  /** */
  validate = async () => {
    const { setBusy, setError, setSuccess } = this;
    const { token, validator } = this.state;
    try {
      setBusy(true);
      this.reset();
      const res = await fetch(validator, {
        headers: {
          License: `Lic ${token}`
        }
      });
      let text = undefined;
      try {
        text = await res.text();
        text = text && text.trim() ? text : res.statusText;
      } catch (error) {
        log(error);
        text = `${res.status}: ${res.statusText}`;
      }
      if (!res.ok) {
        return setError(text);
      }
      setSuccess(res.ok);
    } catch (error) {
      setError(error);
    } finally {
      setBusy(false);
    }
  };
  // **
  preview(decoded: Indexer) {
    let text = JSON.stringify(decoded, null, 2).replace(/(\{|\}|"|,)/gi, "");
    const isEmpty = !text || !text.trim();
    text = (!isEmpty && text) || "...";
    const expDate = new Date(decoded.exp);
    return (
      <div style={{ margin: "1rem" }}>
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between"
          }}
        >
          <Typography variant="headline" style={{ textTransform: "uppercase" }}>
            Decoded
          </Typography>
          <Typography color={(!isError && "primary") || "error"}>
            {isEmpty ? "(Empty)" : ""}
          </Typography>
        </div>
        <pre
          style={{
            textAlign: "left",
            overflow: "auto",
            borderLeft: "1px solid whitesmoke",
            width: "350px",
            height: "200px",
            paddingLeft: "1rem"
          }}
        >
          {text}
        </pre>
        <div style={{display: "flex", flexDirection: "column", marginTop: "1rem"}}>
          <Typography variant="subheading" style={{}}>Exp. Date</Typography>
          <Typography>{expDate.toString()}</Typography>
        </div>
      </div>
    );
  }
  /** */
  render() {
    const {
      token,
      isEmpty,
      error,
      busy,
      success,
      decoded,
      canValidate
    } = this.state;
    const helperText = `Place token here ${isEmpty ? "(Required)" : "..."}`;
    return (
      <Paper style={paperStyle}>
        <Typography
          style={{ textTransform: "uppercase", marginBottom: "1.5rem" }}
          variant="title"
        >
          Validate
        </Typography>
        <TextField
          style={textFieldStyle}
          label="Token"
          helperText={helperText}
          value={token}
          onChange={this.handleTokenChanged}
          error={isEmpty}
          multiline={true}
          rows={5}
        />
        <div style={{ margin: "1rem" }}>{this.preview(decoded)}</div>
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-around",
            margin: "1rem",
            alignItems: "center",
            width: "100%"
          }}
        >
          <Button
            style={buttonStyle}
            color="primary"
            variant="raised"
            onClick={this.validate}
            disabled={isEmpty || busy || !canValidate}
          >
            <span>Validate</span>
            {busy && <CircularProgress style={progressStyle} />}
          </Button>
        </div>
        <Snackbar
          open={!!success}
          autoHideDuration={6000}
          onClose={this.clearSuccess}
        >
          <SnackbarContentWrapper
            onClose={this.clearSuccess}
            variant="success"
            message="Success!"
          />
        </Snackbar>
        <Snackbar
          open={!!error}
          autoHideDuration={6000}
          onClose={this.clearError}
        >
          <SnackbarContentWrapper
            onClose={this.clearError}
            variant="error"
            message={error}
          />
        </Snackbar>
      </Paper>
    );
  }
}
export default withRouter(Validate);
