import { View, Text, StyleSheet } from "react-native";
import React from "react";
import { Colors } from "@/constants/Colors";
import { ScrollView } from "react-native-gesture-handler";
import { GestureHandlerRootView } from "react-native-gesture-handler";

const BookingSuccess = ({ arrivalDate, endDate }) => {
    const formatDateRange = (startDate, endDate) => {
        const start = new Date(startDate).toLocaleDateString("fr-FR", {
            month: "short",
            day: "numeric",
        });
        const end = new Date(endDate).toLocaleDateString("fr-FR", {
            month: "short",
            day: "numeric",
        });
        return `${start} - ${end}`;
    };
    return (
        <GestureHandlerRootView style={{ flex: 1 }}>
            <ScrollView contentContainerStyle={styles.scrollViewContent}>
                <View style={styles.container}>
                    <View style={styles.voyageContainer}>
                        <View style={{ marginBottom: 30 }}>
                            <Text style={{ fontFamily: "mon-b", fontSize: 32 }}>
                                Votre réservation est approuvée
                            </Text>
                        </View>
                        <Text style={styles.sectionTitle}>
                            Détails de la réservation
                        </Text>
                        <View>
                            <View style={styles.detailRow}>
                                <View>
                                    <Text style={styles.detailLabel}>
                                        Numéro de reservation
                                    </Text>
                                </View>
                                <Text style={styles.modifyText}>2119,50 $</Text>
                            </View>

                            <View style={styles.detailRow}>
                                <View>
                                    <Text style={styles.detailLabel}>Date</Text>
                                </View>
                                <Text style={styles.modifyText}>
                                    26 Aug, 2024
                                </Text>
                            </View>
                            <View style={styles.detailRow}>
                                <View>
                                    <Text style={styles.detailLabel}>
                                        Total
                                    </Text>
                                </View>
                                <Text style={styles.modifyText}>2199,50 $</Text>
                            </View>

                            <View style={styles.detailRow}>
                                <View>
                                    <Text
                                        style={
                                            ([styles.detailLabel],
                                            {
                                                marginTop: 10,
                                                fontWeight: "800",
                                            })
                                        }
                                    >
                                        Mode de paiement
                                    </Text>
                                </View>
                                <Text
                                    style={[
                                        styles.modifyText,
                                        { marginTop: 10, fontWeight: "800" },
                                    ]}
                                >
                                    Carte crédit
                                </Text>
                            </View>
                        </View>
                    </View>
                </View>
            </ScrollView>
        </GestureHandlerRootView>
    );
};

const styles = StyleSheet.create({
    scrollViewContent: {
        paddingBottom: 50,
    },
    container: {
        marginVertical: 15,
        marginHorizontal: 20,
    },
    row: {
        flexDirection: "row",
        alignItems: "center",
        gap: 20,
        backgroundColor: "#fff",
        padding: 15,
        borderRadius: 10,
        elevation: 3,
        shadowColor: "#000",
        shadowOpacity: 0.1,
        shadowRadius: 4,
    },
    infoContainer: {
        flexDirection: "column",
        maxWidth: 270,
        marginRight: 105,
        paddingRight: 1,
    },
    title: {
        color: "#000",
        fontSize: 14,
        fontFamily: "mon-b",
    },
    subtitle: {
        marginTop: 10,
        color: Colors.darkGray,
        fontSize: 16,
        fontFamily: "mon",
    },
    ratingContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginTop: 10,
    },
    ratingText: {
        color: Colors.primary,
        fontSize: 16,
        fontFamily: "mon-sb",
    },
    superHostText: {
        color: Colors.secondary,
        fontSize: 16,
        fontFamily: "mon-sb",
    },
    avatarImage: {
        width: 100,
        height: 100,
        borderRadius: 14,
        borderWidth: 2,
        backgroundColor: Colors.gray,
        borderColor: Colors.gray,
        elevation: 4,
        shadowColor: "#000",
        shadowOpacity: 0.3,
        shadowRadius: 4,
    },
    voyageContainer: {
        marginTop: 10,
        backgroundColor: "#fff",
        padding: 15,
        borderRadius: 10,
        elevation: 3,
        shadowColor: "#000",
        shadowOpacity: 0.1,
        shadowRadius: 4,
    },
    sectionTitle: {
        fontSize: 18,
        fontFamily: "mon-b",
        marginBottom: 15,
        color: Colors.black,
    },
    detailRow: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginBottom: 15,
    },
    detailLabel: {
        fontSize: 16,
        color: Colors.gray,
        fontFamily: "mon-sb",
    },
    detailValue: {
        fontSize: 16,
        color: Colors.black,
        fontFamily: "mon",
    },
    modifyText: {
        fontSize: 16,
        color: Colors.primary,
        fontFamily: "mon-sb",
    },
    textContainer: {
        marginBottom: 16,
    },
    containerPay: {
        backgroundColor: "#fff",
        marginTop: 10,
        padding: 15,
        borderRadius: 10,
        elevation: 3,
        shadowColor: "#000",
        shadowOpacity: 0.1,
        shadowRadius: 4,
    },
    payAvec: {
        flexDirection: "row",
        gap: 20,
        borderRadius: 10,
        borderWidth: 1,
        borderColor: "#ccc",
        padding: 20,
        width: 290,
        marginBottom: 10,
    },
    contentContainer: {
        flex: 1,
        alignItems: "center",
    },
    containerHeadline: {
        fontSize: 15,
        fontWeight: "700",
    },
    input: {
        width: "200",
        height: 44,
        borderWidth: 1,
        borderColor: "#ABABAB",
        borderRadius: 8,
        padding: 10,
        backgroundColor: "#fff",
        marginBottom: 10,
    },
    btnText: {
        color: Colors.primary,
        paddingTop: 15,
        fontSize: 16,
        fontFamily: "mon-b",
    },
    containerHeadlineContainer: {
        flexDirection: "row",
        alignItems: "center",
    },
    closeButton: {
        // position: "absolute",
        // top: 10,
        // right: 10,
        // zIndex: 10,
        marginRight: 30,
    },
    cardHeader: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
    },
    headerText: {
        fontWeight: "bold",
        fontFamily: "mon-b",
        fontSize: 18,
        padding: 20,
    },
    cardBody: {
        paddingHorizontal: 20,
        marginBottom: 20,
        backgroundColor: "#fff",
        borderRadius: 20,
    },
    guestsItem: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginBottom: 15,
    },
    itemborder: {
        borderBottomWidth: 1,
        borderBottomColor: "#ddd",
        paddingBottom: 10,
    },
});
export default BookingSuccess;
