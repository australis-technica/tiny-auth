import { StatelessComponent, ChangeEventHandler } from "react";
import * as React from "react";
import TextField, { TextFieldProps } from "@material-ui/core/TextField";

export type DateFieldProps = Exclude<TextFieldProps, "value" | "onChange"> & {
  dateValue: Date | number;
  onDateChange(date: Date): any;
};

export function fromDate(date: Date) {
  const mm = date.getMonth();
  const dd = date.getDate();
  const s = `${date.getFullYear()}-${mm < 10 ? `0${mm}` : mm}-${
    dd < 10 ? `0${dd}` : dd
  }`;
  return s;
}

export function fromNumber(exp: number) {
  const date = new Date(exp);
  return fromDate(date);
}
export function convert(value: number | Date) {
  if (typeof value === "number") return fromNumber(value);
  if (value instanceof Date) return fromDate(value);
  return value;
}

export function toDate(value: string): Date {
  if (!value || !value.trim() || value.indexOf("-") === -1) return new Date();
  const parts = value.split("-");
  return new Date(Number(parts[0]), Number(parts[1]), Number(parts[2]));
}

const DateField: StatelessComponent<DateFieldProps> = props => {
  const {
    dateValue,
    value,
    type,
    onDateChange,
    onChange,
    InputLabelProps,
    ...rest
  } = props;
  const handle: ChangeEventHandler<HTMLInputElement> = e => {
    onDateChange(toDate(e.target.value));
  };
  return (
    <TextField
      type="date"
      value={convert(dateValue)}
      onChange={handle}
      InputLabelProps={
        InputLabelProps || {
          shrink: true
        }
      }
      {...rest}
    />
  );
};
export default DateField;
