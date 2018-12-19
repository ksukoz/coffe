import React, { Component } from "react";
import { View } from "react-native";
import { scaleSize } from "../../helpers/scaleSize";

import WebView from "react-native-android-fullscreen-webview-video";

import Orientation from "react-native-orientation";

export default class YoutubePlayer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      height: scaleSize(185)
    };
  }

  render() {
    const { video } = this.props;
    return (
      <View
        style={{
          borderRadius: scaleSize(5),
          // overflow: 'hidden',
          marginBottom: scaleSize(15)
        }}
      >
        <WebView
          style={{
            flex: 1,
            height: scaleSize(185),
            zIndex: 1,
            borderRadius: scaleSize(5)
          }}
          source={{
            uri: `https://www.youtube.com/embed/${video}?rel=0&autoplay=0&showinfo=0&controls=1&allowfullscreen`
          }}
        />
      </View>
    );
  }
}
