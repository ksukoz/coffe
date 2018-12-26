import React, { Component } from "react";
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
import { Text } from "native-base";
import KawaIcon from "../KawaIcon";

import { scaleSize } from "../../helpers/scaleSize";

export default class ProductItem extends Component {
  render() {
    const { item } = this.props;

    return (
      <TouchableOpacity
        onPress={() => {
          // AsyncStorage.setItem("idOfProduct", JSON.stringify(item));
          this.props.navigation.navigate("ProductCardScreen", {
            productId: item.id,
            categoryName: this.props.navigation.getParam("categoryName", "0")
          });
        }}
        style={styles.product}
      >
        <View style={{ position: "relative" }}>
          {item.new == 1 && Date.now() <= +`${item.new_date}000` ? (
            <View style={styles.imgHit}>
              <Text
                style={{
                  fontSize: scaleSize(10),

                  paddingLeft: scaleSize(10),
                  paddingRight: scaleSize(10),
                  paddingTop: scaleSize(5),
                  paddingBottom: scaleSize(5),
                  color: "#fff"
                }}
              >
                {"Новинка".toUpperCase()}
              </Text>
            </View>
          ) : item.popular == 1 ? (
            <View style={styles.imgHit}>
              <Text
                style={{
                  fontSize: scaleSize(10),

                  paddingLeft: scaleSize(10),
                  paddingRight: scaleSize(10),
                  paddingTop: scaleSize(5),
                  paddingBottom: scaleSize(5),
                  color: "#fff"
                }}
              >
                {"Хит".toUpperCase()}
              </Text>
            </View>
          ) : null}

          <Image
            source={{ uri: "http://kawa.gumione.pro" + item.file }}
            style={styles.productImg}
          />
        </View>

        <View style={{ flex: 1 }}>
          <View style={styles.productTitle}>
            <Text style={styles.productName}>
              {item.name + " " + item.weight + "g"}
            </Text>
            <Text style={styles.productSort}>{item.sort_human}</Text>
            <Text style={styles.productRoast}>{item.roast_human}</Text>
          </View>

          <View style={{ flexDirection: "row", marginTop: -8 }}>
            <View
              style={{
                borderBottomWidth: 1,
                borderColor: "#89a6aa",
                flex: 1,
                marginBottom: 5.5,
                marginRight: 7
              }}
            />
            <Text
              style={{
                color: "#010101",
                fontSize: 20,
                fontWeight: "300"
              }}
            >
              {item.price} грн
            </Text>
          </View>

          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center"
            }}
          >
            <TouchableOpacity
              onPress={() =>
                this.props.navigation.navigate("ProductCardScreen", {
                  productId: item.id,
                  categoryName: this.props.navigation.getParam(
                    "categoryName",
                    "0"
                  ),
                  tab: 2
                })
              }
            >
              <View style={{ flexDirection: "row", alignItems: "center" }}>
                <KawaIcon
                  style={styles.starIcon}
                  size={16}
                  name="small-star-in-catalog"
                />
                <Text style={styles.productRating}>{item.avg_rating}</Text>
              </View>
              <Text style={styles.numberOfReviews}>
                {item.comments} отзывов
              </Text>
            </TouchableOpacity>
            <KawaIcon
              style={styles.cartIcon}
              size={26}
              name="big-cart-in-catalog"
            />
            <View style={styles.btn}>
              <Text style={styles.btnText}>КУПИТЬ СЕЙЧАС</Text>
            </View>
          </View>
        </View>
      </TouchableOpacity>
    );
  }
}

const styles = {
  default: {
    color: "#fff"
  },
  product: {
    backgroundColor: "rgba(255,255,255, 0.7)",
    marginRight: 12,
    marginLeft: 12,
    marginBottom: 7,
    flexDirection: "row",
    paddingTop: 6,
    paddingBottom: 6,
    paddingRight: 10,
    borderRadius: 8
  },
  productImg: {
    width: 70,
    height: 120,
    marginRight: 12,
    marginLeft: 12,
    marginTop: 4
  },
  imgHit: {
    position: "absolute",
    top: -2,
    left: 5,
    backgroundColor: "#ef5350",
    zIndex: 2,
    alignItems: "center",
    justifyContent: "center",
    height: 17,
    borderTopLeftRadius: 10,
    borderBottomRightRadius: 10
  },
  productSort: {
    color: "#48433b",
    marginBottom: 1
  },
  productRoast: {
    color: "#48433b"
  },
  productName: {
    marginBottom: 3,
    color: "#010101"
  },
  starIcon: {
    color: "#ffea00",
    marginRight: 5
  },
  productRating: {
    color: "#48433b",
    fontSize: 13
  },
  numberOfReviews: {
    color: "#48433b",
    fontSize: 13,
    marginTop: -2
  },
  cartIcon: {
    color: "#48433b"
  },
  btn: {
    backgroundColor: "#ea9308",
    borderRadius: 3
  },
  btnText: {
    fontSize: 12,
    color: "#f8f8f8",
    paddingTop: 5,
    paddingBottom: 5,
    paddingRight: 7,
    paddingLeft: 7,
    fontWeight: "300"
  }
};
