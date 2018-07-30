import { Avatar, Icon, IconButton, List, ListItem, ListItemAvatar, ListItemText, Menu, MenuItem, Toolbar, Typography, ListItemSecondaryAction, TextField } from "@material-ui/core";
import * as React from "react";
import { Component, Fragment, ChangeEventHandler } from "react";

export interface CreateFeaturesViewProps {

}

interface CreateFeaturesViewState {
    newName: string;
    prevFeatureName: string,
    editFeature: string;
    features: string[];
    isMenuOpen: boolean;
    editError: string | undefined;
}
export default class CreateFeaturesView extends Component<CreateFeaturesViewProps> {
    state: CreateFeaturesViewState = {
        features: [],
        isMenuOpen: false,
        editFeature: "",
        editError: "",
        prevFeatureName: "",
        newName: ""
    }
    closeMenu = () => {
        this.setState({ isMenuOpen: false });
    }
    openMenu = () => {
        this.setState({ isMenuOpen: true });
    }
    handleMenuAction = (callback: Function) => {
        return () => {
            this.closeMenu();
            callback();
        }
    }
    addFeature = () => {
        const { features } = this.state;
        let next = features.length + 1
        let newFeature = `Feature_${next}`;
        while (features.indexOf(newFeature) !== -1) {
            next += 1;
            newFeature = `Feature_${next}`
        }
        this.setState({ features: features.concat([newFeature]) });
    }
    clearFeatures = () => {
        this.setState({ features: [] });
    }

    renderFeature = (featureName: string, index: number, array: string[]) => {
        const isEditing = this.state.editFeature === featureName;

        const startEdit = () => {
            this.setState({
                prevFeatureName: featureName,
                editFeature: featureName,
                newName: featureName
            })
        };

        const cancelEdit = () => {
            return this.setState({
                editFeature: undefined,
                features: this.state.features
                    .filter(x => x !== featureName)
                    .concat([this.state.prevFeatureName])
            })
        }

        const rename = () => {
            return this.state.features.filter(x => x !== featureName).concat([this.state.newName]);
        }

        const applyEdit = () => {
            return this.setState({ editFeature: undefined, features: rename() });
        }

        const remove = () => {
            this.setState({ features: this.state.features.filter(x => x !== featureName) });
        }

        const validate = (value: string) => {
            if (!value || value.trim() === "") {
                return "Not Empty";
            }
            if (/\s+/.test(value)) {
                return "No White Spaces";
            }
            if (!/^[a-zA-Z0-9_]+$/.test(value)) {
                return "Invalid Name";
            }
            const { features } = this.state;
            const found = features.map(x => x.toLowerCase()).indexOf(value) !== -1;
            if (found) {
                return "Already taken";
            }
            return undefined;
        }

        const onEditNameChanged: ChangeEventHandler<HTMLInputElement> = (e) => {
            const newName = e.target.value;
            const editError = validate(newName);
            this.setState({ newName, editError });
        };

        const edit = () => (<TextField
            autoFocus={true}
            style={{ backgroundColor: "lightpink", padding: "0.5rem" }}
            value={this.state.newName}
            onChange={onEditNameChanged}
            onKeyUp={e => {
                if ((["Enter"].indexOf(e.key) !== -1)) {
                    if (!this.state.editError) {
                        return applyEdit();
                    }
                }
                if ((["Escape"].indexOf(e.key) !== -1)) {
                    return cancelEdit();
                }
            }}
        />);

        const show = () => <span>{featureName}</span>

        return (
            <ListItem key={`feature_${index}`}>
                <ListItemAvatar
                    children={
                        <IconButton
                            disabled={isEditing}
                            aria-label="Delete"
                            title="Delete"
                            onClick={remove}
                            children={<Icon children="delete" />} />
                    } />
                <ListItemText                    
                    primary={isEditing ? edit() : show()}
                    secondary={(!isEditing && `${index} of ${array.length}`) || <span style={{color: "red"}} children={(this.state.editError && this.state.editError)} />} />
                <ListItemSecondaryAction>
                    <IconButton hidden={!isEditing}
                        aria-label="apply-edit"
                        title="Apply Edit"
                        disabled={!isEditing || !!this.state.editError}>
                        <Icon children="checked" onClick={applyEdit} />
                    </IconButton>
                    <IconButton hidden={!isEditing}
                        aria-label="cancel-edit"
                        title="Cancel Edit"
                        disabled={!isEditing}>
                        <Icon children="cancel" onClick={cancelEdit} />
                    </IconButton>
                    <IconButton
                        aria-label="Edit"
                        title="Edit"
                        disabled={isEditing}>
                        <Icon children="edit" onClick={startEdit} />
                    </IconButton>
                </ListItemSecondaryAction>
            </ListItem>
        );
    }
    renderNoFeatures() {
        return <ListItem key="no-features">
            <ListItemAvatar children={<Avatar children={<Icon children="warning" />} />} />
            <ListItemText primary={"No Features"} />
        </ListItem>
    }
    menuButton: any;

    renderMenu = () => {
        const { isMenuOpen } = this.state;
        return <Fragment>
            <IconButton buttonRef={x => this.menuButton = x}
                onClick={this.openMenu}><Icon>more_vert</Icon></IconButton>
            <Menu open={isMenuOpen} anchorEl={this.menuButton} onClose={this.closeMenu}>
                <MenuItem onClick={this.handleMenuAction(this.addFeature)}>
                    <ListItemText>Add</ListItemText>
                </MenuItem>
                <MenuItem onClick={this.handleMenuAction(this.clearFeatures)}>
                    <ListItemText>Clear</ListItemText>
                </MenuItem>
            </Menu>
        </Fragment>
    }
    render() {
        const { features } = this.state;
        return <Fragment>
            <Toolbar>
                <Typography variant="title">Features</Typography>
                <div style={{ flex: "1 0" }} />
                {this.renderMenu()}
            </Toolbar>
            <List>
                {!features || !features.length && this.renderNoFeatures()}
                {features.map(this.renderFeature)}
            </List>
        </Fragment>
    }
}