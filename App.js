/** @format */

import React, { Component } from "react";
import HomeScreen from "./src/components/Home/index.js";

import { Provider } from "react-redux";
import store from "./store";

export default class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <HomeScreen />
      </Provider>
    );
  }
}
