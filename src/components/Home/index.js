import React from "react";
import HomeScreen from "./HomeScreen.js";
import Catalog from "../Catalog/index.js";
import Profile from "../Profile/index.js";
import ProfileEdit from "../ProfileEdit/index.js";
import SelectCity from "../SelectCity/index.js";
import SelectRegion from "../SelectRegion/index.js";
import MyCoffee from "../MyCoffee/index.js";
import Info from "../Info/index.js";
import Delivery from "../Delivery/index.js";
import SideBar from "../SideBar.js";
import { DrawerNavigator, StackNavigator } from "react-navigation";
import { Dimensions } from "react-native";
import RecipesMain from "../Recipes/Main/index.js";
import RecipeSearch from "../Recipes/Search/index.js";
import RecipeRecipe from "../Recipes/Recipe/index.js";
import RecipeProduct from "../Recipes/Product/index.js";
import RecipeFavorite from "../Recipes/Favorite/index.js";
import RecipeFeedback from "../Recipes/Feedback/index.js";
import ProductCard from "../ProductCard/index.js";
import Order from "../Order/index.js";

const Home = DrawerNavigator(
  {
    Home: { screen: HomeScreen },
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
    Order: { screen: Order }
  },
  {
    contentComponent: props => <SideBar {...props} />,
    initialRouteName: "Home",
    drawerWidth: Dimensions.get("window").width * 0.85
  }
);

const HomeScreenRouter = StackNavigator(
  {
    Home: { screen: Home },
    Catalog: { screen: Catalog },
    Delivery: { screen: Delivery },
    ProductCard: { screen: ProductCard }
  },
  {
    headerMode: "none"
  }
);

export default HomeScreenRouter;
