import React, { Component } from "react";
import { View, StyleSheet, Text } from "react-native";
import { scaleSize } from "../../helpers/scaleSize";
import YoutubePlayer from "./YoutubePlayer";

export default class ProductVideo extends Component {
  render() {
    const { videos } = this.props;

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
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    marginLeft: scaleSize(5),
    marginRight: scaleSize(5),
    padding: scaleSize(10),
    backgroundColor: "rgba(255,255,255,.72)",
    borderRadius: scaleSize(5)
  },

  text: { color: "rgba(48, 44, 35, 0.9)", fontSize: scaleSize(13) }
});
