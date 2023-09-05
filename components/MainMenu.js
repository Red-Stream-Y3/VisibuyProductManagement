import React, { useState } from "react";
import { Text, View, ToastAndroid } from "react-native";
import { containerStyles, textStyles } from "../Styles";
import { CustomButton } from "./CustomButton";
import { Divider, Icon } from "@rneui/base";
import { useTheme } from "@rneui/themed";

//react native MainMenu component
export const MainMenu = (props) => {
    const [inputValue, setInputValue] = useState("Hello World!");
    const { theme } = useTheme();

    const showToast = () => {
        ToastAndroid.show(inputValue, ToastAndroid.SHORT);
    };

    return (
        <View style={containerStyles.fit}>
            <Text style={textStyles.titleText}>VISIBUY ADMIN</Text>
            <Divider color={theme.colors.grey2} />
            <CustomButton
                title="Add Product"
                rippleColor="#4233b5e5"
                onPress={()=>props.setTab("new")}>
                <Icon name="add-circle" size={50} color={theme.colors.buttonIcon} />
            </CustomButton>
            <CustomButton
                title="View Product"
                rippleColor="#4233b5e5"
                onPress={()=>props.setTab("view")}>
                <Icon name="visibility" size={50} color={theme.colors.buttonIcon} />
            </CustomButton>
        </View>
    );
};
    
