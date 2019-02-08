import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Container, Icon, Input } from 'native-base';
import {
	View,
	StatusBar,
	Dimensions,
	TouchableOpacity,
	Image,
	Text,
	FlatList,
	ScrollView,
	BackHandler,
	StyleSheet
} from 'react-native';

import { LiqpayCheckout } from 'react-native-liqpay';

import { scaleSize } from '../../helpers/scaleSize';

const SCREEN_WIDTH = Dimensions.get('window').width;

StatusBar.setBarStyle('light-content', true);
StatusBar.setBackgroundColor('rgba(0,0,0,0)');
const MAIN_BG = '../../static/img/background.png';

const LIQPAY_PUBLIC_KEY = 'i68068890264';
const LIQPAY_PRIVATE_KEY = 'QTEH4Q3yX8c2LlsLJGd3nW39pKpzkr9QKAVGJIsW';

const LIQPAY_PUBLIC_KEY = 'i68068890264';
const LIQPAY_PRIVATE_KEY = 'QTEH4Q3yX8c2LlsLJGd3nW39pKpzkr9QKAVGJIsW';

class LiqpayScreen extends Component {
	_didFocusSubscription;
	_willBlurSubscription;

	constructor(props) {
		super(props);
		this.params = {
			version: '3',
			public_key: LIQPAY_PUBLIC_KEY,
			action: 'pay',
			currency: 'USD',
			sandbox: '1',
			order_id: Math.floor(1000 + Math.random() * 9000),
			amount: '1'
		};
		this._didFocusSubscription = this.props.navigation.addListener('didFocus', (payload) => {
			BackHandler.addEventListener('hardwareBackPress', this.handleBackPress);
		});
		this.state = {
			liqpay: false
		};
	}

	componentDidMount() {
		this.props.navigation.addListener('didFocus', (payload) => {
			// this.props.getCart();
		});
		this._willBlurSubscription = this.props.navigation.addListener(
			'willBlur',
			(payload) => {}
			// BackHandler.removeEventListener('hardwareBackPress', this.handleBackPress)
		);
	}

	componentWillReceiveProps(nextProps) {}

	handleBackPress = () => {
		this.props.navigation.pop();
		return true;
	};

	render() {
		// const categories = [
		//   ...this.props.categories,
		//   ...this.props.subcategories,
		//   ...this.props.dishes
		// ];
		let notFound;

		return (
			// <Container style={styles.default}>

			// <StatusBar
			//   barStyle="light-content"
			//   hidden={false}
			//   translucent={true}
			//   backgroundColor={`rgba(0,0,0,${
			//     this.state.focus ? 0.1 : this.state.modalVisible ? 0.7 : 0
			//   })`}
			// />
			//  <View style={{ flex: 1 }}>
			//  <ScrollView
			//     keyboardShouldPersistTaps={"handled"}
			//     style={{
			//       position: "absolute",
			//       top: 0,
			//       bottom: 0,
			//       width: "100%",
			//       backgroundColor: `rgba(0,0,0,${this.state.focus ? 0.7 : 0})`,
			//       zIndex: this.state.focus ? 10 : 0
			//     }}
			//   />
			// //   <Button
			//   onPress={this.handlePress}
			//   title="Pay with Liqpay"
			//   color="#841584"
			// />
			//  {this.state.liqpay && ( */}
			<LiqpayCheckout
				privateKey={LIQPAY_PRIVATE_KEY}
				onLiqpayError={this.handleError}
				onLiqpaySuccess={this.handleSuccess}
				params={this.params}
			/>

			//   {/* </View> */}
			// </Container>
			// <Text>Hi</Text>
		);
	}
}

const styles = StyleSheet.create({
	background: {
		width: '100%',
		height: Dimensions.get('window').height * 1.5,
		position: 'absolute',
		top: 0,
		bottom: 0,
		left: 0,
		right: 0
	},
	container: {
		width: '100%',
		height: scaleSize(130 - 75)
	},
	default: {
		color: '#fff'
	},
	searchInput: {
		fontSize: scaleSize(13)
	},
	btn: {
		marginLeft: scaleSize(10),
		marginRight: scaleSize(10),
		marginBottom: scaleSize(40),
		marginTop: scaleSize(24),
		backgroundColor: '#ea9308',
		borderRadius: scaleSize(3)
	},
	btnText: {
		fontSize: scaleSize(14),
		textAlign: 'center',
		color: '#f8f8f8',
		paddingTop: scaleSize(8),
		paddingBottom: scaleSize(8),
		paddingRight: scaleSize(7),
		paddingLeft: scaleSize(7)
		// fontWeight: "400"
	}
});

const mapStateToProps = (state) => ({
	orderId: state.order.orderId
});

const mapDispatchToProps = (dispatch) => ({});

export default connect(mapStateToProps, mapDispatchToProps)(LiqpayScreen);
