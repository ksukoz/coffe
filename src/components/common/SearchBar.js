import React, { Component } from "react";
import { connect } from "react-redux";
import { View, AsyncStorage, StyleSheet } from "react-native";
import { Input, Item, Icon, Button } from "native-base";
import { findProducts } from "../../store/actions/catalogActions";
import KawaIcon from "../KawaIcon";

import { scaleSize } from "../../helpers/scaleSize";

class SearchBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      search: ""
    };
    Input.defaultProps.selectionColor = "#000";
  }

  handleSearchInput = text => {
    this.setState({ search: text });
  };

  handleSearch = e => {
    AsyncStorage.setItem("search", this.state.search).then(() => {
      this.props.navigation.navigate("CatalogScreen", { categoryId: 0 });
    });
  };

  render() {
    return (
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
            placeholder={this.props.placeholder}
            onChangeText={this.handleSearchInput}
            onSubmitEditing={this.handleSearch}
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
              onPress={() => this.setState({ search: "" })}
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
        </Item>
      </View>
    );
  }
}

const styles = StyleSheet({
  head: {
    marginTop: scaleSize(35)
  },
  search: {
    backgroundColor: "#fff",
    marginRight: scaleSize(10),
    marginLeft: scaleSize(10),
    height: scaleSize(40),
    paddingLeft: scaleSize(5),
    paddingRight: scaleSize(10)
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
    // marginTop: scaleSize(3)
  }
});

const mapDispatchToProps = dispatch => ({
  findProducts: (value, category, page, type) =>
    dispatch(findProducts(value, category, page, type))
});

export default connect(
  null,
  mapDispatchToProps
)(SearchBar);
