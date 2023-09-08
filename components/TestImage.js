import React, { useState } from "react";
import { View } from "react-native";
import * as ImagePicker from "expo-image-picker";
import { useAppContext } from "../context/Context";
import {
    Button,
    Icon,
    Image,
    LinearProgress,
    Text,
    useTheme,
} from "@rneui/themed";
import { containerStyles, textStyles } from "../Styles";
import axios from "axios";
import { ScrollView } from "react-native";

export const TestImage = () => {
    const [image, setImage] = useState(null);
    const [permission, requestCameraPermission] = ImagePicker.useCameraPermissions();
    const [results, setResults] = useState([]);
    const [loading, setLoading] = useState(false);
    const { showToast, SERVER_ADDRESS, BASE_SEARCH_SET_ID } = useAppContext();
    const { theme } = useTheme();

    //send image to vision api
    const sendImage = async () => {
        setLoading(true);

        if (image) {
            try {
                const body = {
                    productSetId: BASE_SEARCH_SET_ID,
                    productCategory: "packagedgoods-v1",
                    filter: null,
                    cloudLink: false,
                    image: image,
                } 

                await axios.post(`${SERVER_ADDRESS}/api/search`, body)
                .then((response) => {
                    console.debug(response.data);
                    if (response.data.error) {
                        showToast(response.data.error.message);
                    } else {
                        setResults(response.data);
                    }
                })
                .catch((err) => {
                    showToast(err.message);
                    console.debug(err);
                });

            } catch (error) {
                showToast("Error sending image");
            }
        } else {
            showToast("No image to send");
        }

        setLoading(false);
    };

    const setImageSync = async (uri) => new Promise( async (resolve, reject) => {
        setImage(uri);
        resolve();
    });

    //method to take picture from camera
    const takePicture = async () => {
        if (!permission) {
            requestCameraPermission();
        }

        try {
            const result = await ImagePicker.launchCameraAsync({
                mediaTypes: ImagePicker.MediaTypeOptions.All,
                quality: 1,
                allowsEditing: false,
                base64: true,
            });

            if (!result.canceled) {
                await setImageSync(result.assets[0]).then(() => {
                    sendImage();
                });
                
            } else {
                showToast("Cancelled");
            }
        } catch (error) {
            showToast("Error taking picture");
        }
    };

    //method to select image from gallery
    const selectImage = async () => {
        if (!permission) {
            requestCameraPermission();
        }

        try {
            const result = await ImagePicker.launchImageLibraryAsync({
                mediaTypes: ImagePicker.MediaTypeOptions.All,
                quality: 1,
                allowsEditing: false,
                allowsMultipleSelection: false,
                base64: true,
            });

            if (!result.canceled) {
                await setImageSync(result.assets[0]).then(() => {
                    sendImage();
                });
            } else {
                showToast("Cancelled");
            }
        } catch (error) {
            showToast("Error selecting image");
        }
    };

    return (
        <View style={{ ...containerStyles.baseContainer }}>
            {loading && (
                <LinearProgress style={{ position: "absolute", top: 0 }} />
            )}
            {/* constol buttons */}
            <View style={{ flexDirection: "row" }}>
                <Button
                    onPress={() => takePicture()}
                    containerStyle={{ margin: 5, borderRadius: 5 }}
                    titleStyle={{ color: theme.colors.buttonText }}>
                    <Icon
                        name="camera"
                        size={25}
                        color={theme.colors.buttonIcon}
                    />
                    New Image
                </Button>
                <Button
                    onPress={() => selectImage()}
                    containerStyle={{ margin: 5, borderRadius: 5 }}
                    titleStyle={{ color: theme.colors.buttonText }}>
                    <Icon
                        name="image"
                        size={25}
                        color={theme.colors.buttonIcon}
                    />
                    Gallery
                </Button>
            </View>

            {/* original image */}
            <Image
                source={{
                    uri:
                        image?.uri ||
                        "https://storage.googleapis.com/proudcity/mebanenc/uploads/2021/03/placeholder-image.png",
                }}
                style={{ width: 200, height: 200 }}
            />
            {/* result details */}
            <Text style={{...textStyles.header1, marginTop: 5}}>Results</Text>
            {results?.length === 0 && <Text>Take an image to start...</Text>}
            <Button
                onPress={() => sendImage()}
                containerStyle={{ margin: 5, borderRadius: 5 }}
                titleStyle={{ color: theme.colors.buttonText }}>
                <Icon
                    name="refresh"
                    size={25}
                    color={theme.colors.buttonIcon}
                />
                Refresh Result
            </Button>

            <View style={{flex: 1, width: "100%", alignItems: "center"}}>
                <ScrollView
                    contentContainerStyle={{ alignItems: "center" }}
                    style={{ width: "90%" }}>
                    {results !== null &&
                        results?.map((result, i) => {
                            return (
                                <View
                                    key={i}
                                    style={{
                                        width: "90%",
                                        margin: 5,
                                        borderRadius: 10,
                                        padding: 5,
                                        borderColor: theme.colors.grey5,
                                        borderWidth: 1,
                                    }}>
                                    <Text style={{...textStyles.header2, fontWeight: "bold"}}>
                                        {result.product.displayName}{" "}
                                        {i === 0 && "(Best Match)"}
                                    </Text>
                                    <Text style={textStyles.body}>
                                        Score : {result.score}
                                    </Text>
                                </View>
                            );
                        })}
                </ScrollView>
            </View>
        </View>
    );
};
