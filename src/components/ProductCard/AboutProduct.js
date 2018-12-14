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

const SCREEN_WIDTH = Dimensions.get("window").width;
const SCREEN_HEIGHT = Dimensions.get("window").height;

export default class AboutProduct extends Component {
  constructor(props) {
    super(props);

    this.state = {
      modalVisible: false,
      loading: true
    };
    Input.defaultProps.selectionColor = "#000";
  }

  _renderHeader(item, expanded) {
    return (
      <View style={[styles.accordionLinks, { borderBottomWidth: 0 }]}>
        <Text style={styles.text}> {item.title}</Text>
        {expanded ? (
          <KawaIcon
            style={{ color: "#302c23", position: "absolute", right: 10 }}
            name={"arrow-down"}
            size={8}
          />
        ) : (
          <KawaIcon
            style={{ color: "#302c23", position: "absolute", right: 10 }}
            name={"arrow-next"}
            size={14}
          />
        )}
      </View>
    );
  }
  _renderContent(item) {
    return (
      <View style={{ height: 250 }}>
        <WebView
          style={styles.accordionText}
          scrollEnabled={false}
          automaticallyAdjustContentInsets={false}
          source={{
            baseUrl: "",
            html: `<style>p {color: #302c23;}</style>${
              item.content
            }<p>Страна производитель ${item.country}</p>`
          }}
        />
      </View>
    );
  }

  render() {
    const { productItem } = this.props;
    const dataArray = [];
    let product = {};

    if (productItem) {
      dataArray.push({
        title: "Описание",
        content: productItem.text,
        country: productItem.country
      });

      product = productItem;
    }

    return (
      <View>
        <View style={[styles.container, { marginBottom: 5 }]}>
          <Card transparent style={{ backgroundColor: "transparent" }}>
            <CardItem
              style={{
                backgroundColor: "transparent",
                paddingTop: 20,
                position: "relative"
              }}
            >
              {product.new == 1 && +new Date() <= +product.new_date ? (
                <View style={styles.imgHit}>
                  <Text
                    style={{
                      fontSize: 8,
                      padding: 5,
                      color: "#fff",
                      fontWeight: "bold"
                    }}
                  >
                    {"Новинка".toUpperCase()}
                  </Text>
                </View>
              ) : product.popular == 1 ? (
                <View style={styles.imgHit}>
                  <Text
                    style={{
                      fontSize: 8,
                      padding: 5,
                      color: "#fff",
                      fontWeight: "bold"
                    }}
                  >
                    {"Хит".toUpperCase()}
                  </Text>
                </View>
              ) : null}
              <Image
                source={{
                  uri: `http://kawa.gumione.pro${product.file}`
                }}
                style={{
                  flex: 1,
                  height: 150,
                  width: null
                }}
                resizeMode="contain"
              />
              <TouchableOpacity
                style={styles.shareBtn}
                onPress={() =>
                  this.props.navigation.navigate("CoffeeInfo", {
                    linkName: "ProductCardScreen",
                    productId: product.id,
                    tab: 1,

                    preparation: product.preparation
                  })
                }
              >
                <KawaIcon color="#302c23" size={30} name="share" />
              </TouchableOpacity>
            </CardItem>
            <CardItem style={styles.cardItem}>
              <View
                style={{
                  flexDirection: "column",
                  width: "70%",
                  borderBottomWidth: 1,
                  borderBottomColor: "#89a6aa",
                  padding: 10
                }}
              >
                <Text style={{ fontSize: 18, fontWeight: "bold" }}>
                  {product.name} {product.weight} g
                </Text>
                <Text style={styles.text}>
                  {this.props.categoryName}, Арабика {product.arabic_percent}%
                </Text>
                <Text style={styles.text}>Обжарка {product.roast_human}</Text>
                <Text style={styles.text}>Код товара: {product.code}</Text>
              </View>
              <View>
                <Text
                  style={{
                    fontSize: 25,
                    fontWeight: "bold"
                  }}
                >
                  {product.price ? product.price.split(".")[0] : product.price}{" "}
                  грн
                </Text>
              </View>
            </CardItem>
            <CardItem
              style={[
                styles.cardItem,
                { paddingLeft: 10, paddingTop: 5, alignItems: "center" }
              ]}
            >
              <View>
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    marginBottom: 5
                  }}
                >
                  <StarRating
                    disabled={true}
                    emptyStar={"ios-star-outline"}
                    fullStar={"ios-star"}
                    halfStar={"ios-star-half"}
                    iconSet={"Ionicons"}
                    maxStars={5}
                    rating={3.5}
                    starSize={27}
                    starStyle={{ marginRight: 2 }}
                    emptyStarColor={"#ffea00"}
                    fullStarColor={"#ffea00"}
                  />
                </View>
                <Text style={[styles.numberOfReviews, styles.text]}>
                  27 отзывов
                </Text>
              </View>
              <KawaIcon
                style={styles.cartIcon}
                size={26}
                name="big-cart-in-catalog"
              />
              <View style={styles.btn}>
                <Text style={styles.btnText}>КУПИТЬ СЕЙЧАС</Text>
              </View>
            </CardItem>
          </Card>
        </View>
        <View style={styles.container}>
          <TouchableOpacity
            style={styles.accordionLinks}
            onPress={this.props.onPressDelivery}
          >
            <Text style={styles.text}>Доставка и оплата</Text>
            <KawaIcon
              style={{
                color: "#302c23",
                position: "absolute",
                right: 10
              }}
              name={"arrow-next"}
              size={14}
            />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.accordionLinks}
            onPress={this.props.onPressOtherProducts}
          >
            <Text style={styles.text}>Другие товары</Text>
            <KawaIcon
              style={{
                color: "#302c23",
                position: "absolute",
                right: 10
              }}
              name={"arrow-next"}
              size={14}
            />
          </TouchableOpacity>
          <Accordion
            dataArray={dataArray}
            animation={true}
            expanded={0}
            renderHeader={this._renderHeader}
            renderContent={this._renderContent}
          />
        </View>
      </View>
    );
  }
}

const styles = {
  container: {
    marginLeft: 5,
    marginRight: 5,
    backgroundColor: "rgba(255,255,255,.72)",
    borderRadius: 5
  },
  cardItem: {
    backgroundColor: "transparent",
    flexDirection: "row",
    alignItems: "flex-end",
    justifyContent: "space-between",
    paddingLeft: 0,
    paddingRight: 10,
    paddingTop: 0,
    paddingBottom: 0
  },
  tabText: {
    fontSize: 13,
    padding: 5,
    borderRadius: 3
  },
  accordionLinks: {
    flexDirection: "row",
    marginLeft: 10,
    marginRight: 10,
    paddingTop: 10,
    paddingBottom: 10,
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "transparent",
    borderBottomWidth: 1,
    borderBottomColor: "#89a6aa"
  },
  accordionText: {
    padding: 20,
    backgroundColor: "transparent"
  },
  imgHit: {
    position: "absolute",
    top: 10,
    left: 10,
    backgroundColor: "#ef5350",
    zIndex: 2,
    alignItems: "center",
    justifyContent: "center",
    borderTopLeftRadius: 10,
    borderBottomRightRadius: 10
  },
  shareBtn: {
    position: "absolute",
    top: 10,
    right: 10
  },
  text: { color: "rgba(48, 44, 35, 0.9)" },
  background: {
    width: "100%",
    height: Dimensions.get("window").height,
    position: "absolute",
    top: 0,
    bottom: 0,
    left: 0,
    right: 0
  },
  default: {
    color: "#fff"
  },

  iconMenu: {
    color: "#58554e",
    marginBottom: 5
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
    paddingTop: 10,
    paddingBottom: 10,
    paddingRight: 7,
    paddingLeft: 7,
    fontWeight: "300"
  }
};
