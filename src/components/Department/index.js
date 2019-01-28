import React, { Component } from "react";
import DepartmentScreen from "../Department/DepartmentScreen.js";

import { StackNavigator } from "react-navigation";
export default (DrawNav = StackNavigator(
  {
    Department: { screen: DepartmentScreen }
  },
  {
    headerMode: "none"
  }
));
