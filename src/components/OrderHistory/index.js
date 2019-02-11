import React, { Component } from "react";
import OrderHistoryScreen from "./OrderHistoryScreen.js";

import { StackNavigator } from "react-navigation";
export default (DrawNav = StackNavigator(
  {
    OrderHistoryScreen: { screen: OrderHistoryScreen }
  },
  {
    headerMode: "none"
  }
));
