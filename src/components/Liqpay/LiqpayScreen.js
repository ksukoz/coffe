import React, { Component } from "react";
import { connect } from "react-redux";
import { Container } from "native-base";
import {
  StatusBar,
  Dimensions,
  BackHandler,
  StyleSheet,
  Platform,
  PermissionsAndroid,
  Image,
  View
} from "react-native";

import { LiqpayCheckout } from "react-native-liqpay";

import { scaleSize } from "../../helpers/scaleSize";

StatusBar.setBarStyle("light-content", true);
StatusBar.setBackgroundColor("rgba(0,0,0,0)");

const MAIN_BG = "../../static/img/background.png";

const LIQPAY_PUBLIC_KEY = "i68068890264";
const LIQPAY_PRIVATE_KEY = "QTEH4Q3yX8c2LlsLJGd3nW39pKpzkr9QKAVGJIsW";

class LiqpayScreen extends Component {
  _didFocusSubscription;
  _willBlurSubscription;

  constructor(props) {
    super(props);
    this.params = {
      version: "3",
      public_key: LIQPAY_PUBLIC_KEY,
      action: "pay",
      currency: "UAH",
      sandbox: "1",
      amount: this.props.navigation.getParam("price"),
      language: "ru"
    };
    this._didFocusSubscription = this.props.navigation.addListener(
      "didFocus",
      payload => {
        BackHandler.addEventListener("hardwareBackPress", this.handleBackPress);
      }
    );

    this.state = { navigate: false, liqpay: false };
  }

  async componentDidMount() {
    if (Platform.OS === "android") {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.READ_PHONE_STATE
        );

        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
          this.setState({ liqpay: true });
        }
      } catch (e) {
        console.log(e);
      }
    } else {
      this.setState({ liqpay: true });
    }
    this.props.navigation.addListener("didFocus", payload => {
      this.state.navigate ? this.props.navigation.pop() : "";
    });
    this._willBlurSubscription = this.props.navigation.addListener(
      "willBlur",
      payload => {}
      // BackHandler.removeEventListener('hardwareBackPress', this.handleBackPress)
    );
  }

  componentWillReceiveProps(nextProps) {}

  handleSuccess = event => {
    console.log(JSON.parse(event.nativeEvent.data), this.props.orderId);
    this.setState({ navigate: true, liqpay: false });
    this.props.navigation.push("OrderHistory", { fromOrder: true });
  };

  handleError = event => {
    this.setState({ liqpay: false });
    console.log(event.nativeEvent);
    this.props.navigation.pop();
  };

  handleBackPress = () => {
    this.props.navigation.pop();
    return true;
  };

  render() {
    return (
      <Container style={styles.default}>
        <StatusBar
          barStyle="light-content"
          hidden={false}
          translucent={true}
          backgroundColor={`rgba(0,0,0,0)`}
        />
        <Image
          source={require(MAIN_BG)}
          style={styles.background}
          resizeMode="cover"
        />
        <View style={{ flex: 1 }}>
          {this.state.liqpay ? (
            <LiqpayCheckout
              privateKey={LIQPAY_PRIVATE_KEY}
              params={this.params}
              order_id={this.props.orderId}
              onLiqpaySuccess={this.handleSuccess}
              onLiqpayError={this.handleError}
            />
          ) : null}
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
  }
});

const mapStateToProps = state => ({
  orderId: state.order.orderId
});

const mapDispatchToProps = dispatch => ({});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(LiqpayScreen);
