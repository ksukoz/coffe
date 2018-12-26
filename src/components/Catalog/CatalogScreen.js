import React, { Component } from "react";
import { connect } from "react-redux";
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
  ScrollView,
  StatusBar,
  TouchableOpacity,
  Dimensions,
  ActivityIndicator,
  Image,
  FlatList,
  Alert,
  AsyncStorage,
  BackHandler
} from "react-native";
import KawaIcon from "../KawaIcon";
import { getCart } from "../../store/actions/cartActions";
import { getProducts } from "../../store/actions/catalogActions";

import { scaleSize } from "../../helpers/scaleSize";
import ProductItem from "./ProductItem";
import LetterBar from "../common/LetterBar";
import SearchBar from "../common/SearchBar";

StatusBar.setBarStyle("light-content", true);
StatusBar.setBackgroundColor("rgba(0,0,0,0)");
const MAIN_BG = "../../static/img/background.png";

class CatalogScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      alphabet: [],
      products: [],
      search: "",
      page: 0,
      cart: {},
      english: true,
      loading: true
    };
    Input.defaultProps.selectionColor = "#000";
  }

  componentDidMount() {
    this.props.getCart();
    this.props.getProducts(
      this.props.navigation.getParam("categoryId", "0"),
      this.state.page
    );

    BackHandler.addEventListener("hardwareBackPress", this.handleBackPress);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.cart) {
      this.setState({ loading: false, cart: nextProps.cart });
    } else if (nextProps.products) {
      this.setState({ loading: false, products: nextProps.products });
    }
  }

  componentWillUnmount() {
    BackHandler.removeEventListener("hardwareBackPress", this.handleBackPress);
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
    this.setState(
      state => ({ page: state.page + 10 }),
      () =>
        this.props.getProducts(
          this.props.navigation.getParam("categoryId", "0"),
          this.state.page
        )
    );
  };

  handleBackPress = () => {
    this.props.navigation.navigate(
      this.props.navigation.getParam("linkName", "Home"),
      {
        productId: this.props.navigation.getParam("productId", "0"),
        categoryId: this.props.navigation.getParam("categoryId", "0"),
        categoryName: this.props.navigation.getParam(
          "categoryName",
          "Кофе в зернах"
        )
      }
    );
    return true;
  };

  render() {
    return (
      <Container style={styles.default}>
        <StatusBar barStyle="light-content" hidden={false} translucent={true} />
        <Image source={require(MAIN_BG)} style={styles.background} />
        <View style={styles.container}>
          <Content>
            <View style={styles.head}>
              {/* <Text>{Object.keys(this.state.cart).length - 1}</Text> */}
              <SearchBar
                placeholder={this.props.navigation.getParam(
                  "categoryName",
                  "Найти кофе"
                )}
                style={{ marginBottom: scaleSize(20) }}
                navigation={this.props.navigation}
              />
            </View>
            <LetterBar />
          </Content>
        </View>
        <FlatList
          keyExtractor={(item, index) => item.id}
          onEndReached={() => {
            this.setState({
              loading: true
            });
            this.handleEnd();
          }}
          ListFooterComponent={() =>
            this.state.loading ? (
              <ActivityIndicator size="large" animating />
            ) : null
          }
          onEndReachedThreshold={0.1}
          data={this.state.products}
          renderItem={({ item }) => (
            <ProductItem
              navigation={this.props.navigation}
              categoryId={this.props.navigation.getParam("categoryId", "0")}
              item={item}
            />
          )}
        />
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
  products: state.catalog.products
});

const mapDispatchToProps = dispatch => ({
  getCart: () => dispatch(getCart()),
  getProducts: (category, page) => dispatch(getProducts(category, page))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CatalogScreen);
