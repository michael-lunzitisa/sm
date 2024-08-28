import { View, Text, FlatList, Image, StyleSheet } from "react-native";
import React from "react";
import { Ionicons } from "@expo/vector-icons";

const Whislist = ({ favorites, listings }) => {
    const favoriteListings = listings.filter((item) => favorites[item.id]);

    const renderFavoriteItem = ({ item }) => (
        <View style={styles.item}>
            <Image source={{ uri: item.featuredImage }} style={styles.image} />
            <Text style={styles.title}>{item.title}</Text>
            <View style={styles.details}>
                <Ionicons name="star-sharp" size={16} color="black" />
                <Text>{item.rating}</Text>
            </View>
        </View>
    );

    return (
        <View style={styles.container}>
            <Text style={styles.header}>Whislist</Text>
            <FlatList
                data={favoriteListings}
                renderItem={renderFavoriteItem}
                keyExtractor={(item) => item.id.toString()}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
    },
    header: {
        fontSize: 24,
        fontWeight: "bold",
    },
    item: {
        padding: 16,
        marginVertical: 8,
        borderRadius: 10,
        borderColor: "#ddd",
        borderWidth: 1,
    },
    image: {
        width: "100%",
        height: 150,
        borderRadius: 10,
    },
    title: {
        fontSize: 18,
        fontWeight: "bold",
    },
    details: {
        flexDirection: "row",
        alignItems: "center",
        marginTop: 8,
    },
});

export default Whislist;
