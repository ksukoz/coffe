import React, { Component } from "react";
import { connect } from "react-redux";
import { Text, Input } from "native-base";
import { ScrollView, TouchableOpacity, AsyncStorage } from "react-native";
import { getAlphabet } from "../../store/actions/commonActions";
import { findProducts } from "../../store/actions/catalogActions";

import { scaleSize } from "../../helpers/scaleSize";

class LetterBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      alphabet: [],
      categoryId: this.props.categoryId,
      english: 1,
      letter: this.props.navigation.getParam("letter", "")
    };
    Input.defaultProps.selectionColor = "#000";
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.alphabet) {
      if (
        nextProps.alphabet.length !== this.state.alphabet.length &&
        this.props.categoryId != 0
      ) {
        this.setState({ alphabet: nextProps.alphabet, letter: "" });
      } else {
        this.setState({ alphabet: nextProps.alphabet });
      }
    }
    if (nextProps.categoryId) {
      this.setState({ categoryId: nextProps.categoryId });
    }
  }

  componentWillMount() {
    this.state.categoryId !== 0
      ? this.props.getAlphabet(this.state.english, this.state.categoryId)
      : this.props.getAlphabet(this.state.english);
  }

  changeAlphabet() {
    this.setState(
      { english: this.state.english === 1 ? 2 : 1 },
      this.state.categoryId !== 0
        ? this.props.getAlphabet(this.state.english, this.state.categoryId)
        : this.props.getAlphabet(this.state.english)
    );
  }

  onLetterPress(letter) {
    this.setState({ letter }, () => {
      this.props.navigation.navigate("CatalogScreen", {
        categoryId: this.props.categoryId,
        categoryName: this.props.categoryName,
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
    // const { categoryId, categoryName, navigation } = this.props;

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
                  this.state.letter === item.letter
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

const styles = {
  alphabet: {
    color: "#fff",
    padding: scaleSize(10),
    fontSize: scaleSize(13),
    marginRight: scaleSize(25)
  },
  alphabetActive: {
    padding: scaleSize(5),
    paddingTop: scaleSize(3),
    paddingBottom: scaleSize(3),
    margin: scaleSize(5),
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
};

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
