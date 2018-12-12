import React, { Component } from "react";
import SelectRegionScreen from "../SelectRegion/SelectRegionScreen.js";

import { StackNavigator } from "react-navigation";
export default (DrawNav = StackNavigator({
    SelectRegionScreen: {
        screen: SelectRegionScreen,
        portraitOnlyMode: true
    }
}, {
    headerMode: 'none'
}));