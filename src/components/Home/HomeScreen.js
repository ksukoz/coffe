import React, { Component } from "react";
import {
  Container,
  Content,
  Text,
  Input,
  Item,
  Icon,
  Button
} from "native-base";
import {
  StyleSheet,
  View,
  ImageBackground,
  ScrollView,
  StatusBar,
  TouchableOpacity,
  Dimensions,
  ActivityIndicator,
  Image,
  AsyncStorage,
  Alert
} from "react-native";
import KawaIcon from "../KawaIcon";

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
    color: "#fff",
    marginLeft: 5,
    marginRight: 5,
    marginTop: 2,
    borderColor: "#fff",
    shadowColor: "#fff",
    justifyContent: "center"
  },
  cardDoubleLast: {
    flex: 1,
    flexDirection: "row",
    color: "#fff",
    marginLeft: 5,
    marginRight: 5,
    marginTop: 2,
    borderColor: "#fff",
    shadowColor: "#fff",
    justifyContent: "center",
    marginBottom: 20
  },
  cardFull: {
    marginLeft: "2%",
    marginRight: "1.5%",
    width: "96.5%",
    marginTop: 5,
    color: "#fff",
    textAlign: "center",
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
    justifyContent: "center",
    textAlign: "center",
    resizeMode: "contain"
  },
  cardContent: {
    color: "#fff",
    flexWrap: "wrap",
    textAlign: "center"
  },
  container: {
    flex: 1
  },
  head: {
    marginTop: 35
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
    paddingTop: 3,
    color: "#58554e"
  },
  codeIcon: {
    marginRight: 10,
    color: "#58554e"
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
    color: "#58554e",
    marginBottom: 5
  }
});

StatusBar.setBarStyle("light-content", true);
StatusBar.setBackgroundColor("rgba(0,0,0,0)");
const MAIN_BG = "../../static/img/background.png";

export default class HomeScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      alphabet: [],
      categories: [],
      english: true,
      loading: true
    };
    Input.defaultProps.selectionColor = "#000";
  }

  componentWillMount() {
    fetch("http://kawaapi.gumione.pro/api/catalog/letters/1")
      .then(response => response.json())
      .then(responseJson => {
        this.setState(
          {
            alphabet: responseJson.letters,
            loading: false
          },
          function() {}
        );
      })
      .catch(error => {
        console.error(error);
      });

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

  changeAlphabet() {
    if (this.state.english) {
      return fetch("http://kawaapi.gumione.pro/api/catalog/letters/2")
        .then(response => response.json())
        .then(responseJson => {
          this.setState(
            {
              alphabet: responseJson.letters,
              english: false
            },
            function() {}
          );
        })
        .catch(error => {
          console.error(error);
        });
    } else {
      return fetch("http://kawaapi.gumione.pro/api/catalog/letters/1")
        .then(response => response.json())
        .then(responseJson => {
          this.setState(
            {
              alphabet: responseJson.letters,
              english: true
            },
            function() {}
          );
        })
        .catch(error => {
          console.error(error);
        });
    }
  }

  focus() {
    this.refs._randomName.focus();
  }

  render() {
    if (this.state.loading) {
      return this.renderLoadingView();
    }
    return (
      <Container style={styles.default}>
        <StatusBar barStyle="light-content" hidden={false} translucent={true} />
        <View style={{ flex: 1 }}>
          <Image
            source={require(MAIN_BG)}
            style={styles.background}
            resizeMode="cover"
          />
          <View style={styles.container}>
            <Content>
              <View style={styles.head}>
                <Item style={styles.search} rounded>
                  <Button
                    transparent
                    onPress={() => this.props.navigation.openDrawer()}
                  >
                    <Icon style={styles.iconMenu} name="ios-menu" />
                  </Button>
                  <Icon style={{ color: "#58554e" }} name="ios-search" />
                  <Input
                    style={styles.searchInput}
                    placeholderTextColor="#becdcf"
                    placeholder="Найти кофе"
                  />
                  <KawaIcon style={styles.codeIcon} size={20} name="code" />
                </Item>
              </View>
              <ScrollView horizontal={true} style={styles.alphabetMenu}>
                {this.state.alphabet.map(item => {
                  return (
                    <Text
                      onLongPress={() => this.changeAlphabet()}
                      key={item.letter}
                      style={styles.alphabet}
                    >
                      {item.letter}
                    </Text>
                  );
                })}
              </ScrollView>
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
                            style={{ height: 65, marginBottom: 15 }}
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
                          style={{ height: 69, width: 52, marginBottom: 15 }}
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
                          style={{ height: 72, width: 72, marginBottom: 15 }}
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
                            style={{ height: 70, marginBottom: 15 }}
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
                            style={{ height: 50, marginBottom: 15 }}
                            resizeMode="contain"
                            source={require("../../static/img/icon-molot.png")}
                          />
                        ) : category.id === "2" ? (
                          <Image
                            style={{ height: 53, marginBottom: 15 }}
                            resizeMode="contain"
                            source={require("../../static/img/icon-zerno.png")}
                          />
                        ) : category.id === "4" ? (
                          <Image
                            style={{ height: 79, marginBottom: 15 }}
                            resizeMode="contain"
                            source={require("../../static/img/icon-box.png")}
                          />
                        ) : category.id === "5" ? (
                          <Image
                            style={{ height: 55, marginBottom: 15 }}
                            resizeMode="contain"
                            source={require("../../static/img/icon-capsula.png")}
                          />
                        ) : category.id === "6" ? (
                          <Image
                            style={{ height: 55, marginBottom: 15 }}
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
