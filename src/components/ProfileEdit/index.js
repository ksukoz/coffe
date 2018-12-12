import React, { Component } from "react";
import ProfileEditScreen from "../ProfileEdit/ProfileEditScreen.js";

import { StackNavigator } from "react-navigation";
export default (DrawNav = StackNavigator({
    ProfileEditScreen: { screen: ProfileEditScreen }
}, {
    headerMode: 'none'
}));