import { Card, LinearProgress } from "@rneui/themed";
import React, { useState, useEffect} from "react";
import { ScrollView, Text, View } from "react-native";
import { textStyles } from "../Styles";
import axios from "axios";
import { useAppContext } from "../context/Context";
import { getProductID } from "../utils/ProductUtils";
import { CheckListItem } from "./CheckListitem";

export const CatalogueProductList = ({productList, productSet}) => {
    const { SERVER_ADDRESS } = useAppContext();
    const [productsInSet, setProductsInSet] = useState([]);
    const [checklist, setChecklist] = useState([]);
    const [loading, setLoading] = useState(false);

    const getProductsInSet = async (productSetId) => {
        setLoading(true);
        
        await axios.get(`${SERVER_ADDRESS}/api/productset/${productSetId}`)
        .then((response) => {
            setProductsInSet(response.data);
        }).catch((error) => {
            console.debug(error);
        });

        setLoading(false);
    };

    useEffect(() => {
        //compare product list to products in set and add to checklist
        let tempChecklist = [];
        
        for(let i = 0; i < productList.length; i++){
            let found = false;
            for(let j = 0; j < productsInSet.length; j++){
                if(productList[i].displayName === productsInSet[j].displayName){
                    found = true;
                    break;
                }
            }
            tempChecklist.push({
                product: productList[i],
                checked: found,
            });
        }

        setChecklist(tempChecklist);

    }, [productsInSet]);

    useEffect(() => {
        getProductsInSet(getProductID(productSet.displayName));
    }, [productSet]);

    return (
        <View style={{ width: "100%", height: "auto" }}>
            <Text
                style={{
                    ...textStyles.header1,
                    textAlign: "center",
                }}>
                Add/Remove Products
            </Text>
            <Text
                style={{
                    fontSize: 14,
                    textAlign: "center",
                }}>
                Select the products you want to add to this set
            </Text>
            <Card style={{ width: "100%", height: "auto", padding: 10 }}>
                {loading && <LinearProgress />}
                <ScrollView style={{ width: "100%", height: 500 }}>
                    {checklist?.map((item, i) => {
                        return (
                            <CheckListItem
                                key={i}
                                item={item}
                                setLoading={setLoading}
                                productSet={productSet}
                            />
                        );
                    })}
                </ScrollView>
            </Card>
        </View>
    );
};