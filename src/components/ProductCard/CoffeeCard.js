import React, { Component } from "react";
import { Content, Input, Item, Text, Card, CardItem } from "native-base";
import {
  View,
  ScrollView,
  StatusBar,
  TouchableOpacity,
  Dimensions,
  PanResponder,
  StyleSheet
} from "react-native";
import KawaIcon from "../KawaIcon";
import Svg, { G } from "react-native-svg";

import Polygon from "react-native-svg/elements/Polygon";
import Line from "react-native-svg/elements/Line";
import Circle from "react-native-svg/elements/Circle";

import MyWebView from "react-native-webview-autoheight";

import { scaleSize } from "../../helpers/scaleSize";

StatusBar.setBarStyle("light-content", true);
StatusBar.setBackgroundColor("rgba(0,0,0,0)");

const SCREEN_WIDTH = Dimensions.get("window").width;

const width = SCREEN_WIDTH;
const yPadding = scaleSize(40);
const radius = scaleSize(120);
const total = 6;
const level = 6;
const rangeMin = 0;
const rangeMax = 50;
const arc = 2 * Math.PI;
const onePiece = arc / total;

let timer;
let selfObject;

export default class CoffeeCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      alphabet: [],
      english: true,
      strokeDashArray: {
        0: [0, 0],
        1: [3, 2],
        2: [3, 2],
        3: [3, 2],
        4: [3, 2],
        5: [0, 0]
      },
      colors: ["#ea9308", "#ea9308", "#ea9308", "#ea9308", "#ea9308"],
      position: this.props.position,
      positionRelease: 0,
      loading: false,
      typeDescriptions: [
        styles.typeDescriptionInvisible,
        styles.typeDescriptionInvisible,
        styles.typeDescriptionInvisible,
        styles.typeDescriptionInvisible,
        styles.typeDescriptionInvisible,
        styles.typeDescriptionInvisible
      ]
    };
    Input.defaultProps.selectionColor = "#000";
    selfObject = this;

    this.firstCircle = PanResponder.create({
      onStartShouldSetPanResponder: (evt, getstureState) => true,
      onPanResponderGrant: (e, gestureState) => {
        let positionGrand = this.state.position;
        this.setState({
          positionRelease: positionGrand[0]
        });
      },
      onPanResponderMove: (evt, getstureState) => {
        let positionChange = this.state.position;
        if (getstureState.y0 - getstureState.moveY < 0) {
          positionChange[0] = this.state.positionRelease;
          positionChange[0] -= getstureState.dy / 1.3;
          if (positionChange[0] <= 30) {
            positionChange[0] = 30;
            this.setState({
              position: positionChange
            });
          } else {
            this.setState({
              position: positionChange
            });
          }
        }
        if (getstureState.y0 - getstureState.moveY > 0) {
          positionChange[0] = this.state.positionRelease;
          positionChange[0] += (getstureState.y0 - getstureState.moveY) / 1.3;
          if (positionChange[0] >= 100) {
            positionChange[0] = 100;
            this.setState({
              position: positionChange
            });
          } else {
            this.setState({
              position: positionChange
            });
          }
        }
      },
      onPanResponderRelease: (evt, getstureState) => {
        let positionRelease = this.state.position;
        this.setState({
          positionRelease: positionRelease[0]
        });
      }
    });

    this.secondCircle = PanResponder.create({
      onStartShouldSetPanResponder: (evt, getstureState) => true,
      onPanResponderGrant: (e, gestureState) => {
        let positionGrand = this.state.position;
        this.setState({
          positionRelease: positionGrand[1]
        });
      },
      onPanResponderMove: (evt, getstureState) => {
        let positionChange = this.state.position;
        if (getstureState.y0 - getstureState.moveY < 0) {
          positionChange[1] = this.state.positionRelease;
          positionChange[1] -= getstureState.dy / 0.65;
          if (positionChange[1] <= 30) {
            positionChange[1] = 30;
            this.setState({
              position: positionChange
            });
          } else {
            this.setState({
              position: positionChange
            });
          }
        }
        if (getstureState.y0 - getstureState.moveY > 0) {
          positionChange[1] = this.state.positionRelease;
          positionChange[1] += (getstureState.y0 - getstureState.moveY) / 0.65;
          if (positionChange[1] >= 100) {
            positionChange[1] = 100;
            this.setState({
              position: positionChange
            });
          } else {
            this.setState({
              position: positionChange
            });
          }
        }
      },
      onPanResponderRelease: (evt, getstureState) => {
        let positionRelease = this.state.position;
        this.setState({
          positionRelease: positionRelease[1]
        });
      }
    });

    this.thirdCircle = PanResponder.create({
      onStartShouldSetPanResponder: (evt, getstureState) => true,
      onPanResponderGrant: (e, gestureState) => {
        let positionGrand = this.state.position;
        this.setState({
          positionRelease: positionGrand[2]
        });
      },
      onPanResponderMove: (evt, getstureState) => {
        let positionChange = this.state.position;
        if (getstureState.y0 - getstureState.moveY < 0) {
          positionChange[2] = this.state.positionRelease;
          positionChange[2] -= (getstureState.y0 - getstureState.moveY) / 0.65;
          if (positionChange[2] >= 100) {
            positionChange[2] = 100;
            this.setState({
              position: positionChange
            });
          } else {
            this.setState({
              position: positionChange
            });
          }
        }
        if (getstureState.y0 - getstureState.moveY > 0) {
          positionChange[2] = this.state.positionRelease;
          positionChange[2] += getstureState.dy / 0.65;
          if (positionChange[2] <= 30) {
            positionChange[2] = 30;
            this.setState({
              position: positionChange
            });
          } else {
            this.setState({
              position: positionChange
            });
          }
        }
      },
      onPanResponderRelease: (evt, getstureState) => {
        let positionRelease = this.state.position;
        this.setState({
          positionRelease: positionRelease[2]
        });
      }
    });

    this.fourthCircle = PanResponder.create({
      onStartShouldSetPanResponder: (evt, getstureState) => true,
      onPanResponderGrant: (e, gestureState) => {
        let positionGrand = this.state.position;
        this.setState({
          positionRelease: positionGrand[3]
        });
      },
      onPanResponderMove: (evt, getstureState) => {
        let positionChange = this.state.position;
        if (getstureState.y0 - getstureState.moveY < 0) {
          positionChange[3] = this.state.positionRelease;
          positionChange[3] -= (getstureState.y0 - getstureState.moveY) / 1.3;
          if (positionChange[3] >= 100) {
            positionChange[3] = 100;
            this.setState({
              position: positionChange
            });
          } else {
            this.setState({
              position: positionChange
            });
          }
        }
        if (getstureState.y0 - getstureState.moveY > 0) {
          positionChange[3] = this.state.positionRelease;
          positionChange[3] += getstureState.dy / 1.3;
          if (positionChange[3] <= 30) {
            positionChange[3] = 30;
            this.setState({
              position: positionChange
            });
          } else {
            this.setState({
              position: positionChange
            });
          }
        }
      },
      onPanResponderRelease: (evt, getstureState) => {
        let positionRelease = this.state.position;
        this.setState({
          positionRelease: positionRelease[3]
        });
      }
    });

    this.fifthCircle = PanResponder.create({
      onStartShouldSetPanResponder: (evt, getstureState) => true,
      onPanResponderGrant: (e, gestureState) => {
        let positionGrand = this.state.position;
        this.setState({
          positionRelease: positionGrand[4]
        });
      },
      onPanResponderMove: (evt, getstureState) => {
        let positionChange = this.state.position;
        if (getstureState.y0 - getstureState.moveY < 0) {
          positionChange[4] = this.state.positionRelease;
          positionChange[4] -= (getstureState.y0 - getstureState.moveY) / 0.65;
          if (positionChange[4] >= 100) {
            positionChange[4] = 100;
            this.setState({
              position: positionChange
            });
          } else {
            this.setState({
              position: positionChange
            });
          }
        }
        if (getstureState.y0 - getstureState.moveY > 0) {
          positionChange[4] = this.state.positionRelease;
          positionChange[4] += getstureState.dy / 0.65;
          if (positionChange[4] <= 30) {
            positionChange[4] = 30;
            this.setState({
              position: positionChange
            });
          } else {
            this.setState({
              position: positionChange
            });
          }
        }
      },
      onPanResponderRelease: (evt, getstureState) => {
        let positionRelease = this.state.position;
        this.setState({
          positionRelease: positionRelease[4]
        });
      }
    });

    this.sixthCircle = PanResponder.create({
      onStartShouldSetPanResponder: (evt, getstureState) => true,
      onPanResponderGrant: (e, gestureState) => {
        let positionGrand = this.state.position;
        this.setState({
          positionRelease: positionGrand[5]
        });
      },
      onPanResponderMove: (evt, getstureState) => {
        let positionChange = this.state.position;
        if (getstureState.y0 - getstureState.moveY < 0) {
          positionChange[5] = this.state.positionRelease;
          positionChange[5] -= getstureState.dy / 0.65;
          if (positionChange[5] <= 30) {
            positionChange[5] = 30;
            this.setState({
              position: positionChange
            });
          } else {
            this.setState({
              position: positionChange
            });
          }
        }
        if (getstureState.y0 - getstureState.moveY > 0) {
          positionChange[5] = this.state.positionRelease;
          positionChange[5] += (getstureState.y0 - getstureState.moveY) / 0.65;
          if (positionChange[5] >= 100) {
            positionChange[5] = 100;
            this.setState({
              position: positionChange
            });
          } else {
            this.setState({
              position: positionChange
            });
          }
        }
      },
      onPanResponderRelease: (evt, getstureState) => {
        let positionRelease = this.state.position;
        this.setState({
          positionRelease: positionRelease[5]
        });
      }
    });

    this.windowsRelease = PanResponder.create({
      onStartShouldSetPanResponder: (evt, getstureState) => true,
      onPanResponderGrant: (e, gestureState) => {
        let types = selfObject.state.typeDescriptions;
        for (i = 0; i < 6; i++) {
          types[i] = styles.typeDescriptionInvisible;
        }
        selfObject.setState({
          typeDescriptions: types
        });
      }
    });
  }

  hideDesc() {
    let types = selfObject.state.typeDescriptions;
    for (i = 0; i < 6; i++) {
      types[i] = styles.typeDescriptionInvisible;
    }
    selfObject.setState({
      typeDescriptions: types
    });
  }

  viewDescription(index) {
    let types = selfObject.state.typeDescriptions;
    if (types[index] == styles.typeDescriptionVisible) {
      for (i = 0; i < 6; i++) {
        types[i] = styles.typeDescriptionInvisible;
      }
      types[index] = styles.typeDescriptionInvisible;
    } else {
      for (i = 0; i < 6; i++) {
        types[i] = styles.typeDescriptionInvisible;
      }
      types[index] = styles.typeDescriptionVisible;
    }
    selfObject.setState({
      typeDescriptions: types
    });

    if (timer) {
      clearTimeout(timer);
    }

    timer = setTimeout(function() {
      for (i = 0; i < 6; i++) {
        types[i] = styles.typeDescriptionInvisible;
      }
      selfObject.setState({
        typeDescriptions: types
      });
    }, 5000);
  }

  componentWillMount() {}

  render() {
    const { caption, preparation, id, navigation, position } = this.props;

    var data = {
      fieldNames: [
        "Послевкусие",
        "Тело",
        "Баланс",
        "Кислотность",
        "Полнота",
        "Аромат"
      ],
      values: [
        this.state.position,
        [
          scaleSize(9),
          scaleSize(9),
          scaleSize(9),
          scaleSize(9),
          scaleSize(9),
          scaleSize(9)
        ]
      ]
    };

    var result = {
      webs: [],
      webPoints: [],
      areas: []
    };

    for (var k = 1; k < level + 1; k++) {
      let webs = "";
      let webPoints = [];
      let r = (radius / level) * k;
      let textPoint = [];
      let textRadius = radius + 20;

      for (var i = 0; i < total; i++) {
        let x = getX(r, i);
        let y = getY(r, i);
        webs += `${x},${y} `;
        webPoints.push({
          x,
          y
        });

        let textX = getX(textRadius, i);
        let textY = getY(textRadius, i);

        if (i == 0) {
          textY += 10;
        }

        if (i == 1) {
          textY -= 20;
        }

        if (i == 2) {
          textY += 20;
        }

        if (i == 3) {
          textY -= 0;
        }

        if (i == 4) {
          textY += 20;
        }

        if (i == 5) {
          textY -= 20;
        }

        textPoint.push({
          x: textX,
          y: textY
        });
      }
      result.webPoints.push(webPoints);
      result.webs.push(webs);

      if (!result.textPoints) {
        result.textPoints = textPoint;
      }
    }

    data.values.forEach((items, index) => {
      let circles = [];
      let area = "";
      items.forEach((item, insideIndex) => {
        let radiaRadius =
          (radius * (data.values[index][insideIndex] - rangeMin)) /
          (rangeMax - rangeMin);
        let x = getX(radiaRadius, insideIndex);
        let y = getY(radiaRadius, insideIndex);
        area += `${x},${y} `;
        circles.push({
          x,
          y
        });
      });
      result.areas.push({ area, circles });
    });

    function getX(r, i) {
      return r * Math.sin(i * onePiece);
    }

    function getY(r, i) {
      return -r * Math.cos(i * onePiece);
    }

    return (
      <ScrollView ref="info" pagingEnabled={true} horizontal={true}>
        <View
          style={styles.container}
          onStartShouldSetResponder={this.hideDesc}
        >
          <Content {...this.windowsRelease.panHandlers}>
            <View
              style={{
                position: "relative",
                display: this.props.pid > 7 ? "none" : "flex"
              }}
            >
              <Text
                style={{
                  paddingLeft: scaleSize(15),
                  color: "#fff",
                  marginBottom: scaleSize(10)
                }}
              >
                Способы приготовления:
              </Text>
              <TouchableOpacity
                style={{
                  position: "absolute",
                  right: scaleSize(10)
                }}
                onPress={() =>
                  navigation.push("CoffeeInfo", {
                    linkName: "ProductCardScreen",
                    productId: id,
                    preparation: preparation,
                    pid: this.props.pid
                  })
                }
              >
                <KawaIcon
                  color={"#f8f8f8"}
                  name={"question"}
                  size={scaleSize(25)}
                />
              </TouchableOpacity>
            </View>
            <View
              style={[
                styles.iconsRow,
                { display: this.props.pid > 7 ? "none" : "flex" }
              ]}
            >
              <KawaIcon
                color={preparation.includes("1") ? "#ea9308" : "#ffea00"}
                name={"cup"}
                size={scaleSize(30)}
                style={{ marginTop: 15 }}
              />
              <KawaIcon
                color={preparation.includes("3") ? "#ea9308" : "#ffea00"}
                name={"turk"}
                size={scaleSize(45)}
              />
              <KawaIcon
                color={preparation.includes("6") ? "#ea9308" : "#ffea00"}
                name={"pour-over"}
                size={scaleSize(45)}
              />
              <KawaIcon
                color={preparation.includes("4") ? "#ea9308" : "#ffea00"}
                name={"coffee-maker"}
                size={scaleSize(45)}
              />
              <KawaIcon
                color={preparation.includes("2") ? "#ea9308" : "#ffea00"}
                name={"french-press"}
                size={scaleSize(45)}
              />
              <KawaIcon
                color={
                  preparation.includes("5") || preparation.includes("8")
                    ? "#ea9308"
                    : "#ffea00"
                }
                name={"coffee-maker-electric"}
                size={scaleSize(45)}
              />
            </View>

            <View>
              {position.every(item => item == 0) ? null : (
                <Svg height={`${scaleSize(325)}`} width={`${scaleSize(325)}`}>
                  <G x={width / 2} y={radius + yPadding}>
                    <G>
                      {result.webs.map((points, index) => {
                        return (
                          <Polygon
                            key={index}
                            points={points}
                            fill={"white"}
                            fillOpacity={0}
                            stroke={"white"}
                            strokeDasharray={this.state.strokeDashArray[index]}
                          />
                        );
                      })}
                      {result.webPoints[level - 1].map((item, index) => (
                        <G key={"G" + index}>
                          <Line
                            key={index}
                            stroke="white"
                            strokeWidth="0.5"
                            strokeDasharray={[0, 0]}
                            x1={0}
                            y1={0}
                            x2={item.x}
                            y2={item.y}
                          />
                        </G>
                      ))}
                    </G>
                    {result.areas.map((items, index) => (
                      <G key={"area" + index}>
                        <Polygon
                          points={items.area}
                          fill={this.state.colors[index]}
                          fillOpacity={index == 0 ? "0.5" : "1"}
                          stroke={this.state.colors[index]}
                        />
                        <Circle
                          key={"circle" + index}
                          cx={items.circles[0].x}
                          cy={items.circles[0].y}
                          r={index == 0 ? 3 : 0}
                          stroke={this.state.colors[index]}
                          fill={"#ea9308"}
                          strokeWidth={index == 0 ? 6 : 0}
                          {...this.firstCircle.panHandlers}
                        />
                        <Circle
                          key={"circle" + index}
                          cx={items.circles[1].x}
                          cy={items.circles[1].y}
                          r={index == 0 ? 3 : 0}
                          stroke={this.state.colors[index]}
                          fill={"#ea9308"}
                          strokeWidth={index == 0 ? 6 : 0}
                          {...this.secondCircle.panHandlers}
                        />
                        <Circle
                          key={"circle" + index}
                          cx={items.circles[2].x}
                          cy={items.circles[2].y}
                          r={index == 0 ? 3 : 0}
                          stroke={this.state.colors[index]}
                          fill={"#ea9308"}
                          strokeWidth={index == 0 ? 6 : 0}
                          {...this.thirdCircle.panHandlers}
                        />
                        <Circle
                          key={"circle" + index}
                          cx={items.circles[3].x}
                          cy={items.circles[3].y}
                          r={index == 0 ? 3 : 0}
                          stroke={this.state.colors[index]}
                          fill={"#ea9308"}
                          strokeWidth={index == 0 ? 6 : 0}
                          {...this.fourthCircle.panHandlers}
                        />
                        <Circle
                          key={"circle" + index}
                          cx={items.circles[4].x}
                          cy={items.circles[4].y}
                          r={index == 0 ? 3 : 0}
                          stroke={this.state.colors[index]}
                          fill={"#ea9308"}
                          strokeWidth={index == 0 ? 6 : 0}
                          {...this.fifthCircle.panHandlers}
                        />
                        <Circle
                          key={"circle" + index}
                          cx={items.circles[5].x}
                          cy={items.circles[5].y}
                          r={index == 0 ? 3 : 0}
                          stroke={this.state.colors[index]}
                          fill={"#ea9308"}
                          strokeWidth={index == 0 ? 6 : 0}
                          {...this.sixthCircle.panHandlers}
                        />
                      </G>
                    ))}
                  </G>
                </Svg>
              )}
              <View style={[styles.cardContainer, { marginBottom: 5 }]}>
                <Card transparent style={{ backgroundColor: "transparent" }}>
                  <CardItem
                    style={[
                      styles.cardItem,
                      {
                        position: "relative",
                        textAlign: "justify"
                      }
                    ]}
                  >
                    <MyWebView
                      style={{ backgroundColor: "transparent" }}
                      scrollEnabled={false}
                      automaticallyAdjustContentInsets={false}
                      width={"100%"}
                      source={{
                        baseUrl: "",
                        html: `<style>body {color: #302c23;  text-align: justify}</style>${caption}`
                      }}
                    />
                    {/* <Text>&#9;&#9;&#9;{caption}</Text> */}
                  </CardItem>
                </Card>
              </View>
              <Item
                onPress={() =>
                  position.every(item => item == 0)
                    ? ""
                    : this.viewDescription(0)
                }
                style={{
                  display: position.every(item => item == 0) ? "none" : "flex",
                  padding: scaleSize(5),
                  borderBottomWidth: 0,
                  position: "absolute",
                  top: 5,
                  left: SCREEN_WIDTH / 2 - scaleSize(55)
                }}
              >
                <Text
                  style={{
                    color: position.every(item => item == 0)
                      ? "transparent"
                      : "#fff",
                    fontSize: scaleSize(16)
                  }}
                >
                  Послевкусие
                </Text>
              </Item>
              <Item
                onPress={() =>
                  position.every(item => item == 0)
                    ? ""
                    : this.viewDescription(1)
                }
                style={{
                  display: position.every(item => item == 0) ? "none" : "flex",
                  padding: scaleSize(5),
                  borderBottomWidth: 0,
                  position: "absolute",
                  top: scaleSize(60),
                  left: SCREEN_WIDTH - scaleSize(80)
                }}
              >
                <Text
                  style={{
                    color: position.every(item => item == 0)
                      ? "transparent"
                      : "#fff",
                    fontSize: 16
                  }}
                >
                  Тело
                </Text>
              </Item>
              <Item
                onPress={() =>
                  position.every(item => item == 0)
                    ? ""
                    : this.viewDescription(2)
                }
                style={{
                  display: position.every(item => item == 0) ? "none" : "flex",
                  padding: scaleSize(5),
                  borderBottomWidth: 0,
                  position: "absolute",
                  top: scaleSize(245),
                  left: SCREEN_WIDTH - scaleSize(80)
                }}
              >
                <Text
                  style={{
                    color: position.every(item => item == 0)
                      ? "transparent"
                      : "#fff",
                    fontSize: scaleSize(16)
                  }}
                >
                  Баланс
                </Text>
              </Item>
              <Item
                onPress={() =>
                  position.every(item => item == 0)
                    ? ""
                    : this.viewDescription(3)
                }
                style={{
                  display: position.every(item => item == 0) ? "none" : "flex",
                  padding: scaleSize(5),
                  borderBottomWidth: 0,
                  position: "absolute",
                  top: scaleSize(280),
                  left: SCREEN_WIDTH / 2 - scaleSize(55)
                }}
              >
                <Text
                  style={{
                    color: position.every(item => item == 0)
                      ? "transparent"
                      : "#fff",
                    fontSize: scaleSize(16)
                  }}
                >
                  Кислотность
                </Text>
              </Item>
              <Item
                onPress={() =>
                  position.every(item => item == 0)
                    ? ""
                    : this.viewDescription(4)
                }
                style={{
                  display: position.every(item => item == 0) ? "none" : "flex",
                  padding: scaleSize(5),
                  borderBottomWidth: 0,
                  position: "absolute",
                  top: scaleSize(245),
                  left: scaleSize(15)
                }}
              >
                <Text
                  style={{
                    color: position.every(item => item == 0)
                      ? "transparent"
                      : "#fff",
                    fontSize: scaleSize(16)
                  }}
                >
                  Полнота
                </Text>
              </Item>
              <Item
                onPress={() =>
                  position.every(item => item == 0)
                    ? ""
                    : this.viewDescription(5)
                }
                style={{
                  display: position.every(item => item == 0) ? "none" : "flex",
                  padding: scaleSize(5),
                  borderBottomWidth: 0,
                  position: "absolute",
                  top: scaleSize(60),
                  left: scaleSize(15)
                }}
              >
                <Text
                  style={{
                    color: position.every(item => item == 0)
                      ? "transparent"
                      : "#fff",
                    fontSize: scaleSize(16)
                  }}
                >
                  Аромат
                </Text>
              </Item>
              <View style={this.state.typeDescriptions[0]}>
                <Text style={{ fontSize: scaleSize(19), textAlign: "left" }}>
                  Послевкусие
                </Text>
                <Text
                  style={{
                    fontSize: scaleSize(14.5),
                    lineHeight: scaleSize(20),
                    marginTop: scaleSize(5)
                  }}
                >
                  Вкусовые тона, которые ощущаются во рту некоторое время после
                  того, как кофе выпит. Например, ореховое, винное, хлебное,
                  шоколадное, цветочное послевкусие.
                </Text>
              </View>
              <View style={this.state.typeDescriptions[1]}>
                <Text style={{ fontSize: scaleSize(19), textAlign: "left" }}>
                  Тело
                </Text>
                <Text
                  style={{
                    fontSize: scaleSize(14.5),
                    lineHeight: scaleSize(20),
                    marginTop: scaleSize(5)
                  }}
                >
                  Тело — ощущение богатства или тонкости вкуса, а так же
                  насыщенности дегустируемого напитка.
                </Text>
              </View>
              <View style={this.state.typeDescriptions[2]}>
                <Text style={{ fontSize: scaleSize(19), textAlign: "left" }}>
                  Баланс
                </Text>
                <Text
                  style={{
                    fontSize: scaleSize(14.5),
                    lineHeight: scaleSize(20),
                    marginTop: scaleSize(5)
                  }}
                >
                  Своеобразный паритет вкусовых характеристик и оттенков кофе.
                  Сбалансированным называют кофе у которого одни вкусовые
                  характеристики и оттенки не преобладают над другими.
                </Text>
              </View>
              <View style={this.state.typeDescriptions[3]}>
                <Text style={{ fontSize: scaleSize(19), textAlign: "left" }}>
                  Кислотность
                </Text>
                <Text
                  style={{
                    fontSize: scaleSize(14.5),
                    lineHeight: scaleSize(20),
                    marginTop: scaleSize(5)
                  }}
                >
                  Кислотность не имеет ничего общего с кислым вкусом. Она
                  означает приятную остроту вкуса, подчеркивает высокое качество
                  напитка.
                </Text>
              </View>
              <View style={this.state.typeDescriptions[4]}>
                <Text style={{ fontSize: scaleSize(19), textAlign: "left" }}>
                  Полнота
                </Text>
                <Text
                  style={{
                    fontSize: scaleSize(14.5),
                    lineHeight: scaleSize(20),
                    marginTop: scaleSize(5)
                  }}
                >
                  Это плотность, которая ощущается от кофе на языке. Полнота
                  варьируется от легкой до высокой.
                </Text>
              </View>
              <View style={this.state.typeDescriptions[5]}>
                <Text style={{ fontSize: scaleSize(19), textAlign: "left" }}>
                  Аромат
                </Text>
                <Text
                  style={{
                    fontSize: scaleSize(14.5),
                    lineHeight: scaleSize(20),
                    marginTop: scaleSize(5)
                  }}
                >
                  Пахучие вещества, выделяемые при заваривании кофе.
                  Интенсивность аромата оценивается как слабая, умеренная,
                  сильная и яркая, зависит от свежести напитка.
                </Text>
              </View>
            </View>
          </Content>
        </View>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  cardContainer: {
    marginLeft: scaleSize(5),
    marginRight: scaleSize(5),
    backgroundColor: "rgba(255,255,255,.72)",
    borderRadius: scaleSize(5)
  },
  cardItem: {
    backgroundColor: "transparent",
    flexDirection: "row",
    alignItems: "flex-end",
    justifyContent: "space-between",

    paddingLeft: scaleSize(5),
    paddingRight: scaleSize(5),
    paddingTop: scaleSize(5),
    paddingBottom: scaleSize(5)
  },
  iconsRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: scaleSize(20),
    marginLeft: scaleSize(25),
    marginRight: scaleSize(25)
  },
  container: {
    flex: 1,
    width: SCREEN_WIDTH
  },
  typeDescriptionVisible: {
    borderRadius: scaleSize(5),
    marginLeft: "5%",
    padding: scaleSize(15),
    backgroundColor: "rgba(255,255,255, 0.7)",
    position: "absolute",
    top: SCREEN_WIDTH / 3.2,
    width: "90%",
    opacity: 1
  },
  typeDescriptionInvisible: {
    display: "none",
    borderRadius: scaleSize(5),
    marginLeft: "5%",
    padding: scaleSize(15),
    backgroundColor: "rgba(255,255,255, 0.7)",
    top: SCREEN_WIDTH / 3.2,
    width: "90%",
    opacity: 0
  }
});
