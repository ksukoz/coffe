import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { View, TouchableOpacity, Image, StyleSheet } from 'react-native';
import { Text } from 'native-base';
import KawaIcon from '../KawaIcon';
import StarRating from 'react-native-star-rating';

import { scaleSize } from '../../helpers/scaleSize';

import { updateCart, addToCart } from '../../store/actions/cartActions';
import { getProductID } from '../../store/actions/catalogActions';

class ProductItem extends PureComponent {
	constructor(props) {
		super(props);
		this.state = {
			search: '',
			index: 0,
			styles: [ styles.product, styles.productCard, styles.productItem ],
			cart: false
		};
	}

	render() {
		const { item, categoryId, styleIndex, cart } = this.props;

		const filteredCart = cart ? cart.filter((cartItem) => cartItem.id === item.id) : [];

		return (
			<TouchableOpacity
				activeOpacity={0.9}
				onPress={() => {
					this.props.navigation.push('ProductCard', {
						id: item.id,
						search: this.props.navigation.getParam('search', ''),
						searchPlaceholder:
							this.props.categories.filter((category) => category.id === item.pid).length > 0
								? this.props.categories.filter((category) => category.id === item.pid)[0].name
								: '',
						categoryId
					});
				}}
				style={this.state.styles[styleIndex]}
			>
				<View style={{ position: 'relative' }}>
					{item.new == 1 && Date.now() <= +`${item.new_date}000` ? (
						<View style={styles.imgHit}>
							<Text style={styles.imgLabel}>{'Новинка'.toUpperCase()}</Text>
						</View>
					) : item.popular == 1 ? (
						<View style={styles.imgHit}>
							<Text style={styles.imgLabel}>{'Хит'.toUpperCase()}</Text>
						</View>
					) : null}

					<Image
						resizeMethod="resize"
						source={{ uri: 'http://kawa.gumione.pro' + item.file }}
						style={
							styleIndex === 1 ? (
								[ styles.productImg, { width: scaleSize(80), height: scaleSize(113) } ]
							) : styleIndex === 2 ? (
								[ styles.productImg, { width: scaleSize(90), height: scaleSize(180) } ]
							) : (
								[ styles.productImg, { width: scaleSize(70), height: scaleSize(100) } ]
							)
						}
					/>
				</View>

				<View
					style={
						styleIndex === 1 ? (
							{
								flex: 1,
								padding: scaleSize(6),
								justifyContent: 'flex-end'
							}
						) : (
							{ flex: 1 }
						)
					}
				>
					<View
						style={
							styleIndex === 1 ? (
								{
									flex: 1,
									alignSelf: 'flex-start'
								}
							) : (
								''
							)
						}
					>
						<Text
							style={
								styleIndex === 1 ? (
									[ styles.productName, { fontSize: scaleSize(11) } ]
								) : styleIndex === 2 ? (
									[ styles.productName, { fontSize: scaleSize(19) } ]
								) : (
									[ styles.productName, { fontSize: scaleSize(15) } ]
								)
							}
						>
							{item.name}
						</Text>
						<Text
							style={
								styleIndex === 1 ? (
									[ styles.productSort, { fontSize: scaleSize(11) } ]
								) : styleIndex === 2 ? (
									[ styles.productSort, { fontSize: scaleSize(16) } ]
								) : (
									[ styles.productSort, { fontSize: scaleSize(13) } ]
								)
							}
						>
							{this.props.categories.filter((category) => category.id === item.pid).length > 0 ? (
								this.props.categories.filter((category) => category.id === item.pid)[0].name
							) : (
								''
							)}
							{item.pid > 7 ? (
								''
							) : (
								`, ${item.sort_human} ${item.arabic_percent ? item.arabic_percent + '%' : ''}`
							)}
						</Text>
						<Text
							style={
								styleIndex === 1 ? (
									[ styles.productRoast, { fontSize: scaleSize(11) } ]
								) : styleIndex === 2 ? (
									[ styles.productRoast, { fontSize: scaleSize(16) } ]
								) : (
									[ styles.productRoast, { fontSize: scaleSize(13) } ]
								)
							}
						>
							{item.pid > 7 ? '' : `Обжарка ${item.roast_human}`}
						</Text>
					</View>

					<View
						style={{
							flexDirection: 'row',
							marginTop: styleIndex === 1 ? scaleSize(10) : scaleSize(-8)
						}}
					>
						<View
							style={{
								borderBottomWidth: 1,
								borderColor: '#89a6aa',

								flex: 1,
								marginBottom: styleIndex === 1 ? 0 : scaleSize(5.5),
								marginRight: styleIndex === 1 ? scaleSize(0) : scaleSize(7),
								marginLeft:
									styleIndex === 1 ? scaleSize(0) : styleIndex === 2 ? scaleSize(-10) : scaleSize(1)
							}}
						/>
						{styleIndex !== 1 ? (
							<Text
								style={{
									color: '#010101',
									fontSize: styleIndex === 2 ? scaleSize(27) : scaleSize(20),
									fontWeight: '300'
								}}
							>
								{(+item.price).toFixed()} грн
							</Text>
						) : null}
					</View>

					<View
						style={{
							flexDirection: 'row',
							justifyContent: 'space-between',
							alignItems: 'center',
							flexWrap: 'nowrap',
							marginTop: styleIndex === 1 ? scaleSize(3) : 0
						}}
					>
						<TouchableOpacity
							style={{ marginBottom: styleIndex === 1 ? scaleSize(7) : 0 }}
							onPress={() =>
								this.props.navigation.push('ProductCard', {
									id: item.id,
									categoryName: this.props.navigation.getParam('categoryName', '0'),
									tab: 2
								})}
						>
							<View
								style={{
									flexDirection: 'row',
									alignItems: 'center',
									marginTop: styleIndex === 1 ? scaleSize(5) : 0
								}}
							>
								{styleIndex === 2 ? (
									<View
										style={{
											flexDirection: 'row',
											alignItems: 'center',
											marginBottom: scaleSize(5)
										}}
									>
										<StarRating
											disabled={true}
											maxStars={5}
											rating={item.avg_rating}
											starSize={scaleSize(23)}
											starStyle={{ marginRight: scaleSize(2) }}
											emptyStarColor={'#ffea00'}
											fullStarColor={'#ffea00'}
										/>
									</View>
								) : (
									<KawaIcon
										style={styles.starIcon}
										size={styleIndex === 1 ? scaleSize(11) : scaleSize(16)}
										name="small-star-in-catalog"
									/>
								)}
								<Text
									style={
										styleIndex === 1 ? (
											[ styles.productRating, { fontSize: scaleSize(9) } ]
										) : (
											styles.productRating
										)
									}
								>
									{styleIndex === 2 ? (
										''
									) : item.avg_rating > 0 ? (
										(+item.avg_rating).toFixed(1)
									) : (
										item.avg_rating
									)}
								</Text>
							</View>
							<Text
								style={
									styleIndex === 1 ? (
										[ styles.numberOfReviews, { fontSize: scaleSize(9), marginTop: 1 } ]
									) : (
										styles.numberOfReviews
									)
								}
							>
								Отзывов {item.comments}
							</Text>
						</TouchableOpacity>
						<View
							style={{
								alignSelf: 'center',
								marginLeft: scaleSize(-4)
							}}
						>
							<TouchableOpacity
								style={
									styleIndex === 2 ? (
										{
											position: 'relative',
											padding: scaleSize(10),
											paddingBottom: 0,
											paddingTop: 0
										}
									) : (
										{ position: 'relative', padding: scaleSize(10) }
									)
								}
								activeOpacity={0.9}
								onLongPress={() => this.props.navigation.push('Cart')}
								onPress={() =>
									filteredCart.length > 0
										? this.props.updateCart(item.id, 0)
										: this.props.addToCart(item.id)}
							>
								<KawaIcon
									style={
										styleIndex === 1 ? (
											[ styles.cartIcon, { marginLeft: scaleSize(10) } ]
										) : (
											styles.cartIcon
										)
									}
									size={styleIndex === 2 ? scaleSize(30) : scaleSize(20)}
									name={
										filteredCart.length > 0 ? (
											'small-cart-in-catalog-with-buy'
										) : (
											'big-cart-in-catalog'
										)
									}
								/>
								<View
									style={{
										opacity: filteredCart.length > 0 ? 1 : 0,
										position: 'absolute',
										bottom: scaleSize(styleIndex === 2 ? 0 : 10),
										right: scaleSize(10),
										borderRadius: scaleSize(styleIndex === 2 ? 7.5 : 5),
										backgroundColor: '#ef5350',

										alignContent: 'center',
										alignItems: 'center',
										justifyContent: 'center',
										width: scaleSize(styleIndex === 2 ? 15 : 10),
										height: scaleSize(styleIndex === 2 ? 15 : 10)
									}}
								>
									<Text
										style={{
											fontSize: scaleSize(styleIndex === 2 ? 10 : 7),
											textAlign: 'center',
											textAlignVertical: 'center',
											color: '#fff'
										}}
									>
										{filteredCart.length > 0 ? 1 : ''}
									</Text>
								</View>
							</TouchableOpacity>
						</View>
						{styleIndex === 1 ? (
							<Text
								style={{
									color: '#010101',
									fontSize: scaleSize(16),
									fontWeight: '300'
								}}
							>
								{(+item.price).toFixed()} грн
							</Text>
						) : null}
						<TouchableOpacity
							onPress={() => {
								filteredCart.length > 0 ? '' : this.props.addToCart(item.id);
								this.props.navigation.push('OrderSingle', {
									itemId: item.id
								});
							}}
							style={
								styleIndex === 1 ? (
									{ display: 'none' }
								) : styleIndex === 2 ? (
									[
										styles.btn,
										{
											paddingTop: scaleSize(6),
											paddingBottom: scaleSize(6),
											marginTop: scaleSize(1)
										}
									]
								) : (
									[ styles.btn ]
								)
							}
							activeOpacity={0.9}
						>
							<Text
								style={
									styleIndex === 1 ? [ styles.btnText, { textAlign: 'center' } ] : [ styles.btnText ]
								}
							>
								КУПИТЬ СЕЙЧАС
							</Text>
						</TouchableOpacity>
					</View>
					<TouchableOpacity
						onPress={() => {
							filteredCart.length > 0 ? '' : this.props.addToCart(item.id);
							this.props.navigation.push('OrderSingle', {
								itemId: item.id
							});
						}}
						style={
							styleIndex === 1 ? (
								[
									styles.btn,
									{
										width: '100%',
										paddingTop: scaleSize(2),
										paddingBottom: scaleSize(2),
										marginTop: scaleSize(1)
									}
								]
							) : (
								{ display: 'none' }
							)
						}
						activeOpacity={0.9}
					>
						<Text
							style={
								styleIndex === 1 ? (
									[ styles.btnText, { textAlign: 'center', fontSize: scaleSize(14) } ]
								) : (
									[ styles.btnText ]
								)
							}
						>
							КУПИТЬ СЕЙЧАС
						</Text>
					</TouchableOpacity>
				</View>
			</TouchableOpacity>
		);
	}
}

const styles = StyleSheet.create({
	product: {
		backgroundColor: 'rgba(255,255,255, 0.7)',
		marginBottom: scaleSize(7),
		flexDirection: 'row',
		paddingTop: scaleSize(6),
		paddingBottom: scaleSize(6),
		paddingRight: scaleSize(10),
		borderRadius: scaleSize(8)
	},
	productItem: {
		backgroundColor: 'rgba(255,255,255, 0.7)',
		marginBottom: scaleSize(7),
		flexDirection: 'column',
		paddingTop: scaleSize(6),
		paddingBottom: scaleSize(6),
		paddingRight: scaleSize(10),
		paddingLeft: scaleSize(10),
		borderRadius: scaleSize(8)
	},

	productCard: {
		width: '48%',
		backgroundColor: 'rgba(255,255,255, 0.7)',
		justifyContent: 'space-between',
		marginRight: scaleSize(2),
		marginLeft: scaleSize(2),
		marginBottom: scaleSize(7),
		paddingTop: scaleSize(6),
		borderRadius: scaleSize(8)
	},
	productImg: {
		alignSelf: 'center',
		height: scaleSize(120),
		marginRight: scaleSize(12),
		marginLeft: scaleSize(12),
		marginTop: scaleSize(4)
	},
	imgHit: {
		position: 'absolute',
		top: scaleSize(-2),
		left: scaleSize(5),
		backgroundColor: '#ef5350',
		zIndex: 2,
		alignItems: 'center',
		justifyContent: 'center',
		height: scaleSize(17),
		borderTopLeftRadius: scaleSize(10),
		borderBottomRightRadius: scaleSize(10)
	},
	imgLabel: {
		fontSize: scaleSize(10),
		paddingLeft: scaleSize(10),
		paddingRight: scaleSize(10),
		paddingTop: scaleSize(5),
		paddingBottom: scaleSize(5),
		color: '#fff'
	},
	productSort: {
		color: '#48433b',
		marginBottom: 1
	},
	productRoast: {
		color: '#48433b'
	},
	productName: {
		marginBottom: scaleSize(3),
		color: '#010101'
	},
	starIcon: {
		color: '#ffea00',
		marginRight: scaleSize(5)
	},
	productRating: {
		color: '#48433b',
		fontSize: scaleSize(13)
	},
	numberOfReviews: {
		color: '#48433b',
		fontSize: scaleSize(13),
		marginTop: scaleSize(-2)
	},
	cartIcon: {
		color: '#48433b'
	},
	btn: {
		backgroundColor: '#ea9308',
		borderRadius: scaleSize(3)
	},
	btnText: {
		fontSize: scaleSize(12),
		color: '#f8f8f8',
		paddingTop: scaleSize(5),
		paddingBottom: scaleSize(5),
		paddingRight: scaleSize(7),
		paddingLeft: scaleSize(7),
		fontWeight: '300'
	}
});

const mapDispatchToProps = (dispatch) => ({
	updateCart: (id, quantity) => dispatch(updateCart(id, quantity)),
	addToCart: (id) => dispatch(addToCart(id)),
	getProductID: (id) => dispatch(getProductID(id))
});

export default connect(null, mapDispatchToProps)(ProductItem);
