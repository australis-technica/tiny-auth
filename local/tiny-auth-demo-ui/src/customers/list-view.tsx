import { Component } from "react";
import * as React from "react";
/**
 *
 */
interface State {
  error?: string;
  busy: boolean;
  data: any[];
  name: string;
}

export default class ListView extends Component<{}> {
  
  state: State = {
    error: undefined,
    busy: false,
    data: [],
    name: "customers"
  };

  async componentDidMount() {
    const { name } = this.state;
    try {
      this.setState({ error: undefined });
      this.setState({ busy: true });
      const r = await fetch(
        `${process.env.REACT_APP_API_BASE}/${name.toLowerCase()}`,
        {
          method: "GET"
        }
      );
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
      this.setState({ busy: false });
    }
  }
  render() {
    const { error, data, busy, name } = this.state;
    return (
      <div style={{ margin: "1rem", display: "flex", flexDirection: "column" }}>
        {error && <span style={{ color: "red" }}>{error}</span>}
        {busy && <span>...busy</span>}
        <span style={{ textTransform: "capitalize" }}>List {name}</span>
        <pre>{JSON.stringify(data, null, 2)}</pre>
      </div>
    );
  }
}
