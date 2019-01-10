import React, { Component } from "react";
import { Content, Text, List, ListItem } from "native-base";
import {
  View,
  StatusBar,
  Dimensions,
  Image,
  BackHandler,
  StyleSheet
} from "react-native";
import KawaIcon from "../KawaIcon";
import HeaderBar from "../common/HeaderBar";
import { scaleSize } from "../../helpers/scaleSize";

StatusBar.setBarStyle("light-content", true);
StatusBar.setBackgroundColor("rgba(0,0,0,0)");

const SCREEN_WIDTH = Dimensions.get("window").width;
const SCREEN_HEIGHT = Dimensions.get("window").height;

const MAIN_BG = "../../static/img/background.png";

export default class CoffeeInfoScreen extends Component {
  componentDidMount() {
    BackHandler.addEventListener("hardwareBackPress", this.handleBackPress);
  }

  componentWillUnmount() {
    BackHandler.removeEventListener("hardwareBackPress", this.handleBackPress);
  }

  handleBackPress = () => {
    this.props.navigation.pop();
    return true;
  };

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
        <View style={{ flex: 1 }}>
          <HeaderBar navigation={this.props.navigation} title="Справка" />
          <View style={{ flexGrow: 1 }}>
            <Content>
              <Text
                style={[
                  styles.defaultFont,
                  {
                    marginTop: scaleSize(20),
                    width: "100%",
                    textAlign: "left",
                    marginBottom: scaleSize(10),
                    marginLeft: scaleSize(25)
                  }
                ]}
              >
                Способы приготовления:
              </Text>
              <View
                style={{
                  marginBottom: scaleSize(5),
                  backgroundColor: "rgba(255,255,255, 0.7)",
                  borderTopLeftRadius: scaleSize(5),
                  borderTopRightRadius: scaleSize(5),
                  borderBottomLeftRadius: scaleSize(5),
                  borderBottomRightRadius: scaleSize(5),
                  paddingLeft: scaleSize(5),
                  paddingRight: scaleSize(5),
                  marginLeft: "2.2%",
                  marginRight: "2.2%",
                  width: "95.6%"
                }}
              >
                <List
                  style={{ borderBottomWidth: 1, borderBottomColor: "#89a6aa" }}
                >
                  <ListItem
                    style={[
                      styles.listItem,
                      {
                        marginRight: scaleSize(25),
                        paddingTop: scaleSize(25),
                        borderBottomWidth: 0
                      }
                    ]}
                  >
                    <Text style={{ width: scaleSize(50) }}>
                      <KawaIcon
                        style={styles.typeIcon}
                        name={"cup"}
                        size={30}
                        color={
                          preparation.includes("1") ? "#ea9308" : "#ffea00"
                        }
                      />
                    </Text>
                    <Text style={{ fontSize: scaleSize(18) }}>Чашка</Text>
                  </ListItem>
                  <ListItem
                    style={[
                      styles.listItem,
                      {
                        marginLeft: scaleSize(8),
                        marginLeft: scaleSize(5),
                        borderBottomWidth: 0
                      }
                    ]}
                  >
                    <Text style={{ width: scaleSize(50) }}>
                      <KawaIcon
                        style={styles.typeIcon}
                        name={"turk"}
                        size={scaleSize(45)}
                        color={
                          preparation.includes("3") ? "#ea9308" : "#ffea00"
                        }
                      />
                    </Text>
                    <Text style={{ fontSize: scaleSize(18) }}>Турка</Text>
                  </ListItem>
                  <ListItem
                    style={[
                      styles.listItem,
                      {
                        marginLeft: scaleSize(10),
                        marginRight: scaleSize(3),
                        borderBottomWidth: 0
                      }
                    ]}
                  >
                    <Text style={{ width: scaleSize(50) }}>
                      <KawaIcon
                        style={styles.typeIcon}
                        name={"pour-over"}
                        size={scaleSize(45)}
                        color={
                          preparation.includes("6") ? "#ea9308" : "#ffea00"
                        }
                      />
                    </Text>
                    <Text style={{ fontSize: scaleSize(18) }}>
                      Гейзерная кофеварка
                    </Text>
                  </ListItem>
                  <ListItem
                    style={[
                      styles.listItem,
                      {
                        marginLeft: scaleSize(8),
                        marginLeft: scaleSize(5),
                        borderBottomWidth: 0
                      }
                    ]}
                  >
                    <Text style={{ width: scaleSize(50) }}>
                      <KawaIcon
                        style={styles.typeIcon}
                        name={"coffee-maker"}
                        size={scaleSize(45)}
                        color={
                          preparation.includes("4") ? "#ea9308" : "#ffea00"
                        }
                      />
                    </Text>
                    <Text style={{ fontSize: scaleSize(18) }}>
                      Фильтр-кофеварка
                    </Text>
                  </ListItem>
                  <ListItem
                    style={[
                      styles.listItem,
                      {
                        marginLeft: scaleSize(10),
                        marginRight: scaleSize(3),
                        borderBottomWidth: 0
                      }
                    ]}
                  >
                    <Text style={{ width: scaleSize(50) }}>
                      <KawaIcon
                        style={styles.typeIcon}
                        name={"french-press"}
                        size={scaleSize(45)}
                        color={
                          preparation.includes("2") ? "#ea9308" : "#ffea00"
                        }
                      />
                    </Text>
                    <Text style={{ fontSize: scaleSize(18) }}>Френч-пресс</Text>
                  </ListItem>
                  <ListItem
                    style={[
                      styles.listItem,
                      {
                        marginRight: scaleSize(25),
                        borderBottomWidth: 0,
                        marginBottom: scaleSize(10)
                      }
                    ]}
                  >
                    <Text
                      style={{
                        width: scaleSize(50),
                        marginRight: scaleSize(10)
                      }}
                    >
                      <KawaIcon
                        style={styles.typeIcon}
                        name={"coffee-maker-electric"}
                        size={scaleSize(45)}
                        color={
                          preparation.includes("5") || preparation.includes("8")
                            ? "#ea9308"
                            : "#ffea00"
                        }
                      />
                    </Text>
                    <Text style={{ fontSize: scaleSize(18) }}>
                      {navigation.getParam("pid", 0) === "5"
                        ? "Капсульная"
                        : "Эспрессо"}{" "}
                      кофемашина
                    </Text>
                  </ListItem>
                </List>
              </View>
              <View style={styles.descView}>
                <Text style={styles.defaultFont}>
                  Цвета способов приготовления:
                </Text>
                <List>
                  <ListItem
                    style={[
                      styles.listItem,
                      {
                        paddingTop: scaleSize(25),
                        paddingLeft: scaleSize(5),
                        borderBottomWidth: 0
                      }
                    ]}
                  >
                    <Text
                      style={{
                        width: scaleSize(50),
                        marginRight: scaleSize(10)
                      }}
                    >
                      <KawaIcon
                        style={styles.typeIcon}
                        name={"cup"}
                        size={scaleSize(30)}
                        color="#ffea00"
                      />
                    </Text>
                    <Text
                      style={[styles.defaultFont, { fontSize: scaleSize(18) }]}
                    >
                      Желтый - нерекомендуемый
                    </Text>
                  </ListItem>
                  <ListItem
                    style={[
                      styles.listItem,
                      { paddingLeft: 5, borderBottomWidth: 0 }
                    ]}
                  >
                    <Text
                      style={{
                        width: scaleSize(50),
                        marginRight: scaleSize(10)
                      }}
                    >
                      <KawaIcon
                        style={styles.typeIcon}
                        name={"cup"}
                        size={scaleSize(30)}
                        color="#ea9308"
                      />
                    </Text>
                    <Text
                      style={[styles.defaultFont, { fontSize: scaleSize(18) }]}
                    >
                      Оранжевый - рекомендуемый
                    </Text>
                  </ListItem>
                </List>
              </View>
            </Content>
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
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
});
