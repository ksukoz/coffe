import React, {Component} from 'react';
import {Container, Content, Text, Input, Item, Icon, Button} from 'native-base';
import {
    StyleSheet,
    View,
    ScrollView,
    StatusBar,
    Dimensions,
    Image,
    TouchableOpacity, BackHandler

} from 'react-native';
import KawaIcon from "../../KawaIcon";

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
    searchInput: {
        fontSize: 13
    },
    iconMenu: {
        color: '#fff',
        fontSize: 28,
        marginLeft: 23
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
    },
    favoriteMenu: {
        flexDirection: 'row',
    },
    favorite: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        flex: 1
    },
    favoriteTitle: {
        color: '#fff',
        fontSize: 23,
        marginLeft: 5,
        marginBottom: 3
    },
    viewIcon:{
        color: '#fff',
        marginRight: 23
    },
    recipeP2: {
        width: '48.5%',
        backgroundColor: 'rgba(255,255,255, 0.7)',
        borderRadius: 10,
        marginTop: 10,
        overflow: 'hidden'
    },
    favoriteRecipeP2: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        marginLeft: 10,
        marginRight: 10,
        justifyContent: 'space-between'
    },
    descriptionP2: {
        margin: 7
    },
    titleP2: {
        fontSize: 17,
        color: '#2d261e'
    },
    infoP2: {
        fontSize: 15,
        color: '#423d37',
        lineHeight: 23
    },
    favoriteRecipeP3: {
        marginLeft: 10,
        marginRight: 10,
    },
    recipeP3: {
        flex: 1,
        backgroundColor: 'rgba(255,255,255, 0.7)',
        borderRadius: 10,
        marginTop: 10,
        overflow: 'hidden'
    },
    titleP3: {
        fontSize: 22,
        color: '#2d261e'
    },
    infoP3: {
        fontSize: 19,
        color: '#423d37',
        lineHeight: 23,
        marginTop: 1
    },
    descriptionP3: {
        marginTop: 5,
        marginLeft: 10,
        marginBottom: 10,
        marginRight: 10
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
                }
            ],
            position: 0
        }
        Input.defaultProps.selectionColor = '#000';
    }

    changePosition(){
        let positionChange = this.state.position
        positionChange++
        this.setState({position: positionChange})
        if(this.state.position === 2){
            this.setState({position: 0})
        }
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
                                <View style={styles.favoriteMenu}>
                                    <Button
                                        transparent
                                        onPress={() => this.props.navigation.openDrawer()}>
                                        <Icon style={styles.iconMenu} name="ios-menu"/>
                                    </Button>
                                    <View style={styles.favorite}>
                                        <Text style={styles.favoriteTitle}>Любимые рецепты</Text>
                                        {(this.state.position === 0)&& <KawaIcon onPress={() => this.changePosition()} style={styles.viewIcon} size={25} name="view-1"/>}
                                        {(this.state.position === 1)&& <KawaIcon onPress={() => this.changePosition()} style={styles.viewIcon} size={25} name="view-2"/>}
                                        {(this.state.position === 2)&& <KawaIcon onPress={() => this.changePosition()} style={styles.viewIcon} size={25} name="view"/>}
                                    </View>

                                </View>
                            </View>
                            <View>
                                {(this.state.position === 0)&&this.state.data.map(data =>
                                    <TouchableOpacity onPress={() => this.props.navigation.navigate('RecipeProductScreen')}
                                                      style={styles.recipe} key={data.id}>
                                        <Image
                                            style={{width: 100, height: 80}}
                                            source={{uri: data.url}}
                                            key={data.id}
                                        />

                                        <View key={data.id} style={styles.description}>
                                            <Text key={data.id} style={styles.title}>
                                                {data.title}
                                            </Text>

                                            <Text key={data.id} style={styles.info}>
                                                {data.text}
                                            </Text>
                                        </View>
                                    </TouchableOpacity>
                                )}
                            </View>
                            <View style={styles.favoriteRecipeP2}>
                                {(this.state.position === 1)&&this.state.data.map(data =>
                                    <TouchableOpacity onPress={() => this.props.navigation.navigate('RecipeProductScreen')}
                                                      style={styles.recipeP2} key={data.id}>
                                        <Image
                                            style={{flex: 1, height: 135}}
                                            source={{uri: data.url}}
                                            key={data.id}
                                        />

                                        <View key={data.id} style={styles.descriptionP2}>
                                            <Text key={data.id} style={styles.titleP2}>
                                                {data.title}
                                            </Text>

                                            <Text key={data.id} style={styles.infoP2}>
                                                {data.text}
                                            </Text>
                                        </View>
                                    </TouchableOpacity>
                                )}
                            </View>
                            <View style={styles.favoriteRecipeP3}>
                                {(this.state.position === 2)&&this.state.data.map(data =>
                                    <TouchableOpacity onPress={() => this.props.navigation.navigate('RecipeProductScreen')}
                                                      style={styles.recipeP3} key={data.id}>
                                        <Image
                                            style={{flex: 1, height: 235}}
                                            source={{uri: data.url}}
                                            key={data.id}
                                        />

                                        <View key={data.id} style={styles.descriptionP3}>
                                            <Text key={data.id} style={styles.titleP3}>
                                                {data.title}
                                            </Text>

                                            <Text key={data.id} style={styles.infoP3}>
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