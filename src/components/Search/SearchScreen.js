import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Container, Content, Input } from 'native-base';
import {
	View,
	StatusBar,
	Dimensions,
	ActivityIndicator,
	Image,
	Text,
	FlatList,
	ScrollView,
	BackHandler,
	StyleSheet
} from 'react-native';

import { getCart } from '../../store/actions/cartActions';

import { getAlphabet, setSearch } from '../../store/actions/commonActions';
import { clearSearchedProducts } from '../../store/actions/catalogActions';

import { scaleSize } from '../../helpers/scaleSize';
import ProductItem from '../Catalog/ProductItem';

import KawaIcon from '../KawaIcon';
import HeaderBar from '../common/HeaderBar';

StatusBar.setBarStyle('light-content', true);
StatusBar.setBackgroundColor('rgba(0,0,0,0)');
const MAIN_BG = '../../static/img/background.png';

class SearchScreen extends Component {
	constructor(props) {
		super(props);
		this.state = {
			// products: [],
			// categories: [],
			page: 0,
			search: '',
			stylesIndex: 0,
			focus: false,
			loading: true,
			end: false
		};
		this.viewabilityConfig = {
			waitForInteraction: true,
			viewAreaCoveragePercentThreshold: 30,
			viewAreaPercentThreshold: 30
		};
		Input.defaultProps.selectionColor = '#000';
	}

	componentDidMount() {
		this.props.navigation.addListener('didFocus', (payload) => {
			this.props.getCart();
			if (this.props.focus) {
				this.props.searchFocused();
			}
		});
		BackHandler.addEventListener('hardwareBackPress', this.handleBackPress);
	}

	componentDidUpdate(prevProps, prevState) {
		if (
			JSON.stringify(prevProps.searchedProducts) !== JSON.stringify(this.props.searchedProducts) &&
			this.props.searchedProducts.length === 0
		) {
			this.setState({ loading: true });
		}
	}

	componentWillReceiveProps(nextProps) {
		if (nextProps.end) {
			this.setState({ loading: false, end: nextProps.end });
		}
		if (nextProps.searchedProducts && nextProps.end === false) {
			this.setState({ loading: false, products: nextProps.searchedProducts });
		}
	}

	componentWillUnmount() {
		this.props.BackHandler.removeEventListener('hardwareBackPress', this.handleBackPress);
	}

	handleEnd = () => {
		this.props.setSearch(this.props.search, this.props.id, this.state.page);
	};

	handleBackPress = () => {
		this.props.setSearch(this.props.search, this.props.id);
		this.props.clearSearchedProducts();
		this.props.navigation.pop();
		return true;
	};

	getStyles = (index) => {
		this.setState({ stylesIndex: index });
	};

	render() {
		const categories = [ ...this.props.categories, ...this.props.subcategories, ...this.props.dishes ];
		let notFound;
		if (
			this.props.searchedProducts.length === 0 &&
			this.props.navigation.getParam('search') &&
			!this.state.loading &&
			this.props.end
		) {
			notFound = (
				<View style={{ flex: 1, alignItems: 'center', zIndex: 90 }}>
					<KawaIcon
						color={'#f8f8f8'}
						name={'info'}
						size={scaleSize(52)}
						style={{ marginBottom: scaleSize(16) }}
					/>
					<Text style={{ color: '#f8f8f8', fontSize: scaleSize(16) }}>Ничего не найдено</Text>
					<Text style={{ color: '#f8f8f8', fontSize: scaleSize(16) }}>Попробуйте уточнить свой запрос</Text>
				</View>
			);
		}
		return (
			<Container style={styles.default}>
				<StatusBar
					// barStyle="light-content"
					hidden={false}
					translucent={true}
					backgroundColor={`rgba(0,0,0,${this.state.focus ? 0.9 : 0})`}
				/>
				<View style={{ flex: 1 }}>
					<ScrollView
						keyboardShouldPersistTaps={'handled'}
						style={{
							position: 'absolute',
							top: 0,
							bottom: 0,
							width: '100%',
							backgroundColor: `rgba(0,0,0,${this.state.focus ? 0.9 : 0})`,
							zIndex: this.state.focus ? 10 : 0
						}}
					/>
					<Image source={require(MAIN_BG)} style={styles.background} />

					<HeaderBar
						menu={true}
						catalog={true}
						cart={this.props.cart}
						title={this.props.search}
						getStyles={this.getStyles}
						navigation={this.props.navigation.dangerouslyGetParent()}
					/>

					<View style={{ flex: 1 }} contentContainerStyle={{ flex: 1 }}>
						{notFound}
						<FlatList
							style={{
								marginLeft: scaleSize(10),
								marginRight: this.state.stylesIndex === 1 ? scaleSize(5) : scaleSize(12),
								zIndex: 2
							}}
							keyExtractor={(item) => item.id}
							onEndReached={() =>
								this.props.fetch
									? false
									: !this.props.end
										? this.setState(
												{
													loading: true,
													page: this.state.page + 10
												},
												() => this.handleEnd()
											)
										: false}
							ListFooterComponent={() =>
								!this.state.end ? <ActivityIndicator size="large" color="#89a6aa" animating /> : false}
							onEndReachedThreshold={0.1}
							initialNumToRender={6}
							removeClippedSubviews={true}
							maxToRenderPerBatch={4}
							windowSize={1}
							data={this.props.searchedProducts}
							extraData={this.props}
							getItemLayout={(data, index) => ({
								length: 100 - 1,
								index
							})}
							renderItem={({ item }) => (
								<ProductItem
									cart={this.props.cart}
									navigation={this.props.navigation}
									categoryId={item.pid}
									item={item}
									categories={categories}
									styleIndex={this.state.stylesIndex}
								/>
							)}
							key={this.state.stylesIndex === 1 ? 'h' : 'v'}
							numColumns={this.state.stylesIndex === 1 ? 2 : 1}
							viewabilityConfig={this.viewabilityConfig}
						/>
					</View>
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
	default: {
		color: '#fff'
	},
	searchInput: {
		fontSize: scaleSize(13)
	}
});

const mapStateToProps = (state) => ({
	cart: state.cart.items,
	focus: state.common.focus,
	search: state.common.search.search,
	id: state.common.search.id,
	end: state.catalog.end,
	searchedProducts: state.catalog.searchedProducts,
	fetch: state.catalog.fetch,
	categories: state.catalog.categories,
	subcategories: state.catalog.subcategories,
	dishes: state.catalog.dishes
});

const mapDispatchToProps = (dispatch) => ({
	clearSearchedProducts: () => dispatch(clearSearchedProducts()),
	getAlphabet: (lang, id) => dispatch(getAlphabet(lang, id)),
	setSearch: (value, categoryId, page) => dispatch(setSearch(value, categoryId, page)),
	searchFocused: () => dispatch(searchFocused()),
	getCart: () => dispatch(getCart())
});

export default connect(mapStateToProps, mapDispatchToProps)(SearchScreen);
