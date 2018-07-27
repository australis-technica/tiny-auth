import { Component, ReactNode } from "react";
const log = process.env.NODE_ENV !== "production" ? console.log.bind(console) : () => { };
log("list-view");
/**
  * 
  */
export default class DataView extends Component<{
  error: string;
  busy: boolean;
  data: any;
  fetch(): any;  
  render(props: {}):ReactNode
}> {

  async componentDidMount() {
    this.props.fetch && this.props.fetch();
  }

  render() {    
    return this.props.render(this.props)    
  }
}