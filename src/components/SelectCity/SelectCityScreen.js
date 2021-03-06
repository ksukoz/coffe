import React, { Component } from 'react';
import {
	Container,
	Content,
	Text,
	Item,
	Button,
	Picker,
	Form,
	Input,
	Header,
	Body,
	Title,
	Left,
	Right
} from 'native-base';
import {
	StyleSheet,
	View,
	ImageBackground,
	Image,
	ScrollView,
	StatusBar,
	TouchableOpacity,
	Dimensions,
	BackHandler,
	Alert,
	ActivityIndicator,
	AsyncStorage,
	FlatList,
	TouchableHighlight
} from 'react-native';
import RadioGroup, { Radio } from 'react-native-radio-input';
import DatePicker from 'react-native-datepicker';
import KawaIcon from './../KawaIcon';

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
	cardDouble: {
		flex: 1,
		flexDirection: 'row',
		color: '#fff',
		marginLeft: 10,
		marginRight: 5,
		marginTop: 2,
		shadowColor: '#fff',
		justifyContent: 'center'
	},
	cardFull: {
		marginLeft: 5,
		marginRight: 5,
		marginTop: 5,
		paddingBottom: 10,
		paddingLeft: 20,
		paddingRight: 20,
		color: '#000000',
		textAlign: 'center',
		shadowColor: '#fff',
		backgroundColor: 'rgba(255,255,255, 0.7)',
		alignItems: 'flex-start',
		borderRadius: 5,
		justifyContent: 'space-around',
		resizeMode: 'contain'
	},
	cardFullFirst: {
		marginLeft: 5,
		marginRight: 5,
		marginTop: 20,
		paddingBottom: 10,
		paddingLeft: 20,
		paddingRight: 20,
		color: '#000000',
		textAlign: 'center',
		shadowColor: '#fff',
		backgroundColor: 'rgba(255,255,255, 0.7)',
		alignItems: 'flex-start',
		borderRadius: 5,
		justifyContent: 'space-around',
		resizeMode: 'contain',
		marginBottom: 30
	},
	cardFullCity: {
		marginLeft: 5,
		marginRight: 5,
		marginTop: 5,
		paddingBottom: 10,
		paddingLeft: 0,
		paddingRight: 0,
		color: '#000000',
		textAlign: 'center',
		shadowColor: '#fff',
		backgroundColor: 'rgba(255,255,255, 0.7)',
		alignItems: 'flex-start',
		borderRadius: 5,
		justifyContent: 'space-around',
		resizeMode: 'contain'
	},
	cardFullLast: {
		marginLeft: 5,
		marginRight: 5,
		marginTop: 5,
		marginBottom: 40,
		paddingBottom: 10,
		color: '#000000',
		textAlign: 'center',
		shadowColor: '#fff',
		backgroundColor: 'rgba(255,255,255, 0.7)',
		alignItems: 'flex-start',
		borderRadius: 5,
		justifyContent: 'space-around',
		resizeMode: 'contain'
	},
	cardItemHalf: {
		width: '50%',
		backgroundColor: 'rgba(255,255,255, 0.2)',
		marginRight: 5,
		marginTop: 3,
		alignItems: 'center',
		height: Dimensions.get('window').width * 0.5 - 10,
		borderRadius: 5,
		justifyContent: 'flex-end',
		resizeMode: 'contain',
		paddingBottom: '20%'
	},
	cardContent: {
		color: '#000000'
	},
	container: {
		flex: 1
	},
	head: {
		marginTop: 35,
		marginBottom: 25,
		color: '#ffffff'
	},
	default: {
		color: '#fff'
	},
	alphabet: {
		color: '#fff',
		padding: 10,
		fontSize: 13,
		paddingRight: 25
	},
	search: {
		backgroundColor: '#fff',
		marginRight: 15,
		marginLeft: 15,
		height: 40,
		paddingLeft: 5,
		paddingRight: 10
	},
	searchIcon: {
		paddingTop: 3,
		position: 'absolute',
		right: 20
	},
	searchInput: {
		fontSize: 13
	},
	alphabetMenu: {
		flex: 1,
		flexDirection: 'row',
		marginLeft: 10,
		marginTop: 10
	},
	iconMenu: {
		color: '#ffffff',
		fontSize: 22,
		fontWeight: 'bold'
	},
	profileInput: {
		fontSize: 20,
		borderBottomColor: '#89a6aa',
		borderBottomWidth: 1,
		width: '100%',
		paddingLeft: 0
	},
	profileInputPhone: {
		fontSize: 20,
		borderBottomColor: '#89a6aa',
		borderBottomWidth: 1,
		width: '100%',
		paddingLeft: 0,
		paddingTop: 10,
		paddingBottom: 10
	},
	profileInputPhoneFocused: {
		fontSize: 20,
		borderBottomColor: '#ea9308',
		borderBottomWidth: 1,
		width: '100%',
		paddingLeft: 0,
		paddingTop: 10,
		paddingBottom: 10
	},
	profileInputFocused: {
		fontSize: 20,
		borderBottomColor: '#ea9308',
		borderBottomWidth: 1,
		width: '100%',
		paddingLeft: 0
	},
	birthdayInput: {
		borderBottomColor: '#89a6aa',
		borderBottomWidth: 1,
		width: '100%',
		paddingLeft: 0,
		paddingRight: 0,
		marginLeft: 0,
		marginRight: 0
	},
	profileInputCalendar: {
		fontSize: 20,
		borderBottomColor: '#89a6aa',
		borderBottomWidth: 1,
		width: '100%',
		paddingLeft: 0
	}
});

StatusBar.setBarStyle('light-content', true);
StatusBar.setBackgroundColor('rgba(0,0,0,0)');
const MAIN_BG = '../../static/img/background.png';

export default class SelectCityScreen extends Component {
	constructor(props) {
		super(props);
		this.state = {
			region_id: 0,
			region_name: '',
			cities: [],
			loading: false
		};
	}
	componentDidUpdate(prevProps, prevState) {
		let formData = new FormData();
		formData.append('login', 'info@wrevery.com');
		formData.append('password', 'testtest');

		console.log(
			// "http://kawaapi.gumione.pro/api/users/cities/" +
			this.state.region_id
		);

		if (prevState.region_id !== this.state.region_id) {
			fetch('http://kawaapi.gumione.pro/api/auth/login', {
				method: 'POST',
				body: formData
			})
				.then((response) => response.json())
				.then((responseJson) => {
					fetch('http://kawaapi.gumione.pro/api/users/cities/' + this.state.region_id, {
						headers: new Headers({
							Authorization: 'Bearer ' + responseJson.token
						})
					})
						.then((response) => response.json())
						.then((responseJson) => {
							let sortedKeys = Object.keys(responseJson.cities).sort();
							let cities = responseJson.cities[sortedKeys[0]];
							console.log(
								// "http://kawaapi.gumione.pro/api/users/cities/" +
								this.state.region_id
							);
							this.setState(
								{
									loading: false,
									cities: cities
								},
								function() {}
							);
						})
						.catch((error) => {
							console.error(error);
						});
				})
				.catch((error) => {
					console.error(error);
				});
		}
	}

	componentDidMount() {
		BackHandler.addEventListener('hardwareBackPress', this.handleBackPress);

		this.retrieveData('region_id');

		// this.retrieveData("region_name");
	}

	componentWillUnmount() {
		BackHandler.removeEventListener('hardwareBackPress', this.handleBackPress);
	}

	retrieveData = async (name) => {
		console.log(await AsyncStorage.getItem(name));
		try {
			const value = await AsyncStorage.getItem(name);

			if (value !== null) {
				this.setState({
					region_id: value
				});
			}
			// else if (name == "region_name") {
			//   this.setState({
			//     region_name: value
			//   });
			// }
		} catch (error) {
			// Error retrieving data
		}
	};

	storeData = async (name, value) => {
		try {
			await AsyncStorage.setItem(name, value);
		} catch (error) {
			// Error saving data
		}
	};

	setCity = (id, name) => {
		this.storeData('user_city_id', id);
		this.storeData('user_region_id', this.state.region_id);
		this.storeData('user_city_name', name);
		this.storeData('user_region_name', this.state.region_name);
		this.props.navigation.pop();
		this.props.navigation.pop();
	};

	handleBackPress = () => {
		this.props.navigation.pop();
		return true;
	};

	renderSeparator = () => (
		<View
			style={{
				backgroundColor: '#89a6aa',
				height: 1
			}}
		/>
	);

	renderLoadingView() {
		return (
			<View
				style={{
					width: '100%',
					flex: 1
				}}
			>
				<ActivityIndicator
					color="#1c1c1c"
					size="small"
					style={{
						flex: 1,
						justifyContent: 'center',
						alignItems: 'center',
						height: 80
					}}
				/>
			</View>
		);
	}

	render() {
		if (this.state.loading) {
			return this.renderLoadingView();
		}
		return (
			<Container style={styles.default}>
				<StatusBar barStyle="light-content" hidden={false} translucent={true} />
				<Image source={require(MAIN_BG)} style={styles.background} />
				<View style={styles.head}>
					<Item style={{ borderBottomWidth: 0, color: '#fff' }}>
						<Button transparent onPress={() => this.props.navigation.pop()}>
							<KawaIcon
								style={{ color: '#fff', paddingLeft: 18, paddingRight: 20 }}
								name={'arrow-back2'}
								size={20}
							/>
						</Button>
						<Text
							style={{
								color: '#ffffff',
								fontSize: 20,
								fontWeight: 'bold'
							}}
						>
							Выберите город
						</Text>
					</Item>
				</View>
				<ScrollView
					style={{
						marginBottom: 20,
						backgroundColor: 'rgba(255,255,255, 0.7)',
						borderTopLeftRadius: 5,
						borderTopRightRadius: 5,
						borderBottomLeftRadius: 5,
						borderBottomRightRadius: 5,
						paddingLeft: 20,
						paddingRight: 20,
						marginLeft: '2.2%',
						marginRight: '2.2%',
						width: '95.6%'
					}}
				>
					<FlatList
						ItemSeparatorComponent={this.renderSeparator}
						data={this.state.cities}
						renderItem={({ item, separators }) => (
							<TouchableOpacity
								style={{
									paddingLeft: 0,
									paddingRight: 0,
									alignItems: 'flex-start',
									height: 58,
									width: '100%',
									marginLeft: 0,
									marginRight: 0,
									justifyContent: 'center'
								}}
								button
								onPress={() => this.setCity(item.id, item.name)}
							>
								<Text style={{ fontSize: 16, paddingLeft: 7 }}>{item.name}</Text>
							</TouchableOpacity>
						)}
					/>
				</ScrollView>
			</Container>
		);
	}
}
