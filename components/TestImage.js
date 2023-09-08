import React, { useState } from "react";
import { View } from "react-native";
import * as ImagePicker from "expo-image-picker";
import { useAppContext } from "../context/Context";

export const TestImage = () => {
    const [image, setImage] = useState(null);
    const [permission, requestCameraPermission] = ImagePicker.useCameraPermissions();
    const { showToast, SERVER_ADDRESS } = useAppContext();

    //method to take picture from camera
    const takePicture = async () => {
        if (!permission) {
            requestCameraPermission();
        }

        try {
            const result = await ImagePicker.launchCameraAsync({
                mediaTypes: ImagePicker.MediaTypeOptions.All,
                quality: 1,
                base64: true,
            });
    
            if (!result.cancelled) {
                setImage(result.assets[0].uri);
            } else {
                showToast("Cancelled");
            }
        } catch (error) {
            showToast("Error taking picture");
        }
    };

    //send image to vision api
    const sendImage = async () => {
        if (image) {
            try {
                //do things here
            } catch (error) {
                showToast("Error sending image");
            }
        } else {
            showToast("No image to send");
        }
    };

    return (
        <View>
            {/* camera button */}
            {/* original image */}
            {/* result image */}
            <Image
                source={{ uri: image.uri }}
                style={{ width: 200, height: 200 }}
            />
            {/* result details */}
        </View>
    );
};