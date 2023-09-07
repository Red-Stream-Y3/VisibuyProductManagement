// import 'react-native-gesture-handler';
import * as React from 'react';
import { Platform } from "react-native";
import { createTheme, lightColors, ThemeProvider } from "@rneui/themed";
// import { NavigationContainer } from "@react-navigation/native";
// import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { AppProvider } from './context/Context';
import { TopComponent } from './components/TopComponent';

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
    return (
        <ThemeProvider theme={theme}>
            <AppProvider>
                <TopComponent />
            </AppProvider>
        </ThemeProvider>
    );
}
