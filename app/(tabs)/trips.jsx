// import React from "react";
// import { View, Text, StyleSheet, FlatList, Image } from "react-native";
// import { useAuth } from "../context/contextLogin";

// const VoyagesScreen = () => {
//     const { reservations } = useAuth();

//     const renderReservation = ({ item }) => (
//         <View style={styles.card}>
//             <Image source={{ uri: item.propertyImage }} style={styles.image} />
//             <Text style={styles.propertyName}>{item.property}</Text>
//             <Text style={styles.dateRange}>Dates : {item.dateRange}</Text>
//             <Text style={styles.voyageurs}>Voyageurs : {item.voyageurs}</Text>
//             <Text style={styles.total}>Total : {item.total} $</Text>
//             <Text style={styles.paymentMethod}>
//                 Méthode de paiement : {item.paymentMethod}
//             </Text>
//         </View>
//     );

//     return (
//         <View style={styles.container}>
//             <Text style={styles.title}>Mes Voyages</Text>
//             {reservations.length > 0 ? (
//                 <FlatList
//                     data={reservations}
//                     keyExtractor={(item) => item.id}
//                     renderItem={renderReservation}
//                 />
//             ) : (
//                 <Text style={styles.noReservations}>
//                     Vous n'avez pas encore de réservations.
//                 </Text>
//             )}
//         </View>
//     );
// };

// const styles = StyleSheet.create({
//     container: {
//         flex: 1,
//         backgroundColor: "#fff",
//         padding: 16,
//     },
//     title: {
//         fontSize: 24,
//         fontWeight: "bold",
//         marginBottom: 16,
//     },
//     card: {
//         backgroundColor: "#f9f9f9",
//         padding: 16,
//         borderRadius: 8,
//         marginBottom: 16,
//         elevation: 3,
//     },
//     propertyName: {
//         fontSize: 18,
//         fontWeight: "bold",
//         marginBottom: 8,
//     },
//     dateRange: {
//         fontSize: 16,
//         marginBottom: 4,
//     },
//     voyageurs: {
//         fontSize: 16,
//         marginBottom: 4,
//     },
//     total: {
//         fontSize: 16,
//         marginBottom: 4,
//         fontWeight: "bold",
//     },
//     paymentMethod: {
//         fontSize: 14,
//         color: "#666",
//     },
//     noReservations: {
//         fontSize: 16,
//         textAlign: "center",
//         marginTop: 32,
//         color: "#999",
//     },
//     image: {
//         width: "100%",
//         height: 80,
//         borderRadius: 10,
//         marginBottom: 10,
//     },
// });

// export default VoyagesScreen;

import React from "react";
import { View, Text, StyleSheet, FlatList, Image } from "react-native";
import { useAuth } from "../context/contextLogin";

const VoyagesScreen = () => {
    const { reservations } = useAuth();

    const renderReservation = ({ item }) => (
        <View style={styles.card}>
            <Image source={{ uri: item.propertyImage }} style={styles.image} />
            <View style={styles.details}>
                <Text style={styles.propertyName}>{item.property}</Text>
                <Text style={styles.dateRange}>Dates : {item.dateRange}</Text>
                <Text style={styles.voyageurs}>
                    Voyageurs : {item.voyageurs}
                </Text>
                <Text style={styles.total}>Total : {item.total} $</Text>
                {/* <Text style={styles.paymentMethod}>
                    Méthode de paiement : {item.paymentMethod}
                </Text> */}
            </View>
        </View>
    );

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Mes Voyages</Text>
            {reservations.length > 0 ? (
                <FlatList
                    data={reservations}
                    keyExtractor={(item) => item.id}
                    renderItem={renderReservation}
                />
            ) : (
                <Text style={styles.noReservations}>
                    Vous n'avez pas encore de réservations.
                </Text>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
        padding: 16,
    },
    title: {
        fontSize: 24,
        fontWeight: "bold",
        marginBottom: 16,
    },
    card: {
        backgroundColor: "#f9f9f9",
        flexDirection: "row",
        padding: 16,
        borderRadius: 8,
        marginBottom: 16,
        elevation: 3,
    },
    image: {
        width: 80,
        height: 80,
        borderRadius: 10,
        marginRight: 16,
    },
    details: {
        flex: 1,
        justifyContent: "space-between",
    },
    propertyName: {
        fontSize: 18,
        fontWeight: "bold",
        marginBottom: 8,
    },
    dateRange: {
        fontSize: 16,
        marginBottom: 4,
    },
    voyageurs: {
        fontSize: 16,
        marginBottom: 4,
    },
    total: {
        fontSize: 16,
        marginBottom: 4,
        fontWeight: "bold",
    },
    paymentMethod: {
        fontSize: 14,
        color: "#666",
    },
    noReservations: {
        fontSize: 16,
        textAlign: "center",
        marginTop: 32,
        color: "#999",
    },
});

export default VoyagesScreen;
