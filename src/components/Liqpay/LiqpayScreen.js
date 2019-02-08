import React, { Component } from "react";
import { connect } from "react-redux";
import { Container, Icon, Input } from "native-base";
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

import { getCart, updateCart } from "../../store/actions/cartActions";

import { searchFocused } from "../../store/actions/commonActions";

import { scaleSize } from "../../helpers/scaleSize";
import HeaderBar from "../common/HeaderBar";

const SCREEN_WIDTH = Dimensions.get("window").width;

StatusBar.setBarStyle("light-content", true);
StatusBar.setBackgroundColor("rgba(0,0,0,0)");
const MAIN_BG = "../../static/img/background.png";

class LiqpayScreen extends Component {
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
      search: false,
      name: "",
      id: "",
      focus: false,
      loading: true,
      modalVisible: false
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
    console.log(this.props.orderId);
    this.props.navigation.addListener("didFocus", payload => {
      this.props.getCart();
    });
    this._willBlurSubscription = this.props.navigation.addListener(
      "willBlur",
      payload => {}
      // BackHandler.removeEventListener('hardwareBackPress', this.handleBackPress)
    );
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.end || nextProps.end === false) {
      this.setState({ loading: false, end: nextProps.end });
    }
    if (nextProps.cart) {
      this.setState({ cart: nextProps.cart });
    }
  }

  handleBackPress = () => {
    this.state.cart.map(item => this.props.updateCart(item.id, item.qty));
    this.props.navigation.pop();
    return true;
  };

  onDeletePressHandler = (id, name) => {
    this.setState({ id, name, modalVisible: true });
  };

  onCartUpdateHandler = (id, qty) => {
    this.setState({
      cart: this.state.cart.map(item => {
        if (item.id === id) {
          item.qty = qty;
        }
        return item;
      })
    });
  };

  render() {
    const categories = [
      ...this.props.categories,
      ...this.props.subcategories,
      ...this.props.dishes
    ];
    let notFound;

    return (
      <Container style={styles.default}>
        <StatusBar
          barStyle="light-content"
          hidden={false}
          translucent={true}
          backgroundColor={`rgba(0,0,0,${
            this.state.focus ? 0.1 : this.state.modalVisible ? 0.7 : 0
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
          {!this.state.search ? (
            <HeaderBar
              style={{ display: !this.state.search ? "flex" : "none" }}
              menu={true}
              cart={this.props.cart}
              title={"Liqpay"}
              navigation={this.props.navigation.dangerouslyGetParent()}
            />
          ) : (
            <SearchBar
              placeholder={"Найти кофе"}
              style={{
                marginBottom: scaleSize(20),
                opacity: this.state.search ? 1 : 0
              }}
              navigation={this.props.navigation}
            />
          )}
          {/* <Icon
            style={{
              position: "absolute",
              fontSize: scaleSize(20),
              width: scaleSize(20),
              height: scaleSize(20),
              zIndex: !this.state.search ? 1000 : -1,
              top: scaleSize(38),
              right: scaleSize(15),
              color: "#fff"
            }}
            name="ios-search"
            onPress={() =>
              this.setState({ search: true }, () =>
                this.state.cart.map(item =>
                  this.props.updateCart(item.id, item.qty)
                )
              )
            }
          /> */}
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
  default: {
    color: "#fff"
  },
  searchInput: {
    fontSize: scaleSize(13)
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
    paddingTop: scaleSize(8),
    paddingBottom: scaleSize(8),
    paddingRight: scaleSize(7),
    paddingLeft: scaleSize(7)
    // fontWeight: "400"
  }
});

const mapStateToProps = state => ({
  cart: state.cart.items,
  focus: state.common.focus,
  categories: state.catalog.categories,
  subcategories: state.catalog.subcategories,
  dishes: state.catalog.dishes,
  orderId: state.order.orderId
});

const mapDispatchToProps = dispatch => ({
  getCart: () => dispatch(getCart()),
  searchFocused: () => dispatch(searchFocused()),
  updateCart: (id, quantity) => dispatch(updateCart(id, quantity))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(LiqpayScreen);
