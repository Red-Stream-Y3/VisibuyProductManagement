import { Button, Icon, Overlay, useTheme } from "@rneui/themed";
import { Pressable, ScrollView, Text, View } from "react-native";
import { textStyles } from "../Styles";
import axios from "axios";
import { useState } from "react";
import { ProductCard } from "./ProductCard";
import { useAppContext } from "../context/Context";
import { getProductID } from "../utils/ProductUtils";
import { NewProduct } from "./NewProduct";

export const ProductList = ({ products, getProducts, setLoading }) => {
    const [show, setShow] = useState(false);
    const [showEdit, setShowEdit] = useState(false);
    const [editSelect, setEditSelect] = useState(null);
    const [showDelete, setShowDelete] = useState(false);
    const [deleteSelect, setDeleteSelect] = useState(null);
    const [selected, setSelected] = useState(null);
    const { theme } = useTheme();
    const { showToast, setTab, SERVER_ADDRESS } = useAppContext();

    // useEffect(() => {console.debug(products)}, [products]);

    const onDelete = async (productName) => {
        if (!showDelete) {
            setDeleteSelect(productName);
            setShowDelete(true);
            return;
        };

        setLoading(true);

        await axios.delete(`${SERVER_ADDRESS}/api/product/${getProductID(productName)}`,)
        .then((response) => {
            showToast(response.data.message);
            getProducts();
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
                            onPress={() => onDelete(selected?.displayName)}
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
                <ProductCard product={selected} />
            </Overlay>

            <Overlay
                isVisible={showEdit}
                onBackdropPress={() => {
                    setShowEdit(false);
                    setEditSelect(undefined);
                }}
                overlayStyle={{ width: "90%", height: "90%", borderRadius: 5 }}>
                {showEdit && (
                    <NewProduct
                        editProduct={editSelect}
                        setEditSelect={setEditSelect}
                        setShowEdit={setShowEdit}
                        getProducts={getProducts}
                    />
                )}
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
                                        <Text>{product.productCategory}</Text>
                                    </View>
                                    <View style={{ flexDirection: "row" }}>
                                        <Button
                                            onPress={() => {
                                                setEditSelect(product);
                                                setShowEdit(true);
                                            }}
                                            containerStyle={{
                                                margin: 5,
                                                borderRadius: 50,
                                            }}
                                            type="clear">
                                            <Icon name="edit" />
                                        </Button>
                                        <Button
                                            onPress={() =>
                                                onDelete(product.displayName)
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
