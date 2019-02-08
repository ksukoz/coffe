import React, { Component } from "react";
import LiqpayScreen from "./LiqpayScreen.js";

import { StackNavigator } from "react-navigation";
export default (DrawNav = StackNavigator(
  {
    LiqpayScreen: { screen: LiqpayScreen }
  },
  {
    headerMode: "none"
  }
));
