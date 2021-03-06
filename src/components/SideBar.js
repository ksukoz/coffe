import React from "react";
import {
  ImageBackground,
  StyleSheet,
  Image,
  View,
  Alert,
  AsyncStorage,
  BackHandler
} from "react-native";
import KawaIcon from "./KawaIcon";
import { Text, Container, List, ListItem, Content } from "native-base";

const routes = {
  1: { name: "Главная", route: "HomeScreen", icon: "house" },
  2: { name: "Личные данные", route: "Profile", icon: "menu-personal-info" },
  3: { name: "Корзина", route: "Cart", icon: "menu-cart" },
  4: { name: "Мои заказы", route: "HomeScreen", icon: "menu-my-orders" },
  5: { name: "Мои оценки", route: "HomeScreen", icon: "menu-my-appraisal" },
  6: { name: "Добавлено мной", route: "HomeScreen", icon: "menu-my_addition" },
  7: { name: "Мой кофе", route: "MyCoffee", icon: "menu-my-coffee" },
  8: {
    name: "Любимые рецепты",
    route: "RecipeFavoriteScreen",
    icon: "menu-recipes-favorite"
  },
  9: { name: "Гадание", route: "HomeScreen", icon: "menu-divination" },
  10: { name: "Информация", route: "Info", icon: "menu-info" }
};

let self;

class RowComponent extends React.Component {
  render() {
    return (
      <ListItem
        style={{
          borderBottomWidth: 0,
          height: 58,
          width: "100%",
          paddingLeft: 20,
          paddingRight: 0,
          marginLeft: 0,
          marginRight: 0
        }}
        button
        onPress={() => self.routeMove(this.props.data.route)}
      >
        <KawaIcon
          style={{ color: "#4c4941" }}
          size={24}
          name={this.props.data.icon}
        />
        <Text style={{ paddingLeft: 40, fontSize: 15, color: "#4c4941" }}>
          {this.props.data.name}
        </Text>
      </ListItem>
    );
  }
}

export default class SideBar extends React.Component {
  _didFocusSubscription;
  _willBlurSubscription;
  constructor(props) {
    super(props);
    this._didFocusSubscription = this.props.navigation.addListener(
      "didFocus",
      payload => {
        BackHandler.addEventListener("hardwareBackPress", () => {
          return true;
        });
      }
    );
    self = this;
  }

  componentDidMount() {
    this._willBlurSubscription = this.props.navigation.addListener(
      "willBlur",
      payload =>
        BackHandler.removeEventListener("hardwareBackPress", () => {
          return true;
        })
    );
  }

  routeMove(route: string) {
    this.props.navigation.navigate(route);
    this.props.navigation.closeDrawer();
  }
  render() {
    return (
      <Container>
        <View
          style={{
            height: 180,
            width: "100%",
            position: "relative"
          }}
        >
          <Image
            source={require("../static/img/menu-bg.png")}
            style={{
              width: "100%",
              height: 230,
              position: "absolute",
              top: 0,
              left: 0
            }}
          />
          <Image
            style={{
              height: 120,
              width: 120,
              position: "absolute",
              alignSelf: "center",
              top: 20
            }}
            source={require("../static/img/avatar.png")}
          />
          <Text
            style={{
              height: 60,
              width: "100%",
              position: "absolute",
              alignSelf: "center",
              bottom: -50,
              fontSize: 20,
              paddingLeft: 20,
              color: "#000000"
            }}
          >
            Максим Ефимов
          </Text>
        </View>
        <List
          dataArray={routes}
          style={{ marginTop: 30 }}
          renderRow={row => <RowComponent data={row} />}
        />
        <Image
          style={{
            height: 45,
            width: 60,
            position: "absolute",
            right: 20,
            bottom: 20
          }}
          source={require("../static/img/bottom-menu-bg.png")}
        />
      </Container>
    );
  }
}
