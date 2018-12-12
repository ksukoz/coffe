import React, { Component } from "react";
import MyCoffeeScreen from "../MyCoffee/MyCoffeeScreen.js";

import { StackNavigator } from "react-navigation";
export default (DrawNav = StackNavigator({
    MyCoffeeScreen: { screen: MyCoffeeScreen }
}, {
    headerMode: 'none'
}));