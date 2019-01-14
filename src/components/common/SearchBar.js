import React, { Component } from "react";
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
  Dimensions
} from "react-native";
import { Input, Item, Icon, Button } from "native-base";
import {
  getAutocomplite,
  clearAutocomplite
} from "../../store/actions/catalogActions";
import { searchFocused } from "../../store/actions/commonActions";
import KawaIcon from "../KawaIcon";

import { scaleSize } from "../../helpers/scaleSize";

class SearchBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      search: this.props.navigation.getParam("search", ""),
      products: [],
      placeholder: this.props.placeholder,
      focus: false,
      height: 0
    };
    Input.defaultProps.selectionColor = "#000";
  }

  componentDidMount() {
    Keyboard.addListener("keyboardDidShow", this.keyboardDidShow);
    BackHandler.addEventListener("hardwareBackPress", this.handleBackPress);
  }

  componentWillUnmount() {
    Keyboard.removeListener("keyboardDidShow", this.keyboardDidShow);
    BackHandler.addEventListener("hardwareBackPress", this.handleBackPress);
  }

  componentDidUpdate(prevProps, prevState) {
    const { placeholder } = this.props;
    if (placeholder !== prevProps.placeholder) {
      this.setState({ placeholder });
    }
    if (this.props.focus !== prevProps.focus) {
      this.props.clearAutocomplite();
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.autocomplite && this.state.search.length > 1) {
      this.setState({
        products: nextProps.autocomplite.map(item => item.name.split(",")[0])
      });
    }
    if (nextProps.focus || nextProps.focus === false) {
      this.setState({ focus: nextProps.focus });
    }
  }

  handleSearchInput = text => {
    this.props.searchedValue(text);
    if (text.length > 1) {
      this.props.getAutocomplite(
        text,
        this.props.navigation.getParam("categoryId", "0"),
        0,
        "after",
        0
      );
    }
    this.setState({ search: text });
  };

  handleSearch = e => {
    Keyboard.dismiss();
    this.props.navigation.navigate("Search", {
      categoryId: this.props.navigation.getParam("categoryId", "0"),
      search: typeof e === "string" ? e : this.state.search
    });

    this.props.searchFocused();
  };

  unFocus = () => {
    Keyboard.dismiss();
    this.setState({ focus: false }, () => this.props.searchFocused());
  };

  keyboardDidShow = e => {
    this.setState({
      height: Dimensions.get("window").height - e.endCoordinates.height
    });
  };

  handleBackPress = () => {
    this.unFocus();
    this.props.clearAutocomplite();
    return true;
  };

  render() {
    return (
      <ScrollView
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
                this.unFocus();
                this.props.clearAutocomplite();
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
              <Icon style={{ color: "#58554e" }} name="ios-search" />
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
          />
          {this.state.search.length > 0 ? (
            <Button
              transparent
              style={{
                paddingBottom: 0,
                paddingTop: scaleSize(5),
                height: scaleSize(35)
              }}
              onPress={() => {
                this.props.clearAutocomplite();
                this.setState({ search: "" });
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

        <FlatList
          keyboardShouldPersistTaps={"handled"}
          keyExtractor={item => item + 1}
          onEndReachedThreshold={0.1}
          data={this.state.products}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={{
                height: scaleSize(56),
                alignItems: "center",
                flexDirection: "row"
              }}
              onPress={() => {
                Keyboard.dismiss();
                this.handleSearch(item);
              }}
            >
              <Icon
                style={{
                  color: "#fff",
                  fontSize: scaleSize(11),
                  marginLeft: scaleSize(24),
                  marginRight: scaleSize(24)
                }}
                name="ios-search"
              />
              <Text style={{ color: "#fff", fontSize: scaleSize(11) }}>
                {item}
              </Text>
            </TouchableOpacity>
          )}
        />
      </ScrollView>
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
    paddingTop: scaleSize(13)
  },
  iconMenu: {
    color: "#58554e",
    marginBottom: scaleSize(5)
  }
});

const mapStateToProps = state => ({
  autocomplite: state.catalog.autocomplite,
  focus: state.common.focus
});

const mapDispatchToProps = dispatch => ({
  getAutocomplite: (value, category, page, type) =>
    dispatch(getAutocomplite(value, category, page, type)),
  searchFocused: () => dispatch(searchFocused()),
  clearAutocomplite: () => dispatch(clearAutocomplite())
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SearchBar);
