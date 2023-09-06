import { View, ToastAndroid, Text } from "react-native";
import { ProductList } from "./ProductList";
import { useEffect, useState } from "react";
import axios from "axios";
import { SERVER_ADDRESS } from "./NewProduct";
import { CatalogueList } from "./CatalogueList";

export const ViewProducts = ({selectedIndex}) => {
    const [productList, setProductList] = useState([]);

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

    useEffect(() => {
        getProducts();
    }, []);

    return (
        <View style={{width: '100%', alignItems: 'center', flex: 1}}>
            {selectedIndex === 0 && <CatalogueList />}
            {selectedIndex === 1 && <ProductList products={productList} getProducts={getProducts} showToast={showToast} />}
        </View>
    );
};