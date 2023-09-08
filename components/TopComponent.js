import React from "react";
import { Animated, View } from "react-native";
import { StatusBar } from "expo-status-bar";
import { useAppContext } from "../context/Context";
import { NewProduct } from "./NewProduct";
import { NewProductSet } from "./NewProductSet";
import { MainMenu } from "./MainMenu";
import { TopBar } from './TopBar';
import { containerStyles } from "../Styles";
import { TestImage } from "./TestImage";

export const TopComponent = () => {
    const { tab } = useAppContext();

    const positionOffset = -100;
    const opacityOffset = 1;
    const animDuration = 200;

    const positionAnim = React.useRef(
        new Animated.Value(positionOffset)
    ).current;
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

    //trigger animations when tab changes
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
        <View style={containerStyles.baseContainer}>
            <Animated.View
                style={{
                    width: "100%",
                    transform: [{ translateY: positionAnim }],
                    opacity: opacityAnim,
                }}>
                <TopBar />
            </Animated.View>
            <View
                style={{
                    flex: 1,
                    justifyContent: "center",
                    width: "100%",
                }}>
                {tab === "main" && <MainMenu />}
                {tab === "new" && <NewProduct />}
                {tab === "newset" && <NewProductSet />}
                {tab === "test" && <TestImage />}
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
    );
};
