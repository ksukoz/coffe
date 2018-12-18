import React, { Component } from "react";
import { connect } from "react-redux";
import {
  View,
  Dimensions,
  ActivityIndicator,
  TextInput,
  TouchableOpacity
} from "react-native";
import { Text, Input, Card, CardItem } from "native-base";
import KawaIcon from "../KawaIcon";
import StarRating from "react-native-star-rating";

import {
  getProductReviews,
  addProductReviews
} from "../../store/actions/catalogActions";

import { scaleSize } from "../../helpers/scaleSize";

const SCREEN_HEIGHT = Dimensions.get("window").height;

class ProductReviews extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: true,
      reviews: null,
      review: "",
      id: this.props.id,
      rating: 0,
      message: ""
    };
    Input.defaultProps.selectionColor = "#000";
  }

  componentWillMount() {
    this.props.getProductReviews(this.props.id);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.reviews) {
      this.setState({
        loading: false,
        reviews: nextProps.reviews,
        id: this.props.id,
        rating: 0,
        review: ""
      });
    }
  }

  onStarRatingPress(rating) {
    this.setState({
      rating
    });
  }

  onAddProductReview() {
    let data = new FormData();
    data.append("item_id", this.state.id);
    data.append("text", this.state.review);
    data.append("rating", this.state.rating);

    this.props.addProductReviews(data, this.state.id);
  }

  render() {
    const { reviews, review, loading, rating } = this.state;
    const { productName, showReviewsForm } = this.props;

    return (
      <View>
        {loading ? (
          <ActivityIndicator size="large" animating />
        ) : (
          <View>
            <View style={{ display: showReviewsForm ? "flex" : "none" }}>
              <View
                style={[
                  styles.container,
                  {
                    marginBottom: scaleSize(30)
                  }
                ]}
              >
                <Card
                  transparent
                  style={{
                    backgroundColor: "transparent"
                  }}
                >
                  <CardItem
                    style={[
                      styles.cardItem,
                      {
                        paddingTop: scaleSize(7)
                      }
                    ]}
                  >
                    <Text style={styles.headingBig}>{productName}</Text>
                  </CardItem>
                  <CardItem
                    style={[
                      styles.cardItem,
                      {
                        paddingBottom: scaleSize(10),
                        justifyContent: "center"
                      }
                    ]}
                  >
                    <Text style={[styles.text, { fontSize: scaleSize(15) }]}>
                      Уже пробовали? Оцените
                    </Text>
                  </CardItem>
                  <CardItem
                    style={[
                      styles.cardItem,
                      {
                        paddingBottom: scaleSize(10),
                        justifyContent: "center"
                      }
                    ]}
                  >
                    <StarRating
                      disabled={false}
                      maxStars={5}
                      rating={rating}
                      starSize={scaleSize(48)}
                      starStyle={{
                        marginRight: scaleSize(10),
                        marginLeft: scaleSize(10)
                      }}
                      emptyStarColor={"#ffea00"}
                      fullStarColor={"#ffea00"}
                      halfStarEnabled={true}
                      selectedStar={rating => this.onStarRatingPress(rating)}
                    />
                  </CardItem>
                </Card>
              </View>
              <View>
                <View>
                  <TextInput
                    multiline={true}
                    numberOfLines={1}
                    editable={true}
                    placeholder={"Оставить отзыв"}
                    placeholderTextColor={"rgba(255, 255, 255, .8)"}
                    maxLength={300}
                    value={review}
                    style={[
                      styles.textInput,
                      { marginRight: 10, marginLeft: 10 }
                    ]}
                    onChangeText={review => this.setState({ review })}
                    onSubmitEditing={() => this.onAddProductReview()}
                  />
                </View>

                <TouchableOpacity
                  onPress={() => this.onAddProductReview()}
                  style={styles.btn}
                >
                  <Text style={styles.btnText}>
                    {"Отправить".toUpperCase()}
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
            {reviews.length > 0 ? (
              reviews.map(review => {
                let date = new Date(+`${review.date}000`);

                return (
                  <View
                    key={review.id}
                    style={[styles.container, { marginBottom: scaleSize(10) }]}
                  >
                    <Card
                      transparent
                      style={{ backgroundColor: "transparent" }}
                    >
                      <CardItem style={styles.cardItem}>
                        <View style={styles.row}>
                          <Text style={styles.heading}>{review.username}</Text>
                          <Text style={styles.heading}>
                            {date.getDate()}.{date.getMonth() + 1}.
                            {date.getFullYear()}
                          </Text>
                        </View>
                      </CardItem>
                      <CardItem
                        style={[styles.cardItem, { alignItems: "flex-start" }]}
                      >
                        <StarRating
                          disabled={true}
                          maxStars={5}
                          rating={review.rating}
                          starSize={scaleSize(20)}
                          starStyle={{ marginRight: scaleSize(2) }}
                          emptyStarColor={"#ffea00"}
                          fullStarColor={"#ffea00"}
                        />
                        <Text
                          style={[styles.text, { paddingLeft: scaleSize(10) }]}
                        >
                          {+review.rating < 2
                            ? "кошмар"
                            : +review.rating < 3
                            ? "плохо"
                            : +review.rating < 4
                            ? "неплохо"
                            : +review.rating < 5
                            ? "хорошо"
                            : "отлично"}
                        </Text>
                      </CardItem>
                      <CardItem style={styles.cardItem}>
                        <Text style={styles.text}>{review.text}</Text>
                      </CardItem>
                    </Card>
                  </View>
                );
              })
            ) : (
              <Text
                style={[styles.heading, { textAlign: "center", color: "#fff" }]}
              >
                Никто ещё не оставил комментариев
              </Text>
            )}
          </View>
        )}
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
  row: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between"
  },
  cardItem: {
    backgroundColor: "transparent",
    paddingLeft: scaleSize(10),
    paddingRight: scaleSize(10),
    paddingTop: scaleSize(3),
    paddingBottom: 0
  },
  heading: { fontSize: scaleSize(15), fontWeight: "bold" },
  headingBig: {
    fontSize: scaleSize(17),
    paddingBottom: scaleSize(10)
  },
  text: { color: "rgba(48, 44, 35, 0.9)", fontSize: scaleSize(13) },
  background: {
    width: "100%",
    height: SCREEN_HEIGHT,
    position: "absolute",
    top: 0,
    bottom: 0,
    left: 0,
    right: 0
  },
  textInput: {
    color: "#fff",
    fontSize: scaleSize(17),
    paddingTop: scaleSize(10),
    paddingBottom: scaleSize(10),
    marginBottom: scaleSize(25),
    borderBottomWidth: 1,
    borderBottomColor: "rgba(255, 255, 255, 0.8)"
  },

  btn: {
    marginRight: scaleSize(10),
    marginLeft: scaleSize(10),
    marginBottom: scaleSize(35),
    marginTop: scaleSize(5),
    backgroundColor: "#ea9308",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: scaleSize(2)
  },
  btnText: {
    color: "#fff",
    fontWeight: "bold",
    paddingTop: scaleSize(7),
    paddingBottom: scaleSize(9)
  }
};

const mapStateToProps = state => ({
  reviews: state.catalog.reviews,
  message: state.common.message
});

const mapDispatchToProps = dispatch => ({
  getProductReviews: id => dispatch(getProductReviews(id)),
  addProductReviews: (data, id) => dispatch(addProductReviews(data, id))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ProductReviews);
