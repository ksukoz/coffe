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
    this.state = {
      html: "",
      formData: ""
    };
  }

  componentDidMount() {
    this._willBlurSubscription = this.props.navigation.addListener(
      "willBlur",
      payload => {}
      // BackHandler.removeEventListener('hardwareBackPress', this.handleBackPress)
    );
  }

  componentWillReceiveProps(nextProps) {
    if (
      (nextProps.orderId &&
        nextProps.user &&
        nextProps.user.email &&
        nextProps.navigation.getParam("bill_amount"),
      nextProps.navigation.getParam("card"))
    ) {
      var formData = new FormData();

      formData.append(
        "bodyRequest",
        JSON.stringify({
          paymentTypes: {
            card: nextProps.navigation.getParam("card") === "card" ? "Y" : "N",
            portmone: "N",
            token: "N",
            masterpass:
              nextProps.navigation.getParam("card") === "masterpass"
                ? "Y"
                : "N",
            visacheckout:
              nextProps.navigation.getParam("card") === "masterpass"
                ? "Y"
                : "N",
            createtokenonly: "N",
            createtokenonlyp2p: "N"
          },
          priorityPaymentTypes: {
            card: nextProps.navigation.getParam("card") === "card" ? "2" : "0",
            portmone:
              nextProps.navigation.getParam("card") === "card" ? "3" : "0",
            qr: "0",
            masterpass:
              nextProps.navigation.getParam("card") === "masterpass"
                ? "2"
                : "0",
            token: nextProps.navigation.getParam("card") === "card" ? "2" : "0",
            visacheckout:
              nextProps.navigation.getParam("card") === "masterpass"
                ? "3"
                : "0",
            createtokenonly: "0",
            createtokenonlyp2p: "0"
          },
          payee: {
            payeeId: "17448",
            login: "",
            dt: "",
            signature: "",
            shopSiteId: ""
          },
          order: {
            shopOrderNumber: nextProps.orderId,
            billAmount: nextProps.navigation.getParam("bill_amount"),
            attribute1: "1",
            attribute2: "2",
            attribute3: "3",
            attribute4: "4",
            attribute5: "",
            successUrl: "",
            failureUrl: "",
            preauthFlag: "N",
            billCurrency: "UAH",
            encoding: "",
            successUrl: "kawaapp://kawa/order-success",
            failureUrl: "kawaapp://kawa/order-fail"
          },
          token: {
            tokenFlag: "N",
            returnToken: "N",
            token: "18343534393739353......932DB",
            cardMask: "414950******7665",
            otherPaymentMethods: "Y",
            sellerToken: ""
          },
          payer: {
            lang: "ru",
            emailAddress: nextProps.user.email,
            showEmail: "Y"
          },
          style: {
            type: "brand",
            logo: "https://kawa.surge.sh/images/logo/kawa.png",
            logoWidth: "150px",
            logoHeight: "50px",
            backgroundColorHeader: "#ffffff",
            backgroundColorButtons: "#ea9308",
            colorTextAndIcons: "#000000",
            borderColorList: "#89a6aa",
            bcMain: "#ffffff"
          }
        })
      );
      formData.append("typeRequest", "json");
      this.setState({ formData }, () =>
        this.state.formData ? this.sendData(this.state.formData) : ""
      );
    }
  }

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

  sendData = formData => {
    fetch("https://www.portmone.com.ua/gateway/", {
      method: "POST",
      headers: {
        Accept: "application/json, application/xml, text/plain, text/html, *.*",
        "Content-Type": "multipart/form-data"
      },
      body: formData
    })
      .then(function(response) {
        return response.url;
      })
      .then(response => {
        this.setState({ html: response });
      });
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
            {this.state.html ? (
              <MyWebView
                onNavigationStateChange={this.onNavigationStateChange}
                ref="portmone"
                source={{
                  uri: this.state.html
                }}
              />
            ) : null}
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
  orderId: state.order.orderId,
  user: state.user.info
});

const mapDispatchToProps = dispatch => ({});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PortmoneScreen);
