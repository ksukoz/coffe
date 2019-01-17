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
  AsyncStorage,
  Image,
  Keyboard,
  BackHandler
} from "react-native";
import { scaleSize } from "../../helpers/scaleSize";
import LetterBar from "../common/LetterBar";
import SearchBar from "../common/SearchBar";

import { searchFocused } from "../../store/actions/commonActions";
import { getDishes, clearProducts } from "../../store/actions/catalogActions";

StatusBar.setBarStyle("light-content", true);
StatusBar.setBackgroundColor("rgba(0,0,0,0)");
const MAIN_BG = "../../static/img/background.png";

class HomeOtherScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      search: "",
      categories: [],
      loading: true,
      focus: false
    };
    Input.defaultProps.selectionColor = "#000";
  }

  componentDidMount() {
    BackHandler.addEventListener("hardwareBackPress", this.handleBackPress);
    this.props.navigation.addListener("didFocus", payload => {
      if (this.props.focus) {
        this.props.searchFocused();
      }
    });
    this.props.getDishes();
    StatusBar.setBackgroundColor("rgba(0,0,0,0)");
    StatusBar.setTranslucent(true);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.dishes) {
      this.setState({ categories: nextProps.dishes, loading: false });
    }
    if (nextProps.focus || nextProps.focus === false) {
      this.setState({ focus: nextProps.focus });
    }
  }

  componentWillUnmount() {
    BackHandler.removeEventListener("hardwareBackPress", this.handleBackPress);
    Keyboard.removeListener("keyboardDidShow", this.keyboardDidShow);
  }

  handleBackPress = () => {
    this.props.navigation.pop();
    return true;
  };

  render() {
    return (
      <Container>
        <StatusBar
          barStyle="light-content"
          hidden={false}
          translucent={true}
          backgroundColor={`rgba(0,0,0,${this.state.focus ? 0.9 : 0})`}
        />
        <View style={{ flex: 1 }}>
          <View
            style={{
              position: "absolute",
              top: 0,
              bottom: 0,
              width: "100%",
              backgroundColor: `rgba(0,0,0,${this.state.focus ? 0.9 : 0})`,
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
              searchedValue={value => this.setState({ search: value })}
            />
            <View style={{ marginTop: scaleSize(75) }}>
              <LetterBar
                navigation={this.props.navigation}
                categoryId={"0"}
                lang={this.props.navigation.getParam("letter", "")}
              />
              {this.state.loading ? (
                <ActivityIndicator
                  style={{ marginTop: scaleSize(75) }}
                  size="large"
                  animating
                />
              ) : null}
            </View>
            <Content style={{ flex: 2 }}>
              <View style={styles.cardDouble}>
                {this.state.categories.map(category => (
                  <TouchableOpacity
                    key={category.id}
                    onPress={() => {
                      this.props.navigation.navigate("Catalog", {
                        categoryId: category.id,
                        searchPlaceholder: category.name,
                        letter: "",
                        search: this.state.search
                      });
                      this.props.clearProducts();
                    }}
                    style={styles.cardItemHalf}
                    activeOpacity={0.9}
                  >
                    <View style={{ alignItems: "center" }}>
                      {category.id === "13" ? (
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
                ))}
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
  dishes: state.catalog.dishes,
  focus: state.common.focus
});

const mapDispatchToProps = dispatch => ({
  getDishes: () => dispatch(getDishes()),

  clearProducts: () => dispatch(clearProducts()),
  searchFocused: () => dispatch(searchFocused())
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(HomeOtherScreen);
