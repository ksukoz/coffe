import React, { Component } from "react";
import CatalogScreen from "../Catalog/CatalogScreen.js";
import HomeScreen from "../Home/HomeScreen";

import { StackNavigator } from "react-navigation";
export default (DrawNav = StackNavigator(
  {
    Catalog: { screen: CatalogScreen }
  },
  {
    headerMode: "none"
  }
));
