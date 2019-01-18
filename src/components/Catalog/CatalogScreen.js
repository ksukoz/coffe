import React, { Component } from "react";
import { connect } from "react-redux";
import { Container, Content, Input } from "native-base";
import {
  View,
  StatusBar,
  Dimensions,
  ActivityIndicator,
  Image,
  Text,
  FlatList,
  ScrollView,
  BackHandler,
  StyleSheet
} from "react-native";

import { getCart } from "../../store/actions/cartActions";

import { searchFocused } from "../../store/actions/commonActions";
import {
  getProducts,
  findProducts,
  getFullCategories,
  clearProduct
} from "../../store/actions/catalogActions";

import { scaleSize } from "../../helpers/scaleSize";
import ProductItem from "./ProductItem";
import LetterBar from "../common/LetterBar";
import SearchBar from "../common/SearchBar";

import KawaIcon from "../KawaIcon";

StatusBar.setBarStyle("light-content", true);
StatusBar.setBackgroundColor("rgba(0,0,0,0)");
const MAIN_BG = "../../static/img/background.png";

class CatalogScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      products: [],
      categories: [],
      page: 0,
      cart: [],
      search: "",
      stylesIndex: 0,
      focus: false,
      end: false,
      loading: true
    };
    this.viewabilityConfig = {
      waitForInteraction: true,
      viewAreaCoveragePercentThreshold: 30,
      viewAreaPercentThreshold: 30
    };
    Input.defaultProps.selectionColor = "#000";
  }

  componentDidUpdate(prevProps, prevState) {
    if (
      prevProps.navigation.state.params.letter !==
      this.props.navigation.state.params.letter
    ) {
      this.setState(
        { page: 0 },
        this.props.findProducts(
          this.props.navigation.getParam("letter"),
          this.props.navigation.getParam("categoryId", "0"),
          0,
          "after"
        )
      );
    }
    if (
      JSON.stringify(prevProps.products) !==
        JSON.stringify(this.props.products) &&
      this.props.products.length === 0
    ) {
      this.setState({ loading: true });
    }
    if (prevProps.categories !== this.props.categories) {
      this.setState({ categories: this.props.categories });
    }
    if (prevProps.cart !== this.props.cart) {
      this.setState({ loading: false, cart: this.props.cart });
    }
    if (prevProps.focus !== this.props.focus) {
      this.setState({ loading: false, focus: this.props.focus });
    }
  }

  componentDidMount() {
    this.props.getCart();
    this.props.getFullCategories();

    this.props.navigation.addListener("didFocus", payload => {
      if (this.props.focus) {
        this.props.searchFocused();
      }
      if (!this.props.navigation.state.params.letter) {
        this.props.getProducts(
          this.props.navigation.getParam("categoryId", "0"),
          this.state.page
        );
      } else {
        this.props.findProducts(
          this.props.navigation.getParam("letter"),
          this.props.navigation.getParam("categoryId", "0"),
          this.state.page,
          "after"
        );
      }
      this.props.clearProduct();
      StatusBar.setBackgroundColor("rgba(0,0,0,0)");
      StatusBar.setTranslucent(true);
    });

    BackHandler.addEventListener("hardwareBackPress", this.handleBackPress);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.end || nextProps.end === false) {
      this.setState({ loading: false, end: nextProps.end });
    }
    if (
      nextProps.products &&
      nextProps.end === false &&
      JSON.stringify(nextProps.products) !== JSON.stringify(this.state.products)
    ) {
      this.setState({ loading: false, products: nextProps.products });
    }
    // if (nextProps.cart) {
    //   this.setState({ cart: nextProps.cart });
    // }
    // if (nextProps.categories) {
    //   this.setState({ categories: nextProps.categories });
    // }
    // if (nextProps.focus || nextProps.focus === false) {
    //   this.setState({ focus: nextProps.focus });
    // }
  }

  componentWillUnmount() {
    BackHandler.removeEventListener("hardwareBackPress", this.handleBackPress);
  }

  handleEnd = () => {
    if (!this.props.navigation.state.params.letter) {
      this.props.getProducts(
        this.props.navigation.getParam("categoryId", "0"),
        this.state.page
      );
    } else {
      this.props.findProducts(
        this.props.navigation.getParam("letter"),
        this.props.navigation.getParam("categoryId", "0"),
        this.state.page,
        "after"
      );
    }
  };

  getStyles = index => {
    this.setState({ stylesIndex: index });
  };

  render() {
    let notFound;
    if (
      this.props.products.length === 0 &&
      !this.state.loading &&
      this.state.end
    ) {
      notFound = (
        <View style={{ flex: 1, alignItems: "center", zIndex: 90 }}>
          <KawaIcon
            color={"#f8f8f8"}
            name={"info"}
            size={scaleSize(52)}
            style={{ marginBottom: scaleSize(16) }}
          />
          <Text style={{ color: "#f8f8f8", fontSize: scaleSize(16) }}>
            Ничего не найдено
          </Text>
          <Text style={{ color: "#f8f8f8", fontSize: scaleSize(16) }}>
            Попробуйте уточнить свой запрос
          </Text>
        </View>
      );
    }

    return (
      <Container style={styles.default}>
        <StatusBar
          barStyle="light-content"
          hidden={false}
          translucent={true}
          backgroundColor={`rgba(0,0,0,${this.state.focus ? 0.1 : 0})`}
        />
        <View style={{ flex: 1 }}>
          <ScrollView
            keyboardShouldPersistTaps={"handled"}
            style={{
              position: "absolute",
              top: 0,
              bottom: 0,
              width: "100%",
              backgroundColor: `rgba(0,0,0,${this.state.focus ? 0.7 : 0})`,
              zIndex: this.state.focus ? 10 : 0
            }}
          />
          <Image source={require(MAIN_BG)} style={styles.background} />
          <SearchBar
            placeholder={this.props.navigation.getParam(
              "searchPlaceholder",
              "Найти кофе"
            )}
            style={{ marginBottom: scaleSize(20) }}
            navigation={this.props.navigation}
            searchedValue={value => this.setState({ search: value })}
          />

          <View
            style={[
              styles.container,
              {
                marginTop: scaleSize(75)
              }
            ]}
          >
            <LetterBar
              style={{ opacity: this.state.focus ? 0.9 : 1 }}
              navigation={this.props.navigation}
              categoryId={this.props.navigation.getParam("categoryId", "0")}
            />
          </View>
          <View style={{ flex: 1 }} contentContainerStyle={{ flex: 1 }}>
            {notFound}
            <FlatList
              style={{
                marginLeft: scaleSize(10),
                marginRight: scaleSize(12),
                zIndex: 2
              }}
              keyExtractor={item => item.id}
              getItemLayout={(data, index) => ({
                length: 100 - 1,
                index
              })}
              onEndReached={() =>
                !this.state.end
                  ? this.setState(
                      {
                        loading: true,
                        page: this.state.page + 10
                      },
                      () => this.handleEnd()
                    )
                  : false
              }
              ListFooterComponent={() =>
                this.state.loading ? (
                  <ActivityIndicator color="#89a6aa" size="large" animating />
                ) : null
              }
              maxToRenderPerBatch={4}
              onEndReachedThreshold={this.state.end ? 0 : 0.1}
              data={this.props.products}
              renderItem={({ item }) => (
                <ProductItem
                  cart={this.state.cart}
                  navigation={this.props.navigation}
                  categoryId={item.pid}
                  search={this.state.search}
                  item={item}
                  categories={this.state.categories}
                  styleIndex={this.state.stylesIndex}
                />
              )}
              viewabilityConfig={this.viewabilityConfig}
            />
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
  },
  searchInput: {
    fontSize: scaleSize(13)
  }
});

const mapStateToProps = state => ({
  cart: state.cart.items,
  focus: state.common.focus,
  end: state.catalog.end,
  products: state.catalog.products,
  categories: state.catalog.categoriesFull
});

const mapDispatchToProps = dispatch => ({
  getCart: () => dispatch(getCart()),
  getProducts: (category, page) => dispatch(getProducts(category, page)),
  findProducts: (value, category, page, type) =>
    dispatch(findProducts(value, category, page, type)),
  getFullCategories: () => dispatch(getFullCategories()),
  clearProduct: () => dispatch(clearProduct()),
  searchFocused: () => dispatch(searchFocused())
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CatalogScreen);
