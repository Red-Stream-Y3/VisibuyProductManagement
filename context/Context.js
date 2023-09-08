import React, { useEffect } from "react";
import { ToastAndroid } from "react-native";
// import DeviceInfo from "react-native-device-info";

export const AppContext = React.createContext("appContext");

export const AppProvider = ({ children }) => {
    const [newProduct, setNewProduct] = React.useState({});
    const [selectedIndex, setSelectedIndex] = React.useState(0);
    const [tab, setTab] = React.useState("main");
    const [SERVER_ADDRESS, setSERVER_ADDRESS] = React.useState("https://visibuy-vision-ukkxew3r5q-uc.a.run.app");

    const BASE_SEARCH_SET_ID = "VP-supermarket";

    //set server address
    useEffect(() => {
        // if(DeviceInfo.isEmulatorSync()){
            setSERVER_ADDRESS("http://10.0.2.2:4444");
        // }
    }, []);
    
    const showToast = (message) => {
        ToastAndroid.show(message, ToastAndroid.SHORT);
    };

    const resetNewProduct = () => {
        setNewProduct({
            name: "", //Test Product
            category: "packagedgoods-v1", //homegoods-v2
            size: "", //large
            price: "", //300.00
            color: "", //red
            description: "", //Lorem Ipsum
            images: new Array(),
            types: new Array(),
        });
    };

    //initialize newProduct
    React.useEffect(() => {
        resetNewProduct();
    }, []);

    return (
        <AppContext.Provider
            value={{
                showToast,
                selectedIndex,
                setSelectedIndex,
                newProduct,
                setNewProduct,
                resetNewProduct,
                tab,
                setTab,
                SERVER_ADDRESS,
                BASE_SEARCH_SET_ID,
            }}>
            {children}
        </AppContext.Provider>
    );
}

export const useAppContext = () => React.useContext(AppContext);