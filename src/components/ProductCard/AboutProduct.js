import React, { Component } from "react";
import { connect } from "react-redux";
import {
  View,
  ScrollView,
  TouchableOpacity,
  Dimensions,
  Image,
  TouchableWithoutFeedback,
  StyleSheet
} from "react-native";
import { Text, Input, Accordion, Card, CardItem } from "native-base";
import KawaIcon from "../KawaIcon";
import StarRating from "react-native-star-rating";
import Lightbox from "react-native-lightbox";
import Swiper from "react-native-swiper";

import MyWebView from "react-native-webview-autoheight";

import { scaleSize } from "../../helpers/scaleSize";

import { updateCart, addToCart } from "../../store/actions/cartActions";

import Share from "react-native-share";

const SCREEN_HEIGHT = Dimensions.get("window").height;

class AboutProduct extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: true
    };
    Input.defaultProps.selectionColor = "#000";
  }

  componentWillReceiveProps(nextProps) {
    console.log(nextProps);
  }

  _renderHeader(item, expanded) {
    return (
      <View style={[styles.accordionLinks, { borderBottomWidth: 0 }]}>
        <Text style={[styles.text, { marginLeft: -3 }]}> {item.title}</Text>
        {expanded ? (
          <KawaIcon
            style={{
              color: "#302c23",
              position: "absolute",
              right: scaleSize(10)
            }}
            name={"arrow-down"}
            size={scaleSize(8)}
          />
        ) : (
          <KawaIcon
            style={{
              color: "#302c23",
              position: "absolute",
              right: scaleSize(10)
            }}
            name={"arrow-next"}
            size={scaleSize(14)}
          />
        )}
      </View>
    );
  }
  _renderContent(item) {
    return (
      <View
        style={{
          paddingLeft: scaleSize(15)
        }}
      >
        <MyWebView
          style={styles.accordionText}
          scrollEnabled={false}
          automaticallyAdjustContentInsets={false}
          width={"100%"}
          source={{
            baseUrl: "",
            html: `<style>p {color: #302c23;}</style>${item.content}<br/>
            <p>Вес: ${item.weight} г.</p>
${
              item.pid == "3" || item.pid == "4"
                ? `<p>Количество: ${item.quantity} шт.</p>`
                : ""
            }
            <p>Упаковка: ${item.package}.</p>
            Страна производитель: ${item.country}`
          }}
        />
      </View>
    );
  }

  onShare(id) {
    const shareOptions = {
      title: `Поделиться ссылкой`,
      url: `http://kawa-share.surge.sh/${id}`
    };
    return Share.open(shareOptions);
  }

  render() {
    const { productItem, cart } = this.props;
    const dataArray = [];
    let product = {};

    const filteredCart = cart.filter(
      cartItem => cartItem.id === productItem.id
    );

    if (productItem) {
      dataArray.push({
        title: "Описание",
        content: productItem.text,
        weight: productItem.weight,
        pid: productItem.pid,
        package: productItem.package,
        country: productItem.country
      });

      product = productItem;
    }

    return (
      <ScrollView>
        <View style={[styles.container, { marginBottom: scaleSize(8) }]}>
          <Card transparent style={{ backgroundColor: "transparent" }}>
            <CardItem
              style={{
                backgroundColor: "transparent",
                paddingTop: scaleSize(20),
                position: "relative",
                textAlign: "center",
                alignItems: "center"
              }}
            >
              {product.new == 1 && Date.now() <= +`${product.new_date}000` ? (
                <View style={styles.imgHit}>
                  <Text style={styles.imgLabel}>{"Новинка".toUpperCase()}</Text>
                </View>
              ) : product.popular == 1 ? (
                <View style={styles.imgHit}>
                  <Text style={styles.imgLabel}>{"Хит".toUpperCase()}</Text>
                </View>
              ) : null}

              {product.file.length > 1 ? (
                <Swiper
                  // style={styles.wrapper}
                  height={scaleSize(175)}
                  keyboardShouldPersistTaps={"always"}
                  onMomentumScrollBegin={(e, state, context) =>
                    console.log(e, state, context)
                  }
                  onMomentumScrollEnd={(e, state, context) =>
                    console.log(e, state, context)
                  }
                  dot={
                    <View
                      style={{
                        backgroundColor: "rgba(0,0,0,.2)",
                        width: 5,
                        height: 5,
                        borderRadius: 4,
                        marginLeft: 3,
                        marginRight: 3,
                        marginTop: 3,
                        marginBottom: 3
                      }}
                    />
                  }
                  activeDot={
                    <View
                      style={{
                        backgroundColor: "#89a6aa",
                        width: 8,
                        height: 8,
                        borderRadius: 4,
                        marginLeft: 3,
                        marginRight: 3,
                        marginTop: 3,
                        marginBottom: 3
                      }}
                    />
                  }
                  paginationStyle={{
                    bottom: 0
                  }}
                  loop
                >
                  {product.file.map(image => (
                    // <Lightbox
                    //   style={{ flex: 1, flexGrow: 1, zIndex: 2 }}
                    //   navigator={this.props.navigator}
                    //   onOpen={this.props.onImgPress}
                    //   willClose={this.props.onImgClose}
                    //   backgroundColor={"rgba(0,0,0,0.7)"}
                    //   underlayColor={"transparent"}
                    //   // springConfig={{ tension: 100, friction: 100 }}
                    // >
                    // <View>
                    <TouchableWithoutFeedback
                      style={{ zIndex: 2 }}
                      onPress={() => console.log("press")}
                    >
                      <Image
                        source={{
                          uri: `http://kawa.gumione.pro/${image}`
                        }}
                        style={{
                          // flex: 1,
                          height: scaleSize(154)
                        }}
                        resizeMethod="scale"
                        resizeMode="contain"
                      />
                    </TouchableWithoutFeedback>
                    // </View>
                    // </Lightbox>
                  ))}
                </Swiper>
              ) : (
                <Lightbox
                  style={{ flex: 1, flexGrow: 1, zIndex: 2 }}
                  navigator={this.props.navigator}
                  onOpen={this.props.onImgPress}
                  willClose={this.props.onImgClose}
                  backgroundColor={"rgba(0,0,0,0.7)"}
                  underlayColor={"transparent"}
                  // springConfig={{ tension: 100, friction: 100 }}
                >
                  <Image
                    source={{
                      uri: `http://kawa.gumione.pro${product.file}`
                    }}
                    style={{
                      flex: 1,
                      height: scaleSize(154)
                    }}
                    resizeMethod="scale"
                    resizeMode="contain"
                  />
                </Lightbox>
              )}
              <View
                style={{
                  position: "absolute",
                  flex: 1,
                  left: 0,
                  right: 0,
                  bottom: scaleSize(-20),
                  top: scaleSize(20)
                }}
              >
                <Image
                  source={{
                    uri: `http://kawa.gumione.pro${product.file}`
                  }}
                  style={{
                    height: scaleSize(154)
                  }}
                  resizeMethod="scale"
                  resizeMode="contain"
                />
              </View>
              <TouchableOpacity
                style={styles.shareBtn}
                onPress={() => this.onShare(product.id)}
                activeOpacity={0.9}
              >
                <KawaIcon color="#302c23" size={25} name="share" />
              </TouchableOpacity>
            </CardItem>
            <CardItem style={styles.cardItem}>
              <View
                style={{
                  flexDirection: "column",
                  padding: scaleSize(10),
                  paddingBottom: 0
                }}
              >
                <Text
                  style={{
                    fontSize: scaleSize(18),
                    lineHeight: scaleSize(20),
                    color: "#000"
                  }}
                >
                  {product.name}
                </Text>
                <Text style={[styles.text, { color: "#3F3B32" }]}>
                  {this.props.categories.filter(
                    category => category.id === product.pid
                  ).length > 0
                    ? this.props.categories.filter(
                        category => category.id === product.pid
                      )[0].name
                    : ""}
                  {product.pid > 7
                    ? ""
                    : `, ${product.sort_human} ${
                        product.arabic_percent
                          ? product.arabic_percent + "%"
                          : ""
                      }`}
                </Text>
                <Text style={[styles.text, { color: "#3F3B32" }]}>
                  {product.pid > 7 ? "" : `Обжарка ${product.roast_human}`}
                </Text>
              </View>
            </CardItem>
            <CardItem style={styles.cardItem}>
              <View
                style={{
                  flexDirection: "column",
                  width: "70%",
                  borderBottomWidth: scaleSize(1),
                  borderBottomColor: "#89a6aa",
                  padding: scaleSize(10),
                  paddingTop: scaleSize(0)
                }}
              >
                <Text style={[styles.text, { color: "#3F3B32" }]}>
                  Код товара: {product.code}
                </Text>
              </View>
              <View>
                <Text
                  style={{
                    fontSize: scaleSize(26),
                    color: "#010101"
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
                {
                  paddingLeft: scaleSize(10),
                  paddingTop: scaleSize(5),
                  alignItems: "center",
                  alignContent: "center",
                  justifyContent: "space-between",
                  flexDirection: "row",
                  flex: 1
                }
              ]}
            >
              <View>
                <TouchableOpacity onPress={this.props.onReviewsPress}>
                  <View
                    style={{
                      flexDirection: "row",
                      alignItems: "center",
                      marginBottom: scaleSize(5)
                    }}
                  >
                    <StarRating
                      disabled={true}
                      maxStars={5}
                      rating={product.avg_rating}
                      starSize={scaleSize(23)}
                      starStyle={{ marginRight: scaleSize(2) }}
                      emptyStarColor={"#ffea00"}
                      fullStarColor={"#ffea00"}
                    />
                  </View>
                  <Text style={[styles.numberOfReviews, styles.text]}>
                    Отзывов {product.comments}
                  </Text>
                </TouchableOpacity>
              </View>
              <View
                style={{
                  alignSelf: "center",
                  marginLeft: scaleSize(-4)
                }}
              >
                <TouchableOpacity
                  style={{ position: "relative", padding: scaleSize(10) }}
                  activeOpacity={0.9}
                  onLongPress={() => this.props.navigation.push("Cart")}
                  onPress={() =>
                    filteredCart.length > 0
                      ? this.props.updateCart(productItem.id, 0)
                      : this.props.addToCart(productItem.id)
                  }
                >
                  <KawaIcon
                    style={styles.cartIcon}
                    size={scaleSize(30)}
                    name={
                      filteredCart.length > 0
                        ? "small-cart-in-catalog-with-buy"
                        : "small-cart-in-catalog"
                    }
                  />
                  <View
                    style={{
                      opacity: filteredCart.length > 0 ? 1 : 0,
                      position: "absolute",
                      bottom: scaleSize(10),
                      right: scaleSize(10),
                      borderRadius: scaleSize(7.5),
                      backgroundColor: "#ef5350",

                      alignContent: "center",
                      alignItems: "center",
                      justifyContent: "center",
                      width: scaleSize(15),
                      height: scaleSize(15)
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
                      {filteredCart.length > 0 ? 1 : ""}
                    </Text>
                  </View>
                </TouchableOpacity>
              </View>
              <View>
                <TouchableOpacity
                  onPress={this.props.onPressBuyButton}
                  style={[styles.btn]}
                >
                  <Text style={styles.btnText}>КУПИТЬ СЕЙЧАС</Text>
                </TouchableOpacity>
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
                right: scaleSize(10)
              }}
              name={"arrow-next"}
              size={scaleSize(14)}
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
                right: scaleSize(10)
              }}
              name={"arrow-next"}
              size={scaleSize(14)}
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
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    marginLeft: scaleSize(8),
    marginRight: scaleSize(8),
    backgroundColor: "rgba(255,255,255,.72)",
    borderRadius: scaleSize(5),
    overflow: "hidden"
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
    paddingLeft: scaleSize(5),
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
    alignItems: "center",
    justifyContent: "center",
    borderTopLeftRadius: scaleSize(10),
    borderBottomRightRadius: scaleSize(10),
    zIndex: 10
  },
  imgLabel: {
    fontSize: scaleSize(10),

    paddingLeft: scaleSize(10),
    paddingRight: scaleSize(10),
    paddingTop: scaleSize(5),
    paddingBottom: scaleSize(5),
    color: "#fff"
  },
  shareBtn: {
    position: "absolute",
    top: scaleSize(10),
    right: scaleSize(10)
  },
  text: { color: "#302c23", fontSize: 16 },
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
    color: "#48433b",
    textAlign: "center"
  },
  btn: {
    backgroundColor: "#ea9308",
    borderRadius: scaleSize(3)
  },
  btnText: {
    fontSize: scaleSize(12),
    textAlign: "center",
    color: "#f8f8f8",
    paddingTop: scaleSize(10),
    paddingBottom: scaleSize(10),
    paddingRight: scaleSize(7),
    paddingLeft: scaleSize(7),
    fontWeight: "300"
  }
});

const mapDispatchToProps = dispatch => ({
  updateCart: (id, quantity) => dispatch(updateCart(id, quantity)),
  addToCart: id => dispatch(addToCart(id))
});

export default connect(
  null,
  mapDispatchToProps
)(AboutProduct);
