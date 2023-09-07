import React, { useState } from "react";
import { Text, View, ToastAndroid } from "react-native";
import { containerStyles, textStyles } from "../Styles";
import { Button, ButtonGroup, Card, Divider, Icon } from "@rneui/themed";
import { useTheme } from "@rneui/themed";
import { ViewProducts } from "./ViewProducts";
import { useAppContext } from "../context/Context";

//react native MainMenu component
export const MainMenu = () => {
    const { theme } = useTheme();
    const { setTab, selectedIndex, setSelectedIndex } = useAppContext();

    return (
        <View
            style={{
                ...containerStyles.fit,
                flex: 1,
            }}>
            <View
                style={{
                    width: "90%",
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "space-between",
                }}>
                <Text style={{ ...textStyles.titleText, paddingStart: 5 }}>
                    VISIBUY ADMIN
                </Text>
                <Button
                    onPress={() => setTab("new")}
                    containerStyle={{ margin: 5, borderRadius: 5 }}
                    titleStyle={{ color: theme.colors.buttonText }}>
                    <Icon
                        name="add-circle"
                        size={25}
                        color={theme.colors.buttonIcon}
                    />
                    Add Product
                </Button>
            </View>

            <View>
                <ButtonGroup
                    containerStyle={{ width: "90%", borderRadius: 5 }}
                    style={{ marginVertical: 10 }}
                    buttons={["CATALOGUES", "PRODUCTS"]}
                    selectedIndex={selectedIndex}
                    onPress={(i) => setSelectedIndex(i)}
                />
            </View>

            <View style={{ flex: 1, width: "100%", alignItems: "center" }}>
                <View style={{
                    ...containerStyles.mainMenuCard, 
                    borderRadius: 5,
                    borderStyle: 'solid',
                    borderWidth: 1,
                    borderColor: theme.colors.grey5,
                    alignItems: 'center',   
                    }}>
                    <ViewProducts />
                </View>
            </View>
        </View>
    );
};
