import { join } from "path";
import { AuthProvider, withAuth } from "../src";
import React from "react";
import ReactDOM from "react-dom/server";
/**
 *
 */
describe(require(join(__dirname, "../package.json")).name, () => {
  it("works", () => {
    const notAuth = {
      login(...args){
        if(!args){ throw new Error("no Args")}
      },
      logout(){
        // ....
      }
    };            
    const Authy = withAuth(props => typeof props.auth.login as any);
    expect(ReactDOM.renderToString(
        <AuthProvider 
            auth={notAuth} 
            children={<Authy />}/>))
    .toBe("function");
  });
});
