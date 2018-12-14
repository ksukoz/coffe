import React, { Component } from "react";
import { connect } from "react-redux";
import { View } from "react-native";
import { Input, Item, Icon, Button } from "native-base";
import { findProduct } from "../../store/actions/catalogActions";
import KawaIcon from "../KawaIcon";

class SearchBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      search: "",
      page: 0
    };
    Input.defaultProps.selectionColor = "#000";
  }

  componentDidMount() {
    // console.error(this.props);
  }

  handleSearchInput = text => {
    this.setState({ search: text });
  };

  handleSearch = e => {
    this.props.findProduct(this.state.search, this.props.categoryId, 10);

    this.props.navigation.navigate("CatalogScreen", {
      categoryId: this.props.categoryId
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
          />
          <KawaIcon style={styles.codeIcon} size={20} name="code" />
        </Item>
      </View>
    );
  }
}

const styles = {
  head: {
    marginTop: 35
  },
  search: {
    backgroundColor: "#fff",
    marginRight: 10,
    marginLeft: 10,
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
    fontSize: 13,
    paddingTop: 13
  },
  iconMenu: {
    color: "#58554e",
    marginBottom: 5
  }
};

export default connect(
  null,
  { findProduct }
)(SearchBar);
