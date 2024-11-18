import { useRouter } from "expo-router";
import React from "react";
import { StyleSheet, View, Dimensions, Text } from "react-native";
import { Marker, PROVIDER_GOOGLE } from "react-native-maps";
import MapView from "react-native-map-clustering";

const ListingsMap = ({ listings }) => {
    const router = useRouter();
    const onMarkerSelected = (listings) => {
        router.push(`/listing/${listings.id}`);
    };
    if (!listings || listings.length === 0) {
        return null; // Si aucune donnée n'est disponible
    }

    const initialRegion = {
        latitude: listings[0]?.map?.lat || 0,
        longitude: listings[0]?.map?.lng || 0,
        latitudeDelta: 0.1,
        longitudeDelta: 0.1,
    };

    return (
        <View style={styles.mapContainer}>
            <MapView
                style={styles.map}
                showsUserLocation
                provider={PROVIDER_GOOGLE}
                showsMyLocationButton
                initialRegion={initialRegion}
            >
                {listings.map((listing) => (
                    <Marker
                        key={listing.id}
                        onPress={() => onMarkerSelected(listing)}
                        coordinate={{
                            latitude: listing.map.lat,
                            longitude: listing.map.lng,
                        }}
                        title={listing.title}
                        description={listing.description}
                    >
                        <View style={styles.marker}>
                            <Text style={styles.markerText}>
                                ${listing.price}
                            </Text>
                        </View>
                    </Marker>
                ))}
            </MapView>
        </View>
    );
};

const styles = StyleSheet.create({
    mapContainer: {
        flex: 1,
        width: Dimensions.get("window").width,
        height: Dimensions.get("window").height / 2, // Hauteur ajustable
    },
    map: {
        flex: 1,
    },
    marker: {
        backgroundColor: "#fff",
        // padding: 6,
        borderRadius: 5,
        alignItems: "center",
        justifyContent: "center",
        elevation: 5,
        shadowColor: "#000",
        shadowOpacity: 0.1,
        shadowRadius: 6,
        shadowOffset: {
            width: 1,
            height: 10,
        },
    },
    markerText: {
        fontSize: 14,
        fontFamily: "mon-sb",
    },
});

export default ListingsMap;
