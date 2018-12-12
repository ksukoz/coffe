import React, {Component} from 'react';
import {
    Container, Content, Text, Item, Button, Input, Icon, Accordion
} from 'native-base';
import {
    StyleSheet,
    View,
    ImageBackground,
    Image,
    ScrollView,
    StatusBar,
    Dimensions,
    BackHandler,
    TouchableHighlight,
    Linking,
    Platform, ActivityIndicator
} from 'react-native';
import HTML from 'react-native-render-html';
import Modal from "react-native-modal";
import KawaIcon from '../KawaIcon';

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
        marginRight: 5,
        marginTop: 2,
        shadowColor: '#fff',
        justifyContent: 'center'
    },
    cardFull: {
        marginLeft: 5,
        marginRight: 5,
        marginTop: 5,
        paddingBottom: 10,
        paddingLeft: 20,
        paddingRight: 20,
        color: '#000000',
        textAlign: 'center',
        shadowColor: '#fff',
        backgroundColor: 'rgba(255,255,255, 0.7)',
        alignItems: 'flex-start',
        borderRadius: 5,
        justifyContent: "space-around",
        resizeMode: "contain"
    },
    cardFullFirst: {
        marginLeft: 5,
        marginRight: 5,
        marginTop: 20,
        paddingBottom: 10,
        paddingLeft: 20,
        paddingRight: 20,
        color: '#000000',
        textAlign: 'center',
        shadowColor: '#fff',
        backgroundColor: 'rgba(255,255,255, 0.7)',
        alignItems: 'flex-start',
        borderRadius: 5,
        justifyContent: "space-around",
        resizeMode: "contain",
        marginBottom: 30
    },
    cardFullCity: {
        marginLeft: 5,
        marginRight: 5,
        marginTop: 5,
        paddingBottom: 10,
        paddingLeft: 0,
        paddingRight: 0,
        color: '#000000',
        textAlign: 'center',
        shadowColor: '#fff',
        backgroundColor: 'rgba(255,255,255, 0.7)',
        alignItems: 'flex-start',
        borderRadius: 5,
        justifyContent: "space-around",
        resizeMode: "contain"
    },
    cardFullLast: {
        marginLeft: 5,
        marginRight: 5,
        marginTop: 5,
        marginBottom: 40,
        paddingBottom: 10,
        color: '#000000',
        textAlign: 'center',
        shadowColor: '#fff',
        backgroundColor: 'rgba(255,255,255, 0.7)',
        alignItems: 'flex-start',
        borderRadius: 5,
        justifyContent: "space-around",
        resizeMode: "contain"
    },
    arrowIcon: {
        color: '#302c23',
        paddingRight: 10
    },
    cardItemHalf: {
        width: '50%',
        backgroundColor: 'rgba(255,255,255, 0.2)',
        marginRight: 5,
        marginTop: 3,
        alignItems: 'center',
        height: Dimensions.get("window").width * 0.5 - 10,
        borderRadius: 5,
        justifyContent: "flex-end",
        resizeMode: "contain",
        paddingBottom: '20%'
    },
    cardContent: {
        color: '#000000'
    },
    container: {
        flex: 1
    },
    head: {
        marginTop: 35,
        marginBottom: 15,
        color: '#ffffff'
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
        position: 'absolute',
        right: 20
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
        color: '#ffffff',
        fontSize: 16,
        fontWeight: 'bold'
    },
    profileInput: {
        fontSize: 20,
        borderBottomColor: 'gray',
        borderBottomWidth: 1,
        width: '100%',
        paddingLeft: 0
    },
    profileInputPhone: {
        fontSize: 20,
        borderBottomColor: 'gray',
        borderBottomWidth: 1,
        width: '100%',
        paddingLeft: 0,
        paddingTop: 10,
        paddingBottom: 10
    },
    profileInputPhoneFocused: {
        fontSize: 20,
        borderBottomColor: '#ea9308',
        borderBottomWidth: 1,
        width: '100%',
        paddingLeft: 0,
        paddingTop: 10,
        paddingBottom: 10
    },
    profileInputFocused: {
        fontSize: 20,
        borderBottomColor: '#ea9308',
        borderBottomWidth: 1,
        width: '100%',
        paddingLeft: 0
    },
    birthdayInput: {
        borderBottomColor: 'gray',
        borderBottomWidth: 1,
        width: '100%',
        paddingLeft: 0,
        paddingRight: 0,
        marginLeft: 0,
        marginRight: 0
    },
    profileInputCalendar: {
        fontSize: 20,
        borderBottomColor: 'gray',
        borderBottomWidth: 1,
        width: '100%',
        paddingLeft: 0
    }
});

StatusBar.setBarStyle('light-content', true);
const MAIN_BG = "../../static/img/background.png";
const KAWA_LOGO = require('../../static/img/kawa-logo.png');

let selfObject;

export default class InfoScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            info: [
                { "name": "Оценить приложение", "content": "", "onClick": "selfObject.setModalVisible(!selfObject.state.modalVisible);"},
                { "name": "О магазине", "content": "кawa – уникальный мобильный on-line магазин для покупки кофе со всего мира теперь в Украине.<br/>" +
                        "Известные кофейные бренды по лучшей цене, рецепты приготовления, кофейная карта и невероятные предсказания. Используйте возможности своего смартфона с приложением кawa, быстро находите информацию о товаре с помощью фотокамеры, оплачивайте покупки с помощью электронных платежных систем Google Pay или Apple Pay, подберите кофе по своему вкусу с помощью интерактивной кофейной карты.<br/>" +
                        "Основные функции приложения кawa доступны без регистрации<br/>" +
                        "Удобный интерфейс заказа и оплаты<br/>" +
                        "Контроль за статусом заказа в личном кабинете<br/>" +
                        "Энциклопедия кофейных брендов и рецептов<br/>" +
                        "Отсутствие рекламы<br/>" +
                        "Видеообзоры о кофе<br/>" +
                        "Отсутствие платного контента", "onClick": ""},
                { "name": "Доставка и оплата", "content": "Оплата товара и доставки осуществляется на условиях предоплаты.<br/>Оплатить можно картами Visa, Mastercard, а так же с помощью платежных систем Google Pay, Apple Pay, Masterpass.<br/>Для предприятий и организаций — оплата по безналичному расчету с выставлением счета на e-mail и последующей выдачей всех необходимых документов.<br/>Оплата товара и доставки производится исключительно в национальной валюте, в подтверждении оплаты мы выдаем товарный чек.<br/><br/>Доставка осуществляется в любой населенный пункт Украины, компаниями  «Нова  Пошта» и «Укрпошта».<br/>Срок доставки 1-3 дня с момента передачи товара в логистическую компанию.<br/>Способы доставки: самовывоз из отделения и курьерская доставка по адресу.<br/>Стоимость доставки интересующего Вас товара, Вы можете уточнить при оформлении заказа или на странице товара, предварительно указав город, в который необходима доставка.", "onClick": ""},
                { "name": "Гарантия и сервис", "content": "В нашем магазине есть большой ассортимент товаров разных производителей. Мы не можем гарантировать качество каждого из них, но мы можем гарантировать их оригиналность. В следствии чего, вы можете быть уверены, что не приобретете контрафактную продукцию. Так как все товары в наш магазин поставляются только от их производителей, и сертифицированы для продажи на територии Украины.<br/>Нами используется интуитивный механизм поиска товаров, который ориентируется на ваши вкусовые предпочтения. Вы всегда найдете в каталоге именно то, что оптимально подходит вам.<br/>Используете приложение для заказа товаров в любое удобное для вас время. Выбирайте, покупайте и оплачивайте нужный товар.<br/>Для быстрой и удобной оплаты покупок достаточно один раз ввести платежные данные. В будущем вы сможете автоматически использовать их для следующих покупок. Не беспокойтесь о сохранности личных данных — информация о вашем счете надежно защищена, и доступ к ней осуществляется только через банковские системы.<br/>Доставка товара будет выполнена в срок, вы получите свою покупку в целости. Отправку, движение и получение посылки сможете контролировать в приложении. <br/>Вы всегда сможете вернуть товар и получить обратно его стоимость, если его качество или комплектация вас не удовлетворят.", "onClick": ""}
            ],
            loading: false,
            modalVisible: false,
            rating: 3,
            opacity: 0,
            ratings: {
                1: "Ужасно",
                2: "Плохо",
                3: "Неплохо",
                4: "Хорошо",
                5: "Отлично"
            }
        }
        selfObject = this;
    }

    setModalVisible(visible) {
        if (visible) {
            StatusBar.setHidden(true);
            var opacity = 0.7;
        } else {
            StatusBar.setHidden(false);
            var opacity = 0;
        }

        selfObject.setState({
            modalVisible: visible,
            opacity: opacity
        });
    }

    onFocus = (name) => {
        if (name == 'review') {
            this.setState({
                isFocusedReview: true
            });
        }
    }

    onUnFocus = (name) => {
        if (name == 'review') {
            this.setState({
                isFocusedReview: false
            });
        }
    }

    componentDidMount() {
        BackHandler.addEventListener('hardwareBackPress', this.handleBackPress);
    }

    componentWillUnmount() {
        BackHandler.removeEventListener('hardwareBackPress', this.handleBackPress);
    }

    handleBackPress = () => {
        this.props.navigation.navigate('Home');
        return true;
    }

    _renderHeader(item, expanded) {
        return (
            <View
                onPress={() => eval(item.onClick)}
                style={{  borderRadius: 5, borderBottomEndRadius: expanded ? 0 : 5, borderBottomStartRadius: expanded ? 0 : 5,
                    backgroundColor: 'rgba(255,255,255, 0.7)', flexDirection: "row", padding: item.onClick ? 0 : 10,
                    justifyContent: "space-between", alignItems: "center", marginTop: item.onClick ? 0 : 10 }}
            >
                {item.onClick
                    ? <Item onPress={() => eval(item.onClick)} style={{ padding: 10, fontSize: 14, backgroundColor: 'rgba(255,255,255,0)', width: '100%', margin: 0 }}><Text style={{fontSize: 14, paddingLeft: 10}}>{item.name}</Text><Text style={{marginLeft: 'auto', paddingRight: 10}}><KawaIcon style={styles.arrowIcon} size={14} name="arrow-next"/></Text></Item>
                    : <Text style={{ fontSize: 14, paddingLeft: 10 }}>{item.name}</Text>
                }
                {expanded
                    ? <KawaIcon style={styles.arrowIcon} size={8} name="arrow-down"/>
                    : <KawaIcon style={styles.arrowIcon} size={14} name="arrow-next"/>}
            </View>
        );
    }

    _renderContent(item) {
        return (
            <View style={{ backgroundColor: 'rgba(255,255,255, 0.7)', padding: 10, borderBottomStartRadius: 5, borderBottomEndRadius: 5}}>
                <HTML containerStyle={{ paddingLeft: 10, paddingRight: 10, paddingBottom: 10 }} html={item.content}/>
            </View>
        );
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

    render() {
        if (this.state.loading) {
            return this.renderLoadingView();
        }
        return (
            <Container style={styles.default}>
                <StatusBar
                    barStyle = "light-content"
                    hidden = {false}
                    translucent = {true}
                    backgroundColor = {"rgba(0,0,0," + this.state.opacity + ")"}
                />
                <Image source={require(MAIN_BG)} style={styles.background} />
                <ScrollView style={{backgroundColor: "rgba(0,0,0," + this.state.opacity + ")"}}>
                    <View  style={styles.container}>
                        <Content padder>
                            <View style={styles.head}>
                                <Item style={{borderBottomWidth: 0, color: '#fff'}}>
                                    <Button
                                        transparent
                                        onPress={() => this.props.navigation.openDrawer()}>
                                        <KawaIcon style={styles.iconMenu} name="menu"/>
                                    </Button>
                                    <Text style={{color: '#ffffff', fontSize: 20, fontWeight: 'bold', marginLeft: 20}}>Информация</Text>
                                </Item>
                            </View>
                            <Accordion
                                dataArray={this.state.info}
                                icon="arrow-forward"
                                expandedIcon="arrow-down"
                                renderHeader={this._renderHeader}
                                renderContent={this._renderContent}
                                iconStyle={{ color: "#000" }}
                                expandedIconStyle={{ color: "#000" }}
                                style={{ borderWidth: 0 }}
                            />
                            <Modal
                                backdropTransitionInTiming={0}
                                backdropTransitionOutTiming={0}
                                animationInTiming={0}
                                animationOutTiming={0}
                                backdropOpacity={0}
                                isVisible={this.state.modalVisible}
                                onBackdropPress={() => this.setModalVisible(false)}
                                onBackButtonPress={() => this.setModalVisible(false)}
                            >
                                <View style={{borderRadius: 5, padding: 20, alignItems: 'center', backgroundColor: '#fff'}}>
                                    <Text style={{fontSize: 20, paddingTop: 5}}>Оценить приложение</Text>
                                    <Item style={{paddingTop: 25, paddingBottom: 25, borderBottomWidth: 0}}>
                                        <Image style={{width: 140, height: 45}} source={KAWA_LOGO} />
                                    </Item>
                                    <Text style={{fontSize: 18, textAlign: 'center'}}>
                                        Для оценки приложения и написания отзыва перейдите в
                                    </Text>
                                    <Image style={{width: Platform.OS === 'ios' ? 55 : 65, height: Platform.OS === 'ios' ? 65 : 73, marginTop: 25}} source={Platform.OS === 'ios' ? require('../../static/img/appstore.png') : require('../../static/img/android.png')} />
                                    <TouchableHighlight
                                        style={{backgroundColor: 'orange', width: '100%', padding: 10, borderRadius: 3, marginTop: 25, alignItems: 'center'}}
                                        onPress={() => Linking.openURL(Platform.OS === 'ios' ? 'itms-apps://itunes.apple.com/app/id1261357853?action=write-review&mt=8' : 'market://details?id=com.stainlessgames.carmageddon')}>
                                        <Text style={{color: '#fff', fontWeight: 'bold'}}>ПЕРЕЙТИ</Text>
                                    </TouchableHighlight>
                                </View>
                            </Modal>
                        </Content>
                    </View>
                </ScrollView>
            </Container>
        )
    }
}