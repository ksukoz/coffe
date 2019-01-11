import React, { Component } from "react";
import HomeDishesScreen from "../HomeDishes/HomeDishesScreen.js";

import { StackNavigator } from "react-navigation";
export default (DrawNav = StackNavigator(
  {
    HomeDishes: { screen: HomeDishesScreen }
  },
  {
    headerMode: "none"
  }
));
