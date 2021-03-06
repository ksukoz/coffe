import React, { Component } from "react";
import { connect } from "react-redux";
import { Container, Content, Input, CheckBox } from "native-base";
import {
  View,
  StatusBar,
  Dimensions,
  Image,
  Text,
  TouchableOpacity,
  BackHandler,
  StyleSheet
} from "react-native";

import { scaleSize } from "../../helpers/scaleSize";
import HeaderBar from "../common/HeaderBar";

import { getPayerInfo } from "../../store/actions/orderActions";

import RadioGroup, { Radio } from "react-native-radio-input";

import TextInputMask from "react-native-text-input-mask";

Input.defaultProps.selectionColor = "#ea9308";
TextInputMask.defaultProps.selectionColor = "#ea9308";

StatusBar.setBarStyle("light-content", true);
StatusBar.setBackgroundColor("rgba(0,0,0,0)");
const MAIN_BG = "../../static/img/background.png";

class PaymentScreen extends Component {
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
      name: "",
      number: "",
      account: "",
      mfo: "",
      add: "",
      email: "",
      type: 1
    };
    Input.defaultProps.selectionColor = "#000";
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
  }

  componentWillUnmount() {}

  onPressHandler = () => {
    const { params } = this.props.navigation.state;
    this.props.getPayerInfo({
      ...params,
      fio: this.state.name,
      inn: this.state.number,
      account: this.state.account,
      mfo: this.state.mfo,
      note: this.state.add,
      email: this.state.email,
      ownership_type: this.state.type
    });
  };

  changeHandler = (value, name) => {
    this.setState({ [name]: value });
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
          backgroundColor={`rgba(0,0,0,${
            this.state.focus ? 0.1 : this.state.opacity ? 0.7 : 0
          })`}
        />
        <View style={{ flex: 1 }}>
          <Image source={require(MAIN_BG)} style={styles.background} />
          <HeaderBar navigation={this.props.navigation} title={"Реквизиты"} />
          <Content
            style={{
              marginLeft: scaleSize(8),
              marginRight: scaleSize(8),
              marginTop: scaleSize(20)
            }}
          >
            <View style={styles.block}>
              <Text style={styles.defaultSmall}>
                Форма собственности плательщика
              </Text>
              <RadioGroup
                getChecked={value => this.setState({ type: value })}
                RadioGroupStyle={{
                  flexDirection: "row",
                  marginLeft: scaleSize(-5)
                }}
                coreStyle={{ fontSize: scaleSize(18) }}
                RadioStyle={{
                  paddingLeft: 0,
                  marginRight: scaleSize(30),
                  marginLeft: 0
                }}
                labelStyle={{
                  fontSize: scaleSize(16),
                  color: "#302c23"
                }}
              >
                <Radio label={"Юридическое"} value={1} />
                <Radio label={"Физическое"} value={2} />
              </RadioGroup>
            </View>
            <View style={[styles.block, { marginBottom: scaleSize(24) }]}>
              <Text style={styles.defaultSmall}>
                {this.state.type === 1
                  ? "Название предприятия"
                  : "ФИО предпринимателя"}
              </Text>
              <Input
                style={styles.profileInput}
                placeholder={
                  this.state.type === 1 ? "" : "Фамилия Имя Отчество"
                }
                value={this.state.name}
                onChangeText={value => this.changeHandler(value, "name")}
              />
              <Text style={styles.defaultSmall}>
                {this.state.type === 1
                  ? "ЕГРПОУ предприятия"
                  : "ИНН предпринимателя"}
              </Text>
              <Input
                style={styles.profileInput}
                placeholder={
                  this.state.type === 1 ? "" : "Номер налогоплательщика"
                }
                value={this.state.number}
                onChangeText={value => this.changeHandler(value, "number")}
                keyboardType="phone-pad"
                maxLength={this.state.type === 1 ? 8 : 10}
              />
              <Text style={styles.defaultSmall}>Расчетный счет</Text>
              <Input
                style={styles.profileInput}
                placeholder={"Расчетный счет"}
                value={this.state.account}
                onChangeText={value => this.changeHandler(value, "account")}
                keyboardType="phone-pad"
              />
              <Text style={styles.defaultSmall}>МФО</Text>
              <Input
                style={styles.profileInput}
                placeholder={"Код банка в котором открыт счет"}
                value={this.state.mfo}
                onChangeText={value => this.changeHandler(value, "mfo")}
                keyboardType="phone-pad"
                maxLength={6}
              />
              <Text style={styles.defaultSmall}>Примечание</Text>
              <Input
                style={styles.profileInput}
                placeholder={"Будет включено в назначение платежа"}
                value={this.state.add}
                onChangeText={value => this.changeHandler(value, "add")}
              />
              <Text style={styles.defaultSmall}>Электронная почта</Text>
              <Input
                style={styles.profileInput}
                placeholder={"На этот адрес будет отправлен счет"}
                value={this.state.email}
                onChangeText={value => this.changeHandler(value, "email")}
                textContentType="emailAddress"
                keyboardType="email-address"
              />
            </View>
            <TouchableOpacity
              onPress={() => this.onPressHandler()}
              style={styles.btn}
              activeOpacity={0.9}
            >
              <Text style={styles.btnText}>{"Отправить".toUpperCase()}</Text>
            </TouchableOpacity>
          </Content>
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
  defaultText: {
    fontSize: scaleSize(16),
    color: "#302c23"
  },
  defaultSmall: {
    fontSize: scaleSize(12),
    color: "#302c23"
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
  btn: {
    alignItems: "center",
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
  }
});

const mapStateToProps = state => ({
  // city: state.common.city,
});

const mapDispatchToProps = dispatch => ({
  getPayerInfo: params => dispatch(getPayerInfo(params))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PaymentScreen);
