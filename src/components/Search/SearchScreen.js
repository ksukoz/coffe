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

import { getAlphabet } from "../../store/actions/commonActions";
import {
  getProducts,
  findProducts,
  getFullCategories
} from "../../store/actions/catalogActions";

import { scaleSize } from "../../helpers/scaleSize";
import ProductItem from "../Catalog/ProductItem";

import KawaIcon from "../KawaIcon";
import HeaderBar from "../common/HeaderBar";

StatusBar.setBarStyle("light-content", true);
StatusBar.setBackgroundColor("rgba(0,0,0,0)");
const MAIN_BG = "../../static/img/background.png";

class SearchScreen extends Component {
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
      loading: true
    };
    this.viewabilityConfig = {
      waitForInteraction: true,
      viewAreaCoveragePercentThreshold: 100
    };
    Input.defaultProps.selectionColor = "#000";
  }

  componentDidMount() {
    this.props.getCart();
    this.props.getFullCategories();

    this.props.navigation.addListener("didFocus", payload => {
      if (this.props.focus) {
        this.props.searchFocused();
      }
    });
    BackHandler.addEventListener("hardwareBackPress", this.handleBackPress);
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.search !== this.state.search) {
      this.props.findProducts(
        this.props.navigation.getParam("search")
          ? this.props.navigation.getParam("search")
          : this.props.navigation.getParam("letter"),
        this.props.navigation.getParam("categoryId", "0"),
        this.state.page,
        "after"
      );
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.products) {
      this.setState({ loading: false, products: nextProps.products });
    }
    if (nextProps.cart) {
      this.setState({ cart: nextProps.cart });
    }
    if (nextProps.categories) {
      this.setState({ categories: nextProps.categories });
    }
    if (
      nextProps.navigation &&
      (nextProps.navigation.state.params.letter ||
        nextProps.navigation.state.params.search)
    ) {
      this.setState({
        search: nextProps.navigation.getParam("search", ""),
        page: nextProps.navigation.getParam("search") ? 0 : this.state.page
      });
    }
  }

  componentWillUnmount() {
    this.props.BackHandler.removeEventListener(
      "hardwareBackPress",
      this.handleBackPress
    );
  }

  handleEnd = () =>
    this.props.findProducts(
      this.state.search
        ? this.state.search
        : this.props.navigation.getParam("letter"),
      this.props.navigation.getParam("categoryId", "0"),
      this.state.page,
      "after"
    );

  handleBackPress = () => {
    this.props.navigation.pop();
    return true;
  };

  getStyles = index => {
    this.setState({ stylesIndex: index });
  };

  render() {
    let notFound;
    if (
      this.props.products.length === 0 &&
      this.props.navigation.getParam("search")
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
          backgroundColor={`rgba(0,0,0,${this.state.focus ? 0.9 : 0})`}
        />
        <View style={{ flex: 1 }}>
          <ScrollView
            keyboardShouldPersistTaps={"handled"}
            style={{
              position: "absolute",
              top: 0,
              bottom: 0,
              width: "100%",
              backgroundColor: `rgba(0,0,0,${this.state.focus ? 0.9 : 0})`,
              zIndex: this.state.focus ? 10 : 0
            }}
          />
          <Image source={require(MAIN_BG)} style={styles.background} />

          <HeaderBar
            menu={true}
            catalog={true}
            cart={this.state.cart}
            title={this.state.search}
            getStyles={this.getStyles}
            navigation={this.props.navigation.dangerouslyGetParent()}
          />

          <View style={{ flex: 1 }} contentContainerStyle={{ flex: 1 }}>
            {notFound}
            <FlatList
              style={{
                marginLeft: scaleSize(10),
                marginRight:
                  this.state.stylesIndex === 1 ? scaleSize(5) : scaleSize(12),
                zIndex: 2
              }}
              keyExtractor={item => item.id}
              onEndReached={() => {
                if (this.state.products.length > 9) {
                  this.setState(
                    {
                      loading: true,
                      page: this.state.page + 10
                    },
                    () => this.handleEnd()
                  );
                }
              }}
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
  products: state.catalog.products,
  categories: state.catalog.categoriesFull
});

const mapDispatchToProps = dispatch => ({
  getCart: () => dispatch(getCart()),
  getAlphabet: (lang, id) => dispatch(getAlphabet(lang, id)),
  getProducts: (category, page) => dispatch(getProducts(category, page)),
  findProducts: (value, category, page, type) =>
    dispatch(findProducts(value, category, page, type)),
  getFullCategories: () => dispatch(getFullCategories()),
  searchFocused: () => dispatch(searchFocused())
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SearchScreen);
