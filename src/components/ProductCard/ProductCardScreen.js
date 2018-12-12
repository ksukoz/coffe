import React, { Component } from "react";
import {
  StyleSheet,
  View,
  ScrollView,
  StatusBar,
  TouchableOpacity,
  Dimensions,
  ActivityIndicator,
  Image,
  FlatList,
  Alert,
  AsyncStorage
} from "react-native";
import {
  Container,
  Content,
  Text,
  Input,
  Item,
  Icon,
  Button
} from "native-base";
import KawaIcon from "../KawaIcon";
import SearchBar from "../common/SearchBar";

StatusBar.setBarStyle("light-content", true);
StatusBar.setBackgroundColor("rgba(0,0,0,0)");
const MAIN_BG = "../../static/img/background.png";

export default class ProductCardScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      alphabet: [],
      products: [],
      search: "",
      page: 0,
      english: true,
      loading: true
    };
    Input.defaultProps.selectionColor = "#000";
  }

  componentDidMount() {
    fetch("http://kawaapi.gumione.pro/api/catalog/letters/1")
      .then(response => response.json())
      .then(responseJson => {
        this.setState(
          {
            alphabet: responseJson.letters
          },
          function() {}
        );
      })
      .catch(error => {
        console.error(error);
      });

    this.fetchData();
  }

  fetchData() {
    fetch(
      "http://kawaapi.gumione.pro/api/catalog/items/" +
        `${this.props.navigation.getParam("categoryId", "0")}` +
        "/10/" +
        `${this.state.page}`
    )
      .then(response => response.json())
      .then(responseJson => {
        this.setState(
          state => ({
            products: [...state.products, ...responseJson.items],
            loading: false
          }),
          function() {}
        );
      })
      .catch(error => {
        console.error(error);
      });
  }

  handleSearch = text => {
    this.setState(
      state => ({ page: 0, search: text }),
      () => {
        fetch(
          "http://kawaapi.gumione.pro/api/catalog/search/" +
            `${this.state.search}` +
            "/0/both/10/" +
            `${this.state.page}`
        )
          .then(response => response.json())
          .then(responseJson => {
            this.setState({
              products: responseJson.items,
              loading: false
            }),
              function() {};
          })
          .catch(error => {
            console.error(error);
          });
      }
    );
  };

  handleEnd = () => {
    this.setState(state => ({ page: state.page + 10 }), () => this.fetchData());
  };

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
  render() {
    return (
      <Container style={styles.default}>
        <StatusBar barStyle="light-content" hidden={false} translucent={true} />
        <Image source={require(MAIN_BG)} style={styles.background} />
        <View style={styles.container}>
          <Content>
            <SearchBar
              catalogId={this.props.navigation.getParam("categoryId", "0")}
              placeholder={this.props.navigation.getParam(
                "searchPlaceholder",
                "Найти кофе"
              )}
            />
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
          </Content>
        </View>
      </Container>
    );
  }
}

const styles = {
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
    height: 130
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
  },
  product: {
    backgroundColor: "rgba(255,255,255, 0.7)",
    marginRight: 12,
    marginLeft: 12,
    marginBottom: 7,
    flexDirection: "row",
    paddingTop: 6,
    paddingBottom: 6,
    paddingRight: 10,
    borderRadius: 8
  },
  productImg: {
    width: 70,
    height: 120,
    marginRight: 12,
    marginLeft: 12,
    marginTop: 4
  },
  imgHit: {
    position: "absolute",
    top: -2,
    left: 5,
    backgroundColor: "#ef5350",
    zIndex: 2,
    alignItems: "center",
    justifyContent: "center",
    width: 43,
    height: 17,
    borderTopLeftRadius: 10,
    borderBottomRightRadius: 10
  },
  productSort: {
    color: "#48433b",
    marginBottom: 1
  },
  productRoast: {
    color: "#48433b"
  },
  productName: {
    marginBottom: 3,
    color: "#010101"
  },
  starIcon: {
    color: "#ffea00",
    marginRight: 5
  },
  productRating: {
    color: "#48433b",
    fontSize: 13
  },
  numberOfReviews: {
    color: "#48433b",
    fontSize: 13,
    marginTop: -2
  },
  cartIcon: {
    color: "#48433b"
  },
  btn: {
    backgroundColor: "#ea9308",
    borderRadius: 3
  },
  btnText: {
    fontSize: 12,
    color: "#f8f8f8",
    paddingTop: 5,
    paddingBottom: 5,
    paddingRight: 7,
    paddingLeft: 7,
    fontWeight: "300"
  }
};
