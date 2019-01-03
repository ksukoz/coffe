import React, { Component } from 'react';
import { connect } from 'react-redux';
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
	AsyncStorage,
	BackHandler
} from 'react-native';
import KawaIcon from '../KawaIcon';
import { getCart } from '../../store/actions/cartActions';
import { getProducts, findProducts } from '../../store/actions/catalogActions';

import { scaleSize } from '../../helpers/scaleSize';
import ProductItem from './ProductItem';
import LetterBar from '../common/LetterBar';
import SearchBar from '../common/SearchBar';
import HeaderBar from '../common/HeaderBar';

StatusBar.setBarStyle('light-content', true);
StatusBar.setBackgroundColor('rgba(0,0,0,0)');
const MAIN_BG = '../../static/img/background.png';

class CatalogScreen extends Component {
	constructor(props) {
		super(props);
		this.state = {
			products: [],
			categories: [],
			page: 0,
			cart: {},
			search: '',
			stylesIndex: 0,
			loading: true
		};
		Input.defaultProps.selectionColor = '#000';
	}

	async componentWillMount() {
		let data = await AsyncStorage.getItem('search');
		this.setState(
			{ search: data ? data : '' },
			() =>
				data
					? this.props.findProducts(
							data,
							this.props.navigation.getParam('categoryId', '0'),
							this.state.page,
							'after'
						)
					: this.props.getProducts(this.props.navigation.getParam('categoryId', '0'), this.state.page)
		);
		fetch('http://kawaapi.gumione.pro/api/catalog/categories')
			.then((response) => response.json())
			.then((responseJson) => {
				this.setState({
					categories: responseJson.categories
				});
			})
			.catch((error) => {
				console.error(error);
			});
		fetch('http://kawaapi.gumione.pro/api/catalog/categories/7')
			.then((response) => response.json())
			.then((responseJson) => {
				this.setState({
					categories: [ ...this.state.categories, ...responseJson.categories ]
				});
			})
			.catch((error) => {
				console.error(error);
			});
	}

	async componentDidMount() {
		let data = await AsyncStorage.getItem('search');
		this.props.getCart();
		if (!data) {
			this.props.getProducts(this.props.navigation.getParam('categoryId', '0'), this.state.page);
		}

		BackHandler.addEventListener('hardwareBackPress', this.handleBackPress);
	}

	componentWillReceiveProps(nextProps) {
		if (nextProps.products) {
			this.setState({ loading: false, products: nextProps.products });
		}
		if (nextProps.cart) {
			this.setState({ cart: nextProps.cart });
		}
	}

	componentWillUnmount() {
		BackHandler.removeEventListener('hardwareBackPress', this.handleBackPress);
	}

	handleEnd = () => {
		this.setState(
			(state) => ({ page: state.page + 10 }),
			() => {
				this.state.search
					? this.props.findProducts(
							this.state.search,
							this.props.navigation.getParam('categoryId', '0'),
							this.state.page,
							'after'
						)
					: this.props.getProducts(this.props.navigation.getParam('categoryId', '0'), this.state.page);
			}
		);
	};

	handleBackPress = () => {
		this.props.navigation.navigate(this.props.navigation.getParam('linkName', 'Home'), {
			productId: this.props.navigation.getParam('productId', '0'),
			categoryId: this.props.navigation.getParam('categoryId', '0'),
			categoryName: this.props.navigation.getParam('categoryName', 'Кофе в зернах'),
			letter: ''
		});
		return true;
	};

	getStyles = (index) => {
		this.setState({ stylesIndex: index });
	};

	render() {
		return (
			<Container style={styles.default}>
				<StatusBar barStyle="light-content" hidden={false} translucent={true} />
				<Image source={require(MAIN_BG)} style={styles.background} />
				{this.state.search ? (
					<HeaderBar menu={true} catalog={true} title={this.state.search} getStyles={this.getStyles} />
				) : (
					<View style={styles.container}>
						<Content>
							<View style={styles.head}>
								<SearchBar
									placeholder={this.props.navigation.getParam('categoryName', 'Найти кофе')}
									style={{ marginBottom: scaleSize(20) }}
									navigation={this.props.navigation}
								/>
							</View>
							<LetterBar
								navigation={this.props.navigation}
								categoryId={this.props.navigation.getParam('categoryId', 0)}
								categoryName={this.props.navigation.getParam('categoryName', 0)}
							/>
						</Content>
					</View>
				)}
				<FlatList
					style={{
						marginLeft: scaleSize(10),
						marginRight: this.state.stylesIndex === 1 ? scaleSize(5) : scaleSize(12)
					}}
					keyExtractor={(item) => item.id}
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
					extraData={this.state}
					renderItem={({ item }) => (
						<ProductItem
							navigation={this.props.navigation}
							categoryId={item.pid}
							item={item}
							categories={this.state.categories}
							styleIndex={this.state.stylesIndex}
						/>
					)}
					key={this.state.stylesIndex === 1 ? 'h' : 'v'}
					numColumns={this.state.stylesIndex === 1 ? 2 : 1}
				/>
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
		height: scaleSize(130)
	},
	default: {
		color: '#fff'
	},
	searchInput: {
		fontSize: scaleSize(13)
	},
	iconMenu: {
		color: '#58554e',
		marginBottom: scaleSize(5)
	}
});

const mapStateToProps = (state) => ({
	cart: state.cart.items,
	products: state.catalog.products
});

const mapDispatchToProps = (dispatch) => ({
	getCart: () => dispatch(getCart()),
	getProducts: (category, page) => dispatch(getProducts(category, page)),
	findProducts: (value, category, page, type) => dispatch(findProducts(value, category, page, type))
});

export default connect(mapStateToProps, mapDispatchToProps)(CatalogScreen);
