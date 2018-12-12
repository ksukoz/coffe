import React, {Component} from 'react';
import {Container, Content, Text, Input, Item, Icon, Button} from 'native-base';
import {
    StyleSheet,
    View,
    ImageBackground,
    ScrollView,
    StatusBar,
    TouchableOpacity,
    Dimensions,
    ActivityIndicator,
    Image,
    AsyncStorage,
    Alert
} from 'react-native';
import KawaIcon from '../../KawaIcon';

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
    cardDouble: {
        flex: 1,
        flexDirection: 'row',
        color: '#fff',
        marginLeft: 10,
        marginRight: 10,
        marginTop: 2,
        borderColor: '#fff',
        shadowColor: '#fff',
        justifyContent: 'center'
    },
    cardDoubleLast: {
        flex: 1,
        flexDirection: 'row',
        color: '#fff',
        marginLeft: 10,
        marginRight: 10,
        marginTop: 5,
        borderColor: '#fff',
        shadowColor: '#fff',
        justifyContent: 'center',
        marginBottom: 20
    },
    cardFull: {
        marginLeft: '2%',
        marginRight: '1.5%',
        width: '96.5%',
        marginTop: 5,
        color: '#fff',
        textAlign: 'center',
        borderColor: '#fff',
        shadowColor: '#fff',
        backgroundColor: 'rgba(255,255,255, 0.2)',
        alignItems: 'center',
        height: Dimensions.get("window").width * 0.3,
        borderRadius: 5,
        justifyContent: "space-around",
        resizeMode: "contain"
    },
    cardItemHalf: {
        width: '50%',
        backgroundColor: 'rgba(255,255,255, 0.2)',
        marginLeft: '1%',
        marginTop: 3,
        alignItems: 'center',
        height: Dimensions.get("window").width * 0.5,
        borderRadius: 5,
        justifyContent: "flex-end",
        resizeMode: "contain",
        paddingBottom: '20%'
    },
    cardItemHalfLast: {
        width: '50%',
        backgroundColor: 'rgba(255,255,255, 0.2)',
        marginRight: '1%',
        marginLeft: '2.5%',
        marginTop: 3,
        alignItems: 'center',
        height: Dimensions.get("window").width * 0.5,
        borderRadius: 5,
        justifyContent: "flex-end",
        resizeMode: "contain",
        paddingBottom: '20%'
    },
    cardItemHalfLastItem: {
        width: '50%',
        backgroundColor: 'rgba(255,255,255, 0.2)',
        marginRight: '1%',
        marginLeft: '2.5%',
        marginTop: 3,
        alignItems: 'center',
        height: Dimensions.get("window").width * 0.5,
        borderRadius: 5,
        justifyContent: "flex-end",
        resizeMode: "contain",
        paddingBottom: '10%'
    },
    cardContent: {
        color: '#fff',
        fontSize: 18,
        paddingLeft: 10,
        paddingRight: 10,
        textAlign: 'center'
    },
    container: {
        flex: 1
    },
    head: {
        marginTop: 35,
        marginBottom: 20
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
        backgroundColor: "#fff",
        marginRight: 15,
        marginLeft:15,
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
    }
});

StatusBar.setBarStyle('light-content', true);
StatusBar.setBackgroundColor("rgba(0,0,0,0)");
const MAIN_BG = "../../../static/img/background.png";

export default class MainScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            alphabet: [],
            english: true,
            loading: true
        }
        Input.defaultProps.selectionColor = '#000';
    }

    componentWillMount() {
        fetch('http://kawaapi.gumione.pro/api/catalog/letters/1')
            .then((response) => response.json())
            .then((responseJson) => {
                this.setState({
                    alphabet: responseJson.letters,
                    loading: false
                }, function(){
                });

            })
            .catch((error) =>{
                console.error(error);
            });
    }

    renderLoadingView() {
        return (
            <View
                style={{
                    width: '100%',
                    flex: 1,
                }}
            >
                <ActivityIndicator
                    color='#1c1c1c'
                    size="small"
                    style={{
                        flex: 1,
                        justifyContent: 'center',
                        alignItems: 'center',
                        height: 80
                    }}
                />
            </View>
        )
    }

    changeAlphabet() {
        if (this.state.english) {
            return fetch('http://kawaapi.gumione.pro/api/catalog/letters/2')
                .then((response) => response.json())
                .then((responseJson) => {
                    this.setState({
                        alphabet: responseJson.letters,
                        english: false
                    }, function(){
                    });

                })
                .catch((error) =>{
                    console.error(error);
                });
        } else {
            return fetch('http://kawaapi.gumione.pro/api/catalog/letters/1')
                .then((response) => response.json())
                .then((responseJson) => {
                    this.setState({
                        alphabet: responseJson.letters,
                        english: true
                    }, function(){
                    });

                })
                .catch((error) =>{
                    console.error(error);
                });
        }
    }

    focus() {
        this.refs._randomName.focus();
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
                <ScrollView>
                    <View style={styles.container}>
                        <Content>
                            <View style={styles.head}>
                                <Item style={{borderBottomWidth: 0, color: '#fff'}}>
                                    <Button
                                        transparent
                                        onPress={() => this.props.navigation.navigate('Home')}>
                                        <KawaIcon style={{color: "#fff", paddingLeft: 18, paddingRight: 20}} name={"arrow-back2"} size={20} />
                                    </Button>
                                    <Text style={{
                                        color: '#ffffff',
                                        fontSize: 20,
                                        fontWeight: 'bold'
                                    }}>Рецепты</Text>
                                </Item>
                            </View>
                            <View style={styles.cardDouble}>
                                <TouchableOpacity onPress={() => this.props.navigation.navigate("RecipeRecipeScreen", {title: 'Горячий кофе'})}
                                                  style={styles.cardItemHalf}>
                                    <View style={{alignItems: 'center'}}>
                                        <KawaIcon style={{color: '#fff', marginBottom: 13}} name={"hot-coffee"} size={88} />
                                        <Text style={styles.cardContent}>Горячий кофе</Text>
                                    </View>
                                </TouchableOpacity>
                                <TouchableOpacity onPress={() => this.props.navigation.navigate("RecipeRecipeScreen", {'title': 'Холодный кофе'})}
                                                  style={styles.cardItemHalfLast}>
                                    <View style={{alignItems: 'center'}}>
                                        <KawaIcon style={{color: '#fff', marginBottom: 13}} name={"cold-coffee"} size={80} />
                                        <Text style={styles.cardContent}>Холодный кофе</Text>
                                    </View>
                                </TouchableOpacity>
                            </View>
                            <View style={styles.cardDoubleLast}>
                                <TouchableOpacity onPress={() => this.props.navigation.navigate("RecipeRecipeScreen", {'title': 'Кофе с алкоголем'})}
                                                  style={{
                                                      width: '50%',
                                                      backgroundColor: 'rgba(255,255,255, 0.2)',
                                                      marginLeft: '1%',
                                                      marginTop: 3,
                                                      alignItems: 'center',
                                                      height: Dimensions.get("window").width * 0.5,
                                                      borderRadius: 5,
                                                      justifyContent: "flex-end",
                                                      resizeMode: "contain",
                                                      paddingBottom: '10%'
                                                  }}>
                                    <KawaIcon style={{color: '#fff', marginBottom: 13, paddingTop: 20}} name={"alcohol-coffee"} size={80} />
                                    <Text style={styles.cardContent}>
                                        Кофе с алкоголем
                                    </Text>
                                </TouchableOpacity>
                                <TouchableOpacity onPress={() => this.props.navigation.navigate("RecipeSearchScreen")}
                                                  style={styles.cardItemHalfLastItem}>
                                    <KawaIcon style={{color: '#fff', marginBottom: 13}} name={"recipes_search"} size={78} />
                                    <Text style={styles.cardContent}>
                                        Готовим по рецепту
                                    </Text>
                                </TouchableOpacity>
                            </View>
                        </Content>
                    </View>
                </ScrollView>
            </Container>
        )
    }
}