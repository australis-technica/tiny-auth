import { Component } from "react";
import * as React from "react";
/**
 * 
 */
interface State {
  error?: string;
  busy: boolean;
  data: any[];
}
export default class ProductList extends Component<{}> {

  state: State = {
    error: undefined,
    busy: false,
    data: []
  };

  async componentDidMount() {
    try {
      this.setState({ error: undefined });
      this.setState({ busy: true });
      const r = await fetch("http://localhost:4888/api/products", {
        method: "GET"
      });
      if (!r.ok) {
        throw Object.assign(new Error(r.statusText), { code: r.status });
      }
      const data = await r.json();
      this.setState({
        data
      });
    } catch (error) {
      this.setState({ error: error.messsage });
    } finally {
        this.setState({ busy: false});
    }
  }
  render() {
    const { error } = this.state;
    return (
      <div style={{ margin: "1rem", display: "flex", flexDirection: "column" }}>
        {error && <span style={{ color: "red" }}>{error}</span>}
        <span>List Products</span>
      </div>
    );
  }
}
