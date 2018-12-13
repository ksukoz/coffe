import React, { Component } from "react";
import ProductCardScreen from "../ProductCard/ProductCardScreen";
import CoffeeInfo from "../ProductCard/CoffeeInfoScreen";

import { StackNavigator } from "react-navigation";
export default (DrawNav = StackNavigator(
  {
    ProductCardScreen: { screen: ProductCardScreen },
    CoffeeInfo: { screen: CoffeeInfo }
  },
  {
    headerMode: "none"
  }
));
