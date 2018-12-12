import React, { Component } from "react";
import InfoScreen from "../Info/InfoScreen.js";

import { StackNavigator } from "react-navigation";
export default (DrawNav = StackNavigator({
    InfoScreen: { screen: InfoScreen }
}, {
    headerMode: 'none'
}));