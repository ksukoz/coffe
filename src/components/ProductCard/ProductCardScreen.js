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
  AsyncStorage,
  Modal,
  TouchableHighlight,
  WebView
} from "react-native";
import {
  Container,
  Content,
  Text,
  Input,
  Item,
  Icon,
  Button,
  Tab,
  Tabs,
  Header,
  TabHeading,
  ScrollableTab,
  Accordion,
  Card,
  CardItem,
  Body
} from "native-base";
import KawaIcon from "../KawaIcon";
import SearchBar from "../common/SearchBar";
import AboutProduct from "./AboutProduct";

StatusBar.setBarStyle("light-content", true);
StatusBar.setBackgroundColor("rgba(0,0,0,0)");
const MAIN_BG = "../../static/img/background.png";

const SCREEN_WIDTH = Dimensions.get("window").width;
const SCREEN_HEIGHT = Dimensions.get("window").height;

export default class ProductCardScreen extends Component {
  constructor(props) {
    super(props);

    this.state = {
      currentTab: 0,
      productItem: null,
      search: "",
      page: 0,
      english: true,
      loading: true
    };
    Input.defaultProps.selectionColor = "#000";
  }

  componentDidMount() {
    this.fetchData();
  }

  fetchData() {
    fetch(
      "http://kawaapi.gumione.pro/api/catalog/item/" +
        `${this.props.navigation.getParam("productId", "0")}`
    )
      .then(response => response.json())
      .then(responseJson => {
        // console.error(responseJson);
        this.setState(
          state => ({
            productItem: responseJson.item,
            loading: false
          }),
          function() {}
        );
      })
      .catch(error => {
        console.error(error);
      });
  }

  render() {
    const { productItem } = this.state;

    return (
      <Container style={styles.default}>
        <StatusBar barStyle="light-content" hidden={false} translucent={true} />
        <Image source={require(MAIN_BG)} style={styles.background} />
        <Content style={{ height: SCREEN_HEIGHT }}>
          <SearchBar
            catalogId={this.props.navigation.getParam("categoryId", "0")}
            placeholder={this.props.navigation.getParam(
              "searchPlaceholder",
              "Найти кофе"
            )}
            style={{ marginBottom: 20 }}
          />
          <View>
            <Tabs
              transparent
              tabBarUnderlineStyle={{
                backgroundColor: "transparent"
              }}
              renderTabBar={() => (
                <ScrollableTab
                  backgroundColor={"transparent"}
                  style={{ borderWidth: 0 }}
                />
              )}
              initialPage={this.state.currentTab}
              onChangeTab={({ i }) => this.setState({ currentTab: i })}
            >
              <Tab
                heading={
                  <TabHeading
                    style={
                      this.state.currentTab === 0
                        ? [
                            styles.productTabHeading,
                            styles.productActiveTabHeading
                          ]
                        : styles.productTabHeading
                    }
                  >
                    <Text
                      style={[
                        {
                          color:
                            this.state.currentTab === 0 ? "#fff" : "#c9c0b6",
                          backgroundColor:
                            this.state.currentTab === 0
                              ? "rgba(255,255,255,.4)"
                              : "transparent"
                        },
                        styles.tabText
                      ]}
                    >
                      {"О товаре".toUpperCase()}
                    </Text>
                  </TabHeading>
                }
                style={styles.productTab}
              >
                <AboutProduct
                  productItem={productItem}
                  onPressDelivery={() =>
                    this.props.navigation.navigate("Delivery")
                  }
                  onPressOtherProducts={() =>
                    this.props.navigation.navigate("CatalogScreen", {
                      categoryId: 7
                    })
                  }
                  categoryName={this.props.navigation.getParam(
                    "categoryName",
                    "0"
                  )}
                />
              </Tab>
              <Tab
                heading={
                  <TabHeading
                    style={
                      this.state.currentTab === 1
                        ? [
                            styles.productTabHeading,
                            styles.productActiveTabHeading
                          ]
                        : styles.productTabHeading
                    }
                  >
                    <Text
                      style={[
                        {
                          color:
                            this.state.currentTab === 1 ? "#fff" : "#c9c0b6",
                          backgroundColor:
                            this.state.currentTab === 1
                              ? "rgba(255,255,255,.4)"
                              : "transparent"
                        },
                        styles.tabText
                      ]}
                    >
                      {"Карта кофе".toUpperCase()}
                    </Text>
                  </TabHeading>
                }
                style={styles.productTab}
              >
                {/* <Tab2 /> */}
              </Tab>
              <Tab
                heading={
                  <TabHeading
                    style={
                      this.state.currentTab === 2
                        ? [
                            styles.productTabHeading,
                            styles.productActiveTabHeading
                          ]
                        : styles.productTabHeading
                    }
                  >
                    <Text
                      style={[
                        {
                          color:
                            this.state.currentTab === 2 ? "#fff" : "#c9c0b6",
                          backgroundColor:
                            this.state.currentTab === 2
                              ? "rgba(255,255,255,.4)"
                              : "transparent"
                        },
                        styles.tabText
                      ]}
                    >
                      {"Отзывы".toUpperCase()}
                    </Text>
                  </TabHeading>
                }
                style={styles.productTab}
              >
                {/* <Tab3 /> */}
              </Tab>
              <Tab
                heading={
                  <TabHeading
                    style={
                      this.state.currentTab === 3
                        ? [
                            styles.productTabHeading,
                            styles.productActiveTabHeading
                          ]
                        : styles.productTabHeading
                    }
                  >
                    <Text
                      style={[
                        {
                          color:
                            this.state.currentTab === 3 ? "#fff" : "#c9c0b6",
                          backgroundColor:
                            this.state.currentTab === 3
                              ? "rgba(255,255,255,.4)"
                              : "transparent"
                        },
                        styles.tabText
                      ]}
                    >
                      {"Видео".toUpperCase()}
                    </Text>
                  </TabHeading>
                }
              >
                {/* <Tab3 /> */}
              </Tab>
            </Tabs>
          </View>
        </Content>
      </Container>
    );
  }
}

const styles = {
  container: {
    marginLeft: 5,
    marginRight: 5,
    backgroundColor: "rgba(255,255,255,.72)",
    borderRadius: 5
  },
  productTab: {
    backgroundColor: "transparent",
    flex: 1
  },
  productTabHeading: {
    backgroundColor: "transparent",
    paddingLeft: 5,
    paddingRight: 5
  },
  productActiveTabHeading: {
    borderBottomWidth: 0
  },
  tabText: {
    fontSize: 13,
    padding: 5,
    borderRadius: 3
  },
  accordionLinks: {
    flexDirection: "row",
    marginLeft: 10,
    marginRight: 10,
    paddingTop: 10,
    paddingBottom: 10,
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "transparent",
    borderBottomWidth: 1,
    borderBottomColor: "#89a6aa"
  },
  accordionText: {
    color: "#302c23",
    padding: 20,
    backgroundColor: "transparent",
    fontSize: 13
  },
  background: {
    width: "100%",
    height: Dimensions.get("window").height,
    position: "absolute",
    top: 0,
    bottom: 0,
    left: 0,
    right: 0
  },
  default: {
    color: "#fff"
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
