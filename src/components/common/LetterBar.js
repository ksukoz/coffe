import React, { Component } from "react";
import { connect } from "react-redux";
import { Text, Input } from "native-base";
import { ScrollView, TouchableOpacity } from "react-native";
import { getAlphabet } from "../../store/actions/commonActions";

import { scaleSize } from "../../helpers/scaleSize";

class LetterBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      alphabet: [],
      categiryId: this.props.navigation
        ? this.props.navigation.getParam("categoryId", 0)
        : 0,
      english: 1
    };
    Input.defaultProps.selectionColor = "#000";
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.alphabet) {
      this.setState({ loading: false, alphabet: nextProps.alphabet });
    }
  }

  componentDidMount() {
    this.state.categiryId !== 0
      ? this.props.getAlphabet(this.state.english, this.state.categiryId)
      : this.props.getAlphabet(this.state.english);
  }

  changeAlphabet() {
    this.setState(
      { english: this.state.english === 1 ? 2 : 1 },
      this.state.categiryId !== 0
        ? this.props.getAlphabet(this.state.english, this.state.categiryId)
        : this.props.getAlphabet(this.state.english)
    );
  }

  onLetterPress(letter) {
    this.props.navigation.navigate("CatalogScreen", {
      categoryId: this.props.categoryId,
      categoryName: this.props.categoryName,
      letter
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
              <Text style={styles.alphabet}>{item.letter}</Text>
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
    paddingRight: scaleSize(25)
  },

  alphabetMenu: {
    flex: 1,
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
  getAlphabet: (lang, id) => dispatch(getAlphabet(lang, id))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(LetterBar);
