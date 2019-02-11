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
  findNodeHandle,
  ScrollView,
  BackHandler,
  AsyncStorage,
  Platform,
  StyleSheet,
  Linking,
  ActivityIndicator
} from "react-native";

import Modal from "react-native-modal";

import { getCart, updateCart } from "../../store/actions/cartActions";
import { getUser, updateUser } from "../../store/actions/userActions";
import { getProductID } from "../../store/actions/catalogActions";
import { getOrder } from "../../store/actions/orderActions";

import {
  searchFocused,
  getDeliveryCost,
  getSingleDeliveryCost
} from "../../store/actions/commonActions";

import { scaleSize } from "../../helpers/scaleSize";
import OrderItem from "../Order/OrderItem";
import SearchBar from "../common/SearchBar";

import TextInputMask from "react-native-text-input-mask";

import KawaIcon from "../KawaIcon";

import TextTicker from "../common/TextTicker";

Input.defaultProps.selectionColor = "#ea9308";
TextInputMask.defaultProps.underlineColorAndroid = "rgba(0,0,0,0)";

StatusBar.setBarStyle("light-content", true);
StatusBar.setBackgroundColor("rgba(0,0,0,0)");
const MAIN_BG = "../../static/img/background.png";

const SCREEN_WIDTH = Dimensions.get("window").width;

class OrderSingleScreen extends Component {
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
      opacity: 0,
      canceled: false,
      cart: [],
      updatedCart: false
    };
    this.viewabilityConfig = {
      waitForInteraction: true,
      viewAreaCoveragePercentThreshold: 30,
      viewAreaPercentThreshold: 30
    };
    Input.defaultProps.selectionColor = "#000";
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.focus !== this.props.focus) {
      this.setState({ loading: false, focus: this.props.focus });
    }
  }

  componentDidMount() {
    this._willBlurSubscription = this.props.navigation.addListener(
      "willBlur",
      payload =>
        BackHandler.removeEventListener(
          "hardwareBackPress",
          this.handleBackPress
        )
    );

    this.props.navigation.addListener("didFocus", () => {
      this.retrieveData("user_city_name");
      this.retrieveData("department");
      this.props.getCart();
      this.props.getUser();
    });
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
    if (
      !this.state.product &&
      nextProps.cart &&
      nextProps.cart.length > 0 &&
      nextProps.cart.filter(
        item => item.id === this.props.navigation.getParam("itemId")
      )[0]
    ) {
      this.setState({
        loading: false,
        product: nextProps.cart.filter(
          item => item.id === this.props.navigation.getParam("itemId")
        )[0]
      });
    }
    if (nextProps.focus || !nextProps.focus) {
      this.setState({ focus: nextProps.focus });
    }
  }

  retrieveData = async name => {
    try {
      const value = await AsyncStorage.getItem(name);

      if (value) {
        if (name == "user_city_name") {
          console.log(value);
          this.setState(
            {
              city: value,
              department: "",
              canceled: false
            },
            () =>
              this.props.getSingleDeliveryCost({
                city: value,
                item: this.state.product
              })
          );
        }
        if (name == "department") {
          let department = JSON.parse(value);
          if (this.state.deliveryCompany.courier == 1) {
            this.setState({
              department: department.name,
              departmentId: department.id
            });
          }
        }
      }
    } catch (error) {}
  };

  getStyles = index => {
    this.setState({ stylesIndex: index });
  };

  handleBackPress = () => {
    this.props.updateCart(this.state.product.id, this.state.product.qty);
    this.props.navigation.pop();
    return true;
  };

  setModalVisible(visible) {
    this.setState({ ...this.state, modalVisible: visible, opacity: visible });
  }

  changeHandler = (value, name) => {
    this.setState({ [name]: value, canceled: false });
  };

  handleScroll = event => {
    const value = event.nativeEvent.contentOffset.y;
    const UIManager = require("NativeModules").UIManager;
    const handle = findNodeHandle(this.refs.deliveryView);
    const handle2 = findNodeHandle(this.refs.cityView);

    UIManager.measureLayoutRelativeToParent(
      handle,
      e => {
        console.error(e);
      },
      (x, y, w, h) => {
        if (value > w + y && !this.state.canceled) {
          if (
            this.state.email !== this.props.user.email ||
            this.state.firstname !== this.props.user.firstname ||
            this.state.lastname !== this.props.user.lastname ||
            this.state.phone !== this.props.user.phone
            //  ||
            // (this.state.city !== this.props.user.city &&
            //   this.state.city !== "Город, область")
          ) {
            this.setState({ modalVisible2: true });
          }
        }
      }
    );
    UIManager.measureLayoutRelativeToParent(
      handle2,
      e => {
        console.error(e);
      },
      (x, y, w, h) => {
        if (value > w + y && !this.state.updatedCart) {
          this.setState({ updatedCart: true }, () =>
            this.state.city && this.state.city !== "Город, область"
              ? this.props.getSingleDeliveryCost({
                  city: value,
                  item: this.state.product
                })
              : ""
          );
        }
      }
    );
  };

  onCartUpdateHandler = (id, qty) => {
    this.setState(
      {
        product: {
          ...this.state.product,
          qty
        }
      },
      () =>
        this.state.city && this.state.city !== "Город, область"
          ? this.props.getSingleDeliveryCost({
              city: this.state.city,
              item: this.state.product,
              qty: this.state.product
            })
          : ""
    );
  };

  handlePayment = () => {
    const {
      payment,
      deliveryCompany,
      departmentId,
      city,
      product
    } = this.state;

    this.props.updateCart(this.state.product.id, this.state.product.qty);

    if (payment === "email" && deliveryCompany.delivery) {
      this.props.navigation.push("Payment", {
        delivery_system: deliveryCompany.delivery,
        city: city,
        delivery_type: deliveryCompany.courier,
        warehouse: departmentId,
        payment: deliveryCompany.payment
      });
    } else if (payment === "LiqPay") {
      this.props.navigation.push("Liqpay", {
        price: deliveryCompany.cost
          ? product.qty * product.price + +deliveryCompany.cost
          : product.qty * product.price
      });
      this.props.getOrder({
        delivery_system: deliveryCompany.delivery,
        city: city,
        delivery_type: deliveryCompany.courier,
        warehouse: departmentId,
        payment: deliveryCompany.payment
      });
    }
  };

  render() {
    const categories = [
      ...this.props.categories,
      ...this.props.subcategories,
      ...this.props.dishes
    ];
    const { massDelivery } = this.props;

    let np;
    let up;
    let upx;

    if (massDelivery) {
      if (massDelivery.np) {
        np = [];

        for (let key in massDelivery.np) {
          np.push({ cost: massDelivery.np[key].total, value: key });
        }
      }
      if (massDelivery.up) {
        up = [];

        for (let key in massDelivery.up) {
          up.push({ cost: massDelivery.up[key].total, value: key });
        }
      }
      if (massDelivery.upx) {
        upx = [];

        for (let key in massDelivery.upx) {
          upx.push({ cost: massDelivery.upx[key].total, value: key });
        }
      }
    }

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
            cartChanged={() =>
              this.props.updateCart(
                this.state.product.id,
                this.state.product.qty
              )
            }
          />

          {this.state.loading ? (
            <ActivityIndicator
              style={{ marginTop: scaleSize(75) }}
              color="#89a6aa"
              size="large"
              animating
            />
          ) : (
            <Content
              style={{ marginTop: scaleSize(99) }}
              onScroll={e => this.handleScroll(e)}
            >
              <View
                style={{
                  paddingLeft: scaleSize(10),
                  paddingRight: scaleSize(10)
                }}
              >
                <OrderItem
                  cart={this.state.cart}
                  product={true}
                  item={product}
                  categories={categories}
                  navigation={this.props.navigation}
                  onCartUpdateHandler={this.onCartUpdateHandler}
                />
              </View>

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
                    placeholder={"+38 (___) ___ __ __"}
                    placeholderTextColor="#000"
                    keyboardType="phone-pad"
                    mask={"+38 ([000]) [000] [00] [00]"}
                    style={styles.profileInputPhone}
                    value={this.state.phone}
                    onChangeText={value => this.changeHandler(value, "phone")}
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
                          fontSize: scaleSize(12),
                          marginBottom: scaleSize(8)
                        }}
                      >
                        Доставка
                      </Text>
                      <TouchableOpacity
                        onPress={() =>
                          this.props.navigation.navigate("SelectRegionScreen", {
                            linkName: "OrderSingle",
                            itemId: this.props.navigation.getParam("itemId")
                              ? this.props.navigation.getParam("itemId")
                              : ""
                          })
                        }
                        style={{
                          width: "100%",
                          flexDirection: "row"
                        }}
                        ref="cityView"
                      >
                        <Text
                          onFocus={() =>
                            this.props.navigation.navigate(
                              "SelectRegionScreen",
                              {
                                linkName: "OrderSingle",
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
                      {np
                        ? np.map(item =>
                            item.value === "warehouse_cod" ? null : (
                              <View>
                                <TouchableOpacity
                                  key={`np_${item.value}`}
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
                                        deliveryCompany.courier ===
                                          (item.value === "courier" ? 2 : 1) &&
                                        deliveryCompany.payment === 1
                                          ? {}
                                          : {
                                              delivery: "np",
                                              courier:
                                                item.value === "courier"
                                                  ? 2
                                                  : 1,
                                              cost: item.cost,
                                              payment: 1
                                            }
                                    })
                                  }
                                >
                                  <View style={{ flexDirection: "row" }}>
                                    <CheckBox
                                      checked={
                                        deliveryCompany.delivery === "np" &&
                                        deliveryCompany.courier ===
                                          (item.value === "courier" ? 2 : 1) &&
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
                                          deliveryCompany.courier ===
                                            (item.value === "courier"
                                              ? 2
                                              : 1) &&
                                          deliveryCompany.payment === 1
                                            ? "#302c23"
                                            : "transparent"
                                      }}
                                      onPress={() =>
                                        this.setState({
                                          deliveryCompany:
                                            deliveryCompany.delivery === "np" &&
                                            deliveryCompany.courier ===
                                              (item.value === "courier"
                                                ? 2
                                                : 1) &&
                                            deliveryCompany.payment === 1
                                              ? {}
                                              : {
                                                  delivery: "np",
                                                  courier:
                                                    item.value === "courier"
                                                      ? 2
                                                      : 1,
                                                  cost: item.cost,
                                                  payment: 1
                                                }
                                        })
                                      }
                                    />
                                    <Text style={styles.defaultText}>
                                      {item.value === "courier"
                                        ? "Новая Почта, курьер"
                                        : "Новая Почта, отделение"}
                                    </Text>
                                  </View>
                                  <Text style={styles.defaultText}>
                                    {item.cost} грн
                                  </Text>
                                </TouchableOpacity>
                              </View>
                            )
                          )
                        : null}
                      {np ? (
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
                                deliveryCompany.courier === 1 &&
                                deliveryCompany.payment === 2
                                  ? {}
                                  : {
                                      delivery: "np",
                                      courier: 1,
                                      cost: np.filter(
                                        item => item.value === "warehouse"
                                      )[0].cost,
                                      payment: 2
                                    }
                            })
                          }
                        >
                          <View style={{ flexDirection: "row" }}>
                            <CheckBox
                              checked={
                                deliveryCompany.delivery === "np" &&
                                deliveryCompany.courier === 1 &&
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
                                  deliveryCompany.courier === 1 &&
                                  deliveryCompany.payment === 2
                                    ? "#302c23"
                                    : "transparent"
                              }}
                              onPress={() =>
                                this.setState({
                                  deliveryCompany:
                                    deliveryCompany.delivery === "np" &&
                                    deliveryCompany.courier === 1 &&
                                    deliveryCompany.payment === 2
                                      ? {}
                                      : {
                                          delivery: "np",
                                          courier: 1,
                                          cost: np.filter(
                                            item => item.value === "warehouse"
                                          )[0].cost,
                                          payment: 2
                                        }
                                })
                              }
                            />
                            <Text style={styles.defaultText}>
                              Новая Почта, при получении
                            </Text>
                          </View>
                          <Text style={styles.defaultText}>
                            {
                              np.filter(item => item.value === "warehouse")[0]
                                .cost
                            }{" "}
                            грн
                          </Text>
                        </TouchableOpacity>
                      ) : null}
                      {up
                        ? up.map(item =>
                            item.value === "warehouse_cod" ? null : (
                              <View>
                                <TouchableOpacity
                                  key={`up_${item.value}`}
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
                                        deliveryCompany.courier ===
                                          (item.value === "courier" ? 2 : 1) &&
                                        deliveryCompany.payment === 1
                                          ? {}
                                          : {
                                              delivery: "up",
                                              courier:
                                                item.value === "courier"
                                                  ? 2
                                                  : 1,
                                              cost: item.cost,
                                              payment: 1
                                            }
                                    })
                                  }
                                >
                                  <View style={{ flexDirection: "row" }}>
                                    <CheckBox
                                      checked={
                                        deliveryCompany.delivery === "up" &&
                                        deliveryCompany.courier ===
                                          (item.value === "courier" ? 2 : 1) &&
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
                                          deliveryCompany.courier ===
                                            (item.value === "courier"
                                              ? 2
                                              : 1) &&
                                          deliveryCompany.payment === 1
                                            ? "#302c23"
                                            : "transparent"
                                      }}
                                      onPress={() =>
                                        this.setState({
                                          deliveryCompany:
                                            deliveryCompany.delivery === "up" &&
                                            deliveryCompany.courier ===
                                              (item.value === "courier"
                                                ? 2
                                                : 1) &&
                                            deliveryCompany.payment === 1
                                              ? {}
                                              : {
                                                  delivery: "up",
                                                  courier:
                                                    item.value === "courier"
                                                      ? 2
                                                      : 1,
                                                  cost: item.cost,
                                                  payment: 1
                                                }
                                        })
                                      }
                                    />
                                    <Text style={styles.defaultText}>
                                      {item.value === "courier"
                                        ? "Укрпочта Стандарт, курьер"
                                        : "Укрпочта Стандарт"}
                                    </Text>
                                  </View>
                                  <Text style={styles.defaultText}>
                                    {item.cost} грн
                                  </Text>
                                </TouchableOpacity>
                              </View>
                            )
                          )
                        : null}
                      {up ? (
                        <TouchableOpacity
                          style={{
                            flexDirection: "row",
                            justifyContent: "space-between",
                            marginBottom: scaleSize(16)
                          }}
                          activeOpacity={0.9}
                          onPress={() => {
                            deliveryCompany.delivery === "up" &&
                            deliveryCompany.courier === 1 &&
                            deliveryCompany.payment === 2
                              ? ""
                              : this.refs.upStand.startAnimation(10);
                            this.setState({
                              deliveryCompany:
                                deliveryCompany.delivery === "up" &&
                                deliveryCompany.courier === 1 &&
                                deliveryCompany.payment === 2
                                  ? {}
                                  : {
                                      delivery: "up",
                                      courier: 1,
                                      cost: up.filter(
                                        item => item.value === "warehouse"
                                      )[0].cost,
                                      payment: 2
                                    }
                            });
                          }}
                        >
                          <View style={{ flexDirection: "row", width: "80%" }}>
                            <CheckBox
                              checked={
                                deliveryCompany.delivery === "up" &&
                                deliveryCompany.courier === 1 &&
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
                                  deliveryCompany.courier === 1 &&
                                  deliveryCompany.payment === 2
                                    ? "#302c23"
                                    : "transparent"
                              }}
                              onPress={() => {
                                deliveryCompany.delivery === "up" &&
                                deliveryCompany.courier === 1 &&
                                deliveryCompany.payment === 2
                                  ? ""
                                  : this.refs.upStand.startAnimation(10);
                                this.setState({
                                  deliveryCompany:
                                    deliveryCompany.delivery === "up" &&
                                    deliveryCompany.courier === 1 &&
                                    deliveryCompany.payment === 2
                                      ? {}
                                      : {
                                          delivery: "up",
                                          courier: "0",
                                          cost: up.filter(
                                            item => item.value === "warehouse"
                                          )[0].cost,
                                          payment: 2
                                        }
                                });
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
                                style={styles.defaultText}
                                loop={false}
                                marqueeOnMount={false}
                                scroll={false}
                                ref="upStand"
                              >
                                Укрпочта Стандарт, при получении
                              </TextTicker>
                            </View>
                          </View>
                          <Text style={styles.defaultText}>
                            {
                              up.filter(item => item.value === "warehouse")[0]
                                .cost
                            }{" "}
                            грн
                          </Text>
                        </TouchableOpacity>
                      ) : null}
                      {upx
                        ? upx.map(item =>
                            item.value === "warehouse_cod" ? null : (
                              <View>
                                <TouchableOpacity
                                  key={`upx_${item.value}`}
                                  style={{
                                    flexDirection: "row",
                                    justifyContent: "space-between",
                                    marginBottom: scaleSize(16)
                                  }}
                                  activeOpacity={0.9}
                                  onPress={() =>
                                    this.setState({
                                      deliveryCompany:
                                        deliveryCompany.delivery === "upx" &&
                                        deliveryCompany.courier ===
                                          (item.value === "courier" ? 2 : 1) &&
                                        deliveryCompany.payment === 1
                                          ? {}
                                          : {
                                              delivery: "upx",
                                              courier:
                                                item.value === "courier"
                                                  ? 2
                                                  : 1,
                                              cost: item.cost,
                                              payment: 1
                                            }
                                    })
                                  }
                                >
                                  <View style={{ flexDirection: "row" }}>
                                    <CheckBox
                                      checked={
                                        deliveryCompany.delivery === "upx" &&
                                        deliveryCompany.courier ===
                                          (item.value === "courier" ? 2 : 1) &&
                                        deliveryCompany.payment === 1
                                          ? true
                                          : false
                                      }
                                      style={{
                                        left: 0,
                                        marginRight: scaleSize(16),
                                        borderColor: "#302c23",
                                        backgroundColor:
                                          deliveryCompany.delivery === "upx" &&
                                          deliveryCompany.courier ===
                                            (item.value === "courier"
                                              ? 2
                                              : 1) &&
                                          deliveryCompany.payment === 1
                                            ? "#302c23"
                                            : "transparent"
                                      }}
                                      onPress={() =>
                                        this.setState({
                                          deliveryCompany:
                                            deliveryCompany.delivery ===
                                              "upx" &&
                                            deliveryCompany.courier ===
                                              (item.value === "courier"
                                                ? 2
                                                : 1) &&
                                            deliveryCompany.payment === 1
                                              ? {}
                                              : {
                                                  delivery: "upx",
                                                  courier:
                                                    item.value === "courier"
                                                      ? 2
                                                      : 1,
                                                  cost: item.cost,
                                                  payment: 1
                                                }
                                        })
                                      }
                                    />
                                    <Text style={styles.defaultText}>
                                      {item.value === "courier"
                                        ? "Укрпочта Экспресс, курьер"
                                        : "Укрпочта Экспресс"}
                                    </Text>
                                  </View>
                                  <Text style={styles.defaultText}>
                                    {item.cost} грн
                                  </Text>
                                </TouchableOpacity>
                              </View>
                            )
                          )
                        : null}
                      {up ? (
                        <TouchableOpacity
                          style={{
                            flexDirection: "row",
                            justifyContent: "space-between",
                            marginBottom: scaleSize(16)
                          }}
                          activeOpacity={0.9}
                          onPress={() => {
                            deliveryCompany.delivery === "upx" &&
                            deliveryCompany.courier === 1 &&
                            deliveryCompany.payment === 2
                              ? ""
                              : this.refs.upxStand.startAnimation(10);
                            this.setState({
                              deliveryCompany:
                                deliveryCompany.delivery === "upx" &&
                                deliveryCompany.courier === 1 &&
                                deliveryCompany.payment === 2
                                  ? {}
                                  : {
                                      delivery: "upx",
                                      courier: 1,
                                      cost: upx.filter(
                                        item => item.value === "warehouse"
                                      )[0].cost,
                                      payment: 2
                                    }
                            });
                          }}
                        >
                          <View style={{ flexDirection: "row", width: "80%" }}>
                            <CheckBox
                              checked={
                                deliveryCompany.delivery === "upx" &&
                                deliveryCompany.courier === 1 &&
                                deliveryCompany.payment === 2
                                  ? true
                                  : false
                              }
                              style={{
                                left: 0,
                                marginRight: scaleSize(16),
                                borderColor: "#302c23",
                                backgroundColor:
                                  deliveryCompany.delivery === "upx" &&
                                  deliveryCompany.courier === 1 &&
                                  deliveryCompany.payment === 2
                                    ? "#302c23"
                                    : "transparent"
                              }}
                              onPress={() => {
                                deliveryCompany.delivery === "upx" &&
                                deliveryCompany.courier === 1 &&
                                deliveryCompany.payment === 2
                                  ? ""
                                  : this.refs.upxStand.startAnimation(10);
                                this.setState({
                                  deliveryCompany:
                                    deliveryCompany.delivery === "upx" &&
                                    deliveryCompany.courier === 1 &&
                                    deliveryCompany.payment === 2
                                      ? {}
                                      : {
                                          delivery: "upx",
                                          courier: 1,
                                          cost: up.filter(
                                            item => item.value === "warehouse"
                                          )[0].cost,
                                          payment: 2
                                        }
                                });
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
                                style={styles.defaultText}
                                loop={false}
                                marqueeOnMount={false}
                                scroll={false}
                                ref="upxStand"
                              >
                                Укрпочта Экспресс, при получении
                              </TextTicker>
                            </View>
                          </View>
                          <Text style={styles.defaultText}>
                            {
                              upx.filter(item => item.value === "warehouse")[0]
                                .cost
                            }{" "}
                            грн
                          </Text>
                        </TouchableOpacity>
                      ) : null}
                    </View>
                    <View
                      style={[
                        styles.cardFullCity,
                        { display: np || up || upx ? "flex" : "none" }
                      ]}
                      ref="deliveryView"
                    >
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
                            if (deliveryCompany.courier === 1) {
                              this.props.navigation.navigate("Department", {
                                city: this.state.city,
                                post:
                                  deliveryCompany.delivery === "np"
                                    ? "np"
                                    : "up",
                                linkName: "OrderSingle"
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
                            {department
                              ? department
                              : deliveryCompany.courier === 1
                              ? "Номер отделения, адрес"
                              : "Адрес (улица, дом) доставки"}
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
                              payment === "VISA, MasterCard"
                                ? ""
                                : "VISA, MasterCard"
                          })
                        }
                      >
                        <View style={{ flexDirection: "row" }}>
                          <CheckBox
                            checked={
                              payment === "VISA, MasterCard" ? true : false
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
                                payment: "VISA, Mastercard"
                              })
                            }
                          />
                          <Text style={styles.defaultText}>
                            VISA, Mastercard
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
                            payment: payment === "LiqPay" ? "" : "LiqPay"
                          })
                        }
                      >
                        <View style={{ flexDirection: "row" }}>
                          <CheckBox
                            checked={payment === "LiqPay" ? true : false}
                            style={{
                              left: 0,
                              marginRight: scaleSize(16),
                              borderColor: "#302c23",
                              backgroundColor:
                                payment === "LiqPay" ? "#302c23" : "transparent"
                            }}
                            onPress={() =>
                              this.setState({
                                payment: "LiqPay"
                              })
                            }
                          />
                          <Text style={styles.defaultText}>
                            LiqPay, Privat24
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
                              Platform.OS === "ios" ? "Apple Pay" : "Google Pay"
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
                                  Platform.OS === "ios"
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
                          />
                        ) : (
                          <Image
                            source={require("../../static/img/gpay.png")}
                            style={{
                              alignSelf: "flex-end",
                              width: scaleSize(58),
                              height: scaleSize(23)
                            }}
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
                            payment: "Masterpass"
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
                                payment: "Masterpass"
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
                            payment: "email"
                          })
                        }
                      >
                        <View style={{ flexDirection: "row" }}>
                          <CheckBox
                            checked={payment === "email" ? true : false}
                            style={{
                              left: 0,
                              marginRight: scaleSize(16),
                              borderColor: "#302c23",
                              backgroundColor:
                                payment === "email" ? "#302c23" : "transparent"
                            }}
                            onPress={() =>
                              this.setState({
                                payment: "email"
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
                    : ""}{" "}
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
                  onPress={() => this.handlePayment()}
                  style={styles.btn}
                  activeOpacity={0.9}
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
                  this.setState({ modalVisible2: false, canceled: true });
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
  user: state.user.info,
  massDelivery: state.common.massDelivery
});

const mapDispatchToProps = dispatch => ({
  getCart: () => dispatch(getCart()),
  getProductID: id => dispatch(getProductID(id)),
  getOrder: params => dispatch(getOrder(params)),
  getDeliveryCost: city => dispatch(getDeliveryCost(city)),
  getSingleDeliveryCost: product => dispatch(getSingleDeliveryCost(product)),
  searchFocused: () => dispatch(searchFocused()),
  getUser: () => dispatch(getUser()),
  updateCart: (id, quantity) => dispatch(updateCart(id, quantity))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(OrderSingleScreen);
