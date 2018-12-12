import React, { Component } from "react";
import FeedbackScreen from "../Feedback/FeedbackScreen.js";

import { StackNavigator } from "react-navigation";
export default (DrawNav = StackNavigator({
    FeedbackScreen: { screen: FeedbackScreen }
}, {
    headerMode: 'none'
}));