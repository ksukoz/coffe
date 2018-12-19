import React, { Component } from "react";
import OrderScreen from "./OrderScreen.js";

import { StackNavigator } from "react-navigation";
export default (DrawNav = StackNavigator(
  {
    OrderScreen: { screen: OrderScreen }
  },
  {
    headerMode: "none"
  }
));
