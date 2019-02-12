import React from "react";
import NavigationActions from "react-navigation";
import HomeScreen from "./HomeScreen.js";
import HomeOther from "../HomeOther/index.js";
import HomeDishes from "../HomeDishes/index.js";
import Catalog from "../Catalog/index.js";
import Cart from "../Cart/index.js";
import Search from "../Search/index.js";
import Profile from "../Profile/index.js";
import ProfileEdit from "../ProfileEdit/index.js";
import SelectCity from "../SelectCity/index.js";
import SelectRegion from "../SelectRegion/index.js";
import MyCoffee from "../MyCoffee/index.js";
import Info from "../Info/index.js";
import Delivery from "../Delivery/index.js";
import SideBar from "../SideBar.js";
import { createDrawerNavigator, createStackNavigator } from "react-navigation";
import { Dimensions } from "react-native";
import RecipesMain from "../Recipes/Main/index.js";
import RecipeSearch from "../Recipes/Search/index.js";
import RecipeRecipe from "../Recipes/Recipe/index.js";
import RecipeProduct from "../Recipes/Product/index.js";
import RecipeFavorite from "../Recipes/Favorite/index.js";
import RecipeFeedback from "../Recipes/Feedback/index.js";
import ProductCard from "../ProductCard/index.js";
import Order from "../Order/index.js";
import OrderSingle from "../OrderSingle/index.js";
import Payment from "../Payment/index.js";
import Department from "../Department/index.js";
import Liqpay from "../Liqpay/index.js";
import Portmone from "../Portmone/index.js";
import OrderHistory from "../OrderHistory/index.js";

const prefix = "http://";

const Home = createStackNavigator(
  {
    HomeScreen: { screen: HomeScreen },
    HomeOther: { screen: HomeOther },
    HomeDishes: { screen: HomeDishes },
    Search: { screen: Search },
    Catalog: { screen: Catalog },
    ProductCard: { screen: ProductCard, path: "kawa-share.surge.sh/:user" },
    Delivery: { screen: Delivery },
    Cart: { screen: Cart },
    Order: { screen: Order },
    OrderSingle: { screen: OrderSingle },
    OrderHistory: { screen: OrderHistory },
    Payment: { screen: Payment },
    Department: { screen: Department },
    ProfileEdit: { screen: ProfileEdit },
    SelectRegion: { screen: SelectRegion },
    SelectCity: { screen: SelectCity },
    Liqpay: { screen: Liqpay },
    Portmone: { screen: Portmone }
  },
  {
    headerMode: "none"
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
    contentComponent: props => <SideBar {...props} />,
    initialRouteName: "Home",
    drawerWidth: Dimensions.get("window").width * 0.85
  }
);

const navigateOnce = getStateForAction => (action, state) => {
  const { type, routeName } = action;
  return state &&
    type === NavigationActions.NAVIGATE &&
    routeName === state.routes[state.routes.length - 1].routeName
    ? null
    : getStateForAction(action, state);
  // you might want to replace 'null' with 'state' if you're using redux (see comments below)
};

Home.router.getStateForAction = navigateOnce(Home.router.getStateForAction);
HomeScreenRouter.router.getStateForAction = navigateOnce(
  HomeScreenRouter.router.getStateForAction
);

export default HomeScreenRouter;
