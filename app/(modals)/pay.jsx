import React, { useState, useMemo, useRef } from "react";
import {
    View,
    Text,
    TouchableOpacity,
    Image,
    StyleSheet,
    ScrollView,
    TextInput,
} from "react-native";
import { defaulStyles } from "../../constants/Styles";
import { Colors } from "@/constants/Colors";
import Ionicons from "@expo/vector-icons/Ionicons";
import BottomSheet from "@gorhom/bottom-sheet";
import { GestureHandlerRootView } from "react-native-gesture-handler";

const Pay = () => {
    const bottomRef = useRef(null);
    const snapPoints = useMemo(() => ["30%"]);
    const [showBottomSheet, setShowBottomSheet] = useState(false);
    const [paymentMethod, setPaymentMethod] = useState(null);
    // const [modifyDate, setModifyDate]=useState("");

    const handleBottomSheet = (method) => {
        if (showBottomSheet && paymentMethod === method) {
            setShowBottomSheet(false);
            setPaymentMethod(null);
        } else {
            setPaymentMethod(method);
            setShowBottomSheet(true);
        }
    };

    return (
        <GestureHandlerRootView style={{ flex: 1 }}>
            <ScrollView contentContainerStyle={styles.scrollViewContent}>
                <View style={styles.container}>
                    <View style={styles.row}>
                        <Image
                            source={require("../../assets/images/user.png")}
                            style={styles.avatarImage}
                        />
                        <View style={styles.infoContainer}>
                            <Text style={styles.title}>Logement</Text>
                            <Text style={styles.subtitle}>
                                Page de Confirmation
                            </Text>
                            <View style={styles.ratingContainer}>
                                <Text style={styles.ratingText}>Rating</Text>
                                <Text style={styles.superHostText}>
                                    SuperHost
                                </Text>
                            </View>
                        </View>
                    </View>

                    {/* Voyageurs */}
                    <View style={styles.voyageContainer}>
                        <Text style={styles.sectionTitle}>Votre Voyage</Text>
                        <View>
                            <View style={styles.detailRow}>
                                <View>
                                    <Text style={styles.detailLabel}>Date</Text>
                                    <Text style={styles.detailValue}>
                                        12-17 sept
                                    </Text>
                                </View>
                                <Text style={styles.modifyText}>Modifier</Text>
                            </View>

                            <View style={styles.detailRow}>
                                <View>
                                    <Text style={styles.detailLabel}>
                                        Voyageurs
                                    </Text>
                                    <Text style={styles.detailValue}>1</Text>
                                </View>
                                <Text style={styles.modifyText}>Modifier</Text>
                            </View>
                        </View>
                    </View>
                    {/* Condition d'annulation */}
                    <View style={styles.voyageContainer}>
                        <Text style={styles.sectionTitle}>
                            Condition d'annulation
                        </Text>
                        <View>
                            <View style={styles.detailRow}>
                                <View>
                                    <Text style={styles.detailLabel}>
                                        Non remboursable
                                    </Text>
                                    <Text style={styles.detailValue}>
                                        (2.199,50$)
                                    </Text>
                                </View>
                                <Text style={styles.modifyText}>Modifier</Text>
                            </View>

                            <View style={styles.detailRow}>
                                <View>
                                    <Text style={styles.detailLabel}>
                                        Cette réservation n'est pas remboursable
                                    </Text>
                                </View>
                            </View>
                        </View>
                    </View>

                    {/* Details du prix */}
                    <View style={styles.voyageContainer}>
                        <Text style={styles.sectionTitle}>Détails du prix</Text>
                        <View>
                            <View style={styles.detailRow}>
                                <View>
                                    <Text style={styles.detailLabel}>
                                        423,90$ x 5 nuits
                                    </Text>
                                </View>
                                <Text style={styles.modifyText}>2119,50 $</Text>
                            </View>

                            <View style={styles.detailRow}>
                                <View>
                                    <Text style={styles.detailLabel}>
                                        Frais de ménage
                                    </Text>
                                </View>
                                <Text style={styles.modifyText}>30,00 $</Text>
                            </View>
                            <View style={styles.detailRow}>
                                <View>
                                    <Text style={styles.detailLabel}>
                                        Taxes
                                    </Text>
                                </View>
                                <Text style={styles.modifyText}>500,00 $</Text>
                            </View>
                            {/* separatorView */}
                            <View
                                style={{
                                    flex: 1,
                                    borderBottomColor: "#000",
                                    borderBottomWidth: StyleSheet.hairlineWidth,
                                }}
                            />
                            {/* separatorView  fin*/}

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
                                        Total(DOLLAR)
                                    </Text>
                                </View>
                                <Text
                                    style={[
                                        styles.modifyText,
                                        { marginTop: 10, fontWeight: "800" },
                                    ]}
                                >
                                    2199,50 $
                                </Text>
                            </View>
                        </View>
                    </View>

                    {/* Payez avec */}

                    <View style={styles.voyageContainer}>
                        <Text style={styles.sectionTitle}>Payez avec</Text>
                        <View>
                            <View style={styles.detailRow}>
                                <View>
                                    <TouchableOpacity
                                        style={styles.payAvec}
                                        onPress={() =>
                                            handleBottomSheet("credit")
                                        }
                                    >
                                        <Ionicons
                                            name="card-outline"
                                            size={26}
                                            color="#9f9f9f"
                                        />
                                        <Text style={styles.detailLabel}>
                                            Carte de crédit ou de débit
                                        </Text>
                                    </TouchableOpacity>

                                    <TouchableOpacity
                                        style={styles.payAvec}
                                        onPress={() =>
                                            handleBottomSheet("mobile")
                                        }
                                    >
                                        <Ionicons
                                            name="cash-outline"
                                            size={26}
                                            color="#9f9f9f"
                                        />
                                        <Text style={styles.detailLabel}>
                                            Mobile money
                                        </Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </View>
                    </View>

                    {/* Bouton confirmer le paiement */}

                    <View style={styles.containerPay}>
                        <View style={styles.textContainer}>
                            <Text>
                                Nam gravida erat! Omnis, cursus culpa pretium
                                urna sodales. Adipisicing, bibendum deserunt,
                                elementum veniam enim cupiditate. Nam quibusdam
                                perspiciatis cillum ullamcorper ipsa, vero ad.
                                Ligula tempus, porttitor dui quae cupiditate
                                illo maecenas quisqua
                            </Text>
                        </View>
                        <TouchableOpacity style={defaulStyles.btn}>
                            <Text style={defaulStyles.btnText}>
                                Confirmer et payer
                            </Text>
                        </TouchableOpacity>
                    </View>
                </View>

                {/* BottomSheet */}
                {showBottomSheet && (
                    <BottomSheet
                        snapPoints={snapPoints}
                        index={0}
                        ref={bottomRef}
                    >
                        <View style={styles.contentContainer}>
                            <View style={styles.containerHeadlineContainer}>
                                <View style={styles.containerHeadline}>
                                    <TouchableOpacity
                                        style={styles.closeButton}
                                        onPress={() =>
                                            bottomRef.current?.close()
                                        }
                                    >
                                        <Ionicons
                                            name="close-outline"
                                            size={28}
                                        />
                                    </TouchableOpacity>
                                    <Text style={styles.containerHeadline}>
                                        {paymentMethod === "credit"
                                            ? "Indiquez les informations de votre carte"
                                            : "Indiquez les numéro votre mobile money"}
                                    </Text>
                                </View>
                            </View>
                            {paymentMethod === "credit" && (
                                <View
                                    style={{
                                        position: "relative",
                                        marginTop: 21,
                                    }}
                                >
                                    {/* Le formulaire pour la carte credit */}
                                    <View>
                                        <TextInput
                                            autoCapitalize="none"
                                            placeholder="Numéro de carte"
                                            style={[
                                                styles.input,
                                                { paddingRight: 200 },
                                            ]}
                                        />
                                        <Ionicons
                                            name="card-outline"
                                            size={24}
                                            color="#9f9f9f"
                                            style={{
                                                position: "absolute",
                                                right: 10,
                                                top: "50%",
                                                transform: [
                                                    { translateY: -12 },
                                                ],
                                            }}
                                        />
                                    </View>
                                    <View
                                        style={{
                                            flexDirection: "row",
                                            justifyContent: "space-between",
                                        }}
                                    >
                                        <TextInput
                                            autoCapitalize="none"
                                            placeholder="Date d'expiration"
                                            style={[
                                                styles.input,
                                                { flex: 1, marginRight: 5 },
                                            ]}
                                        />
                                        <TextInput
                                            autoCapitalize="none"
                                            placeholder="Cryptogramme"
                                            style={[
                                                styles.input,
                                                { flex: 1, marginLeft: 5 },
                                            ]}
                                        />
                                    </View>

                                    <View>
                                        <TextInput
                                            autoCapitalize="none"
                                            placeholder="Code postal"
                                            style={[
                                                styles.input,
                                                { paddingRight: 200 },
                                            ]}
                                        />
                                    </View>
                                    <View>
                                        <View
                                            style={{
                                                flexDirection: "row",
                                                justifyContent: "space-between",
                                                marginTop: 20,
                                            }}
                                        >
                                            <Text style={styles.btnText}>
                                                Annuler
                                            </Text>
                                            <TouchableOpacity
                                                style={[
                                                    defaulStyles.btn,
                                                    {
                                                        paddingHorizontal: 20,
                                                        paddingRight: 20,
                                                    },
                                                ]}
                                            >
                                                <Text
                                                    style={defaulStyles.btnText}
                                                >
                                                    Terminé
                                                </Text>
                                            </TouchableOpacity>
                                        </View>
                                    </View>
                                </View>
                            )}
                            {paymentMethod === "mobile" && (
                                <View
                                    style={{
                                        position: "relative",
                                        marginTop: 21,
                                    }}
                                >
                                    {/* Le formulaire pour le Mobile Money */}

                                    <View style={{ marginVertical: 30 }}>
                                        <TextInput
                                            autoCapitalize="none"
                                            placeholder="Numéro de téléphone"
                                            style={[
                                                styles.input,
                                                {
                                                    paddingRight: 180,
                                                    marginTop: 20,
                                                },
                                            ]}
                                        />

                                        <TouchableOpacity
                                            style={[
                                                defaulStyles.btn,
                                                { marginTop: 20 },
                                            ]}
                                        >
                                            <Text
                                                style={[defaulStyles.btnText]}
                                            >
                                                valider
                                            </Text>
                                        </TouchableOpacity>
                                    </View>
                                </View>
                            )}
                        </View>
                    </BottomSheet>
                )}
                {/* BottomSheet FIN */}
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
    },
    title: {
        color: "#000",
        fontSize: 20,
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
        fontFamily: "mon",
    },
    detailValue: {
        fontSize: 16,
        color: Colors.black,
        fontFamily: "mon-sb",
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
});

export default Pay;
