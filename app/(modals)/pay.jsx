// import React, { useState, useMemo, useRef } from "react";
// import {
//     View,
//     Text,
//     TouchableOpacity,
//     Image,
//     StyleSheet,
//     ScrollView,
//     Animated,
// } from "react-native";
// import { defaulStyles } from "../../constants/Styles";
// import { Colors } from "@/constants/Colors";
// import Ionicons from "@expo/vector-icons/Ionicons";
// import BottomSheet from "@gorhom/bottom-sheet";
// import { GestureHandlerRootView } from "react-native-gesture-handler";
// import listingsData from "@/assets/data/listings.json";
// import { useLocalSearchParams } from "expo-router";
// import { FadeIn } from "react-native-reanimated";
// import CreditCardInput from "../../components/CreditCardInput";
// import MobileMoney from "../../components/MobileMoney";
// import { Link } from "expo-router";
// import { useRouter } from "expo-router";
// import DateTimePicker from "@react-native-community/datetimepicker";

// const Pay = () => {
//     const bottomRef = useRef(null);
//     const snapPoints = useMemo(() => ["35%"]);
//     const [showBottomSheet, setShowBottomSheet] = useState(false);
//     const [paymentMethod, setPaymentMethod] = useState(null);
//     const [openCard, setOpenCard] = useState(0); // 0 = pas ouvert, 2 = section de modification des voyageurs ouverte
//     const [groups, setGroups] = useState([
//         { name: "Adultes", text: "13 ans ou plus", count: 0 },
//         { name: "Enfants", text: "Ages 2 - 12", count: 0 },
//         { name: "Bébés", text: "Moins de 2 ans", count: 0 },
//         {
//             name: "Animaux de compagnie",
//             texte: "Animaux autorisés",
//             count: 0,
//         },
//     ]);
//     const router = useRouter();
//     const { id } = useLocalSearchParams();
//     const listing = listingsData.find((item) => item.id === id);
//     const [arrivalDate, setArrivalDate] = useState(new Date());
//     const [endDate, setEndDate] = useState(new Date());
//     const [showDatePicker, setShowDatePicker] = useState(false);

//     // Calcul des détails du prix avec vérification des valeurs
//     const numberOfNights = Number(listing?.numberOfNights) || 0;
//     const cleaningFee = Number(listing?.cleaningFee) || 0;
//     const taxes = Number(listing?.taxes) || 0;
//     const pricePerNight = Number(listing?.pricePerNight) || 0;

//     const totalPrice = pricePerNight * numberOfNights;
//     const grandTotal = totalPrice + cleaningFee + taxes;

//     const handleBottomSheet = (method) => {
//         if (showBottomSheet && paymentMethod === method) {
//             setShowBottomSheet(false);
//             setPaymentMethod(null);
//         } else {
//             setPaymentMethod(method);
//             setShowBottomSheet(true);
//         }
//     };

//     const handleOpenCard = () => {
//         setOpenCard(openCard === 2 ? 0 : 2); // Alterner entre ouvert et fermé
//     };
//     const handleClose = () => {
//         setOpenCard(0); // Fermer la section de modification des voyageurs
//     };

//     const formatDateRange = (startDate, endDate) => {
//         if (startDate && endDate) {
//             const start = new Date(startDate).toLocaleDateString("fr-FR", {
//                 month: "short",
//                 day: "numeric",
//             });
//             const end = new Date(endDate).toLocaleDateString("fr-FR", {
//                 month: "short",
//                 day: "numeric",
//             });
//             return `${start} - ${end}`;
//         }
//         return "Sélectionnez une date";
//     };

//     const handleDateChange = (event, selectedDate) => {
//         setShowDatePicker(false);
//         if (!arrivalDate) {
//             setArrivalDate(selectedDate);
//         } else {
//             setEndDate(selectedDate);
//         }
//     };

//     const showDatePickerHandler = () => {
//         setShowDatePicker(true);
//     };

//     return (
//         <GestureHandlerRootView style={{ flex: 1 }}>
//             <ScrollView contentContainerStyle={styles.scrollViewContent}>
//                 <View style={styles.container}>
//                     <View style={styles.row}>
//                         <Image
//                             source={{ uri: listing.featuredImage }}
//                             style={styles.avatarImage}
//                         />
//                         <View style={styles.infoContainer}>
//                             <Text style={styles.title}>{listing.title}</Text>
//                             <Text style={styles.subtitle}>
//                                 {listing.titles}
//                             </Text>
//                             <View style={styles.ratingContainer}>
//                                 <Text style={styles.ratingText}>
//                                     {listing.rating}
//                                 </Text>
//                                 <Text style={styles.superHostText}>
//                                     SuperHost
//                                 </Text>
//                             </View>
//                         </View>
//                     </View>

//                     {/* Voyageurs */}
//                     <View style={styles.voyageContainer}>
//                         <Text style={styles.sectionTitle}>Votre Voyage</Text>
//                         <View>
//                             <View style={styles.detailRow}>
//                                 <View>
//                                     <Text style={styles.detailLabel}>Date</Text>
//                                     <Text style={styles.detailValue}>
//                                         {arrivalDate && endDate
//                                             ? formatDateRange(
//                                                   arrivalDate,
//                                                   endDate
//                                               )
//                                             : formatDateRange(
//                                                   new Date(),
//                                                   new Date()
//                                               )}
//                                     </Text>
//                                 </View>
//                                 <TouchableOpacity
//                                     onPress={showDatePickerHandler}
//                                 >
//                                     <Text style={styles.modifyText}>
//                                         Modifier
//                                     </Text>
//                                 </TouchableOpacity>
//                             </View>
//                             {showDatePicker && (
//                                 <DateTimePicker
//                                     value={arrivalDate || new Date()}
//                                     mode="date"
//                                     display="default"
//                                     onChange={handleDateChange}
//                                     minimumDate={new Date()}
//                                 />
//                             )}

//                             <View style={styles.detailRow}>
//                                 <View>
//                                     <Text style={styles.detailLabel}>
//                                         Voyageurs
//                                     </Text>
//                                     <Text style={styles.detailValue}>
//                                         {groups.reduce(
//                                             (acc, group) => acc + group.count,
//                                             0
//                                         )}{" "}
//                                         voyageurs
//                                     </Text>
//                                 </View>
//                                 <TouchableOpacity onPress={handleOpenCard}>
//                                     <Text style={styles.modifyText}>
//                                         Modifier
//                                     </Text>
//                                 </TouchableOpacity>
//                             </View>
//                         </View>
//                     </View>
//                     {/* Condition d'annulation */}
//                     <View style={styles.voyageContainer}>
//                         <Text style={styles.sectionTitle}>
//                             Condition d'annulation
//                         </Text>
//                         <View>
//                             <View style={styles.detailRow}>
//                                 <View>
//                                     <Text style={styles.detailLabel}>
//                                         Non remboursable
//                                     </Text>
//                                     <Text style={styles.detailValue}>
//                                         (2.199,50$)
//                                     </Text>
//                                 </View>
//                                 <Text style={styles.modifyText}>Modifier</Text>
//                             </View>

//                             <View style={styles.detailRow}>
//                                 <View>
//                                     <Text style={styles.detailLabel}>
//                                         Cette réservation n'est pas remboursable
//                                     </Text>
//                                 </View>
//                             </View>
//                         </View>
//                     </View>

//                     {/* Details du prix */}
//                     <View style={styles.voyageContainer}>
//                         <Text style={styles.sectionTitle}>Détails du prix</Text>
//                         <View>
//                             <View style={styles.detailRow}>
//                                 <View>
//                                     <Text style={styles.detailLabel}>
//                                         {pricePerNight}$ x {numberOfNights}
//                                         nuits
//                                     </Text>
//                                 </View>
//                                 <Text style={styles.modifyText}>
//                                     {totalPrice} $
//                                 </Text>
//                             </View>

//                             <View style={styles.detailRow}>
//                                 <View>
//                                     <Text style={styles.detailLabel}>
//                                         Frais de ménage
//                                     </Text>
//                                 </View>
//                                 <Text style={styles.modifyText}>
//                                     {cleaningFee} $
//                                 </Text>
//                             </View>
//                             <View style={styles.detailRow}>
//                                 <View>
//                                     <Text style={styles.detailLabel}>
//                                         Taxes
//                                     </Text>
//                                 </View>
//                                 <Text style={styles.modifyText}>{taxes} $</Text>
//                             </View>
//                             {/* separatorView */}
//                             <View
//                                 style={{
//                                     flex: 1,
//                                     borderBottomColor: "#000",
//                                     borderBottomWidth: StyleSheet.hairlineWidth,
//                                 }}
//                             />
//                             {/* separatorView  fin*/}

//                             <View style={styles.detailRow}>
//                                 <View>
//                                     <Text
//                                         style={
//                                             ([styles.detailLabel],
//                                             {
//                                                 marginTop: 10,
//                                                 fontWeight: "800",
//                                             })
//                                         }
//                                     >
//                                         Total(DOLLAR)
//                                     </Text>
//                                 </View>
//                                 <Text
//                                     style={[
//                                         styles.modifyText,
//                                         { marginTop: 10, fontWeight: "800" },
//                                     ]}
//                                 >
//                                     {grandTotal.toFixed(2)} $
//                                 </Text>
//                             </View>
//                         </View>
//                     </View>

//                     {/* Payez avec */}

//                     <View style={styles.voyageContainer}>
//                         <Text style={styles.sectionTitle}>Payez avec</Text>
//                         <View>
//                             <View style={styles.detailRow}>
//                                 <View>
//                                     <TouchableOpacity
//                                         style={styles.payAvec}
//                                         onPress={() =>
//                                             handleBottomSheet("credit")
//                                         }
//                                     >
//                                         <Ionicons
//                                             name="card-outline"
//                                             size={26}
//                                             color="#9f9f9f"
//                                         />
//                                         <Text style={styles.detailLabel}>
//                                             Carte de crédit ou de débit
//                                         </Text>
//                                     </TouchableOpacity>

//                                     <TouchableOpacity
//                                         style={styles.payAvec}
//                                         onPress={() =>
//                                             handleBottomSheet("mobile")
//                                         }
//                                     >
//                                         <Ionicons
//                                             name="cash-outline"
//                                             size={26}
//                                             color="#9f9f9f"
//                                         />
//                                         <Text style={styles.detailLabel}>
//                                             Mobile money
//                                         </Text>
//                                     </TouchableOpacity>
//                                 </View>
//                             </View>
//                         </View>
//                     </View>

//                     {/* Bouton confirmer le paiement */}

//                     <View style={styles.containerPay}>
//                         <View style={styles.textContainer}>
//                             <Text>
//                                 Nam gravida erat! Omnis, cursus culpa pretium
//                                 urna sodales. Adipisicing, bibendum deserunt,
//                                 elementum veniam enim cupiditate. Nam quibusdam
//                                 perspiciatis cillum ullamcorper ipsa, vero ad.
//                                 Ligula tempus, porttitor dui quae cupiditate
//                                 illo maecenas quisqua
//                             </Text>
//                         </View>
//                         <TouchableOpacity
//                             style={defaulStyles.btn}
//                             onPress={() =>
//                                 router.push("(modals)/bookingsuccess")
//                             }
//                         >
//                             <Text style={defaulStyles.btnText}>
//                                 Confirmer et payer
//                             </Text>
//                         </TouchableOpacity>
//                     </View>
//                 </View>

//                 {/* BottomSheet */}
//                 {showBottomSheet && (
//                     <BottomSheet
//                         snapPoints={snapPoints}
//                         index={0}
//                         ref={bottomRef}
//                     >
//                         <View style={styles.contentContainer}>
//                             <View style={styles.containerHeadlineContainer}>
//                                 <View style={styles.containerHeadline}>
//                                     <TouchableOpacity
//                                         style={styles.closeButton}
//                                         onPress={() =>
//                                             bottomRef.current?.close()
//                                         }
//                                     >
//                                         <Ionicons
//                                             name="close-outline"
//                                             size={28}
//                                         />
//                                     </TouchableOpacity>
//                                     <Text style={styles.containerHeadline}>
//                                         {paymentMethod === "credit"
//                                             ? "Indiquez les informations de votre carte"
//                                             : "Indiquez les numéro votre mobile money"}
//                                     </Text>
//                                 </View>
//                             </View>
//                             {paymentMethod === "credit" && (
//                                 <View
//                                     style={{
//                                         position: "relative",
//                                         marginTop: 21,
//                                     }}
//                                 >
//                                     {/* Le formulaire pour la carte credit */}

//                                     <CreditCardInput />
//                                 </View>
//                             )}
//                             {paymentMethod === "mobile" && (
//                                 <View
//                                     style={{
//                                         position: "relative",
//                                         marginTop: 21,
//                                     }}
//                                 >
//                                     {/* Le formulaire pour le Mobile Money */}
//                                     <MobileMoney />
//                                 </View>
//                             )}
//                         </View>
//                     </BottomSheet>
//                 )}
//                 {/* BottomSheet FIN */}
//             </ScrollView>

//             {/* Section de modification des voyageurs */}
//             {openCard === 2 && (
//                 <Animated.View
//                     style={[
//                         styles.cardBody,
//                         {
//                             opacity: openCard === 2 ? 1 : 0,
//                         },
//                     ]}
//                 >
//                     <Animated.Text entering={FadeIn}>
//                         <View style={styles.cardHeader}>
//                             <TouchableOpacity onPress={handleClose}>
//                                 <Ionicons name="close-outline" size={28} />
//                             </TouchableOpacity>
//                             <Text style={styles.headerText}>
//                                 Qui vient avec vous ?
//                             </Text>
//                         </View>
//                     </Animated.Text>
//                     <View
//                         style={{
//                             flex: 1,
//                             borderBottomColor: "#333",
//                             borderBottomWidth: StyleSheet.hairlineWidth,
//                             marginBottom: 9,
//                         }}
//                     />
//                     {groups.map((item, index) => (
//                         <View
//                             key={index}
//                             style={[styles.guestsItem, styles.itemborder]}
//                         >
//                             <View>
//                                 <Text
//                                     style={{
//                                         fontFamily: "mon-b",
//                                         fontSize: 16,
//                                     }}
//                                 >
//                                     {item.name}
//                                 </Text>
//                                 <Text
//                                     style={{
//                                         fontFamily: "mon",
//                                         fontSize: 12,
//                                         color: Colors.gray,
//                                     }}
//                                 >
//                                     {item.text}
//                                 </Text>
//                             </View>
//                             <View
//                                 style={{
//                                     flexDirection: "row",
//                                     alignItems: "center",
//                                     gap: 10,
//                                 }}
//                             >
//                                 <TouchableOpacity
//                                     onPress={() => {
//                                         const newGroups = [...groups];
//                                         newGroups[index].count =
//                                             newGroups[index].count > 0
//                                                 ? newGroups[index].count - 1
//                                                 : 0;
//                                         setGroups(newGroups);
//                                     }}
//                                 >
//                                     <Ionicons
//                                         name="remove-circle-outline"
//                                         size={26}
//                                         color={
//                                             groups[index].count > 0
//                                                 ? Colors.gray
//                                                 : "#cdcdcd"
//                                         }
//                                     />
//                                 </TouchableOpacity>
//                                 <Text
//                                     style={{
//                                         fontFamily: "mon",
//                                         fontSize: 16,
//                                         textAlign: "center",
//                                         minWidth: 18,
//                                     }}
//                                 >
//                                     {item.count}
//                                 </Text>
//                                 <TouchableOpacity
//                                     onPress={() => {
//                                         const newGroups = [...groups];
//                                         newGroups[index].count++;
//                                         setGroups(newGroups);
//                                     }}
//                                 >
//                                     <Ionicons
//                                         name="add-circle-outline"
//                                         size={26}
//                                         color={Colors.gray}
//                                     />
//                                 </TouchableOpacity>
//                             </View>
//                         </View>
//                     ))}
//                     <View
//                         style={{
//                             flexDirection: "row",
//                             justifyContent: "space-between",
//                             alignItems: "center",
//                         }}
//                     >
//                         <TouchableOpacity onPress={handleClose}>
//                             <Text style={styles.btnText}>Annuler</Text>
//                         </TouchableOpacity>
//                         <TouchableOpacity
//                             style={[
//                                 defaulStyles.btn,
//                                 {
//                                     paddingHorizontal: 20,
//                                     paddingRight: 20,
//                                 },
//                             ]}
//                             onPress={() => setOpenCard(0)} // Fermer la section de modification
//                         >
//                             <Text style={defaulStyles.btnText}>
//                                 Enregistrer
//                             </Text>
//                         </TouchableOpacity>
//                     </View>
//                 </Animated.View>
//             )}
//         </GestureHandlerRootView>
//     );
// };

// const styles = StyleSheet.create({
//     scrollViewContent: {
//         paddingBottom: 50,
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
//         maxWidth: 270,
//         marginRight: 105,
//         paddingRight: 1,
//     },
//     title: {
//         color: "#000",
//         fontSize: 14,
//         fontFamily: "mon-b",
//     },
//     subtitle: {
//         marginTop: 10,
//         color: Colors.darkGray,
//         fontSize: 16,
//         fontFamily: "mon",
//     },
//     ratingContainer: {
//         flexDirection: "row",
//         justifyContent: "space-between",
//         marginTop: 10,
//     },
//     ratingText: {
//         color: Colors.primary,
//         fontSize: 16,
//         fontFamily: "mon-sb",
//     },
//     superHostText: {
//         color: Colors.secondary,
//         fontSize: 16,
//         fontFamily: "mon-sb",
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
//         fontFamily: "mon-sb",
//     },
//     detailValue: {
//         fontSize: 16,
//         color: Colors.black,
//         fontFamily: "mon",
//     },
//     modifyText: {
//         fontSize: 16,
//         color: Colors.primary,
//         fontFamily: "mon-sb",
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
//         marginBottom: 10,
//     },
//     contentContainer: {
//         flex: 1,
//         alignItems: "center",
//     },
//     containerHeadline: {
//         fontSize: 15,
//         fontWeight: "700",
//     },
//     input: {
//         width: "200",
//         height: 44,
//         borderWidth: 1,
//         borderColor: "#ABABAB",
//         borderRadius: 8,
//         padding: 10,
//         backgroundColor: "#fff",
//         marginBottom: 10,
//     },
//     btnText: {
//         color: Colors.primary,
//         paddingTop: 15,
//         fontSize: 16,
//         fontFamily: "mon-b",
//     },
//     containerHeadlineContainer: {
//         flexDirection: "row",
//         alignItems: "center",
//     },
//     closeButton: {
//         // position: "absolute",
//         // top: 10,
//         // right: 10,
//         // zIndex: 10,
//         marginRight: 30,
//     },
//     cardHeader: {
//         flexDirection: "row",
//         justifyContent: "space-between",
//         alignItems: "center",
//     },
//     headerText: {
//         fontWeight: "bold",
//         fontFamily: "mon-b",
//         fontSize: 18,
//         padding: 20,
//     },
//     cardBody: {
//         paddingHorizontal: 20,
//         marginBottom: 20,
//         backgroundColor: "#fff",
//         borderRadius: 20,
//     },
//     guestsItem: {
//         flexDirection: "row",
//         justifyContent: "space-between",
//         marginBottom: 15,
//     },
//     itemborder: {
//         borderBottomWidth: 1,
//         borderBottomColor: "#ddd",
//         paddingBottom: 10,
//     },
// });

// export default Pay;

import React, { useState, useMemo, useRef } from "react";
import {
    View,
    Text,
    TouchableOpacity,
    Image,
    StyleSheet,
    ScrollView,
    Animated,
} from "react-native";
import { defaulStyles } from "../../constants/Styles";
import { Colors } from "@/constants/Colors";
import Ionicons from "@expo/vector-icons/Ionicons";
import BottomSheet from "@gorhom/bottom-sheet";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import listingsData from "@/assets/data/listings.json";
import { useLocalSearchParams } from "expo-router";
import { FadeIn } from "react-native-reanimated";
import CreditCardInput from "../../components/CreditCardInput";
import MobileMoney from "../../components/MobileMoney";
import { Link } from "expo-router";
import { useRouter } from "expo-router";
import DateTimePicker from "@react-native-community/datetimepicker";
import { useAuth } from "../context/contextLogin";

const Pay = () => {
    const bottomRef = useRef(null);
    const snapPoints = useMemo(() => ["35%"]);
    const [showBottomSheet, setShowBottomSheet] = useState(false);
    const [paymentMethod, setPaymentMethod] = useState(null);
    const [openCard, setOpenCard] = useState(0); // 0 = pas ouvert, 2 = section de modification des voyageurs ouverte
    const [groups, setGroups] = useState([
        { name: "Adulte", text: "13 ans ou plus", count: 0 },
        { name: "Enfant", text: "Ages 2 - 12", count: 0 },
        { name: "Bébé", text: "Moins de 2 ans", count: 0 },
        {
            name: "Animaux de compagnie",
            texte: "Animaux autorisés",
            count: 0,
        },
    ]);
    // const [isExpanded, setIsExpanded] = useState(false);

    const totalVoyageurs = groups.reduce((acc, group) => acc + group.count, 0);
    const router = useRouter();
    const { id } = useLocalSearchParams();
    const listing = listingsData.find((item) => item.id === id);
    const [arrivalDate, setArrivalDate] = useState(new Date());
    const [endDate, setEndDate] = useState(new Date());
    const [showDatePicker, setShowDatePicker] = useState(false);

    // Calcul des détails du prix avec vérification des valeurs
    const numberOfNights = Number(listing?.numberOfNights) || 0;
    const cleaningFee = Number(listing?.cleaningFee) || 0;
    const taxes = Number(listing?.taxes) || 0;
    const pricePerNight = Number(listing?.pricePerNight) || 0;

    const totalPrice = pricePerNight * numberOfNights;
    const grandTotal = totalPrice + cleaningFee + taxes;

    const { addReservation } = useAuth();

    const handleBottomSheet = (method) => {
        if (showBottomSheet && paymentMethod === method) {
            setShowBottomSheet(false);
            setPaymentMethod(null);
        } else {
            setPaymentMethod(method);
            setShowBottomSheet(true);
        }
    };

    const handleOpenCard = () => {
        setOpenCard(openCard === 2 ? 0 : 2); // Alterner entre ouvert et fermé
    };
    const handleClose = () => {
        setOpenCard(0); // Fermer la section de modification des voyageurs
    };

    const formatDateRange = (startDate, endDate) => {
        if (startDate && endDate) {
            const start = new Date(startDate).toLocaleDateString("fr-FR", {
                month: "short",
                day: "numeric",
            });
            const end = new Date(endDate).toLocaleDateString("fr-FR", {
                month: "short",
                day: "numeric",
            });
            return `${start} - ${end}`;
        }
        return "Sélectionnez une date";
    };

    const handleDateChange = (event, selectedDate) => {
        setShowDatePicker(false);
        if (!arrivalDate) {
            setArrivalDate(selectedDate);
        } else {
            setEndDate(selectedDate);
        }
    };

    const showDatePickerHandler = () => {
        setShowDatePicker(true);
    };

    const handleConfirmAndPay = () => {
        const selectedDateRange = formatDateRange(arrivalDate, endDate);
        const totalVoyageurs = groups.reduce(
            (acc, group) => acc + group.count,
            0
        );

        // Créer un objet réservation
        const reservation = {
            id: `${listing.id}-${Date.now()}`, // Générer un ID unique
            property: listing.title,
            propertyImage: listing.featuredImage,
            dateRange: selectedDateRange,
            voyageurs: totalVoyageurs,
            total: grandTotal.toFixed(2),
            paymentMethod: paymentMethod || "Non spécifié",
        };

        // Ajouter la réservation au contexte
        addReservation(reservation);

        router.push({
            pathname: "(modals)/bookingsuccess",
            params: {
                date: selectedDateRange,
                voyageurs: totalVoyageurs,
                total: grandTotal.toFixed(2),
                paymentMethod: paymentMethod || "Non spécifié",
            },
        });
    };

    return (
        <GestureHandlerRootView style={{ flex: 1 }}>
            <ScrollView contentContainerStyle={styles.scrollViewContent}>
                <View style={styles.container}>
                    <View style={styles.row}>
                        <Image
                            source={{ uri: listing.featuredImage }}
                            style={styles.avatarImage}
                        />
                        <View style={styles.infoContainer}>
                            <Text style={styles.title}>{listing.title}</Text>
                            <Text style={styles.subtitle}>
                                {listing.titles}
                            </Text>
                            <View style={styles.ratingContainer}>
                                <Text style={styles.ratingText}>
                                    {listing.rating}
                                </Text>
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
                                        {arrivalDate && endDate
                                            ? formatDateRange(
                                                  arrivalDate,
                                                  endDate
                                              )
                                            : formatDateRange(
                                                  new Date(),
                                                  new Date()
                                              )}
                                    </Text>
                                </View>
                                <TouchableOpacity
                                    onPress={showDatePickerHandler}
                                >
                                    <Text style={styles.modifyText}>
                                        Modifier
                                    </Text>
                                </TouchableOpacity>
                            </View>
                            {showDatePicker && (
                                <DateTimePicker
                                    value={arrivalDate || new Date()}
                                    mode="date"
                                    display="spinner"
                                    onChange={handleDateChange}
                                    minimumDate={new Date()}
                                />
                            )}

                            <View style={styles.detailRow}>
                                <View>
                                    <Text style={styles.detailLabel}>
                                        Voyageurs
                                    </Text>
                                    <Text style={styles.detailValue}>
                                        {groups.reduce(
                                            (acc, group) => acc + group.count,
                                            0
                                        )}
                                        voyageurs
                                    </Text>
                                    <Text>
                                        {groups
                                            .map(
                                                (group) =>
                                                    `${group.count} ${
                                                        group.name
                                                    }${
                                                        group.count > 1
                                                            ? "s"
                                                            : ""
                                                    }`
                                            )
                                            .join(", ")}
                                    </Text>
                                </View>
                                <TouchableOpacity onPress={handleOpenCard}>
                                    <Text style={styles.modifyText}>
                                        Modifier
                                    </Text>
                                </TouchableOpacity>
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
                                        {pricePerNight}$ x {numberOfNights}
                                        nuits
                                    </Text>
                                </View>
                                <Text style={styles.modifyText}>
                                    {totalPrice} $
                                </Text>
                            </View>

                            <View style={styles.detailRow}>
                                <View>
                                    <Text style={styles.detailLabel}>
                                        Frais de ménage
                                    </Text>
                                </View>
                                <Text style={styles.modifyText}>
                                    {cleaningFee} $
                                </Text>
                            </View>
                            <View style={styles.detailRow}>
                                <View>
                                    <Text style={styles.detailLabel}>
                                        Taxes
                                    </Text>
                                </View>
                                <Text style={styles.modifyText}>{taxes} $</Text>
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
                                    {grandTotal.toFixed(2)} $
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
                        <TouchableOpacity
                            style={defaulStyles.btn}
                            onPress={handleConfirmAndPay}
                        >
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

                                    <CreditCardInput />
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
                                    <MobileMoney />
                                </View>
                            )}
                        </View>
                    </BottomSheet>
                )}
                {/* BottomSheet FIN */}
            </ScrollView>

            {/* Section de modification des voyageurs */}
            {openCard === 2 && (
                <Animated.View
                    style={[
                        styles.cardBody,
                        {
                            opacity: openCard === 2 ? 1 : 0,
                        },
                    ]}
                >
                    <Animated.Text entering={FadeIn}>
                        <View style={styles.cardHeader}>
                            <TouchableOpacity onPress={handleClose}>
                                <Ionicons name="close-outline" size={28} />
                            </TouchableOpacity>
                            <Text style={styles.headerText}>
                                Qui vient avec vous ?
                            </Text>
                        </View>
                    </Animated.Text>
                    <View
                        style={{
                            flex: 1,
                            borderBottomColor: "#333",
                            borderBottomWidth: StyleSheet.hairlineWidth,
                            marginBottom: 9,
                        }}
                    />
                    {groups.map((item, index) => (
                        <View
                            key={index}
                            style={[styles.guestsItem, styles.itemborder]}
                        >
                            <View>
                                <Text
                                    style={{
                                        fontFamily: "mon-b",
                                        fontSize: 16,
                                    }}
                                >
                                    {item.name}
                                </Text>
                                <Text
                                    style={{
                                        fontFamily: "mon",
                                        fontSize: 12,
                                        color: Colors.gray,
                                    }}
                                >
                                    {item.text}
                                </Text>
                            </View>
                            <View
                                style={{
                                    flexDirection: "row",
                                    alignItems: "center",
                                    gap: 10,
                                }}
                            >
                                <TouchableOpacity
                                    onPress={() => {
                                        const newGroups = [...groups];
                                        newGroups[index].count =
                                            newGroups[index].count > 0
                                                ? newGroups[index].count - 1
                                                : 0;
                                        setGroups(newGroups);
                                    }}
                                >
                                    <Ionicons
                                        name="remove-circle-outline"
                                        size={26}
                                        color={
                                            groups[index].count > 0
                                                ? Colors.gray
                                                : "#cdcdcd"
                                        }
                                    />
                                </TouchableOpacity>
                                <Text
                                    style={{
                                        fontFamily: "mon",
                                        fontSize: 16,
                                        textAlign: "center",
                                        minWidth: 18,
                                    }}
                                >
                                    {item.count}
                                </Text>
                                <TouchableOpacity
                                    onPress={() => {
                                        const newGroups = [...groups];
                                        newGroups[index].count++;
                                        setGroups(newGroups);
                                    }}
                                >
                                    <Ionicons
                                        name="add-circle-outline"
                                        size={26}
                                        color={Colors.gray}
                                    />
                                </TouchableOpacity>
                            </View>
                        </View>
                    ))}
                    <View
                        style={{
                            flexDirection: "row",
                            justifyContent: "space-between",
                            alignItems: "center",
                        }}
                    >
                        <TouchableOpacity onPress={handleClose}>
                            <Text style={styles.btnText}>Annuler</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={[
                                defaulStyles.btn,
                                {
                                    paddingHorizontal: 20,
                                    paddingRight: 20,
                                },
                            ]}
                            onPress={() => setOpenCard(0)} // Fermer la section de modification
                        >
                            <Text style={defaulStyles.btnText}>
                                Enregistrer
                            </Text>
                        </TouchableOpacity>
                    </View>
                </Animated.View>
            )}
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

export default Pay;
