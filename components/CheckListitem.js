import { CheckBox } from "@rneui/themed";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { Text, View } from "react-native";
import { useAppContext } from "../context/Context";
import { getProductID } from "../utils/ProductUtils";

export const CheckListItem = ({ item, productSet, setLoading }) => {
    const [checked, setChecked] = useState(false);
    const { SERVER_ADDRESS, showToast } = useAppContext();

    useEffect(() => {
        setChecked(item?.checked);
    }, [item]);

    const addItem = async () =>
        new Promise(async (resolve, reject) => {
            await axios
                .post(`${SERVER_ADDRESS}/api/productset/product`, {
                    productSetId: getProductID(productSet?.displayName),
                    productIdList: [getProductID(item?.product?.displayName)],
                })
                .then((response) => {
                    resolve(response.data);
                })
                .catch((error) => {
                    reject(error);
                    console.debug(error);
                });
        });

    const removeItem = async () =>
        new Promise(async (resolve, reject) => {
            const productSetId = getProductID(productSet?.displayName);
            const productId = getProductID(item?.product?.displayName);
            await axios
                .delete(`${SERVER_ADDRESS}/api/${productSetId}/${productId}`)
                .then((response) => {
                    resolve(response.data);
                })
                .catch((error) => {
                    reject(error);
                    console.debug(error);
                });
        });

    const itemOnClick = async () => {
        setLoading(true);

        if (checked) {
            //remove item
            await removeItem().then(() => {
                setChecked(!checked);
            }).catch(() => {
                showToast("Error removing item");
            });
        } else {
            //add item
            await addItem().then(() => {
                setChecked(!checked);
            }).catch(() => {
                showToast("Error adding item");
            });
        }

        setLoading(false);
    };

    return (
        <View style={{ 
            width: "90%", 
            height: "auto", 
            padding: 5, 
            alignItems: "center",
            flexDirection: "row" }}>
            <CheckBox
                label={item?.product?.displayName}
                checked={checked}
                onPress={() => itemOnClick()}
            />
            <Text>{item?.product?.displayName}</Text>
        </View>
    );
};