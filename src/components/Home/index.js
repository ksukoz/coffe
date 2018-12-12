import React from 'react';
import HomeScreen from './HomeScreen.js';
import Catalog from '../Catalog/index.js';
import Profile from '../Profile/index.js';
import ProfileEdit from '../ProfileEdit/index.js';
import SelectCity from '../SelectCity/index.js';
import SelectRegion from '../SelectRegion/index.js';
import MyCoffee from '../MyCoffee/index.js';
import Info from '../Info/index.js';
import Delivery from '../Delivery/index.js';
import SideBar from '../SideBar.js';
import { DrawerNavigator } from 'react-navigation';
import { Dimensions } from 'react-native';
import RecipesMain from '../Recipes/Main/index.js';
import RecipeSearch from '../Recipes/Search/index.js';
import RecipeRecipe from '../Recipes/Recipe/index.js';
import RecipeProduct from '../Recipes/Product/index.js';
import RecipeFavorite from '../Recipes/Favorite/index.js';
import RecipeFeedback from '../Recipes/Feedback/index.js';
// import ProductCard from "../ProductCard/index.js"

const HomeScreenRouter = DrawerNavigator(
	{
		Home: { screen: HomeScreen },
		Catalog: { screen: Catalog },
		Profile: { screen: Profile },
		ProfileEdit: { screen: ProfileEdit },
		SelectCity: { screen: SelectCity },
		SelectRegion: { screen: SelectRegion },
		Info: { screen: Info },
		MyCoffee: { screen: MyCoffee },
		RecipesMainScreen: { screen: RecipesMain },
		RecipeSearchScreen: { screen: RecipeSearch },
		RecipeRecipeScreen: { screen: RecipeRecipe },
		RecipeProductScreen: { screen: RecipeProduct },
		RecipeFavoriteScreen: { screen: RecipeFavorite },
		RecipeFeedbackScreen: { screen: RecipeFeedback },
		Delivery: { screen: Delivery }
		// ProductCard: {screen: ProductCard}
	},
	{
		contentComponent: (props) => <SideBar {...props} />,
		initialRouteName: 'Home',
		drawerWidth: Dimensions.get('window').width * 0.85
	}
);
export default HomeScreenRouter;
