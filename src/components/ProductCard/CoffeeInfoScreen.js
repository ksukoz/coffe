import React, { Component } from "react";
import {
  Container,
  Content,
  Input,
  Item,
  Text,
  Button,
  List,
  ListItem
} from "native-base";
import {
  StyleSheet,
  View,
  ScrollView,
  StatusBar,
  TouchableOpacity,
  Dimensions,
  ActivityIndicator,
  Image,
  PanResponder
} from "react-native";
import KawaIcon from "../KawaIcon";
import Svg, { G } from "react-native-svg";
import HeaderBar from "../common/HeaderBar";

StatusBar.setBarStyle("light-content", true);
StatusBar.setBackgroundColor("rgba(0,0,0,0)");
const MAIN_BG = "../../static/img/background.png";

export default class CoffeeInfoScreen extends Component {
  componentDidMount() {
    // console.error(this.props.navigation);
  }
  render() {
    const { navigation } = this.props;
    let preparation = [];
    preparation = navigation.getParam("preparation", []);

    return (
      <View style={styles.container}>
        <StatusBar
          barStyle="light-content"
          hidden={false}
          translucent={true}
          backgroundColor={"rgba(0,0,0,0)"}
        />
        <Image source={require(MAIN_BG)} style={styles.background} />
        <Content>
          <HeaderBar
            back={() => this.props.navigation.goBack()}
            navigation={this.props.navigation}
            title="Справка"
          />
          <Text
            style={[
              styles.defaultFont,
              {
                marginTop: 20,
                width: "100%",
                textAlign: "left",
                marginBottom: 10,
                marginLeft: 25
              }
            ]}
          >
            Способы приготовления:
          </Text>
          <View
            style={{
              marginBottom: 5,
              backgroundColor: "rgba(255,255,255, 0.7)",
              borderTopLeftRadius: 5,
              borderTopRightRadius: 5,
              borderBottomLeftRadius: 5,
              borderBottomRightRadius: 5,
              paddingLeft: 5,
              paddingRight: 5,
              marginLeft: "2.2%",
              marginRight: "2.2%",
              width: "95.6%"
            }}
          >
            <List
              style={{ borderBottomWidth: 1, borderBottomColor: "#89a6aa" }}
            >
              <ListItem
                style={[
                  styles.listItem,
                  {
                    marginRight: 25,
                    paddingTop: 25,
                    borderBottomWidth: 0
                  }
                ]}
              >
                <Text style={{ width: 50 }}>
                  <KawaIcon
                    style={styles.typeIcon}
                    name={"cup"}
                    size={30}
                    color={preparation.includes("1") ? "#ea9308" : "#ffea00"}
                  />
                </Text>
                <Text style={{ fontSize: 18 }}>Чашка</Text>
              </ListItem>
              <ListItem
                style={[
                  styles.listItem,
                  { marginLeft: 8, marginLeft: 5, borderBottomWidth: 0 }
                ]}
              >
                <Text style={{ width: 50 }}>
                  <KawaIcon
                    style={styles.typeIcon}
                    name={"turk"}
                    size={45}
                    color={preparation.includes("2") ? "#ea9308" : "#ffea00"}
                  />
                </Text>
                <Text style={{ fontSize: 18 }}>Турка</Text>
              </ListItem>
              <ListItem
                style={[
                  styles.listItem,
                  { marginLeft: 10, marginRight: 3, borderBottomWidth: 0 }
                ]}
              >
                <Text style={{ width: 50 }}>
                  <KawaIcon
                    style={styles.typeIcon}
                    name={"pour-over"}
                    size={45}
                    color={preparation.includes("3") ? "#ea9308" : "#ffea00"}
                  />
                </Text>
                <Text style={{ fontSize: 18 }}>Гейзерная кофеварка</Text>
              </ListItem>
              <ListItem
                style={[
                  styles.listItem,
                  { marginLeft: 8, marginLeft: 5, borderBottomWidth: 0 }
                ]}
              >
                <Text style={{ width: 50 }}>
                  <KawaIcon
                    style={styles.typeIcon}
                    name={"coffee-maker"}
                    size={45}
                    color={preparation.includes("4") ? "#ea9308" : "#ffea00"}
                  />
                </Text>
                <Text style={{ fontSize: 18 }}>Фильтр-кофеварка</Text>
              </ListItem>
              <ListItem
                style={[
                  styles.listItem,
                  { marginLeft: 10, marginRight: 3, borderBottomWidth: 0 }
                ]}
              >
                <Text style={{ width: 50 }}>
                  <KawaIcon
                    style={styles.typeIcon}
                    name={"french-press"}
                    size={45}
                    color={preparation.includes("5") ? "#ea9308" : "#ffea00"}
                  />
                </Text>
                <Text style={{ fontSize: 18 }}>Френч-пресс</Text>
              </ListItem>
              <ListItem
                style={[
                  styles.listItem,
                  {
                    marginRight: 25,
                    borderBottomWidth: 0,
                    marginBottom: 10
                  }
                ]}
              >
                <Text style={{ width: 50, marginRight: 10 }}>
                  <KawaIcon
                    style={styles.typeIcon}
                    name={"coffee-maker-electric"}
                    size={45}
                    color={preparation.includes("6") ? "#ea9308" : "#ffea00"}
                  />
                </Text>
                <Text style={{ fontSize: 18 }}>Эспрессо кофемашина</Text>
              </ListItem>
            </List>
          </View>
          <View style={styles.descView}>
            <Text style={styles.defaultFont}>
              Цвета способов приготовления:
            </Text>
            <List>
              <ListItem
                style={[
                  styles.listItem,
                  {
                    paddingTop: 25,
                    paddingLeft: 5,
                    borderBottomWidth: 0
                  }
                ]}
              >
                <Text style={{ width: 50, marginRight: 10 }}>
                  <KawaIcon
                    style={styles.typeIcon}
                    name={"cup"}
                    size={30}
                    color="#ffea00"
                  />
                </Text>
                <Text style={[styles.defaultFont, { fontSize: 18 }]}>
                  Желтый - нерекомендуемый
                </Text>
              </ListItem>
              <ListItem
                style={[
                  styles.listItem,
                  { paddingLeft: 5, borderBottomWidth: 0 }
                ]}
              >
                <Text style={{ width: 50, marginRight: 10 }}>
                  <KawaIcon
                    style={styles.typeIcon}
                    name={"cup"}
                    size={30}
                    color="#ea9308"
                  />
                </Text>
                <Text style={[styles.defaultFont, { fontSize: 18 }]}>
                  Оранжевый - рекомендуемый
                </Text>
              </ListItem>
            </List>
          </View>
        </Content>
      </View>
    );
  }
}

const styles = {
  container: {
    flex: 1,
    width: Dimensions.get("window").width
  },
  background: {
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height * 1.5,
    position: "absolute",
    top: 0,
    bottom: 0,
    left: 0,
    right: 0
  },
  listItem: {
    paddingTop: 13,
    paddingBottom: 13,
    paddingRight: 13,
    paddingLeft: 13,
    marginLeft: 0
  },
  descView: {
    padding: 10,
    marginRight: 10,
    marginLeft: 10
  },
  defaultFont: {
    color: "#fff",
    fontSize: 15
  }
};
