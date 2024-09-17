import React from "react";
import {
    View,
    Text,
    FlatList,
    TouchableOpacity,
    Image,
    StyleSheet,
} from "react-native";
import { useAuth } from "../context/contextLogin";
import { Ionicons } from "@expo/vector-icons";
import { Link } from "expo-router";

const Whishlists = () => {
    const { favorites, removeFavorite } = useAuth();

    const renderItems = ({ item }) => (
        <Link href={`/listing/${item.id}`} asChild>
            <TouchableOpacity>
                <View style={styles.listing}>
                    <Image
                        source={{ uri: item.featuredImage }}
                        style={styles.image}
                    />
                    <TouchableOpacity
                        style={{ position: "absolute", right: 30, top: 30 }}
                        onPress={() => removeFavorite(item)}
                    >
                        <Ionicons
                            name="heart"
                            size={24}
                            color="red"
                            style={styles.roundeButton}
                        />
                    </TouchableOpacity>
                    <Text style={{ fontSize: 16, fontFamily: "mon-sb" }}>
                        {item.title}
                    </Text>
                </View>
            </TouchableOpacity>
        </Link>
    );

    return (
        <View>
            {favorites.length > 0 ? (
                <FlatList
                    data={favorites}
                    renderItem={renderItems}
                    keyExtractor={(item) => item.id.toString()}
                />
            ) : (
                <Text>No items in your wishlist</Text>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    listing: {
        padding: 16,
        gap: 10,
        marginVertical: 16,
    },
    image: {
        width: "100%",
        height: 200,
        borderRadius: 10,
    },
    roundeButton: {
        width: 29,
        height: 30,
        borderRadius: 50,
        backgroundColor: "#fff",
        alignItems: "center",
        justifyContent: "center",
        padding: 3,
    },
});

export default Whishlists;
