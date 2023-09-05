import { Pressable, View, Text } from "react-native";
import { buttonStyles, containerStyles, textStyles } from "../Styles";
import { useTheme } from "@rneui/themed";

export const CustomButton = (props) => {

    const { theme } = useTheme();

    return (
        <View style={containerStyles.mainButtonContainer}>
            <Pressable
                onPress={()=>props.onPress()}
                android_ripple={
                    { 
                        color: theme.colors.primaryLight,
                        borderless: false,
                    }}
                style={{
                    backgroundColor: theme.colors.primary,
                    alignItems: "center",
                    justifyContent: "center",
                    width: 150,
                    height: 150,
                    padding: 10,
                    borderRadius: 10,
                    elevation: 3,
                }}>
                    {props.children}
                <Text style={textStyles.mainButtonText}>{props.title}</Text>
            </Pressable>
        </View>
    );
};
