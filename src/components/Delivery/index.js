import React, { Component } from 'react';
import DeliveryScreen from '../Delivery/DeliveryScreen.js';

import { StackNavigator } from 'react-navigation';
export default (DrawNav = StackNavigator(
	{
		DeliveryScreen: { screen: DeliveryScreen }
	},
	{
		headerMode: 'none'
	}
));
