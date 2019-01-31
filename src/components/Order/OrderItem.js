import React, { PureComponent } from "react";
import { connect } from "react-redux";
import {
  View,
  TouchableOpacity,
  Image,
  StyleSheet,
  Text,
  Alert
} from "react-native";
import { Icon } from "native-base";
import KawaIcon from "../KawaIcon";
import StarRating from "react-native-star-rating";

import { scaleSize } from "../../helpers/scaleSize";

import { updateCart } from "../../store/actions/cartActions";
// import { clearProducts } from "../../store/actions/catalogActions";

class OrderItem extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      search: "",
      qty: this.props.product
        ? this.props.cart.filter(
            cartItem => cartItem.id === this.props.item.id
          )[0].qty
        : this.props.item.qty
    };
  }

  render() {
    const { cart, item, product } = this.props;
    const { qty } = this.state;
    const filteredCart =
      cart && product ? cart.filter(cartItem => cartItem.id === item.id) : [];

    return (
      <View style={this.props.product ? styles.productItem : styles.product}>
        <View style={{ position: "relative" }}>
          {item.new == 1 && Date.now() <= +`${item.new_date}000` ? (
            <View style={styles.imgHit}>
              <Text style={styles.imgLabel}>{"Новинка".toUpperCase()}</Text>
            </View>
          ) : item.popular == 1 ? (
            <View style={styles.imgHit}>
              <Text style={styles.imgLabel}>{"Хит".toUpperCase()}</Text>
            </View>
          ) : null}
          <Image
            resizeMode="contain"
            source={{ uri: "http://kawa.gumione.pro" + item.file }}
            style={
              this.props.product
                ? [
                    styles.productImg,
                    {
                      width: product ? scaleSize(300) : scaleSize(90),
                      height: scaleSize(180)
                    }
                  ]
                : styles.productImg
            }
          />
        </View>

        <View style={{ flex: 1 }}>
          <View
            style={{
              paddingBottom: scaleSize(8)
            }}
          >
            <Text style={styles.productName}>{item.name}</Text>
            <Text style={[styles.productSort, {}]}>
              {item.cname}
              {item.pid > 7
                ? ""
                : `, ${item.sort} ${
                    item.arabic_percent ? item.arabic_percent + "%" : ""
                  }`}
            </Text>
            <Text style={styles.productRoast}>
              {item.pid > 7 ? "" : `Обжарка ${item.roast}`}
            </Text>
            <Text style={styles.productRoast}>Код товара {item.code}</Text>
          </View>
          <View
            style={{
              flexDirection: "row",
              marginTop: product ? scaleSize(-30) : scaleSize(-20)
            }}
          >
            <View
              style={{
                borderBottomWidth: 1,
                borderColor: "#89a6aa",

                flex: 1,
                marginBottom: scaleSize(5.5),
                marginRight: scaleSize(7),
                marginLeft: product ? scaleSize(-10) : 0
              }}
            />
            <Text
              style={{
                color: "#010101",
                fontSize: product ? scaleSize(27) : scaleSize(19),
                fontWeight: "300"
              }}
            >
              {product && filteredCart[0]
                ? (filteredCart[0].qty * item.price).toFixed()
                : (item.qty * item.price).toFixed()}{" "}
              грн
            </Text>
          </View>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
              flexWrap: "nowrap",
              marginTop: scaleSize(3)
            }}
          >
            <TouchableOpacity
              style={{ marginBottom: scaleSize(7) }}
              activeOpacity={1}
            >
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  marginTop: this.props.product ? scaleSize(5) : scaleSize(-3)
                }}
              >
                {this.props.product ? (
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
                      rating={item.avg_rating}
                      starSize={scaleSize(23)}
                      starStyle={{ marginRight: scaleSize(2) }}
                      emptyStarColor={"#ffea00"}
                      fullStarColor={"#ffea00"}
                    />
                  </View>
                ) : (
                  <KawaIcon
                    style={styles.starIcon}
                    size={scaleSize(16)}
                    name="small-star-in-catalog"
                  />
                )}
                <Text
                  style={
                    this.props.product
                      ? [styles.productRating, { fontSize: scaleSize(11) }]
                      : styles.productRating
                  }
                >
                  {this.props.product
                    ? ""
                    : item.avg_rating > 0
                    ? (+item.avg_rating).toFixed(1)
                    : item.avg_rating}
                </Text>
              </View>
              <Text
                style={
                  this.props.product
                    ? [styles.numberOfReviews, { fontSize: scaleSize(11) }]
                    : styles.numberOfReviews
                }
              >
                Отзывов {item.comments}
              </Text>
            </TouchableOpacity>
            <View
              style={{
                flexDirection: "row",
                marginTop: scaleSize(-6)
              }}
            >
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "center",
                  alignItems: "center"
                }}
              >
                <TouchableOpacity
                  style={{
                    paddingLeft: scaleSize(10),
                    paddingTop: scaleSize(5),
                    paddingBottom: scaleSize(5)
                  }}
                  onPress={() =>
                    item.qty == "1" ||
                    (filteredCart[0] && filteredCart[0].qty == "1")
                      ? false
                      : product &&
                        filteredCart[0] &&
                        filteredCart[0].qty === qty
                      ? this.setState({ qty: +qty - 1 }, () =>
                          this.props.updateCart(
                            item.id,
                            +filteredCart[0].qty - 1
                          )
                        )
                      : item.qty == qty
                      ? this.setState(
                          { qty: +item.qty - 1 },
                          this.props.updateCart(item.id, +item.qty - 1)
                        )
                      : false
                  }
                  activeOpacity={0.9}
                >
                  <Icon
                    style={{
                      color: "#7e7a71",
                      fontSize: scaleSize(18),
                      opacity:
                        product && filteredCart[0] && filteredCart[0].qty == "1"
                          ? 0.5
                          : item.qty == "1"
                          ? 0.5
                          : 1
                    }}
                    name="remove-circle-outline"
                    type="MaterialIcons"
                  />
                </TouchableOpacity>
                <Text
                  style={{
                    color: "#302c23",
                    fontSize: scaleSize(16),
                    paddingLeft: scaleSize(7),
                    paddingRight: scaleSize(7)
                  }}
                >
                  {qty}
                </Text>
                <TouchableOpacity
                  style={{
                    paddingRight: scaleSize(10),
                    paddingTop: scaleSize(5),
                    paddingBottom: scaleSize(5)
                  }}
                  onPress={() =>
                    product && filteredCart[0] && filteredCart[0].qty === qty
                      ? this.setState({ qty: +qty + 1 }, () =>
                          this.props.updateCart(
                            item.id,
                            +filteredCart[0].qty + 1
                          )
                        )
                      : item.qty == qty
                      ? this.setState(
                          { qty: +item.qty + 1 },
                          this.props.updateCart(item.id, +item.qty + 1)
                        )
                      : false
                  }
                  activeOpacity={0.9}
                >
                  <Icon
                    style={{
                      color: "#7e7a71",
                      fontSize: scaleSize(18)
                    }}
                    name="control-point"
                    type="MaterialIcons"
                  />
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  product: {
    backgroundColor: "rgba(255,255,255, 0.7)",
    marginBottom: scaleSize(7),
    flexDirection: "row",
    paddingTop: scaleSize(6),
    paddingBottom: scaleSize(6),
    paddingRight: scaleSize(10),
    borderRadius: scaleSize(8),
    position: "relative"
  },
  productItem: {
    backgroundColor: "rgba(255,255,255, 0.7)",
    marginBottom: scaleSize(7),
    flexDirection: "column",
    paddingTop: scaleSize(6),
    paddingBottom: scaleSize(6),
    paddingRight: scaleSize(10),
    paddingLeft: scaleSize(10),
    borderRadius: scaleSize(8)
  },
  productImg: {
    alignSelf: "center",
    height: scaleSize(100),
    width: scaleSize(56),
    marginRight: scaleSize(12),
    marginLeft: scaleSize(12),
    marginTop: scaleSize(4)
  },
  imgHit: {
    position: "absolute",
    top: scaleSize(10),
    left: scaleSize(5),
    backgroundColor: "#ef5350",
    zIndex: 2,
    alignItems: "center",
    justifyContent: "center",
    height: scaleSize(17),
    borderTopLeftRadius: scaleSize(10),
    borderBottomRightRadius: scaleSize(10)
  },
  imgLabel: {
    fontSize: scaleSize(10),
    paddingLeft: scaleSize(10),
    paddingRight: scaleSize(10),
    paddingTop: scaleSize(5),
    paddingBottom: scaleSize(5),
    color: "#fff"
  },
  productSort: {
    fontSize: scaleSize(13),
    color: "#48433b",
    marginBottom: 1
  },
  productRoast: {
    color: "#48433b",
    fontSize: scaleSize(13)
  },
  productName: {
    fontSize: scaleSize(15),
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
});

const mapDispatchToProps = dispatch => ({
  updateCart: (id, quantity) => dispatch(updateCart(id, quantity))
});

export default connect(
  null,
  mapDispatchToProps
)(OrderItem);
