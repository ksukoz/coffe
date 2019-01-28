import React, { Component } from "react";
import PaymentScreen from "./PaymentScreen.js";

import { StackNavigator } from "react-navigation";
export default (DrawNav = StackNavigator(
  {
    Payment: { screen: PaymentScreen }
  },
  {
    headerMode: "none"
  }
));
