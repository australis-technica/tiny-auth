import * as React from "react";
import { RenderMenuStateProps } from "./with-menu-state";
import IconButton, { IconButtonProps } from "@material-ui/core/IconButton";
import MenuItem, { MenuItemProps } from "@material-ui/core/MenuItem";
import { StatelessComponent } from "react";
/** */
type ResponsiveMenuItemProps = {
  action: IconButtonProps & MenuItemProps;  
} & RenderMenuStateProps & { isBreakpoint: boolean};
/** */
const ResponsiveMenuItem: StatelessComponent<ResponsiveMenuItemProps> = props => {
  const action = <IconButton {...props.action}>{props.children}</IconButton>;
  return props.isBreakpoint ? action : <MenuItem {...action.props} />;
};
/** */
export default ResponsiveMenuItem;
