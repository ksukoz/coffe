import React from 'react';
import StackViewStyleInterpolator from 'react-navigation-stack/dist/views/StackView/StackViewStyleInterpolator';
import HomeScreen from './HomeScreen.js';
import HomeOther from '../HomeOther/index.js';
import HomeDishes from '../HomeDishes/index.js';
import Catalog from '../Catalog/index.js';
import Cart from '../Cart/index.js';
import Search from '../Search/index.js';
import Profile from '../Profile/index.js';
import ProfileEdit from '../ProfileEdit/index.js';
import SelectCity from '../SelectCity/index.js';
import SelectRegion from '../SelectRegion/index.js';
import MyCoffee from '../MyCoffee/index.js';
import Info from '../Info/index.js';
import Delivery from '../Delivery/index.js';
import SideBar from '../SideBar.js';
import { createDrawerNavigator, createStackNavigator } from 'react-navigation';
import { Dimensions } from 'react-native';
import RecipesMain from '../Recipes/Main/index.js';
import RecipeSearch from '../Recipes/Search/index.js';
import RecipeRecipe from '../Recipes/Recipe/index.js';
import RecipeProduct from '../Recipes/Product/index.js';
import RecipeFavorite from '../Recipes/Favorite/index.js';
import RecipeFeedback from '../Recipes/Feedback/index.js';
import ProductCard from '../ProductCard/index.js';
import Order from '../Order/index.js';
import OrderSingle from '../OrderSingle/index.js';
import Payment from '../Payment/index.js';
import Department from '../Department/index.js';

const prefix = 'http://';

const Home = createStackNavigator(
	{
		Home: { screen: HomeScreen },
		HomeOther: { screen: HomeOther },
		HomeDishes: { screen: HomeDishes },
		Search: { screen: Search },
		Catalog: { screen: Catalog },
		ProductCard: { screen: ProductCard, path: 'kawa-share.surge.sh/:user' },
		Delivery: { screen: Delivery },
		Cart: { screen: Cart },
		Order: { screen: Order },
		OrderSingle: { screen: OrderSingle },
		Payment: { screen: Payment },
		Department: { screen: Department },
		ProfileEdit: { screen: ProfileEdit },
		SelectRegion: { screen: SelectRegion },
		SelectCity: { screen: SelectCity }
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
		Cart: { screen: Cart }
	},
	{
		contentComponent: (props) => <SideBar {...props} />,
		initialRouteName: 'Home',
		drawerWidth: Dimensions.get('window').width * 0.85
	}
);

export default HomeScreenRouter;
