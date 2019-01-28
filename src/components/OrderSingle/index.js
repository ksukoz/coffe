import React, { Component } from "react";
import OrderSingleScreen from "./OrderSingleScreen.js";

import { StackNavigator } from "react-navigation";
export default (DrawNav = StackNavigator(
  {
    OrderSingle: { screen: OrderSingleScreen }
  },
  {
    headerMode: "none"
  }
));
