import viewStore from "../view-store";
const defaultState = {
  title: process.env.REACT_APP_TITLE || "Tiny-Auth/Demo",
  rootUrl: "/",
  viewIndex: 0
};
const adapter = viewStore("root", defaultState);
export default adapter;
