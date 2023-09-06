import { ListItem, useTheme } from "@rneui/themed";
import { Pressable, ScrollView, Text, View } from "react-native";
import { containerStyles } from "../Styles";

export const ProductList = ({ products }) => {
    const {theme} = useTheme();

    return (
        <View style={{width: '100%', flex: 1}}>
            <ScrollView style={{width: '100%'}}>
            {(products !== null || products !== undefined) &&
                products.map((product, i) => {
                    return(
                    <ListItem key={i} containerStyle={{width: '100%'}}>
                        <Pressable android_ripple={
                            {
                                color: theme.colors.grey5,
                                borderless: true,
                                radius: 200,
                            }}
                            style={{width: '100%'}} >
                            <ListItem.Content>
                            <ListItem.Title>{product.displayName}</ListItem.Title>
                            <ListItem.Subtitle>
                                {product.productCategory}
                            </ListItem.Subtitle>
                        </ListItem.Content>
                        </Pressable>
                    </ListItem>);
                })}
            </ScrollView>

        </View>
    );
};
