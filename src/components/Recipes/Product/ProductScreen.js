import React, {Component} from 'react';
import {Container, Text, Input, Icon, Button} from 'native-base';
import {
    StyleSheet,
    View,
    ScrollView,
    StatusBar,
    Dimensions,
    ActivityIndicator,
    TouchableOpacity,
    Image, BackHandler
} from 'react-native';
import KawaIcon from '../../KawaIcon';
import StarRating from 'react-native-star-rating';

const styles = StyleSheet.create({
    background: {
        width: "100%",
        height: Dimensions.get("window").height * 1.5,
        position: "absolute",
        top: 0,
        bottom: 0,
        left: 0,
        right: 0
    },
    productImg: {
        width: '100%',
        height: Dimensions.get("window").height * 0.44,
        position: "absolute",
        top: 0,
        bottom: 0,
        left: 0,
        right: 0
    },
    default: {
        color: '#fff'
    },
    horizontal: {
        flexDirection: 'row',
        backgroundColor: '#fff',
        paddingTop: 12
    },
    product: {
        height: '44%',
        justifyContent: 'space-between'
    },
    heartIcon: {
        color: '#fff'
    },
    arrowIcon: {
        color: '#fff'
    },
    icons: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        marginTop: 55,
        marginLeft: 25,
        marginRight: 25
    },
    productInfo: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginLeft: 25,
        marginRight: 20,
        marginBottom: 10,
        alignItems: 'center'
    },
    productName: {
        color: '#f8f8f8',
        fontSize: 27,
        marginBottom: 30
    },
    productQuality: {
        color: '#f8f8f8',
        fontSize: 15
    },
    ingredientsText: {
        color: '#f8f8f8',
        fontSize: 18,
        marginLeft: 25,
        marginTop: 3
    },
    ingredientsMenu: {
      marginTop: 10,
      flexDirection: 'column'
    },
    feedback: {
        backgroundColor: 'rgba(255,255,255, 0.7)',
        borderRadius: 5,
        marginLeft: 15,
        marginRight: 15,
        marginTop: 8
    },
    feedbackTitle: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 7,
        marginLeft: 10,
        marginRight: 10
    },
    feedbackName: {
        color: '#010101',
        fontSize: 17
    },
    feedbackData: {
        color: '#010101',
        fontSize: 17
    },
    feedbackQuiality: {
        marginTop: 5,
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
        marginLeft: 10,
        marginRight: 10
    },
    feedbackComment: {
        marginTop: 10,
        marginBottom: 10,
        marginLeft: 10,
        marginRight: 4
    }
});

StatusBar.setBarStyle('light-content', true);
StatusBar.setBackgroundColor("rgba(0,0,0,0)");
const MAIN_BG = "../../../static/img/background.png";

export default class ProductScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            ingredients: true,
            cooking: false,
            reviews: false,
            starCount: 3.5,
            data: [
                {
                    id: 0,
                    name: 'Венский кофе',
                    ingredients: [{text:'2 порции растворимого какао порошок'},
                                  {text:'3 чашки горячего кофе'},
                                  {text:'1/4 чашки нежирных сливок(до 10%)'},
                                  {text:'3/4 чайной ложки экстракта рома'},
                                  {text:'1/4 чашки взбитых сливок'},
                                  {text:'Молотая корица по желанию'}
                                  ],
                    picture: require('../../../static/img/coffee.png'),
                    cooking: [
                        {text:'1. Смешать какао, кофе, сливки и ромовый экстракт'},
                        {text:'2. Разогреть  до растворения какао'},
                        {text:'3. Разлить в кружки'},
                        {text:'4. Украсить взбитыми сливками и корицей по желанию'}
                    ],
                    number: 27
                }
            ],
            feedback: [
                {
                    id: 0,
                    name: 'Максим',
                    data: '24.05.18',
                    quality: 'отлично',
                    comment: 'В диапазоне этих цен - прекрасный кофе. Целые зерна, средней величины, ' +
                        'приятный аромат при перемалывании и при готовке тоже.'
                },
                {
                    id: 1,
                    name: 'Максим',
                    data: '24.05.18',
                    quality: 'отлично',
                    comment: 'В диапазоне этих цен - прекрасный кофе. Целые зерна, средней величины, ' +
                        'приятный аромат при перемалывании и при готовке тоже.'
                },
                {
                    id: 2,
                    name: 'Максим',
                    data: '24.05.18',
                    quality: 'отлично',
                    comment: 'В диапазоне этих цен - прекрасный кофе. Целые зерна, средней величины, ' +
                        'приятный аромат при перемалывании и при готовке тоже.'
                }
            ],
            ingredientStyle: {
                fontSize: 16,
                paddingRight: 26,
                paddingLeft: 25,
                color: '#6c6962'
            },
            ingredientsPress: {
                fontSize: 16,
                paddingRight: 26,
                paddingLeft: 26,
                color: '#302c23',
                borderBottomColor: '#ea9308',
                borderBottomWidth: 4
            },
            cookingStyle: {
                fontSize: 16,
                paddingRight: 26,
                paddingLeft: 26,
                color: '#6c6962'
            },
            cookingPress: {
                fontSize: 16,
                paddingRight: 26,
                paddingLeft: 26,
                color: '#302c23',
                borderBottomColor: '#ea9308',
                borderBottomWidth: 4
            },
            reviewsStyle: {
                fontSize: 16,
                paddingRight: 25,
                paddingLeft: 26,
                color: '#6c6962'
            },
            reviewsPress: {
                fontSize: 16,
                paddingRight: 25,
                paddingLeft: 26,
                color: '#302c23',
                borderBottomColor: '#ea9308',
                borderBottomWidth: 4
            }
        }
        Input.defaultProps.selectionColor = '#000';
    }

    ingredientsPress(){
        if(this.state.cooking){
            this.setState({cooking:false})
        }
        if(this.state.reviews){
            this.setState({reviews:false})
        }
        this.setState({ingredients: true})
    }

    cookingPress(){
        if(this.state.ingredients){
            this.setState({ingredients:false})
        }
        if(this.state.reviews){
            this.setState({reviews:false})
        }
        this.setState({cooking: true})
    }

    reviewsPress(){
        if(this.state.ingredients){
            this.setState({ingredients:false})
        }
        if(this.state.cooking){
            this.setState({cooking:false})
        }
        this.setState({reviews:true})
    }

    onStarRatingPress(rating) {
        this.setState({
            starCount: rating
        })
    }

    componentDidMount() {
        BackHandler.addEventListener('hardwareBackPress', this.handleBackPress);
    }

    componentWillUnmount() {
        BackHandler.removeEventListener('hardwareBackPress', this.handleBackPress);
    }

    handleBackPress = () => {
        this.props.navigation.navigate('RecipesMainScreen');
        return true;
    }

    render() {
        return (
            <Container style={styles.default}>
                <StatusBar
                    barStyle="light-content"
                    hidden={false}
                    translucent={true}
                />
                <Image source={require(MAIN_BG)} style={styles.background} />
                <View style={styles.product}>
                    <Image source={this.state.data[0].picture}  style={styles.productImg} />
                    <View style={styles.icons}>
                        <Button
                            transparent
                            onPress={() => this.props.navigation.navigate('RecipeRecipeScreen')}>
                            <KawaIcon style={styles.arrowIcon} size={18} name="arrow-back"/>
                        </Button>
                        <Button
                            transparent
                            onPress={() => this.props.navigation.navigate('RecipeFavoriteScreen')}>
                            <KawaIcon style={styles.heartIcon} size={28} name="heart"/>
                        </Button>
                    </View>
                    <View style={styles.productInfo}>
                        <Text style={styles.productName}>
                            {this.state.data[0].name}
                        </Text>

                        <TouchableOpacity onPress={() => this.props.navigation.navigate('RecipeFeedbackScreen')} style={{alignItems: 'flex-end'}}>
                            <StarRating
                                disabled={true}
                                maxStars={5}
                                rating={this.state.starCount}
                                starSize={21}
                                starStyle={{marginRight: 4}}
                                emptyStarColor={'#ffff00'}
                                fullStarColor={'#ffff00'}
                            />
                            <Text style={styles.productQuality}>
                                {this.state.data[0].number} отзывов
                            </Text>
                        </TouchableOpacity>
                    </View>
                </View>
                <View style={{height: 48}}>
                    <ScrollView
                        horizontal={true}
                    >
                        <View style={styles.horizontal}>
                            <Text onPress={()=>this.ingredientsPress()} style={this.state.ingredients?this.state.ingredientsPress:this.state.ingredientStyle}>ИНГРЕДИЕНТЫ</Text>
                            <Text onPress={()=>this.cookingPress()} style={this.state.cooking?this.state.cookingPress:this.state.cookingStyle}>ПРИГОТОВЛЕНИЕ</Text>
                            <Text onPress={()=>this.reviewsPress()} style={this.state.reviews?this.state.reviewsPress:this.state.reviewsStyle}>ОТЗЫВЫ</Text>
                        </View>
                    </ScrollView>
                </View>
                <View>
                    {
                        this.state.ingredients && (<View style={styles.ingredientsMenu}>{this.state.data[0].ingredients.map(data =>
                            <Text style={styles.ingredientsText}> {data.text} </Text>
                        )}</View>)
                    }
                </View>
                <View>
                    {
                        this.state.cooking && (<View style={styles.ingredientsMenu}>{this.state.data[0].cooking.map(data =>
                            <Text style={styles.ingredientsText}> {data.text} </Text>
                        )}</View>)
                    }
                </View>

                <ScrollView>
                    {
                        this.state.reviews && (
                            <ScrollView>
                                {this.state.feedback.map(feedback =>
                                    <View style={styles.feedback}>
                                        <View style={styles.feedbackTitle}>
                                            <Text style={styles.feedbackName}>
                                                {feedback.name}
                                            </Text>

                                            <Text style={styles.feedbackData}>
                                                {feedback.data}
                                            </Text>
                                        </View>

                                        <View style={styles.feedbackQuiality}>
                                            <StarRating
                                                disabled={false}
                                                maxStars={5}
                                                rating={this.state.starCount}
                                                starSize={20}
                                                starStyle={{marginRight: 8}}
                                                emptyStarColor={'#ffff00'}
                                                fullStarColor={'#ffff00'}
                                            />
                                            <Text style={{color: '#302c23' , fontSize: 16}}>
                                                {feedback.quality}
                                            </Text>
                                        </View>

                                        <View style={styles.feedbackComment}>
                                            <Text style={{color: '#302c23' , fontSize: 15, lineHeight: 23}}>
                                                {feedback.comment}
                                            </Text>
                                        </View>
                                    </View>
                                )}
                            </ScrollView>
                        )
                    }
                </ScrollView>
            </Container>
        )
    }
}