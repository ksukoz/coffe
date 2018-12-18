import React, { Component } from "react";
import { View, Platform } from "react-native";
import YouTube from "react-native-youtube";
import { scaleSize } from "../../helpers/scaleSize";

export default class YoutubePlayer extends Component {
  render() {
    const { video } = this.props;
    return (
      <View
        style={{
          borderRadius: scaleSize(5),
          position: "relative",
          backgroundColor: "rgba(255,255,255,.72)",
          overflow: "hidden",
          marginBottom: scaleSize(15)
        }}
      >
        <YouTube
          apiKey={"AIzaSyBZ7at05fHFNILtzoWZuq3hSJJWS0REjZg"}
          videoId={video}
          play={false}
          fullscreen={false}
          loop={false}
          controls={Platform.OS === "ios" ? 1 : 2}
          showFullscreenButton={true}
          onReady={e => this.setState({ isReady: true })}
          onChangeState={e => this.setState({ status: e.state })}
          onChangeQuality={e => this.setState({ quality: e.quality })}
          onError={e => this.setState({ error: e.error })}
          style={{
            alignSelf: "stretch",
            height: scaleSize(185)
          }}
        />
      </View>
    );
  }
}
