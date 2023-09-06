// import 'react-native-gesture-handler';
import * as React from 'react';
import { StatusBar } from "expo-status-bar";
import { Animated, Platform, View } from "react-native";
import { containerStyles } from "./Styles";
import { MainMenu } from "./components/MainMenu";
import { createTheme, lightColors, ThemeProvider } from "@rneui/themed";
// import { NavigationContainer } from "@react-navigation/native";
// import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NewProduct } from "./components/NewProduct";
import { ViewProducts } from "./components/ViewProducts";
import { TopBar } from './components/TopBar';

const theme = createTheme({
    lightColors: {
        ...Platform.select({
            default: lightColors.platform.android,
            ios: lightColors.platform.ios,
            web: lightColors.platform.web,
        }),
        primaryLight: "#73a2fa",
        icon: "#000",
        buttonIcon: "#fff",
        text: "#000",
        buttonText: "#fff",
    },
    darkColors: {
        ...Platform.select({
            default: lightColors.platform.android,
            ios: lightColors.platform.ios,
            web: lightColors.platform.web,
        }),
        primaryLight: "#302f2f",
        icon: "#fff",
        buttonIcon: "#000",
        text: "#fff",
        buttonText: "#000",
    },
});

// const Stack = createStackNavigator();

export default function App() {
    const [tab, setTab] = React.useState("main");
    const [newProduct, setNewProduct] = React.useState({});
    const [selectedIndex, setSelectedIndex] = React.useState(0);

    const resetNewProduct = () => {
        setNewProduct({
            name: "Cream Cracker",
            category: "",
            size: "Large",
            price: "300.00",
            color: "Red",
            description: "Low sugar crackers",
            images: new Array(),
            types: new Array(),
        });
    };

    //initialize newProduct
    React.useEffect(() => {
        resetNewProduct();
    }, []);

    const positionOffset = -100;
    const opacityOffset = 1;
    const animDuration = 200;

    const positionAnim = React.useRef(new Animated.Value(positionOffset)).current;
    const opacityAnim = React.useRef(new Animated.Value(0)).current;

    const slideIn = () => {
        Animated.timing(positionAnim, {
            toValue: 0,
            duration: animDuration,
            useNativeDriver: true,
        }).start();
    };

    const slideOut = () => {
        Animated.timing(positionAnim, {
            toValue: positionOffset,
            duration: animDuration,
            delay: 100,
            useNativeDriver: true,
        }).start();
    };

    const fadeIn = () => {
        Animated.timing(opacityAnim, {
            toValue: opacityOffset,
            duration: 320,
            useNativeDriver: true,
        }).start();
    };

    const fadeOut = () => {
        Animated.timing(opacityAnim, {
            toValue: 0,
            duration: 100,
            delay: 100,
            useNativeDriver: true,
        }).start();
    };

    React.useEffect(() => {
        if (tab !== "main") {
            slideIn();
            fadeIn();
        } else {
            slideOut();
            fadeOut();
        }
    }, [tab]); 

    return (
        <ThemeProvider theme={theme}>
            <View style={containerStyles.baseContainer}>
                <Animated.View style={{
                    width: "100%",
                    transform: [{ translateY: positionAnim }],
                    opacity: opacityAnim,
                    }} >
                    <TopBar tab={tab} setTab={setTab} />
                </Animated.View>
                <View style={{
                    flex: 1, 
                    justifyContent: 'center',
                    width: '100%',
                    }}>
                    {tab === "main" && <MainMenu setTab={setTab} selectedIndex={selectedIndex} setSelectedIndex={setSelectedIndex} />}
                    {tab === "new" && <NewProduct newProduct={newProduct} setNewProduct={setNewProduct} resetProduct={resetNewProduct} />}
                    {tab === "view" && <ViewProducts />}
                </View>
                
                {/* <NavigationContainer>
                    <Stack.Navigator initialRouteName="MainMenu">
                        <Stack.Screen name="MainMenu" component={MainMenu} />
                        <Stack.Screen name="NewProduct" component={NewProduct} />
                        <Stack.Screen name="ViewProducts" component={ViewProducts} />
                    </Stack.Navigator>
                </NavigationContainer> */}
                <StatusBar style="auto" />
            </View>
        </ThemeProvider>
    );
}
