import React, { Component } from "react";
import FavoriteScreen from "../Favorite/FavoriteScreen.js";

import { StackNavigator } from "react-navigation";
export default (DrawNav = StackNavigator({
    FavoriteScreen: { screen: FavoriteScreen }
}, {
    headerMode: 'none'
}));