import React, { Component } from "react";
import RecipeScreen from "../Recipe/RecipeScreen.js";

import { StackNavigator } from "react-navigation";
export default (DrawNav = StackNavigator({
    RecipeScreen: { screen: RecipeScreen }
}, {
    headerMode: 'none'
}));