import { View, Text, StyleSheet, Image } from "react-native";
import React from "react";
import { useLocalSearchParams } from "expo-router";
import listingsData from "@/assets/data/listings.json";

const Page = () => {
    const { id } = useLocalSearchParams();
    const listing = listingsData.find((item) => item.id === id);

    if (!listing) {
        return (
            <View style={styles.container}>
                <Text>Listing not found</Text>
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <Image source={{ uri: listing.image }} style={styles.image} />
            <Text>{listing.title}</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
    },
    image: {
        width: "100%",
        height: 200,
        resizeMode: "cover",
    },
});

export default Page;
