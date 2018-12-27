import React, { Component } from "react";
import { View, TouchableOpacity } from "react-native";

import { Item, Text, Button, Icon } from "native-base";
import KawaIcon from "../KawaIcon";

import { scaleSize } from "../../helpers/scaleSize";

export default class HeaderBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      images: ["view", "view-2", "view-1"],
      index: 0
    };
  }

  render() {
    const { navigation, title } = this.props;
    let linkName;

    if (navigation) {
      linkName = navigation.getParam("linkName", "Home");
    }

    return (
      <View style={styles.head}>
        <Item
          style={{
            borderBottomWidth: 0,
            color: "#fff",
            justifyContent: "space-between"
          }}
        >
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <Button
              transparent
              onPress={() =>
                navigation.navigate(linkName, {
                  productId: navigation.getParam("productId", "0")
                })
              }
            >
              {this.props.menu ? (
                <Icon style={styles.icons} name="ios-menu" />
              ) : (
                <KawaIcon
                  style={{
                    color: "#fff",
                    paddingLeft: scaleSize(18),
                    paddingRight: scaleSize(20)
                  }}
                  name={"arrow-back2"}
                  size={scaleSize(20)}
                />
              )}
            </Button>
            <Text
              style={{
                color: "#ffffff",
                fontSize: scaleSize(20),
                fontWeight: "500"
              }}
            >
              {title}
            </Text>
          </View>
          {this.props.catalog ? (
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                marginRight: scaleSize(20)
              }}
            >
              <TouchableOpacity
                style={{ position: "relative" }}
                onPress={() =>
                  this.setState({
                    index:
                      this.state.index < this.state.images.length - 1
                        ? this.state.index + 1
                        : 0
                  })
                }
              >
                <KawaIcon
                  style={[styles.icons, { marginRight: scaleSize(24) }]}
                  size={scaleSize(20)}
                  name={this.state.images[this.state.index]}
                />
                <Text>{this.state.images[this.state.index]}</Text>
              </TouchableOpacity>
              <KawaIcon
                style={styles.icons}
                size={scaleSize(20)}
                name="big-cart-in-catalog"
              />
            </View>
          ) : null}
        </Item>
      </View>
    );
  }
}

const styles = {
  head: {
    marginTop: scaleSize(25)
  },
  icons: {
    color: "#fff"
  }
};
