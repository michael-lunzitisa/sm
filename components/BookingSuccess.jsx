import { View, Text, StyleSheet } from "react-native";
import React from "react";
import { Colors } from "@/constants/Colors";
import { ScrollView } from "react-native-gesture-handler";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { useLocalSearchParams } from "expo-router";

const DetailRow = ({ label, value }) => (
    <View style={styles.detailRow}>
        <Text style={styles.detailLabel}>{label}</Text>
        <Text style={styles.detailValue}>{value}</Text>
    </View>
);

const BookingSuccess = () => {
    const { date, voyageurs, total, paymentMethod } = useLocalSearchParams();

    return (
        <GestureHandlerRootView
            style={{ flex: 1, backgroundColor: Colors.background }}
        >
            <ScrollView contentContainerStyle={styles.scrollViewContent}>
                <View style={styles.container}>
                    <View style={styles.successBanner}>
                        <Text style={styles.bannerText}>
                            🎉 Réservation réussie !
                        </Text>
                    </View>
                    <View style={styles.voyageContainer}>
                        <Text style={styles.title}>
                            Votre réservation est approuvée
                        </Text>
                        <Text style={styles.sectionTitle}>
                            Détails de la réservation
                        </Text>
                        <DetailRow
                            label="Numéro de réservation"
                            value="#2119"
                        />
                        <DetailRow label="Date" value={date} />
                        <DetailRow
                            label="Nombre de voyageurs"
                            value={voyageurs}
                        />
                        <DetailRow label="Total à payer" value={`${total}$`} />
                        <DetailRow
                            label="Mode de paiement"
                            value={paymentMethod}
                        />
                    </View>
                    <View style={styles.noteContainer}>
                        <Text style={styles.noteText}>
                            Merci de nous avoir fait confiance. Vous recevrez un
                            email de confirmation contenant tous les détails de
                            votre réservation.
                        </Text>
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
    successBanner: {
        backgroundColor: Colors.primary,
        padding: 15,
        borderRadius: 10,
        marginBottom: 20,
        alignItems: "center",
    },
    bannerText: {
        fontSize: 20,
        color: "#fff",
        fontFamily: "mon-b",
    },
    voyageContainer: {
        backgroundColor: "#fff",
        padding: 20,
        borderRadius: 10,
        elevation: 3,
        shadowColor: "#000",
        shadowOpacity: 0.1,
        shadowRadius: 4,
    },
    title: {
        fontSize: 24,
        fontFamily: "mon-b",
        marginBottom: 20,
        color: Colors.black,
        textAlign: "center",
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
        alignItems: "center",
        marginBottom: 15,
        paddingVertical: 5,
        borderBottomWidth: 1,
        borderBottomColor: Colors.lightGray,
    },
    detailLabel: {
        fontSize: 16,
        color: Colors.gray,
        fontFamily: "mon-sb",
    },
    detailValue: {
        fontSize: 16,
        color: Colors.black,
        fontFamily: "mon-sb",
        fontWeight: "600",
    },
    noteContainer: {
        marginTop: 20,
        backgroundColor: Colors.lightGray,
        padding: 15,
        borderRadius: 10,
    },
    noteText: {
        fontSize: 14,
        color: Colors.gray,
        fontFamily: "mon",
        textAlign: "center",
    },
});

export default BookingSuccess;
