import React, { Component } from "react";
import { connect } from "react-redux";
import { Container } from "native-base";
import { StatusBar, Dimensions, BackHandler, StyleSheet } from "react-native";

import { LiqpayCheckout } from "react-native-liqpay";

import { scaleSize } from "../../helpers/scaleSize";

StatusBar.setBarStyle("light-content", true);
StatusBar.setBackgroundColor("rgba(0,0,0,0)");

const LIQPAY_PUBLIC_KEY = "i68068890264";
const LIQPAY_PRIVATE_KEY = "QTEH4Q3yX8c2LlsLJGd3nW39pKpzkr9QKAVGJIsW";

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

        <View style={{ flex: 1 }}>
          <Image
            source={require(MAIN_BG)}
            style={styles.background}
            resizeMode="cover"
          />
          <View
            style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
          >
            <Text style={styles.default}>Не удалось оплатить заказ</Text>
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
