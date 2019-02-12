import React, { Component } from "react";
import PortmoneScreen from "./PortmoneScreen.js";

import { StackNavigator } from "react-navigation";
export default (DrawNav = StackNavigator(
  {
    Portmone: { screen: PortmoneScreen }
  },
  {
    headerMode: "none"
  }
));
