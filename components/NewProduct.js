import React, { useEffect } from "react";
import { Button, Card, Icon, Input, useTheme } from "@rneui/themed";
import { View, Text, ToastAndroid, ScrollView, Pressable, ActivityIndicator } from "react-native";
import { containerStyles, textStyles } from "../Styles";
import * as ImagePicker from "expo-image-picker";
import { Dropdown } from "react-native-element-dropdown";
import axios from "axios";
import { useAppContext } from "../context/Context";

export const CATEGORY = {
    HOME: "homegoods-v2",
    FASHION: "apparel-v2",
    TOYS: "toys-v2",
    PACK: "packagedgoods-v1",
    GENERAL: "general-v1",
};

export const SERVER_ADDRESS = "https://visibuy-vision-ukkxew3r5q-uc.a.run.app"; //"http://10.0.2.2:4444";

export const NewProduct = () => {
    const { theme } = useTheme();
    const [dropdown, setDropdown] = React.useState("Category");
    const [loading, setLoading] = React.useState(false);
    const {newProduct, setNewProduct, resetNewProduct, showToast } = useAppContext();
    //const [image, setImage] = React.useState(null);

    const [permission, requestCameraPermission] =
        ImagePicker.useCameraPermissions();

    //method to pick image from gallery
    const pickImage = async () => {
        if (!permission) {
            requestCameraPermission();
        }

        try {
            let result = await ImagePicker.launchImageLibraryAsync({
                mediaTypes: ImagePicker.MediaTypeOptions.All,
                allowsMultipleSelection: true,
                quality: 1,
                aspect: [1, 1],
            });

            if (result.canceled) {
                showToast("Cancelled");
            } else {
                //setImage(result.assets[0].uri);
                if (newProduct.images.length <= 10) {
                    setNewProduct({
                        ...newProduct,
                        images: [
                            ...newProduct.images,
                            ...result.assets.map((asset) => asset.uri),
                        ],
                        types: [
                            ...newProduct.types,
                            ...result.assets.map((asset) =>
                                asset.uri.substring(
                                    asset.uri.lastIndexOf(".") + 1
                                )
                            ), //extract the data types of the images
                        ],
                    });
                } else {
                    showToast("You can only select 10 images");
                }
            }
        } catch (error) {
            showToast(error.message);
        }
    };

    //method to take image from camera
    const takeImage = async () => {
        if (!permission) {
            requestCameraPermission();
        }

        try {
            let result = await ImagePicker.launchCameraAsync({
                mediaTypes: ImagePicker.MediaTypeOptions.All,
                allowsEditing: true,
                quality: 1,
                aspect: [1, 1],
            });

            if (result.canceled) {
                showToast("Cancelled");
            } else {
                //setImage(result.assets[0].uri);
                setNewProduct({
                    ...newProduct,
                    images: [...newProduct.images, result.assets[0].uri],
                    types: [
                        ...newProduct.types,
                        result.assets[0].uri.substring(
                            result.assets[0].uri.lastIndexOf(".") + 1
                        ), //extract the data type of the image 
                    ],
                });
            }
        } catch (error) {
            showToast(error.message);
        }
    };

    //method to add product
    const onPressAddProduct = async () => {
        if (newProduct.name === "") {
            showToast("Please enter product name");
        } else if (newProduct.category === "") {
            showToast("Please select product category");
        } else if (newProduct.price === "") {
            showToast("Please enter product price");
        } else if (newProduct.size === "") {
            showToast("Please enter product size");
        } else if (newProduct.color === "") {
            showToast("Please enter product color");
        } else if (newProduct.description === "") {
            showToast("Please enter product description");
        } else if (newProduct.images.length === 0) {
            showToast("Please select product images");
        } else {
            setLoading(true);

            //create new product request body
            const body = {
                name: newProduct.name,
                category: newProduct.category,
                price: newProduct.price,
                size: newProduct.size,
                color: newProduct.color,
                description: newProduct.description,
            };

            const formData = new FormData();

            //append product data to form data
            formData.append("product", JSON.stringify(body));

            //append images list to form data
            newProduct.images.forEach((image, index) => {
                formData.append("images", {
                    name: `${newProduct.name
                        .replace(/\s+/g, "-")
                        .toLowerCase()}-image-${index}.${
                        newProduct.types[index]
                    }`,
                    type: `image/${newProduct.types[index]}`,
                    uri: image,
                });
            });

            await axios
                .post(`${SERVER_ADDRESS}/api/product`, formData, {
                    headers: {
                        "Content-Type": "multipart/form-data",
                    },
                })
                .then((response) => {
                    showToast(response.data.message);
                    resetNewProduct();
                })
                .catch((err) => {
                    showToast(err.message);
                });
            
            setLoading(false);
        }
    };

    useEffect(()=>{
        if(newProduct.category !== ""){
            setDropdown(newProduct.category);
        } else {
            setDropdown("Category");
        }
    }, [newProduct])

    return (
        <View style={containerStyles.baseContainer}>
            <ScrollView
                style={{ width: "100%" }}
                contentContainerStyle={{ alignItems: "center" }}>
                <Text style={textStyles.header1}>New Product</Text>
                <Input
                    value={newProduct.name}
                    style={textStyles.body}
                    onChangeText={(text) =>
                        setNewProduct({ ...newProduct, name: text })
                    }
                    containerStyle={containerStyles.inputContainer}
                    placeholder="Product Name"
                />

                <View style={{ width: "80%", marginBottom: 10 }}>
                    <Dropdown
                        data={[
                            { label: "Home Goods", value: CATEGORY.HOME },
                            { label: "Fashion", value: CATEGORY.FASHION },
                            { label: "Toys", value: CATEGORY.TOYS },
                            { label: "Packed Goods", value: CATEGORY.PACK },
                            { label: "General", value: CATEGORY.GENERAL },
                        ]}
                        style={textStyles.body}
                        value={dropdown}
                        onChange={(item) => {
                            setNewProduct({
                                ...newProduct,
                                category: item.value,
                            });
                        }}
                        placeholder={dropdown}
                        placeholderStyle={{
                            color: theme.colors.grey3,
                            fontSize: 16,
                        }}
                        renderItem={(item) => {
                            return (
                                <View
                                    style={{
                                        paddingVertical: 17,
                                        paddingHorizontal: 4,
                                        flexDirection: "row",
                                        justifyContent: "space-between",
                                        alignItems: "center",
                                    }}>
                                    <Text
                                        style={{
                                            flex: 1,
                                            fontSize: 16,
                                            paddingHorizontal: 10,
                                        }}>
                                        {item.label}
                                    </Text>
                                </View>
                            );
                        }}
                    />
                </View>

                <Input
                    value={newProduct.price}
                    onChangeText={(text) =>
                        setNewProduct({ ...newProduct, price: text })
                    }
                    keyboardType="numeric"
                    style={textStyles.body}
                    containerStyle={containerStyles.inputContainer}
                    placeholder="Price"
                />
                <Input
                    value={newProduct.size}
                    onChangeText={(text) =>
                        setNewProduct({ ...newProduct, size: text })
                    }
                    style={textStyles.body}
                    containerStyle={containerStyles.inputContainer}
                    placeholder="Size"
                />
                <Input
                    value={newProduct.color}
                    onChangeText={(text) =>
                        setNewProduct({ ...newProduct, color: text })
                    }
                    style={textStyles.body}
                    containerStyle={containerStyles.inputContainer}
                    placeholder="Package color"
                />
                <Input
                    value={newProduct.description}
                    onChangeText={(text) =>
                        setNewProduct({ ...newProduct, description: text })
                    }
                    style={textStyles.body}
                    containerStyle={containerStyles.inputContainer}
                    placeholder="Description"
                />

                <View
                    style={{
                        flexDirection: "row",
                        justifyContent: "space-between",
                        marginVertical: 10,
                    }}>
                    <Button
                        onPress={pickImage}
                        containerStyle={{ margin: 5, borderRadius: 5 }}
                        titleStyle={{ color: theme.colors.buttonText }}>
                        <Icon
                            containerStyle={{ marginEnd: 5 }}
                            name="image"
                            color={theme.colors.buttonIcon}
                        />
                        Select Image
                    </Button>
                    <Button
                        onPress={takeImage}
                        containerStyle={{ margin: 5, borderRadius: 5 }}
                        titleStyle={{ color: theme.colors.buttonText }}>
                        <Icon
                            containerStyle={{ marginEnd: 5 }}
                            name="camera"
                            color={theme.colors.buttonIcon}
                        />
                        Take Image
                    </Button>
                </View>

                <View style={{ flex: 1 }}>
                    <ScrollView horizontal>
                        {newProduct !== null &&
                            newProduct.images.length > 0 &&
                            newProduct.images.map((image, index) => {
                                return (
                                    <View key={index}>
                                        <Card
                                            containerStyle={{
                                                borderRadius: 5,
                                            }}>
                                            <Card.Image
                                                source={{ uri: image }}
                                                style={{
                                                    width: 150,
                                                    height: 150,
                                                }}
                                            />
                                            <Card.Divider />
                                            <Button
                                                onPress={() => {
                                                    setNewProduct({
                                                        ...newProduct,
                                                        images: newProduct.images.filter(
                                                            (img, i) =>
                                                                i !== index
                                                        ),
                                                        types: newProduct.types.filter(
                                                            (type, i) =>
                                                                i !== index
                                                        ),
                                                    });
                                                }}
                                                containerStyle={{
                                                    margin: 5,
                                                    borderRadius: 5,
                                                }}
                                                titleStyle={{
                                                    color: theme.colors
                                                        .buttonText,
                                                }}>
                                                <Icon
                                                    name="delete"
                                                    color={
                                                        theme.colors.buttonIcon
                                                    }
                                                />
                                            </Button>
                                        </Card>
                                    </View>
                                );
                            })}
                    </ScrollView>
                </View>
            </ScrollView>

            <Button
                onPress={onPressAddProduct}
                containerStyle={{ margin: 20, borderRadius: 5 }}
                titleStyle={{
                    ...textStyles.mainButtonText,
                    color: theme.colors.buttonText,
                }}>
                { loading && <ActivityIndicator color={theme.colors.buttonText} /> }
                Add Product
            </Button>
        </View>
    );
};
