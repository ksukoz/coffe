import React, {Component} from 'react';
import {Container, Text, Input, Button} from 'native-base';
import {
    StyleSheet,
    View,
    ScrollView,
    StatusBar,
    Dimensions,
    TextInput,
    TouchableOpacity,
    ActivityIndicator,
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
    default: {
        color: '#fff'
    },
    feedback: {
        backgroundColor: 'rgba(255,255,255, 0.7)',
        borderRadius: 5,
        marginLeft: 10,
        marginRight: 10,
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
    },
    title: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 45,
        marginLeft: 25,
        marginBottom: 23
    },
    titleText: {
        marginLeft: 25,
        color: '#fff',
        fontSize: 23,
        marginBottom: 2
    },
    productName: {
        fontSize: 21,
        marginTop: 10,
        marginLeft: 15
    },
    rate: {
        fontSize: 17,
        marginTop: 16,
        marginBottom: 16
    },
    btn: {
        marginRight: 10,
        marginLeft: 10,
        marginBottom: 35,
        marginTop: 5,
        backgroundColor: '#ea9308',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 2
    },
    btnText: {
        color: '#fff',
        fontWeight: 'bold',
        paddingTop: 7,
        paddingBottom: 9
    }
});

StatusBar.setBarStyle('light-content', true);
StatusBar.setBackgroundColor("rgba(0,0,0,0)");
const MAIN_BG = "../../../static/img/background.png";

export default class ProductScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            starCount: 0,
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
            ]
        }
        Input.defaultProps.selectionColor = '#000';
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
                <ScrollView style={{marginBottom: 20}}>
                    <View style={styles.title}>
                        <Button
                            transparent
                            onPress={() => this.props.navigation.navigate('Home')}>
                            <KawaIcon style={{color: "#fff", paddingRight: 20}} name={"arrow-back2"} size={18} />
                        </Button>
                        <Text style={{
                            color: '#ffffff',
                            fontSize: 20,
                            fontWeight: 'bold'
                        }}>Оставить отзыв</Text>
                    </View>
                    <View style={styles.feedback}>
                        <Text style={styles.productName}>
                            C-52
                        </Text>
                        <View style={{alignItems:'center', justifyContent:'center'}}>
                            <Text style={styles.rate}>
                                Уже пробовали? Оцените
                            </Text>
                        </View>
                        <View style={{alignItems: 'center', paddingLeft: 20, paddingRight: 20}}>
                            <StarRating
                                disabled={false}
                                maxStars={5}
                                rating={this.state.starCount}
                                selectedStar={(rating) => this.onStarRatingPress(rating)}
                                starSize={42}
                                starStyle={{marginLeft: 15, marginRight: 15, marginBottom: 15}}
                                emptyStarColor={'#ffff00'}
                                fullStarColor={'#ffff00'}
                            />
                        </View>
                    </View>

                    <View style={{marginRight: 10, marginLeft: 10, marginBottom: 30, marginTop: 20}}>
                        <TextInput
                            multiline = {true}
                            numberOfLines = {1}
                            editable = {true}
                            placeholder={'Оставить отзыв'}
                            placeholderTextColor={'#fff'}
                            maxLength = {300}
                            style={{ fontSize: 17 , color:'#fff', padding: 10}}
                        />
                        <View style={{height: 1, backgroundColor: '#fff', marginLeft: 7, marginRight: 7}}/>
                    </View>

                    <TouchableOpacity onPress={() => this.props.navigation.navigate('RecipeProductScreen')} style={styles.btn}>
                        <Text style={styles.btnText}>ОТПРАВИТЬ</Text>
                    </TouchableOpacity>
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
                                    disabled={true}
                                    maxStars={5}
                                    rating={3}
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
            </Container>
        )
    }
}