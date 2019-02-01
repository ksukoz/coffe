/** @format */

import React, { Component } from "react";
import { BackHandler } from "react-native";
import HomeScreen from "./src/components/Home/index.js";

const prefix = "http://";

export default class App extends Component {
  componentDidMount() {
    BackHandler.addEventListener("hardwareBackPress", () => {
      return true;
    });
  }

  componentDidMount() {
    BackHandler.removeEventListener("hardwareBackPress");
  }

  render() {
    return <HomeScreen uriPrefix={prefix} navigation={this.props.navigation} />;
  }
}
