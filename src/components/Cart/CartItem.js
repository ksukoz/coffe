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

import { scaleSize } from "../../helpers/scaleSize";

// import { updateCart } from "../../store/actions/cartActions";

class CartItem extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      search: "",
      qty: this.props.item.qty
    };
  }

  render() {
    const { cart, item } = this.props;
    const { qty } = this.state;

    return (
      <View style={styles.product}>
        <TouchableOpacity
          onPress={() => this.props.onDeletePressHandler(item.id, item.name)}
          activeOpacity={0.9}
          style={{
            position: "absolute",
            top: scaleSize(3),
            right: scaleSize(3),
            width: scaleSize(29),
            height: scaleSize(29),
            padding: scaleSize(5),
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
                style={{
                  paddingLeft: scaleSize(10),
                  paddingTop: scaleSize(5),
                  paddingBottom: scaleSize(5)
                }}
                onPress={() =>
                  item.qty == "1"
                    ? false
                    : this.props.onCartUpdateHandler(item.id, +item.qty - 1)
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
                style={{
                  paddingRight: scaleSize(10),
                  paddingTop: scaleSize(5),
                  paddingBottom: scaleSize(5)
                }}
                onPress={() =>
                  this.props.onCartUpdateHandler(item.id, +item.qty + 1)
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
            <Text
              style={{
                flex: 1,
                textAlign: "right",
                color: "#010101",
                fontSize: scaleSize(19),
                fontWeight: "300"
              }}
            >
              {(+item.price * item.qty).toFixed()} грн
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
    width: "80%",
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

// const mapDispatchToProps = dispatch => ({
//   updateCart: (id, quantity) => dispatch(updateCart(id, quantity))
// });

export default connect(
  null,
  // mapDispatchToProps
  null
)(CartItem);
