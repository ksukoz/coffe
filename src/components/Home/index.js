import React from 'react';
import NavigationActions from 'react-navigation';
import HomeScreen from './HomeScreen';
import HomeOtherScreen from '../HomeOther/HomeOtherScreen';
import HomeDishesScreen from '../HomeDishes/HomeDishesScreen';
import CatalogScreen from '../Catalog/CatalogScreen';
import CartScreen from '../Cart/CartScreen';
import SearchScreen from '../Search/SearchScreen';
import Profile from '../Profile/index.js';
import ProfileEdit from '../ProfileEdit/index.js';
import SelectCity from '../SelectCity/index.js';
import SelectRegion from '../SelectRegion/index.js';
import MyCoffee from '../MyCoffee/index.js';
import Info from '../Info/index.js';
import DeliveryScreen from '../Delivery/DeliveryScreen';
import SideBar from '../SideBar.js';
import { createDrawerNavigator, createStackNavigator } from 'react-navigation';
import { Dimensions } from 'react-native';
import RecipesMain from '../Recipes/Main/index.js';
import RecipeSearch from '../Recipes/Search/index.js';
import RecipeRecipe from '../Recipes/Recipe/index.js';
import RecipeProduct from '../Recipes/Product/index.js';
import RecipeFavorite from '../Recipes/Favorite/index.js';
import RecipeFeedback from '../Recipes/Feedback/index.js';
import ProductCardScreen from '../ProductCard/ProductCardScreen';
import OrderScreen from '../Order/OrderScreen';
import OrderSingleScreen from '../OrderSingle/OrderSingleScreen';
import PaymentScreen from '../Payment/PaymentScreen';
import DepartmentScreen from '../Department/DepartmentScreen';
import LiqpayScreen from '../Liqpay/LiqpayScreen';
import PortmoneScreen from '../Portmone/PortmoneScreen';
import OrderHistoryScreen from '../OrderHistory/OrderHistoryScreen';

const prefix = 'http://';

const Home = createStackNavigator(
	{
		HomeScreen: { screen: HomeScreen },
		HomeOther: { screen: HomeOtherScreen },
		HomeDishes: { screen: HomeDishesScreen },
		Search: { screen: SearchScreen },
		Catalog: { screen: CatalogScreen },
		ProductCard: { screen: ProductCardScreen, path: 'kawa-share.surge.sh/:user' },
		Delivery: { screen: DeliveryScreen },
		Cart: { screen: CartScreen },
		Order: { screen: OrderScreen },
		OrderSingle: { screen: OrderSingleScreen },
		OrderHistory: { screen: OrderHistoryScreen },
		Payment: { screen: PaymentScreen },
		Department: { screen: DepartmentScreen },
		ProfileEdit: { screen: ProfileEdit },
		SelectRegion: { screen: SelectRegion },
		SelectCity: { screen: SelectCity },
		Liqpay: { screen: LiqpayScreen },
		Portmone: { screen: PortmoneScreen }
	},
	{
		headerMode: 'none'
	}
);

const HomeScreenRouter = createDrawerNavigator(
	{
		Home: { screen: Home },
		Profile: { screen: Profile },
		Info: { screen: Info },
		MyCoffee: { screen: MyCoffee },
		RecipesMainScreen: { screen: RecipesMain },
		RecipeSearchScreen: { screen: RecipeSearch },
		RecipeRecipeScreen: { screen: RecipeRecipe },
		RecipeProductScreen: { screen: RecipeProduct },
		RecipeFavoriteScreen: { screen: RecipeFavorite },
		RecipeFeedbackScreen: { screen: RecipeFeedback },
		Cart: { screen: CartScreen }
	},
	{
		contentComponent: (props) => <SideBar {...props} />,
		initialRouteName: 'Home',
		drawerWidth: Dimensions.get('window').width * 0.85
	}
);

const navigateOnce = (getStateForAction) => (action, state) => {
	const { type, routeName } = action;
	return state && type === NavigationActions.NAVIGATE && routeName === state.routes[state.routes.length - 1].routeName
		? null
		: getStateForAction(action, state);
	// you might want to replace 'null' with 'state' if you're using redux (see comments below)
};

Home.router.getStateForAction = navigateOnce(Home.router.getStateForAction);
HomeScreenRouter.router.getStateForAction = navigateOnce(HomeScreenRouter.router.getStateForAction);

export default HomeScreenRouter;
