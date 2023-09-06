import { Button, Icon, ListItem, useTheme } from "@rneui/themed";
import { Pressable, ScrollView, Text, View } from "react-native";
import { containerStyles, textStyles } from "../Styles";
import { color } from "@rneui/base";
import axios from "axios";
import { SERVER_ADDRESS } from "./NewProduct";

export const ProductList = ({ products, getProducts, showToast }) => {
    const { theme } = useTheme();

    const onDelete = async (productName) => {
        await axios.delete(`${SERVER_ADDRESS}/api/product/${productName}`,)
        .then((response) => {
            showToast(response.data.message);
            getProducts();
        }).catch((err) => {
            showToast(err.message);
        });
    };

    return (
        <View style={{ width: "100%", flex: 1 }}>
            <ScrollView style={{ width: "100%" }}>
                {(products !== null || products !== undefined) &&
                    products.map((product, i) => {
                        return (
                            <View
                                key={i}
                                style={{
                                    width: "100%",
                                    height: "auto",
                                    overflow: "hidden",
                                }}>
                                <Pressable
                                    android_ripple={{
                                        color: theme.colors.grey5,
                                        borderless: false,
                                        radius: 200,
                                    }}
                                    style={{ width: "100%", padding: 10 }}>
                                    <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                                        <View>
                                            <Text style={textStyles.header2}>
                                            {product.displayName}
                                        </Text>
                                        <Text>{product.productCategory}</Text>
                                        </View>
                                        <View style={{flexDirection: 'row'}}>
                                            <Button 
                                                containerStyle={{margin:5, borderRadius: 50}} 
                                                type="clear"
                                                >
                                                <Icon name="edit" />
                                            </Button>
                                            <Button 
                                                onPress={() => onDelete(product.displayName)}
                                                containerStyle={{margin:5, borderRadius: 50}} 
                                                type="clear"
                                                >
                                                <Icon name="delete" />
                                            </Button>
                                        </View>
                                    </View>
                                </Pressable>
                                <View
                                    style={{
                                        width: "100%",
                                        height: 1,
                                        backgroundColor: theme.colors.grey5,
                                    }}
                                />
                            </View>
                        );
                    })}
            </ScrollView>
        </View>
    );
};
