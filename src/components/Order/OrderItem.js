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
      search: ""
      // index: 0,
      // cart: false
    };
  }

  onDeletePressHandler = id => {
    Alert.alert(
      "Вы удалили",
      "My Alert Msg",
      [
        { text: "OK", onPress: () => this.props.updateCart(id, 0) },
        {
          text: "Отмена",
          onPress: () => {},
          style: "destructive"
        }
      ],
      { cancelable: false }
    );
  };

  render() {
    const { cart, item } = this.props;
    // const filteredCart = cart
    //   ? cart.filter(cartItem => cartItem.id === item.id)
    //   : [];

    return (
      <View
        // activeOpacity={0.9}
        // onPress={() => {
        //   this.props.navigation.push("ProductCard", {
        //     productId: item.id,
        //     search: this.props.navigation.getParam("search", ""),
        //     searchPlaceholder:
        //       this.props.categories.filter(category => category.id === item.pid)
        //         .length > 0
        //         ? this.props.categories.filter(
        //             category => category.id === item.pid
        //           )[0].name
        //         : "",
        //     categoryId
        //   });
        // }}
        style={styles.product}
      >
        <TouchableOpacity
          onPress={() => this.onDeletePressHandler(item.id)}
          activeOpacity={0.9}
          style={{
            position: "absolute",
            top: scaleSize(8),
            right: scaleSize(8),
            width: scaleSize(19),
            height: scaleSize(19),
            zIndex: 3
          }}
        >
          <Icon
            style={{
              color: "#302c23",
              fontSize: scaleSize(19)
            }}
            name="cancel"
            type="MaterialIcons"
          />
        </TouchableOpacity>
        <View>
          <Image
            resizeMethod="resize"
            source={{ uri: "http://kawa.gumione.pro" + item.file }}
            style={styles.productImg}
          />
        </View>

        <View style={{ flex: 1 }}>
          <View
            style={{
              borderBottomWidth: 1,
              borderColor: "#89a6aa",
              paddingBottom: scaleSize(8)
            }}
          >
            <Text style={styles.productName}>
              {item.name} Lorem ipsum dolor sit amet
            </Text>
            <Text style={[styles.productSort, {}]}>
              {this.props.categories.filter(
                category => category.id === item.pid
              ).length > 0
                ? this.props.categories.filter(
                    category => category.id === item.pid
                  )[0].name
                : ""}
              {item.pid > 7
                ? ""
                : `, ${item.sort_human} ${
                    item.arabic_percent ? item.arabic_percent + "%" : ""
                  }`}
            </Text>
            <Text style={styles.productRoast}>
              {item.pid > 7 ? "" : `Обжарка ${item.roast_human}`}
            </Text>
          </View>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "flex-end",
              marginTop: scaleSize(6)
            }}
          >
            <View
              style={{
                flex: 2,
                flexDirection: "row",
                justifyContent: "center",
                alignItems: "center"
              }}
            >
              <TouchableOpacity
                onPress={() =>
                  item.qty == "1"
                    ? false
                    : this.props.updateCart(item.id, +item.qty - 1)
                }
                activeOpacity={0.9}
              >
                <Icon
                  style={{
                    color: "#7e7a71",
                    fontSize: scaleSize(18),
                    opacity: item.qty == "1" ? 0.5 : 1
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
                {item.qty}
              </Text>
              <TouchableOpacity
                onPress={() => this.props.updateCart(item.id, +item.qty + 1)}
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
            <Text
              style={{
                flex: 1,
                textAlign: "right",
                color: "#010101",
                fontSize: scaleSize(19),
                fontWeight: "300"
              }}
            >
              {(+item.price).toFixed()} грн
            </Text>
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
  productImg: {
    alignSelf: "center",
    height: scaleSize(100),
    width: scaleSize(56),
    marginRight: scaleSize(12),
    marginLeft: scaleSize(12),
    marginTop: scaleSize(4)
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
