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
  Image
} from "react-native";
import { scaleSize } from "../../helpers/scaleSize";
import LetterBar from "../common/LetterBar";
import SearchBar from "../common/SearchBar";

import { getAlphabet } from "../../store/actions/commonActions";

StatusBar.setBarStyle("light-content", true);
StatusBar.setBackgroundColor("rgba(0,0,0,0)");
const MAIN_BG = "../../static/img/background.png";

class HomeScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      categories: [],
      loading: true
    };
    Input.defaultProps.selectionColor = "#000";
  }

  componentWillMount() {
    fetch("http://kawaapi.gumione.pro/api/catalog/categories")
      .then(response => response.json())
      .then(responseJson => {
        this.setState(
          {
            categories: responseJson.categories,
            loading: false
          },
          function() {}
        );
      })
      .catch(error => {
        console.error(error);
      });
  }

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
      this.props.getAlphabet(1);
      return this.renderLoadingView();
    }
    return (
      <Container>
        <StatusBar barStyle="light-content" hidden={false} translucent={true} />
        <View style={{ flex: 1 }}>
          <Image
            source={require(MAIN_BG)}
            style={styles.background}
            resizeMode="cover"
          />
          <View style={styles.container}>
            <Content>
              <SearchBar
                placeholder={"Найти кофе"}
                style={{ marginBottom: scaleSize(20) }}
                navigation={this.props.navigation}
              />
              <LetterBar navigation={this.props.navigation} categoryId={0} />
              {/*<TouchableOpacity onPress={() => this.props.navigation.navigate("Catalog")}*/}
              {/*style={styles.cardFull}>*/}
              {/*<Image style={{height: 53, width: 53}}*/}
              {/*source={require("../../static/img/icon-basket.png")}/>*/}
              {/*<Text style={styles.cardContent}>История покупок</Text>*/}
              {/*</TouchableOpacity>*/}

              <View style={styles.cardDouble}>
                {this.state.categories.map(category =>
                  category.id == "4" ? (
                    <View
                      style={{ width: "100%", flexDirection: "row" }}
                      key={category.id}
                    >
                      <TouchableOpacity
                        onPress={() =>
                          this.props.navigation.navigate("CatalogScreen", {
                            categoryId: category.id,
                            categoryName: category.name
                          })
                        }
                        style={styles.cardItemHalf}
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
                          this.props.navigation.navigate("RecipesMainScreen")
                        }
                        style={styles.cardItemHalf}
                      >
                        <Image
                          style={{
                            height: scaleSize(69),
                            width: scaleSize(52),
                            marginBottom: 15
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
                        onPress={() =>
                          this.props.navigation.navigate("Catalog")
                        }
                        style={styles.cardItemHalf}
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
                        onPress={() =>
                          this.props.navigation.navigate("CatalogScreen", {
                            categoryId: category.id,
                            categoryName: category.name
                          })
                        }
                        style={styles.cardItemHalf}
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
                      onPress={() =>
                        this.props.navigation.navigate("CatalogScreen", {
                          categoryId: category.id,
                          categoryName: category.name
                        })
                      }
                      style={styles.cardItemHalf}
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
                              marginBottom: 15
                            }}
                            resizeMode="contain"
                            source={require("../../static/img/icon-zerno.png")}
                          />
                        ) : category.id === "5" ? (
                          <Image
                            style={{
                              height: scaleSize(50),
                              width: scaleSize(75),
                              marginBottom: 15
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

const mapDispatchToProps = dispatch => ({
  getAlphabet: lang => dispatch(getAlphabet(lang))
});

export default connect(
  null,
  mapDispatchToProps
)(HomeScreen);
