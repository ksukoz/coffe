import React, { Component } from "react";
import { View, TouchableOpacity, Image } from "react-native";
import { Text } from "native-base";
import KawaIcon from "../KawaIcon";

import { scaleSize } from "../../helpers/scaleSize";

export default class ProductItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      index: 0,
      styles: [styles.product, styles.productCard, styles.productItem]
    };
  }

  render() {
    const { item, categoryId, styleIndex } = this.props;
    // console.error(styleIndex);

    return (
      <TouchableOpacity
        onPress={() => {
          // AsyncStorage.setItem("idOfProduct", JSON.stringify(item));
          this.props.navigation.navigate("ProductCardScreen", {
            productId: item.id,
            categoryName: this.props.navigation.getParam("categoryName", "0")
          });
        }}
        style={this.state.styles[styleIndex]}
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

        <View
          style={
            styleIndex === 1 ? { flex: 1, padding: scaleSize(6) } : { flex: 1 }
          }
        >
          <View style={styles.productTitle}>
            <Text style={styles.productName}>{item.name}</Text>
            <Text style={styles.productSort}>
              {this.props.categories.filter(
                category => category.id === item.pid
              ).length > 0
                ? this.props.categories.filter(
                    category => category.id === item.pid
                  )[0].name
                : ""}
              , {item.sort_human} {item.arabic_percent}%
            </Text>
            <Text style={styles.productRoast}>Обжарка {item.roast_human}</Text>
          </View>

          <View
            style={{
              flexDirection: "row",
              marginTop: styleIndex === 1 ? scaleSize(10) : scaleSize(-8)
            }}
          >
            <View
              style={{
                borderBottomWidth: 1,
                borderColor: "#89a6aa",
                flex: 1,
                marginBottom: scaleSize(5.5),
                marginRight: styleIndex === 1 ? scaleSize(0) : scaleSize(7),
                marginLeft: styleIndex === 1 ? scaleSize(0) : scaleSize(7)
              }}
            />
            {styleIndex !== 1 ? (
              <Text
                style={{
                  color: "#010101",
                  fontSize: scaleSize(20),
                  fontWeight: "300"
                }}
              >
                {(+item.price).toFixed()} грн
              </Text>
            ) : null}
          </View>

          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
              flexWrap: styleIndex === 1 ? "wrap" : "nowrap"
            }}
          >
            <TouchableOpacity
              style={{ marginBottom: styleIndex === 1 ? scaleSize(7) : 0 }}
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
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center"
                }}
              >
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
              size={scaleSize(20)}
              name="big-cart-in-catalog"
            />
            {styleIndex === 1 ? (
              <Text
                style={{
                  color: "#010101",
                  fontSize: scaleSize(16),
                  fontWeight: "300"
                }}
              >
                {(+item.price).toFixed()} грн
              </Text>
            ) : null}
            <TouchableOpacity
              onPress={() =>
                this.props.navigation.navigate("OrderScreen", {
                  linkName: "CatalogScreen",
                  categoryId
                })
              }
              style={
                styleIndex === 1
                  ? [styles.btn, { width: "100%" }]
                  : [styles.btn]
              }
            >
              <Text
                style={
                  styleIndex === 1
                    ? [styles.btnText, { textAlign: "center" }]
                    : [styles.btnText]
                }
              >
                КУПИТЬ СЕЙЧАС
              </Text>
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
    marginBottom: scaleSize(7),
    flexDirection: "row",
    paddingTop: scaleSize(6),
    paddingBottom: scaleSize(6),
    paddingRight: scaleSize(10),
    borderRadius: scaleSize(8)
  },

  productCard: {
    width: "48%",
    backgroundColor: "rgba(255,255,255, 0.7)",
    marginRight: scaleSize(4),
    marginLeft: scaleSize(4),
    marginBottom: scaleSize(7),
    paddingTop: scaleSize(6),
    paddingBottom: scaleSize(6),
    borderRadius: scaleSize(8)
  },

  productImg: {
    alignSelf: "center",
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
