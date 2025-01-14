import React from "react";
import {View, Text, Button, ScrollView, AsyncStorage, Switch, PermissionsAndroid, Vibration, Alert} from "react-native";
import {createStackNavigator, createAppContainer} from "react-navigation";
import SettingsScreen from "./SettingsScreen";
import { getDistance } from 'geolib';
import SoundPlayer from 'react-native-sound-player';
import EditScreen from './EditScreen';
import Icon from 'react-native-vector-icons/Ionicons';

import styles from './sytles';
import WaypointsScreen from "./WaypointsScreen";

class WaypointTab extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            enabled: false
        };
    }

    async componentDidMount() {
        try {
            AsyncStorage.getItem(this.props.id).then(
                (item) => {
                    this.setState(JSON.parse(item));
                }
            );
        } catch (error) {
            // Handle errors here
        }
    }

    componentWillUnmount() {
        AsyncStorage.setItem(this.props.id, JSON.stringify(this.state));
    }

    toggleSwitch = value => {
        this.setState({enabled: value});
    };

    render() {
        const {id} = this.props;
        return (
            <View style={styles.view}>
                <Text style={styles.text}>{id}</Text>
                <Switch
                    name="ios-add-circle-outline"
                    size={30}
                    style={{marginLeft: 'auto'}}
                    onValueChange={this.toggleSwitch}
                    value={this.state.enabled}
                />
                <Icon
                    name="edit"
                    size={30}
                    style={{marginLeft: 'auto'}}
                    onPress={() => this.props.navigation.push('Edit', {
                        id: this.props.id
                    })}
                />
            </View>
        );

        // return <ListItem title={id} rightIcon={{ name: 'edit' }} />;
    }
}

export default WaypointTab;
