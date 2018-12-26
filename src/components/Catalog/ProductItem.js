import React, { Component } from "react";
import { View, TouchableOpacity, Image } from "react-native";
import { Text } from "native-base";
import KawaIcon from "../KawaIcon";

import { scaleSize } from "../../helpers/scaleSize";

export default class ProductItem extends Component {
  render() {
    const { item, categoryId } = this.props;

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
            <Text style={styles.productSort}>
              {
                this.props.categories.filter(
                  category => category.id === item.pid
                )[0].name
              }
              , {item.sort_human} {item.arabic_percent}%
            </Text>
            <Text style={styles.productRoast}>Обжарка {item.roast_human}</Text>
          </View>

          <View style={{ flexDirection: "row", marginTop: scaleSize(-8) }}>
            <View
              style={{
                borderBottomWidth: 1,
                borderColor: "#89a6aa",
                flex: 1,
                marginBottom: scaleSize(5.5),
                marginRight: scaleSize(7)
              }}
            />
            <Text
              style={{
                color: "#010101",
                fontSize: scaleSize(20),
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
                  size={scaleSize(16)}
                  name="small-star-in-catalog"
                />
                <Text style={styles.productRating}>
                  {item.avg_rating > 0
                    ? (+item.avg_rating).toFixed(1)
                    : item.avg_rating}
                </Text>
              </View>
              <Text style={styles.numberOfReviews}>
                {item.comments} отзывов
              </Text>
            </TouchableOpacity>
            <KawaIcon
              style={styles.cartIcon}
              size={scaleSize(26)}
              name="big-cart-in-catalog"
            />
            <TouchableOpacity
              onPress={() =>
                this.props.navigation.navigate("OrderScreen", {
                  linkName: "CatalogScreen",
                  categoryId
                })
              }
              style={styles.btn}
            >
              <Text style={styles.btnText}>КУПИТЬ СЕЙЧАС</Text>
            </TouchableOpacity>
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
    marginRight: scaleSize(12),
    marginLeft: scaleSize(12),
    marginBottom: scaleSize(7),
    flexDirection: "row",
    paddingTop: scaleSize(6),
    paddingBottom: scaleSize(6),
    paddingRight: scaleSize(10),
    borderRadius: scaleSize(8)
  },
  productImg: {
    width: scaleSize(70),
    height: scaleSize(120),
    marginRight: scaleSize(12),
    marginLeft: scaleSize(12),
    marginTop: scaleSize(4)
  },
  imgHit: {
    position: "absolute",
    top: scaleSize(-2),
    left: scaleSize(5),
    backgroundColor: "#ef5350",
    zIndex: 2,
    alignItems: "center",
    justifyContent: "center",
    height: scaleSize(17),
    borderTopLeftRadius: scaleSize(10),
    borderBottomRightRadius: scaleSize(10)
  },
  productSort: {
    color: "#48433b",
    marginBottom: 1
  },
  productRoast: {
    color: "#48433b"
  },
  productName: {
    marginBottom: scaleSize(3),
    color: "#010101"
  },
  starIcon: {
    color: "#ffea00",
    marginRight: scaleSize(5)
  },
  productRating: {
    color: "#48433b",
    fontSize: scaleSize(13)
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
    paddingTop: scaleSize(5),
    paddingBottom: scaleSize(5),
    paddingRight: scaleSize(7),
    paddingLeft: scaleSize(7),
    fontWeight: "300"
  }
};
