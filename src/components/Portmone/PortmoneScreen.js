import React, { Component } from "react";
import { connect } from "react-redux";
import { Container } from "native-base";
import {
  StatusBar,
  Dimensions,
  BackHandler,
  StyleSheet,
  View,
  Text,
  Image
} from "react-native";

import MyWebView from "react-native-webview-autoheight";

import { scaleSize } from "../../helpers/scaleSize";

StatusBar.setBarStyle("light-content", true);
StatusBar.setBackgroundColor("rgba(0,0,0,0)");

const MAIN_BG = "../../static/img/background.png";

class PortmoneScreen extends Component {
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
  }

  componentDidMount() {
    this._willBlurSubscription = this.props.navigation.addListener(
      "willBlur",
      payload => {}
      // BackHandler.removeEventListener('hardwareBackPress', this.handleBackPress)
    );
  }

  componentWillReceiveProps(nextProps) {}

  handleBackPress = () => {
    this.props.navigation.pop();
    return true;
  };

  openExternalLink = req => {
    const isHTTPS = req.url.search("https://") !== -1;

    if (isHTTPS) {
      return true;
    } else {
      if (req.url.startsWith("customurl://")) {
        this.setState({ url: req.url });
        this.props.navigation.push("OrderHistory");
      }
      return false;
    }
  };

  onNavigationStateChange = navState => {
    if (navState.url === "kawaapp://kawa/order-success") {
      this.props.navigation.push("OrderHistory");
    } else if (navState.url === "kawaapp://kawa/order-fail") {
      this.props.navigation.pop();
    }
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

        <View style={{ flex: 1 }}>
          <Image
            source={require(MAIN_BG)}
            style={styles.background}
            resizeMode="cover"
          />
          <View style={{ flex: 1, paddingTop: StatusBar.currentHeight }}>
            {this.props.orderId ? (
              <MyWebView
                // onShouldStartLoadWithRequest={this.openExternalLink}
                onNavigationStateChange={this.onNavigationStateChange}
                ref="portmone"
                source={{
                  uri: `https://www.portmone.com.ua/gateway/?payee_id=${17448}&bill_amount=${this.props.navigation.getParam(
                    "bill_amount"
                  )}&shop_order_number=${
                    this.props.orderId
                  }&success_url=kawaapp://kawa/order-success&failure_url=kawaapp://kawa/order-fail&type=portmone&card=y&priorityPaymentTypes=0
                  `
                  // &priorityPaymentTypes=1
                }}
              />
            ) : null}
            {/* <Text style={styles.default}>Не удалось оплатить заказ</Text> */}
          </View>
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
)(PortmoneScreen);
