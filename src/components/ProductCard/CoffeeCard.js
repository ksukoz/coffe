import React, { Component } from "react";
import {
  Content,
  Input,
  Item,
  Text,
  Button,
  List,
  ListItem,
  Card,
  CardItem
} from "native-base";
import {
  View,
  ScrollView,
  StatusBar,
  TouchableOpacity,
  Dimensions,
  PanResponder
} from "react-native";
import KawaIcon from "../KawaIcon";
import Svg, { G } from "react-native-svg";

StatusBar.setBarStyle("light-content", true);
StatusBar.setBackgroundColor("rgba(0,0,0,0)");

const width = Dimensions.get("window").width;
const yPadding = 40;
const radius = 133;
const total = 6;
const level = 6;
const rangeMin = 0;
const rangeMax = 100;
const arc = 2 * Math.PI;
const onePiece = arc / total;

// import Web from "../MyCoffee/Web";
// import Areas from "../MyCoffee/Areas";
import Polygon from "react-native-svg/elements/Polygon";
import Line from "react-native-svg/elements/Line";
import Circle from "react-native-svg/elements/Circle";

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
      position: [30, 60, 45, 40, 50, 60],
      positionRelease: 0,
      loading: false,
      coffeeIcons: [
        {
          class: styles.iconTypeWhite
        },
        {
          class: styles.iconTypeWhite
        },
        {
          class: styles.iconTypeWhite
        },
        {
          class: styles.iconTypeWhite
        },
        {
          class: styles.iconTypeWhite
        },
        {
          class: styles.iconTypeWhite
        }
      ],
      typeDescriptions: [
        styles.typeDescriptionInvisible,
        styles.typeDescriptionInvisible,
        styles.typeDescriptionInvisible,
        styles.typeDescriptionInvisible,
        styles.typeDescriptionInvisible,
        styles.typeDescriptionInvisible
      ],
      arabica: styles.arabicaIconWhite,
      rabusta: styles.rabustaIconWhite,
      arabicaText: styles.arabicaTextWhite,
      rabustaText: styles.rabustaTextWhite
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

  setTypeColor(index) {
    let iconStyles = this.state.coffeeIcons[index];
    let icons = this.state.coffeeIcons;
    if (iconStyles.class == styles.iconTypeWhite) {
      icons[index] = { class: styles.iconTypeOrange };
    } else {
      icons[index] = { class: styles.iconTypeWhite };
    }
    this.setState({
      coffeeIcons: icons
    });
  }

  setCoreColor(type) {
    if (type == "rabusta") {
      if (this.state.rabusta == styles.rabustaIconWhite) {
        this.setState({
          rabusta: styles.rabustaIconOrange,
          rabustaText: styles.rabustaTextOrange
        });
      } else {
        this.setState({
          rabusta: styles.rabustaIconWhite,
          rabustaText: styles.rabustaTextWhite
        });
      }
    } else if (type == "arabica") {
      if (this.state.arabica == styles.arabicaIconWhite) {
        this.setState({
          arabica: styles.arabicaIconOrange,
          arabicaText: styles.arabicaTextOrange
        });
      } else {
        this.setState({
          arabica: styles.arabicaIconWhite,
          arabicaText: styles.arabicaTextWhite
        });
      }
    }
  }

  render() {
    const { caption } = this.props;
    let text = "";

    if (caption) {
      text = caption;
    }

    var data = {
      fieldNames: [
        "Послевкусие",
        "Тело",
        "Баланс",
        "Кислотность",
        "Полнота",
        "Аромат"
      ],
      values: [this.state.position, [17, 17, 17, 17, 17, 17]]
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
        <View style={styles.container}>
          <Content>
            <View style={styles.alphabetMenu}>
              <TouchableOpacity
                style={{ marginLeft: 25, paddingTop: 15, borderBottomWidth: 0 }}
              >
                <KawaIcon
                  onPress={() => this.setTypeColor(0)}
                  style={this.state.coffeeIcons[0].class}
                  name={"cup"}
                  size={30}
                />
              </TouchableOpacity>
              <TouchableOpacity
                style={{ marginLeft: 13, borderBottomWidth: 0 }}
              >
                <KawaIcon
                  onPress={() => this.setTypeColor(1)}
                  style={this.state.coffeeIcons[1].class}
                  name={"turk"}
                  size={45}
                />
              </TouchableOpacity>
              <TouchableOpacity
                style={{ marginLeft: 13, borderBottomWidth: 0 }}
              >
                <KawaIcon
                  onPress={() => this.setTypeColor(2)}
                  style={this.state.coffeeIcons[2].class}
                  name={"pour-over"}
                  size={45}
                />
              </TouchableOpacity>
              <TouchableOpacity
                style={{ marginLeft: 13, borderBottomWidth: 0 }}
              >
                <KawaIcon
                  onPress={() => this.setTypeColor(3)}
                  style={this.state.coffeeIcons[3].class}
                  name={"coffee-maker"}
                  size={45}
                />
              </TouchableOpacity>
              <TouchableOpacity
                style={{ marginLeft: 13, borderBottomWidth: 0 }}
              >
                <KawaIcon
                  onPress={() => this.setTypeColor(4)}
                  style={this.state.coffeeIcons[4].class}
                  name={"french-press"}
                  size={45}
                />
              </TouchableOpacity>
              <TouchableOpacity
                style={{
                  marginRight: 25,
                  marginLeft: 13,
                  borderBottomWidth: 0
                }}
              >
                <KawaIcon
                  onPress={() => this.setTypeColor(5)}
                  style={this.state.coffeeIcons[5].class}
                  name={"coffee-maker-electric"}
                  size={45}
                />
              </TouchableOpacity>
            </View>

            <View>
              <Svg height="375" width="375">
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
              <View style={[styles.cardContainer, { marginBottom: 5 }]}>
                <Card transparent style={{ backgroundColor: "transparent" }}>
                  <CardItem
                    style={[
                      styles.cardItem,
                      {
                        position: "relative"
                      }
                    ]}
                  >
                    <Text>{this.props.caption}</Text>
                  </CardItem>
                </Card>
              </View>
              <Item
                onPress={() => this.viewDescription(0)}
                style={{
                  padding: 5,
                  borderBottomWidth: 0,
                  position: "absolute",
                  top: 5,
                  left: Dimensions.get("window").width / 2 - 55
                }}
              >
                <Text style={{ color: "#fff", fontSize: 16 }}>Послевкусие</Text>
              </Item>
              <Item
                onPress={() => this.viewDescription(1)}
                style={{
                  padding: 5,
                  borderBottomWidth: 0,
                  position: "absolute",
                  top: 60,
                  left: Dimensions.get("window").width - 80
                }}
              >
                <Text style={{ color: "#fff", fontSize: 16 }}>Тело</Text>
              </Item>
              <Item
                onPress={() => this.viewDescription(2)}
                style={{
                  padding: 5,
                  borderBottomWidth: 0,
                  position: "absolute",
                  top: 260,
                  left: Dimensions.get("window").width - 80
                }}
              >
                <Text style={{ color: "#fff", fontSize: 16 }}>Баланс</Text>
              </Item>
              <Item
                onPress={() => this.viewDescription(3)}
                style={{
                  padding: 5,
                  borderBottomWidth: 0,
                  position: "absolute",
                  top: 305,
                  left: Dimensions.get("window").width / 2 - 55
                }}
              >
                <Text style={{ color: "#fff", fontSize: 16 }}>Кислотность</Text>
              </Item>
              <Item
                onPress={() => this.viewDescription(4)}
                style={{
                  padding: 5,
                  borderBottomWidth: 0,
                  position: "absolute",
                  top: 260,
                  left: 15
                }}
              >
                <Text style={{ color: "#fff", fontSize: 16 }}>Полнота</Text>
              </Item>
              <Item
                onPress={() => this.viewDescription(5)}
                style={{
                  padding: 5,
                  borderBottomWidth: 0,
                  position: "absolute",
                  top: 60,
                  left: 15
                }}
              >
                <Text style={{ color: "#fff", fontSize: 16 }}>Аромат</Text>
              </Item>
              <View style={this.state.typeDescriptions[0]}>
                <Text style={{ fontSize: 19, textAlign: "left" }}>
                  Послевкусие
                </Text>
                <Text style={{ fontSize: 14.5, lineHeight: 20, marginTop: 5 }}>
                  Вкусовые тона, которые ощущаются во рту некоторое время после
                  того, как кофе выпит. Например, ореховое, винное, хлебное,
                  шоколадное, цветочное послевкусие.
                </Text>
              </View>
              <View style={this.state.typeDescriptions[1]}>
                <Text style={{ fontSize: 19, textAlign: "left" }}>Тело</Text>
                <Text style={{ fontSize: 14.5, lineHeight: 20, marginTop: 5 }}>
                  Тело — ощущение богатства или тонкости вкуса, а так же
                  насыщенности дегустируемого напитка.
                </Text>
              </View>
              <View style={this.state.typeDescriptions[2]}>
                <Text style={{ fontSize: 19, textAlign: "left" }}>Баланс</Text>
                <Text style={{ fontSize: 14.5, lineHeight: 20, marginTop: 5 }}>
                  Своеобразный паритет вкусовых характеристик и оттенков кофе.
                  Сбалансированным называют кофе у которого одни вкусовые
                  характеристики и оттенки не преобладают над другими.
                </Text>
              </View>
              <View style={this.state.typeDescriptions[3]}>
                <Text style={{ fontSize: 19, textAlign: "left" }}>
                  Кислотность
                </Text>
                <Text style={{ fontSize: 14.5, lineHeight: 20, marginTop: 5 }}>
                  Кислотность не имеет ничего общего с кислым вкусом. Она
                  означает приятную остроту вкуса, подчеркивает высокое качество
                  напитка.
                </Text>
              </View>
              <View style={this.state.typeDescriptions[4]}>
                <Text style={{ fontSize: 19, textAlign: "left" }}>Полнота</Text>
                <Text style={{ fontSize: 14.5, lineHeight: 20, marginTop: 5 }}>
                  Это плотность, которая ощущается от кофе на языке. Полнота
                  варьируется от легкой до высокой.
                </Text>
              </View>
              <View style={this.state.typeDescriptions[5]}>
                <Text style={{ fontSize: 19, textAlign: "left" }}>Аромат</Text>
                <Text style={{ fontSize: 14.5, lineHeight: 20, marginTop: 5 }}>
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

const styles = {
  cardContainer: {
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

    paddingLeft: 5,
    paddingRight: 5,
    paddingTop: 5,
    paddingBottom: 5
  },
  cardDouble: {
    flex: 1,
    flexDirection: "row",
    color: "#fff",
    marginLeft: 5,
    marginRight: 5,
    marginTop: 2,
    borderColor: "#fff",
    shadowColor: "#fff",
    justifyContent: "center"
  },
  cardDoubleLast: {
    flex: 1,
    flexDirection: "row",
    color: "#fff",
    marginLeft: 5,
    marginRight: 5,
    marginTop: 2,
    borderColor: "#fff",
    shadowColor: "#fff",
    justifyContent: "center",
    marginBottom: 20
  },
  cardFull: {
    marginLeft: "2%",
    marginRight: "1.5%",
    width: "96.5%",
    marginTop: 5,
    color: "#fff",
    textAlign: "center",
    borderColor: "#fff",
    shadowColor: "#fff",
    backgroundColor: "rgba(255,255,255, 0.2)",
    alignItems: "center",
    height: Dimensions.get("window").width * 0.3,
    borderRadius: 5,
    justifyContent: "space-around",
    resizeMode: "contain"
  },
  cardItemHalf: {
    width: "49%",
    backgroundColor: "rgba(255,255,255, 0.2)",
    marginLeft: "1%",
    marginTop: 3,
    alignItems: "center",
    height: Dimensions.get("window").width * 0.5 - 10,
    borderRadius: 5,
    justifyContent: "flex-end",
    resizeMode: "contain",
    paddingBottom: "20%"
  },
  cardItemHalfLast: {
    width: "49%",
    backgroundColor: "rgba(255,255,255, 0.2)",
    marginRight: "1%",
    marginLeft: "1%",
    marginTop: 3,
    alignItems: "center",
    height: Dimensions.get("window").width * 0.5 - 10,
    borderRadius: 5,
    justifyContent: "flex-end",
    resizeMode: "contain",
    paddingBottom: "20%"
  },
  cardContent: {
    color: "#fff"
  },
  container: {
    flex: 1,
    width: Dimensions.get("window").width
  },
  head: {
    marginTop: 35
  },
  default: {
    color: "#fff"
  },
  alphabet: {
    color: "#fff",
    padding: 10,
    fontSize: 13,
    paddingRight: 25
  },
  search: {
    backgroundColor: "#fff",
    marginRight: 15,
    marginLeft: 15,
    height: 40,
    paddingLeft: 5,
    paddingRight: 10
  },
  searchIcon: {
    paddingTop: 3,
    color: "#58554e"
  },
  codeIcon: {
    marginRight: 10,
    color: "#58554e"
  },
  searchInput: {
    fontSize: 13
  },
  alphabetMenu: {
    flex: 1,
    flexDirection: "row",
    marginLeft: 10,
    marginTop: 20,
    alignSelf: "center"
  },
  iconMenu: {
    color: "#58554e",
    marginBottom: 5
  },
  iconTypeWhite: {
    color: "#fff"
  },
  iconTypeOrange: {
    color: "#ea9308"
  },
  typeIcon: {
    color: "#000"
  },
  rabustaIconWhite: {
    color: "#fff",
    fontSize: 45,
    marginLeft: 13,
    alignItems: "center",
    justifyContent: "space-around"
  },
  rabustaIconOrange: {
    color: "#ea9308",
    fontSize: 45,
    marginLeft: 13,
    alignItems: "center",
    justifyContent: "space-around"
  },
  arabicaIconWhite: {
    color: "#fff",
    fontSize: 45,
    marginLeft: 13,
    alignItems: "center",
    justifyContent: "space-around"
  },
  arabicaIconOrange: {
    color: "#ea9308",
    fontSize: 45,
    marginLeft: 13,
    alignItems: "center",
    justifyContent: "space-around"
  },
  arabicaTextWhite: {
    color: "#fff",
    justifyContent: "space-around",
    height: "100%",
    marginLeft: 6,
    paddingTop: 13
  },
  arabicaTextOrange: {
    color: "#ea9308",
    justifyContent: "space-around",
    height: "100%",
    marginLeft: 6,
    paddingTop: 13
  },
  rabustaTextWhite: {
    color: "#fff",
    justifyContent: "space-around",
    height: "100%",
    marginLeft: 6,
    paddingTop: 13
  },
  rabustaTextOrange: {
    color: "#ea9308",
    justifyContent: "space-around",
    height: "100%",
    marginLeft: 6,
    paddingTop: 13
  },
  typeDescriptionVisible: {
    borderRadius: 5,
    marginLeft: "5%",
    padding: 15,
    backgroundColor: "rgba(255,255,255, 0.7)",
    position: "absolute",
    top: Dimensions.get("window").width / 3.2,
    width: "90%",
    opacity: 1
  },
  typeDescriptionInvisible: {
    borderRadius: 5,
    marginLeft: "5%",
    padding: 15,
    backgroundColor: "rgba(255,255,255, 0.7)",
    top: Dimensions.get("window").width / 3.2,
    width: "90%",
    opacity: 0
  }
};
