import React, { useState } from "react";
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
import { useMemo, useRef } from "react";
import BottomSheet from "@gorhom/bottom-sheet";
import { GestureHandlerRootView } from "react-native-gesture-handler";

const Pay = () => {
    const bottomRef = useRef(null);
    const snapPoints = useMemo(() => ["28%"], []);
    const [showBottomSheet, setShowBottomSheet] = useState(false);
    const handleBottomSheet = () => {
        if (showBottomSheet) {
            setShowBottomSheet(false);
        } else {
            setShowBottomSheet(true);
        }
    };
    return (
        <GestureHandlerRootView style={{ flex: 1 }}>
            <ScrollView contentContainerStyle={styles.scrollViewContent}>
                <View style={[styles.container]}>
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
                    {/*  Condition d'annulation */}
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
                                        Cette reservation n'est pas remboursable
                                    </Text>
                                </View>
                            </View>
                        </View>
                    </View>

                    {/* Details du prix */}
                    <View style={styles.voyageContainer}>
                        <Text style={styles.sectionTitle}>Details du prix</Text>
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
                                            { marginTop: 10, fontWeight: 800 })
                                        }
                                    >
                                        Total(DOLLAR)
                                    </Text>
                                </View>
                                <Text
                                    style={[
                                        styles.modifyText,
                                        { marginTop: 10, fontWeight: 800 },
                                    ]}
                                >
                                    2199,50 $
                                </Text>
                            </View>
                        </View>
                    </View>

                    {/* Payez avec */}

                    <View style={styles.voyageContainer}>
                        <Text style={styles.sectionTitle}>Payez avec </Text>
                        <View>
                            <View style={styles.detailRow}>
                                <TouchableOpacity
                                    style={styles.payAvec}
                                    onPress={handleBottomSheet}
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
                            </View>
                        </View>
                    </View>

                    {/* Bouton confirmer le payement */}

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
                            <Text style={styles.containerHeadline}>
                                Indiquez les informations de votre carte
                            </Text>
                            <View>
                                <TextInput
                                    autoCapitalize="none"
                                    placeholder="Numéro de carte"
                                    style={[
                                        defaulStyles.inputField,
                                        { marginBottom: 30 },
                                    ]}
                                />
                                <Ionicons
                                    name="card-outline"
                                    size={24}
                                    color="#9f9f9f"
                                    style={defaulStyles.btnIcon}
                                />
                            </View>
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
        paddingBottom: 50, // Ajoute un padding pour éviter que le contenu ne soit coupé
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
        fontFamily: "mon-r",
    },
    ratingContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginTop: 10,
    },
    ratingText: {
        color: Colors.primary,
        fontSize: 16,
        fontFamily: "mon-m",
    },
    superHostText: {
        color: Colors.secondary,
        fontSize: 16,
        fontFamily: "mon-m",
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
        fontFamily: "mon-r",
    },
    detailValue: {
        fontSize: 16,
        color: Colors.black,
        fontFamily: "mon-m",
    },
    modifyText: {
        fontSize: 16,
        color: Colors.primary,
        fontFamily: "mon-m",
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
    },
    contentContainer: {
        flex: 1,
        alignItems: "center",
    },
    containerHeadline: {
        fontSize: 18,
        fontWeight: "700",
    },
});

export default Pay;

// import React, { useRef } from "react";
// import {
//     View,
//     Text,
//     TouchableOpacity,
//     Image,
//     StyleSheet,
//     ScrollView,
// } from "react-native";
// import { defaulStyles } from "../../constants/Styles";
// import { Colors } from "@/constants/Colors";
// import Ionicons from "@expo/vector-icons/Ionicons";

// import { useMemo } from "react";
// import BottomSheet from "@gorhom/bottom-sheet";
// import { GestureHandlerRootView } from "react-native-gesture-handler";

// const Pay = () => {
//     const bottomRef = useRef(null);
//     const snapPoints = useMemo(() => ["25%", "50%", "70%"]);
//     return (
//         <ScrollView contentContainerStyle={styles.scrollViewContent}>
//             <View style={[styles.container]}>
//                 <View style={styles.row}>
//                     <Image
//                         source={require("../../assets/images/user.png")}
//                         style={styles.avatarImage}
//                     />
//                     <View style={styles.infoContainer}>
//                         <Text style={styles.title}>Logement</Text>
//                         <Text style={styles.subtitle}>
//                             Page de Confirmation
//                         </Text>
//                         <View style={styles.ratingContainer}>
//                             <Text style={styles.ratingText}>Rating</Text>
//                             <Text style={styles.superHostText}>SuperHost</Text>
//                         </View>
//                     </View>
//                 </View>

//                 {/* Voyageurs */}
//                 <View style={styles.voyageContainer}>
//                     <Text style={styles.sectionTitle}>Votre Voyage</Text>
//                     <View>
//                         <View style={styles.detailRow}>
//                             <View>
//                                 <Text style={styles.detailLabel}>Date</Text>
//                                 <Text style={styles.detailValue}>
//                                     12-17 sept
//                                 </Text>
//                             </View>
//                             <Text style={styles.modifyText}>Modifier</Text>
//                         </View>

//                         <View style={styles.detailRow}>
//                             <View>
//                                 <Text style={styles.detailLabel}>
//                                     Voyageurs
//                                 </Text>
//                                 <Text style={styles.detailValue}>1</Text>
//                             </View>
//                             <Text style={styles.modifyText}>Modifier</Text>
//                         </View>
//                     </View>
//                 </View>
//                 {/*  Condition d'annulation */}
//                 <View style={styles.voyageContainer}>
//                     <Text style={styles.sectionTitle}>
//                         Condition d'annulation
//                     </Text>
//                     <View>
//                         <View style={styles.detailRow}>
//                             <View>
//                                 <Text style={styles.detailLabel}>
//                                     Non remboursable
//                                 </Text>
//                                 <Text style={styles.detailValue}>
//                                     (2.199,50$)
//                                 </Text>
//                             </View>
//                             <Text style={styles.modifyText}>Modifier</Text>
//                         </View>

//                         <View style={styles.detailRow}>
//                             <View>
//                                 <Text style={styles.detailLabel}>
//                                     Cette reservation n'est pas remboursable
//                                 </Text>
//                             </View>
//                         </View>
//                     </View>
//                 </View>

//                 {/* Details du prix */}
//                 <View style={styles.voyageContainer}>
//                     <Text style={styles.sectionTitle}>Details du prix</Text>
//                     <View>
//                         <View style={styles.detailRow}>
//                             <View>
//                                 <Text style={styles.detailLabel}>
//                                     423,90$ x 5 nuits
//                                 </Text>
//                             </View>
//                             <Text style={styles.modifyText}>2119,50 $</Text>
//                         </View>

//                         <View style={styles.detailRow}>
//                             <View>
//                                 <Text style={styles.detailLabel}>
//                                     Frais de ménage
//                                 </Text>
//                             </View>
//                             <Text style={styles.modifyText}>30,00 $</Text>
//                         </View>
//                         <View style={styles.detailRow}>
//                             <View>
//                                 <Text style={styles.detailLabel}>Taxes</Text>
//                             </View>
//                             <Text style={styles.modifyText}>500,00 $</Text>
//                         </View>
//                         {/* separatorView */}
//                         <View
//                             style={{
//                                 flex: 1,
//                                 borderBottomColor: "#000",
//                                 borderBottomWidth: StyleSheet.hairlineWidth,
//                             }}
//                         />
//                         {/* separatorView  fin*/}

//                         <View style={styles.detailRow}>
//                             <View>
//                                 <Text
//                                     style={
//                                         ([styles.detailLabel],
//                                         { marginTop: 10, fontWeight: 800 })
//                                     }
//                                 >
//                                     Total(DOLLAR)
//                                 </Text>
//                             </View>
//                             <Text
//                                 style={[
//                                     styles.modifyText,
//                                     { marginTop: 10, fontWeight: 800 },
//                                 ]}
//                             >
//                                 2199,50 $
//                             </Text>
//                         </View>
//                     </View>
//                 </View>

//                 {/* Payez avec */}
//                 {/* <GestureHandlerRootView>
//                     <BottomSheet
//                         snapPoints={snapPoints}
//                         index={0}
//                         ref={bottomRef}
//                     >
//                         <View style={styles.voyageContainer}>
//                             <Text style={styles.sectionTitle}>Payez avec </Text>
//                             <View>
//                                 <View style={styles.detailRow}>
//                                     <TouchableOpacity style={styles.payAvec}>
//                                         <Ionicons
//                                             name="card-outline"
//                                             size={26}
//                                             color="#9f9f9f"
//                                         />
//                                         <Text style={styles.detailLabel}>
//                                             Carte de crédit ou de débit
//                                         </Text>
//                                     </TouchableOpacity>
//                                 </View>
//                             </View>
//                         </View>
//                     </BottomSheet>
//                 </GestureHandlerRootView> */}

//                 {/* Bouton confirmer le payement */}

//                 <View style={styles.containerPay}>
//                     <View style={styles.textContainer}>
//                         <Text>
//                             Nam gravida erat! Omnis, cursus culpa pretium urna
//                             sodales. Adipisicing, bibendum deserunt, elementum
//                             veniam enim cupiditate. Nam quibusdam perspiciatis
//                             cillum ullamcorper ipsa, vero ad. Ligula tempus,
//                             porttitor dui quae cupiditate illo maecenas quisqua
//                         </Text>
//                     </View>
//                     <TouchableOpacity style={defaulStyles.btn}>
//                         <Text style={defaulStyles.btnText}>
//                             Confirmer et payer
//                         </Text>
//                     </TouchableOpacity>
//                 </View>
//             </View>
//         </ScrollView>
//     );
// };

// const styles = StyleSheet.create({
//     scrollViewContent: {
//         paddingBottom: 50, // Ajoute un padding pour éviter que le contenu ne soit coupé
//     },
//     container: {
//         marginVertical: 15,
//         marginHorizontal: 20,
//     },
//     row: {
//         flexDirection: "row",
//         alignItems: "center",
//         gap: 20,
//         backgroundColor: "#fff",
//         padding: 15,
//         borderRadius: 10,
//         elevation: 3,
//         shadowColor: "#000",
//         shadowOpacity: 0.1,
//         shadowRadius: 4,
//     },
//     infoContainer: {
//         flexDirection: "column",
//     },
//     title: {
//         color: "#000",
//         fontSize: 20,
//         fontFamily: "mon-b",
//     },
//     subtitle: {
//         marginTop: 10,
//         color: Colors.darkGray,
//         fontSize: 16,
//         fontFamily: "mon-r",
//     },
//     ratingContainer: {
//         flexDirection: "row",
//         justifyContent: "space-between",
//         marginTop: 10,
//     },
//     ratingText: {
//         color: Colors.primary,
//         fontSize: 16,
//         fontFamily: "mon-m",
//     },
//     superHostText: {
//         color: Colors.secondary,
//         fontSize: 16,
//         fontFamily: "mon-m",
//     },
//     avatarImage: {
//         width: 100,
//         height: 100,
//         borderRadius: 14,
//         borderWidth: 2,
//         backgroundColor: Colors.gray,
//         borderColor: Colors.gray,
//         elevation: 4,
//         shadowColor: "#000",
//         shadowOpacity: 0.3,
//         shadowRadius: 4,
//     },
//     voyageContainer: {
//         marginTop: 10,
//         backgroundColor: "#fff",
//         padding: 15,
//         borderRadius: 10,
//         elevation: 3,
//         shadowColor: "#000",
//         shadowOpacity: 0.1,
//         shadowRadius: 4,
//     },
//     sectionTitle: {
//         fontSize: 18,
//         fontFamily: "mon-b",
//         marginBottom: 15,
//         color: Colors.black,
//     },
//     detailRow: {
//         flexDirection: "row",
//         justifyContent: "space-between",
//         marginBottom: 15,
//     },
//     detailLabel: {
//         fontSize: 16,
//         color: Colors.gray,
//         fontFamily: "mon-r",
//     },
//     detailValue: {
//         fontSize: 16,
//         color: Colors.black,
//         fontFamily: "mon-m",
//     },
//     modifyText: {
//         fontSize: 16,
//         color: Colors.primary,
//         fontFamily: "mon-m",
//     },
//     textContainer: {
//         marginBottom: 16,
//     },
//     containerPay: {
//         backgroundColor: "#fff",
//         marginTop: 10,
//         padding: 15,
//         borderRadius: 10,
//         elevation: 3,
//         shadowColor: "#000",
//         shadowOpacity: 0.1,
//         shadowRadius: 4,
//     },
//     payAvec: {
//         flexDirection: "row",
//         gap: 20,
//         borderRadius: 10,
//         borderWidth: 1,
//         borderColor: "#ccc",
//         padding: 20,
//         width: 290,
//     },
// });

// export default Pay;
