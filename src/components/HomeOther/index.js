import React, { Component } from "react";
import HomeOtherScreen from "../HomeOther/HomeOtherScreen.js";

import { StackNavigator } from "react-navigation";
export default (DrawNav = StackNavigator(
  {
    HomeOther: { screen: HomeOtherScreen }
  },
  {
    headerMode: "none"
  }
));
