import { ActivityIndicator, Text, View } from "react-native";
import { containerStyles, textStyles } from "../Styles";
import { useState } from "react";
import { Button, Input, useTheme } from "@rneui/themed";
import { useAppContext } from "../context/Context";
import axios from "axios";

export const NewProductSet = () => {
    const [productSet, setProductSet] = useState("");
    const [loading, setLoading] = useState(false);
    const { setTab, showToast, SERVER_ADDRESS } = useAppContext();
    const { theme } = useTheme();

    const onPressAddProductSet = async () => {
        if (productSet === "") {
            showToast("Please enter a product set name");
            return;
        }

        setLoading(true);

        await axios.post(`${SERVER_ADDRESS}/api/productset`, {
            productSetDisplayName: productSet
        }).then((response) => {
            showToast(response.data.message);
            setTab("main");
        }).catch((err) => {
            showToast(err.message);
        });

        setLoading(false);
    };

    return(
        <View style={containerStyles.baseContainer}>
            <Text style={textStyles.header1}>New Product Catalogue</Text>
            <Input
                    value={productSet}
                    style={textStyles.body}
                    onChangeText={(text) =>
                        setProductSet(text)
                    }
                    containerStyle={containerStyles.inputContainer}
                    placeholder="New Product Catalogue Name"
                />
            <Button
                onPress={onPressAddProductSet}
                containerStyle={{ margin: 20, borderRadius: 5 }}
                titleStyle={{
                    ...textStyles.mainButtonText,
                    color: theme.colors.buttonText,
                }}>
                { loading && <ActivityIndicator color={theme.colors.buttonText} /> }
                Add Catalogue
            </Button>
        </View>
    );
};