import React, { Component } from "react";
import { connect } from "react-redux";
import {
  StyleSheet,
  View,
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
import { Container, Content, Text, Input } from "native-base";

import TextInputMask from "react-native-text-input-mask";
import KawaIcon from "./../KawaIcon";
import HeaderBar from "../common/HeaderBar";

import { getDeliveryCost } from "../../store/actions/commonActions";

import { scaleSize } from "../../helpers/scaleSize";

Input.defaultProps.selectionColor = "#ea9308";
TextInputMask.defaultProps.selectionColor = "#ea9308";

StatusBar.setBarStyle("light-content", true);
StatusBar.setBackgroundColor("rgba(0,0,0,0)");

const SCREEN_HEIGHT = Dimensions.get("window").height;
const MAIN_BG = "../../static/img/background.png";
class DeliveryScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      currentCity: null,
      city_name: "Выберите город",
      delivery: []
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

  componentWillReceiveProps(nextProps) {
    if (nextProps.delivery) {
      // console.log(nextProps.delivery);
      this.setState({ delivery: nextProps.delivery });
    }
  }

  componentWillUnmount() {
    BackHandler.removeEventListener("hardwareBackPress", this.handleBackPress);
  }

  handleBackPress = () => {
    this.props.navigation.navigate("ProductCard", {
      categoryId: this.props.navigation.getParam("categoryId", "0"),
      categoryName: this.props.navigation.getParam(
        "categoryName",
        "Кофе в зернах"
      )
    });
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
          this.setState(
            {
              city_name: value
            },
            () => this.props.getDeliveryCost(value)
          );
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
            height: scaleSize(80)
          }}
        />
      </View>
    );
  }

  render() {
    // console.error(this.state.delivery);
    if (this.state.loading) {
      return this.renderLoadingView();
    }
    return (
      <Container>
        <StatusBar
          barStyle="light-content"
          hidden={false}
          translucent={true}
          backgroundColor={"rgba(0,0,0,0)"}
        />
        <View style={{ flex: 1 }}>
          <Image
            source={require(MAIN_BG)}
            style={styles.background}
            // blurRadius={3}
          />
          <View style={styles.container}>
            <Content>
              <HeaderBar
                navigation={this.props.navigation}
                title="Доставка и оплата"
              />
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
                    onPress={() =>
                      this.props.navigation.navigate("SelectRegionScreen", {
                        linkName: "DeliveryScreen"
                      })
                    }
                    style={{
                      paddingLeft: scaleSize(15),
                      paddingRight: scaleSize(15),
                      width: "100%",
                      flexDirection: "row"
                    }}
                  >
                    <Text
                      onFocus={() =>
                        this.props.navigation.navigate("SelectRegionScreen", {
                          linkName: "DeliveryScreen"
                        })
                      }
                      style={{
                        paddingTop: 0,
                        paddingBottom: 0,
                        height: scaleSize(40),
                        fontSize: scaleSize(20),
                        color: "rgba(255, 255, 255, .7)",
                        width: "100%",
                        paddingLeft: 0,
                        marginBottom: scaleSize(25),

                        borderBottomColor: "#fff",
                        borderBottomWidth: 1
                      }}
                    >
                      {this.state.city_name}
                    </Text>
                    <KawaIcon
                      style={{
                        color: "#fff",
                        position: "absolute",
                        right: scaleSize(15),
                        top: scaleSize(10)
                      }}
                      name={"arrow-next"}
                      size={scaleSize(14)}
                    />
                  </TouchableOpacity>
                </View>
              </View>
              <View
                style={{
                  paddingLeft: scaleSize(15),
                  paddingRight: scaleSize(15),
                  marginBottom: scaleSize(35)
                }}
              >
                <Text
                  style={{
                    color: "#ffea00",
                    fontSize: scaleSize(16),
                    marginBottom: scaleSize(16)
                  }}
                >
                  Доставка
                </Text>
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    width: "100%",
                    marginBottom: scaleSize(10)
                  }}
                >
                  <Image
                    source={require("../../static/img/new-post.png")}
                    style={{
                      width: scaleSize(36),
                      height: scaleSize(36),
                      marginRight: scaleSize(10)
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
                      <Text style={styles.defaultFont}>
                        Новая Почта, отделение
                      </Text>
                      <Text style={styles.defaultFont}>
                        {this.state.delivery.length > 3
                          ? this.state.delivery.filter(item => {
                              if (
                                item.delivery === "np" &&
                                item.courier === 0
                              ) {
                                return item;
                              }
                            })[0].cost
                          : ""}{" "}
                        грн
                      </Text>
                    </View>
                    <View
                      style={{
                        flexDirection: "row",
                        justifyContent: "space-between"
                      }}
                    >
                      <Text style={styles.defaultFont}>
                        Новая Почта, курьер
                      </Text>
                      <Text style={styles.defaultFont}>
                        {this.state.delivery.length > 3
                          ? this.state.delivery.filter(item => {
                              if (item.delivery === "np" && item.courier == 1) {
                                return item;
                              }
                            })[0].cost
                          : ""}{" "}
                        грн
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
                      width: scaleSize(25),
                      height: scaleSize(36),
                      marginRight: scaleSize(17),
                      marginLeft: scaleSize(6)
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
                      <Text style={styles.defaultFont}>
                        Укрпочта, отделение
                      </Text>
                      <Text style={styles.defaultFont}>
                        {this.state.delivery.length > 3
                          ? this.state.delivery.filter(item => {
                              if (
                                item.delivery === "up" &&
                                item.courier === 0
                              ) {
                                return item;
                              }
                            })[0].cost
                          : ""}{" "}
                        грн
                      </Text>
                    </View>
                    <View
                      style={{
                        flexDirection: "row",
                        justifyContent: "space-between"
                      }}
                    >
                      <Text style={styles.defaultFont}>Укрпочта, курьер</Text>
                      <Text style={styles.defaultFont}>
                        {this.state.delivery.length > 3
                          ? this.state.delivery.filter(item => {
                              if (
                                item.delivery === "up" &&
                                item.courier === 1
                              ) {
                                return item;
                              }
                            })[0].cost
                          : ""}{" "}
                        грн
                      </Text>
                    </View>
                  </View>
                </View>
              </View>
              <View
                style={{
                  paddingLeft: scaleSize(15),
                  paddingRight: scaleSize(15)
                }}
              >
                <Text
                  style={{
                    color: "#ffea00",
                    fontSize: scaleSize(16),
                    marginBottom: scaleSize(16)
                  }}
                >
                  Оплата
                </Text>
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    width: "100%",
                    marginBottom: scaleSize(12)
                  }}
                >
                  <Text style={[styles.defaultFont, { flex: 1 }]}>
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
                        style={{
                          width: scaleSize(47),
                          height: scaleSize(15),
                          marginRight: scaleSize(24)
                        }}
                      />
                      <Image
                        source={require("../../static/img/mastercard.png")}
                        style={{ width: scaleSize(31), height: scaleSize(18) }}
                      />
                    </View>
                  </View>
                </View>
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    width: "100%",
                    marginBottom: scaleSize(10)
                  }}
                >
                  <Text style={[styles.defaultFont, { flex: 1 }]}>
                    Privat 24
                  </Text>
                  <View>
                    <Image
                      source={require("../../static/img/privat24.png")}
                      style={{ width: scaleSize(102), height: scaleSize(20) }}
                    />
                  </View>
                </View>
                {Platform.OS === "ios" ? (
                  <View
                    style={{
                      flexDirection: "row",
                      alignItems: "center",
                      width: "100%",
                      marginBottom: scaleSize(10)
                    }}
                  >
                    <Text style={[styles.defaultFont, { flex: 1 }]}>
                      Apple Pay
                    </Text>
                    <View>
                      <Image
                        source={require("../../static/img/apay.png")}
                        style={{ width: scaleSize(50), height: scaleSize(23) }}
                      />
                    </View>
                  </View>
                ) : (
                  <View
                    style={{
                      flexDirection: "row",
                      alignItems: "center",
                      width: "100%",
                      marginBottom: scaleSize(10)
                    }}
                  >
                    <Text style={[styles.defaultFont, { flex: 1 }]}>
                      Google Pay
                    </Text>
                    <View>
                      <Image
                        source={require("../../static/img/gpay.png")}
                        style={{ width: scaleSize(58), height: scaleSize(23) }}
                      />
                    </View>
                  </View>
                )}
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    width: "100%",
                    marginBottom: scaleSize(16)
                  }}
                >
                  <Text style={[styles.defaultFont, { flex: 1 }]}>
                    Masterpass
                  </Text>
                  <View>
                    <Image
                      source={require("../../static/img/masterpass.png")}
                      style={{ width: scaleSize(30), height: scaleSize(24) }}
                    />
                  </View>
                </View>
                <Text style={[styles.defaultFont, { flex: 1 }]}>
                  безналичная оплата для предприятий и организаций
                </Text>
              </View>
            </Content>
          </View>
        </View>
      </Container>
    );
  }
}

const styles = {
  defaultFont: { color: "#fff", fontSize: scaleSize(16) },
  background: {
    width: "100%",
    height: SCREEN_HEIGHT * 1.5,
    position: "absolute",
    top: 0,
    bottom: 0,
    left: 0,
    right: 0
  },
  container: {
    flex: 1,
    height: SCREEN_HEIGHT
  }
};

const mapStateToProps = state => ({
  delivery: state.common.delivery
});

const mapDispatchToProps = dispatch => ({
  getDeliveryCost: city => dispatch(getDeliveryCost(city))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DeliveryScreen);
