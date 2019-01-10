import React, { Component } from "react";
import { View, Image, Text } from "react-native";
import { scaleSize } from "../../helpers/scaleSize";

import WebView from "react-native-android-fullscreen-webview-video";

export default class YoutubePlayer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      height: scaleSize(185),

      videoChannel: "",
      videoTitle: "",
      videoImg: ""
    };
  }

  componentDidMount() {
    this.retrieveData();
  }

  retrieveData = () => {
    fetch(
      `https://www.googleapis.com/youtube/v3/videos?id=${
        this.props.video
      }&key=AIzaSyBZ7at05fHFNILtzoWZuq3hSJJWS0REjZg&part=snippet`
    )
      .then(response => response.json())
      .then(responseJson => {
        this.setState({
          videoTitle: responseJson.items[0].snippet.title
        });

        fetch(
          `https://www.googleapis.com/youtube/v3/channels?id=${
            responseJson.items[0].snippet.channelId
          }&key=AIzaSyBZ7at05fHFNILtzoWZuq3hSJJWS0REjZg&part=snippet`
        )
          .then(response => response.json())
          .then(responseJson => {
            this.setState({
              videoChannel: responseJson.items[0].snippet.title,
              videoImg: responseJson.items[0].snippet.thumbnails.default.url
            });
          })
          .catch(error => {
            console.error(error);
          });
      })
      .catch(error => {
        console.error(error);
      });
  };

  render() {
    const { video } = this.props;
    return (
      <View>
        <View
          style={{
            borderRadius: scaleSize(5),
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
              uri: `https://www.youtube.com/embed/${video}?rel=0&autoplay=0&showinfo=1&controls=1&allowfullscreen&listType=user_uploads`
            }}
          />
        </View>
        <View style={{ flexDirection: "row", marginBottom: scaleSize(15) }}>
          <Image
            source={{ uri: this.state.videoImg }}
            style={{
              width: scaleSize(50),
              height: scaleSize(50),
              borderRadius: scaleSize(50),
              marginLeft: scaleSize(15),
              marginRight: scaleSize(10)
            }}
          />
          <View style={{ justifyContent: "space-between" }}>
            <Text style={{ fontSize: scaleSize(18), color: "#000" }}>
              {this.state.videoTitle}
            </Text>
            <Text style={{ fontSize: scaleSize(13) }}>
              {this.state.videoChannel}
            </Text>
          </View>
        </View>
      </View>
    );
  }
}
