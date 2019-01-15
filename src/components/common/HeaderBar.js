import React, { Component } from "react";
import { View, TouchableOpacity, StyleSheet, Dimensions } from "react-native";

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
      <View
        style={[
          styles.head,
          this.props.menu ? { marginBottom: scaleSize(20) } : ""
        ]}
      >
        <Item
          style={{
            borderBottomWidth: 0,
            color: "#fff",
            width: Dimensions.get("window").width,
            marginLeft: 0,
            justifyContent: "space-between"
          }}
        >
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              marginRight: scaleSize(10),
              flex: 3.3
            }}
          >
            <Button
              transparent
              onPress={() =>
                this.props.menu ? navigation.openDrawer() : navigation.pop()
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
                fontWeight: "500",
                flexWrap: "wrap",
                width: "85%"
                // flex: 1.5
              }}
            >
              {title}
            </Text>
          </View>
          {this.props.catalog ? (
            <View
              style={{
                flexDirection: "row",
                flex: 1,
                alignItems: "center",
                justifySelf: "flex-end",
                marginRight: scaleSize(10)
              }}
            >
              <TouchableOpacity
                activeOpacity={0.8}
                style={{ position: "relative" }}
                onPress={() => {
                  this.setState(
                    {
                      index:
                        this.state.index < this.state.images.length - 1
                          ? this.state.index + 1
                          : 0
                    },
                    this.props.getStyles(
                      this.state.index < this.state.images.length - 1
                        ? this.state.index + 1
                        : 0
                    )
                  );
                }}
              >
                <KawaIcon
                  style={[styles.icons, { marginRight: scaleSize(24) }]}
                  size={scaleSize(20)}
                  name={this.state.images[this.state.index]}
                />
              </TouchableOpacity>
              <TouchableOpacity
                style={{ position: "relative" }}
                // onPress={() => this.setState({ cart: !this.state.cart })}
              >
                <KawaIcon
                  style={styles.icons}
                  size={scaleSize(26)}
                  name={
                    this.props.cart
                      ? "small-cart-in-catalog-with-buy"
                      : "small-cart-in-catalog"
                  }
                />
                <View
                  style={{
                    opacity: this.props.cart ? 1 : 0,
                    position: "absolute",
                    bottom: 0,
                    right: 0,
                    borderRadius: scaleSize(6.5),
                    backgroundColor: "#ef5350",

                    alignContent: "center",
                    alignItems: "center",
                    justifyContent: "center",
                    width: scaleSize(13),
                    height: scaleSize(13)
                  }}
                >
                  <Text
                    style={{
                      fontSize: 7,
                      textAlign: "center",
                      textAlignVertical: "center",
                      color: "#fff"
                    }}
                  >
                    {this.props.cart ? this.props.cart.length : ""}
                  </Text>
                </View>
              </TouchableOpacity>
            </View>
          ) : null}
        </Item>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  head: {
    marginTop: scaleSize(25)
  },
  icons: {
    color: "#fff"
  }
});
