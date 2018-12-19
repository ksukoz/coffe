import React, { Component } from "react";
import { Content, Text, List, ListItem } from "native-base";
import { View, StatusBar, Dimensions, Image } from "react-native";
import KawaIcon from "../KawaIcon";
import HeaderBar from "../common/HeaderBar";
import { scaleSize } from "../../helpers/scaleSize";

StatusBar.setBarStyle("light-content", true);
StatusBar.setBackgroundColor("rgba(0,0,0,0)");

const SCREEN_WIDTH = Dimensions.get("window").width;
const SCREEN_HEIGHT = Dimensions.get("window").height;

const MAIN_BG = "../../static/img/background.png";

export default class OrderScreen extends Component {
  render() {
    const { navigation } = this.props;
    let preparation = [];
    preparation = navigation.getParam("preparation", []);

    return (
      <View style={styles.container}>
        <StatusBar
          barStyle="light-content"
          hidden={false}
          translucent={true}
          backgroundColor={"rgba(0,0,0,0)"}
        />
        <Image source={require(MAIN_BG)} style={styles.background} />
        <Content>
          <HeaderBar
            navigation={this.props.navigation}
            title="Оформление заказа"
          />
        </Content>
      </View>
    );
  }
}

const styles = {
  container: {
    flex: 1,
    width: SCREEN_WIDTH
  },
  background: {
    width: SCREEN_WIDTH,
    height: SCREEN_HEIGHT * 1.5,
    position: "absolute",
    top: 0,
    bottom: 0,
    left: 0,
    right: 0
  },
  listItem: {
    paddingTop: scaleSize(13),
    paddingBottom: scaleSize(13),
    paddingRight: scaleSize(13),
    paddingLeft: scaleSize(13),
    marginLeft: 0
  },
  descView: {
    padding: scaleSize(10),
    marginRight: scaleSize(10),
    marginLeft: scaleSize(10)
  },
  defaultFont: {
    color: "#fff",
    fontSize: scaleSize(15)
  }
};