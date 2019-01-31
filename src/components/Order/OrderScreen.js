import React, { Component } from "react";
import { connect } from "react-redux";
import { Container, Content, Input, CheckBox, Label } from "native-base";
import {
  View,
  StatusBar,
  Dimensions,
  TouchableOpacity,
  Image,
  Text,
  FlatList,
  ScrollView,
  BackHandler,
  AsyncStorage,
  Platform,
  StyleSheet,
  Linking,
  ActivityIndicator
} from "react-native";

import Modal from "react-native-modal";

import { getCart } from "../../store/actions/cartActions";
import { getUser, updateUser } from "../../store/actions/userActions";
import { getProductID } from "../../store/actions/catalogActions";

import TextTicker from "react-native-text-ticker";

import {
  searchFocused,
  getDeliveryCost
} from "../../store/actions/commonActions";

import { scaleSize } from "../../helpers/scaleSize";
import OrderItem from "./OrderItem";
import SearchBar from "../common/SearchBar";

import TextInputMask from "react-native-text-input-mask";

import KawaIcon from "../KawaIcon";

Input.defaultProps.selectionColor = "#ea9308";
TextInputMask.defaultProps.underlineColorAndroid = "rgba(0,0,0,0)";

StatusBar.setBarStyle("light-content", true);
StatusBar.setBackgroundColor("rgba(0,0,0,0)");
const MAIN_BG = "../../static/img/background.png";

const SCREEN_WIDTH = Dimensions.get("window").width;
const SCREEN_HEIGHT = Dimensions.get("window").height;

class OrderScreen extends Component {
  _didFocusSubscription;
  _willBlurSubscription;

  constructor(props) {
    super(props);
    this._didFocusSubscription = this.props.navigation.addListener(
      "didFocus",
      payload => {
        BackHandler.addEventListener("hardwareBackPress", this.handleBackPress);
      }
    );
    this.state = {
      search: "",
      focus: false,
      loading: true,
      city: "Город, область",
      email: "",
      firstname: "",
      lastname: "",
      phone: "",
      deliveryCompany: {},
      payment: "",
      product: null,
      department: "",
      modalVisible: false,
      modalVisible2: false,
      opacity: 0
    };
    this.viewabilityConfig = {
      waitForInteraction: true,
      viewAreaCoveragePercentThreshold: 30,
      viewAreaPercentThreshold: 30
    };
    Input.defaultProps.selectionColor = "#000";
  }

  componentDidUpdate(prevProps, prevState) {
    if (JSON.stringify(prevProps.cart) !== JSON.stringify(this.props.cart)) {
      this.setState({ loading: false, cart: this.props.cart });
    }
    if (prevProps.focus !== this.props.focus) {
      this.setState({ loading: false, focus: this.props.focus });
    }
  }

  componentDidMount() {
    console.error(TextTicker.defaultProps);
    this._willBlurSubscription = this.props.navigation.addListener(
      "willBlur",
      payload =>
        BackHandler.removeEventListener(
          "hardwareBackPress",
          this.handleBackPress
        )
    );

    this.props.navigation.addListener("didFocus", () => {
      this.setState({ loading: false });
      // this.retrieveData('user_region_name');
      this.retrieveData("user_city_name");
      this.retrieveData("department");
    });
    this.props.getCart();
    this.props.getUser();
  }

  componentWillUnmount() {}

  componentWillReceiveProps(nextProps) {
    if (nextProps.user) {
      this.setState({
        email: nextProps.user.email,
        firstname: nextProps.user.firstname,
        lastname: nextProps.user.lastname,
        phone: nextProps.user.phone
      });
    }
    if (nextProps.focus || !nextProps.focus) {
      this.setState({ focus: nextProps.focus });
    }
  }

  userModalHandler = type => {
    if (this.props.user[type] !== this.state[type]) {
      this.setState({ modalVisible2: true });
    }
  };

  retrieveData = async name => {
    try {
      const value = await AsyncStorage.getItem(name);

      if (value) {
        if (name == "user_city_name") {
          this.setState(
            {
              city: value
            },
            () => this.props.getDeliveryCost(value)
          );
        }
        if (name == "department") {
          if (this.state.deliveryCompany.courier == "0") {
            this.setState({
              department: value
            });
          }
        }
      }
    } catch (error) {}
  };

  handleBackPress = () => {
    this.props.navigation.pop();
    return true;
  };

  setModalVisible(visible) {
    this.setState({ ...this.state, modalVisible: visible, opacity: visible });
  }

  changeHandler = (value, name) => {
    this.setState({ [name]: value });
  };

  render() {
    const categories = [
      ...this.props.categories,
      ...this.props.subcategories,
      ...this.props.dishes
    ];
    let notFound;
    const { cart, user } = this.props;
    const { deliveryCompany, payment, product, department } = this.state;

    return (
      <Container style={styles.default}>
        <StatusBar
          barStyle="light-content"
          hidden={false}
          translucent={true}
          backgroundColor={`rgba(0,0,0,${
            this.state.focus
              ? 0.1
              : this.state.opacity || this.state.modalVisible2
              ? 0.7
              : 0
          })`}
        />
        <View style={{ flex: 1 }}>
          <ScrollView
            keyboardShouldPersistTaps={"handled"}
            style={{
              position: "absolute",
              top: 0,
              bottom: 0,
              width: "100%",
              backgroundColor: `rgba(0,0,0,${this.state.focus ? 0.7 : 0})`,
              zIndex: this.state.focus ? 10 : 0
            }}
          />
          <Image source={require(MAIN_BG)} style={styles.background} />
          <SearchBar
            placeholder={"Найти кофе"}
            style={{ marginBottom: scaleSize(20) }}
            navigation={this.props.navigation}
          />

          {this.state.loading ? (
            <ActivityIndicator
              style={{ marginTop: scaleSize(75) }}
              color="#89a6aa"
              size="large"
              animating
            />
          ) : (
            <Content style={{ marginTop: scaleSize(99) }}>
              <FlatList
                style={{
                  marginLeft: scaleSize(10),
                  marginRight: scaleSize(10),
                  marginBottom: scaleSize(20),
                  zIndex: 2
                }}
                keyExtractor={item => item.id}
                getItemLayout={(data, index) => ({
                  length: 100 - 1,
                  index
                })}
                initialNumToRender={6}
                removeClippedSubviews={true}
                maxToRenderPerBatch={4}
                windowSize={1}
                data={this.props.cart}
                extraData={this.props}
                renderItem={({ item }) => (
                  <OrderItem
                    cart={this.props.cart}
                    item={item}
                    categories={categories}
                    navigation={this.props.navigation}
                  />
                )}
                viewabilityConfig={this.viewabilityConfig}
              />

              <View
                style={{
                  marginLeft: scaleSize(10),
                  marginRight: scaleSize(10)
                }}
              >
                <Text
                  style={[
                    styles.default,
                    {
                      marginLeft: scaleSize(8),
                      marginBottom: scaleSize(8),
                      fontSize: scaleSize(14)
                    }
                  ]}
                >
                  Оформление заказа
                </Text>
                <View style={styles.block}>
                  <Label
                    style={{
                      color: "#302c23",
                      fontSize: scaleSize(12)
                    }}
                  >
                    Email
                  </Label>
                  <Input
                    style={styles.profileInput}
                    placeholder={"Электронная почта"}
                    value={this.state.email}
                    onChangeText={value => this.changeHandler(value, "email")}
                    onEndEditing={
                      () => {}
                      // user.email !== this.state.email
                      // 	? this.setState({ modalVisible2: true })
                      // 	: ''
                    }
                  />
                  <Label
                    style={{
                      color: "#302c23",
                      fontSize: scaleSize(12)
                    }}
                  >
                    Телефон
                  </Label>
                  <TextInputMask
                    ref="mask"
                    placeholder={"+38 (___) ___ __ __"}
                    placeholderTextColor="#000"
                    keyboardType="phone-pad"
                    mask={"+38 ([000]) [000] [00] [00]"}
                    // onBlur={() => this.onUnFocus('phone')}
                    // onFocus={() => this.onFocus('phone')}
                    style={styles.profileInputPhone}
                    value={this.state.phone}
                    onChangeText={value => this.changeHandler(value, "phone")}
                    onEndEditing={() => this.userModalHandler("firstname")}
                  />
                  <Label
                    style={{
                      color: "#302c23",
                      fontSize: scaleSize(12)
                    }}
                  >
                    Имя
                  </Label>
                  <Input
                    style={styles.profileInput}
                    placeholder={"Имя"}
                    value={this.state.firstname}
                    onChangeText={value =>
                      this.changeHandler(value, "firstname")
                    }
                    onEndEditing={() => this.userModalHandler("firstname")}
                  />
                  <Label
                    style={{
                      color: "#302c23",
                      fontSize: scaleSize(12)
                    }}
                  >
                    Фамилия
                  </Label>
                  <Input
                    style={styles.profileInput}
                    placeholder={"Фамилия"}
                    value={this.state.lastname}
                    onChangeText={value =>
                      this.changeHandler(value, "lastname")
                    }
                    onEndEditing={() => this.userModalHandler("lastname")}
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
                      <Text
                        style={{
                          color: "#302c23",
                          fontSize: scaleSize(12)
                        }}
                      >
                        Доставка
                      </Text>
                      <TouchableOpacity
                        onPress={() =>
                          this.props.navigation.navigate("SelectRegionScreen", {
                            linkName: "Order",
                            itemId: this.props.navigation.getParam("itemId")
                              ? this.props.navigation.getParam("itemId")
                              : ""
                          })
                        }
                        style={{
                          width: "100%",
                          flexDirection: "row"
                        }}
                      >
                        <Text
                          onFocus={() =>
                            this.props.navigation.navigate(
                              "SelectRegionScreen",
                              {
                                linkName: "Order",
                                itemId: this.props.navigation.getParam("itemId")
                                  ? this.props.navigation.getParam("itemId")
                                  : ""
                              }
                            )
                          }
                          style={{
                            paddingTop: 0,
                            paddingBottom: 0,
                            height: scaleSize(35),
                            fontSize: scaleSize(16),
                            color: "#302c23",
                            width: "100%",
                            paddingLeft: 0,
                            marginBottom: scaleSize(25),

                            borderBottomColor: "#89a6aa",
                            borderBottomWidth: 1
                          }}
                        >
                          {this.state.city}
                        </Text>
                        <KawaIcon
                          style={{
                            color: "#302c23",
                            position: "absolute",
                            right: scaleSize(0),
                            top: scaleSize(5)
                          }}
                          name={"arrow-next"}
                          size={scaleSize(14)}
                        />
                      </TouchableOpacity>
                    </View>
                  </View>
                  <View>
                    <View>
                      <TouchableOpacity
                        style={{
                          flexDirection: "row",
                          justifyContent: "space-between",
                          marginBottom: scaleSize(16)
                        }}
                        activeOpacity={0.9}
                        onPress={() =>
                          this.setState({
                            deliveryCompany:
                              deliveryCompany.delivery === "np" &&
                              deliveryCompany.courier === "0" &&
                              deliveryCompany.payment === 1
                                ? {}
                                : {
                                    delivery:
                                      deliveryCompany.delvery === "np"
                                        ? ""
                                        : "np",
                                    courier: "0",
                                    cost:
                                      this.props.delivery.length > 5
                                        ? this.props.delivery.filter(item => {
                                            if (
                                              item.delivery === "np" &&
                                              item.courier === "0"
                                            ) {
                                              return item;
                                            }
                                          })[0].cost
                                        : "",
                                    payment: 1
                                  }
                          })
                        }
                      >
                        <View style={{ flexDirection: "row" }}>
                          <CheckBox
                            checked={
                              deliveryCompany.delivery === "np" &&
                              deliveryCompany.courier === "0" &&
                              deliveryCompany.payment === 1
                                ? true
                                : false
                            }
                            style={{
                              left: 0,
                              marginRight: scaleSize(16),
                              borderColor: "#302c23",
                              backgroundColor:
                                deliveryCompany.delivery === "np" &&
                                deliveryCompany.courier === "0" &&
                                deliveryCompany.payment === 1
                                  ? "#302c23"
                                  : "transparent"
                            }}
                            onPress={() =>
                              this.setState({
                                deliveryCompany:
                                  deliveryCompany.delivery === "np" &&
                                  deliveryCompany.courier === "0" &&
                                  deliveryCompany.payment === 1
                                    ? {}
                                    : {
                                        delivery: "np",
                                        courier: "0",
                                        cost:
                                          this.props.delivery.length > 5
                                            ? this.props.delivery.filter(
                                                item => {
                                                  if (
                                                    item.delivery === "np" &&
                                                    item.courier === "0"
                                                  ) {
                                                    return item;
                                                  }
                                                }
                                              )[0].cost
                                            : "",
                                        payment: 1
                                      }
                              })
                            }
                          />
                          <Text style={styles.defaultText}>
                            Новая Почта, отделение
                          </Text>
                        </View>
                        {this.props.delivery.length < 6 &&
                        this.state.city !== "Город, область" ? (
                          <ActivityIndicator color="#89a6aa" size="small" />
                        ) : (
                          <Text style={styles.defaultText}>
                            {this.props.delivery.length > 5
                              ? this.props.delivery.filter(item => {
                                  if (
                                    item.delivery === "np" &&
                                    item.courier === "0"
                                  ) {
                                    return item;
                                  }
                                })[0].cost + " грн"
                              : ""}
                          </Text>
                        )}
                      </TouchableOpacity>
                      <TouchableOpacity
                        style={{
                          flexDirection: "row",
                          justifyContent: "space-between",
                          marginBottom: scaleSize(16)
                        }}
                        activeOpacity={0.9}
                        onPress={() =>
                          this.setState({
                            deliveryCompany:
                              deliveryCompany.delivery === "np" &&
                              deliveryCompany.courier === "0" &&
                              deliveryCompany.payment === 2
                                ? {}
                                : {
                                    delivery: "np",
                                    courier: "0",
                                    cost:
                                      this.props.delivery.length > 5
                                        ? this.props.delivery.filter(item => {
                                            if (
                                              item.delivery === "np" &&
                                              item.courier === "0"
                                            ) {
                                              return item;
                                            }
                                          })[0].cost
                                        : "",
                                    payment: 2
                                  }
                          })
                        }
                      >
                        <View style={{ flexDirection: "row" }}>
                          <CheckBox
                            checked={
                              deliveryCompany.delivery === "np" &&
                              deliveryCompany.courier === "0" &&
                              deliveryCompany.payment === 2
                                ? true
                                : false
                            }
                            style={{
                              left: 0,
                              marginRight: scaleSize(16),
                              borderColor: "#302c23",
                              backgroundColor:
                                deliveryCompany.delivery === "np" &&
                                deliveryCompany.courier === "0" &&
                                deliveryCompany.payment === 2
                                  ? "#302c23"
                                  : "transparent"
                            }}
                            onPress={() =>
                              this.setState({
                                deliveryCompany:
                                  deliveryCompany.delivery === "np" &&
                                  deliveryCompany.courier === "0" &&
                                  deliveryCompany.payment === 2
                                    ? {}
                                    : {
                                        delivery: "np",
                                        courier: "0",
                                        cost:
                                          this.props.delivery.length > 5
                                            ? this.props.delivery.filter(
                                                item => {
                                                  if (
                                                    item.delivery === "np" &&
                                                    item.courier === "0"
                                                  ) {
                                                    return item;
                                                  }
                                                }
                                              )[0].cost
                                            : "",
                                        payment: 2
                                      }
                              })
                            }
                          />
                          <Text style={styles.defaultText}>
                            Новая Почта, при получении
                          </Text>
                        </View>
                        {this.props.delivery.length < 6 &&
                        this.state.city !== "Город, область" ? (
                          <ActivityIndicator color="#89a6aa" size="small" />
                        ) : (
                          <Text style={styles.defaultText}>
                            {this.props.delivery.length > 5
                              ? this.props.delivery.filter(item => {
                                  if (
                                    item.delivery === "np" &&
                                    item.courier === "0"
                                  ) {
                                    return item;
                                  }
                                })[0].cost + " грн"
                              : ""}
                          </Text>
                        )}
                      </TouchableOpacity>
                      <TouchableOpacity
                        style={{
                          flexDirection: "row",
                          justifyContent: "space-between",
                          marginBottom: scaleSize(16)
                        }}
                        activeOpacity={0.9}
                        onPress={() =>
                          this.setState({
                            deliveryCompany:
                              deliveryCompany.delivery === "np" &&
                              deliveryCompany.courier === 1
                                ? {}
                                : {
                                    delivery: "np",
                                    courier: 1,
                                    cost:
                                      this.props.delivery.length > 5
                                        ? this.props.delivery.filter(item => {
                                            if (
                                              item.delivery === "np" &&
                                              item.courier === 1
                                            ) {
                                              return item;
                                            }
                                          })[0].cost
                                        : ""
                                  }
                          })
                        }
                      >
                        <View style={{ flexDirection: "row" }}>
                          <CheckBox
                            checked={
                              deliveryCompany.delivery === "np" &&
                              deliveryCompany.courier === 1
                                ? true
                                : false
                            }
                            style={{
                              left: 0,
                              marginRight: scaleSize(16),
                              borderColor: "#302c23",
                              backgroundColor:
                                deliveryCompany.delivery === "np" &&
                                deliveryCompany.courier === 1
                                  ? "#302c23"
                                  : "transparent"
                            }}
                            onPress={() =>
                              this.setState({
                                deliveryCompany:
                                  deliveryCompany.delivery === "np" &&
                                  deliveryCompany.courier === 1
                                    ? {}
                                    : {
                                        delivery: "np",
                                        courier: 1,
                                        cost:
                                          this.props.delivery.length > 5
                                            ? this.props.delivery.filter(
                                                item => {
                                                  if (
                                                    item.delivery === "np" &&
                                                    item.courier === 1
                                                  ) {
                                                    return item;
                                                  }
                                                }
                                              )[0].cost
                                            : ""
                                      }
                              })
                            }
                          />
                          <Text style={styles.defaultText}>
                            Новая Почта, курьер
                          </Text>
                        </View>
                        {this.props.delivery.length < 6 &&
                        this.state.city !== "Город, область" ? (
                          <ActivityIndicator color="#89a6aa" size="small" />
                        ) : (
                          <Text style={styles.defaultText}>
                            {this.props.delivery.length > 5
                              ? this.props.delivery.filter(item => {
                                  if (
                                    item.delivery === "np" &&
                                    item.courier == 1
                                  ) {
                                    return item;
                                  }
                                })[0].cost + " грн"
                              : ""}
                          </Text>
                        )}
                      </TouchableOpacity>
                      <TouchableOpacity
                        style={{
                          flexDirection: "row",
                          justifyContent: "space-between",
                          marginBottom: scaleSize(16)
                        }}
                        activeOpacity={0.9}
                        onPress={() =>
                          this.setState({
                            deliveryCompany:
                              deliveryCompany.delivery === "up" &&
                              deliveryCompany.courier === "0" &&
                              deliveryCompany.payment === 1
                                ? {}
                                : {
                                    delivery: "up",
                                    courier: "0",
                                    payment: 1,
                                    cost:
                                      this.props.delivery.length > 5
                                        ? this.props.delivery.filter(item => {
                                            if (
                                              item.delivery === "up" &&
                                              item.courier === "0"
                                            ) {
                                              return item;
                                            }
                                          })[0].cost
                                        : ""
                                  }
                          })
                        }
                      >
                        <View style={{ flexDirection: "row" }}>
                          <CheckBox
                            checked={
                              deliveryCompany.delivery === "up" &&
                              deliveryCompany.courier === "0" &&
                              deliveryCompany.payment === 1
                                ? true
                                : false
                            }
                            style={{
                              left: 0,
                              marginRight: scaleSize(16),
                              borderColor: "#302c23",
                              backgroundColor:
                                deliveryCompany.delivery === "up" &&
                                deliveryCompany.courier === "0" &&
                                deliveryCompany.payment === 1
                                  ? "#302c23"
                                  : "transparent"
                            }}
                            onPress={() =>
                              this.setState({
                                deliveryCompany:
                                  deliveryCompany.delivery === "up" &&
                                  deliveryCompany.courier === "0" &&
                                  deliveryCompany.payment === 1
                                    ? {}
                                    : {
                                        delivery: "up",
                                        courier: "0",
                                        payment: 1,
                                        cost:
                                          this.props.delivery.length > 5
                                            ? this.props.delivery.filter(
                                                item => {
                                                  if (
                                                    item.delivery === "up" &&
                                                    item.courier === "0"
                                                  ) {
                                                    return item;
                                                  }
                                                }
                                              )[0].cost
                                            : ""
                                      }
                              })
                            }
                          />
                          <Text style={styles.defaultText}>
                            Укрпочта Стандарт
                          </Text>
                        </View>
                        {this.props.delivery.length < 6 &&
                        this.state.city !== "Город, область" ? (
                          <ActivityIndicator color="#89a6aa" size="small" />
                        ) : (
                          <Text style={styles.defaultText}>
                            {this.props.delivery.length > 5
                              ? this.props.delivery.filter(item => {
                                  if (
                                    item.delivery === "up" &&
                                    item.courier === "0"
                                  ) {
                                    return item;
                                  }
                                })[0].cost + " грн"
                              : ""}
                          </Text>
                        )}
                      </TouchableOpacity>
                      <TouchableOpacity
                        style={{
                          flexDirection: "row",
                          justifyContent: "space-between",
                          marginBottom: scaleSize(16)
                        }}
                        activeOpacity={0.9}
                        onPress={() => {
                          this.setState({
                            deliveryCompany:
                              deliveryCompany.delivery === "up" &&
                              deliveryCompany.courier === "0" &&
                              deliveryCompany.payment === 2
                                ? {}
                                : {
                                    delivery: "up",
                                    courier: "0",
                                    payment: 2,
                                    cost:
                                      this.props.delivery.length > 5
                                        ? this.props.delivery.filter(item => {
                                            if (
                                              item.delivery === "up" &&
                                              item.courier === "0"
                                            ) {
                                              return item;
                                            }
                                          })[0].cost
                                        : ""
                                  }
                          });
                          this.refs.upStand.startAnimation(10);
                        }}
                      >
                        <View style={{ flexDirection: "row", width: "80%" }}>
                          <CheckBox
                            checked={
                              deliveryCompany.delivery === "up" &&
                              deliveryCompany.courier === "0" &&
                              deliveryCompany.payment === 2
                                ? true
                                : false
                            }
                            style={{
                              left: 0,
                              marginRight: scaleSize(16),
                              borderColor: "#302c23",
                              backgroundColor:
                                deliveryCompany.delivery === "up" &&
                                deliveryCompany.courier === "0" &&
                                deliveryCompany.payment === 2
                                  ? "#302c23"
                                  : "transparent"
                            }}
                            onPress={() => {
                              {
                                this.setState({
                                  deliveryCompany:
                                    deliveryCompany.delivery === "up" &&
                                    deliveryCompany.courier === "0" &&
                                    deliveryCompany.payment === 2
                                      ? {}
                                      : {
                                          delivery: "up",
                                          courier: "0",
                                          payment: 2,
                                          cost:
                                            this.props.delivery.length > 5
                                              ? this.props.delivery.filter(
                                                  item => {
                                                    if (
                                                      item.delivery === "up" &&
                                                      item.courier === "0"
                                                    ) {
                                                      return item;
                                                    }
                                                  }
                                                )[0].cost
                                              : ""
                                        }
                                });
                                this.refs.upStand.startAnimation(10);
                              }
                            }}
                          />
                          <View
                            style={{
                              width: "80%",
                              justifyContent: "center",
                              alignItems: "center"
                            }}
                          >
                            <TextTicker
                              style={[styles.defaultText, { zIndex: 1 }]}
                              loop={false}
                              marqueeOnMount={true}
                              scroll={false}
                              ref="upStand"
                            >
                              Укрпочта Стандарт, при получении
                            </TextTicker>
                          </View>
                        </View>
                        {this.props.delivery.length < 6 &&
                        this.state.city !== "Город, область" ? (
                          <ActivityIndicator color="#89a6aa" size="small" />
                        ) : (
                          <Text
                            style={[
                              styles.defaultText,
                              { zIndex: 10, alignSelf: "flex-start" }
                            ]}
                          >
                            {this.props.delivery.length > 5
                              ? this.props.delivery.filter(item => {
                                  if (
                                    item.delivery === "up" &&
                                    item.courier === "0"
                                  ) {
                                    return item;
                                  }
                                })[0].cost + " грн"
                              : ""}
                          </Text>
                        )}
                      </TouchableOpacity>
                      <TouchableOpacity
                        style={{
                          flexDirection: "row",
                          justifyContent: "space-between",
                          marginBottom: scaleSize(16)
                        }}
                        activeOpacity={0.9}
                        onPress={() =>
                          this.setState({
                            deliveryCompany:
                              deliveryCompany.delivery === "es" &&
                              deliveryCompany.courier === "0" &&
                              deliveryCompany.payment === 1
                                ? {}
                                : {
                                    delivery: "es",
                                    courier: "0",
                                    payment: 1,
                                    cost:
                                      this.props.delivery.length > 5
                                        ? this.props.delivery.filter(item => {
                                            if (
                                              item.delivery === "es" &&
                                              item.courier === "0"
                                            ) {
                                              return item;
                                            }
                                          })[0].cost
                                        : ""
                                  }
                          })
                        }
                      >
                        <View style={{ flexDirection: "row" }}>
                          <CheckBox
                            checked={
                              deliveryCompany.delivery === "es" &&
                              deliveryCompany.courier === "0" &&
                              deliveryCompany.payment === 1
                                ? true
                                : false
                            }
                            style={{
                              left: 0,
                              marginRight: scaleSize(16),
                              borderColor: "#302c23",
                              backgroundColor:
                                deliveryCompany.delivery === "es" &&
                                deliveryCompany.courier === "0" &&
                                deliveryCompany.payment === 1
                                  ? "#302c23"
                                  : "transparent"
                            }}
                            onPress={() =>
                              this.setState({
                                deliveryCompany:
                                  deliveryCompany.delivery === "es" &&
                                  deliveryCompany.courier === "0" &&
                                  deliveryCompany.payment === 1
                                    ? {}
                                    : {
                                        delivery: "es",
                                        courier: "0",
                                        payment: 1,
                                        cost:
                                          this.props.delivery.length > 5
                                            ? this.props.delivery.filter(
                                                item => {
                                                  if (
                                                    item.delivery === "es" &&
                                                    item.courier === "0"
                                                  ) {
                                                    return item;
                                                  }
                                                }
                                              )[0].cost
                                            : ""
                                      }
                              })
                            }
                          />
                          <Text style={styles.defaultText}>
                            Укрпочта Экспресс
                          </Text>
                        </View>
                        {this.props.delivery.length < 6 &&
                        this.state.city !== "Город, область" ? (
                          <ActivityIndicator color="#89a6aa" size="small" />
                        ) : (
                          <Text style={styles.defaultText}>
                            {this.props.delivery.length > 5
                              ? this.props.delivery.filter(item => {
                                  if (
                                    item.delivery === "es" &&
                                    item.courier === "0"
                                  ) {
                                    return item;
                                  }
                                })[0].cost + " грн"
                              : ""}
                          </Text>
                        )}
                      </TouchableOpacity>
                      <TouchableOpacity
                        style={{
                          flexDirection: "row",
                          justifyContent: "space-between",
                          marginBottom: scaleSize(16)
                        }}
                        activeOpacity={0.9}
                        onPress={() => {
                          this.setState({
                            deliveryCompany:
                              deliveryCompany.delivery === "es" &&
                              deliveryCompany.courier === "0" &&
                              deliveryCompany.payment === 2
                                ? {}
                                : {
                                    delivery: "es",
                                    courier: "0",
                                    payment: 2,
                                    cost:
                                      this.props.delivery.length > 5
                                        ? this.props.delivery.filter(item => {
                                            if (
                                              item.delivery === "es" &&
                                              item.courier === "0"
                                            ) {
                                              return item;
                                            }
                                          })[0].cost
                                        : ""
                                  }
                          });
                          this.refs.upEksp.startAnimation(10);
                        }}
                      >
                        <View style={{ flexDirection: "row", width: "80%" }}>
                          <CheckBox
                            checked={
                              deliveryCompany.delivery === "es" &&
                              deliveryCompany.courier === "0" &&
                              deliveryCompany.payment === 2
                                ? true
                                : false
                            }
                            style={{
                              left: 0,
                              marginRight: scaleSize(16),
                              borderColor: "#302c23",
                              backgroundColor:
                                deliveryCompany.delivery === "es" &&
                                deliveryCompany.courier === "0" &&
                                deliveryCompany.payment === 2
                                  ? "#302c23"
                                  : "transparent"
                            }}
                            onPress={() => {
                              this.setState({
                                deliveryCompany:
                                  deliveryCompany.delivery === "es" &&
                                  deliveryCompany.courier === "0" &&
                                  deliveryCompany.payment === 2
                                    ? {}
                                    : {
                                        delivery: "es",
                                        courier: "0",
                                        payment: 2,
                                        cost:
                                          this.props.delivery.length > 5
                                            ? this.props.delivery.filter(
                                                item => {
                                                  if (
                                                    item.delivery === "es" &&
                                                    item.courier === "0"
                                                  ) {
                                                    return item;
                                                  }
                                                }
                                              )[0].cost
                                            : ""
                                      }
                              });
                              this.refs.upEksp.startAnimation(10);
                            }}
                          />
                          <View
                            style={{
                              width: "80%",
                              justifyContent: "center",
                              alignItems: "center"
                            }}
                          >
                            <TextTicker
                              style={[styles.defaultText, { zIndex: 1 }]}
                              loop={true}
                              marqueeOnMount={true}
                              scroll={false}
                              // onMarqueeComplete={() =>
                              //   console.error("Scroll Completed!")
                              // }
                              ref="upEksp"
                            >
                              Укрпочта Экспресс, при получении
                            </TextTicker>
                          </View>
                        </View>
                        {this.props.delivery.length < 6 &&
                        this.state.city !== "Город, область" ? (
                          <ActivityIndicator color="#89a6aa" size="small" />
                        ) : (
                          <Text style={styles.defaultText}>
                            {this.props.delivery.length > 5
                              ? this.props.delivery.filter(item => {
                                  if (
                                    item.delivery === "es" &&
                                    item.courier === "0"
                                  ) {
                                    return item;
                                  }
                                })[0].cost + " грн"
                              : ""}
                          </Text>
                        )}
                      </TouchableOpacity>
                      <TouchableOpacity
                        style={{
                          flexDirection: "row",
                          justifyContent: "space-between",
                          marginBottom: scaleSize(16)
                        }}
                        activeOpacity={0.9}
                        onPress={() =>
                          this.setState({
                            deliveryCompany:
                              deliveryCompany.delivery === "up" &&
                              deliveryCompany.courier === 1
                                ? {}
                                : {
                                    delivery: "up",
                                    courier: 1,
                                    cost:
                                      this.props.delivery.length > 5
                                        ? this.props.delivery.filter(item => {
                                            if (
                                              item.delivery === "up" &&
                                              item.courier === 1
                                            ) {
                                              return item;
                                            }
                                          })[0].cost
                                        : ""
                                  }
                          })
                        }
                      >
                        <View style={{ flexDirection: "row" }}>
                          <CheckBox
                            checked={
                              deliveryCompany.delivery === "up" &&
                              deliveryCompany.courier === 1
                                ? true
                                : false
                            }
                            style={{
                              left: 0,
                              marginRight: scaleSize(16),
                              borderColor: "#302c23",
                              backgroundColor:
                                deliveryCompany.delivery === "up" &&
                                deliveryCompany.courier === 1
                                  ? "#302c23"
                                  : "transparent"
                            }}
                            onPress={() =>
                              this.setState({
                                deliveryCompany:
                                  deliveryCompany.delivery === "up" &&
                                  deliveryCompany.courier === 1
                                    ? {}
                                    : {
                                        delivery: "up",
                                        courier: 1,
                                        cost:
                                          this.props.delivery.length > 5
                                            ? this.props.delivery.filter(
                                                item => {
                                                  if (
                                                    item.delivery === "up" &&
                                                    item.courier === 1
                                                  ) {
                                                    return item;
                                                  }
                                                }
                                              )[0].cost
                                            : ""
                                      }
                              })
                            }
                          />
                          <Text style={styles.defaultText}>
                            Укрпочта Стандарт, курьер
                          </Text>
                        </View>
                        {this.state.city !== "Город, область" &&
                        this.props.delivery.length < 6 ? (
                          <ActivityIndicator color="#89a6aa" size="small" />
                        ) : (
                          <Text style={styles.defaultText}>
                            {this.props.delivery.length > 5
                              ? this.props.delivery.filter(item => {
                                  if (
                                    item.delivery === "up" &&
                                    item.courier === 1
                                  ) {
                                    return item;
                                  }
                                })[0].cost + " грн"
                              : ""}
                          </Text>
                        )}
                      </TouchableOpacity>
                      <TouchableOpacity
                        style={{
                          flexDirection: "row",
                          justifyContent: "space-between",
                          marginBottom: scaleSize(16)
                        }}
                        activeOpacity={0.9}
                        onPress={() =>
                          this.setState({
                            deliveryCompany:
                              deliveryCompany.delivery === "es" &&
                              deliveryCompany.courier === 1
                                ? {}
                                : {
                                    delivery: "es",
                                    courier: 1,
                                    cost:
                                      this.props.delivery.length > 5
                                        ? this.props.delivery.filter(item => {
                                            if (
                                              item.delivery === "es" &&
                                              item.courier === 1
                                            ) {
                                              return item;
                                            }
                                          })[0].cost
                                        : ""
                                  }
                          })
                        }
                      >
                        <View style={{ flexDirection: "row" }}>
                          <CheckBox
                            checked={
                              deliveryCompany.delivery === "es" &&
                              deliveryCompany.courier === 1
                                ? true
                                : false
                            }
                            style={{
                              left: 0,
                              marginRight: scaleSize(16),
                              borderColor: "#302c23",
                              backgroundColor:
                                deliveryCompany.delivery === "es" &&
                                deliveryCompany.courier === 1
                                  ? "#302c23"
                                  : "transparent"
                            }}
                            onPress={() =>
                              this.setState({
                                deliveryCompany:
                                  deliveryCompany.delivery === "es" &&
                                  deliveryCompany.courier === 1
                                    ? {}
                                    : {
                                        delivery: "es",
                                        courier: 1,
                                        cost:
                                          this.props.delivery.length > 5
                                            ? this.props.delivery.filter(
                                                item => {
                                                  if (
                                                    item.delivery === "es" &&
                                                    item.courier === 1
                                                  ) {
                                                    return item;
                                                  }
                                                }
                                              )[0].cost
                                            : ""
                                      }
                              })
                            }
                          />
                          <Text style={styles.defaultText}>
                            Укрпочта Экспресс, курьер
                          </Text>
                        </View>
                        {this.props.delivery.length < 6 &&
                        this.state.city !== "Город, область" ? (
                          <ActivityIndicator color="#89a6aa" size="small" />
                        ) : (
                          <Text style={styles.defaultText}>
                            {this.props.delivery.length > 5
                              ? this.props.delivery.filter(item => {
                                  if (
                                    item.delivery === "es" &&
                                    item.courier === 1
                                  ) {
                                    return item;
                                  }
                                })[0].cost + " грн"
                              : ""}
                          </Text>
                        )}
                      </TouchableOpacity>
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
                          onPress={() => {
                            if (deliveryCompany.courier === "0") {
                              this.props.navigation.navigate("Department", {
                                city: this.state.city,
                                post:
                                  deliveryCompany.delivery === "np"
                                    ? "np"
                                    : "up",
                                linkName: "Order"
                              });
                            }
                          }}
                          style={{
                            width: "100%",
                            flexDirection: "row"
                          }}
                        >
                          <Text
                            style={{
                              paddingTop: 0,
                              paddingBottom: 0,
                              height: scaleSize(35),
                              fontSize: scaleSize(16),
                              color: "#302c23",
                              width: "100%",
                              paddingLeft: 0,
                              marginBottom: scaleSize(25),

                              borderBottomColor: "#89a6aa",
                              borderBottomWidth: 1
                            }}
                          >
                            {department && deliveryCompany.courier === "0"
                              ? department
                              : deliveryCompany.courier === 1
                              ? "Адрес доставки"
                              : "Номер отделения, адрес"}
                          </Text>
                          <KawaIcon
                            style={{
                              color: "#302c23",
                              position: "absolute",
                              right: scaleSize(0),
                              top: scaleSize(5)
                            }}
                            name={"arrow-next"}
                            size={scaleSize(14)}
                          />
                        </TouchableOpacity>
                      </View>
                    </View>
                  </View>
                  <View>
                    <Text
                      style={{
                        color: "#302c23",
                        fontSize: scaleSize(12),
                        marginBottom: scaleSize(16)
                      }}
                    >
                      Оплата
                    </Text>
                    <View>
                      <TouchableOpacity
                        style={{
                          flexDirection: "row",
                          justifyContent: "space-between",
                          marginBottom: scaleSize(16)
                        }}
                        activeOpacity={0.9}
                        onPress={() =>
                          this.setState({
                            payment:
                              payment === "VISA, Mastercard"
                                ? ""
                                : "VISA, Mastercard"
                          })
                        }
                      >
                        <View style={{ flexDirection: "row" }}>
                          <CheckBox
                            checked={
                              payment === "VISA, Mastercard" ? true : false
                            }
                            style={{
                              left: 0,
                              marginRight: scaleSize(16),
                              borderColor: "#302c23",
                              backgroundColor:
                                payment === "VISA, Mastercard"
                                  ? "#302c23"
                                  : "transparent"
                            }}
                            onPress={() =>
                              this.setState({
                                payment:
                                  payment === "VISA, Mastercard"
                                    ? ""
                                    : "VISA, Mastercard"
                              })
                            }
                          />
                          <Text style={styles.defaultText}>
                            VISA, MasterCard
                          </Text>
                        </View>
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
                            style={{
                              width: scaleSize(31),
                              height: scaleSize(18)
                            }}
                          />
                        </View>
                      </TouchableOpacity>
                      <TouchableOpacity
                        style={{
                          flexDirection: "row",
                          justifyContent: "space-between",
                          marginBottom: scaleSize(16)
                        }}
                        activeOpacity={0.9}
                        onPress={() =>
                          this.setState({
                            payment: payment === "Privat 24" ? "" : "Privat 24"
                          })
                        }
                      >
                        <View style={{ flexDirection: "row" }}>
                          <CheckBox
                            checked={payment === "Privat 24" ? true : false}
                            style={{
                              left: 0,
                              marginRight: scaleSize(16),
                              borderColor: "#302c23",
                              backgroundColor:
                                payment === "Privat 24"
                                  ? "#302c23"
                                  : "transparent"
                            }}
                            onPress={() =>
                              this.setState({
                                payment:
                                  payment === "Privat 24" ? "" : "Privat 24"
                              })
                            }
                          />
                          <Text style={styles.defaultText}>
                            LiqPay, Privat 24
                          </Text>
                        </View>
                        <View
                          style={{
                            flexDirection: "row",
                            alignItems: "center"
                          }}
                        >
                          <Image
                            source={require("../../static/img/liqpay.png")}
                            style={{
                              width: scaleSize(15),
                              height: scaleSize(16),
                              marginRight: scaleSize(16)
                            }}
                            resizeMode="contain"
                          />
                          <Image
                            source={require("../../static/img/privat24.png")}
                            style={{
                              width: scaleSize(102),
                              height: scaleSize(20)
                            }}
                            resizeMode="contain"
                          />
                        </View>
                      </TouchableOpacity>
                      <TouchableOpacity
                        style={{
                          flexDirection: "row",
                          justifyContent: "space-between",
                          marginBottom: scaleSize(16)
                        }}
                        activeOpacity={0.9}
                        onPress={() =>
                          this.setState({
                            payment:
                              payment === "Apple Pay" ||
                              payment === "Google Pay"
                                ? ""
                                : Platform.OS === "ios"
                                ? "Apple Pay"
                                : "Google Pay"
                          })
                        }
                      >
                        <View style={{ flexDirection: "row" }}>
                          <CheckBox
                            checked={
                              payment === "Apple Pay" ||
                              payment === "Google Pay"
                                ? true
                                : false
                            }
                            style={{
                              left: 0,
                              marginRight: scaleSize(16),
                              borderColor: "#302c23",
                              backgroundColor:
                                payment === "Apple Pay" ||
                                payment === "Google Pay"
                                  ? "#302c23"
                                  : "transparent"
                            }}
                            onPress={() =>
                              this.setState({
                                payment:
                                  payment === "Apple Pay" ||
                                  payment === "Google Pay"
                                    ? ""
                                    : Platform.OS === "ios"
                                    ? "Apple Pay"
                                    : "Google Pay"
                              })
                            }
                          />
                          <Text style={styles.defaultText}>
                            {Platform.OS === "ios" ? "Apple Pay" : "Google Pay"}
                          </Text>
                        </View>
                        {Platform.OS === "ios" ? (
                          <Image
                            source={require("../../static/img/apay.png")}
                            style={{
                              alignSelf: "flex-end",
                              width: scaleSize(50),
                              height: scaleSize(23)
                            }}
                            resizeMode="contain"
                          />
                        ) : (
                          <Image
                            source={require("../../static/img/gpay.png")}
                            style={{
                              alignSelf: "flex-end",
                              width: scaleSize(58),
                              height: scaleSize(23)
                            }}
                            resizeMode="contain"
                          />
                        )}
                      </TouchableOpacity>
                      <TouchableOpacity
                        style={{
                          flexDirection: "row",
                          justifyContent: "space-between",
                          marginBottom: scaleSize(16)
                        }}
                        activeOpacity={0.9}
                        onPress={() =>
                          this.setState({
                            payment:
                              payment === "Masterpass" ? "" : "Masterpass"
                          })
                        }
                      >
                        <View style={{ flexDirection: "row" }}>
                          <CheckBox
                            checked={payment === "Masterpass" ? true : false}
                            style={{
                              left: 0,
                              marginRight: scaleSize(16),
                              borderColor: "#302c23",
                              backgroundColor:
                                payment === "Masterpass"
                                  ? "#302c23"
                                  : "transparent"
                            }}
                            onPress={() =>
                              this.setState({
                                payment:
                                  payment === "Masterpass" ? "" : "Masterpass"
                              })
                            }
                          />
                          <Text style={styles.defaultText}>
                            VISA Checkout, Masterpass
                          </Text>
                        </View>
                        <View
                          style={{
                            flexDirection: "row",
                            alignItems: "center"
                          }}
                        >
                          <Image
                            source={require("../../static/img/visa-checkout.png")}
                            style={{
                              width: scaleSize(40),
                              height: scaleSize(20),
                              marginRight: scaleSize(5)
                            }}
                            resizeMode="contain"
                          />
                          <Image
                            source={require("../../static/img/masterpass2.png")}
                            style={{
                              width: scaleSize(27),
                              height: scaleSize(20)
                            }}
                            resizeMode="contain"
                          />
                        </View>
                      </TouchableOpacity>
                      <TouchableOpacity
                        style={{
                          flexDirection: "row",
                          justifyContent: "space-between",
                          marginBottom: scaleSize(16)
                        }}
                        activeOpacity={0.9}
                        onPress={() =>
                          this.setState({
                            payment:
                              payment === "Безналичная оплата, счет на Email"
                                ? ""
                                : "Безналичная оплата, счет на Email"
                          })
                        }
                      >
                        <View style={{ flexDirection: "row" }}>
                          <CheckBox
                            checked={
                              payment === "Безналичная оплата, счет на Email"
                                ? true
                                : false
                            }
                            style={{
                              left: 0,
                              marginRight: scaleSize(16),
                              borderColor: "#302c23",
                              backgroundColor:
                                payment === "Безналичная оплата, счет на Email"
                                  ? "#302c23"
                                  : "transparent"
                            }}
                            onPress={() =>
                              this.setState({
                                payment:
                                  payment ===
                                  "Безналичная оплата, счет на Email"
                                    ? ""
                                    : "Безналичная оплата, счет на Email"
                              })
                            }
                          />
                          <Text style={styles.defaultText}>
                            Безналичная оплата, счет на Email
                          </Text>
                        </View>
                      </TouchableOpacity>
                    </View>
                  </View>
                </View>
              </View>

              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  paddingLeft: scaleSize(10),
                  paddingRight: scaleSize(10),
                  marginBottom: scaleSize(15)
                }}
              >
                <Text style={{ fontSize: scaleSize(16), color: "#fff" }}>
                  Товары:
                </Text>
                <Text style={{ fontSize: scaleSize(16), color: "#fff" }}>
                  {product
                    ? product.qty * product.price
                    : this.props.cart
                        .map(item => item.qty * item.price)
                        .reduce((sum, item) => sum + item)}{" "}
                  грн
                </Text>
              </View>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  paddingLeft: scaleSize(10),
                  paddingRight: scaleSize(10),
                  marginBottom: scaleSize(15)
                }}
              >
                <Text style={{ fontSize: scaleSize(16), color: "#fff" }}>
                  Доставка:
                </Text>
                <Text style={{ fontSize: scaleSize(16), color: "#fff" }}>
                  {deliveryCompany.cost} грн
                </Text>
              </View>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  paddingLeft: scaleSize(10),
                  paddingRight: scaleSize(10),
                  marginBottom: scaleSize(15)
                }}
              >
                <Text style={{ fontSize: scaleSize(16), color: "#fff" }}>
                  Всего к оплате:
                </Text>
                <Text style={{ fontSize: scaleSize(16), color: "#fff" }}>
                  {product
                    ? deliveryCompany.cost
                      ? product.qty * product.price + +deliveryCompany.cost
                      : product.qty * product.price
                    : this.props.cart
                        .map(item => item.qty * item.price)
                        .reduce((sum, item) => sum + item) +
                      (deliveryCompany.cost ? +deliveryCompany.cost : 0)}{" "}
                  грн
                </Text>
              </View>
              <View
                style={{
                  marginLeft: scaleSize(10),
                  marginRight: scaleSize(10),
                  flexDirection: "row",
                  justifyContent: "space-between"
                }}
              >
                <TouchableOpacity
                  style={styles.questionsBtn}
                  onPress={() => this.setModalVisible(true)}
                >
                  <KawaIcon
                    style={{
                      color: "#f8f8f8",
                      position: "relative",
                      paddingRight: scaleSize(5)
                    }}
                    name={"telephone"}
                    size={20}
                  />
                  <Text
                    style={{
                      color: "#f8f8f8",
                      fontSize: scaleSize(14)
                    }}
                  >
                    Возникли вопросы?
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() =>
                    payment === "Безналичная оплата, счет на Email"
                      ? this.props.navigation.push("Payment")
                      : ""
                  }
                  style={styles.btn}
                >
                  <Text style={styles.btnText}>{"Оплатить".toUpperCase()}</Text>
                </TouchableOpacity>
              </View>
            </Content>
          )}
        </View>
        <Modal
          backdropTransitionInTiming={0}
          backdropTransitionOutTiming={0}
          animationInTiming={0}
          animationOutTiming={0}
          style={{ backgroundColor: "rgba(0,0,0,0.7)", margin: 0 }}
          visible={this.state.modalVisible2}
          onBackdropPress={() => {
            this.setState({ modalVisible2: false });
          }}
          onBackButtonPress={() => {
            this.setState({ modalVisible2: false });
          }}
        >
          <View
            style={{
              borderRadius: scaleSize(5),
              padding: scaleSize(20),
              alignSelf: "center",
              backgroundColor: "#fff",
              width: SCREEN_WIDTH * 0.8
            }}
          >
            <Text
              style={{
                fontSize: scaleSize(22),
                fontWeight: "bold",
                marginBottom: scaleSize(20),
                color: "#302c23"
              }}
            >
              Обновить ваши данные?
            </Text>
            <Text>
              Вы указали новые данные, использовать их для следующих заказов,
              обновив ими старые данные?
            </Text>
            <View style={{ flexDirection: "row", justifyContent: "flex-end" }}>
              <TouchableOpacity
                style={{
                  backgroundColor: "transparent",
                  alignSelf: "flex-end",
                  marginRight: scaleSize(20)
                }}
                onPress={() => {
                  this.setState({ modalVisible2: false }, () =>
                    this.props.updateUser(
                      this.state.firstname,
                      this.state.lastname,
                      this.state.city
                    )
                  );
                }}
              >
                <Text
                  style={{
                    fontWeight: "bold",
                    marginTop: scaleSize(20),
                    color: "#302c23"
                  }}
                >
                  {"Обновить".toUpperCase()}
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={{
                  backgroundColor: "transparent",
                  alignSelf: "flex-end"
                }}
                onPress={() => {
                  this.setState({ modalVisible2: false });
                }}
              >
                <Text
                  style={{
                    fontWeight: "bold",
                    marginTop: scaleSize(20),
                    color: "#302c23"
                  }}
                >
                  {"Отмена".toUpperCase()}
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
        <Modal
          backdropTransitionInTiming={0}
          backdropTransitionOutTiming={0}
          animationInTiming={0}
          animationOutTiming={0}
          style={{ backgroundColor: "rgba(0,0,0,0.7)", margin: 0 }}
          visible={this.state.modalVisible}
          onBackdropPress={() => {
            this.setModalVisible(!this.state.modalVisible);
          }}
          onBackButtonPress={() => {
            this.setModalVisible(!this.state.modalVisible);
          }}
        >
          <View
            style={{
              borderRadius: scaleSize(5),
              padding: scaleSize(20),
              alignSelf: "center",
              backgroundColor: "#fff",
              width: SCREEN_WIDTH * 0.8
            }}
          >
            <Text
              style={{
                fontSize: scaleSize(22),
                fontWeight: "bold",
                marginBottom: scaleSize(20),
                color: "#302c23"
              }}
            >
              Выбрать номер
            </Text>
            <TouchableOpacity
              style={styles.phoneNumber}
              onPress={() => Linking.openURL(`tel:+380994556565`)}
            >
              <Image
                source={require("../../static/img/vodafon.png")}
                style={{
                  width: scaleSize(30),
                  height: scaleSize(30),
                  marginRight: scaleSize(5)
                }}
              />
              <Text>(099) 455 65 65</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.phoneNumber}
              onPress={() => Linking.openURL(`tel:+380674556565`)}
            >
              <Image
                source={require("../../static/img/kyivstar.png")}
                style={{
                  width: scaleSize(30),
                  height: scaleSize(30),
                  marginRight: scaleSize(5)
                }}
              />
              <Text>(067) 455 65 65</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.phoneNumber}
              onPress={() => Linking.openURL(`tel:+380934556565`)}
            >
              <Image
                source={require("../../static/img/lifecell.png")}
                style={{
                  width: scaleSize(30),
                  height: scaleSize(30),
                  marginRight: scaleSize(5)
                }}
              />
              <Text>(093) 455 65 65</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={{
                backgroundColor: "transparent",
                alignSelf: "flex-end"
              }}
              onPress={() => {
                this.setModalVisible(!this.state.modalVisible);
              }}
            >
              <Text
                style={{
                  fontWeight: "bold",
                  marginTop: scaleSize(20),
                  color: "#302c23"
                }}
              >
                {"Отмена".toUpperCase()}
              </Text>
            </TouchableOpacity>
          </View>
        </Modal>
      </Container>
    );
  }
}

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
  container: {
    width: "100%",
    height: scaleSize(130 - 75)
  },
  block: {
    backgroundColor: "rgba(255,255,255, 0.7)",
    marginBottom: scaleSize(7),
    paddingTop: scaleSize(16),
    paddingBottom: scaleSize(16),
    paddingRight: scaleSize(15),
    paddingLeft: scaleSize(15),
    borderRadius: scaleSize(8)
  },
  default: {
    color: "#fff"
  },
  defaultText: {
    fontSize: scaleSize(16),
    color: "#302c23"
  },
  searchInput: {
    fontSize: scaleSize(13)
  },
  profileInput: {
    fontSize: scaleSize(16),
    height: scaleSize(45),
    marginBottom: scaleSize(20),
    borderBottomColor: "#89a6aa",
    borderBottomWidth: 1,
    width: "100%",
    paddingLeft: 0
  },
  profileInputPhone: {
    fontSize: scaleSize(16),
    height: scaleSize(45),
    borderBottomColor: "#89a6aa",
    borderBottomWidth: 1,
    width: "100%",
    paddingLeft: 0,
    paddingTop: 10,
    paddingBottom: 10,
    marginBottom: scaleSize(20)
  },
  btn: {
    marginLeft: scaleSize(10),
    marginBottom: scaleSize(10),
    marginTop: scaleSize(5),
    backgroundColor: "#ea9308",
    borderRadius: scaleSize(3)
  },
  btnText: {
    fontSize: scaleSize(14),
    textAlign: "center",
    color: "#f8f8f8",
    paddingTop: scaleSize(11),
    paddingBottom: scaleSize(11),
    paddingRight: scaleSize(24),
    paddingLeft: scaleSize(24)
  },
  imgBlock: {
    alignItems: "flex-end",
    marginTop: scaleSize(4),
    width: "30%"
  },
  questionsBtn: {
    backgroundColor: "#89a6aa",
    height: scaleSize(40),
    justifyContent: "center",
    flexDirection: "row",
    padding: scaleSize(10),
    paddingBottom: scaleSize(11),
    paddingLeft: scaleSize(7),
    paddingRight: scaleSize(7),
    borderRadius: scaleSize(3),
    marginBottom: scaleSize(5),
    marginTop: scaleSize(5)
  },
  phoneNumber: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: scaleSize(8)
  }
});

const mapStateToProps = state => ({
  city: state.common.city,
  focus: state.common.focus,
  delivery: state.common.delivery,
  cart: state.cart.items,
  product: state.catalog.product,
  categories: state.catalog.categories,
  subcategories: state.catalog.subcategories,
  dishes: state.catalog.dishes,
  user: state.user.info
});

const mapDispatchToProps = dispatch => ({
  getCart: () => dispatch(getCart()),
  getProductID: id => dispatch(getProductID(id)),
  getDeliveryCost: city => dispatch(getDeliveryCost(city)),
  searchFocused: () => dispatch(searchFocused()),
  getUser: () => dispatch(getUser()),
  updateUser: (firstName, lastName, city) =>
    dispatch(updateUser(firstName, lastName, city))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(OrderScreen);
