import React, { Component } from "react";
import MainScreen from "./MainScreen.js";

import { StackNavigator } from "react-navigation";
export default (DrawNav = StackNavigator({
    MainScreen: { screen: MainScreen }
}, {
    headerMode: 'none'
}));