import React, { Component } from "react";
import { View, Dimensions, Text, WebView } from "react-native";
import YouTube from "react-native-youtube";
import { scaleSize } from "../../helpers/scaleSize";
import YoutubePlayer from "./YoutubePlayer";

export default class ProductVideo extends Component {
  render() {
    const { videos, product, categoryName } = this.props;

    return (
      <View style={{ backgroundColor: "transparent", flexGrow: 1, flex: 1 }}>
        <View>
          <View
            style={[
              styles.container,
              {
                marginBottom: scaleSize(30)
              }
            ]}
          >
            {videos ? (
              videos.map(video => <YoutubePlayer video={video.code} />)
            ) : (
              <Text />
            )}
            <Text
              style={{
                fontSize: scaleSize(18),
                fontWeight: "bold",
                color: "#000"
              }}
            >
              {product.name} {product.weight} g
            </Text>
            <Text style={styles.text}>
              {categoryName}, Арабика {product.arabic_percent}%
            </Text>
          </View>
        </View>
      </View>
    );
  }
}

const styles = {
  container: {
    marginLeft: scaleSize(5),
    marginRight: scaleSize(5),
    padding: scaleSize(10),
    backgroundColor: "rgba(255,255,255,.72)",
    borderRadius: scaleSize(5)
  },

  text: { color: "rgba(48, 44, 35, 0.9)", fontSize: scaleSize(13) }
};
