import React, { Component } from "react";
import { connect } from "react-redux";
import {
  View,
  StatusBar,
  Dimensions,
  Image,
  TouchableOpacity,
  Linking,
  ActivityIndicator,
  BackHandler
} from "react-native";
import {
  Container,
  Content,
  Text,
  Input,
  Tab,
  Tabs,
  TabHeading,
  ScrollableTab
} from "native-base";
import Modal from "react-native-modal";

import KawaIcon from "../KawaIcon";
import SearchBar from "../common/SearchBar";
import AboutProduct from "./AboutProduct";
import CoffeeCard from "./CoffeeCard";

import { getProduct } from "../../store/actions/catalogActions";

import { scaleSize } from "../../helpers/scaleSize";
import ProductReviews from "./ProductReviews";
import ProductVideo from "./ProductVideo";

StatusBar.setBarStyle("light-content", true);
StatusBar.setBackgroundColor("rgba(0,0,0,0)");
const MAIN_BG = "../../static/img/background.png";

const SCREEN_WIDTH = Dimensions.get("window").width;
const SCREEN_HEIGHT = Dimensions.get("window").height;

class ProductCardScreen extends Component {
  constructor(props) {
    super(props);

    this.state = {
      categories: [],
      modalVisible: false,
      opacity: 0,
      currentTab: 0,
      productItem: null,
      reviewsLength: 0,
      search: "",
      page: 0,
      reviewsFormShow: false,
      english: true,
      loading: true
    };
    Input.defaultProps.selectionColor = "#000";
  }

  componentWillMount() {
    this.props.getProduct(this.props.navigation.getParam("productId", "0"));
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
    fetch("http://kawaapi.gumione.pro/api/catalog/categories/7")
      .then(response => response.json())
      .then(responseJson => {
        this.setState({
          categories: [...this.state.categories, ...responseJson.categories]
        });
      })
      .catch(error => {
        console.error(error);
      });
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.product) {
      this.setState({ loading: false, productItem: nextProps.product });
    }
  }

  componentDidMount() {
    BackHandler.addEventListener("hardwareBackPress", this.handleBackPress);

    setTimeout(() => {
      this.setState({ currentTab: this.props.navigation.getParam("tab", 0) });
    }, 500);
  }

  componentWillUnmount() {
    BackHandler.removeEventListener("hardwareBackPress", this.handleBackPress);
  }

  setModalVisible(visible) {
    this.setState({ ...this.state, modalVisible: visible, opacity: visible });
  }

  onReviewsPress() {
    this.setState({
      ...this.state,
      currentTab: 2,
      reviewsFormShow: !this.state.reviewsFormShow
    });
  }

  handleBackPress = () => {
    this.props.navigation.navigate("Catalog", {
      categoryId: this.props.navigation.getParam("categoryId", "0"),
      categoryName: this.props.navigation.getParam(
        "categoryName",
        "Кофе в зернах"
      )
    });
    return true;
  };

  render() {
    const { productItem, reviewsLength, opacity } = this.state;

    return (
      <Container style={styles.default}>
        <StatusBar
          barStyle="light-content"
          hidden={false}
          translucent={true}
          backgroundColor={opacity ? "rgba(0,0,0,0.7)" : "rgba(0,0,0,0)"}
        />
        <Image source={require(MAIN_BG)} style={styles.background} />
        <View style={{ flex: 1 }}>
          <SearchBar
            placeholder={this.props.navigation.getParam(
              "searchPlaceholder",
              "Найти кофе"
            )}
            style={{ marginBottom: scaleSize(20) }}
            navigation={this.props.navigation}
          />
          {this.state.loading ? (
            <ActivityIndicator size="large" animating />
          ) : (
            <View style={{ flexGrow: 1 }}>
              <Tabs
                transparent
                style={{ flex: 1 }}
                page={this.state.currentTab}
                tabBarUnderlineStyle={{
                  backgroundColor: "transparent"
                }}
                renderTabBar={() => (
                  <ScrollableTab
                    backgroundColor={"transparent"}
                    style={{
                      borderWidth: 0,
                      marginTop: scaleSize(5),
                      marginBottom: scaleSize(5)
                    }}
                  />
                )}
                // initialPage={this.state.currentTab}
                onChangeTab={({ i }) => this.setState({ currentTab: i })}
                // onScroll={e => console.error(e)}
                prerenderingSiblingsNumber={Infinity}
              >
                <Tab
                  heading={
                    <TabHeading
                      style={[
                        this.state.currentTab === 0
                          ? [
                              styles.productTabHeading,
                              styles.productActiveTabHeading
                            ]
                          : styles.productTabHeading,
                        {
                          marginLeft: 0
                        }
                      ]}
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
                  <Content>
                    <AboutProduct
                      onImgPress={() => this.setState({ opacity: true })}
                      onImgClose={() => this.setState({ opacity: false })}
                      productItem={productItem}
                      reviewsLength={reviewsLength}
                      onPressDelivery={() =>
                        this.props.navigation.navigate("DeliveryScreen", {
                          linkName: "ProductCard",
                          productId: productItem.id,
                          tab: 0
                        })
                      }
                      onPressOtherProducts={() =>
                        this.props.navigation.navigate("CatalogScreen", {
                          categoryId: 7,
                          linkName: "ProductCard",
                          productId: productItem.id
                        })
                      }
                      onPressBuyButton={() =>
                        this.props.navigation.navigate("OrderScreen", {
                          linkName: "ProductCard",
                          productId: productItem.id
                        })
                      }
                      categories={this.state.categories}
                      navigation={this.props.navigation}
                      onReviewsPress={() => this.onReviewsPress()}
                    />
                    <TouchableOpacity
                      style={styles.questionsBtn}
                      onPress={() => this.setModalVisible(true)}
                    >
                      <KawaIcon
                        style={{
                          color: "#f8f8f8",
                          position: "relative",
                          paddingRight: scaleSize(5)
                        }}
                        name={"telephone"}
                        size={20}
                      />
                      <Text
                        style={{
                          color: "#f8f8f8",
                          fontSize: scaleSize(14)
                        }}
                      >
                        Возникли вопросы?
                      </Text>
                    </TouchableOpacity>
                  </Content>
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
                  <Content>
                    <CoffeeCard
                      navigation={this.props.navigation}
                      caption={productItem ? productItem.caption : ""}
                      preparation={
                        productItem.preparation !== null
                          ? productItem.preparation
                          : []
                      }
                      id={productItem.id}
                      pid={productItem.pid}
                      position={[
                        +productItem.cc_aftertaste.split(",").join(""),
                        +productItem.cc_body.split(",").join(""),
                        +productItem.cc_balance.split(",").join(""),
                        +productItem.cc_acidity.split(",").join(""),
                        +productItem.cc_saturation.split(",").join(""),
                        +productItem.cc_aroma.split(",").join("")
                      ]}
                    />
                  </Content>
                </Tab>
                <Tab
                  heading={
                    <TabHeading
                      style={[
                        this.state.currentTab === 2
                          ? [
                              styles.productTabHeading,
                              styles.productActiveTabHeading
                            ]
                          : styles.productTabHeading,
                        {
                          marginRight:
                            productItem.videos.length > 0 ? scaleSize(11) : 0
                        }
                      ]}
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
                  <Content>
                    <ProductReviews
                      id={productItem.id}
                      productName={productItem.name}
                      showReviewsForm={this.state.reviewsFormShow}
                      hideReviewsForm={this.state.reviewsFormShow}
                    />
                  </Content>
                </Tab>
                {productItem.videos.length > 0 ? (
                  <Tab
                    heading={
                      <TabHeading
                        style={[
                          this.state.currentTab === 3
                            ? [
                                styles.productTabHeading,
                                styles.productActiveTabHeading
                              ]
                            : styles.productTabHeading,
                          {
                            marginRight: 0,
                            display:
                              productItem.videos.length > 0 ? "flex" : "none"
                          }
                        ]}
                      >
                        <Text
                          style={[
                            {
                              color:
                                this.state.currentTab === 3
                                  ? "#fff"
                                  : "#c9c0b6",
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
                    style={[
                      styles.productTab,
                      {
                        display: productItem.videos.length > 0 ? "flex" : "none"
                      }
                    ]}
                  >
                    <Content>
                      <ProductVideo
                        videos={productItem.videos}
                        product={productItem}
                        categoryName={this.props.navigation.getParam(
                          "categoryName",
                          "0"
                        )}
                      />
                    </Content>
                  </Tab>
                ) : null}
              </Tabs>
            </View>
          )}
          <Modal
            backdropTransitionInTiming={0}
            backdropTransitionOutTiming={0}
            animationInTiming={0}
            animationOutTiming={0}
            style={{ backgroundColor: "rgba(0,0,0,0.7)", margin: 0 }}
            visible={this.state.modalVisible}
            onBackdropPress={() => {
              this.setModalVisible(!this.state.modalVisible);
            }}
            onBackButtonPress={() => {
              this.setModalVisible(!this.state.modalVisible);
            }}
          >
            <View
              style={{
                borderRadius: scaleSize(5),
                padding: scaleSize(20),
                alignSelf: "center",
                backgroundColor: "#fff",
                width: SCREEN_WIDTH * 0.8
              }}
            >
              <Text
                style={{
                  fontSize: scaleSize(22),
                  fontWeight: "bold",
                  marginBottom: scaleSize(20),
                  color: "#302c23"
                }}
              >
                Выбрать номер
              </Text>
              <TouchableOpacity
                style={styles.phoneNumber}
                onPress={() => Linking.openURL(`tel:+380994556565`)}
              >
                <Image
                  source={require("../../static/img/vodafon.png")}
                  style={{
                    width: scaleSize(30),
                    height: scaleSize(30),
                    marginRight: scaleSize(5)
                  }}
                />
                <Text>(099) 455 65 65</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.phoneNumber}
                onPress={() => Linking.openURL(`tel:+380674556565`)}
              >
                <Image
                  source={require("../../static/img/kyivstar.png")}
                  style={{
                    width: scaleSize(30),
                    height: scaleSize(30),
                    marginRight: scaleSize(5)
                  }}
                />
                <Text>(067) 455 65 65</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.phoneNumber}
                onPress={() => Linking.openURL(`tel:+380934556565`)}
              >
                <Image
                  source={require("../../static/img/lifecell.png")}
                  style={{
                    width: scaleSize(30),
                    height: scaleSize(30),
                    marginRight: scaleSize(5)
                  }}
                />
                <Text>(093) 455 65 65</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={{
                  backgroundColor: "transparent",
                  alignSelf: "flex-end"
                }}
                onPress={() => {
                  this.setModalVisible(!this.state.modalVisible);
                }}
              >
                <Text
                  style={{
                    fontWeight: "bold",
                    marginTop: scaleSize(20),
                    color: "#302c23"
                  }}
                >
                  {"Отмена".toUpperCase()}
                </Text>
              </TouchableOpacity>
            </View>
          </Modal>
        </View>
      </Container>
    );
  }
}

const styles = {
  default: {
    backgroundColor: "transparent",
    flex: 1
  },
  container: {
    marginLeft: scaleSize(5),
    marginRight: scaleSize(5),
    backgroundColor: "rgba(255,255,255,.72)",
    borderRadius: scaleSize(5)
  },
  productTab: {
    backgroundColor: "transparent",
    // height: SCREEN_HEIGHT * 0.8,
    overflow: "scroll",
    width: SCREEN_WIDTH,
    alignSelf: "flex-end"
  },
  productTabHeading: {
    backgroundColor: "transparent",
    marginLeft: scaleSize(11),
    marginRight: scaleSize(11),
    paddingLeft: scaleSize(8),
    paddingRight: scaleSize(8),
    paddingTop: scaleSize(6),
    paddingBottom: scaleSize(6)
  },
  productActiveTabHeading: {
    borderBottomWidth: 0
  },
  tabText: {
    fontSize: scaleSize(14),
    fontWeight: "500",
    padding: scaleSize(5),
    borderRadius: scaleSize(3)
  },
  questionsBtn: {
    backgroundColor: "#89a6aa",
    alignSelf: "center",
    justifyContent: "center",
    flexDirection: "row",
    padding: scaleSize(10),
    paddingLeft: scaleSize(7),
    paddingRight: scaleSize(7),
    borderRadius: scaleSize(3),
    marginBottom: scaleSize(5),
    marginTop: scaleSize(5)
  },
  phoneNumber: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: scaleSize(8)
  },
  background: {
    width: "100%",
    height: SCREEN_HEIGHT * 1.5,
    position: "absolute",
    top: 0,
    bottom: 0,
    left: 0,
    right: 0
  }
};

const mapStateToProps = state => ({
  product: state.catalog.product
});

const mapDispatchToProps = dispatch => ({
  getProduct: id => dispatch(getProduct(id))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ProductCardScreen);
