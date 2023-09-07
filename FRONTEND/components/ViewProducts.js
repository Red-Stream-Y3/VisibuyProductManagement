import { View, ToastAndroid, Text, ActivityIndicator } from "react-native";
import { ProductList } from "./ProductList";
import { useEffect, useState } from "react";
import axios from "axios";
import { SERVER_ADDRESS } from "./NewProduct";
import { CatalogueList } from "./CatalogueList";
import { Overlay, useTheme } from "@rneui/themed";
import { useAppContext } from "../context/Context";

export const ViewProducts = () => {
    const [productList, setProductList] = useState([]);
    const [productSets, setProductSets] = useState([]);
    const [loading, setLoading] = useState(false);
    const { selectedIndex } = useAppContext();

    const { theme } = useTheme();

    const showToast = (message) => {
        ToastAndroid.show(message, ToastAndroid.SHORT);
    };

    const getProducts = async () => {
        await axios.get(`${SERVER_ADDRESS}/api/product`)
            .then((response) => {
                setProductList(response.data);
            }).catch((err) => {
                showToast(err.message);
            });
    };

    const getProductSets = async () => {
        await axios.get(`${SERVER_ADDRESS}/api/productset`)
            .then((response) => {
                setProductSets(response.data);
            }).catch((err) => {
                showToast(err.message);
            });
    };

    useEffect(() => {
        getProducts();
    }, []);

    useEffect(() => {
        getProductSets();
    }, []);

    return (
        <View style={{ width: "100%", alignItems: "center", flex: 1 }}>
            <Overlay isVisible={loading} overlayStyle={{ borderRadius: 50 }}>
                <ActivityIndicator size="large" color={theme.colors.primary} />
            </Overlay>
            {selectedIndex === 0 && (
                <CatalogueList
                    productSets={productSets}
                    getProductSets={getProductSets}
                    setLoading={setLoading}
                />
            )}
            {selectedIndex === 1 && (
                <ProductList
                    products={productList}
                    getProducts={getProducts}
                    setLoading={setLoading}
                />
            )}
        </View>
    );
};