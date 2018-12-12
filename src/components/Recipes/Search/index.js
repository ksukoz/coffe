import React, { Component } from "react";
import RecipeSearchScreen from "./RecipeSearchScreen.js";

import { StackNavigator } from "react-navigation";
export default (DrawNav = StackNavigator({
    RecipeSearchScreen: { screen: RecipeSearchScreen }
}, {
    headerMode: 'none'
}));