import React from "react";
import { Button, Input, useTheme } from "@rneui/themed/dist";
import { View, Text, ToastAndroid } from "react-native";
import { containerStyles, textStyles } from "../Styles";
import * as ImagePicker from 'expo-image-picker';
import { Image } from "@rneui/base/dist";

export const NewProduct = () => {

    const {theme} = useTheme();
    const [image, setImage] = React.useState(null);

    const showToast = (message) => {
        ToastAndroid.show(message, ToastAndroid.SHORT);
    };

    const [permission, requestCameraPermission] = ImagePicker.useCameraPermissions();

    const pickImage = async () => {
        if (!permission) {
            requestCameraPermission();
        }

        try {
            let result = await ImagePicker.launchImageLibraryAsync({
                mediaTypes: ImagePicker.MediaTypeOptions.All,
                allowsEditing: true,
                quality: 1,
                aspect: [4, 3],
            });

            if (result.canceled) {
                showToast("Cancelled");
            } else {
                setImage(result.assets[0].uri);
            }
        } catch (error) {
            showToast(error.message);
        }
    }

    return (
        <View style={containerStyles.baseContainer}>
            <Text style={textStyles.header1}>New Product</Text>
            <Input 
                style={textStyles.body} 
                containerStyle={containerStyles.inputContainer} 
                placeholder="Product Name" />
            <Input 
                style={textStyles.body} 
                containerStyle={containerStyles.inputContainer} 
                placeholder="Price" />
            <Input 
                style={textStyles.body} 
                containerStyle={containerStyles.inputContainer} 
                placeholder="Size" />
            <Input 
                style={textStyles.body} 
                containerStyle={containerStyles.inputContainer} 
                placeholder="Package color" />
            <Button onPress={pickImage}>Select Image</Button>
            {image!==null && <Image source={{uri: image}} style={{width: 200, height: 200}} />}
        </View>
    );
};