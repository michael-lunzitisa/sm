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

// const BecomeHost = () => {
//     const [step, setStep] = useState(1);
//     const [propertyType, setPropertyType] = useState([]);
//     const [location, setLocation] = useState({
//         country: "",
//         street: "",
//         propertyNumber: "",
//         city: "",
//         state: "",
//         postalCode: "",
//     });
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
//     const [coverImage, setCoverImage] = useState(null);
//     const [propertyImages, setPropertyImages] = useState([]);

//     const stepsTotal = 8;

//     const isStepValid = () => {
//         switch (step) {
//             case 1:
//                 return propertyType.length > 0;
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
//                     location.country.length > 0 &&
//                     location.street.length > 0 &&
//                     location.propertyNumber.length > 0 &&
//                     location.city.length > 0 &&
//                     location.postalCode.length > 0
//                 );
//             default:
//                 return true;
//         }
//     };

//     const handleNextStep = () => {
//         if (isStepValid() && step < stepsTotal) {
//             setStep(step + 1);
//         }
//     };

//     const handlePublish = () => {
//         // Logique pour publier l'annonce
//         Alert.alert("Annonce publiée avec succès !");
//     };

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
//                         onValueChange={(value) =>
//                             setPropertyType([...propertyType, value])
//                         }
//                         items={[
//                             { label: "Appartement", value: "Appartement" },
//                             { label: "Chambre", value: "Chambre" },
//                             { label: "Villa", value: "Villa" },
//                             { label: "Voiture", value: "Voiture" },
//                             { label: "Maison", value: "Maison" },
//                         ]}
//                         value={propertyType}
//                         useNativeAndroidPickerStyle={false}
//                         placeholder={{
//                             label: "Sélectionner votre catégorie",
//                             value: null,
//                         }}
//                         style={pickerSelectStyles}
//                         Icon={() => (
//                             <Ionicons
//                                 name="arrow-down"
//                                 size={24}
//                                 color="gray"
//                             />
//                         )}
//                     />
//                 </View>
//             )}
//             {step === 2 && (
//                 <View style={styles.stepContainer}>
//                     <Text>Taille de votre emplacement</Text>
//                     {groups.map((item, index) => (
//                         <View
//                             key={index}
//                             style={[styles.guestsItem, styles.itemborder]}
//                         >
//                             <View>
//                                 <Text style={styles.groupName}>
//                                     {item.name}
//                                 </Text>
//                                 <Text style={styles.groupDescription}>
//                                     {item.text}
//                                 </Text>
//                             </View>
//                             <View style={styles.counterContainer}>
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
//                                 <Text style={styles.countText}>
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
//                     <Text>Équipements</Text>
//                     {Object.keys(amenities).map((amenity) => (
//                         <View style={styles.checkboxContainer} key={amenity}>
//                             <CheckBox
//                                 value={amenities[amenity]}
//                                 onValueChange={(newValue) =>
//                                     setAmenities({
//                                         ...amenities,
//                                         [amenity]: newValue,
//                                     })
//                                 }
//                                 style={styles.checkbox}
//                             />
//                             <Text style={styles.checkboxLabel}>{amenity}</Text>
//                         </View>
//                     ))}
//                 </View>
//             )}
//             {step === 4 && (
//                 <View style={styles.stepContainer}>
//                     <Text style={styles.label}>
//                         Ajouter une image de couverture
//                     </Text>
//                     <Button
//                         title="Choisir une image"
//                         onPress={pickCoverImage}
//                     />
//                     {coverImage && (
//                         <Image
//                             source={{ uri: coverImage }}
//                             style={styles.imagePreview}
//                         />
//                     )}
//                 </View>
//             )}
//             {step === 5 && (
//                 <View style={styles.stepContainer}>
//                     <Text style={styles.label}>Description</Text>
//                     <TextInput
//                         multiline
//                         value={description}
//                         onChangeText={setDescription}
//                         style={styles.textInput}
//                         placeholder="Décrire votre propriété"
//                     />
//                 </View>
//             )}
//             {step === 6 && (
//                 <View style={styles.stepContainer}>
//                     <Text style={styles.label}>Prix</Text>
//                     <TextInput
//                         keyboardType="numeric"
//                         value={price.weekdayPrice}
//                         onChangeText={(value) =>
//                             setPrice({ ...price, weekdayPrice: value })
//                         }
//                         style={styles.textInput}
//                         placeholder="Prix par nuit (en USD)"
//                     />
//                     <TextInput
//                         keyboardType="numeric"
//                         value={price.weekendPrice}
//                         onChangeText={(value) =>
//                             setPrice({ ...price, weekendPrice: value })
//                         }
//                         style={styles.textInput}
//                         placeholder="Prix le weekend (en USD)"
//                     />
//                 </View>
//             )}
//             {step === 7 && (
//                 <View style={styles.stepContainer}>
//                     <Text style={styles.label}>Localisation</Text>
//                     <TextInput
//                         value={location.country}
//                         onChangeText={(value) =>
//                             setLocation({ ...location, country: value })
//                         }
//                         style={styles.textInput}
//                         placeholder="Pays"
//                     />
//                     <TextInput
//                         value={location.street}
//                         onChangeText={(value) =>
//                             setLocation({ ...location, street: value })
//                         }
//                         style={styles.textInput}
//                         placeholder="Rue"
//                     />
//                     <TextInput
//                         value={location.propertyNumber}
//                         onChangeText={(value) =>
//                             setLocation({ ...location, propertyNumber: value })
//                         }
//                         style={styles.textInput}
//                         placeholder="Numéro de propriété"
//                     />
//                     <TextInput
//                         value={location.city}
//                         onChangeText={(value) =>
//                             setLocation({ ...location, city: value })
//                         }
//                         style={styles.textInput}
//                         placeholder="Ville"
//                     />
//                     <TextInput
//                         value={location.state}
//                         onChangeText={(value) =>
//                             setLocation({ ...location, state: value })
//                         }
//                         style={styles.textInput}
//                         placeholder="État"
//                     />
//                     <TextInput
//                         value={location.postalCode}
//                         onChangeText={(value) =>
//                             setLocation({ ...location, postalCode: value })
//                         }
//                         style={styles.textInput}
//                         placeholder="Code postal"
//                     />
//                 </View>
//             )}
//             {step === 8 && (
//                 <View style={styles.stepContainer}>
//                     <Text style={styles.label}>Détails de la propriété</Text>
//                     <View style={styles.card}>
//                         <Image
//                             source={{ uri: coverImage }}
//                             style={styles.imagePreview}
//                         />
//                         <Text style={styles.propertyDetails}>
//                             Type : {propertyType.join(", ")}
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
//             <View style={styles.buttonContainer}>
//                 {step < stepsTotal && (
//                     <Button title="Suivant" onPress={handleNextStep} />
//                 )}
//                 {step === stepsTotal && (
//                     <Button title="Publier" onPress={handlePublish} />
//                 )}
//             </View>
//         </ScrollView>
//     );
// };

// const styles = StyleSheet.create({
//     container: {
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
//     label: {
//         fontSize: 18,
//         marginBottom: 10,
//     },
//     textInput: {
//         borderWidth: 1,
//         borderColor: Colors.gray,
//         borderRadius: 5,
//         padding: 10,
//         marginBottom: 10,
//     },
//     checkboxContainer: {
//         flexDirection: "row",
//         alignItems: "center",
//         marginBottom: 10,
//     },
//     checkbox: {
//         marginRight: 10,
//     },
//     checkboxLabel: {
//         fontSize: 16,
//     },
//     buttonContainer: {
//         marginTop: 20,
//     },
//     imagePreview: {
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
// });

// const pickerSelectStyles = StyleSheet.create({
//     inputIOS: {
//         fontSize: 16,
//         paddingVertical: 12,
//         paddingHorizontal: 10,
//         borderWidth: 1,
//         borderColor: Colors.gray,
//         borderRadius: 4,
//         color: "black",
//         paddingRight: 30,
//     },
//     inputAndroid: {
//         fontSize: 16,
//         paddingVertical: 8,
//         paddingHorizontal: 10,
//         borderWidth: 1,
//         borderColor: Colors.gray,
//         borderRadius: 4,
//         color: "black",
//         paddingRight: 30,
//     },
// });

// export default BecomeHost;

import {
    View,
    Text,
    TextInput,
    Button,
    ScrollView,
    StyleSheet,
    TouchableOpacity,
    Image,
    Alert,
} from "react-native";
import React, { useState } from "react";
import { Colors } from "@/constants/Colors";
import { Ionicons } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";
import Animated from "react-native-reanimated";
import RNPickerSelect from "react-native-picker-select";
import CheckBox from "expo-checkbox";
import DateTimePicker from "@react-native-community/datetimepicker";
import listingsData from "@/assets/data/listings.json"; // Importez votre fichier JSON

const BecomeHost = () => {
    const [step, setStep] = useState(1);
    const [propertyType, setPropertyType] = useState("");
    const [location, setLocation] = useState({
        country: "",
        street: "",
        propertyNumber: "",
        city: "",
        state: "",
        postalCode: "",
    });
    const [locationName, setLocationName] = useState("");

    const [amenities, setAmenities] = useState({
        wifi: false,
        internet: false,
        tv: false,
        airConditioning: false,
        fan: false,
        privateEntrance: false,
        dryer: false,
        washingMachine: false,
        heating: false,
        detergent: false,
        babyBed: false,
        desk: false,
        refrigerator: false,
        wardrobe: false,
        fabricHook: false,
        extraPillow: false,
        gasStove: false,
        toiletPaper: false,
        freeToiletries: false,
        makeupTable: false,
        bathroomHeater: false,
        kettle: false,
        dishwasher: false,
        barbecue: false,
        toaster: false,
        towel: false,
        diningTable: false,
        fireAlarm: false,
        fireExtinguisher: false,
        antiTheftKey: false,
    });
    const [groups, setGroups] = useState([
        { name: "Invités", text: "", count: 0 },
        { name: "Chambre à coucher", text: "", count: 0 },
        { name: "Lits", text: "", count: 0 },
        { name: "Salle de bain", text: "", count: 0 },
        { name: "Cuisine", text: "", count: 0 },
    ]);
    const [description, setDescription] = useState("");
    const [price, setPrice] = useState({
        currency: "USD",
        weekdayPrice: "",
        weekendPrice: "",
        monthlyDiscount: "",
        minNights: "1",
        maxNights: "99",
    });
    // Nouveaux états pour la gestion des nuits et de la disponibilité
    const [minNights, setMinNights] = useState(0);
    const [maxNights, setMaxNights] = useState(0);
    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState(new Date());
    const [showStartPicker, setShowStartPicker] = useState(false);
    const [showEndPicker, setShowEndPicker] = useState(false);

    const countries = [
        { label: "Congo", value: "Congo" },
        { label: "Brazza", value: "Brazza" },
        { label: "Gabon", value: "Gabon" },
        { label: "Tanzanie", value: "Tanzanie" },
    ];

    // Nouveaux états pour gérer les images
    const [coverImage, setCoverImage] = useState(null);
    const [propertyImages, setPropertyImages] = useState([]);

    const stepsTotal = 9;

    const isStepValid = () => {
        switch (step) {
            case 1:
                return propertyType.length > 0 && locationName.length > 0;
            case 2:
                return groups.some((group) => group.count > 0);
            case 3:
                return true;
            case 4:
                return coverImage !== null; // Vérifie si une image de couverture a été sélectionnée
            case 5:
                return description.length > 0;
            case 6:
                return (
                    price.weekdayPrice.length > 0 &&
                    price.weekendPrice.length > 0
                );
            case 7:
                return (
                    minNights > 0 &&
                    maxNights > 0 &&
                    startDate &&
                    endDate &&
                    endDate > startDate
                );
            case 8:
                return (
                    location.country.length > 0 &&
                    location.street.length > 0 &&
                    location.propertyNumber.length > 0 &&
                    location.city.length > 0 &&
                    location.postalCode.length > 0
                );
            default:
                return true;
        }
    };

    const handleNextStep = () => {
        if (isStepValid() && step < stepsTotal) {
            setStep(step + 1);
        }
    };

    const handleInputChange = (field, value) => {
        setLocation({
            ...location,
            [field]: value,
        });
    };

    // Fonction pour sélectionner l'image de couverture
    const pickCoverImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });

        if (!result.canceled) {
            setCoverImage(result.assets[0].uri);
        } else {
            Alert.alert("Aucune image sélectionnée !");
        }
    };

    // Fonction pour ajouter des images de la propriété
    const pickPropertyImages = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsMultipleSelection: true,
            quality: 1,
        });

        if (!result.canceled) {
            const newImages = result.assets.map((asset) => asset.uri);
            setPropertyImages([...propertyImages, ...newImages]);
        } else {
            Alert.alert("Aucune image sélectionnée !");
        }
    };

    // Options pour le multi-sélecteur
    const propertyTypeOptions = [
        { label: "Appartement", value: "Appartement" },
        { label: "Chambre", value: "Chambre" },
        { label: "Villa", value: "Villa" },
        { label: "Voiture", value: "Voiture" },
        { label: "Maison", value: "Maison" },
    ];

    // Liste des équipements
    const amenitiesOptions = [
        { label: "Wifi", value: "wifi" },
        { label: "Internet", value: "internet" },
        { label: "TV", value: "tv" },
        { label: "Climatisation", value: "airConditioning" },
        { label: "Ventilateur", value: "fan" },
        { label: "Entrée privée", value: "privateEntrance" },
        { label: "Séchoir", value: "dryer" },
        { label: "Chauffage", value: "heating" },
        { label: "Machine à laver", value: "washingMachine" },
        { label: "Détergent", value: "detergent" },
        { label: "Lit bébé", value: "babyBed" },
        { label: "Bureau", value: "desk" },
        { label: "Réfrigérateur", value: "refrigerator" },
        { label: "Garde-robe", value: "wardrobe" },
        { label: "Crochet à tissu", value: "fabricHook" },
        { label: "Coussin supplémentaire", value: "extraPillow" },
        { label: "Cuisinière à gaz", value: "gasStove" },
        { label: "Papier toilette", value: "toiletPaper" },
        { label: "Articles de toilette gratuits", value: "freeToiletries" },
        { label: "Table de maquillage", value: "makeupTable" },
        { label: "Chauffages de salle de bain", value: "bathroomHeater" },
        { label: "Bouilloire", value: "kettle" },
        { label: "Lave-vaisselle", value: "dishwasher" },
        { label: "Barbecue", value: "barbecue" },
        { label: "Grille-pain", value: "toaster" },
        { label: "Serviette", value: "towel" },
        { label: "Table à manger", value: "diningTable" },
        { label: "Sirène d'incendie", value: "fireAlarm" },
        { label: "Extincteur", value: "fireExtinguisher" },
        { label: "Clé antivol", value: "antiTheftKey" },
    ];

    const handleStartDateChange = (event, selectedDate) => {
        const currentDate = selectedDate || startDate;
        setShowStartPicker(false);
        setStartDate(currentDate);
    };

    const handleEndDateChange = (event, selectedDate) => {
        const currentDate = selectedDate || endDate;
        setShowEndPicker(false);
        setEndDate(currentDate);
    };

    // Fonction pour publier l'annonce
    const handlePublishListing = () => {
        const newListing = {
            id: listingsData.length + 1,
            name: propertyType,
            description,
            price: {
                weekday: price.weekdayPrice,
                weekend: price.weekendPrice,
                currency: price.currency,
            },
            location: {
                ...location,
                startDate,
                endDate,
            },
            amenities,
            coverImage,
            propertyImages,
        };

        // Ajoutez la nouvelle annonce à la liste existante
        listingsData.push(newListing);
        Alert.alert("Annonce publiée avec succès !");
        console.log("Nouvelle annonce:", newListing);
        // Réinitialisez tous les états
        resetForm();
    };

    // Fonction pour réinitialiser le formulaire
    const resetForm = () => {
        setStep(1);
        setPropertyType("");
        setLocation({
            country: "",
            street: "",
            propertyNumber: "",
            city: "",
            state: "",
            postalCode: "",
        });
        setLocationName("");
        setAmenities({});
        setGroups([
            { name: "Invités", text: "", count: 0 },
            { name: "Chambre à coucher", text: "", count: 0 },
            { name: "Lits", text: "", count: 0 },
            { name: "Salle de bain", text: "", count: 0 },
            { name: "Cuisine", text: "", count: 0 },
        ]);
        setDescription("");
        setPrice({
            currency: "USD",
            weekdayPrice: "",
            weekendPrice: "",
            monthlyDiscount: "",
            minNights: "1",
            maxNights: "99",
        });
        setMinNights(0);
        setMaxNights(0);
        setStartDate(new Date());
        setEndDate(new Date());
        setShowStartPicker(false);
        setShowEndPicker(false);
        setCoverImage(null);
        setPropertyImages([]);
    };

    return (
        <ScrollView style={styles.container}>
            <View>
                <Text style={styles.title}>
                    Devenir Hôte (Étape {step} de {stepsTotal})
                </Text>
                {step === 1 && (
                    <View>
                        <Text style={styles.label}>Type de Propriété</Text>
                        <RNPickerSelect
                            onValueChange={(value) => setPropertyType(value)}
                            items={propertyTypeOptions}
                        />
                        <Text style={styles.label}>Nom de la Propriété</Text>
                        <TextInput
                            style={styles.input}
                            onChangeText={setLocationName}
                            value={locationName}
                            placeholder="Entrez le nom de votre propriété"
                        />
                    </View>
                )}
                {step === 2 && (
                    <View>
                        <Text style={styles.label}>Invités</Text>
                        {groups.map((group, index) => (
                            <View key={index} style={styles.groupContainer}>
                                <Text style={styles.groupName}>
                                    {group.name}
                                </Text>
                                <View style={styles.groupInput}>
                                    <Button
                                        title="-"
                                        onPress={() => {
                                            const newGroups = [...groups];
                                            if (newGroups[index].count > 0) {
                                                newGroups[index].count -= 1;
                                                setGroups(newGroups);
                                            }
                                        }}
                                    />
                                    <Text style={styles.groupCount}>
                                        {group.count}
                                    </Text>
                                    <Button
                                        title="+"
                                        onPress={() => {
                                            const newGroups = [...groups];
                                            newGroups[index].count += 1;
                                            setGroups(newGroups);
                                        }}
                                    />
                                </View>
                            </View>
                        ))}
                    </View>
                )}
                {step === 3 && (
                    <View>
                        <Text style={styles.label}>Équipements</Text>
                        {amenitiesOptions.map((amenity) => (
                            <View
                                key={amenity.value}
                                style={styles.checkboxContainer}
                            >
                                <CheckBox
                                    value={amenities[amenity.value]}
                                    onValueChange={() =>
                                        setAmenities((prev) => ({
                                            ...prev,
                                            [amenity.value]:
                                                !prev[amenity.value],
                                        }))
                                    }
                                />
                                <Text>{amenity.label}</Text>
                            </View>
                        ))}
                    </View>
                )}
                {step === 4 && (
                    <View>
                        <Text style={styles.label}>Image de Couverture</Text>
                        <TouchableOpacity onPress={pickCoverImage}>
                            <Text style={styles.uploadButton}>
                                Sélectionner une image
                            </Text>
                        </TouchableOpacity>
                        {coverImage && (
                            <Image
                                source={{ uri: coverImage }}
                                style={styles.imagePreview}
                            />
                        )}
                    </View>
                )}
                {step === 5 && (
                    <View>
                        <Text style={styles.label}>Description</Text>
                        <TextInput
                            style={styles.textArea}
                            onChangeText={setDescription}
                            value={description}
                            placeholder="Décrivez votre propriété"
                            multiline
                        />
                    </View>
                )}
                {step === 6 && (
                    <View>
                        <Text style={styles.label}>Prix</Text>
                        <TextInput
                            style={styles.input}
                            keyboardType="numeric"
                            onChangeText={(value) =>
                                setPrice((prev) => ({
                                    ...prev,
                                    weekdayPrice: value,
                                }))
                            }
                            value={price.weekdayPrice}
                            placeholder="Prix par nuit (USD)"
                        />
                        <TextInput
                            style={styles.input}
                            keyboardType="numeric"
                            onChangeText={(value) =>
                                setPrice((prev) => ({
                                    ...prev,
                                    weekendPrice: value,
                                }))
                            }
                            value={price.weekendPrice}
                            placeholder="Prix le week-end (USD)"
                        />
                    </View>
                )}
                {step === 7 && (
                    <View>
                        <Text style={styles.label}>
                            Durée Minimum et Maximum
                        </Text>
                        <TextInput
                            style={styles.input}
                            keyboardType="numeric"
                            onChangeText={setMinNights}
                            value={minNights.toString()}
                            placeholder="Minimum de nuits"
                        />
                        <TextInput
                            style={styles.input}
                            keyboardType="numeric"
                            onChangeText={setMaxNights}
                            value={maxNights.toString()}
                            placeholder="Maximum de nuits"
                        />
                        <Text>Dates Disponibles</Text>
                        <Button
                            title="Sélectionner la date de début"
                            onPress={() => setShowStartPicker(true)}
                        />
                        {showStartPicker && (
                            <DateTimePicker
                                value={startDate}
                                mode="date"
                                onChange={handleStartDateChange}
                            />
                        )}
                        <Button
                            title="Sélectionner la date de fin"
                            onPress={() => setShowEndPicker(true)}
                        />
                        {showEndPicker && (
                            <DateTimePicker
                                value={endDate}
                                mode="date"
                                onChange={handleEndDateChange}
                            />
                        )}
                    </View>
                )}
                {step === 8 && (
                    <View>
                        <Text style={styles.label}>
                            Informations sur l'Emplacement
                        </Text>
                        <TextInput
                            style={styles.input}
                            onChangeText={(value) =>
                                handleInputChange("country", value)
                            }
                            value={location.country}
                            placeholder="Pays"
                        />
                        <TextInput
                            style={styles.input}
                            onChangeText={(value) =>
                                handleInputChange("street", value)
                            }
                            value={location.street}
                            placeholder="Rue"
                        />
                        <TextInput
                            style={styles.input}
                            onChangeText={(value) =>
                                handleInputChange("propertyNumber", value)
                            }
                            value={location.propertyNumber}
                            placeholder="Numéro de Propriété"
                        />
                        <TextInput
                            style={styles.input}
                            onChangeText={(value) =>
                                handleInputChange("city", value)
                            }
                            value={location.city}
                            placeholder="Ville"
                        />
                        <TextInput
                            style={styles.input}
                            onChangeText={(value) =>
                                handleInputChange("state", value)
                            }
                            value={location.state}
                            placeholder="État/Province"
                        />
                        <TextInput
                            style={styles.input}
                            onChangeText={(value) =>
                                handleInputChange("postalCode", value)
                            }
                            value={location.postalCode}
                            placeholder="Code Postal"
                        />
                    </View>
                )}
                {step === stepsTotal && (
                    <View>
                        <Text style={styles.label}>Images de la Propriété</Text>
                        <TouchableOpacity onPress={pickPropertyImages}>
                            <Text style={styles.uploadButton}>
                                Sélectionner les images
                            </Text>
                        </TouchableOpacity>
                        {propertyImages.length > 0 && (
                            <ScrollView horizontal>
                                {propertyImages.map((image, index) => (
                                    <Image
                                        key={index}
                                        source={{ uri: image }}
                                        style={styles.imagePreview}
                                    />
                                ))}
                            </ScrollView>
                        )}
                    </View>
                )}
                <Button
                    title={step === stepsTotal ? "Publier" : "Suivant"}
                    onPress={
                        step === stepsTotal
                            ? handlePublishListing
                            : handleNextStep
                    }
                />
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
    },
    title: {
        fontSize: 24,
        fontWeight: "bold",
        marginBottom: 16,
    },
    label: {
        fontSize: 18,
        marginVertical: 8,
    },
    input: {
        borderColor: "#ccc",
        borderWidth: 1,
        borderRadius: 4,
        padding: 8,
        marginBottom: 16,
    },
    textArea: {
        borderColor: "#ccc",
        borderWidth: 1,
        borderRadius: 4,
        padding: 8,
        height: 100,
        marginBottom: 16,
    },
    groupContainer: {
        marginBottom: 16,
    },
    groupName: {
        fontWeight: "bold",
    },
    groupInput: {
        flexDirection: "row",
        alignItems: "center",
    },
    groupCount: {
        marginHorizontal: 8,
    },
    checkboxContainer: {
        flexDirection: "row",
        alignItems: "center",
        marginVertical: 4,
    },
    uploadButton: {
        color: "blue",
        marginBottom: 8,
    },
    imagePreview: {
        width: 100,
        height: 100,
        marginRight: 8,
    },
});

export default BecomeHost;
