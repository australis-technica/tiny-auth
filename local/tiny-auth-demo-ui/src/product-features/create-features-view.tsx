import { Avatar, Icon, IconButton, List, ListItem, ListItemAvatar, ListItemText, Menu, MenuItem, Toolbar, Typography, ListItemSecondaryAction, TextField } from "@material-ui/core";
import * as React from "react";
import { Component, Fragment, ChangeEventHandler } from "react";

export interface CreateFeaturesViewProps {

}
interface CreateFeaturesViewState {
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
        prevFeatureName: ""
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

    removeFeature = (featureName: any) => {
        this.setState({ features: this.state.features.filter(x => x !== featureName) });
    }


    renderFeature = (featureName: string, index: number, array: string[]) => {

        const isEditing = this.state.editFeature === featureName;

        const startEdit = () => {
            this.setState({
                prevFeatureName: featureName,
                editFeature: featureName
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

        const applyEdit = () => {
            return this.setState({ editFeature: undefined });
        }

        const onEditNameChanged: ChangeEventHandler<HTMLInputElement> = (e) => {
            const newName = e.target.value;
            if (this.state.features.indexOf(newName) !== -1) {
                return this.setState({ error: "Already taken" });
            }
            const features = this.state.features.filter(x => x !== featureName).concat([newName]);
            const { editFeature } = this.state;
            this.setState({ features, editFeature: isEditing ? newName : editFeature });
        };

        const edit = () => (<TextField
            autoFocus={true}
            style={{ backgroundColor: "lightpink", padding: "0.5rem" }}
            value={featureName}
            onChange={onEditNameChanged}
            onKeyUp={e => {
                if ((["Enter"].indexOf(e.key) !== -1)) {
                    return applyEdit();
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
                            onClick={() => {
                                this.removeFeature(featureName);
                            }} children={<Icon children="delete" />} />
                    } />
                <ListItemText
                    color={this.state.editError ? "error" : undefined}
                    primary={isEditing ? edit() : show()}
                    secondary={(!isEditing && `${index} of ${array.length}`) || (this.state.editError && this.state.editError)} />
                <ListItemSecondaryAction>
                    <IconButton hidden={!isEditing}
                        aria-label="apply-edit"
                        title="Apply Edit"
                        disabled={!isEditing}>
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