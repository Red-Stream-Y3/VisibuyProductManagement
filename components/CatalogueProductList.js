import { Card, CheckBox } from "@rneui/themed";
import React, { useEffect } from "react";
import { ScrollView, Text, View } from "react-native";
import { textStyles } from "../Styles";

export const CatalogueProductList = ({productSet}) => {

    // useEffect(() => {
    //     console.debug(productSet);
    // }, []);

    return (
        <View style={{ width: "100%", height: "auto" }}>
            <Text style={textStyles.header1} >Add/Remove Products</Text>
            <Card style={{ width: "100%", height: "auto", padding: 10 }}>
                <ScrollView style={{ width: "100%", height: "auto"}}>
                    {productSet?.products?.map((product, i) => {
                        return (
                            <View key={i} style={{ width: "50%", height: "auto", padding: 10, flexDirection: "row" }}>
                                <CheckBox
                                    label={product.name}
                                    checked={true}
                                    onChange={() => { }}
                                />
                                <Text style={{ marginLeft: 10 }}>{product.displayName}</Text>
                            </View>
                        );
                    })}
                </ScrollView>
            </Card>
        </View>
    );
};