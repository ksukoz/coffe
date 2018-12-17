import React, { Component } from "react";
import {
  View,
  TouchableOpacity,
  Dimensions,
  Image,
  WebView
} from "react-native";
import { Text, Input, Accordion, Card, CardItem } from "native-base";
import KawaIcon from "../KawaIcon";
import StarRating from "react-native-star-rating";

import { scaleSize } from "../../helpers/scaleSize";

const SCREEN_HEIGHT = Dimensions.get("window").height;

export default class ProductReviews extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: true
    };
    Input.defaultProps.selectionColor = "#000";
  }

  render() {
    return (
      <View>
        <View style={styles.container}>{/**/}</View>
        <View style={[styles.container, { marginBottom: scaleSize(5) }]}>
          <Card transparent style={{ backgroundColor: "transparent" }}>
            <CardItem
              style={{
                backgroundColor: "transparent",
                paddingTop: scaleSize(20),
                position: "relative"
              }}
            />
          </Card>
        </View>
      </View>
    );
  }
}

const styles = {
  container: {
    marginLeft: scaleSize(5),
    marginRight: scaleSize(5),
    backgroundColor: "rgba(255,255,255,.72)",
    borderRadius: scaleSize(5)
  },
  cardItem: {
    backgroundColor: "transparent",
    flexDirection: "row",
    alignItems: "flex-end",
    justifyContent: "space-between",
    paddingLeft: 0,
    paddingRight: scaleSize(10),
    paddingTop: 0,
    paddingBottom: 0
  },
  tabText: {
    fontSize: scaleSize(13),
    padding: scaleSize(5),
    borderRadius: scaleSize(3)
  },
  accordionLinks: {
    flexDirection: "row",
    marginLeft: scaleSize(10),
    marginRight: scaleSize(10),
    paddingTop: scaleSize(10),
    paddingBottom: scaleSize(10),
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "transparent",
    borderBottomWidth: 1,
    borderBottomColor: "#89a6aa"
  },
  accordionText: {
    padding: scaleSize(20),
    backgroundColor: "transparent"
  },
  imgHit: {
    position: "absolute",
    top: scaleSize(10),
    left: scaleSize(10),
    backgroundColor: "#ef5350",
    zIndex: 2,
    alignItems: "center",
    justifyContent: "center",
    borderTopLeftRadius: scaleSize(10),
    borderBottomRightRadius: scaleSize(10)
  },
  shareBtn: {
    position: "absolute",
    top: scaleSize(10),
    right: scaleSize(10)
  },
  text: { color: "rgba(48, 44, 35, 0.9)" },
  background: {
    width: "100%",
    height: SCREEN_HEIGHT,
    position: "absolute",
    top: 0,
    bottom: 0,
    left: 0,
    right: 0
  },
  numberOfReviews: {
    color: "#48433b",
    fontSize: scaleSize(13),
    marginTop: scaleSize(-2)
  },
  cartIcon: {
    color: "#48433b"
  },
  btn: {
    backgroundColor: "#ea9308",
    borderRadius: scaleSize(3)
  },
  btnText: {
    fontSize: scaleSize(12),
    color: "#f8f8f8",
    paddingTop: scaleSize(10),
    paddingBottom: scaleSize(10),
    paddingRight: scaleSize(7),
    paddingLeft: scaleSize(7),
    fontWeight: "300"
  }
};
