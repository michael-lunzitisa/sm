import {
    View,
    Text,
    StyleSheet,
    Image,
    TouchableOpacity,
    Share,
} from "react-native";
import React, { useLayoutEffect } from "react";
import { useLocalSearchParams, useNavigation, useRouter } from "expo-router";
import listingsData from "../../assets/data/listings.json";
import { Ionicons } from "@expo/vector-icons";
import { Colors } from "../../constants/Colors";
import { defaulStyles } from "../../constants/Styles";
import Animated, { SlideInDown } from "react-native-reanimated";
import { useAuth } from "../context/contextLogin";

const Page = () => {
    const { id } = useLocalSearchParams();
    const listing = listingsData.find((item) => item.id === id);
    const router = useRouter();
    const navigation = useNavigation();
    const { user } = useAuth(); // Récupérer l'utilisateur du contexte

    const shareList = async () => {
        try {
            await Share.share({
                title: listing.title,
                url: listing.listing_url,
            });
        } catch (error) {
            console.log(error);
        }
    };

    const handleReservation = () => {
        if (user) {
            // L'utilisateur est connecté, ouvrir le modal de paiement
            router.push({
                pathname: "(modals)/pay",
                params: { id: listing.id },
            });
        } else {
            // L'utilisateur n'est pas connecté, rediriger vers l'écran de connexion
            router.push("/login");
        }
    };

    useLayoutEffect(() => {
        navigation.setOptions({
            headerBackround: () => <Animated.View style={[styles.header]} />,
            headerRight: () => (
                <View style={styles.bar}>
                    <TouchableOpacity
                        style={styles.roundeButton}
                        onPress={shareList}
                    >
                        <Ionicons
                            name="share-outline"
                            size={22}
                            color={"#000"}
                        />
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={styles.roundeButton}
                        onPress={shareList}
                    >
                        <Ionicons
                            name="heart-outline"
                            size={22}
                            color={"#000"}
                        />
                    </TouchableOpacity>
                </View>
            ),
            headerLeft: () => (
                <TouchableOpacity
                    style={styles.roundeButton}
                    onPress={shareList}
                >
                    <Ionicons
                        name="chevron-back"
                        size={24}
                        color={"#000"}
                        onPress={() => navigation.goBack()}
                    />
                </TouchableOpacity>
            ),
        });
    }, []);

    if (!listing) {
        return (
            <View style={styles.container}>
                <Text>Listing not found</Text>
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <Image
                source={{ uri: listing.featuredImage }}
                style={styles.image}
            />
            <View style={styles.infoContainer}>
                <Text style={styles.name}>{listing.title}</Text>
                <Text style={styles.location}>
                    {listing.room_type} in {listing.smart_location}
                </Text>
                <Text style={styles.rooms}>
                    {listing.maxGuests} voyageurs. {listing.bedrooms} chambres.
                    {listing.bed} lits. {listing.bathrooms} salles de bains
                </Text>
                <View style={{ flexDirection: "row", gap: 4 }}>
                    <Ionicons name="star" size={16} />
                    <Text style={styles.ratings}>
                        {listing.rating}.{listing.reviewStart} reviews
                    </Text>
                </View>
                <View style={styles.divider} />

                <View style={styles.hostView}>
                    <Image
                        source={{ uri: listing.featuredImage }}
                        style={styles.host}
                    />
                    <View>
                        <Text style={{ fontWeight: "500", fontSize: 16 }}>
                            Hôte: {listing.host_name}
                        </Text>
                        <Text>{listing.host_since}</Text>
                    </View>
                </View>
                <View style={styles.divider} />
                <Text style={styles.description}>{listing.description}</Text>
            </View>
            <Animated.View
                style={defaulStyles.footer}
                entering={SlideInDown.delay(200)}
            >
                <View
                    style={{
                        flexDirection: "row",
                        justifyContent: "space-between",
                        alignItems: "center",
                    }}
                >
                    <TouchableOpacity style={styles.footerText}>
                        <Text style={styles.footerPrice}>${listing.price}</Text>
                        <Text>night</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={[defaulStyles.btn, { paddingHorizontal: 20 }]}
                        onPress={handleReservation}
                    >
                        <Text style={defaulStyles.btnText}>Réserver</Text>
                    </TouchableOpacity>
                </View>
            </Animated.View>
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
    bar: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        gap: 10,
    },
    roundeButton: {
        width: 40,
        height: 40,
        borderRadius: 50,
        backgroundColor: "#fff",
        alignItems: "center",
        justifyContent: "center",
        color: Colors.primary,
        borderWidth: StyleSheet.hairlineWidth,
        borderColor: Colors.gray,
    },
    header: {
        backgroundColor: "red",
        height: 100,
        borderBottomColor: Colors.gray,
        borderWidth: StyleSheet.hairlineWidth,
    },
});

export default Page;
