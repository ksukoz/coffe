import React, {Component} from 'react';
import {Container, Content, Text, Input, Item, Icon, Button} from 'native-base';
import {
    StyleSheet,
    View,
    ScrollView,
    StatusBar,
    Dimensions,
    Image,
    TouchableOpacity, BackHandler,
    Alert
} from 'react-native';

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
    container: {
        flex: 1
    },
    head: {
        marginTop: 35,
        marginBottom: 15
    },
    default: {
        color: '#fff'
    },
    search: {
        backgroundColor: "#fff",
        marginRight: 15,
        marginLeft: 15,
        height: 40,
        paddingLeft: 5,
        paddingRight: 10
    },
    searchInput: {
        fontSize: 13
    },
    iconMenu: {
        color: '#58554e',
        marginBottom: 5
    },
    recipe: {
        flex: 1,
        backgroundColor: 'rgba(255,255,255, 0.7)',
        marginTop: 10,
        marginLeft: 15,
        marginRight: 15,
        flexDirection: 'row',
        borderRadius: 10,
        alignItems: 'center',
        overflow: 'hidden'
    },
    description: {
        flex: 1,
        marginLeft: 10
    },
    info : {
        fontSize: 15,
        color: '#423d37',
        lineHeight: 23
    },
    title: {
        fontSize: 17,
        color: '#2d261e'
    }
});

StatusBar.setBarStyle('light-content', true);
StatusBar.setBackgroundColor("rgba(0,0,0,0)");
const MAIN_BG = "../../../static/img/background.png";

export default class RecipeScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [
                {
                    id:0,
                    url: 'https://pp.userapi.com/c845417/v845417099/112e9d/AhX_frlAPiE.jpg',
                    title: 'C-52',
                    text: 'Быстрый напиток с моментальным эффектом'
                },
                {
                    id:1,
                    url: 'https://pp.userapi.com/c845417/v845417099/112e9d/AhX_frlAPiE.jpg',
                    title: 'C-52',
                    text: 'Быстрый напиток с моментальным эффектом'
                },
                {
                    id:2,
                    url: 'https://pp.userapi.com/c845417/v845417099/112e9d/AhX_frlAPiE.jpg',
                    title: 'C-52',
                    text: 'Быстрый напиток с моментальным эффектом'
                },
                {
                    id:3,
                    url: 'https://pp.userapi.com/c845417/v845417099/112e9d/AhX_frlAPiE.jpg',
                    title: 'C-52',
                    text: 'Быстрый напиток с моментальным эффектом'
                },
                {
                    id:4,
                    url: 'https://pp.userapi.com/c845417/v845417099/112e9d/AhX_frlAPiE.jpg',
                    title: 'C-52',
                    text: 'Быстрый напиток с моментальным эффектом'
                },
                {
                    id:5,
                    url: 'https://pp.userapi.com/c845417/v845417099/112e9d/AhX_frlAPiE.jpg',
                    title: 'C-52',
                    text: 'Быстрый напиток с моментальным эффектом'
                },
                {
                    id:6,
                    url: 'https://pp.userapi.com/c845417/v845417099/112e9d/AhX_frlAPiE.jpg',
                    title: 'C-52',
                    text: 'Быстрый напиток с моментальным эффектом'
                },
                {
                    id:7,
                    url: 'https://pp.userapi.com/c845417/v845417099/112e9d/AhX_frlAPiE.jpg',
                    title: 'C-52',
                    text: 'Быстрый напиток с моментальным эффектом'
                },
                {
                    id:8,
                    url: 'https://pp.userapi.com/c845417/v845417099/112e9d/AhX_frlAPiE.jpg',
                    title: 'C-52',
                    text: 'Быстрый напиток с моментальным эффектом'
                },
            ]
        }
        Input.defaultProps.selectionColor = '#000';
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
                <ScrollView>
                    <View style={styles.container}>
                        <Content>
                            <View style={styles.head}>
                                <Item style={styles.search} rounded>
                                    <Button
                                        transparent
                                        onPress={() => this.props.navigation.openDrawer()}>
                                        <Icon style={styles.iconMenu} name="ios-menu"/>
                                    </Button>
                                    <Icon style={{color: '#58554e'}} name="ios-search"/>
                                    <Input style={styles.searchInput} placeholderTextColor="#becdcf"
                                           placeholder="Кофе с алкоголем"/>
                                </Item>
                            </View>
                            <View>
                                {this.state.data.map(data =>
                                    <TouchableOpacity onPress={() => this.props.navigation.navigate('RecipeProductScreen')} style={styles.recipe}>
                                        <Image
                                            style={{width: 100, height: 85}}
                                            source={{uri: data.url}}
                                        />

                                        <View style={styles.description}>
                                            <Text style={styles.title}>
                                                {data.title}
                                            </Text>

                                            <Text style={styles.info}>
                                                {data.text}
                                            </Text>
                                        </View>
                                    </TouchableOpacity>
                                )}
                            </View>
                        </Content>
                    </View>
                </ScrollView>
            </Container>
        )
    }
}