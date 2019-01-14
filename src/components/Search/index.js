import React, { Component } from "react";
import SearchScreen from "../Search/SearchScreen.js";
import HomeScreen from "../Home/HomeScreen";

import { StackNavigator } from "react-navigation";
export default (DrawNav = StackNavigator(
  {
    Search: { screen: SearchScreen }
  },
  {
    headerMode: "none"
  }
));
