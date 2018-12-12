import React, {Component} from 'react';
import {Container, Content, Text, Input, Item, Icon, Button, Accordion, List, ListItem} from 'native-base';
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
    Alert, BackHandler
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
    cardThird: {
        flex: 1,
        flexDirection: 'row',
        color: '#fff',
        marginTop: 2,
        borderColor: '#fff',
        shadowColor: '#fff',
        justifyContent: 'flex-start'
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
        width: '31.3%',
        backgroundColor: 'rgba(255,255,255, 0.2)',
        marginLeft: '2%',
        marginTop: 3,
        alignItems: 'center',
        height: Dimensions.get("window").width * 0.33 - Dimensions.get("window").width * 0.04,
        borderRadius: 10,
        justifyContent: "flex-end",
        resizeMode: "contain",
        paddingBottom: '10%'
    },
    cardItemHalfFirst: {
        width: '31.3%',
        backgroundColor: 'rgba(255,255,255, 0.2)',
        marginLeft: 0,
        marginTop: 3,
        alignItems: 'center',
        height: Dimensions.get("window").width * 0.33 - Dimensions.get("window").width * 0.04,
        borderRadius: 10,
        justifyContent: "flex-end",
        resizeMode: "contain",
        paddingBottom: '10%'
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
    container: {
        flex: 1,
        width: Dimensions.get("window").width
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
    },
    iconTypeWhite: {
        color: '#fff'
    },
    iconTypeOrange: {
        color: '#ea9308'
    },
    typeIcon: {
        color: "#000"
    },
    rabustaIconWhite: {
        color: '#fff',
        fontSize: 45,
        marginLeft: 13,
        alignItems: 'center',
        justifyContent: "space-around"
    },
    rabustaIconOrange: {
        color: '#ea9308',
        fontSize: 45,
        marginLeft: 13,
        alignItems: 'center',
        justifyContent: "space-around"
    },
    arabicaIconWhite: {
        color: '#fff',
        fontSize: 45,
        marginLeft: 13,
        alignItems: 'center',
        justifyContent: "space-around"
    },
    arabicaIconOrange: {
        color: '#ea9308',
        fontSize: 45,
        marginLeft: 13,
        alignItems: 'center',
        justifyContent: "space-around"
    },
    arabicaTextWhite: {
        color: '#fff',
        justifyContent: 'space-around',
        height:'100%',
        marginLeft: 6,
        paddingTop: 13
    },
    arabicaTextOrange: {
        color: '#ea9308',
        justifyContent: 'space-around',
        height:'100%',
        marginLeft: 6,
        paddingTop: 13
    },
    rabustaTextWhite: {
        color: '#fff',
        justifyContent: 'space-around',
        height:'100%',
        marginLeft: 6,
        paddingTop: 13
    },
    rabustaTextOrange: {
        color: '#ea9308',
        justifyContent: 'space-around',
        height:'100%',
        marginLeft: 6,
        paddingTop: 13
    },
});

StatusBar.setBarStyle('light-content', true);
StatusBar.setBackgroundColor("rgba(0,0,0,0)");
const MAIN_BG = "../../../static/img/background.png";
let state;
let self;

export default class RecipeSearchScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            checked: {
                1: false, 2: false, 3: false, 4: false, 5: false, 6: false, 7: false, 8: false,
                9: false, 10: false, 11: false, 12: false, 13: false, 14: false, 15: false,
                16: false, 17: false, 18: false, 19: false, 20: false, 21: false, 22: false,
                23: false, 24: false, 25: false, 26: false, 27: false, 28: false, 29: false, 30: false,
                31: false, 32: false, 33: false, 34: false, 35: false, 36: false, 37: false,
                38: false, 39: false, 40: false, 41: false, 42: false, 43: false, 44: false,
                45: false, 46: false, 47: false, 48: false, 49: false, 50: false, 51: false, 52: false,
                53: false, 54: false, 55: false, 56: false, 57: false
            },
            info: [
                {name: 'Специи и пряности', 'content': [
                    [
                        {id: 1, name: 'Ваниль', icon: 'vanilla', class: styles.cardItemHalfFirst},
                        {id: 2, name: 'Гвоздика', icon: 'carnation', class: styles.cardItemHalf},
                        {id: 3, name: 'Имбирь', icon: 'ginger', class: styles.cardItemHalf}
                    ], [
                        {id: 4, name: 'Какао', icon: 'cocoa', class: styles.cardItemHalfFirst},
                        {id: 5, name: 'Кардамон', icon: 'cardamom', class: styles.cardItemHalf},
                        {id: 6, name: 'Корица', icon: 'cinnamon', class: styles.cardItemHalf}
                    ], [
                        {id: 7, name: 'Кр. перец', icon: 'red-pepper', class: styles.cardItemHalfFirst},
                        {id: 8, name: 'Лаванда', icon: 'lavender', class: styles.cardItemHalf},
                        {id: 9, name: 'Миндаль', icon: 'almond', class: styles.cardItemHalf}
                    ], [
                        {id: 10, name: 'Мускат', icon: 'nutmeg', class: styles.cardItemHalfFirst},
                        {id: 11, name: 'Мята', icon: 'mint1', class: styles.cardItemHalf},
                        {id: 12, name: 'Сахар', icon: 'sugar', class: styles.cardItemHalf}
                    ], [
                        {id: 13, name: 'Соль', icon: 'salt', class: styles.cardItemHalfFirst},
                        {id: 14, name: 'Цедра', icon: 'zest', class: styles.cardItemHalf},
                        {id: 15, name: 'Чр. перец', icon: 'black-pepper', class: styles.cardItemHalf}
                    ]
                ]},
                {name: 'Фрукты, ягоды', 'content': [
                    [
                        {id: 16, name: 'Апельсин', icon: 'orange2', class: styles.cardItemHalfFirst},
                        {id: 17, name: 'Банан', icon: 'banana', class: styles.cardItemHalf},
                        {id: 18, name: 'Вишня', icon: 'cherry1', class: styles.cardItemHalf}
                    ], [
                        {id: 19, name: 'Клубника', icon: 'strawberry', class: styles.cardItemHalfFirst},
                        {id: 20, name: 'Лимон', icon: 'lemon', class: styles.cardItemHalf},
                        {id: 21, name: 'Малина', icon: 'raspberry', class: styles.cardItemHalf}
                    ], [
                        {id: 22, name: 'Миндаль', icon: 'almond1', class: styles.cardItemHalfFirst},
                        {id: 23, name: 'Персик', icon: 'peach', class: styles.cardItemHalf},
                        {id: 24, name: 'Финики', icon: 'dates', class: styles.cardItemHalf}
                    ], [
                        {id: 25, name: 'Фундук', icon: 'hazelnut', class: styles.cardItemHalfFirst}
                    ]
                ]},
                {name: 'Соки и напитки', 'content': [
                    [
                        {id: 26, name: 'Ананасовый', icon: 'pineapple', class: styles.cardItemHalfFirst},
                        {id: 27, name: 'Апельсиновый', icon: 'orange1', class: styles.cardItemHalf},
                        {id: 28, name: 'Вишневый', icon: 'cherry', class: styles.cardItemHalf}
                    ], [
                        {id: 29, name: 'Гранатовый', icon: 'pomegranate', class: styles.cardItemHalfFirst},
                        {id: 30, name: 'Кока-Кола', icon: 'cola', class: styles.cardItemHalf},
                        {id: 31, name: 'Лёд', icon: 'ice', class: styles.cardItemHalf}
                    ], [
                        {id: 32, name: 'Морковный', icon: 'carrot', class: styles.cardItemHalfFirst},
                        {id: 33, name: 'Тоник', icon: 'tonic', class: styles.cardItemHalf}
                    ]
                ]},
                {name: 'Молочные продукты', 'content': [
                    [
                        {id: 34, name: 'Взбитые сливки', icon: 'cream', class: styles.cardItemHalfFirst},
                        {id: 35, name: 'Йогурт', icon: 'yogurt', class: styles.cardItemHalf},
                        {id: 36, name: 'Молоко, сливки', icon: 'milk-cream', class: styles.cardItemHalf}
                    ], [
                        {id: 37, name: 'Мороженое', icon: 'ice-cream', class: styles.cardItemHalfFirst},
                        {id: 38, name: 'Сгущенное молоко', icon: 'condensed-milk', class: styles.cardItemHalf},
                        {id: 39, name: 'Шоколад', icon: 'chocolate1', class: styles.cardItemHalf}
                    ]
                ]},
                {name: 'Сиропы', 'content': [
                    [
                        {id: 40, name: 'Апельсиновый', icon: 'orange', class: styles.cardItemHalfFirst},
                        {id: 41, name: 'Горячий шоколад', icon: 'hot-chocolate', class: styles.cardItemHalf},
                        {id: 42, name: 'Карамельный', icon: 'caramel', class: styles.cardItemHalf}
                    ], [
                        {id: 43, name: 'Кокосовый', icon: 'coconut', class: styles.cardItemHalfFirst},
                        {id: 44, name: 'Мёд', icon: 'honey', class: styles.cardItemHalf},
                        {id: 45, name: 'Мятный', icon: 'mint', class: styles.cardItemHalf}
                    ], [
                        {id: 46, name: 'Сливочный', icon: 'creamy', class: styles.cardItemHalfFirst},
                        {id: 47, name: 'Шоколадный', icon: 'chocolate', class: styles.cardItemHalf}
                    ]
                ]},
                {name: 'Алкоголь', 'content': [
                    [
                        {id: 48, name: 'Амаретто', icon: 'amaretto', class: styles.cardItemHalfFirst},
                        {id: 49, name: 'Вино', icon: 'wine', class: styles.cardItemHalf},
                        {id: 50, name: 'Виски', icon: 'whiskey', class: styles.cardItemHalf}
                    ], [
                        {id: 51, name: 'Водка', icon: 'vodka', class: styles.cardItemHalfFirst},
                        {id: 52, name: 'Коньяк', icon: 'cognac', class: styles.cardItemHalf},
                        {id: 53, name: 'Пиво', icon: 'beer', class: styles.cardItemHalf}
                    ], [
                        {id: 54, name: 'Ром', icon: 'rum', class: styles.cardItemHalfFirst},
                        {id: 55, name: 'Самбука', icon: 'sambuca', class: styles.cardItemHalf},
                        {id: 56, name: 'Текила', icon: 'tequila', class: styles.cardItemHalf}
                    ], [
                        {id: 57, name: 'Шампанское', icon: 'champagne', class: styles.cardItemHalfFirst}
                    ]
                ]},
            ],
            english: true,
            loading: true,
            coffeeIcons: [
                {
                    class: styles.iconTypeWhite
                },
                {
                    class: styles.iconTypeWhite
                },
                {
                    class: styles.iconTypeWhite
                },
                {
                    class: styles.iconTypeWhite
                },
                {
                    class: styles.iconTypeWhite
                },
                {
                    class: styles.iconTypeWhite
                }
            ],
            arabica: styles.arabicaIconWhite,
            rabusta: styles.rabustaIconWhite,
            arabicaText: styles.arabicaTextWhite,
            rabustaText: styles.rabustaTextWhite
        }
        Input.defaultProps.selectionColor = '#000';
        state = this.state;
        self = this;
    }

    setTypeColor(index) {
        let iconStyles = this.state.coffeeIcons[index];
        let icons = this.state.coffeeIcons;
        if (iconStyles.class == styles.iconTypeWhite) {
            icons[index] = { class: styles.iconTypeOrange }
        } else {
            icons[index] = { class : styles.iconTypeWhite }
        }
        this.setState({
            coffeeIcons: icons
        })
    }

    setChecked(index) {
        let checked = this.state.checked;
        checked[index] = !checked[index];
        this.setState({
            checked: checked
        });
    }

    setCoreColor(type) {
        if (type == 'rabusta') {
            if (this.state.rabusta == styles.rabustaIconWhite) {
                this.setState({
                    rabusta: styles.rabustaIconOrange,
                    rabustaText: styles.rabustaTextOrange
                })
            } else {
                this.setState({
                    rabusta: styles.rabustaIconWhite,
                    rabustaText: styles.rabustaTextWhite
                })
            }
        } else if (type == 'arabica') {
            if (this.state.arabica == styles.arabicaIconWhite) {
                this.setState({
                    arabica: styles.arabicaIconOrange,
                    arabicaText: styles.arabicaTextOrange
                })
            } else {
                this.setState({
                    arabica: styles.arabicaIconWhite,
                    arabicaText: styles.arabicaTextWhite
                })
            }
        }
    }

    _renderHeader(item, expanded) {
        return (
            <View
                style={{  borderRadius: 5, borderBottomEndRadius: 5, borderBottomStartRadius: 5,
                    backgroundColor: 'rgba(255,255,255, 0.7)', flexDirection: "row", padding: 10,
                    justifyContent: "space-between", alignItems: "center", marginTop: 10 }}
            >
                <Text style={{ fontSize: 14, paddingLeft: 10 }}>{item.name}</Text>
                {expanded
                    ? <KawaIcon style={styles.arrowIcon} size={8} name="arrow-down"/>
                    : <KawaIcon style={styles.arrowIcon} size={14} name="arrow-next"/>}
            </View>
        );
    }

    _renderContent(item) {
        return (
            <View>
                {item.content.map((subitem)=>{
                    return <View style={styles.cardThird}>
                        {subitem.map((child)=> {
                            return <TouchableOpacity
                                        activeOpacity = { 1 }
                                        onPress={() => self.setChecked(child.id)}
                                              style={child.class}>
                                <KawaIcon style={{color: (state.checked[child.id] ? "#ea9308" : "#fff"), paddingLeft: 18, paddingRight: 20, paddingBottom: 10}}
                                          name={child.icon} size={48}/>
                                <Text style={{
                                    color: (state.checked[child.id] ? "#ea9308" : "#fff"),
                                    fontSize: 14,
                                    paddingLeft: 5,
                                    paddingRight: 5,
                                    textAlign: 'center'
                                }}>
                                    {child.name}
                                </Text>
                            </TouchableOpacity>
                        })}
                    </View>
                })}
            </View>
        );
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
                <ScrollView pagingEnabled = { true } horizontal = { true }>
                    <View style={styles.container}>
                        <Content>
                            <View style={styles.head}>
                                <Item style={{borderBottomWidth: 0, color: '#fff'}}>
                                    <Button
                                        transparent
                                        onPress={() => this.props.navigation.navigate('RecipesMainScreen')}>
                                        <KawaIcon style={{color: "#fff", paddingLeft: 18, paddingRight: 20}} name={"arrow-back2"} size={20} />
                                    </Button>
                                    <Text style={{
                                        color: '#ffffff',
                                        fontSize: 20,
                                        fontWeight: 'bold'
                                    }}>Готовим по рецепту</Text>
                                </Item>
                            </View>
                            <View style={styles.alphabetMenu}>
                                <TouchableOpacity style={{marginLeft: 25, paddingTop: 15, borderBottomWidth: 0}}><KawaIcon onPress={() => this.setTypeColor(0)} style={this.state.coffeeIcons[0].class} name={"cup"} size={30} /></TouchableOpacity>
                                <TouchableOpacity style={{marginLeft: 13, borderBottomWidth: 0}}><KawaIcon onPress={() => this.setTypeColor(1)} style={this.state.coffeeIcons[1].class} name={"turk"} size={45} /></TouchableOpacity>
                                <TouchableOpacity style={{marginLeft: 13, borderBottomWidth: 0}}><KawaIcon onPress={() => this.setTypeColor(2)} style={this.state.coffeeIcons[2].class} name={"pour-over"} size={45} /></TouchableOpacity>
                                <TouchableOpacity style={{marginLeft: 13, borderBottomWidth: 0}}><KawaIcon onPress={() => this.setTypeColor(3)} style={this.state.coffeeIcons[3].class} name={"coffee-maker"} size={45} /></TouchableOpacity>
                                <TouchableOpacity style={{marginLeft: 13, borderBottomWidth: 0}}><KawaIcon onPress={() => this.setTypeColor(4)} style={this.state.coffeeIcons[4].class} name={"french-press"} size={45} /></TouchableOpacity>
                                <TouchableOpacity style={{marginRight: 25, marginLeft: 13, borderBottomWidth: 0}}><KawaIcon onPress={() => this.setTypeColor(5)} style={this.state.coffeeIcons[5].class} name={"coffee-maker-electric"} size={45} /></TouchableOpacity>
                            </View>
                            <Text style={{marginTop: 20, color: "#fff", width: '100%', textAlign: 'center', fontSize: 16}}>Выбирайте тип напитка и ингредиенты:</Text>
                            <View style={{flex: 1, flexDirection: 'row', marginTop: 15, marginBottom: 15, justifyContent: "space-around"}}>
                                <Item onPress={() => this.setCoreColor('arabica')} style={{borderBottomWidth: 0, color: "#fff", marginLeft: 5, flexDirection: 'row', flex: 1}}>
                                    <KawaIcon style={this.state.arabica} name={"hot"} size={24} />
                                    <Text style={this.state.arabicaText}>Горячий</Text>
                                </Item>
                                <Item onPress={() => this.setCoreColor('rabusta')} style={{borderBottomWidth: 0, color: "#fff", marginRight: 20, flexDirection: 'row', flex: 1, justifyContent: 'flex-end'}}>
                                    <KawaIcon style={this.state.rabusta} name={"cold"} size={24} />
                                    <Text style={this.state.rabustaText}>Холодный</Text>
                                </Item>
                            </View>
                            <View>
                                <Accordion
                                    dataArray={this.state.info}
                                    icon="arrow-forward"
                                    expandedIcon="arrow-down"
                                    renderHeader={this._renderHeader}
                                    renderContent={this._renderContent}
                                    iconStyle={{ color: "#000" }}
                                    expandedIconStyle={{ color: "#000" }}
                                    style={{ borderWidth: 0, marginRight: 10, marginLeft: 10 }}
                                />
                            </View>
                        </Content>
                    </View>
                    <View style={styles.container}>
                        <Content>
                            <View style={styles.head}>
                                <Item style={{borderBottomWidth: 0, color: '#fff'}}>
                                    <Button
                                        transparent
                                        onPress={() => this.refs.info.scrollTo({x: 0})}>
                                        <KawaIcon style={{color: "#fff", paddingLeft: 18, paddingRight: 20}} name={"arrow-back2"} size={20} />
                                    </Button>
                                    <Text style={{
                                        color: '#ffffff',
                                        fontSize: 20,
                                        fontWeight: 'bold'
                                    }}>Справка</Text>
                                </Item>
                            </View>
                            <Text style={{marginTop: 20, color: "#fff", width: '100%', textAlign: 'left', fontSize: 15, marginBottom: 10, marginLeft: 25}}>Способы приготовления:</Text>
                            <View style={{ marginBottom: 40, backgroundColor: 'rgba(255,255,255, 0.7)', borderTopLeftRadius: 5, borderTopRightRadius: 5, borderBottomLeftRadius: 5, borderBottomRightRadius: 5, paddingLeft: 5, paddingRight: 5, marginLeft: '2.2%', marginRight: '2.2%', width: '95.6%' }}>
                                <List style={{borderBottomWidth: 1, borderBottomColor: '#89a6aa'}}>
                                    <ListItem style={{marginLeft: 10, paddingTop: 25, borderBottomWidth: 0}}><Text style={{width: 50}}><KawaIcon style={styles.typeIcon} name={"cup"} size={30} /></Text><Text style={{fontSize: 18}}>Чашка</Text></ListItem>
                                    <ListItem style={{marginLeft: 13, borderBottomWidth: 0}}><Text style={{width: 50}}><KawaIcon style={styles.typeIcon} name={"turk"} size={45} /></Text><Text style={{fontSize: 18}}>Турка</Text></ListItem>
                                    <ListItem style={{marginLeft: 13, borderBottomWidth: 0}}><Text style={{width: 50}}><KawaIcon style={styles.typeIcon} name={"pour-over"} size={45} /></Text><Text style={{fontSize: 18}}>Гейзерная кофеварка</Text></ListItem>
                                    <ListItem style={{marginLeft: 13, borderBottomWidth: 0}}><Text style={{width: 50}}><KawaIcon style={styles.typeIcon} name={"coffee-maker"} size={45} /></Text><Text style={{fontSize: 18}}>Фильтр-кофеварка</Text></ListItem>
                                    <ListItem style={{marginLeft: 13, borderBottomWidth: 0}}><Text style={{width: 50}}><KawaIcon style={styles.typeIcon} name={"french-press"} size={45} /></Text><Text style={{fontSize: 18}}>Френч-пресс</Text></ListItem>
                                    <ListItem style={{marginRight: 25, marginLeft: 5, borderBottomWidth: 0, marginBottom: 10}}><Text style={{width: 50, marginRight: 10}}><KawaIcon style={styles.typeIcon} name={"coffee-maker-electric"} size={45} /></Text><Text style={{fontSize: 18}}>Эспрессо кофемашина</Text></ListItem>
                                </List>
                            </View>
                        </Content>
                    </View>
                </ScrollView>
                <TouchableOpacity onPress={() => this.props.navigation.navigate('RecipeRecipeScreen')} style={{backgroundColor: '#ea9308', width: '100%', alignItems: 'center', justifyContent: "space-around", height: 50, marginTop: 20}}><Text style={{color: '#fff', fontSize: 14.5, fontWeight: 'bold'}}>ПОДОБРАТЬ</Text></TouchableOpacity>
            </Container>
        )
    }
}