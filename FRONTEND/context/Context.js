import React from "react";
import { ToastAndroid } from "react-native";

export const AppContext = React.createContext("appContext");

export const AppProvider = ({ children }) => {
    const [newProduct, setNewProduct] = React.useState({});
    const [selectedIndex, setSelectedIndex] = React.useState(0);
    const [tab, setTab] = React.useState("main");
    
    const showToast = (message) => {
        ToastAndroid.show(message, ToastAndroid.SHORT);
    };

    const resetNewProduct = () => {
        setNewProduct({
            name: "Test Product",
            category: "homegoods-v2",
            size: "large",
            price: "300.00",
            color: "red",
            description: "Lorem Ipsum",
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
            }}>
            {children}
        </AppContext.Provider>
    );
}

export const useAppContext = () => React.useContext(AppContext);