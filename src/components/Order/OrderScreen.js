import React, { Component } from "react";
import { connect } from "react-redux";
import { Container, Content, Input } from "native-base";
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
  StyleSheet
} from "react-native";

import { getCart } from "../../store/actions/cartActions";
import { getProductID } from "../../store/actions/catalogActions";

import { searchFocused } from "../../store/actions/commonActions";

import { scaleSize } from "../../helpers/scaleSize";
import OrderItem from "./OrderItem";
import SearchBar from "../common/SearchBar";

import TextInputMask from "react-native-text-input-mask";

// import KawaIcon from "../KawaIcon";

Input.defaultProps.selectionColor = "#ea9308";
TextInputMask.defaultProps.selectionColor = "#ea9308";

StatusBar.setBarStyle("light-content", true);
StatusBar.setBackgroundColor("rgba(0,0,0,0)");
const MAIN_BG = "../../static/img/background.png";

class OrderScreen extends Component {
  _didFocusSubscription;
  _willBlurSubscription;

  constructor(props) {
    super(props);
    this._didFocusSubscription = this.props.navigation.addListener(
      "didFocus",
      payload => {
        if (this.props.navigation.getParam("itemId")) {
          this.props.getProductID(this.props.navigation.getParam("itemId"));
        }
        BackHandler.addEventListener("hardwareBackPress", this.handleBackPress);
      }
    );
    this.state = {
      search: "",
      focus: false,
      loading: true
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
    // console.log(this.props);
    this.props.getCart();
    this._willBlurSubscription = this.props.navigation.addListener(
      "willBlur",
      payload =>
        BackHandler.removeEventListener(
          "hardwareBackPress",
          this.handleBackPress
        )
    );
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.end || nextProps.end === false) {
      this.setState({ loading: false, end: nextProps.end });
    }
  }

  handleEnd = () => {};

  getStyles = index => {
    this.setState({ stylesIndex: index });
  };

  handleBackPress = () => {
    this.props.navigation.pop();
    return true;
  };

  render() {
    const categories = [
      ...this.props.categories,
      ...this.props.subcategories,
      ...this.props.dishes
    ];
    let notFound;
    const { cart, product } = this.props;
    const filteredCart =
      cart && product
        ? cart.filter(cartItem => cartItem.id === product.id)
        : [];

    // if (
    //   this.props.products.length === 0 &&
    //   !this.state.loading &&
    //   this.state.end
    // ) {
    //   notFound = (
    //     <View style={{ flex: 1, alignItems: "center", zIndex: 90 }}>
    //       <KawaIcon
    //         color={"#f8f8f8"}
    //         name={"info"}
    //         size={scaleSize(52)}
    //         style={{ marginBottom: scaleSize(16) }}
    //       />
    //       <Text style={{ color: "#f8f8f8", fontSize: scaleSize(16) }}>
    //         Ничего не найдено
    //       </Text>
    //       <Text style={{ color: "#f8f8f8", fontSize: scaleSize(16) }}>
    //         Попробуйте уточнить свой запрос
    //       </Text>
    //     </View>
    //   );
    // }

    return (
      <Container style={styles.default}>
        <StatusBar
          barStyle="light-content"
          hidden={false}
          translucent={true}
          backgroundColor={`rgba(0,0,0,${this.state.focus ? 0.1 : 0})`}
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
          <ScrollView style={{ marginTop: scaleSize(99) }}>
            {this.props.navigation.getParam("itemId") &&
            this.props.product &&
            filteredCart[0] ? (
              <View
                style={{
                  paddingLeft: scaleSize(10),
                  paddingRight: scaleSize(10)
                }}
              >
                <OrderItem
                  cart={this.props.cart}
                  product={true}
                  item={this.props.product}
                  categories={categories}
                />
              </View>
            ) : (
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
                  />
                )}
                viewabilityConfig={this.viewabilityConfig}
              />
            )}

            <View
              style={{ marginLeft: scaleSize(10), marginRight: scaleSize(10) }}
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
                <Input style={styles.profileInput}>efimoff@gmail.com</Input>
                <TextInputMask
                  placeholder={"+38 (___) ___ __ __"}
                  placeholderTextColor="#000"
                  keyboardType="phone-pad"
                  mask={"+38 ([000]) [000] [00] [00]"}
                  // onBlur={() => this.onUnFocus('phone')}
                  // onFocus={() => this.onFocus('phone')}
                  style={styles.profileInputPhone}
                >
                  +38 (
                </TextInputMask>
                <Input style={styles.profileInput}>Максим Ефимов</Input>
                <Input style={styles.profileInput}>Максим Ефимов</Input>
              </View>
            </View>

            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                paddingLeft: scaleSize(10),
                paddingRight: scaleSize(10)
              }}
            >
              <Text style={{ fontSize: scaleSize(16), color: "#fff" }}>
                Продукты:
              </Text>
              <Text style={{ fontSize: scaleSize(16), color: "#fff" }}>
                {this.props.navigation.getParam("itemId") &&
                this.props.product &&
                filteredCart[0]
                  ? filteredCart[0].qty * filteredCart[0].price
                  : this.props.cart
                      .map(item => item.qty * item.price)
                      .reduce((sum, item) => sum + item)}{" "}
                грн.
              </Text>
            </View>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                paddingLeft: scaleSize(10),
                paddingRight: scaleSize(10)
              }}
            >
              <Text style={{ fontSize: scaleSize(16), color: "#fff" }}>
                Доставка:
              </Text>
              <Text style={{ fontSize: scaleSize(16), color: "#fff" }}> </Text>
            </View>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                paddingLeft: scaleSize(10),
                paddingRight: scaleSize(10)
              }}
            >
              <Text style={{ fontSize: scaleSize(16), color: "#fff" }}>
                Всего к оплате:
              </Text>
              <Text style={{ fontSize: scaleSize(16), color: "#fff" }}>
                {" "}
                грн.
              </Text>
            </View>
            {/* <TouchableOpacity
              onPress={() =>
                this.props.navigation.push("OrderScreen", {
                  linkName: "CatalogScreen",
                  categoryId
                })
              }
              style={styles.btn}
            >
              <Text style={styles.btnText}>
                {"Оформить сейчас".toUpperCase()}
              </Text>
            </TouchableOpacity> */}
          </ScrollView>
        </View>
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
  searchInput: {
    fontSize: scaleSize(13)
  },
  profileInput: {
    fontSize: scaleSize(16),
    height: scaleSize(40),
    marginBottom: scaleSize(15),
    borderBottomColor: "#89a6aa",
    borderBottomWidth: 1,
    width: "100%",
    paddingLeft: 0
  },
  profileInputPhone: {
    fontSize: scaleSize(16),
    borderBottomColor: "#89a6aa",
    borderBottomWidth: 1,
    width: "100%",
    paddingLeft: 0,
    paddingTop: 10,
    paddingBottom: 10
  },
  btn: {
    marginLeft: scaleSize(10),
    marginRight: scaleSize(10),
    marginBottom: scaleSize(40),
    marginTop: scaleSize(24),
    backgroundColor: "#ea9308",
    borderRadius: scaleSize(3)
  },
  btnText: {
    fontSize: scaleSize(14),
    textAlign: "center",
    color: "#f8f8f8",
    paddingTop: scaleSize(7),
    paddingBottom: scaleSize(7),
    paddingRight: scaleSize(7),
    paddingLeft: scaleSize(7)
    // fontWeight: "400"
  }
});

const mapStateToProps = state => ({
  cart: state.cart.items,
  product: state.catalog.product,
  categories: state.catalog.categories,
  subcategories: state.catalog.subcategories,
  dishes: state.catalog.dishes
});

const mapDispatchToProps = dispatch => ({
  getCart: () => dispatch(getCart()),
  getProductID: id => dispatch(getProductID(id)),
  searchFocused: () => dispatch(searchFocused())
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(OrderScreen);
