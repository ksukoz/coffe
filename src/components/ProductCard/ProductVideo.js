import React, { Component } from "react";

import YouTube from "react-native-youtube";

export default class ProductVideo extends Component {
  render() {
    return (
      <View>
        <View style={{ display: showReviewsForm ? "flex" : "none" }}>
          <View
            style={[
              styles.container,
              {
                marginBottom: scaleSize(30)
              }
            ]}
          />
        </View>
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
