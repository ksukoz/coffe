import React, { Component } from "react";
import CatalogScreen from "../Catalog/CatalogScreen.js";

import { StackNavigator } from "react-navigation";
export default (DrawNav = StackNavigator({
    CatalogScreen: { screen: CatalogScreen }
}, {
    headerMode: 'none'
}));