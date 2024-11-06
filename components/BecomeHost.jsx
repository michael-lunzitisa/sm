// import {
//     View,
//     Text,
//     TextInput,
//     Button,
//     ScrollView,
//     StyleSheet,
//     TouchableOpacity,
//     Image,
//     Alert,
// } from "react-native";
// import React, { useState } from "react";
// import { Colors } from "@/constants/Colors";
// import { Ionicons } from "@expo/vector-icons";
// import * as ImagePicker from "expo-image-picker";
// import Animated from "react-native-reanimated";
// import RNPickerSelect from "react-native-picker-select";
// import CheckBox from "expo-checkbox";
// import DateTimePicker from "@react-native-community/datetimepicker";
// import listingsData from "@/assets/data/listings.json";

// const BecomeHost = () => {
//     const [step, setStep] = useState(1);
//     const [propertyType, setPropertyType] = useState("");
//     const [location, setLocation] = useState({
//         country: "",
//         street: "",
//         propertyNumber: "",
//         city: "",
//         state: "",
//         postalCode: "",
//     });
//     const [locationName, setLocationName] = useState("");

//     const [amenities, setAmenities] = useState({
//         wifi: false,
//         internet: false,
//         tv: false,
//         airConditioning: false,
//         fan: false,
//         privateEntrance: false,
//         dryer: false,
//         washingMachine: false,
//         heating: false,
//         detergent: false,
//         babyBed: false,
//         desk: false,
//         refrigerator: false,
//         wardrobe: false,
//         fabricHook: false,
//         extraPillow: false,
//         gasStove: false,
//         toiletPaper: false,
//         freeToiletries: false,
//         makeupTable: false,
//         bathroomHeater: false,
//         kettle: false,
//         dishwasher: false,
//         barbecue: false,
//         toaster: false,
//         towel: false,
//         diningTable: false,
//         fireAlarm: false,
//         fireExtinguisher: false,
//         antiTheftKey: false,
//     });
//     const [groups, setGroups] = useState([
//         { name: "Invités", text: "", count: 0 },
//         { name: "Chambre à coucher", text: "", count: 0 },
//         { name: "Lits", text: "", count: 0 },
//         { name: "Salle de bain", text: "", count: 0 },
//         { name: "Cuisine", text: "", count: 0 },
//     ]);
//     const [description, setDescription] = useState("");
//     const [price, setPrice] = useState({
//         currency: "USD",
//         weekdayPrice: "",
//         weekendPrice: "",
//         monthlyDiscount: "",
//         minNights: "1",
//         maxNights: "99",
//     });
//     // Nouveaux états pour la gestion des nuits et de la disponibilité
//     const [minNights, setMinNights] = useState(0);
//     const [maxNights, setMaxNights] = useState(0);
//     const [startDate, setStartDate] = useState(new Date());
//     const [endDate, setEndDate] = useState(new Date());
//     const [showStartPicker, setShowStartPicker] = useState(false);
//     const [showEndPicker, setShowEndPicker] = useState(false);

//     const countries = [
//         { label: "Congo", value: "Congo" },
//         { label: "Brazza", value: "Brazza" },
//         { label: "Gabon", value: "Gabon" },
//         { label: "Tanzanie", value: "Tanzanie" },
//     ];

//     // Nouveaux états pour gérer les images
//     const [coverImage, setCoverImage] = useState(null);
//     const [propertyImages, setPropertyImages] = useState([]);

//     const stepsTotal = 9;

//     const isStepValid = () => {
//         switch (step) {
//             case 1:
//                 return propertyType.length > 0 && locationName.length > 0;
//             case 2:
//                 return groups.some((group) => group.count > 0);
//             case 3:
//                 return true;
//             case 4:
//                 return coverImage !== null; // Vérifie si une image de couverture a été sélectionnée
//             case 5:
//                 return description.length > 0;
//             case 6:
//                 return (
//                     price.weekdayPrice.length > 0 &&
//                     price.weekendPrice.length > 0
//                 );
//             case 7:
//                 return (
//                     minNights > 0 &&
//                     maxNights > 0 &&
//                     startDate &&
//                     endDate &&
//                     endDate > startDate
//                 );
//             case 8:
//                 return (
//                     location.country.length > 0 &&
//                     location.street.length > 0 &&
//                     location.propertyNumber.length > 0 &&
//                     location.city.length > 0 &&
//                     location.postalCode.length > 0
//                 );

//             // minNights > 0 && maxNights > 0 && startDate && endDate && endDate > startDate;
//             default:
//                 return true;
//         }
//     };

//     const handleNextStep = () => {
//         if (isStepValid() && step < stepsTotal) {
//             setStep(step + 1);
//         }
//     };

//     const handleInputChange = (field, value) => {
//         setLocation({
//             ...location,
//             [field]: value,
//         });
//     };

//     // Fonction pour sélectionner l'image de couverture
//     const pickCoverImage = async () => {
//         let result = await ImagePicker.launchImageLibraryAsync({
//             mediaTypes: ImagePicker.MediaTypeOptions.Images,
//             allowsEditing: true,
//             aspect: [4, 3],
//             quality: 1,
//         });

//         if (!result.canceled) {
//             setCoverImage(result.assets[0].uri);
//         } else {
//             Alert.alert("Aucune image sélectionnée !");
//         }
//     };

//     // Fonction pour ajouter des images de la propriété
//     const pickPropertyImages = async () => {
//         let result = await ImagePicker.launchImageLibraryAsync({
//             mediaTypes: ImagePicker.MediaTypeOptions.Images,
//             allowsMultipleSelection: true,
//             quality: 1,
//         });

//         if (!result.canceled) {
//             const newImages = result.assets.map((asset) => asset.uri);
//             setPropertyImages([...propertyImages, ...newImages]);
//         } else {
//             Alert.alert("Aucune image sélectionnée !");
//         }
//     };

//     // Options pour le multi-sélecteur
//     const propertyTypeOptions = [
//         { label: "Appartement", value: "Appartement" },
//         { label: "Chambre", value: "Chambre" },
//         { label: "Villa", value: "Villa" },
//         { label: "Voiture", value: "Voiture" },
//         { label: "Maison", value: "Maison" },
//     ];

//     // Liste des équipements
//     const amenitiesOptions = [
//         { label: "Wifi", value: "wifi" },
//         { label: "Internet", value: "internet" },
//         { label: "TV", value: "tv" },
//         { label: "Climatisation", value: "airConditioning" },
//         { label: "Ventilateur", value: "fan" },
//         { label: "Entrée privée", value: "privateEntrance" },
//         { label: "Séchoir", value: "dryer" },
//         { label: "Chauffage", value: "heating" },
//         { label: "Machine à laver", value: "washingMachine" },
//         { label: "Détergent", value: "detergent" },
//         { label: "Lit bébé", value: "babyBed" },
//         { label: "Bureau", value: "desk" },
//         { label: "Réfrigérateur", value: "refrigerator" },
//         { label: "Garde-robe", value: "wardrobe" },
//         { label: "Crochet à tissu", value: "fabricHook" },
//         { label: "Coussin supplémentaire", value: "extraPillow" },
//         { label: "Cuisinière à gaz", value: "gasStove" },
//         { label: "Papier toilette", value: "toiletPaper" },
//         { label: "Articles de toilette gratuits", value: "freeToiletries" },
//         { label: "Table de maquillage", value: "makeupTable" },
//         { label: "Chauffages de salle de bain", value: "bathroomHeater" },
//         { label: "Bouilloire", value: "kettle" },
//         { label: "Lave-vaisselle", value: "dishwasher" },
//         { label: "Barbecue", value: "barbecue" },
//         { label: "Grille-pain", value: "toaster" },
//         { label: "Serviette", value: "towel" },
//         { label: "Table à manger", value: "diningTable" },
//         { label: "Sirène d'incendie", value: "fireAlarm" },
//         { label: "Extincteur", value: "fireExtinguisher" },
//         { label: "Clé antivol", value: "antiTheftKey" },
//     ];
//     const handleStartDateChange = (event, selectedDate) => {
//         const currentDate = selectedDate || startDate;
//         setShowStartPicker(false);
//         setStartDate(currentDate);
//     };

//     const handleEndDateChange = (event, selectedDate) => {
//         const currentDate = selectedDate || endDate;
//         setShowEndPicker(false);
//         setEndDate(currentDate);
//     };
//     // Fonction pour publier l'annonce
//     const handlePublishListing = () => {
//         const newListing = {
//             id: listingsData.length + 1,
//             name: propertyType,
//             description,
//             price: {
//                 weekday: price.weekdayPrice,
//                 weekend: price.weekendPrice,
//                 currency: price.currency,
//             },
//             location: {
//                 ...location,
//                 startDate,
//                 endDate,
//             },
//             amenities,
//             coverImage,
//             propertyImages,
//         };

//         // Ajoutez la nouvelle annonce à la liste existante
//         listingsData.push(newListing);
//         Alert.alert("Annonce publiée avec succès !");
//         console.log("Nouvelle annonce:", newListing);
//         // Réinitialisez tous les états
//         resetForm();
//     };
//     // Fonction pour réinitialiser le formulaire
//     const resetForm = () => {
//         setStep(1);
//         setPropertyType("");
//         setLocation({
//             country: "",
//             street: "",
//             propertyNumber: "",
//             city: "",
//             state: "",
//             postalCode: "",
//         });
//         setLocationName("");
//         setAmenities({});
//         setGroups([
//             { name: "Invités", text: "", count: 0 },
//             { name: "Chambre à coucher", text: "", count: 0 },
//             { name: "Lits", text: "", count: 0 },
//             { name: "Salle de bain", text: "", count: 0 },
//             { name: "Cuisine", text: "", count: 0 },
//         ]);
//         setDescription("");
//         setPrice({
//             currency: "USD",
//             weekdayPrice: "",
//             weekendPrice: "",
//             monthlyDiscount: "",
//             minNights: "1",
//             maxNights: "99",
//         });
//         setMinNights(0);
//         setMaxNights(0);
//         setStartDate(new Date());
//         setEndDate(new Date());
//         setShowStartPicker(false);
//         setShowEndPicker(false);
//         setCoverImage(null);
//         setPropertyImages([]);
//     };
//     return (
//         <ScrollView contentContainerStyle={styles.container}>
//             <Text style={styles.title}>
//                 Devenir Hôte - Étape {step}/{stepsTotal}
//             </Text>
//             {step === 1 && (
//                 <View style={styles.stepContainer}>
//                     <Text style={styles.label}>
//                         Choix des catégories d'annonces
//                     </Text>
//                     <RNPickerSelect
//                         onValueChange={(value) => setPropertyType(value)}
//                         items={propertyTypeOptions}
//                         value={propertyType}
//                         useNativeAndroidPickerStyle={false}
//                         placeholder={{
//                             label: "Sélectionner votre catégorie",
//                             value: null,
//                         }}
//                         style={{
//                             inputIOS: styles.pickerSelectStyles,
//                             inputAndroid: styles.pickerSelectStyles,
//                             iconContainer: {
//                                 top: 15,
//                                 right: 15,
//                             },
//                         }}
//                         Icon={() => (
//                             <Ionicons
//                                 name="arrow-down"
//                                 size={24}
//                                 color="gray"
//                             />
//                         )}
//                     />
//                     {/* TextInput pour le nom du lieu */}
//                     <Text style={styles.label}>Nom du lieu</Text>
//                     <TextInput
//                         style={styles.input}
//                         placeholder="Entrez le nom du lieu"
//                         value={locationName}
//                         onChangeText={(text) => setLocationName(text)}
//                     />
//                     <Text style={styles.helperText}>
//                         Un nom accrocheur inclut généralement : Nom de la maison
//                         + Nom de la chambre + Propriété en vedette + Destination
//                         touristique.
//                     </Text>
//                 </View>
//             )}
//             {step === 2 && (
//                 <View style={styles.stepContainer}>
//                     <Text>Taille de votre emplacement</Text>
//                     <Animated.View></Animated.View>

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
//                 </View>
//             )}
//             {step === 3 && (
//                 <View style={styles.stepContainer}>
//                     <Text style={styles.label}>Équipements</Text>
//                     <Text style={styles.semiLabel}>
//                         De nombreux clients ont recherché un hébergement en
//                         fonction de critères d'équipements
//                     </Text>
//                     {amenitiesOptions.map((amenity) => (
//                         <View
//                             style={styles.checkboxContainer}
//                             key={amenity.value}
//                         >
//                             <CheckBox
//                                 value={amenities[amenity.value]}
//                                 onValueChange={(newValue) =>
//                                     setAmenities({
//                                         ...amenities,
//                                         [amenity.value]: newValue,
//                                     })
//                                 }
//                                 style={styles.checkbox}
//                                 color={
//                                     amenities[amenity.value]
//                                         ? Colors.primary
//                                         : undefined
//                                 }
//                             />
//                             <Text style={styles.label}>{amenity.label}</Text>
//                         </View>
//                     ))}
//                 </View>
//             )}
//             {/* Étape pour ajouter des photos */}
//             {step === 4 && (
//                 <View style={styles.stepContainer}>
//                     <Text>Ajouter des Photos de votre Propriété</Text>
//                     <Text style={styles.photoInstructions}>
//                         Quelques belles photos aideront les clients à avoir plus
//                         de sympathie pour votre propriété.
//                     </Text>

//                     <Text style={styles.photoLabel}>Image de couverture</Text>
//                     <TouchableOpacity
//                         style={styles.uploadButton}
//                         onPress={pickCoverImage}
//                     >
//                         <Text style={styles.uploadButtonText}>
//                             Télécharger une image
//                         </Text>
//                     </TouchableOpacity>
//                     {coverImage && (
//                         <Image
//                             source={{ uri: coverImage }}
//                             style={styles.coverImage}
//                         />
//                     )}

//                     <Text style={styles.photoLabel}>Photos du lieu</Text>
//                     <TouchableOpacity
//                         style={styles.uploadButton}
//                         onPress={pickPropertyImages}
//                     >
//                         <Text style={styles.uploadButtonText}>
//                             Télécharger des images
//                         </Text>
//                     </TouchableOpacity>
//                     <View style={styles.imageGallery}>
//                         {propertyImages.map((image, index) => (
//                             <Image
//                                 key={index}
//                                 source={{ uri: image }}
//                                 style={styles.imagePreview}
//                             />
//                         ))}
//                     </View>
//                 </View>
//             )}
//             {/* Étape pour la description */}
//             {step === 5 && (
//                 <View style={styles.stepContainer}>
//                     <Text style={styles.label}>Décrivez votre propriété</Text>
//                     <Text style={styles.semiLabel}>
//                         Mentionnez les meilleures caractéristiques de votre
//                         logement, les équipements spéciaux comme le Wi-Fi rapide
//                         ou le parking, ainsi que les choses que vous aimez dans
//                         le quartier.
//                     </Text>
//                     <TextInput
//                         style={styles.input}
//                         multiline
//                         numberOfLines={4}
//                         placeholder="Entrez une description"
//                         value={description}
//                         onChangeText={setDescription}
//                     />
//                 </View>
//             )}
//             {/* Étape pour établir le prix */}
//             {step === 6 && (
//                 <View style={styles.stepContainer}>
//                     <Text>Établissez le prix de votre espace</Text>
//                     <Text style={styles.photoInstructions}>
//                         Les revenus de l'hôte dépendent directement de la
//                         fixation des tarifs et des réglementations sur le nombre
//                         de clients, le nombre de nuitées et la politique
//                         d'annulation.
//                     </Text>
//                     {/* Sélecteur de devise */}
//                     <Text>Devise</Text>
//                     <RNPickerSelect
//                         onValueChange={(value) =>
//                             setPrice({ ...price, currency: value })
//                         }
//                         items={[
//                             { label: "USD", value: "USD" },
//                             { label: "CDF", value: "CDF" },
//                         ]}
//                     />
//                     <Text>Prix de base (Lundi - Jeudi)</Text>
//                     <TextInput
//                         style={styles.input}
//                         placeholder="Prix de base"
//                         value={price.weekdayPrice}
//                         keyboardType="numeric"
//                         onChangeText={(text) =>
//                             setPrice({ ...price, weekdayPrice: text })
//                         }
//                     />
//                     <Text>Prix de base (Vendredi - Dimanche)</Text>
//                     <TextInput
//                         style={styles.input}
//                         placeholder="Prix de base"
//                         value={price.weekendPrice}
//                         keyboardType="numeric"
//                         onChangeText={(text) =>
//                             setPrice({ ...price, weekendPrice: text })
//                         }
//                     />
//                     <Text>Prix à long terme (Remise mensuelle)</Text>
//                     <TextInput
//                         style={styles.input}
//                         placeholder="Remise mensuelle (%)"
//                         value={price.monthlyDiscount}
//                         keyboardType="numeric"
//                         onChangeText={(text) =>
//                             setPrice({ ...price, monthlyDiscount: text })
//                         }
//                     />
//                 </View>
//             )}
//             {step === 7 && (
//                 <View style={styles.stepContainer}>
//                     <Text style={styles.label}>
//                         Combien de temps les invités peuvent-ils rester ?
//                     </Text>
//                     <View style={styles.nightsContainer}>
//                         <View style={styles.nightButtonContainer}>
//                             <TouchableOpacity
//                                 style={styles.nightButton}
//                                 onPress={() => setMinNights(minNights - 1)}
//                                 disabled={minNights <= 0}
//                             >
//                                 <Text style={styles.nightButtonText}>-</Text>
//                             </TouchableOpacity>
//                             <Text style={styles.nightsText}>{minNights}</Text>
//                             <TouchableOpacity
//                                 style={styles.nightButton}
//                                 onPress={() => setMinNights(minNights + 1)}
//                             >
//                                 <Text style={styles.nightButtonText}>+</Text>
//                             </TouchableOpacity>
//                         </View>
//                         <Text style={styles.nightsLabel}>Nuit minimum</Text>
//                     </View>
//                     <View style={styles.nightsContainer}>
//                         <View style={styles.nightButtonContainer}>
//                             <TouchableOpacity
//                                 style={styles.nightButton}
//                                 onPress={() => setMaxNights(maxNights - 1)}
//                                 disabled={maxNights <= 0}
//                             >
//                                 <Text style={styles.nightButtonText}>-</Text>
//                             </TouchableOpacity>
//                             <Text style={styles.nightsText}>{maxNights}</Text>
//                             <TouchableOpacity
//                                 style={styles.nightButton}
//                                 onPress={() => setMaxNights(maxNights + 1)}
//                             >
//                                 <Text style={styles.nightButtonText}>+</Text>
//                             </TouchableOpacity>
//                         </View>
//                         <Text style={styles.nightsLabel}>Nuit maximum</Text>
//                     </View>

//                     <Text style={styles.label}>
//                         Définissez votre disponibilité
//                     </Text>
//                     <View>
//                         <Text style={styles.dateText}>
//                             Dates disponibles : {startDate.toLocaleDateString()}{" "}
//                             - {endDate.toLocaleDateString()}
//                         </Text>
//                         <TouchableOpacity
//                             onPress={() => setShowStartPicker(true)}
//                         >
//                             <Text style={styles.datePickerText}>
//                                 Sélectionner la date de début
//                             </Text>
//                         </TouchableOpacity>
//                         {showStartPicker && (
//                             <DateTimePicker
//                                 value={startDate}
//                                 mode="date"
//                                 display="spinner"
//                                 onChange={handleStartDateChange}
//                             />
//                         )}
//                         <TouchableOpacity
//                             onPress={() => setShowEndPicker(true)}
//                         >
//                             <Text style={styles.datePickerText}>
//                                 Sélectionner la date de fin
//                             </Text>
//                         </TouchableOpacity>
//                         {showEndPicker && (
//                             <DateTimePicker
//                                 value={endDate}
//                                 mode="date"
//                                 display="spinner"
//                                 onChange={handleEndDateChange}
//                             />
//                         )}
//                     </View>
//                 </View>
//             )}
//             {step === 8 && (
//                 <View style={styles.stepContainer}>
//                     <Text style={styles.label}>Choix du pays</Text>
//                     <RNPickerSelect
//                         onValueChange={(value) =>
//                             handleInputChange("country", value)
//                         }
//                         items={countries}
//                         value={location.country}
//                         useNativeAndroidPickerStyle={false}
//                         placeholder={{
//                             label: "Sélectionner votre pays",
//                             value: null,
//                         }}
//                         style={{
//                             inputIOS: styles.pickerSelectStyles,
//                             inputAndroid: styles.pickerSelectStyles,
//                             iconContainer: {
//                                 top: 15,
//                                 right: 15,
//                             },
//                         }}
//                         Icon={() => (
//                             <Ionicons
//                                 name="arrow-down"
//                                 size={24}
//                                 color="gray"
//                             />
//                         )}
//                     />

//                     <Text style={styles.label}>Rue</Text>
//                     <TextInput
//                         style={styles.input}
//                         value={location.street}
//                         onChangeText={(text) =>
//                             handleInputChange("street", text)
//                         }
//                         placeholder="Nom de la rue"
//                     />

//                     <Text style={styles.label}>Numéro de propriété</Text>
//                     <TextInput
//                         style={styles.input}
//                         value={location.propertyNumber}
//                         onChangeText={(text) =>
//                             handleInputChange("propertyNumber", text)
//                         }
//                         placeholder="Numéro de propriété"
//                     />

//                     <Text style={styles.label}>Ville</Text>
//                     <TextInput
//                         style={styles.input}
//                         value={location.city}
//                         onChangeText={(text) => handleInputChange("city", text)}
//                         placeholder="Ville"
//                     />

//                     <Text style={styles.label}>Code postal</Text>
//                     <TextInput
//                         style={styles.input}
//                         value={location.postalCode}
//                         onChangeText={(text) =>
//                             handleInputChange("postalCode", text)
//                         }
//                         placeholder="Code postal"
//                         keyboardType="numeric"
//                     />

//                     {/* <Button title="Suivant" onPress={handleNextStep} /> */}
//                 </View>
//             )}
//             {step === 9 && (
//                 <View style={styles.stepContainer}>
//                     <Text style={styles.label}>Congratulations 🎉</Text>
//                     <Text style={{ fontSize: 18 }}>
//                         Excellent, félicitations pour avoir terminé l’annonce,
//                         elle attend d’être revue pour publication. 🎉
//                     </Text>
//                     <View style={styles.card}>
//                         <Image
//                             source={{ uri: coverImage }}
//                             style={styles.coverImage}
//                         />
//                         <Text style={styles.propertyDetails}>
//                             Type : {propertyType}
//                             {/* Type : {propertyType.join(", ")} */}
//                         </Text>
//                         <Text style={styles.propertyDetails}>
//                             Description : {description}
//                         </Text>
//                         <Text style={styles.propertyDetails}>
//                             Prix : {price.weekdayPrice} USD par nuit
//                         </Text>
//                         <Text style={styles.propertyDetails}>
//                             Localisation : {location.street}, {location.city},{" "}
//                             {location.state}, {location.country} -{" "}
//                             {location.postalCode}
//                         </Text>
//                     </View>
//                 </View>
//             )}
//             <TouchableOpacity
//                 style={styles.uploadButton}
//                 onPress={
//                     step === stepsTotal ? handlePublishListing : handleNextStep
//                 }
//             >
//                 <Text style={styles.uploadButtonText}>
//                     {step === stepsTotal ? "Publier" : "Suivant"}
//                 </Text>
//             </TouchableOpacity>
//             {/* <Button
//                 style={styles.uploadButton}
//                 title={step === stepsTotal ? "Publier" : "Suivant"}
//                 onPress={
//                     step === stepsTotal ? handlePublishListing : handleNextStep
//                 }
//             /> */}
//         </ScrollView>
//     );
// };

// const styles = StyleSheet.create({
//     container: {
//         flexGrow: 1,
//         padding: 20,
//     },
//     title: {
//         fontSize: 24,
//         fontWeight: "bold",
//         marginBottom: 20,
//     },
//     stepContainer: {
//         marginBottom: 20,
//     },
//     input: {
//         borderWidth: 1,
//         borderColor: "#ABABAB",
//         borderRadius: 8,
//         padding: 10,
//         marginBottom: 15,
//     },
//     uploadButton: {
//         backgroundColor: Colors.primary,
//         padding: 10,
//         borderRadius: 5,
//         marginVertical: 10,
//     },
//     uploadButtonText: {
//         color: "#fff",
//         textAlign: "center",
//     },
//     photoLabel: {
//         fontWeight: "bold",
//         marginTop: 10,
//     },
//     imagePreview: {
//         width: 100,
//         height: 100,
//         margin: 2,
//         borderRadius: 5,
//     },
//     imageGallery: {
//         flexDirection: "row",
//         flexWrap: "wrap",
//         justifyContent: "space-between",
//     },
//     photoInstructions: {
//         borderColor: "#ABABAB",
//         marginVertical: 5,
//     },
//     guestsItem: {
//         flexDirection: "row",
//         justifyContent: "space-between",
//         padding: 10,
//         marginVertical: 5,
//         borderWidth: 1,
//         borderColor: "#ABABAB",
//         borderRadius: 8,
//     },
//     itemborder: {
//         borderRadius: 8,
//         borderWidth: 1,
//         borderColor: "#ABABAB",
//     },
//     title: {
//         fontSize: 24,
//         fontWeight: "bold",
//         marginBottom: 20,
//     },
//     stepContainer: {
//         marginBottom: 20,
//     },
//     label: {
//         fontSize: 18,
//         marginBottom: 10,
//         // fontWeight: "800",
//     },
//     semiLabel: {
//         marginBottom: 10,
//     },
//     pickerSelectStyles: {
//         fontSize: 16,
//         paddingVertical: 12,
//         paddingHorizontal: 10,
//         borderWidth: 1,
//         borderColor: "#ABABAB",
//         borderRadius: 4,
//         color: "black",
//         paddingRight: 30,
//     },
//     checkboxContainer: {
//         flexDirection: "row",
//         alignItems: "center",
//         marginBottom: 10,
//     },
//     checkbox: {
//         marginRight: 10,
//     },
//     nightsContainer: {
//         flexDirection: "column",
//         alignItems: "center",
//         marginBottom: 20,
//     },
//     nightButtonContainer: {
//         flexDirection: "row",
//         alignItems: "center",
//     },
//     nightButton: {
//         backgroundColor: Colors.primary,
//         borderRadius: 5,
//         padding: 10,
//         marginHorizontal: 5,
//     },
//     nightButtonText: {
//         color: "white",
//         fontSize: 18,
//     },
//     nightsText: {
//         fontSize: 18,
//         marginHorizontal: 10,
//     },
//     nightsLabel: {
//         fontSize: 14,
//         marginTop: 5,
//     },
//     dateText: {
//         fontSize: 16,
//         marginBottom: 10,
//     },
//     datePickerText: {
//         color: Colors.primary,
//         fontSize: 16,
//         marginBottom: 5,
//     },
//     //
//     coverImage: {
//         width: "100%",
//         height: 200,
//         borderRadius: 5,
//         marginTop: 10,
//     },
//     propertyDetails: {
//         marginTop: 10,
//         fontSize: 16,
//     },
//     card: {
//         backgroundColor: Colors.lightGray,
//         padding: 10,
//         borderRadius: 5,
//         marginTop: 10,
//     },
//     groupName: {
//         fontWeight: "bold",
//     },
//     groupDescription: {
//         fontSize: 12,
//         color: Colors.darkGray,
//     },
//     countText: {
//         fontSize: 18,
//         marginHorizontal: 10,
//     },
//     counterContainer: {
//         flexDirection: "row",
//         alignItems: "center",
//     },
//     //
// });

// export default BecomeHost;
