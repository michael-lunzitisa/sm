import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import React from "react";
import { useLocalSearchParams } from "expo-router";
import listingsData from "@/assets/data/listings.json";
import { Ionicons } from "@expo/vector-icons";
import { Colors } from "@/constants/Colors";
import { defaulStyles } from "@/constants/Styles";

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
            <View style={styles.infoContainer}>
                <Text style={styles.name}>{listing.name}</Text>
                <Text style={styles.location}>
                    {listing.room_type} in {listing.smart_location}
                </Text>
                <Text style={styles.rooms}>
                    {listing.guest_include} guest {listing.bedrooms}bedrooms.
                    {listing.bathrooms}bathrooms
                </Text>
                <View style={{ flexDirection: "row", gap: 4 }}>
                    <Ionicons name="star" size={16} />
                    <Text style={styles.ratings}>
                        {listing.rating / 20}.{listing.number_of_reviews}
                        reviews
                    </Text>
                </View>
                <View style={styles.divider} />

                <View style={styles.hostView}>
                    <Image
                        source={{ uri: listing.image }}
                        style={styles.host}
                    />

                    <View>
                        <Text style={{ fontWeight: "500", fontSize: 16 }}>
                            hosted by {listing.host_name}
                        </Text>
                        <Text>host since {listing.host_since}</Text>
                    </View>
                </View>
                <View style={styles.divider} />
                <Text style={styles.description}>{listing.description}</Text>
            </View>

            <View
                style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                    alignItems: "center",
                    paddingHorizontal: 20,
                }}
            >
                <TouchableOpacity>
                    <Text style={styles.footerPrice}>${listing.price}</Text>
                    <Text>night</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={[defaulStyles.btn, { paddingHorizontal: 20 }]}
                >
                    <Text style={defaulStyles.btnText}>Réserver</Text>
                </TouchableOpacity>
            </View>
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
    infoContainer: {
        padding: 24,
        backgroundColor: "#fff",
    },
    name: {
        fontSize: 26,
        fontWeight: "bold",
        fontFamily: "mon-sb",
    },
    location: {
        fontSize: 18,
        fontFamily: "mon-sb",
        marginTop: 10,
    },
    rooms: {
        fontSize: 16,
        color: Colors.gray,
        marginVertical: 4,
        fontFamily: "mon",
    },
    ratings: {
        fontSize: 16,
        fontFamily: "mon-sb",
    },
    divider: {
        height: StyleSheet.hairlineWidth,
        backgroundColor: Colors.gray,
        marginVertical: 6,
    },
    host: {
        width: 50,
        height: 50,
        borderRadius: 50,
        backgroundColor: Colors.gray,
    },
    hostView: {
        flexDirection: "row",
        alignItems: "center",
        gap: 12,
    },
    description: {
        fontSize: 16,
        marginTop: 10,
        fontFamily: "mon",
    },
    footerText: {
        height: "100%",
        justifyContent: "center",
        flexDirection: "row",
        alignItems: "center",
        gap: 4,
    },
    footerPrice: {
        fontSize: 18,
        fontFamily: "mon-sb",
    },
});

export default Page;
