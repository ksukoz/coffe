import React, { Component } from "react";
import TextInputState from "react-native/lib/TextInputState";
import { connect } from "react-redux";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Keyboard,
  FlatList,
  TouchableOpacity,
  BackHandler,
  Dimensions,
  findNodeHandle
} from "react-native";
import { Input, Item, Icon, Button } from "native-base";
import {
  getAutocomplete,
  clearAutocomplete,
  clearSearchedProducts
} from "../../store/actions/catalogActions";
import {
  searchFocused,
  getSearch,
  setSearch,
  clearAlphabet
} from "../../store/actions/commonActions";
import KawaIcon from "../KawaIcon";

import { scaleSize } from "../../helpers/scaleSize";

class SearchBar extends Component {
  _didFocusSubscription;
  _willBlurSubscription;

  constructor(props) {
    super(props);
    this._didFocusSubscription = this.props.navigation
      ? this.props.navigation.addListener("didFocus", payload => {
          BackHandler.addEventListener(
            "hardwareBackPress",
            this.handleBackPress
          );

          this.props.clearAutocomplete();
        })
      : "";
    this.state = {
      search: "",
      products: [],
      placeholder: this.props.placeholder,
      focus: false,
      height: 0
    };
    Input.defaultProps.selectionColor = "#000";
  }

  componentDidMount() {
    Keyboard.addListener("keyboardDidShow", this.keyboardDidShow);
    this._willBlurSubscription = this.props.navigation
      ? this.props.navigation.addListener("willBlur", payload =>
          BackHandler.removeEventListener(
            "hardwareBackPress",
            this.handleBackPress
          )
        )
      : "";
  }

  componentDidUpdate(prevProps, prevState) {
    const { placeholder, search } = this.props;
    if (placeholder !== prevProps.placeholder) {
      this.setState({ placeholder });
    }
    if (
      prevProps.navigation &&
      this.props.navigation &&
      prevProps.navigation.getParam("search") !==
        this.props.navigation.getParam("search")
    ) {
      this.setState({
        search: this.props.navigation
          ? this.props.navigation.getParam("search")
          : ""
      });
    }
    if (this.props.focus !== prevProps.focus) {
      this.props.clearAutocomplete();
    }
    if (search !== prevProps.search) {
      this.setState({ search });
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.autocomplete) {
      this.setState({
        products: nextProps.autocomplete.map(item => {
          return { name: item.name.split(",")[0], id: item.id };
        })
      });
    }
    if (nextProps.focus || nextProps.focus === false) {
      this.setState({ focus: nextProps.focus });
    }
    if (nextProps.search && typeof nextProps.search === "string") {
      this.setState({ search: nextProps.search });
    }
  }

  handleSearchInput = text => {
    this.setState({ search: text }, () => {
      if (text.length > 1) {
        this.setState({ search: text }, () => {
          this.props.getSearch(
            text,
            this.props.navigation
              ? this.props.navigation.getParam("categoryId", "0")
              : ""
          );
        });
      } else {
        this.props.clearSearchedProducts();
      }
      this.props.getSearch(text);
    });
  };

  handleSearch = e => {
    this.props.setSearch(
      typeof e === "string" ? e : this.state.search,
      this.props.navigation
        ? this.props.navigation.getParam("categoryId", "0")
        : "",
      "0"
    );
    Keyboard.dismiss();
    this.props.navigation
      ? this.props.navigation.push("Search", {
          categoryId: this.props.navigation
            ? this.props.navigation.getParam("categoryId", "0")
            : "",
          search: typeof e === "string" ? e : this.state.search
        })
      : "";
    this.props.clearAutocomplete();
    this.props.clearSearchedProducts();
    this.props.searchFocused();
  };

  unFocus = () => {
    Keyboard.dismiss();
    this.props.searchFocused();
  };

  keyboardDidShow = e => {
    this.setState({
      height: Dimensions.get("window").height - e.endCoordinates.height
    });
  };

  handleBackPress = () => {
    if (this.props.cartChanged) {
      this.props.cartChanged();
      // this.props.navigation.pop();
    }
    if (this.props.focus) {
      this.unFocus();
    } else {
      this.props.clearAutocomplete();
      this.props.navigation.state.routeName !== "HomeScreen"
        ? this.props.clearAlphabet()
        : "";
      this.props.navigation ? this.props.navigation.pop() : "";
    }
    return true;
  };

  render() {
    return (
      <View
        style={[styles.head, { zIndex: this.state.focus ? 1000 : 0 }]}
        keyboardShouldPersistTaps={"handled"}
      >
        <ScrollView
          style={{
            height: scaleSize(40),
            flexGrow: 0,
            flexShrink: 0
          }}
          contentContainerStyle={styles.search}
          keyboardShouldPersistTaps={"handled"}
        >
          {this.state.focus ? (
            <Icon
              style={{
                color: "#58554e",
                paddingLeft: scaleSize(16),
                paddingRight: scaleSize(20)
              }}
              name="md-arrow-back"
              onPress={() => {
                this.setState({ focus: false }, () => this.unFocus());
                this.props.clearAutocomplete();
              }}
            />
          ) : (
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <Button
                transparent
                onPress={() => this.props.navigation.openDrawer()}
              >
                <Icon style={styles.iconMenu} name="ios-menu" />
              </Button>
              <Icon
                style={{
                  color: "#58554e",
                  fontSize: scaleSize(20),
                  marginRight: scaleSize(10),
                  marginLeft: scaleSize(5)
                }}
                name="ios-search"
                onPress={() => {
                  this.props.searchFocused();
                  TextInputState.focusTextInput(
                    findNodeHandle(this.refs.inputB)
                  );
                }}
              />
            </View>
          )}
          <Input
            style={styles.searchInput}
            placeholderTextColor="#becdcf"
            placeholder={this.state.placeholder}
            onChangeText={this.handleSearchInput}
            onSubmitEditing={this.handleSearch}
            onFocus={() => {
              this.state.focus
                ? ""
                : this.setState({ focus: true }, () =>
                    this.props.searchFocused()
                  );
            }}
            value={this.state.search}
            ref="inputB"
          />
          {this.state.search && this.state.search.length > 0 ? (
            <Button
              transparent
              style={{
                paddingBottom: 0,
                paddingTop: scaleSize(5),
                height: scaleSize(35)
              }}
              onPress={() => {
                this.props.clearAutocomplete();
                this.setState({ search: "" }, () => this.props.setSearch(""));
              }}
            >
              <Icon
                style={{
                  color: "#58554e",
                  marginLeft: scaleSize(8),
                  marginRight: scaleSize(8)
                }}
                name="cancel"
                type="MaterialIcons"
              />
            </Button>
          ) : (
            <KawaIcon
              style={styles.codeIcon}
              size={scaleSize(20)}
              name="code"
            />
          )}
        </ScrollView>
        <View style={{ flex: 1 }}>
          <FlatList
            keyboardShouldPersistTaps={"handled"}
            keyExtractor={item => item.id}
            onEndReachedThreshold={0.1}
            data={this.state.products}
            renderItem={({ item }) => (
              <TouchableOpacity
                key={item.id}
                style={{
                  height: scaleSize(56),
                  width: "100%",
                  alignItems: "center",
                  flexDirection: "row",
                  zIndex: this.props.focus || this.state.focus ? 1 : -1
                }}
                onPress={() => {
                  Keyboard.dismiss();
                  this.handleSearch(item.name);
                }}
              >
                <Icon
                  style={{
                    color: "#fff",
                    fontSize: scaleSize(14),
                    marginLeft: scaleSize(24),
                    marginRight: scaleSize(24)
                  }}
                  name="ios-search"
                />
                <Text
                  style={{
                    color: "#fff",
                    fontSize: scaleSize(14),
                    width: "85%"
                  }}
                >
                  {item.name}
                </Text>
              </TouchableOpacity>
            )}
          />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  head: {
    position: "absolute",
    top: scaleSize(35),
    bottom: 0,
    width: "100%",
    height: Dimensions.get("window").height
  },
  search: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    marginRight: scaleSize(10),
    marginLeft: scaleSize(10),
    height: scaleSize(40),
    paddingLeft: scaleSize(5),
    paddingRight: scaleSize(10),
    borderRadius: scaleSize(20)
  },
  searchIcon: {
    paddingTop: scaleSize(3),
    color: "#58554e"
  },
  codeIcon: {
    marginRight: scaleSize(10),
    color: "#58554e"
  },
  searchInput: {
    fontSize: scaleSize(13),
    height: scaleSize(40)
  },
  iconMenu: {
    color: "#58554e"
  }
});

const mapStateToProps = state => ({
  autocomplete: state.catalog.autocomplete,
  focus: state.common.focus,
  search: state.common.search.search
});

const mapDispatchToProps = dispatch => ({
  getAutocomplete: (value, category, page, type) =>
    dispatch(getAutocomplete(value, category, page, type)),
  searchFocused: () => dispatch(searchFocused()),
  clearAutocomplete: () => dispatch(clearAutocomplete()),
  clearAlphabet: () => dispatch(clearAlphabet()),
  getSearch: (value, categoryId) => dispatch(getSearch(value, categoryId)),
  setSearch: (value, categoryId, page) =>
    dispatch(setSearch(value, categoryId, page)),
  clearSearchedProducts: () => dispatch(clearSearchedProducts())
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SearchBar);
