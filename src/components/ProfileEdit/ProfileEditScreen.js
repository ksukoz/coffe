import React, { Component } from "react";
import {
  Container,
  Content,
  Text,
  Item,
  Button,
  Form,
  Input
} from "native-base";
import {
  StyleSheet,
  View,
  ImageBackground,
  Image,
  ScrollView,
  StatusBar,
  TouchableOpacity,
  Dimensions,
  BackHandler,
  ActivityIndicator,
  AsyncStorage
} from "react-native";
Input.defaultProps.selectionColor = "#ea9308";
TextInputMask.defaultProps.selectionColor = "#ea9308";

import RadioGroup, { Radio } from "react-native-radio-input";
import TextInputMask from "react-native-text-input-mask";
import DatePicker from "react-native-datepicker";
import KawaIcon from "./../KawaIcon";

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
  cardDouble: {
    flex: 1,
    flexDirection: "row",
    color: "#fff",
    marginLeft: 10,
    marginRight: 5,
    marginTop: 2,
    shadowColor: "#fff",
    justifyContent: "center"
  },
  cardFull: {
    marginLeft: 5,
    marginRight: 5,
    marginTop: 5,
    paddingBottom: 10,
    paddingLeft: 20,
    paddingRight: 20,
    color: "#000000",
    textAlign: "center",
    shadowColor: "#fff",
    backgroundColor: "rgba(255,255,255, 0.7)",
    alignItems: "flex-start",
    borderRadius: 5,
    justifyContent: "space-around",
    resizeMode: "contain"
  },
  cardFullFirst: {
    marginLeft: 5,
    marginRight: 5,
    marginTop: 20,
    paddingBottom: 10,
    paddingLeft: 20,
    paddingRight: 20,
    color: "#000000",
    textAlign: "center",
    shadowColor: "#fff",
    backgroundColor: "rgba(255,255,255, 0.7)",
    alignItems: "flex-start",
    borderRadius: 5,
    justifyContent: "space-around",
    resizeMode: "contain"
  },
  cardFullCity: {
    marginLeft: 5,
    marginRight: 5,
    marginTop: 5,
    paddingBottom: 10,
    paddingLeft: 0,
    paddingRight: 0,
    color: "#000000",
    textAlign: "center",
    shadowColor: "#fff",
    backgroundColor: "rgba(255,255,255, 0.7)",
    alignItems: "flex-start",
    borderRadius: 5,
    justifyContent: "space-around",
    resizeMode: "contain"
  },
  cardFullLast: {
    marginLeft: 5,
    marginRight: 5,
    marginTop: 5,
    marginBottom: 40,
    paddingBottom: 10,
    color: "#000000",
    textAlign: "center",
    shadowColor: "#fff",
    backgroundColor: "rgba(255,255,255, 0.7)",
    alignItems: "flex-start",
    borderRadius: 5,
    justifyContent: "space-around",
    resizeMode: "contain"
  },
  cardItemHalf: {
    width: "50%",
    backgroundColor: "rgba(255,255,255, 0.2)",
    marginRight: 5,
    marginTop: 3,
    alignItems: "center",
    height: Dimensions.get("window").width * 0.5 - 10,
    borderRadius: 5,
    justifyContent: "flex-end",
    resizeMode: "contain",
    paddingBottom: "20%"
  },
  cardContent: {
    color: "#000000"
  },
  container: {
    flex: 1
  },
  head: {
    marginTop: 35,
    display: "flex",
    flex: 1,
    color: "#ffffff"
  },
  default: {
    color: "#fff"
  },
  alphabet: {
    color: "#fff",
    padding: 10,
    fontSize: 13,
    paddingRight: 25
  },
  search: {
    backgroundColor: "#fff",
    marginRight: 15,
    marginLeft: 15,
    height: 40,
    paddingLeft: 5,
    paddingRight: 10
  },
  searchIcon: {
    position: "absolute",
    right: 10,
    paddingLeft: 10,
    paddingRight: 10,
    paddingTop: 10,
    paddingBottom: 10
  },
  searchInput: {
    fontSize: 13
  },
  alphabetMenu: {
    flex: 1,
    flexDirection: "row",
    marginLeft: 10,
    marginTop: 10
  },
  iconMenu: {
    color: "#ffffff",
    fontSize: 22,
    fontWeight: "bold"
  },
  profileInput: {
    fontSize: 20,
    borderBottomColor: "#89a6aa",
    borderBottomWidth: 1,
    width: "100%",
    paddingLeft: 0
  },
  profileInputPhone: {
    fontSize: 20,
    borderBottomColor: "#89a6aa",
    borderBottomWidth: 1,
    width: "100%",
    paddingLeft: 0,
    paddingTop: 10,
    paddingBottom: 10
  },
  profileInputPhoneFocused: {
    fontSize: 20,
    borderBottomColor: "#ea9308",
    borderBottomWidth: 1,
    width: "100%",
    paddingLeft: 0,
    paddingTop: 10,
    paddingBottom: 10
  },
  profileInputFocused: {
    fontSize: 20,
    borderBottomColor: "#ea9308",
    borderBottomWidth: 1,
    width: "100%",
    paddingLeft: 0
  },
  birthdayInput: {
    borderBottomColor: "#89a6aa",
    borderBottomWidth: 1,
    width: "100%",
    paddingLeft: 0,
    paddingRight: 0,
    marginLeft: 0,
    marginRight: 0
  },
  profileInputCalendar: {
    fontSize: 20,
    borderBottomColor: "#89a6aa",
    borderBottomWidth: 1,
    width: "100%",
    paddingLeft: 0
  }
});

StatusBar.setBarStyle("light-content", true);
StatusBar.setBackgroundColor("rgba(0,0,0,0)");
const MAIN_BG = "../../static/img/background.png";

export default class ProfileEditScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      birthday: "",
      loading: false,
      currentCity: null,
      isFocusedName: false,
      isFocusedEmail: false,
      phone: "",
      region_name: "Выберите город",
      city_name: "Не указан"
    };
  }

  onFocus = name => {
    if (name == "name") {
      this.setState({
        isFocusedName: true
      });
    }
    if (name == "email") {
      this.setState({
        isFocusedEmail: true
      });
    }
    if (name == "phone") {
      this.setState({
        isFocusedPhone: true
      });
    }
  };

  onUnFocus = name => {
    if (name == "name") {
      this.setState({
        isFocusedName: false
      });
    }
    if (name == "email") {
      this.setState({
        isFocusedEmail: false
      });
    }
    if (name == "phone") {
      this.setState({
        isFocusedPhone: false
      });
    }
  };

  componentWillMount() {
    BackHandler.addEventListener("hardwareBackPress", this.handleBackPress);
    this.retrieveData("user_region_name");
    this.retrieveData("user_city_name");

    this.setState({
      loading: false
    });
  }

  componentWillUnmount() {
    BackHandler.removeEventListener("hardwareBackPress", this.handleBackPress);
  }

  handleBackPress = () => {
    this.props.navigation.navigate("Profile");
    return true;
  };

  setBirthday(date) {
    this.setState({ birthday: date });
  }

  retrieveData = async name => {
    try {
      const value = await AsyncStorage.getItem(name);

      if (value) {
        if (name == "user_region_name") {
          this.setState({
            region_name: value
          });
        } else if (name == "user_city_name") {
          this.setState({
            city_name: value
          });
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
            height: 80
          }}
        />
      </View>
    );
  }

  render() {
    if (this.state.loading) {
      return this.renderLoadingView();
    }
    return (
      <Container style={styles.default}>
        <StatusBar barStyle="light-content" hidden={false} translucent={true} />
        <ScrollView>
          <Image source={require(MAIN_BG)} style={styles.background} />
          <View style={styles.container}>
            <Content>
              <Form>
                <View style={styles.head}>
                  <Item style={{ borderBottomWidth: 0, color: "#fff" }}>
                    <Button
                      transparent
                      onPress={() => this.props.navigation.navigate("Profile")}
                    >
                      <KawaIcon
                        style={{
                          color: "#fff",
                          paddingLeft: 5,
                          paddingRight: 20
                        }}
                        name={"arrow-back2"}
                        size={20}
                      />
                    </Button>
                    <Text
                      style={{
                        color: "#ffffff",
                        fontSize: 20,
                        fontWeight: "bold"
                      }}
                    >
                      Редактировать
                    </Text>
                    <TouchableOpacity
                      style={styles.searchIcon}
                      onPress={() => this.props.navigation.navigate("Profile")}
                    >
                      <Image
                        style={{ width: 20, height: 20 }}
                        source={require("../../static/img/done.png")}
                      />
                    </TouchableOpacity>
                  </Item>
                </View>
                <View style={styles.cardFullFirst}>
                  <Text style={{ fontSize: 13, paddingTop: 20 }}>
                    Имя, Фамилия
                  </Text>
                  <Input
                    onBlur={() => this.onUnFocus("name")}
                    onFocus={() => this.onFocus("name")}
                    style={
                      this.state.isFocusedName
                        ? styles.profileInputFocused
                        : styles.profileInput
                    }
                  >
                    Максим Ефимов
                  </Input>
                  <Text style={{ fontSize: 13, paddingTop: 25 }}>
                    Эл. почта
                  </Text>
                  <Input
                    onBlur={() => this.onUnFocus("email")}
                    onFocus={() => this.onFocus("email")}
                    style={
                      this.state.isFocusedEmail
                        ? styles.profileInputFocused
                        : styles.profileInput
                    }
                  >
                    efimoff@gmail.com
                  </Input>
                </View>
                <View style={styles.cardFull}>
                  <Text
                    style={{ fontSize: 13, paddingTop: 20, paddingLeft: 0 }}
                  >
                    Телефон
                  </Text>
                  <TextInputMask
                    placeholder={"+38 (___) ___ __ __"}
                    placeholderTextColor="#000"
                    keyboardType="phone-pad"
                    mask={"+38 ([000]) [000] [00] [00]"}
                    onBlur={() => this.onUnFocus("phone")}
                    onFocus={() => this.onFocus("phone")}
                    style={
                      this.state.isFocusedPhone
                        ? styles.profileInputPhoneFocused
                        : styles.profileInputPhone
                    }
                  >
                    +38 (
                  </TextInputMask>
                </View>
                <View style={styles.cardFullCity}>
                  <Text
                    style={{
                      fontSize: 13,
                      paddingTop: 20,
                      paddingLeft: 20,
                      paddingRight: 20
                    }}
                  >
                    Город
                  </Text>
                  <View
                    style={{
                      width: "100%",
                      borderBottomWidth: 0,
                      paddingLeft: 0,
                      paddingRight: 0,
                      marginLeft: 0,
                      marginRight: 0
                    }}
                  >
                    <TouchableOpacity
                      onPress={() =>
                        this.props.navigation.navigate("SelectRegion", {
                          linkName: "ProfileEdit"
                        })
                      }
                      style={{ width: "100%", flexDirection: "row" }}
                    >
                      <Text
                        style={{
                          paddingLeft: 20,
                          paddingRight: 20,
                          width: "100%",
                          paddingTop: 5
                        }}
                      >
                        {this.state.city_name}
                      </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      onPress={() =>
                        this.props.navigation.navigate("SelectRegion")
                      }
                      style={{
                        paddingLeft: 20,
                        paddingRight: 20,
                        width: "100%",
                        flexDirection: "row"
                      }}
                    >
                      <Text
                        onFocus={() =>
                          this.props.navigation.navigate("SelectRegion", {
                            linkName: "ProfileEdit"
                          })
                        }
                        style={{
                          paddingTop: 5,
                          paddingBottom: 0,
                          height: 30,
                          fontSize: 13,
                          width: "100%",
                          paddingLeft: 0,
                          marginBottom: 0
                        }}
                      >
                        {this.state.region_name}
                      </Text>
                      <KawaIcon
                        style={{
                          color: "#302c23",
                          position: "absolute",
                          right: 20
                        }}
                        name={"arrow-next"}
                        size={14}
                      />
                    </TouchableOpacity>
                  </View>
                </View>
                <View style={styles.cardFull}>
                  <Text
                    style={{ fontSize: 13, paddingTop: 20, paddingBottom: 5 }}
                  >
                    Пол
                  </Text>
                  <RadioGroup
                    getChecked={function() {}}
                    RadioGroupStyle={{ flexDirection: "row" }}
                    RadioStyle={{
                      paddingLeft: 0,
                      marginRight: 20,
                      marginLeft: 0
                    }}
                  >
                    <Radio label={"Мужской"} value={"male"} />
                    <Radio label={"Женский"} value={"shemale"} />
                  </RadioGroup>
                </View>
                <View style={styles.cardFullLast}>
                  <Text
                    style={{
                      fontSize: 13,
                      paddingTop: 20,
                      paddingLeft: 20,
                      paddingRight: 20
                    }}
                  >
                    Дата рождения
                  </Text>
                  <Item
                    style={{
                      paddingLeft: 20,
                      paddingRight: 20,
                      marginLeft: 0,
                      borderBottomWidth: 0
                    }}
                  >
                    <DatePicker
                      locale={"ru"}
                      style={styles.birthdayInput}
                      date={this.state.birthday}
                      mode="date"
                      placeholder="Выберите дату"
                      format="DD.MM.YYYY"
                      confirmBtnText="Выбрать"
                      cancelBtnText="Отменить"
                      showIcon={false}
                      androidMode={"spinner"}
                      customStyles={{
                        dateText: {
                          fontSize: 20
                        },
                        dateInput: {
                          borderLeftWidth: 0,
                          borderRightWidth: 0,
                          borderTopWidth: 0,
                          borderBottomWidth: 0,
                          marginLeft: 0,
                          marginRight: 0,
                          alignItems: "flex-start"
                        }
                      }}
                      onDateChange={date => {
                        this.setBirthday(date);
                      }}
                    />
                  </Item>
                  <Text
                    style={{
                      paddingLeft: 20,
                      paddingRight: 20,
                      fontSize: 13,
                      paddingTop: 5,
                      paddingBottom: 15
                    }}
                  >
                    Укажите дату своего рождения и мы обязательно поздравим Вас
                  </Text>
                </View>
              </Form>
            </Content>
          </View>
        </ScrollView>
      </Container>
    );
  }
}
