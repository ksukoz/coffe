import React from 'react';
import KawaFooter from '../components/KawaFooter.js';
import {connect} from 'react-redux';
import {setMode} from '../actions';
import PropTypes from 'prop-types';

const mapStateToProps = (state) => ({
    mode: state.mode
});

const mapDispatchToProps = (dispatch) => ({
    setMode(mode) {
        dispatch(setMode(mode));
    }
});

const KawaFooterContainer = ({mode, setMode}) => (
    <KawaFooter mode={mode} setMode={setMode} />
);
KawaFooterContainer.propTypes = {
    mode: PropTypes.string,
    setMode: PropTypes.func
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(KawaFooterContainer);