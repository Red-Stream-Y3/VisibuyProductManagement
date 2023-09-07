import { Button, Icon, Overlay, useTheme } from "@rneui/themed";
import { View, Text, ScrollView, Pressable } from "react-native";
import { useAppContext } from "../context/Context";
import { useEffect, useState } from "react";
import { textStyles } from "../Styles";
import { SERVER_ADDRESS } from "./NewProduct";
import { getProductID } from "../utils/ProductUtils";
import axios from "axios";
import { CatalogueProductList } from "./CatalogueProductList";

export const CatalogueList = ({ productSets, getProductSets, setLoading }) => {
    const { theme } = useTheme();
    const [selected, setSelected] = useState(null);
    const [show, setShow] = useState(false);
    const { setTab, showToast } = useAppContext();

    const onDelete = async (productSetName) => {
        setLoading(true);

        await axios.delete(`${SERVER_ADDRESS}/api/productset/${getProductID(productSetName)}`)
        .then((response) => {
            showToast(response.data.message);
            getProductSets();
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
                <CatalogueProductList productSet={selected} />
            </Overlay>
            <ScrollView style={{ width: "100%" }}>
                {productSets?.map((productSet, i) => {
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
                                    setSelected(productSet);
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
                                            {productSet.displayName}
                                        </Text>
                                        <Text>
                                            Products :{" "}
                                            {productSet.products?.length || 0}
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
                                                onDelete(productSet.displayName)
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
                    onPress={() => setTab("newset")}
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