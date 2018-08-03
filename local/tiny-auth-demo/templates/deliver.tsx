import * as React from "react";
export default class extends React.Component<{
    user: { displayName: string },
    license: { displayName: string, token: string },
}> {
    render() {
        const { user, license } = this.props;
        return <div >
            Hi {user.displayName},
            <div style={{ margin: "15px" }}>
                This is the {license.displayName} token.
            </div>
            <div style={{ margin: "15px" }}>{license.token}</div>
            <pre>{"\n\r"}
                Regards.{"\n\r"}
                The Robot.
            </pre>
        </div>;
    }
}