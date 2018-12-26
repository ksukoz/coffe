import React, { Component } from "react";
import { connect } from "react-redux";
import { Text, Input } from "native-base";
import { ScrollView } from "react-native";
import { getAlphabet } from "../../store/actions/commonActions";

import { scaleSize } from "../../helpers/scaleSize";

class LetterBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      alphabet: [],
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
    this.props.getAlphabet(this.state.english);
  }

  changeAlphabet() {
    this.setState(
      { english: this.state.english === 1 ? 2 : 1 },
      this.props.getAlphabet(this.state.english)
    );
  }

  render() {
    return (
      <ScrollView horizontal={true} style={styles.alphabetMenu}>
        {this.state.alphabet.map(item => {
          return (
            <Text
              onLongPress={() => this.changeAlphabet()}
              key={item.letter}
              style={styles.alphabet}
            >
              {item.letter}
            </Text>
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
  getAlphabet: lang => dispatch(getAlphabet(lang))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(LetterBar);
