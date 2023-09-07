import { Button, Icon, useTheme } from "@rneui/themed";
import { View, Text, ScrollView } from "react-native";
import { useAppContext } from "../context/Context";

export const CatalogueList = ({ productSets, getProductSets, setLoading }) => {
    const { theme } = useTheme();
    const { setTab } = useAppContext();

    return (
        <View style={{ width: "100%", flex: 1 }}>
            <ScrollView style={{ width: "100%" }}>
                {
                    (productSets !== null &&
                    productSets !== undefined) &&
                    productSets.map((productSet, i) => {
                        return (
                            <View
                                key={i}
                                style={{
                                    width: "100%",
                                    height: "auto",
                                    overflow: "hidden",
                                }}>
                                <Text style={{
                                    fontSize: 18,
                                    fontWeight: "bold",
                                    color: theme.colors.primary,
                                    margin: 10,
                                    }}>
                                    {productSet.displayName}
                                </Text>
                                <Text style={{
                                    fontSize: 14,
                                    fontWeight: "bold",
                                    color: theme.colors.primary,
                                    margin: 10,
                                    }}>
                                    {productSet.description}
                                </Text>
                                <View style={{
                                    borderWidth: 1,
                                    height: 1,
                                    width: "100%",
                                    borderColor: theme.colors.grey5,
                                    marginBottom: 5,
                                    }} />
                                <View style={{ alignItems: "center" }}>
                                    <Text style={{ fontWeight: "bold" }}>Products</Text>
                                    {
                                        productSet.products.map((product, i) => {
                                            return (
                                                <Text key={i}>{product.displayName}</Text>
                                            );
                                        })
                                    }
                                </View>
                            </View>
                        );
                    })
                }
                <Button
                    onPress={() => setTab("newset")}
                    containerStyle={{ margin: 5, borderRadius: 5 }}
                    titleStyle={{ color: theme.colors.buttonText }}>
                    <Icon
                        name="add-circle"
                        size={25}
                        color={theme.colors.buttonIcon}
                    />
                    NEW
                </Button>
            </ScrollView>
        </View>
    );
};