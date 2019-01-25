/** @format */

import React, { Component } from "react";
import HomeScreen from "./src/components/Home/index.js";

const prefix = "http://";

export default class App extends Component {
  render() {
    return <HomeScreen uriPrefix={prefix} />;
  }
}
