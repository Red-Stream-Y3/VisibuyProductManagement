import { Card, useTheme } from "@rneui/themed";
import axios from "axios";
import React, { useEffect } from "react";
import { ActivityIndicator, Image, ScrollView, Text, View } from "react-native";
import { getProductID } from "../utils/ProductUtils";
import { useAppContext } from "../context/Context";

export const ProductCard = ({ product }) => {
    const [images, setImages] = React.useState(null);
    const { theme } = useTheme();
    const { SERVER_ADDRESS, showToast } = useAppContext();

    const getImages = async () => {
        await axios
            .get(
                `${SERVER_ADDRESS}/api/product/${getProductID(
                    product.displayName
                )}/referenceimage`
            )
            .then((response) => {
                setImages(response.data);
            })
            .catch((err) => {
                showToast(err.message);
            });
    };

    useEffect(() => {
        if (product !== undefined && product !== null) {
            getImages();
        }
    }, [product]);

    return (
        <View style={{ width: "100%", height: "auto", overflow: "hidden" }}>
            <Card>
                <ScrollView
                    style={{ width: "100%", height: "auto" }}
                    contentContainerStyle={{ alignItems: "center" }}>
                    <Text style={{ fontSize: 18, fontWeight: "bold" }}>
                        {product.displayName}
                    </Text>
                    <Text>Category : {product.productCategory}</Text>
                    <View style={{
                        borderWidth: 1, 
                        height: 1, 
                        width: "100%", 
                        borderColor: theme.colors.grey5,
                        marginBottom: 5,
                        }} />
                    <View style={{ alignItems: "center" }}>
                        <Text style={{ fontWeight: "bold" }}>Description</Text>
                        <Text>{product.description}</Text>

                        <Text style={{ fontWeight: "bold" }}>Labels</Text>

                        {product.productLabels !== undefined &&
                            product.productLabels !== null &&
                            product.productLabels.length > 0 &&
                            product.productLabels.map((label, i) => {
                                return (
                                    <Text key={i}>
                                        {label.key}: {label.value}
                                    </Text>
                                );
                            })}
                            
                        <View style={{ alignItems: "center" }}>
                            <Text style={{ fontWeight: "bold" }}>
                                Reference Images
                            </Text>
                            <ScrollView horizontal={true}>
                                {(images === undefined || images === null) && (
                                    <ActivityIndicator
                                        size="large"
                                        color={theme.colors.primary}
                                    />
                                )}
                                {images !== undefined &&
                                    images !== null &&
                                    images.length === 0 && (
                                        <Text>[No images]</Text>
                                    )}
                                {images !== undefined &&
                                    images !== null &&
                                    images.length > 0 &&
                                    images.map((image, i) => {
                                        return (
                                            <View key={i}>
                                                <Image
                                                    source={{
                                                        uri:
                                                            "https://storage.googleapis.com/" +
                                                            String(
                                                                image.uri
                                                            ).split("gs://")[1],
                                                        width: 150,
                                                        height: 150,
                                                    }}
                                                    style={{ margin: 5 }}
                                                />
                                            </View>
                                        );
                                    })}
                            </ScrollView>
                        </View>
                    </View>
                </ScrollView>
            </Card>
        </View>
    );
};
