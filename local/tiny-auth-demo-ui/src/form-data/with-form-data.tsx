import { Component, ReactNode } from "react";
import { FormDataProps } from "./types";
/**
 * Exposed to receive parameters
 */
export interface FormDataParams {  
  render(props: FormDataProps): ReactNode;
  whenNoData?(props: FormDataProps): ReactNode;  
}
/**
 * Parameters & external State
 */
type WithFormDataProps = FormDataProps & FormDataParams;

/** */
class WithFormData extends Component<WithFormDataProps> {  

  /** */
  noData = () => {
    if (this.props.whenNoData) return this.props.whenNoData(this.props);
    throw new Error("No Form Data");
  };

  /** */
  componentDidMount() {
        
  }  
  /** */
  render() {
    const { formData } = this.props;
    if (formData) {
      return this.props.render(this.props);
    }
    return this.noData();
  }
}

export default WithFormData;
