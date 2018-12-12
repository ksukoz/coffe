import React, { Component } from "react";
import SelectCityScreen from "../SelectCity/SelectCityScreen.js";

import { StackNavigator } from "react-navigation";
export default (DrawNav = StackNavigator({
    SelectCityScreen: { screen: SelectCityScreen }
}, {
    headerMode: 'none'
}));