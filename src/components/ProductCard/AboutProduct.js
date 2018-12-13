import React, { Component } from "react";
import {
  View,
  TouchableOpacity,
  Dimensions,
  Image,
  Modal,
  WebView,
  TouchableHighlight
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
        <Text style={{ color: "#302c23" }}> {item.title}</Text>
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
            html: `${item.content}<p>Страна производитель ${item.country}</p>`
          }}
        />
      </View>
    );
  }

  setModalVisible(visible) {
    this.setState({ modalVisible: visible });
  }

  // closeModal(visible) {
  //   this.setState({ modalVisible: visible });
  // }

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
              style={{ backgroundColor: "transparent", paddingTop: 20 }}
            >
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
                <Text>
                  {this.props.categoryName}, {product.arabic_percent}%
                </Text>
                <Text>Обжарка {product.roast_human}</Text>
                <Text>Код товара: {product.code}</Text>
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
                    starSize={30}
                    starStyle={{ marginRight: 2 }}
                    emptyStarColor={"#ffea00"}
                    fullStarColor={"#ffea00"}
                  />
                </View>
                <Text style={styles.numberOfReviews}>27 отзывов</Text>
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
        <View style={[styles.container, { marginBottom: 40 }]}>
          <TouchableOpacity
            style={styles.accordionLinks}
            onPress={this.props.onPressDelivery}
          >
            <Text>Доставка и оплата</Text>
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
            <Text>Другие товары</Text>
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
        <TouchableOpacity
          style={styles.questionsBtn}
          onPress={() => this.setModalVisible(true)}
        >
          <KawaIcon
            style={{
              color: "#f8f8f8",
              position: "relative",
              paddingTop: 2,
              paddingRight: 5
            }}
            name={"telephone"}
            size={15}
          />
          <Text
            style={{
              color: "#f8f8f8",
              fontSize: 13
            }}
          >
            Возникли вопросы?
          </Text>
        </TouchableOpacity>
        <Modal
          animationType="slide"
          transparent={false}
          onRequestClose={() => {}}
          visible={this.state.modalVisible}
          style={styles.contactModal}
        >
          <View style={{ marginTop: 22 }}>
            <View>
              <Text>Hello World!</Text>
              <TouchableHighlight
                onPress={() => {
                  this.setModalVisible(!this.state.modalVisible);
                }}
              >
                <Text>Hide Modal</Text>
              </TouchableHighlight>
            </View>
          </View>
        </Modal>
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
    color: "#302c23",
    padding: 20,
    backgroundColor: "transparent",
    fontSize: 13
  },
  questionsBtn: {
    backgroundColor: "#89a6aa",
    alignSelf: "center",
    justifyContent: "center",
    position: "absolute",
    flexDirection: "row",
    padding: 5,
    bottom: 0,
    borderRadius: 3,
    marginBottom: 5
  },
  contactModal: {
    width: SCREEN_WIDTH * 0.7
  },
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
  imgHit: {
    position: "absolute",
    top: -2,
    left: 5,
    backgroundColor: "#ef5350",
    zIndex: 2,
    alignItems: "center",
    justifyContent: "center",
    width: 43,
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
    paddingTop: 10,
    paddingBottom: 10,
    paddingRight: 7,
    paddingLeft: 7,
    fontWeight: "300"
  }
};
