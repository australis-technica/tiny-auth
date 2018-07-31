import {
  Avatar,
  Icon,
  IconButton,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Menu,
  MenuItem,
  Toolbar,
  Typography,
  ListItemSecondaryAction,
  TextField
} from "@material-ui/core";
import * as React from "react";
import { Fragment, ChangeEventHandler, PureComponent } from "react";
import featureTools from "./tools";
export interface CreateFeaturesViewProps {
  features: string;
  onFeaturesChanged(features: string): any;
}

interface CreateFeaturesViewState {
  newValue: string;
  // features: {};
  isMenuOpen: boolean;
  prevFeatureValue: string;
  editFeatureKey: string;
  editError: string | undefined;
}
export default class CreateFeaturesView extends PureComponent<
  CreateFeaturesViewProps,
  CreateFeaturesViewState
  > {
  state: CreateFeaturesViewState = {
    // features: {},
    isMenuOpen: false,
    editFeatureKey: "",
    editError: "",
    prevFeatureValue: "",
    newValue: ""
  };

  closeMenu = () => {
    this.setState({ isMenuOpen: false });
  };
  openMenu = () => {
    this.setState({ isMenuOpen: true });
  };
  handleMenuAction = (callback: Function) => {
    return () => {
      this.closeMenu();
      callback();
    };
  };

  addFeature = () => {
    const keys = featureTools.keys(this.props.features);
    let next = keys.length + 1;
    let newKey = `${next}`;
    while (keys.indexOf(newKey) !== -1) {
      next += 1;
      newKey = `${next}`;
    }
    const values = featureTools.setFeature(this.props, { [newKey]: `Feature_${next}` });
    // this.setState({
    //   features: values
    // });
    this.props.onFeaturesChanged(featureTools.toString(values));
  };

  removeFeature(featureName: string) {
    return () => {
      // const { features } = this.state;
      const features = featureTools.toObject(this.props.features);
      delete features[featureName];
      // this.setState({
      //   features
      // });
      this.props.onFeaturesChanged(featureTools.toString(features));
    };
  }

  clearFeatures = () => {
    const features = {};
    // this.setState({ features });
    this.props.onFeaturesChanged(featureTools.toString(features));
  };

  renderFeature = (
    feature: { key: string; value: string },
    index: number,
    array: { key: string; value: string }[]
  ) => {
    const { key, value } = feature;
    const isEditing = this.state.editFeatureKey === key;

    const startEdit = () => {
      this.setState({
        prevFeatureValue: value,
        editFeatureKey: key,
        newValue: value
      });
    };

    const cancelEdit = () => {
      return this.setState({
        editFeatureKey: "",
        prevFeatureValue: ""
      });
    };

    const applyEdit = () => {
      const { newValue } = this.state;
      const features = featureTools.setFeature(this.props, {
        [key]: newValue
      });
      this.setState({
        editFeatureKey: "",
        prevFeatureValue: ""
        // features
      });
      return this.props.onFeaturesChanged(featureTools.toString(features));
    };

    const validate = (newValue: string) => {
      if (!newValue || newValue.trim() === "") {
        return "Not Empty";
      }
      if (/\s+/.test(newValue)) {
        return "No White Spaces";
      }
      if (!/^[a-zA-Z0-9_]+$/.test(newValue)) {
        return "Invalid Name";
      }
      // const { features } = this.state;
      const features = featureTools.toObject(this.props.features);
      const keys = Object.keys(features);
      const found = keys
        .map(X => features[X].toLowerCase())
        .find(x => x === newValue.toLowerCase());
      if (!!found) {
        return "Must be unique";
      }
      return undefined;
    };

    const onEditNameChanged: ChangeEventHandler<HTMLInputElement> = e => {
      const newValue = e.target.value;
      const editError = validate(newValue);
      this.setState({ newValue, editError });
    };

    const edit = () => (
      <TextField
        autoFocus={true}
        style={{ backgroundColor: "lightpink", padding: "0.5rem" }}
        value={this.state.newValue}
        onChange={onEditNameChanged}
        onKeyUp={e => {
          if (["Enter"].indexOf(e.key) !== -1) {
            if (!this.state.editError) {
              return applyEdit();
            }
          }
          if (["Escape"].indexOf(e.key) !== -1) {
            return cancelEdit();
          }
        }}
      />
    );

    const show = () => <span>{value}</span>;

    return (
      <ListItem key={`feature_${index}`}>
        <ListItemAvatar
          children={
            <IconButton
              disabled={isEditing}
              aria-label="Delete"
              title="Delete"
              onClick={this.removeFeature(key)}
              children={<Icon children="delete" />}
            />
          }
        />
        <ListItemText
          primary={isEditing ? edit() : show()}
          secondary={
            (!isEditing && `${index + 1} of ${array.length}`) || (
              <span
                style={{ color: "red" }}
                children={this.state.editError && this.state.editError}
              />
            )
          }
        />
        <ListItemSecondaryAction>
          <IconButton
            hidden={!isEditing}
            aria-label="apply-edit"
            title="Apply Edit"
            disabled={!isEditing || !!this.state.editError}
          >
            <Icon children="checked" onClick={applyEdit} />
          </IconButton>
          <IconButton
            hidden={!isEditing}
            aria-label="cancel-edit"
            title="Cancel Edit"
            disabled={!isEditing}
          >
            <Icon children="cancel" onClick={cancelEdit} />
          </IconButton>
          <IconButton aria-label="Edit" title="Edit" disabled={isEditing}>
            <Icon children="edit" onClick={startEdit} />
          </IconButton>
        </ListItemSecondaryAction>
      </ListItem>
    );
  };

  renderNoFeatures() {
    return (
      <ListItem key="no-features">
        <ListItemAvatar
          children={<Avatar children={<Icon children="warning" />} />}
        />
        <ListItemText primary={"No Features"} />
      </ListItem>
    );
  }
  menuButton: any;

  renderMenu = () => {
    const { isMenuOpen } = this.state;
    return (
      <Fragment>
        <IconButton
          buttonRef={x => (this.menuButton = x)}
          onClick={this.openMenu}
        >
          <Icon>more_vert</Icon>
        </IconButton>
        <Menu
          open={isMenuOpen}
          anchorEl={this.menuButton}
          onClose={this.closeMenu}
        >
          <MenuItem onClick={this.handleMenuAction(this.addFeature)}>
            <ListItemText>Add</ListItemText>
          </MenuItem>
          <MenuItem onClick={this.handleMenuAction(this.clearFeatures)}>
            <ListItemText>Clear</ListItemText>
          </MenuItem>
        </Menu>
      </Fragment>
    );
  };
  render() {
    const features = featureTools.toObject(this.props.features);
    const keys = Object.keys(features);
    return (
      <Fragment>
        <Toolbar>
          <Typography variant="title">Features</Typography>
          <div style={{ flex: "1 0" }} />
          {this.renderMenu()}
        </Toolbar>
        <List>
          {!keys || (!keys.length && this.renderNoFeatures())}
          {keys
            .map(key => ({ key, value: features[key] }))
            .map(this.renderFeature)}
        </List>
      </Fragment>
    );
  }
}
