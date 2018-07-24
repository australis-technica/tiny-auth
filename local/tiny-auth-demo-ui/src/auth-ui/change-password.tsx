import { Component, ComponentType } from "react";
import { Auth, AuthState, WebApi } from "@australis/tiny-auth-core";
import { Card, CardActions, CardContent, CircularProgress } from "@material-ui/core";
import Button from "@material-ui/core/Button";
import { ClassNameMap } from "@material-ui/core/styles/withStyles";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import * as React from "react";
import withStyles from "@material-ui/core/styles/withStyles";
import styles from "./styles";
/** */
export interface ChangePasswordProps {
    auth: Auth,
    api: WebApi,
    authState: AuthState;
    image?: any;
}
/** */
interface ChangePasswordState extends Partial<AuthState> {
    oldPassword: string;
    newPassword: string;
}
/**
     * 
     */
export class ChangePassword extends Component<ChangePasswordProps & { classes: ClassNameMap; }> {
    state: ChangePasswordState = {
        oldPassword: "",
        newPassword: ""
    };
    static getDerivedStateFromProps(props: ChangePasswordProps, state: ChangePasswordState) {
        return Object.assign(state, props.authState);
    }

    onKeyUp = (key: string, callback: Function): React.KeyboardEventHandler => {
        return (e) => {
            if (e.key === key) callback();
        }
    }
    /** */
    handleChangedPassword = () => {
        this.props.api.changePassword(this.state.token, this.state.oldPassword, this.state.newPassword);
    }
    onOldPasswordChanged: React.ChangeEventHandler<HTMLInputElement> = (e) => {
        this.setState({ oldPassword: e.target.value });
    }
    onNewPasswordChanged: React.ChangeEventHandler<HTMLInputElement> = (e) => {
        this.setState({ newPassword: e.target.value });
    }
    render() {
        const { classes, image } = this.props;
        const { busy, error, authenticated, oldPassword, newPassword } = this.state;
        return <div className={classes.root}>
            <Card className={classes.card}>
                {image && (
                    <img className={classes.media} src={image} title="Logo" />
                )}
                <CardContent>
                    {busy && <CircularProgress className={classes.progress} thickness={7} />}
                    {error && <Typography color="error">{error}</Typography>}
                    <TextField
                        id="old-password"
                        label="Old password"
                        className={classes.textField}
                        margin="normal"
                        onKeyUp={this.onKeyUp("Enter", this.handleChangedPassword)}
                        disabled={busy || !!authenticated}
                        value={oldPassword}
                        onChange={this.onOldPasswordChanged}
                        type={"password"}
                    />
                    <TextField style={{ visibility: (authenticated && "hidden") || undefined }}
                        value={newPassword}
                        onChange={this.onNewPasswordChanged}
                        id="new-password"
                        label="New Password"
                        type={"password"}
                        className={classes.textField}
                        margin="normal"
                        onKeyUp={this.onKeyUp("Enter", this.handleChangedPassword)}
                        disabled={busy || authenticated}
                    />
                </CardContent>
                <CardActions className={classes.actions}>
                    <Button
                        onClick={this.handleChangedPassword}
                        disabled={busy}
                    >
                        Submit
                        </Button>
                </CardActions>
            </Card>
        </div>
    }
}
/**
 * 
 */
export default withStyles(styles)(ChangePassword) as ComponentType<ChangePasswordProps>;