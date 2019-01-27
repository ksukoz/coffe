import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Container, Content, Input } from 'native-base';
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
	AsyncStorage,
	Platform,
	StyleSheet
} from 'react-native';

import RadioGroup, { Radio } from 'react-native-radio-input';

import { getCart } from '../../store/actions/cartActions';
import { getUser } from '../../store/actions/userActions';
import { getProductID } from '../../store/actions/catalogActions';

import { searchFocused, getDeliveryCost } from '../../store/actions/commonActions';

import { scaleSize } from '../../helpers/scaleSize';
import OrderItem from './OrderItem';
import SearchBar from '../common/SearchBar';

import TextInputMask from 'react-native-text-input-mask';

import KawaIcon from '../KawaIcon';

Input.defaultProps.selectionColor = '#ea9308';
TextInputMask.defaultProps.selectionColor = '#ea9308';

StatusBar.setBarStyle('light-content', true);
StatusBar.setBackgroundColor('rgba(0,0,0,0)');
const MAIN_BG = '../../static/img/background.png';

class OrderScreen extends Component {
	_didFocusSubscription;
	_willBlurSubscription;

	constructor(props) {
		super(props);
		this._didFocusSubscription = this.props.navigation.addListener('didFocus', (payload) => {
			if (this.props.navigation.getParam('itemId')) {
				this.props.getProductID(this.props.navigation.getParam('itemId'));
			}
			this.props.getCart();
			this.props.getUser();
			BackHandler.addEventListener('hardwareBackPress', this.handleBackPress);
		});
		this.state = {
			search: '',
			focus: false,
			loading: true,
			city: '',
			email: '',
			firstname: '',
			lastname: '',
			phone: ''
		};
		this.viewabilityConfig = {
			waitForInteraction: true,
			viewAreaCoveragePercentThreshold: 30,
			viewAreaPercentThreshold: 30
		};
		Input.defaultProps.selectionColor = '#000';
	}

	componentDidUpdate(prevProps, prevState) {
		if (JSON.stringify(prevProps.cart) !== JSON.stringify(this.props.cart)) {
			this.setState({ loading: false, cart: this.props.cart });
		}
		if (prevProps.focus !== this.props.focus) {
			this.setState({ loading: false, focus: this.props.focus });
		}
	}

	componentDidMount() {
		this._willBlurSubscription = this.props.navigation.addListener('willBlur', (payload) =>
			BackHandler.removeEventListener('hardwareBackPress', this.handleBackPress)
		);

		this.retrieveData('user_region_name');
		this.retrieveData('user_city_name');
	}

	componentWillReceiveProps(nextProps) {
		if (nextProps.user) {
			this.setState({
				email: nextProps.user.email,
				firstname: nextProps.user.firstname,
				lastname: nextProps.user.lastname,
				phone: nextProps.user.phone
			});
		}
		if (nextProps.end || nextProps.end === false) {
			this.setState({ loading: false, end: nextProps.end });
		}
	}

	handleEnd = () => {};

	retrieveData = async (name) => {
		try {
			const value = await AsyncStorage.getItem(name);

			if (value) {
				if (name == 'user_city_name') {
					this.setState(
						{
							city: value
						},
						() => this.props.getDeliveryCost(value)
					);
				}
			}
			this.setState({ loading: false });
		} catch (error) {}
	};

	getStyles = (index) => {
		this.setState({ stylesIndex: index });
	};

	handleBackPress = () => {
		this.props.navigation.pop();
		return true;
	};

	render() {
		const categories = [ ...this.props.categories, ...this.props.subcategories, ...this.props.dishes ];
		let notFound;
		const { cart, product } = this.props;
		const filteredCart = cart && product ? cart.filter((cartItem) => cartItem.id === product.id) : [];

		return (
			<Container style={styles.default}>
				<StatusBar
					barStyle="light-content"
					hidden={false}
					translucent={true}
					backgroundColor={`rgba(0,0,0,${this.state.focus ? 0.1 : 0})`}
				/>
				<View style={{ flex: 1 }}>
					<ScrollView
						keyboardShouldPersistTaps={'handled'}
						style={{
							position: 'absolute',
							top: 0,
							bottom: 0,
							width: '100%',
							backgroundColor: `rgba(0,0,0,${this.state.focus ? 0.7 : 0})`,
							zIndex: this.state.focus ? 10 : 0
						}}
					/>
					<Image source={require(MAIN_BG)} style={styles.background} />
					<SearchBar
						placeholder={'Найти кофе'}
						style={{ marginBottom: scaleSize(20) }}
						navigation={this.props.navigation}
					/>
					<Content style={{ marginTop: scaleSize(99) }}>
						{this.props.navigation.getParam('itemId') && this.props.product && filteredCart[0] ? (
							<View
								style={{
									paddingLeft: scaleSize(10),
									paddingRight: scaleSize(10)
								}}
							>
								<OrderItem
									cart={this.props.cart}
									product={true}
									item={this.props.product}
									categories={categories}
								/>
							</View>
						) : (
							<FlatList
								style={{
									marginLeft: scaleSize(10),
									marginRight: scaleSize(10),
									marginBottom: scaleSize(20),
									zIndex: 2
								}}
								keyExtractor={(item) => item.id}
								getItemLayout={(data, index) => ({
									length: 100 - 1,
									index
								})}
								initialNumToRender={6}
								removeClippedSubviews={true}
								maxToRenderPerBatch={4}
								windowSize={1}
								data={this.props.cart}
								extraData={this.props}
								renderItem={({ item }) => (
									<OrderItem cart={this.props.cart} item={item} categories={categories} />
								)}
								viewabilityConfig={this.viewabilityConfig}
							/>
						)}

						<View style={{ marginLeft: scaleSize(10), marginRight: scaleSize(10) }}>
							<Text
								style={[
									styles.default,
									{
										marginLeft: scaleSize(8),
										marginBottom: scaleSize(8),
										fontSize: scaleSize(14)
									}
								]}
							>
								Оформление заказа
							</Text>
							<View style={styles.block}>
								<Input style={styles.profileInput} placeholder={'Эл.почта'} value={this.state.email} />
								<TextInputMask
									placeholder={'+38 (___) ___ __ __'}
									placeholderTextColor="#000"
									keyboardType="phone-pad"
									mask={'+38 ([000]) [000] [00] [00]'}
									// onBlur={() => this.onUnFocus('phone')}
									// onFocus={() => this.onFocus('phone')}
									style={styles.profileInputPhone}
									value={this.state.phone}
								/>
								<Input style={styles.profileInput} placeholder={'Имя'} value={this.state.firstname} />
								<Input
									style={styles.profileInput}
									placeholder={'Фамилия'}
									value={this.state.lastname}
								/>
								<View style={styles.cardFullCity}>
									<View
										style={{
											width: '100%',
											paddingLeft: 0,
											paddingRight: 0,
											marginLeft: 0,
											marginRight: 0
										}}
									>
										<TouchableOpacity
											onPress={() =>
												this.props.navigation.navigate('SelectRegionScreen', {
													linkName: 'Order'
												})}
											style={{
												paddingLeft: scaleSize(15),
												paddingRight: scaleSize(15),
												width: '100%',
												flexDirection: 'row'
											}}
										>
											<Text
												onFocus={() =>
													this.props.navigation.navigate('SelectRegionScreen', {
														linkName: 'Order'
													})}
												style={{
													paddingTop: 0,
													paddingBottom: 0,
													height: scaleSize(40),
													fontSize: scaleSize(20),
													color: 'rgba(255, 255, 255, .7)',
													width: '100%',
													paddingLeft: 0,
													marginBottom: scaleSize(25),

													borderBottomColor: '#fff',
													borderBottomWidth: 1
												}}
											>
												{this.state.city}
											</Text>
											<KawaIcon
												style={{
													color: '#fff',
													position: 'absolute',
													right: scaleSize(15),
													top: scaleSize(10)
												}}
												name={'arrow-next'}
												size={scaleSize(14)}
											/>
										</TouchableOpacity>
									</View>
								</View>
								<View
									style={{
										flexDirection: 'row',
										justifyContent: 'space-between'
									}}
								>
									<RadioGroup
										getChecked={function() {}}
										RadioGroupStyle={{
											flexDirection: 'row',
											justifyContent: 'space-between',
											flexWrap: 'wrap',
											borderRadius: 0
										}}
										RadioStyle={{
											paddingLeft: 0,
											marginRight: 20,
											marginLeft: 0,
											marginBottom: scaleSize(16),
											borderRadius: 0
										}}
										coreStyle={{
											fontSize: scaleSize(21),
											marginLeft: -3
										}}
										IconStyle={{
											borderRadius: 0,
											padding: 0,
											width: scaleSize(17),
											height: scaleSize(17),
											fontSize: scaleSize(18),
											paddingTop: -2,
											borderRadius: 3,
											borderColor: '#302c23'
										}}
										labelStyle={{ fontSize: scaleSize(16) }}
									>
										<Radio
											label={'VISA, MasterCard'}
											value={'VISA, MasterCard'}
											iconName={'check-box'}
										/>
										<View style={styles.imgBlock}>
											<View
												style={{
													flexDirection: 'row',
													alignItems: 'center'
												}}
											>
												<Image
													source={require('../../static/img/visa.png')}
													style={{
														width: scaleSize(47),
														height: scaleSize(15),
														marginRight: scaleSize(24)
													}}
												/>
												<Image
													source={require('../../static/img/mastercard.png')}
													style={{
														width: scaleSize(31),
														height: scaleSize(18)
													}}
												/>
											</View>
										</View>
										<Radio label={'Privat 24'} value={'Privat 24'} iconName={'check-box'} />
										<View style={styles.imgBlock}>
											<Image
												source={require('../../static/img/privat24.png')}
												style={{ width: scaleSize(102), height: scaleSize(20) }}
											/>
										</View>
										{Platform.OS === 'ios' ? (
											<Radio label={'Apple Pay'} value={'Apple Pay'} iconName={'check-box'} />
										) : (
											<Radio label={'Google Pay'} value={'Google Pay'} iconName={'check-box'} />
										)}
										<View style={styles.imgBlock}>
											{Platform.OS === 'ios' ? (
												<Image
													source={require('../../static/img/apay.png')}
													style={{
														alignSelf: 'flex-end',
														width: scaleSize(50),
														height: scaleSize(23)
													}}
												/>
											) : (
												<Image
													source={require('../../static/img/gpay.png')}
													style={{
														alignSelf: 'flex-end',
														width: scaleSize(58),
														height: scaleSize(23)
													}}
												/>
											)}
										</View>

										<Radio label={'Masterpass'} value={'Masterpass'} iconName={'check-box'} />
										<View style={[ styles.imgBlock, { marginTop: 0 } ]}>
											<Image
												source={require('../../static/img/masterpass.png')}
												style={{ width: scaleSize(30), height: scaleSize(24) }}
											/>
										</View>
										<Radio
											label={'Безналичная оплата, счет на Email'}
											value={'Безналичная оплата, счет на Email'}
											iconName={'check-box'}
										/>
									</RadioGroup>
								</View>
							</View>
						</View>

						<View
							style={{
								flexDirection: 'row',
								justifyContent: 'space-between',
								paddingLeft: scaleSize(10),
								paddingRight: scaleSize(10),
								marginBottom: scaleSize(15)
							}}
						>
							<Text style={{ fontSize: scaleSize(16), color: '#fff' }}>Продукты:</Text>
							<Text style={{ fontSize: scaleSize(16), color: '#fff' }}>
								{this.props.navigation.getParam('itemId') && this.props.product && filteredCart[0] ? (
									filteredCart[0].qty * filteredCart[0].price
								) : (
									this.props.cart
										.map((item) => item.qty * item.price)
										.reduce((sum, item) => sum + item)
								)}{' '}
								грн.
							</Text>
						</View>
						<View
							style={{
								flexDirection: 'row',
								justifyContent: 'space-between',
								paddingLeft: scaleSize(10),
								paddingRight: scaleSize(10),
								marginBottom: scaleSize(15)
							}}
						>
							<Text style={{ fontSize: scaleSize(16), color: '#fff' }}>Доставка:</Text>
							<Text style={{ fontSize: scaleSize(16), color: '#fff' }}> </Text>
						</View>
						<View
							style={{
								flexDirection: 'row',
								justifyContent: 'space-between',
								paddingLeft: scaleSize(10),
								paddingRight: scaleSize(10),
								marginBottom: scaleSize(15)
							}}
						>
							<Text style={{ fontSize: scaleSize(16), color: '#fff' }}>Всего к оплате:</Text>
							<Text style={{ fontSize: scaleSize(16), color: '#fff' }}> грн.</Text>
						</View>
						{/* <TouchableOpacity
              onPress={() =>
                this.props.navigation.push("OrderScreen", {
                  linkName: "CatalogScreen",
                  categoryId
                })
              }
              style={styles.btn}
            >
              <Text style={styles.btnText}>
                {"Оформить сейчас".toUpperCase()}
              </Text>
            </TouchableOpacity> */}
					</Content>
				</View>
			</Container>
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
	block: {
		backgroundColor: 'rgba(255,255,255, 0.7)',
		marginBottom: scaleSize(7),
		paddingTop: scaleSize(16),
		paddingBottom: scaleSize(16),
		paddingRight: scaleSize(15),
		paddingLeft: scaleSize(15),
		borderRadius: scaleSize(8)
	},
	default: {
		color: '#fff'
	},
	searchInput: {
		fontSize: scaleSize(13)
	},
	profileInput: {
		fontSize: scaleSize(16),
		height: scaleSize(40),
		marginBottom: scaleSize(20),
		borderBottomColor: '#89a6aa',
		borderBottomWidth: 1,
		width: '100%',
		paddingLeft: 0
	},
	profileInputPhone: {
		fontSize: scaleSize(16),
		borderBottomColor: '#89a6aa',
		borderBottomWidth: 1,
		width: '100%',
		paddingLeft: 0,
		paddingTop: 10,
		paddingBottom: 10,
		marginBottom: scaleSize(20)
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
		paddingTop: scaleSize(7),
		paddingBottom: scaleSize(7),
		paddingRight: scaleSize(7),
		paddingLeft: scaleSize(7)
	},
	imgBlock: {
		alignItems: 'flex-end',
		marginTop: scaleSize(4),
		width: '30%'
	}
});

const mapStateToProps = (state) => ({
	city: state.common.city,
	delivery: state.common.delivery,
	cart: state.cart.items,
	product: state.catalog.product,
	categories: state.catalog.categories,
	subcategories: state.catalog.subcategories,
	dishes: state.catalog.dishes,
	user: state.user.info
});

const mapDispatchToProps = (dispatch) => ({
	getCart: () => dispatch(getCart()),
	getProductID: (id) => dispatch(getProductID(id)),
	getDeliveryCost: (city) => dispatch(getDeliveryCost(city)),
	searchFocused: () => dispatch(searchFocused()),
	getUser: () => dispatch(getUser())
});

export default connect(mapStateToProps, mapDispatchToProps)(OrderScreen);
