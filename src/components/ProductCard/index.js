import React, { Component } from "react";
import ProductCardScreen from "../ProductCard/ProductCardScreen";

import { StackNavigator } from "react-navigation";
export default (DrawNav = StackNavigator(
  {
    ProductCardScreen: { screen: ProductCardScreen }
  },
  {
    headerMode: "none"
  }
));
