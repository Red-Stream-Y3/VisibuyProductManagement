import React, { useEffect } from "react";
import { Button, Card, Icon, Input, useTheme } from "@rneui/themed";
import { View, Text, ScrollView, ActivityIndicator, Image } from "react-native";
import { containerStyles, textStyles } from "../Styles";
import * as ImagePicker from "expo-image-picker";
import { Dropdown } from "react-native-element-dropdown";
import axios from "axios";
import { useAppContext } from "../context/Context";
import { getProductID } from "../utils/ProductUtils";
// import RNEventSource from "react-native-event-source";

export const CATEGORY = {
    HOME: "homegoods-v2",
    FASHION: "apparel-v2",
    TOYS: "toys-v2",
    PACK: "packagedgoods-v1",
    GENERAL: "general-v1",
};


export const NewProduct = ({editProduct, setEditSelect, setShowEdit, getProducts}) => {
    const { theme } = useTheme();
    const [dropdown, setDropdown] = React.useState("Category");
    const [images, setImages] = React.useState(null);
    const [loading, setLoading] = React.useState(false);
    const [edited, setEdited] = React.useState([]);
    const {
        newProduct,
        setNewProduct,
        resetNewProduct,
        showToast,
        SERVER_ADDRESS,
    } = useAppContext();
    //const [image, setImage] = React.useState(null);

    const [permission, requestCameraPermission] = ImagePicker.useCameraPermissions();

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
            console.debug(error);
        }
    };

    const getEditItem = async () => {
        await axios
            .get(
                `${SERVER_ADDRESS}/api/product/${getProductID(
                    editProduct.displayName
                )}/referenceimage`
            )
            .then((response) => {
                setNewProduct({
                    name: editProduct.displayName,
                    category: "packagedgoods-v1",
                    size: editProduct.productLabels?.filter((label) => label.key === "size")[0]?.value,
                    price: editProduct.productLabels?.filter((label) => label.key === "price")[0]?.value,
                    color: editProduct.productLabels?.filter((label) => label.key === "color")[0]?.value,
                    description: editProduct.description,
                    images: response.data.map((image) => "https://storage.googleapis.com/"+String(image.uri).split("gs://")[1]),
                    types: response.data.map((image) =>
                        String(image.uri).substring(String(image.uri).lastIndexOf(".") + 1)
                    ),
                });
            })
            .catch((err) => {
                showToast(err.message);
            });
    };

    useEffect(() => {
        if (editProduct !== undefined && editProduct !== null) {
            getEditItem();
        }
    }, []);

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

            try {
                let response;
                const formData = new FormData();

                if (!editProduct) {
                    //create new product request body
                    const body = {
                        name: newProduct.name,
                        category: newProduct.category,
                        price: newProduct.price,
                        size: newProduct.size,
                        color: newProduct.color,
                        description: newProduct.description,
                    };

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

                    response = await axios.post(
                        `${SERVER_ADDRESS}/api/product`,
                        formData,
                        {
                            headers: {
                                "Content-Type": "multipart/form-data",
                            },
                        }
                    );
                } else {
                    const editBody = {
                        name: newProduct.name,
                    };
                    
                    if (edited.includes("CATEGORY")) {
                        editBody.category = newProduct.category;
                    }
                    if (edited.filter((item) => item === "PRICE" || item === "SIZE" || item === "COLOR").length > 0) {
                        editBody.price = newProduct.price;
                        editBody.size = newProduct.size;
                        editBody.color = newProduct.color;
                    }
                    if (edited.includes("DESCRIPTION")) {
                        editBody.description = newProduct.description;
                    }
                    if (edited.includes("IMAGES")) {
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
                    }

                    formData.append("product", JSON.stringify(editBody));

                    response = await axios.put(
                        `${SERVER_ADDRESS}/api/product/`,
                        formData,
                        {
                            headers: {
                                "Content-Type": "multipart/form-data",
                            },
                        }
                    );
                }

                if (response) {
                    if (!response.data.error) {
                        showToast(response.data.message);
                        resetNewProduct();
                        if (editProduct) {
                            setEditSelect(null);
                            setShowEdit(false);
                            getProducts();
                        }
                    } else {
                        showToast(
                            response.data.error.details ||
                                response.data.message ||
                                response.data.error ||
                                "Something went wrong"
                        );
                    }
                } 

                setLoading(false);
            } catch (error) {
                setLoading(false);
                console.debug(error);
            }
        }
    };

    //eventsource for newProduct
    // useEffect(() => {
    //     let eventsource;
    //     if (loading) {
    //         eventsource = new RNEventSource(`${SERVER_ADDRESS}/api/product`);
    //         eventsource.addEventListener ('message', (event) => {
    //             const data = JSON.parse(event.data);
    //             if (data.complete) {
    //                 showToast(data.message);
    //                 resetNewProduct();
    //             } else {
    //                 showToast(data.message);
    //             }
    //         });
    //     }

    //     return () => {
    //         eventsource?.removeAllListeners();
    //         eventsource?.close();
    //     };
    // }, []);

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
                <Text style={textStyles.header1}>{editProduct ? 'Edit Product' : 'New Product'}</Text>
                <Input
                    editable={!editProduct}
                    onPressIn={() => {
                        if (editProduct) showToast("Product name cannot be edited");
                    }}
                    value={newProduct.name}
                    style={textStyles.body}
                    onChangeText={(text) =>{
                        setNewProduct({ ...newProduct, name: text });
                        if (editProduct) setEdited([...edited, "NAME"]);
                    }}
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
                    onChangeText={(text) =>{
                        setNewProduct({ ...newProduct, price: text });
                        if (editProduct) setEdited([...edited, "PRICE"]);
                    }}
                    keyboardType="numeric"
                    style={textStyles.body}
                    containerStyle={containerStyles.inputContainer}
                    placeholder="Price"
                />
                <Input
                    value={newProduct.size}
                    onChangeText={(text) =>{
                        setNewProduct({ ...newProduct, size: text });
                        if (editProduct) setEdited([...edited, "SIZE"]);
                    }}
                    style={textStyles.body}
                    containerStyle={containerStyles.inputContainer}
                    placeholder="Size"
                />
                <Input
                    value={newProduct.color}
                    onChangeText={(text) =>{
                        setNewProduct({ ...newProduct, color: text });
                        if (editProduct) setEdited([...edited, "COLOR"]);
                    }}
                    style={textStyles.body}
                    containerStyle={containerStyles.inputContainer}
                    placeholder="Package color"
                />
                <Input
                    value={newProduct.description}
                    onChangeText={(text) =>{
                        setNewProduct({ ...newProduct, description: text });
                        if (editProduct) setEdited([...edited, "DESCRIPTION"]);
                    }}
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
                                            <Image
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
                                                    if (editProduct) setEdited([...edited, "IMAGES"]);
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
                {editProduct ? 'Edit Product' : 'Add Product'}
            </Button>
        </View>
    );
};
