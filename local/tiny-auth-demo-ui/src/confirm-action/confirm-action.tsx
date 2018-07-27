import {
  Button,
  DialogActions,
  DialogContent,
  Dialog,
  DialogTitle,
  Typography
} from "@material-ui/core";
import { StatelessComponent } from "react";
import { ClassNameMap } from "@material-ui/core/styles/withStyles";
import * as React from "react";
/**
 *
 */
interface ConfirmActionState {
  isOpen: boolean;
  actionTittle?: string;
  actionMessage?: string;
}
/**
 *
 * @param props
 */
const ConfirmAction: StatelessComponent<
  ConfirmActionState & {
    acceptAction(ok: boolean): any;
  } & {
    classes: ClassNameMap;
  }
  > = props => {
    const { actionTittle, actionMessage, classes } = props;
    /** */
    function handle(ok: boolean) {
      return () => props.acceptAction(ok);
    }
    return (
      <Dialog open={props.isOpen}>
        <DialogTitle>
          {actionTittle || `Confirm Action`}
        </DialogTitle>
        <DialogContent>
          <Typography>{actionMessage}</Typography>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={handle(false)}
            className={classes.button}
            variant="raised"
          >
            Cancel
        </Button>
          <Button
            onClick={handle(true)}
            className={classes.button}
            variant="raised"
            color="primary"
          >
            OK
        </Button>
        </DialogActions>
      </Dialog>
    );
  };
export default ConfirmAction;
