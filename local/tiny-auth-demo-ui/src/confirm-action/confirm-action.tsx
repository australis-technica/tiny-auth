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
  isOpen?(actionType?: string):boolean;
  actionType?: string;
  actionTittle?: string;
  actionMessage?: string;
}
/**
 *
 * @param props
 */
const ConfirmAction: StatelessComponent<
  ConfirmActionState & {
    acceptAction(actionType?: string): any;
    cancelAction(actionType?: string): any;
  } & {
    classes: ClassNameMap;
  }
> = props => {
  const { actionType, actionTittle, actionMessage, classes } = props;
  /**
   *
   * @param accept
   */
  function handle(accept: boolean) {
    return () => {
      if (!!accept) {
        props.acceptAction(props.actionType);
      } else {
        props.cancelAction(props.actionType);
      }
    };
  }
  function isOpen(){
    if(props.isOpen) {
      return props.isOpen(actionType);
    }
    return !!actionType;
  }
  return (
    <Dialog open={isOpen()}>
      <DialogTitle>
        {actionTittle || `Confirm Action ${actionType}`}
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
