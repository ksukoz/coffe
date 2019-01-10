import React, { Component } from "react";
import { connect } from "react-redux";
import { Container, Content, Input } from "native-base";
import {
  View,
  StatusBar,
  Dimensions,
  ActivityIndicator,
  Image,
  FlatList,
  AsyncStorage,
  BackHandler,
  StyleSheet
} from "react-native";

import { getAlphabet } from "../../store/actions/commonActions";
import { getCart } from "../../store/actions/cartActions";
import {
  getProducts,
  findProducts,
  getFullCategories
} from "../../store/actions/catalogActions";

import { scaleSize } from "../../helpers/scaleSize";
import ProductItem from "./ProductItem";
import LetterBar from "../common/LetterBar";
import SearchBar from "../common/SearchBar";
import HeaderBar from "../common/HeaderBar";

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
      loading: true
    };
    this.viewabilityConfig = {
      waitForInteraction: true,
      viewAreaCoveragePercentThreshold: 100
    };
    Input.defaultProps.selectionColor = "#000";
  }

  async componentWillMount() {
    this.props.getFullCategories();
    let data = await AsyncStorage.getItem("search");
    this.setState({ search: data ? data : "" }, () =>
      this.props.navigation.getParam("letter") || data
        ? this.props.findProducts(
            data ? data : this.props.navigation.getParam("letter"),
            this.props.navigation.getParam("categoryId", "0"),
            this.state.page,
            "after"
          )
        : this.props.getProducts(
            this.props.navigation.getParam("categoryId", "0"),
            this.state.page
          )
    );
  }

  async componentDidMount() {
    this.props.getCart();
    let data = await AsyncStorage.getItem("search");
    if (!data && !this.props.navigation.getParam("letter", "")) {
      this.props.getProducts(
        this.props.navigation.getParam("categoryId", "0"),
        this.state.page
      );
    }

    BackHandler.addEventListener("hardwareBackPress", this.handleBackPress);
  }

  async componentWillReceiveProps(nextProps) {
    if (nextProps.products) {
      this.setState({ loading: false, products: nextProps.products });
    }
    if (nextProps.cart) {
      this.setState({ cart: nextProps.cart });
    }
    if (nextProps.categories) {
      this.setState({ categories: nextProps.categories });
    }
    if (nextProps.navigation) {
      let data = await AsyncStorage.getItem("search");
      this.setState(
        { search: data ? data : "", page: data ? 0 : this.state.page },
        () =>
          this.props.navigation.getParam("letter") || data
            ? this.props.findProducts(
                data ? data : this.props.navigation.getParam("letter"),
                this.props.navigation.getParam("categoryId", "0"),
                this.state.page,
                "after"
              )
            : null
      );
    }
  }

  componentWillUnmount() {
    this.props.getAlphabet(1);
    this.props.BackHandler.removeEventListener(
      "hardwareBackPress",
      this.handleBackPress
    );
  }

  handleEnd = () => {
    this.state.search || this.props.navigation.getParam("letter")
      ? this.props.findProducts(
          this.state.search
            ? this.state.search
            : this.props.navigation.getParam("letter"),
          this.props.navigation.getParam("categoryId", "0"),
          this.state.page,
          "after"
        )
      : this.props.getProducts(
          this.props.navigation.getParam("categoryId", "0"),
          this.state.page
        );
  };
  // };

  handleBackPress = () => {
    this.props.navigation.pop();
    return true;
  };

  getStyles = index => {
    this.setState({ stylesIndex: index });
  };

  render() {
    return (
      <Container style={styles.default}>
        <StatusBar
          barStyle="light-content"
          hidden={false}
          translucent={true}
          backgroundColor={"rgba(255,255,255,0)"}
        />
        <Image source={require(MAIN_BG)} style={styles.background} />
        {this.state.search ? (
          <HeaderBar
            menu={true}
            catalog={true}
            cart={this.state.cart}
            title={this.state.search}
            getStyles={this.getStyles}
          />
        ) : (
          <View style={styles.container}>
            <Content>
              <View style={styles.head}>
                <SearchBar
                  placeholder={this.props.navigation.getParam(
                    "searchPlaceholder",
                    "Найти кофе"
                  )}
                  style={{ marginBottom: scaleSize(20) }}
                  navigation={this.props.navigation}
                />
              </View>
              <LetterBar
                navigation={this.props.navigation}
                categoryId={this.props.navigation.getParam("categoryId", 0)}
                categoryName={this.props.navigation.getParam("categoryName", 0)}
              />
            </Content>
          </View>
        )}
        <View style={{ flex: 1 }} contentContainerStyle={{ flex: 1 }}>
          <FlatList
            style={{
              marginLeft: scaleSize(10),
              marginRight:
                this.state.stylesIndex === 1 ? scaleSize(5) : scaleSize(12)
            }}
            keyExtractor={item => item.id}
            onEndReached={() =>
              this.setState(
                {
                  loading: true,
                  page: this.state.page + 10
                },
                () => this.handleEnd()
              )
            }
            ListFooterComponent={() =>
              this.state.loading ? (
                <ActivityIndicator size="large" animating />
              ) : null
            }
            onEndReachedThreshold={0.1}
            data={this.props.products}
            extraData={this.state}
            renderItem={({ item }) => (
              <ProductItem
                cart={this.state.cart}
                navigation={this.props.navigation}
                categoryId={item.pid}
                item={item}
                categories={this.state.categories}
                styleIndex={this.state.stylesIndex}
              />
            )}
            key={this.state.stylesIndex === 1 ? "h" : "v"}
            numColumns={this.state.stylesIndex === 1 ? 2 : 1}
            viewabilityConfig={this.viewabilityConfig}
          />
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
    height: scaleSize(130)
  },
  default: {
    color: "#fff"
  },
  searchInput: {
    fontSize: scaleSize(13)
  },
  iconMenu: {
    color: "#58554e",
    marginBottom: scaleSize(5)
  }
});

const mapStateToProps = state => ({
  cart: state.cart.items,
  products: state.catalog.products,
  categories: state.catalog.categoriesFull
});

const mapDispatchToProps = dispatch => ({
  getCart: () => dispatch(getCart()),
  getProducts: (category, page) => dispatch(getProducts(category, page)),
  findProducts: (value, category, page, type) =>
    dispatch(findProducts(value, category, page, type)),
  getFullCategories: () => dispatch(getFullCategories()),
  getAlphabet: lang => dispatch(getAlphabet(lang))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CatalogScreen);
