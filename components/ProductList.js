import { Button, Icon, Overlay, useTheme } from "@rneui/themed";
import { Pressable, ScrollView, Text, View } from "react-native";
import { textStyles } from "../Styles";
import axios from "axios";
import { useState } from "react";
import { ProductCard } from "./ProductCard";
import { useAppContext } from "../context/Context";
import { getProductID } from "../utils/ProductUtils";

export const ProductList = ({ products, getProducts, setLoading }) => {
    const [show, setShow] = useState(false);
    const [selected, setSelected] = useState(null); // [product, index]
    const { theme } = useTheme();
    const { showToast, setTab, SERVER_ADDRESS } = useAppContext();

    // useEffect(() => {console.debug(products)}, [products]);

    const onDelete = async (productName) => {
        setLoading(true);

        await axios.delete(`${SERVER_ADDRESS}/api/product/${getProductID(productName)}`,)
        .then((response) => {
            showToast(response.data.message);
            getProducts();
        }).catch((err) => {
            showToast(err.message);
        });

        setLoading(false);
    };

    return (
        <View style={{ width: "100%", flex: 1 }}>

            <Overlay
                isVisible={show}
                onBackdropPress={() => setShow(false)}
                overlayStyle={{ width: "90%", borderRadius: 5 }}>
                <ProductCard product={selected} />
            </Overlay>

            <ScrollView style={{ width: "100%" }}>
                {products?.map((product, i) => {
                        return (
                            <View
                                key={i}
                                style={{
                                    width: "100%",
                                    height: "auto",
                                    overflow: "hidden",
                                }}>
                                <Pressable
                                    onPress={() => {
                                        setSelected(product);
                                        setShow(true);
                                    }}
                                    android_ripple={{
                                        color: theme.colors.grey5,
                                        borderless: false,
                                        radius: 200,
                                    }}
                                    style={{ width: "100%", padding: 10 }}>
                                    <View
                                        style={{
                                            flexDirection: "row",
                                            justifyContent: "space-between",
                                        }}>
                                        <View>
                                            <Text style={textStyles.header2}>
                                                {product.displayName}
                                            </Text>
                                            <Text>
                                                {product.productCategory}
                                            </Text>
                                        </View>
                                        <View style={{ flexDirection: "row" }}>
                                            <Button
                                                onPress={() =>
                                                    showToast(
                                                        "Edit : not implemented yet"
                                                    )
                                                }
                                                containerStyle={{
                                                    margin: 5,
                                                    borderRadius: 50,
                                                }}
                                                type="clear">
                                                <Icon name="edit" />
                                            </Button>
                                            <Button
                                                onPress={() =>
                                                    onDelete(
                                                        product.displayName
                                                    )
                                                }
                                                containerStyle={{
                                                    margin: 5,
                                                    borderRadius: 50,
                                                }}
                                                type="clear">
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
                    <Button
                    onPress={() => setTab("new")}
                    containerStyle={{ margin: 5, borderRadius: 5 }}
                    titleStyle={{ color: theme.colors.buttonText }}>
                    <Icon
                        name="add-circle"
                        size={25}
                        color={theme.colors.buttonIcon}
                    />
                    NEW
                </Button>
            </ScrollView>
        </View>
    );
};
