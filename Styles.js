import { StyleSheet } from "react-native";

export const containerStyles = StyleSheet.create({
    // base container for the app
    baseContainer: {
        flex: 1,
        backgroundColor: "#fff",
        alignItems: "center",
        justifyContent: "center",
        width: "100%",
    },
    // container for the general layout of components
    fit: {
        alignItems: "center",
    },
    // container for main menu buttons
    mainButtonContainer: {
        borderRadius: 10,
        overflow: "hidden",
        margin: 12,
    },
    inputContainer: {
        width: '90%',
    },
    mainMenuCard: {
        width: '90%',
        height: '90%',
        flex: 1,
        borderRadius: 5,
        marginBottom: '5%',
    },
});

export const textStyles = StyleSheet.create({
    // title text for the app
    titleText: {
        fontSize: 20,
        fontWeight: "bold",
    },
    // text for main menu buttons
    mainButtonText: {
        fontSize: 16,
        textTransform: "uppercase",
        color: "#fff",
        fontWeight: "bold",
    },
    header1: {
        fontSize: 18,
        fontWeight: "bold",
        marginBottom: 5,
    },
    header2: {
        fontSize: 16,
        marginBottom: 2,
    },
    body: {
        fontSize: 16,
    },
});

export const buttonStyles = StyleSheet.create({
    // main menu buttons
    mainButton: {
        backgroundColor: "#4233b5e5",
        alignItems: "center",
        justifyContent: "center",
        width: 150,
        height: 150,
        padding: 10,
        borderRadius: 10,
        elevation: 3,
    },
});

export const textInputStyles = StyleSheet.create({
    // text input for the app
    input: {
        height: 40,
        margin: 12,
        width: 200,
        borderWidth: 1,
        padding: 10,
    },
});
