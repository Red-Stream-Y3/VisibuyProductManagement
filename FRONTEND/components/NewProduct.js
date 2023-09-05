import React from "react";
import { Button, Card, Icon, Input, useTheme } from "@rneui/themed";
import { View, Text, ToastAndroid, ScrollView, Pressable } from "react-native";
import { containerStyles, textStyles } from "../Styles";
import * as ImagePicker from "expo-image-picker";
import { Image } from "@rneui/base/dist";
import { Dropdown } from "react-native-element-dropdown";

export const CATEGORY = {
    HOME: "homegoods-v2",
    FASHION: "apparel-v2",
    TOYS: "toys-v2",
    PACK: "packagedgoods-v1",
    GENERAL: "general-v1",
};

export const NewProduct = ({ newProduct, setNewProduct, resetProduct }) => {
    const { theme } = useTheme();
    const [dropdown, setDropdown] = React.useState("Category");
    //const [image, setImage] = React.useState(null);

    const showToast = (message) => {
        ToastAndroid.show(message, ToastAndroid.SHORT);
    };

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
                });
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
                });
            }
        } catch (error) {
            showToast(error.message);
        }
    };

    return (
        <View style={containerStyles.baseContainer}>
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
                    value={newProduct.category}
                    onChange={(item) =>{
                        setNewProduct({ ...newProduct, category: item.value });
                        setDropdown(item.label);
                    }}
                    placeholder={dropdown}
                    placeholderStyle={{ color: theme.colors.grey3, fontSize: 16 }}
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
                                    <Card containerStyle={{ borderRadius: 5 }}>
                                        <Card.Image
                                            source={{ uri: image }}
                                            style={{ width: 150, height: 150 }}
                                        />
                                        <Card.Divider />
                                        <Button
                                            onPress={() => {
                                                setNewProduct({
                                                    ...newProduct,
                                                    images: newProduct.images.filter(
                                                        (img, i) => i !== index
                                                    ),
                                                });
                                            }}
                                            containerStyle={{
                                                margin: 5,
                                                borderRadius: 5,
                                            }}
                                            titleStyle={{
                                                color: theme.colors.buttonText,
                                            }}>
                                            <Icon
                                                name="delete"
                                                color={theme.colors.buttonIcon}
                                            />
                                        </Button>
                                    </Card>
                                </View>
                            );
                        })}
                </ScrollView>
            </View>

            <Button
                onPress={() => {
                    showToast("Product added successfully");
                }}
                containerStyle={{ margin: 20, borderRadius: 5 }}
                titleStyle={{
                    ...textStyles.mainButtonText,
                    color: theme.colors.buttonText,
                }}>
                <Icon
                    containerStyle={{ marginEnd: 5 }}
                    name="image"
                    color={theme.colors.buttonIcon}
                />
                Add Product
            </Button>
        </View>
    );
};
