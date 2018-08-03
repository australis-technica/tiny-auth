import { Component } from "react";
import * as React from "react";
import TextField, { TextFieldProps } from "@material-ui/core/TextField";
import Icon from "@material-ui/core/Icon";
/** */
export type TextFilterProps<T extends {}> = {
  onChange(e: string | React.ChangeEvent<HTMLInputElement>): any;
} & TextFieldProps;
/** */
export default class TextFilter<T> extends Component<TextFilterProps<T>> {
  /** */
  onClear = () => {
    this.props.onChange && this.props.onChange("");
  };
  /** */
  render() {
    const { InputProps, ...rest } = this.props;
    const empty =
      typeof this.props.value !== "string" || this.props.value.trim() === "";
    return (
      <TextField
        InputProps={{
          startAdornment: empty && (
            <Icon title="filter" children={"filter_list"} />
          ),
          endAdornment: !empty && (
            <Icon
              title="Clear"
              children={"clear"}
              style={{ cursor: "pointer" }}
              onClick={this.onClear}
            />
          ),
          ...InputProps
        }}
        {...rest}
      />
    );
  }
}
