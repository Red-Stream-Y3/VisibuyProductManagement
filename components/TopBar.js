import { useTheme } from "@rneui/themed";
import { StyleSheet, View, Text, Pressable } from "react-native";
import { Icon } from "@rneui/base";
import { StatusBar } from "expo-status-bar";
import { useAppContext } from "../context/Context";

export const TopBar = () => {

    const { theme } = useTheme();
    const { setTab } = useAppContext();

    return (
        <View style={styles.navbarStyle}>
            <View
                style={{
                    borderRadius: 10,
                    overflow: "hidden",
                    marginStart: 5,
                }}>
                <Pressable
                    onPress={() => setTab("main")}
                    android_ripple={{
                        color: theme.colors.grey4,
                        borderless: false,
                    }}
                    style={{
                        flexDirection: "row",
                        alignItems: "center",
                        padding: 10,
                        borderRadius: 10,
                    }}>
                    <Icon name="chevron-left" color={theme.colors.icon} />
                    <Text style={theme.colors.Text}>Back</Text>
                </Pressable>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    navbarStyle: {
        height: 60,
        width: "100%",
        marginTop: 25,
        paddingTop: StatusBar.currentHeight,
        alignItems: "center",
        flexDirection: "row",
    },
});