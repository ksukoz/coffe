import React, { Component } from "react";
import {
  Container,
  Content,
  Text,
  Item,
  Button,
  Form,
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
  BackHandler,
  ActivityIndicator,
  AsyncStorage,
  Platform
} from "react-native";
Input.defaultProps.selectionColor = "#ea9308";
TextInputMask.defaultProps.selectionColor = "#ea9308";

import RadioGroup, { Radio } from "react-native-radio-input";
import TextInputMask from "react-native-text-input-mask";
import DatePicker from "react-native-datepicker";
import KawaIcon from "./../KawaIcon";

const styles = StyleSheet.create({
  background: {
    width: "100%",
    height: Dimensions.get("window").height,
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
    paddingRight: 20,
    color: "#000000",
    textAlign: "center",
    shadowColor: "#fff",
    backgroundColor: "rgba(255,255,255, 0.7)",
    alignItems: "flex-start",
    borderRadius: 5,
    justifyContent: "space-around",
    resizeMode: "contain"
  },
  cardFullCity: {
    marginLeft: 5,
    marginRight: 5,
    marginTop: 5,
    paddingBottom: 10,
    paddingLeft: 0,
    paddingRight: 0,
    color: "#fff",
    textAlign: "center",
    shadowColor: "#fff",
    // backgroundColor: 'rgba(255,255,255, 0.7)',
    alignItems: "flex-start",
    borderRadius: 5,
    justifyContent: "space-around",
    resizeMode: "contain"
  },
  cardContent: {
    color: "#000000"
  },
  container: {
    flex: 1,
    height: Dimensions.get("window").height
  },
  head: {
    marginTop: 35,
    marginLeft: 5,
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
    fontSize: 22,
    fontWeight: "bold"
  },
  profileInput: {
    fontSize: 20,
    borderBottomColor: "#89a6aa",
    borderBottomWidth: 1,
    width: "100%",
    paddingLeft: 0
  },
  profileInputPhone: {
    fontSize: 20,
    borderBottomColor: "#89a6aa",
    borderBottomWidth: 1,
    width: "100%",
    paddingLeft: 0,
    paddingTop: 10,
    paddingBottom: 10
  },
  profileInputPhoneFocused: {
    fontSize: 20,
    borderBottomColor: "#ea9308",
    borderBottomWidth: 1,
    width: "100%",
    paddingLeft: 0,
    paddingTop: 10,
    paddingBottom: 10
  },
  profileInputFocused: {
    fontSize: 20,
    borderBottomColor: "#ea9308",
    borderBottomWidth: 1,
    width: "100%",
    paddingLeft: 0
  },
  birthdayInput: {
    borderBottomColor: "#89a6aa",
    borderBottomWidth: 1,
    width: "100%",
    paddingLeft: 0,
    paddingRight: 0,
    marginLeft: 0,
    marginRight: 0
  },
  profileInputCalendar: {
    fontSize: 20,
    borderBottomColor: "#89a6aa",
    borderBottomWidth: 1,
    width: "100%",
    paddingLeft: 0
  }
});

StatusBar.setBarStyle("light-content", true);
StatusBar.setBackgroundColor("rgba(0,0,0,0)");
const MAIN_BG = "../../static/img/background.png";

export default class ProfileEditScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      currentCity: null,
      region_name: "Выберите город",
      city_name: ""
    };
  }

  componentWillMount() {
    BackHandler.addEventListener("hardwareBackPress", this.handleBackPress);
    this.retrieveData("user_region_name");
    this.retrieveData("user_city_name");

    this.setState({
      loading: false
    });
  }

  componentWillUnmount() {
    BackHandler.removeEventListener("hardwareBackPress", this.handleBackPress);
  }

  handleBackPress = () => {
    this.props.navigation.navigate("Home");
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

  renderLoadingView() {
    return (
      <View
        style={{
          width: "100%",
          flex: 1
        }}
      >
        <ActivityIndicator
          color="#1c1c1c"
          size="small"
          style={{
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
            height: 80
          }}
        />
      </View>
    );
  }

  render() {
    if (this.state.loading) {
      return this.renderLoadingView();
    }
    return (
      <Container style={styles.default}>
        <StatusBar
          barStyle="light-content"
          backgroundColor={"transparent"}
          hidden={false}
          translucent={true}
        />
        <ScrollView>
          <Image
            source={require(MAIN_BG)}
            style={styles.background}
            // blurRadius={3}
          />
          <View style={styles.container}>
            <Content>
              {/* <Form> */}
              <View style={styles.head}>
                <Item style={{ borderBottomWidth: 0, color: "#fff" }}>
                  <Button
                    transparent
                    onPress={() => this.props.navigation.goBack(null)}
                  >
                    <KawaIcon
                      style={{
                        color: "#fff",
                        paddingLeft: 5,
                        paddingRight: 20
                      }}
                      name={"arrow-back2"}
                      size={22}
                    />
                  </Button>
                  <Text
                    style={{
                      color: "#ffffff",
                      fontSize: 22,
                      fontWeight: "bold"
                    }}
                  >
                    Доставка и оплата
                  </Text>
                </Item>
              </View>
              <View style={styles.cardFullCity}>
                <View
                  style={{
                    width: "100%",
                    paddingLeft: 0,
                    paddingRight: 0,
                    marginLeft: 0,
                    marginRight: 0
                  }}
                >
                  <TouchableOpacity
                    // onPress={() => this.props.navigation.navigate('SelectRegion')}
                    style={{ width: "100%", flexDirection: "row" }}
                  >
                    <Text
                      style={{
                        // paddingLeft: 5,
                        // paddingRight: 5,
                        width: "100%",
                        paddingTop: 5
                      }}
                    >
                      {this.state.city_name}
                    </Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    // onPress={() => this.props.navigation.navigate('SelectRegion')}
                    style={{
                      paddingLeft: 5,
                      paddingRight: 5,
                      width: "100%",
                      flexDirection: "row"
                    }}
                  >
                    <Text
                      // onFocus={() => this.props.navigation.navigate('SelectRegion')}
                      style={{
                        // paddingTop: 5,
                        // paddingBottom: 5,
                        paddingTop: 0,
                        paddingBottom: 0,
                        height: 40,
                        fontSize: 20,
                        color: "rgba(255, 255, 255, .7)",
                        width: "100%",
                        paddingLeft: 0,
                        marginBottom: 5,

                        borderBottomColor: "#fff",
                        borderBottomWidth: 1
                      }}
                    >
                      {this.state.region_name}
                    </Text>
                    <KawaIcon
                      style={{
                        color: "#fff",
                        position: "absolute",
                        right: 10,
                        top: 15
                      }}
                      name={"arrow-next"}
                      size={14}
                    />
                  </TouchableOpacity>
                </View>
              </View>
              <View
                style={{
                  paddingLeft: 10,
                  paddingRight: 10,
                  marginBottom: 20
                }}
              >
                <Text
                  style={{ color: "#ffea00", fontSize: 20, marginBottom: 10 }}
                >
                  Доставка
                </Text>
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    width: "100%",
                    marginBottom: 10
                  }}
                >
                  <Image
                    source={require("../../static/img/new-post.png")}
                    style={{ width: 35, height: 35, marginRight: 10 }}
                  />
                  <View
                    style={{
                      flex: 1
                    }}
                  >
                    <View
                      style={{
                        flexDirection: "row",
                        justifyContent: "space-between",
                        color: "#fff"
                      }}
                    >
                      <Text style={{ color: "#fff", fontSize: 18 }}>
                        Новая Почта, отделение
                      </Text>
                      <Text style={{ color: "#fff", fontSize: 18 }}>
                        50 грн
                      </Text>
                    </View>
                    <View
                      style={{
                        flexDirection: "row",
                        justifyContent: "space-between"
                      }}
                    >
                      <Text style={{ color: "#fff", fontSize: 18 }}>
                        Новая Почта, курьер
                      </Text>
                      <Text style={{ color: "#fff", fontSize: 18 }}>
                        70 грн
                      </Text>
                    </View>
                  </View>
                </View>
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                    alignItems: "center"
                  }}
                >
                  <Image
                    source={require("../../static/img/post.png")}
                    style={{
                      width: 26,
                      height: 37,
                      marginRight: 17,
                      marginLeft: 6
                    }}
                  />
                  <View
                    style={{
                      flex: 1
                    }}
                  >
                    <View
                      style={{
                        flexDirection: "row",
                        justifyContent: "space-between"
                      }}
                    >
                      <Text style={{ color: "#fff", fontSize: 18 }}>
                        Укрпочта, отделение
                      </Text>
                      <Text style={{ color: "#fff", fontSize: 18 }}>
                        30 грн
                      </Text>
                    </View>
                    <View
                      style={{
                        flexDirection: "row",
                        justifyContent: "space-between"
                      }}
                    >
                      <Text style={{ color: "#fff", fontSize: 18 }}>
                        Укрпочта, курьер
                      </Text>
                      <Text style={{ color: "#fff", fontSize: 18 }}>
                        50 грн
                      </Text>
                    </View>
                  </View>
                </View>
              </View>
              <View
                style={{
                  paddingLeft: 10,
                  paddingRight: 10
                }}
              >
                <Text
                  style={{ color: "#ffea00", fontSize: 20, marginBottom: 10 }}
                >
                  Оплата
                </Text>
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    width: "100%",
                    marginBottom: 10
                  }}
                >
                  <Text style={{ color: "#fff", fontSize: 18, flex: 1 }}>
                    VISA / MasterCard
                  </Text>
                  <View>
                    <View
                      style={{
                        flexDirection: "row",
                        alignItems: "center"
                      }}
                    >
                      <Image
                        source={require("../../static/img/visa.png")}
                        style={{ width: 58, height: 18, marginRight: 20 }}
                      />
                      <Image
                        source={require("../../static/img/mastercard.png")}
                        style={{ width: 37, height: 22 }}
                      />
                    </View>
                  </View>
                </View>
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    width: "100%",
                    marginBottom: 10
                  }}
                >
                  <Text style={{ color: "#fff", fontSize: 18, flex: 1 }}>
                    Privat 24
                  </Text>
                  <View>
                    <Image
                      source={require("../../static/img/privat24.png")}
                      style={{ width: 110, height: 21 }}
                    />
                  </View>
                </View>
                {Platform.OS === "ios" ? (
                  <View
                    style={{
                      flexDirection: "row",
                      alignItems: "center",
                      width: "100%",
                      marginBottom: 10
                    }}
                  >
                    <Text style={{ color: "#fff", fontSize: 18, flex: 1 }}>
                      Apple Pay
                    </Text>
                    <View>
                      <Image
                        source={require("../../static/img/apay.png")}
                        style={{ width: 50, height: 20 }}
                      />
                    </View>
                  </View>
                ) : (
                  <View
                    style={{
                      flexDirection: "row",
                      alignItems: "center",
                      width: "100%",
                      marginBottom: 10
                    }}
                  >
                    <Text style={{ color: "#fff", fontSize: 18, flex: 1 }}>
                      Google Pay
                    </Text>
                    <View>
                      <Image
                        source={require("../../static/img/gpay.png")}
                        style={{ width: 50, height: 20 }}
                      />
                    </View>
                  </View>
                )}
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    width: "100%",
                    marginBottom: 20
                  }}
                >
                  <Text style={{ color: "#fff", fontSize: 18, flex: 1 }}>
                    Masterpass
                  </Text>
                  <View>
                    <Image
                      source={require("../../static/img/masterpass.png")}
                      style={{ width: 32, height: 25 }}
                    />
                  </View>
                </View>
                <Text style={{ color: "#fff", fontSize: 18, flex: 1 }}>
                  безналичная оплата для предприятий и организаций
                </Text>
              </View>
              {/* </Form> */}
            </Content>
          </View>
        </ScrollView>
      </Container>
    );
  }
}
