import React, { Component } from "react";
import CartScreen from "../Cart/CartScreen.js";

import { StackNavigator } from "react-navigation";
export default (DrawNav = StackNavigator(
  {
    Cart: { screen: CartScreen }
  },
  {
    headerMode: "none"
  }
));
