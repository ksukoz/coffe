import React, { Component } from "react";
import { View } from "react-native";

import { Item, Text, Button } from "native-base";
import KawaIcon from "../KawaIcon";

export default class HeaderBar extends Component {
  componentDidMount() {
    // console.error(this.props.navigation);
  }
  render() {
    const { navigation, title } = this.props;
    let linkName;

    if (navigation) {
      linkName = navigation.getParam("linkName", "Home");
    }

    return (
      <View style={styles.head}>
        <Item style={{ borderBottomWidth: 0, color: "#fff" }}>
          <Button
            transparent
            onPress={() =>
              navigation.navigate(linkName, {
                productId: navigation.getParam("productId", "0")
              })
            }
          >
            <KawaIcon
              style={{ color: "#fff", paddingLeft: 18, paddingRight: 20 }}
              name={"arrow-back2"}
              size={20}
            />
          </Button>
          <Text
            style={{
              color: "#ffffff",
              fontSize: 20,
              fontWeight: "bold"
            }}
          >
            {title}
          </Text>
        </Item>
      </View>
    );
  }
}

const styles = {
  head: {
    marginTop: 35
  }
};
