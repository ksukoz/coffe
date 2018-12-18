import React, { Component } from "react";
import { View, Platform } from "react-native";
import YouTube from "react-native-youtube";
import { scaleSize } from "../../helpers/scaleSize";

import Orientation from "react-native-orientation";

export default class YoutubePlayer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      orientation: null,
      height: scaleSize(185),
      width: "100%"
    };
  }

  componentWillMount() {
    const initialOrientation = Orientation.getInitialOrientation();
    this.setState({
      orientation: initialOrientation
    });
  }

  componentDidMount() {
    Orientation.unlockAllOrientations();
    Orientation.addOrientationListener(o => this._orientationDidChange(o));
  }

  _orientationDidChange(orientation) {
    this.setState({
      orientation: orientation
    });
    if (orientation == "PORTRAIT") {
      setTimeout(
        () => this.setState({ youtube_controls_bug_height: 218 }),
        500
      );
    } else {
      setTimeout(
        () => this.setState({ youtube_controls_bug_height: 219 }),
        500
      );
    }
  }

  handleReady = () => {
    setTimeout(() => this.setState({ height: scaleSize(186) }), 500);
  };

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
          // fullscreen={false}
          fullscreen={this.state.orientation == "PORTRAIT" ? false : true}
          loop={false}
          controls={1}
          showFullscreenButton={true}
          onReady={this.handleReady}
          onChangeState={e => this.setState({ status: e.state })}
          onChangeQuality={e => this.setState({ quality: e.quality })}
          onChangeFullscreen={e =>
            !e.isFullscreen
              ? this.setState({ height: scaleSize(186), width: "100%" })
              : ""
          }
          onError={e => this.setState({ error: e.error })}
          style={{
            alignSelf: "stretch",
            height: this.state.height,
            width: this.state.width
          }}
        />
      </View>
    );
  }
}
