import React, { Component } from "react";
import ProductScreen from "../Product/ProductScreen.js";

import { StackNavigator } from "react-navigation";
export default (DrawNav = StackNavigator({
    ProductScreen: { screen: ProductScreen }
}, {
    headerMode: 'none'
}));