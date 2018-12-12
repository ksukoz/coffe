import React, { Component } from 'react';
import { Container, Content, Text, Input, Item, Icon, Button } from 'native-base';
import {
	StyleSheet,
	View,
	ScrollView,
	StatusBar,
	TouchableOpacity,
	Dimensions,
	ActivityIndicator,
	Image,
	FlatList,
	Alert,
	AsyncStorage
} from 'react-native';
import KawaIcon from '../KawaIcon';

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
		height: 130
	},
	head: {
		marginTop: 35
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
		color: '#58554e'
	},
	codeIcon: {
		marginRight: 10,
		color: '#58554e'
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
		color: '#58554e',
		marginBottom: 5
	},
	product: {
		backgroundColor: 'rgba(255,255,255, 0.7)',
		marginRight: 12,
		marginLeft: 12,
		marginBottom: 7,
		flexDirection: 'row',
		paddingTop: 6,
		paddingBottom: 6,
		paddingRight: 10,
		borderRadius: 8
	},
	productImg: {
		width: 70,
		height: 120,
		marginRight: 12,
		marginLeft: 12,
		marginTop: 4
	},
	imgHit: {
		position: 'absolute',
		top: -2,
		left: 5,
		backgroundColor: '#ef5350',
		zIndex: 2,
		alignItems: 'center',
		justifyContent: 'center',
		width: 43,
		height: 17,
		borderTopLeftRadius: 10,
		borderBottomRightRadius: 10
	},
	productSort: {
		color: '#48433b',
		marginBottom: 1
	},
	productRoast: {
		color: '#48433b'
	},
	productName: {
		marginBottom: 3,
		color: '#010101'
	},
	starIcon: {
		color: '#ffea00',
		marginRight: 5
	},
	productRating: {
		color: '#48433b',
		fontSize: 13
	},
	numberOfReviews: {
		color: '#48433b',
		fontSize: 13,
		marginTop: -2
	},
	cartIcon: {
		color: '#48433b'
	},
	btn: {
		backgroundColor: '#ea9308',
		borderRadius: 3
	},
	btnText: {
		fontSize: 12,
		color: '#f8f8f8',
		paddingTop: 5,
		paddingBottom: 5,
		paddingRight: 7,
		paddingLeft: 7,
		fontWeight: '300'
	}
});

StatusBar.setBarStyle('light-content', true);
StatusBar.setBackgroundColor('rgba(0,0,0,0)');
const MAIN_BG = '../../static/img/background.png';

export default class HomeScreen extends Component {
	constructor(props) {
		super(props);
		this.state = {
			alphabet: [],
			products: [],
			search: '',
			page: 0,
			english: true,
			loading: true
		};
		Input.defaultProps.selectionColor = '#000';
	}

	componentDidMount() {
		fetch('http://kawaapi.gumione.pro/api/catalog/letters/1')
			.then((response) => response.json())
			.then((responseJson) => {
				this.setState(
					{
						alphabet: responseJson.letters
					},
					function() {}
				);
			})
			.catch((error) => {
				console.error(error);
			});

		this.fetchData();
	}

	fetchData() {
		fetch(
			'http://kawaapi.gumione.pro/api/catalog/items/' +
				`${this.props.navigation.getParam('categoryId', '0')}` +
				'/10/' +
				`${this.state.page}`
		)
			.then((response) => response.json())
			.then((responseJson) => {
				this.setState(
					(state) => ({
						products: [ ...state.products, ...responseJson.items ],
						loading: false
					}),
					function() {}
				);
			})
			.catch((error) => {
				console.error(error);
			});
	}

	handleSearch = (text) => {
		this.setState(
			(state) => ({ page: 0, search: text }),
			() => {
				fetch(
					'http://kawaapi.gumione.pro/api/catalog/search/' +
						`${this.state.search}` +
						'/0/both/10/' +
						`${this.state.page}`
				)
					.then((response) => response.json())
					.then((responseJson) => {
						this.setState({
							products: responseJson.items,
							loading: false
						}),
							function() {};
					})
					.catch((error) => {
						console.error(error);
					});
			}
		);
	};

	handleEnd = () => {
		this.setState((state) => ({ page: state.page + 10 }), () => this.fetchData());
	};

	changeAlphabet() {
		if (this.state.english) {
			return fetch('http://kawaapi.gumione.pro/api/catalog/letters/2')
				.then((response) => response.json())
				.then((responseJson) => {
					this.setState(
						{
							alphabet: responseJson.letters,
							english: false
						},
						function() {}
					);
				})
				.catch((error) => {
					console.error(error);
				});
		} else {
			return fetch('http://kawaapi.gumione.pro/api/catalog/letters/1')
				.then((response) => response.json())
				.then((responseJson) => {
					this.setState(
						{
							alphabet: responseJson.letters,
							english: true
						},
						function() {}
					);
				})
				.catch((error) => {
					console.error(error);
				});
		}
	}

	render() {
		return (
			<Container style={styles.default}>
				<StatusBar barStyle="light-content" hidden={false} translucent={true} />
				<Image source={require(MAIN_BG)} style={styles.background} />
				<View style={styles.container}>
					<Content>
						<View style={styles.head}>
							<Item style={styles.search} rounded>
								<Button transparent onPress={() => this.props.navigation.openDrawer()}>
									<Icon style={styles.iconMenu} name="ios-menu" />
								</Button>
								<Icon style={{ color: '#58554e' }} name="ios-search" />
								<Input
									style={styles.searchInput}
									placeholderTextColor="#becdcf"
									placeholder="Найти кофе"
									onChangeText={this.handleSearch}
								/>
								<KawaIcon style={styles.codeIcon} size={20} name="code" />
							</Item>
						</View>
						<ScrollView horizontal={true} style={styles.alphabetMenu}>
							{this.state.alphabet.map((item) => {
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
					</Content>
				</View>
				<FlatList
					keyExtractor={(item, index) => item.id}
					onEndReached={() => {
						this.setState({
							loading: true
						});
						this.handleEnd();
					}}
					ListFooterComponent={() =>
						this.state.loading ? <ActivityIndicator size="large" animating /> : null}
					onEndReachedThreshold={0.1}
					data={this.state.products}
					renderItem={({ item }) => (
						<TouchableOpacity
							onPress={() => {
								AsyncStorage.setItem('idOfProduct', JSON.stringify(item));
								this.props.navigation.navigate('ProductCard');
							}}
							style={styles.product}
						>
							<View style={{ position: 'relative' }}>
								{item.new == 1 && (
									<View style={styles.imgHit}>
										<Text style={{ fontSize: 10, color: '#fff', fontWeight: 'bold' }}>ХИТ</Text>
									</View>
								)}
								<Image
									source={{ uri: 'http://kawa.gumione.pro' + item.file }}
									style={styles.productImg}
								/>
							</View>

							<View style={{ flex: 1 }}>
								<View style={styles.productTitle}>
									<Text style={styles.productName}>{item.name + ' ' + item.weight + 'g'}</Text>
									<Text style={styles.productSort}>{item.sort_human}</Text>
									<Text style={styles.productRoast}>{item.roast_human}</Text>
								</View>

								<View style={{ flexDirection: 'row', marginTop: -8 }}>
									<View
										style={{
											borderBottomWidth: 1,
											borderColor: '#89a6aa',
											flex: 1,
											marginBottom: 5.5,
											marginRight: 7
										}}
									/>
									<Text style={{ color: '#010101', fontSize: 20, fontWeight: '300' }}>
										{item.price} грн
									</Text>
								</View>

								<View
									style={{
										flexDirection: 'row',
										justifyContent: 'space-between',
										alignItems: 'center'
									}}
								>
									<View>
										<View style={{ flexDirection: 'row', alignItems: 'center' }}>
											<KawaIcon style={styles.starIcon} size={16} name="small-star-in-catalog" />
											<Text style={styles.productRating}>4.8</Text>
										</View>
										<Text style={styles.numberOfReviews}>27 отзывов</Text>
									</View>
									<KawaIcon style={styles.cartIcon} size={26} name="big-cart-in-catalog" />
									<View style={styles.btn}>
										<Text style={styles.btnText}>КУПИТЬ СЕЙЧАС</Text>
									</View>
								</View>
							</View>
						</TouchableOpacity>
					)}
				/>
			</Container>
		);
	}
}
