import React, { Component } from "react";
import { connect } from "react-redux";
import { Text, Input } from "native-base";
import { ScrollView, TouchableOpacity, StyleSheet } from "react-native";
import { getAlphabet } from "../../store/actions/commonActions";
import { findProducts } from "../../store/actions/catalogActions";

import { scaleSize } from "../../helpers/scaleSize";

class LetterBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      alphabet: [],
      categoryId: 0,
      english: 1,
      letter: this.props.navigation.getParam("letter", "")
    };
    Input.defaultProps.selectionColor = "#000";
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.alphabet) {
      // ()
      this.setState({ alphabet: nextProps.alphabet });
    }
  }

  componentDidMount() {
    if (!this.state.letter) {
      this.props.getAlphabet(
        this.state.english,
        this.props.navigation.getParam("categoryId", "0")
      );
    }
  }

  changeAlphabet() {
    this.setState({ english: this.state.english === 1 ? 2 : 1 }, () =>
      this.props.getAlphabet(
        this.state.english,
        this.props.navigation.getParam("categoryId", "0")
      )
    );
  }

  onLetterPress(letter) {
    this.setState({ letter }, () => {
      this.props.navigation.navigate("Catalog", {
        categoryId: this.props.categoryId,
        letter
      });
      this.props.findProducts(
        letter,
        this.props.navigation.getParam("categoryId", "0"),
        0,
        "after"
      );
    });
  }

  render() {
    return (
      <ScrollView horizontal={true} style={styles.alphabetMenu}>
        {this.state.alphabet.map(item => {
          return (
            <TouchableOpacity
              onLongPress={() => this.changeAlphabet()}
              onPress={() => this.onLetterPress(item.letter)}
              key={item.letter}
              activeOpacity={0.9}
            >
              <Text
                style={
                  this.state.letter === item.letter &&
                  this.props.navigation.state.routeName !== "Home"
                    ? [styles.alphabet, styles.alphabetActive]
                    : styles.alphabet
                }
              >
                {item.letter}
              </Text>
            </TouchableOpacity>
          );
        })}
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  alphabet: {
    color: "#fff",
    padding: scaleSize(10),
    fontSize: scaleSize(13),
    marginRight: scaleSize(15)
  },
  alphabetActive: {
    padding: scaleSize(5),
    paddingTop: scaleSize(3),
    paddingBottom: scaleSize(3),
    margin: scaleSize(5),
    marginTop: scaleSize(7),
    backgroundColor: "rgba(255,255,255, 0.7)",
    textAlign: "center",
    borderRadius: scaleSize(2)
  },

  alphabetMenu: {
    height: scaleSize(40),
    flexDirection: "row",
    marginLeft: scaleSize(10),
    marginTop: scaleSize(10)
  },
  iconMenu: {
    color: "#58554e",
    marginBottom: scaleSize(5)
  }
});

const mapStateToProps = state => ({
  alphabet: state.common.letters
});

const mapDispatchToProps = dispatch => ({
  getAlphabet: (lang, id) => dispatch(getAlphabet(lang, id)),
  findProducts: (value, category, page, type) =>
    dispatch(findProducts(value, category, page, type))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(LetterBar);
