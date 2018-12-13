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
  render() {
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
          <HeaderBar navigation={() => this.props.navigation} />
          <Text
            style={{
              marginTop: 20,
              color: "#fff",
              width: "100%",
              textAlign: "left",
              fontSize: 15,
              marginBottom: 10,
              marginLeft: 25
            }}
          >
            Способы приготовления:
          </Text>
          <View
            style={{
              marginBottom: 40,
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
                style={{ marginLeft: 10, paddingTop: 25, borderBottomWidth: 0 }}
              >
                <Text style={{ width: 50 }}>
                  <KawaIcon style={styles.typeIcon} name={"cup"} size={30} />
                </Text>
                <Text style={{ fontSize: 18 }}>Чашка</Text>
              </ListItem>
              <ListItem style={{ marginLeft: 13, borderBottomWidth: 0 }}>
                <Text style={{ width: 50 }}>
                  <KawaIcon style={styles.typeIcon} name={"turk"} size={45} />
                </Text>
                <Text style={{ fontSize: 18 }}>Турка</Text>
              </ListItem>
              <ListItem style={{ marginLeft: 13, borderBottomWidth: 0 }}>
                <Text style={{ width: 50 }}>
                  <KawaIcon
                    style={styles.typeIcon}
                    name={"pour-over"}
                    size={45}
                  />
                </Text>
                <Text style={{ fontSize: 18 }}>Гейзерная кофеварка</Text>
              </ListItem>
              <ListItem style={{ marginLeft: 13, borderBottomWidth: 0 }}>
                <Text style={{ width: 50 }}>
                  <KawaIcon
                    style={styles.typeIcon}
                    name={"coffee-maker"}
                    size={45}
                  />
                </Text>
                <Text style={{ fontSize: 18 }}>Фильтр-кофеварка</Text>
              </ListItem>
              <ListItem style={{ marginLeft: 13, borderBottomWidth: 0 }}>
                <Text style={{ width: 50 }}>
                  <KawaIcon
                    style={styles.typeIcon}
                    name={"french-press"}
                    size={45}
                  />
                </Text>
                <Text style={{ fontSize: 18 }}>Френч-пресс</Text>
              </ListItem>
              <ListItem
                style={{
                  marginRight: 25,
                  marginLeft: 5,
                  borderBottomWidth: 0,
                  marginBottom: 10
                }}
              >
                <Text style={{ width: 50, marginRight: 10 }}>
                  <KawaIcon
                    style={styles.typeIcon}
                    name={"coffee-maker-electric"}
                    size={45}
                  />
                </Text>
                <Text style={{ fontSize: 18 }}>Эспрессо кофемашина</Text>
              </ListItem>
            </List>
            <ScrollView style={{ marginTop: 15 }}>
              <Text
                style={{ fontSize: 15, paddingLeft: 13, fontWeight: "bold" }}
              >
                Аромат
              </Text>
              <Text
                style={{
                  fontSize: 15,
                  paddingLeft: 13,
                  paddingTop: 10,
                  paddingRight: 40
                }}
              >
                Пахучие вещества, выделяемые при заваривании кофе. Интенсивность
                аромата оценивается как слабая, умеренная, сильная и яркая,
                зависит от свежести напитка.
              </Text>
              <Text
                style={{
                  fontSize: 15,
                  paddingLeft: 13,
                  fontWeight: "bold",
                  marginTop: 15
                }}
              >
                Баланс
              </Text>
              <Text
                style={{
                  fontSize: 15,
                  paddingLeft: 13,
                  paddingTop: 10,
                  paddingRight: 40
                }}
              >
                Своеобразный паритет вкусовых характеристик и оттенков кофе.
                Сбалансированным называют кофе у которого одни вкусовые
                характеристики и оттенки не преобладают над другими.
              </Text>
              <Text
                style={{
                  fontSize: 15,
                  paddingLeft: 13,
                  fontWeight: "bold",
                  marginTop: 15
                }}
              >
                Кислотность
              </Text>
              <Text
                style={{
                  fontSize: 15,
                  paddingLeft: 13,
                  paddingTop: 10,
                  paddingRight: 40
                }}
              >
                Кислотность не имеет ничего общего с кислым вкусом. Она означает
                приятную остроту вкуса, подчеркивает высокое качество напитка.
              </Text>
              <Text
                style={{
                  fontSize: 15,
                  paddingLeft: 13,
                  fontWeight: "bold",
                  marginTop: 15
                }}
              >
                Полнота
              </Text>
              <Text
                style={{
                  fontSize: 15,
                  paddingLeft: 13,
                  paddingTop: 10,
                  paddingRight: 40
                }}
              >
                Это плотность, которая ощущается от кофе на языке. Полнота
                варьируется от легкой до высокой.
              </Text>
              <Text
                style={{
                  fontSize: 15,
                  paddingLeft: 13,
                  fontWeight: "bold",
                  marginTop: 15
                }}
              >
                Послевкусие
              </Text>
              <Text
                style={{
                  fontSize: 15,
                  paddingLeft: 13,
                  paddingTop: 10,
                  paddingRight: 40
                }}
              >
                Вкусовые тона, которые ощущаются во рту некоторое время после
                того, как кофе выпит. Например, ореховое, винное, хлебное,
                шоколадное, цветочное послевкусие.
              </Text>
              <Text
                style={{
                  fontSize: 15,
                  paddingLeft: 13,
                  fontWeight: "bold",
                  marginTop: 15
                }}
              >
                Тело
              </Text>
              <Text
                style={{
                  fontSize: 15,
                  paddingLeft: 13,
                  paddingTop: 10,
                  marginBottom: 20,
                  paddingRight: 40
                }}
              >
                Тело — ощущение богатства или тонкости вкуса, а так же
                насыщенности дегустируемого напитка.
              </Text>
            </ScrollView>
          </View>
        </Content>
      </View>
    );
  }
}

const styles = {
  background: {
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height * 1.5,
    position: "absolute",
    top: 0,
    bottom: 0,
    left: 0,
    right: 0
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
