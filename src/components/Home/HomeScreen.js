import React, { Component } from "react";
import { connect } from "react-redux";
import { Container, Content, Text, Input } from "native-base";
import {
  StyleSheet,
  View,
  StatusBar,
  TouchableOpacity,
  Dimensions,
  ActivityIndicator,
  ScrollView,
  Image,
  Keyboard,
  BackHandler,
  InteractionManager,
  Linking,
  Platform
} from "react-native";
import { scaleSize } from "../../helpers/scaleSize";
import LetterBar from "../common/LetterBar";
import SearchBar from "../common/SearchBar";

import {
  clearProducts,
  setCategories,
  setSubCategories,
  setDishes,
  getProductsParams,
  getCategories
} from "../../store/actions/catalogActions";

import {
  getAlphabet,
  searchFocused,
  clearAlphabet
} from "../../store/actions/commonActions";

import { logIn } from "../../store/actions/userActions";

StatusBar.setBarStyle("light-content", true);
StatusBar.setBackgroundColor("rgba(0,0,0,0)");
StatusBar.setTranslucent(true);
const MAIN_BG = "../../static/img/background.png";

class HomeScreen extends Component {
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
      categories: [],
      subcategories: false,
      dishes: false,
      loading: true,
      link: false,
      focus: false,
      productId: ""
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
    this.props.logIn("diec@ukr.net", "test");
    // this.props.logIn("info@wrevery.com", "testtest");
    this.props.navigation.addListener("didFocus", payload => {
      if (this.props.categories.length > 0) {
        this.setState({ loading: false });
      }
      if (this.props.focus) {
        this.props.searchFocused();
      }
      if (this.props.lang) {
        this.props.getAlphabet(this.props.lang, 0);
      }
      this.props.getCategories();
    });
    if (
      !this.state.link &&
      this.props.categories.length > 0 &&
      this.props.subcategories.length > 0 &&
      this.props.dishes.length > 0
    ) {
      this.setState({ link: true }, () => {
        if (Platform.OS === "android") {
          Linking.getInitialURL().then(url => {
            this.navigate(url);
          });
        } else {
          Linking.addEventListener("url", this.handleOpenURL);
        }
      });
    }
    StatusBar.setBackgroundColor("rgba(0,0,0,0)");
    StatusBar.setTranslucent(true);
  }

  componentDidUpdate(prevProps, prevState) {
    if (
      !this.state.link &&
      this.props.categories.length > 0 &&
      this.props.subcategories.length > 0 &&
      this.props.dishes.length > 0 &&
      this.props.token
    ) {
      this.setState({ link: true }, () => {
        if (Platform.OS === "android") {
          Linking.getInitialURL().then(url => {
            this.navigate(url);
          });
        } else {
          Linking.addEventListener("url", this.handleOpenURL);
        }
      });
    }
  }

  handleOpenURL = event => {
    // D
    this.navigate(event.url);
  };
  navigate = url => {
    // E
    const { navigate } = this.props.navigation;
    const route = url.replace(/.*?:\/\//g, "");
    const id = route.match(/\/([^\/]+)\/?$/)[1];
    const routeName = route.split("/")[0];

    if (routeName === "kawa-share.surge.sh") {
      navigate("ProductCard", { id });
    }
  };

  componentWillUnmount() {
    Linking.removeEventListener("url", this.handleOpenURL);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.categories) {
      this.setState({ loading: false });
    }
    if (nextProps.focus || nextProps.focus === false) {
      this.setState({ focus: nextProps.focus });
    }
  }

  renderLoadingView() {
    return (
      <ScrollView
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
            alignSelf: "center",
            height: 80
          }}
        />
      </ScrollView>
    );
  }

  handleBackPress = () => {
    this.props.navigation.pop();
    return true;
  };

  render() {
    if (this.state.loading) {
      return this.renderLoadingView();
    }
    return (
      <Container style={{ flex: 1 }}>
        <StatusBar
          barStyle="light-content"
          hidden={false}
          translucent={true}
          backgroundColor={`rgba(0,0,0,${this.state.focus ? 0.1 : 0})`}
        />
        <View style={{ flex: 1 }}>
          <View
            style={{
              position: "absolute",
              top: 0,
              bottom: 0,
              width: "100%",
              backgroundColor: `rgba(0,0,0,${this.state.focus ? 0.7 : 0})`,
              zIndex: this.state.focus ? 10 : 0
            }}
          />
          <Image
            source={require(MAIN_BG)}
            style={styles.background}
            resizeMode="cover"
          />
          <View style={styles.container}>
            <SearchBar
              placeholder={"Найти кофе"}
              style={{ marginBottom: scaleSize(20) }}
              navigation={this.props.navigation}
            />
            <View style={{ marginTop: scaleSize(75) }}>
              <LetterBar
                navigation={this.props.navigation}
                categoryId={"0"}
                style={{ opacity: this.state.focus ? 0.9 : 1 }}
              />
            </View>
            <Content style={{ flex: 2 }}>
              <View style={styles.cardDouble}>
                {this.props.categories.map(category =>
                  category.id == "4" ? (
                    <View
                      style={{ width: "100%", flexDirection: "row" }}
                      key={category.id}
                    >
                      <TouchableOpacity
                        onPress={() => {
                          this.props.navigation.push("Catalog", {
                            categoryId: category.id,
                            searchPlaceholder: category.name,
                            letter: "",
                            search: this.state.search
                          });
                          this.props.clearProducts();
                          this.props.getProductsParams(category.id);
                          this.props.clearAlphabet();
                        }}
                        style={styles.cardItemHalf}
                        activeOpacity={0.9}
                      >
                        <View style={{ alignItems: "center" }}>
                          <Image
                            style={{
                              height: scaleSize(79),
                              width: scaleSize(49),
                              marginBottom: 15
                            }}
                            resizeMode="contain"
                            source={require("../../static/img/icon-box.png")}
                          />

                          <Text
                            style={styles.cardContent}
                            adjustsFontSizeToFit={true}
                          >
                            {category.name}
                          </Text>
                        </View>
                      </TouchableOpacity>
                      <TouchableOpacity
                        onPress={() =>
                          this.props.navigation.push("RecipesMainScreen")
                        }
                        style={styles.cardItemHalf}
                        activeOpacity={0.9}
                      >
                        <Image
                          style={{
                            height: scaleSize(69),
                            width: scaleSize(52),
                            marginBottom: 15,
                            marginBottom: scaleSize(24)
                          }}
                          resizeMode="contain"
                          source={require("../../static/img/icon-menu.png")}
                        />
                        <Text style={styles.cardContent}>Рецепты</Text>
                      </TouchableOpacity>
                    </View>
                  ) : category.id == "7" ? (
                    <View
                      style={{ width: "100%", flexDirection: "row" }}
                      key={category.id}
                    >
                      <TouchableOpacity
                        onPress={() => this.props.navigation.push("Catalog")}
                        style={styles.cardItemHalf}
                        activeOpacity={0.9}
                      >
                        <Image
                          style={{
                            height: scaleSize(72),
                            width: scaleSize(72),
                            marginBottom: 15
                          }}
                          resizeMode="contain"
                          source={require("../../static/img/icon-heart.png")}
                        />
                        <Text style={styles.cardContent}>Гадание</Text>
                      </TouchableOpacity>
                      <TouchableOpacity
                        onPress={() => {
                          this.props.navigation.push("HomeOther", {
                            categoryId: "0",
                            search: this.state.search
                          });
                        }}
                        style={styles.cardItemHalf}
                        activeOpacity={0.9}
                      >
                        <View style={{ alignItems: "center" }}>
                          <Image
                            style={{
                              height: scaleSize(73),
                              width: scaleSize(44),
                              marginBottom: 15
                            }}
                            resizeMode="contain"
                            source={require("../../static/img/icon-coffee.png")}
                          />

                          <Text
                            style={styles.cardContent}
                            adjustsFontSizeToFit={true}
                          >
                            {category.name}
                          </Text>
                        </View>
                      </TouchableOpacity>
                    </View>
                  ) : (
                    <TouchableOpacity
                      key={category.id}
                      onPress={() => {
                        this.props.navigation.push("Catalog", {
                          categoryId: category.id,
                          searchPlaceholder: category.name,
                          letter: "",
                          search: this.state.search
                        });
                        this.props.clearProducts();
                        this.props.getProductsParams(category.id);
                        this.props.clearAlphabet();
                      }}
                      style={styles.cardItemHalf}
                      activeOpacity={0.9}
                    >
                      <View style={{ alignItems: "center" }}>
                        {category.id === "1" ? (
                          <Image
                            style={{
                              height: scaleSize(58),
                              width: scaleSize(72),
                              marginBottom: 15
                            }}
                            resizeMode="contain"
                            source={require("../../static/img/icon-molot.png")}
                          />
                        ) : category.id === "2" ? (
                          <Image
                            style={{
                              height: scaleSize(53),
                              width: scaleSize(72),
                              marginBottom: 15,
                              marginTop: scaleSize(20)
                            }}
                            resizeMode="contain"
                            source={require("../../static/img/icon-zerno.png")}
                          />
                        ) : category.id === "5" ? (
                          <Image
                            style={{
                              height: scaleSize(50),
                              width: scaleSize(75),
                              marginBottom: 15,
                              marginTop: scaleSize(8)
                            }}
                            resizeMode="contain"
                            source={require("../../static/img/icon-capsula.png")}
                          />
                        ) : category.id === "6" ? (
                          <Image
                            style={{
                              height: scaleSize(74),
                              width: scaleSize(74),
                              marginBottom: 15
                            }}
                            resizeMode="contain"
                            source={require("../../static/img/icon-fry.png")}
                          />
                        ) : category.id === "8" ? (
                          <Image
                            style={{
                              height: scaleSize(74),
                              width: scaleSize(74),
                              marginBottom: 15
                            }}
                            resizeMode="contain"
                            source={require("../../static/img/dishes.png")}
                          />
                        ) : category.id === "9" ? (
                          <Image
                            style={{
                              height: scaleSize(74),
                              width: scaleSize(74),
                              marginBottom: 15
                            }}
                            resizeMode="contain"
                            source={require("../../static/img/spices.png")}
                          />
                        ) : category.id === "10" ? (
                          <Image
                            style={{
                              height: scaleSize(74),
                              width: scaleSize(74),
                              marginBottom: 15
                            }}
                            resizeMode="contain"
                            source={require("../../static/img/juices.png")}
                          />
                        ) : category.id === "11" ? (
                          <Image
                            style={{
                              height: scaleSize(74),
                              width: scaleSize(74),
                              marginBottom: 15
                            }}
                            resizeMode="contain"
                            source={require("../../static/img/milk_products.png")}
                          />
                        ) : category.id === "12" ? (
                          <Image
                            style={{
                              height: scaleSize(74),
                              width: scaleSize(74),
                              marginBottom: 15
                            }}
                            resizeMode="contain"
                            source={require("../../static/img/syrups.png")}
                          />
                        ) : category.id === "13" ? (
                          <Image
                            style={{
                              height: scaleSize(74),
                              width: scaleSize(74),
                              marginBottom: 15
                            }}
                            resizeMode="contain"
                            source={require("../../static/img/coffeeware.png")}
                          />
                        ) : category.id === "14" ? (
                          <Image
                            style={{
                              height: scaleSize(74),
                              width: scaleSize(74),
                              marginBottom: 15
                            }}
                            resizeMode="contain"
                            source={require("../../static/img/cups_saucers_plates.png")}
                          />
                        ) : category.id === "15" ? (
                          <Image
                            style={{
                              height: scaleSize(74),
                              width: scaleSize(74),
                              marginBottom: 15
                            }}
                            resizeMode="contain"
                            source={require("../../static/img/cutlery.png")}
                          />
                        ) : category.id === "16" ? (
                          <Image
                            style={{
                              height: scaleSize(74),
                              width: scaleSize(74),
                              marginBottom: 15
                            }}
                            resizeMode="contain"
                            source={require("../../static/img/kitchenware.png")}
                          />
                        ) : (
                          <Image
                            style={{ height: 79, marginBottom: 15 }}
                            resizeMode="contain"
                            source={require("../../static/img/icon-heart.png")}
                          />
                        )}
                        <Text
                          style={styles.cardContent}
                          adjustsFontSizeToFit={true}
                        >
                          {category.name}
                        </Text>
                      </View>
                    </TouchableOpacity>
                  )
                )}
              </View>
            </Content>
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
  cardDouble: {
    flex: 1,
    flexDirection: "row",
    flexWrap: "wrap",
    marginLeft: 5,
    marginRight: 5,
    marginTop: 2,
    borderColor: "#fff",
    shadowColor: "#fff",
    justifyContent: "center"
  },
  cardFull: {
    marginLeft: "2%",
    marginRight: "1.5%",
    width: "96.5%",
    marginTop: 5,
    borderColor: "#fff",
    shadowColor: "#fff",
    backgroundColor: "rgba(255,255,255, 0.2)",
    alignItems: "center",
    height: Dimensions.get("window").width * 0.3,
    borderRadius: 5,
    justifyContent: "space-around",
    flexWrap: "wrap",
    resizeMode: "contain"
  },
  cardItemHalf: {
    width: "49%",
    backgroundColor: "rgba(255,255,255, 0.2)",
    marginLeft: "1%",
    marginTop: 3,
    alignItems: "center",
    height: Dimensions.get("window").width * 0.5 - 10,
    borderRadius: 5,
    justifyContent: "center"
  },
  cardContent: {
    color: "#fff",
    flexWrap: "wrap",
    textAlign: "center"
  },
  container: {
    flex: 1
  }
});

const mapStateToProps = state => ({
  categories: state.catalog.categories,
  subcategories: state.catalog.subcategories,
  dishes: state.catalog.dishes,
  focus: state.common.focus,
  letters: state.common.letters,
  token: state.user.token
});

const mapDispatchToProps = dispatch => ({
  logIn: (login, password) => dispatch(logIn(login, password)),
  setCategories: () => dispatch(setCategories()),
  getCategories: () => dispatch(getCategories()),
  setSubCategories: () => dispatch(setSubCategories()),
  setDishes: () => dispatch(setDishes()),
  getProductsParams: category => dispatch(getProductsParams(category)),
  clearProducts: () => dispatch(clearProducts()),
  clearAlphabet: () => dispatch(clearAlphabet()),
  getAlphabet: lang => dispatch(getAlphabet(lang)),
  searchFocused: () => dispatch(searchFocused())
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(HomeScreen);
