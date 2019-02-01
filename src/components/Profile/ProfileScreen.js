import React, { Component } from "react";
import {
  Container,
  Content,
  Text,
  Item,
  Icon,
  Button,
  Input
} from "native-base";
import {
  StyleSheet,
  View,
  ImageBackground,
  Image,
  ScrollView,
  StatusBar,
  TouchableOpacity,
  Dimensions,
  AsyncStorage,
  BackHandler
} from "react-native";
import { createStore } from "redux";
import { Provider } from "react-redux";
import reducers from "../../reducers/index";
import KawaIcon from "../KawaIcon";

const initialState = {};
const store = createStore(reducers, initialState);

const styles = StyleSheet.create({
  background: {
    width: "100%",
    height: Dimensions.get("window").height * 1.5,
    position: "absolute",
    top: 0,
    bottom: 0,
    left: 0,
    right: 0
  },
  cardDouble: {
    flex: 1,
    flexDirection: "row",
    color: "#fff",
    marginLeft: 10,
    marginRight: 5,
    marginTop: 2,
    shadowColor: "#fff",
    justifyContent: "center"
  },
  cardFull: {
    marginLeft: 5,
    marginRight: 5,
    marginTop: 5,
    paddingBottom: 10,
    paddingLeft: 20,
    color: "#000000",
    textAlign: "center",
    shadowColor: "#fff",
    backgroundColor: "rgba(255,255,255, 0.7)",
    alignItems: "flex-start",
    borderRadius: 5,
    justifyContent: "space-around",
    resizeMode: "contain"
  },
  cardFullFirst: {
    marginLeft: 5,
    marginRight: 5,
    marginTop: 20,
    paddingBottom: 10,
    paddingLeft: 20,
    color: "#000000",
    textAlign: "center",
    shadowColor: "#fff",
    backgroundColor: "rgba(255,255,255, 0.7)",
    alignItems: "flex-start",
    borderRadius: 5,
    justifyContent: "space-around",
    resizeMode: "contain"
  },
  cardFullLast: {
    marginLeft: 5,
    marginRight: 5,
    marginTop: 5,
    marginBottom: 40,
    paddingBottom: 10,
    paddingLeft: 20,
    color: "#000000",
    textAlign: "center",
    shadowColor: "#fff",
    backgroundColor: "rgba(255,255,255, 0.7)",
    alignItems: "flex-start",
    borderRadius: 5,
    justifyContent: "space-around",
    resizeMode: "contain"
  },
  cardItemHalf: {
    width: "50%",
    backgroundColor: "rgba(255,255,255, 0.2)",
    marginRight: 5,
    marginTop: 3,
    alignItems: "center",
    height: Dimensions.get("window").width * 0.5 - 10,
    borderRadius: 5,
    justifyContent: "flex-end",
    resizeMode: "contain",
    paddingBottom: "20%"
  },
  cardContent: {
    color: "#000000"
  },
  container: {
    flex: 1
  },
  head: {
    marginTop: 35,
    display: "flex",
    flex: 1,
    color: "#ffffff"
  },
  default: {
    color: "#fff"
  },
  alphabet: {
    color: "#fff",
    padding: 10,
    fontSize: 13,
    paddingRight: 25
  },
  search: {
    backgroundColor: "#fff",
    marginRight: 15,
    marginLeft: 15,
    height: 40,
    paddingLeft: 5,
    paddingRight: 10
  },
  searchIcon: {
    position: "absolute",
    right: 10,
    paddingLeft: 10,
    paddingRight: 10,
    paddingTop: 10,
    paddingBottom: 10
  },
  searchInput: {
    fontSize: 13
  },
  alphabetMenu: {
    flex: 1,
    flexDirection: "row",
    marginLeft: 10,
    marginTop: 10
  },
  iconMenu: {
    color: "#ffffff",
    fontSize: 16,
    fontWeight: "bold",
    paddingLeft: 10,
    paddingRight: 10
  }
});

StatusBar.setBarStyle("light-content", true);
StatusBar.setBackgroundColor("rgba(0,0,0,0)");
const MAIN_BG = "../../static/img/background.png";

export default class ProfileScreen extends Component {
  constructor(props) {
    super(props);

    this.state = {
      region_name: "Выберите город",
      city_name: "Не указан"
    };
  }

  componentWillUnmount() {
    BackHandler.removeEventListener("hardwareBackPress", this.handleBackPress);
  }

  handleBackPress = () => {
    this.props.navigation.pop();
    return true;
  };

  retrieveData = async name => {
    try {
      const value = await AsyncStorage.getItem(name);

      if (value) {
        if (name == "user_region_name") {
          this.setState({
            region_name: value
          });
        } else if (name == "user_city_name") {
          this.setState({
            city_name: value
          });
        }
      }
    } catch (error) {
      // Error retrieving data
    }
  };

  componentWillMount() {
    BackHandler.addEventListener("hardwareBackPress", this.handleBackPress);
    this.retrieveData("user_region_name");
    this.retrieveData("user_city_name");

    this.setState({
      loading: false
    });
  }

  render() {
    return (
      <Container style={styles.default}>
        <StatusBar barStyle="light-content" hidden={false} translucent={true} />
        <ScrollView>
          <Image source={require(MAIN_BG)} style={styles.background} />
          <View style={styles.container}>
            <Content>
              <View style={styles.head}>
                <Item style={{ borderBottomWidth: 0, color: "#fff" }}>
                  <Button
                    transparent
                    onPress={() => this.props.navigation.openDrawer()}
                  >
                    <KawaIcon style={styles.iconMenu} name="menu" />
                  </Button>
                  <Text
                    style={{
                      color: "#ffffff",
                      fontSize: 20,
                      fontWeight: "bold",
                      marginLeft: 10
                    }}
                  >
                    Личные данные
                  </Text>
                  <TouchableOpacity
                    style={styles.searchIcon}
                    onPress={() =>
                      this.props.navigation.navigate("ProfileEdit")
                    }
                  >
                    <Image source={require("../../static/img/write.png")} />
                  </TouchableOpacity>
                </Item>
              </View>
              <View style={styles.cardFullFirst}>
                <Text
                  style={{ fontSize: 13, paddingTop: 20, paddingBottom: 5 }}
                >
                  Имя, Фамилия
                </Text>
                <Text style={{ fontSize: 20 }}>Максим Ефимов</Text>
                <Text
                  style={{ fontSize: 13, paddingTop: 25, paddingBottom: 5 }}
                >
                  Эл. почта
                </Text>
                <Text
                  style={{ paddingBottom: 10, paddingTop: 5, fontSize: 20 }}
                >
                  efimoff@gmail.com
                </Text>
              </View>
              <View style={styles.cardFull}>
                <Text
                  style={{ fontSize: 13, paddingTop: 20, paddingBottom: 5 }}
                >
                  Телефон
                </Text>
                <Text style={{ paddingBottom: 10, fontSize: 20 }}>
                  +38 (099) 786 99 00
                </Text>
              </View>
              <View style={styles.cardFull}>
                <Text
                  style={{ fontSize: 13, paddingTop: 20, paddingBottom: 5 }}
                >
                  Город
                </Text>
                <Text style={{ paddingBottom: 10, fontSize: 20 }}>
                  {this.state.city_name}
                </Text>
                <Text
                  style={{ fontSize: 13, paddingBottom: 10, paddingTop: 5 }}
                >
                  {this.state.region_name}
                </Text>
              </View>
              <View style={styles.cardFull}>
                <Text
                  style={{ fontSize: 13, paddingTop: 20, paddingBottom: 5 }}
                >
                  Пол
                </Text>
                <Text style={{ paddingBottom: 10, fontSize: 20 }}>Мужской</Text>
              </View>
              <View style={styles.cardFullLast}>
                <Text
                  style={{ fontSize: 13, paddingTop: 20, paddingBottom: 5 }}
                >
                  Дата рождения
                </Text>
                <Text style={{ paddingBottom: 10, fontSize: 20 }}>
                  24.05.91
                </Text>
              </View>
            </Content>
          </View>
        </ScrollView>
      </Container>
    );
  }
}
