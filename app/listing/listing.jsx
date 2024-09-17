// // import {
// //     StyleSheet,
// //     Text,
// //     View,
// //     TouchableOpacity,
// //     TextInput,
// //     ScrollView,
// //     Image,
// // } from "react-native";
// // import React, { useState, useEffect } from "react";
// // import { BlurView } from "expo-blur";
// // import Animated, {
// //     FadeIn,
// //     FadeOut,
// //     SlideInDown,
// // } from "react-native-reanimated";
// // import { defaulStyles } from "../../constants/Styles";
// // import { useNavigation } from "@react-navigation/native";
// // import { Ionicons } from "@expo/vector-icons";
// // import { Colors } from "../../constants/Colors";
// // import { places } from "../../assets/data/places";
// // import DateTimePicker from "@react-native-community/datetimepicker";

// // const AnimatedTouchableOpacity =
// //     Animated.createAnimatedComponent(TouchableOpacity);

// // const guestsGroups = [
// //     {
// //         name: "Adults",
// //         text: "Age 13 or above",
// //         count: 0,
// //     },
// //     {
// //         name: "Children",
// //         text: "Ages 2 - 12",
// //         count: 0,
// //     },
// //     {
// //         name: "Infants",
// //         text: "Under 2",
// //         count: 0,
// //     },
// //     {
// //         name: "Pets",
// //         text: "Pets allowed",
// //         count: 0,
// //     },
// // ];

// // const Page = () => {
// //     const navigation = useNavigation();
// //     const [openCard, setOpenCard] = useState(2);
// //     const [selectedPlace, setSelectedPlace] = useState(null);
// //     const [arrivalDate, setArrivalDate] = useState(null);
// //     const [endDate, setEndDate] = useState(null);
// //     const [showArrivalDatePicker, setShowArrivalDatePicker] = useState(false);
// //     const [showEndDatePicker, setShowEndDatePicker] = useState(false);
// //     const [groups, setGroups] = useState(guestsGroups);
// //     const [searchQuery, setSearchQuery] = useState("");
// //     const [filteredPlaces, setFilteredPlaces] = useState(places);
// //     const [locationQuery, setLocationQuery] = useState("");

// //     useEffect(() => {
// //         let filtered = places;

// //         if (searchQuery !== "") {
// //             filtered = filtered.filter((place) =>
// //                 place.title.toLowerCase().includes(searchQuery.toLowerCase())
// //             );
// //         }

// //         if (locationQuery !== "") {
// //             filtered = filtered.filter((place) =>
// //                 place.location
// //                     .toLowerCase()
// //                     .includes(locationQuery.toLowerCase())
// //             );
// //         }

// //         setFilteredPlaces(filtered);
// //     }, [searchQuery, locationQuery]);

// //     const onClearAll = () => {
// //         setOpenCard(0);
// //         setSelectedPlace(null);
// //         setArrivalDate(null);
// //         setEndDate(null);
// //         setShowArrivalDatePicker(false);
// //         setShowEndDatePicker(false);
// //         setGroups(guestsGroups.map((group) => ({ ...group, count: 0 })));
// //         setSearchQuery("");
// //         setLocationQuery("");
// //     };

// //     const handlePlaceSelect = (index) => {
// //         setSelectedPlace(index);
// //         setOpenCard(1); // Ouvre automatiquement la section "Quand" après avoir sélectionné une destination
// //     };

// //     const handleDateChange = (event, selectedDate) => {
// //         if (event.type === "set") {
// //             const currentDate = selectedDate || new Date();
// //             if (showArrivalDatePicker) {
// //                 setArrivalDate(currentDate);
// //                 setShowArrivalDatePicker(false);
// //             } else if (showEndDatePicker) {
// //                 setEndDate(currentDate);
// //                 setShowEndDatePicker(false);
// //             }
// //         } else {
// //             setShowArrivalDatePicker(false);
// //             setShowEndDatePicker(false);
// //         }
// //     };

// //     const handleNextClick = () => {
// //         if (openCard === 1 && arrivalDate && endDate) {
// //             setOpenCard(2); // Passe à la section "Qui" après la sélection des dates
// //         }
// //     };

// //     return (
// //         <BlurView intensity={-2} style={styles.container} tint="#fff">
// //             {/* Where */}
// //             <View style={styles.card}>
// //                 {openCard !== 0 && (
// //                     <AnimatedTouchableOpacity
// //                         onPress={() => setOpenCard(0)}
// //                         style={styles.cardPreviex}
// //                         entering={FadeIn.duration(200)}
// //                         exiting={FadeOut.duration(200)}
// //                     >
// //                         <Text style={styles.previewText}>Où</Text>
// //                         <Text style={styles.previewDate}>
// //                             {selectedPlace !== null
// //                                 ? places[selectedPlace].title
// //                                 : "Je suis flexible."}
// //                         </Text>
// //                     </AnimatedTouchableOpacity>
// //                 )}

// //                 {openCard === 0 && (
// //                     <>
// //                         <Animated.Text
// //                             entering={FadeIn}
// //                             style={styles.cardHeader}
// //                         >
// //                             Where to
// //                         </Animated.Text>
// //                         <Animated.View style={styles.cardBody}>
// //                             <View style={styles.searchSection}>
// //                                 <Ionicons
// //                                     style={styles.searchIcon}
// //                                     name="search-outline"
// //                                     size={20}
// //                                 />
// //                                 <TextInput
// //                                     style={styles.inputField}
// //                                     placeholder="Rechercher une destination"
// //                                     placeholderTextColor={Colors.gray}
// //                                     value={searchQuery}
// //                                     onChangeText={setSearchQuery}
// //                                 />
// //                             </View>
// //                             <View style={styles.searchSection}>
// //                                 <Ionicons
// //                                     style={styles.searchIcon}
// //                                     name="location-outline"
// //                                     size={20}
// //                                 />
// //                                 <TextInput
// //                                     style={styles.inputField}
// //                                     placeholder="Rechercher par localisation"
// //                                     placeholderTextColor={Colors.gray}
// //                                     value={locationQuery}
// //                                     onChangeText={setLocationQuery}
// //                                 />
// //                             </View>
// //                         </Animated.View>
// //                         <ScrollView
// //                             horizontal
// //                             showsHorizontalScrollIndicator={false}
// //                             contentContainerStyle={{
// //                                 gap: 25,
// //                                 paddingLeft: 20,
// //                                 paddingBottom: 30,
// //                             }}
// //                         >
// //                             {filteredPlaces.map((item, index) => (
// //                                 <TouchableOpacity
// //                                     key={index}
// //                                     onPress={() => handlePlaceSelect(index)}
// //                                 >
// //                                     <Image
// //                                         source={{ uri: item.image }}
// //                                         style={
// //                                             selectedPlace === index
// //                                                 ? styles.placeSelected
// //                                                 : styles.place
// //                                         }
// //                                     />
// //                                     <Text
// //                                         style={[
// //                                             {
// //                                                 fontFamily: "mon-s",
// //                                                 paddingTop: 6,
// //                                             },
// //                                             selectedPlace === index
// //                                                 ? { fontFamily: "mon-sb" }
// //                                                 : { fontFamily: "mon" },
// //                                         ]}
// //                                     >
// //                                         {item.title}
// //                                     </Text>
// //                                 </TouchableOpacity>
// //                             ))}
// //                         </ScrollView>
// //                     </>
// //                 )}
// //             </View>
// //             {/* When */}
// //             <View style={styles.card}>
// //                 {openCard !== 1 && (
// //                     <AnimatedTouchableOpacity
// //                         onPress={() => {
// //                             setOpenCard(1);
// //                             setShowArrivalDatePicker(false);
// //                             setShowEndDatePicker(false);
// //                         }}
// //                         style={styles.cardPreviex}
// //                         entering={FadeIn.duration(200)}
// //                         exiting={FadeOut.duration(200)}
// //                     >
// //                         <Text style={styles.previewText}>Quand</Text>
// //                         <Text style={styles.previewDate}>
// //                             {arrivalDate && endDate
// //                                 ? `${arrivalDate.toLocaleDateString()} - ${endDate.toLocaleDateString()}`
// //                                 : "Chaque semaine."}
// //                         </Text>
// //                     </AnimatedTouchableOpacity>
// //                 )}

// //                 {openCard === 1 && (
// //                     <>
// //                         <Animated.Text
// //                             entering={FadeIn}
// //                             style={styles.cardHeader}
// //                         >
// //                             Quand voulez-vous voyager ?
// //                         </Animated.Text>
// //                         <Animated.View style={styles.cardBody}>
// //                             <TouchableOpacity
// //                                 onPress={() => setShowArrivalDatePicker(true)}
// //                                 style={styles.dateButton}
// //                             >
// //                                 <Text style={styles.dateButtonText}>
// //                                     {arrivalDate
// //                                         ? `Date d'arrivée: ${arrivalDate.toLocaleDateString()}`
// //                                         : "Sélectionner la date d'arrivée"}
// //                                 </Text>
// //                             </TouchableOpacity>
// //                             {showArrivalDatePicker && (
// //                                 <DateTimePicker
// //                                     mode="date"
// //                                     display="spinner"
// //                                     value={arrivalDate || new Date()}
// //                                     onChange={handleDateChange}
// //                                 />
// //                             )}

// //                             <TouchableOpacity
// //                                 onPress={() => setShowEndDatePicker(true)}
// //                                 style={styles.dateButton}
// //                             >
// //                                 <Text style={styles.dateButtonText}>
// //                                     {endDate
// //                                         ? `Date de fin: ${endDate.toLocaleDateString()}`
// //                                         : "Sélectionner la date de fin"}
// //                                 </Text>
// //                             </TouchableOpacity>
// //                             {showEndDatePicker && (
// //                                 <DateTimePicker
// //                                     mode="date"
// //                                     display="spinner"
// //                                     value={endDate || new Date()}
// //                                     onChange={handleDateChange}
// //                                 />
// //                             )}

// //                             {arrivalDate && endDate && (
// //                                 <TouchableOpacity
// //                                     onPress={handleNextClick}
// //                                     style={styles.nextButton}
// //                                 >
// //                                     <Text style={styles.nextButtonText}>
// //                                         Suivant
// //                                     </Text>
// //                                 </TouchableOpacity>
// //                             )}
// //                         </Animated.View>
// //                     </>
// //                 )}
// //             </View>
// //             {/* Who */}
// //             <View style={styles.card}>
// //                 {openCard !== 2 && (
// //                     <AnimatedTouchableOpacity
// //                         onPress={() => setOpenCard(2)}
// //                         style={styles.cardPreviex}
// //                         entering={FadeIn.duration(200)}
// //                         exiting={FadeOut.duration(200)}
// //                     >
// //                         <Text style={styles.previewText}>Qui</Text>
// //                         <Text style={styles.previewDate}>
// //                             {groups[0].count > 0
// //                                 ? `${groups[0].count} ${groups[0].name}`
// //                                 : "Ajouter des invités."}
// //                         </Text>
// //                     </AnimatedTouchableOpacity>
// //                 )}

// //                 {openCard === 2 && (
// //                     <>
// //                         <Animated.Text
// //                             entering={FadeIn}
// //                             style={styles.cardHeader}
// //                         >
// //                             Combien d'invités ?
// //                         </Animated.Text>
// //                         <Animated.View style={styles.cardBody}>
// //                             {groups.map((group, index) => (
// //                                 <View
// //                                     key={index}
// //                                     style={styles.guestsGroupContainer}
// //                                 >
// //                                     <View style={styles.guestsGroupText}>
// //                                         <Text
// //                                             style={{
// //                                                 fontFamily: "mon-sb",
// //                                                 fontSize: 15,
// //                                             }}
// //                                         >
// //                                             {group.name}
// //                                         </Text>
// //                                         <Text
// //                                             style={{
// //                                                 fontFamily: "mon",
// //                                                 fontSize: 13,
// //                                             }}
// //                                         >
// //                                             {group.text}
// //                                         </Text>
// //                                     </View>
// //                                     <View style={styles.guestsGroupControl}>
// //                                         <TouchableOpacity
// //                                             onPress={() => {
// //                                                 const newGroups = [...groups];
// //                                                 newGroups[index].count =
// //                                                     newGroups[index].count > 0
// //                                                         ? newGroups[index]
// //                                                               .count - 1
// //                                                         : 0;
// //                                                 setGroups(newGroups);
// //                                             }}
// //                                             style={[
// //                                                 styles.controlButton,
// //                                                 {
// //                                                     borderColor:
// //                                                         group.count > 0
// //                                                             ? Colors.black
// //                                                             : Colors.gray,
// //                                                 },
// //                                             ]}
// //                                         >
// //                                             <Text
// //                                                 style={{
// //                                                     color:
// //                                                         group.count > 0
// //                                                             ? Colors.black
// //                                                             : Colors.gray,
// //                                                     fontSize: 20,
// //                                                 }}
// //                                             >
// //                                                 -
// //                                             </Text>
// //                                         </TouchableOpacity>
// //                                         <Text
// //                                             style={{
// //                                                 fontFamily: "mon-sb",
// //                                                 fontSize: 16,
// //                                             }}
// //                                         >
// //                                             {group.count}
// //                                         </Text>
// //                                         <TouchableOpacity
// //                                             onPress={() => {
// //                                                 const newGroups = [...groups];
// //                                                 newGroups[index].count += 1;
// //                                                 setGroups(newGroups);
// //                                             }}
// //                                             style={styles.controlButton}
// //                                         >
// //                                             <Text
// //                                                 style={{
// //                                                     color: Colors.black,
// //                                                     fontSize: 20,
// //                                                 }}
// //                                             >
// //                                                 +
// //                                             </Text>
// //                                         </TouchableOpacity>
// //                                     </View>
// //                                 </View>
// //                             ))}
// //                         </Animated.View>
// //                     </>
// //                 )}
// //             </View>
// //             <AnimatedTouchableOpacity
// //                 onPress={onClearAll}
// //                 style={styles.clearButton}
// //                 entering={SlideInDown}
// //             >
// //                 <Text style={styles.clearButtonText}>Tout effacer</Text>
// //             </AnimatedTouchableOpacity>
// //         </BlurView>
// //     );
// // };

// // export default Page;

// // const styles = StyleSheet.create({
// //     container: {
// //         ...defaulStyles.container,
// //         justifyContent: "center",
// //     },
// //     card: {
// //         width: "90%",
// //         alignSelf: "center",
// //         backgroundColor: "#fff",
// //         marginVertical: 10,
// //         borderRadius: 15,
// //         overflow: "hidden",
// //     },
// //     cardPreviex: {
// //         paddingHorizontal: 25,
// //         paddingVertical: 20,
// //     },
// //     previewText: {
// //         fontFamily: "mon-sb",
// //         fontSize: 15,
// //     },
// //     previewDate: {
// //         fontFamily: "mon",
// //         fontSize: 13,
// //         paddingTop: 5,
// //     },
// //     cardHeader: {
// //         fontFamily: "mon-b",
// //         fontSize: 18,
// //         paddingHorizontal: 25,
// //         paddingTop: 20,
// //     },
// //     cardBody: {
// //         padding: 20,
// //     },
// //     place: {
// //         height: 100,
// //         width: 100,
// //         resizeMode: "cover",
// //         borderRadius: 15,
// //         backgroundColor: Colors.lightGray,
// //     },
// //     placeSelected: {
// //         height: 100,
// //         width: 100,
// //         resizeMode: "cover",
// //         borderRadius: 15,
// //         borderWidth: 2,
// //         borderColor: Colors.black,
// //     },
// //     dateButton: {
// //         paddingVertical: 15,
// //         backgroundColor: Colors.lightGray,
// //         borderRadius: 10,
// //         paddingHorizontal: 15,
// //         marginVertical: 10,
// //     },
// //     dateButtonText: {
// //         fontFamily: "mon",
// //         fontSize: 15,
// //     },
// //     nextButton: {
// //         paddingVertical: 15,
// //         backgroundColor: Colors.black,
// //         borderRadius: 10,
// //         paddingHorizontal: 15,
// //         marginVertical: 10,
// //     },
// //     nextButtonText: {
// //         fontFamily: "mon",
// //         fontSize: 15,
// //         color: "#fff",
// //         textAlign: "center",
// //     },
// //     guestsGroupContainer: {
// //         flexDirection: "row",
// //         justifyContent: "space-between",
// //         alignItems: "center",
// //         marginVertical: 15,
// //     },
// //     guestsGroupText: {
// //         flexDirection: "column",
// //     },
// //     guestsGroupControl: {
// //         flexDirection: "row",
// //         alignItems: "center",
// //         gap: 20,
// //     },
// //     controlButton: {
// //         borderRadius: 15,
// //         borderWidth: 1,
// //         paddingVertical: 2,
// //         paddingHorizontal: 8,
// //         justifyContent: "center",
// //         alignItems: "center",
// //     },
// //     searchSection: {
// //         flexDirection: "row",
// //         alignItems: "center",
// //         backgroundColor: Colors.lightGray,
// //         borderRadius: 10,
// //         paddingHorizontal: 15,
// //         paddingVertical: 10,
// //         marginBottom: 10,
// //     },
// //     searchIcon: {
// //         color: Colors.gray,
// //     },
// //     inputField: {
// //         fontFamily: "mon",
// //         fontSize: 16,
// //         color: Colors.black,
// //         flex: 1,
// //         marginLeft: 10,
// //     },
// //     clearButton: {
// //         alignSelf: "center",
// //         marginTop: 20,
// //     },
// //     clearButtonText: {
// //         color: Colors.red,
// //         fontFamily: "mon-sb",
// //     },
// // });

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
// import CreditCardInput from "../../components/CreditCardInput";
// import MobileMoney from "../../components/MobileMoney";

// const Pay = () => {
//     const bottomRef = useRef(null);
//     const snapPoints = useMemo(() => ["35%"]);
//     const [showBottomSheet, setShowBottomSheet] = useState(false);
//     const [paymentMethod, setPaymentMethod] = useState(null);
//     const [openCard, setOpenCard] = useState(0); // 0 = pas ouvert, 2 = section de modification des voyageurs
//     const [groups, setGroups] = useState([
//         { name: "Adultes", text: "13 ans ou plus", count: 0 },
//         { name: "Enfants", text: "Ages 2 - 12", count: 0 },
//         { name: "Bébés", text: "Moins de 2 ans", count: 0 },
//         {
//             name: "Animaux de compagnie",
//             text: "Animaux autorisés",
//             count: 0,
//         },
//     ]);

//     const { id } = useLocalSearchParams();
//     const listing = listingsData.find((item) => item.id === id);

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
//                                         12-17 sept
//                                     </Text>
//                                 </View>
//                                 <Text style={styles.modifyText}>Modifier</Text>
//                             </View>

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
//                                         ({grandTotal.toFixed(2)}$)
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
//                                         {pricePerNight}$ x {numberOfNights}{" "}
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
//                             <Text style={styles.textPay}>
//                                 Confirmer le paiement
//                             </Text>
//                         </View>
//                     </View>
//                 </View>
//             </ScrollView>

//             <BottomSheet
//                 ref={bottomRef}
//                 snapPoints={snapPoints}
//                 index={-1}
//                 onChange={() => setShowBottomSheet(true)}
//                 style={{
//                     backgroundColor: Colors.secondaryColor,
//                 }}
//             >
//                 <View>
//                     {paymentMethod === "credit" && <CreditCardInput />}
//                     {paymentMethod === "mobile" && <MobileMoney />}
//                 </View>
//             </BottomSheet>
//         </GestureHandlerRootView>
//     );
// };

// const styles = StyleSheet.create({
//     scrollViewContent: {
//         flexGrow: 1,
//     },
//     container: {
//         padding: 20,
//     },
//     row: {
//         flexDirection: "row",
//         marginBottom: 20,
//     },
//     avatarImage: {
//         width: 100,
//         height: 100,
//         borderRadius: 10,
//     },
//     infoContainer: {
//         marginLeft: 10,
//         flex: 1,
//     },
//     title: {
//         fontSize: 18,
//         fontWeight: "bold",
//     },
//     subtitle: {
//         fontSize: 16,
//         color: Colors.gray,
//     },
//     ratingContainer: {
//         flexDirection: "row",
//         alignItems: "center",
//     },
//     ratingText: {
//         fontSize: 14,
//         color: Colors.primaryColor,
//     },
//     superHostText: {
//         fontSize: 14,
//         color: Colors.secondaryColor,
//         marginLeft: 5,
//     },
//     voyageContainer: {
//         marginBottom: 20,
//     },
//     sectionTitle: {
//         fontSize: 16,
//         fontWeight: "bold",
//         marginBottom: 10,
//     },
//     detailRow: {
//         flexDirection: "row",
//         justifyContent: "space-between",
//         alignItems: "center",
//         marginBottom: 10,
//     },
//     detailLabel: {
//         fontSize: 14,
//         color: Colors.gray,
//     },
//     detailValue: {
//         fontSize: 14,
//         fontWeight: "bold",
//     },
//     modifyText: {
//         color: Colors.primaryColor,
//         fontSize: 14,
//     },
//     payAvec: {
//         flexDirection: "row",
//         alignItems: "center",
//         marginBottom: 10,
//     },
//     containerPay: {
//         backgroundColor: Colors.primaryColor,
//         padding: 20,
//         borderRadius: 10,
//         alignItems: "center",
//     },
//     textContainer: {
//         backgroundColor: Colors.primaryColor,
//         borderRadius: 10,
//     },
//     textPay: {
//         color: "#fff",
//         fontSize: 18,
//         fontWeight: "bold",
//     },
// });

// export default Pay;
