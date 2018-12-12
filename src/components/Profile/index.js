import React, { Component } from "react";
import ProfileScreen from "../Profile/ProfileScreen.js";

import { StackNavigator } from "react-navigation";
export default (DrawNav = StackNavigator({
    ProfileScreen: { screen: ProfileScreen }
}, {
    headerMode: 'none'
}));