import { Button, Icon, Overlay, useTheme } from "@rneui/themed";
import { View, Text, ScrollView, Pressable } from "react-native";
import { useAppContext } from "../context/Context";
import { useState } from "react";
import { textStyles } from "../Styles";
import { getProductID } from "../utils/ProductUtils";
import axios from "axios";
import { CatalogueProductList } from "./CatalogueProductList";
import { getDateTime } from "../utils/ProductUtils";

export const CatalogueList = ({ productList, productSets, getProductSets, setLoading }) => {
    const { theme } = useTheme();
    const [selected, setSelected] = useState(null);
    const [showDelete, setShowDelete] = useState(false);
    const [deleteSelect, setDeleteSelect] = useState(null);
    const [show, setShow] = useState(false);
    const { setTab, showToast, SERVER_ADDRESS } = useAppContext();

    const onDelete = async (productSetName) => {

        if (!showDelete) {
            setDeleteSelect(productSetName);
            setShowDelete(true);
            return;
        };

        setLoading(true);
        
        const productSetID = getProductID(productSetName);
        
        await axios.delete(`${SERVER_ADDRESS}/api/productset/${productSetID}`)
        .then((response) => {
            showToast(response.data.message);
            getProductSets();
            setDeleteSelect(null);
            setShowDelete(false);
        }).catch((err) => {
            showToast(err.message);
        });

        setLoading(false);
    };

    return (
        <View style={{ width: "100%", flex: 1 }}>

            <Overlay
                isVisible={showDelete}
                onBackdropPress={() => {
                    setShowDelete(false);
                    setDeleteSelect(null);
                }}
                overlayStyle={{ width: "70%", borderRadius: 5 }}>
                <View style={{ width: "100%", padding: 10 }}>
                    <Text style={textStyles.header2}>
                        Delete {deleteSelect}?
                    </Text>
                    <View
                        style={{
                            flexDirection: "row",
                            justifyContent: "flex-end",
                        }}>
                        <Button
                            onPress={() => {
                                setShowDelete(false);
                                setDeleteSelect(null);
                            }}
                            containerStyle={{ margin: 5 }}
                            type="clear">
                            <Text style={{ color: theme.colors.Text }}>
                                Cancel
                            </Text>
                        </Button>
                        <Button
                            onPress={() => onDelete(deleteSelect)}
                            containerStyle={{
                                margin: 5,
                                backgroundColor: theme.colors.error,
                            }}
                            type="clear">
                            <Text style={{ color: theme.colors.buttonText }}>
                                Delete
                            </Text>
                        </Button>
                    </View>
                </View>
            </Overlay>

            <Overlay
                isVisible={show}
                onBackdropPress={() => setShow(false)}
                overlayStyle={{ width: "90%", borderRadius: 5 }}>
                <CatalogueProductList productList={productList} productSet={selected} />
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
                                            Index Time :{" "}
                                            {getDateTime(productSet.indexTime?.seconds) || 0}
                                        </Text>
                                    </View>
                                    <View style={{ flexDirection: "row" }}>
                                        <Button
                                            onPress={() =>{
                                                onDelete(productSet.displayName);
                                            }}
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