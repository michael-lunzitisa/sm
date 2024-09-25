// // import {
// //     View,
// //     Text,
// //     TextInput,
// //     Button,
// //     ScrollView,
// //     StyleSheet,
// //     TouchableOpacity,
// //     Image,
// //     Alert,
// // } from "react-native";
// // import React, { useState } from "react";
// // import { Colors } from "@/constants/Colors";
// // import { Ionicons } from "@expo/vector-icons";
// // import * as ImagePicker from "expo-image-picker"; // Importation du module ImagePicker
// // import Animated from "react-native-reanimated";
// // import RNPickerSelect from "react-native-picker-select"; // Importation de react-native-picker-select

// // const BecomeHost = () => {
// //     const [step, setStep] = useState(1);
// //     const [propertyType, setPropertyType] = useState("");
// //     const [location, setLocation] = useState({
// //         country: "",
// //         street: "",
// //         propertyNumber: "",
// //         city: "",
// //         state: "",
// //         postalCode: "",
// //     });
// //     const [size, setSize] = useState({
// //         area: "",
// //         guests: 4,
// //         bedrooms: 4,
// //         beds: 4,
// //         bathrooms: 2,
// //     });
// //     const [amenities, setAmenities] = useState({
// //         wifi: false,
// //         internet: false,
// //         tv: false,
// //         airConditioning: false,
// //         fan: false,
// //         privateEntrance: false,
// //         dryer: false,
// //         washingMachine: false,
// //         heating: false,
// //     });
// //     const [groups, setGroups] = useState([
// //         { name: "Invités", text: "", count: 0 },
// //         { name: "Chambre à coucher", text: "", count: 0 },
// //         { name: "Lits", text: "", count: 0 },
// //         { name: "Salle de bain", text: "", count: 0 },
// //         { name: "Cuisine", text: "", count: 0 },
// //     ]);
// //     const [description, setDescription] = useState("");
// //     const [price, setPrice] = useState({
// //         currency: "USD", // Devise par défaut
// //         weekdayPrice: "",
// //         weekendPrice: "",
// //         monthlyDiscount: "",
// //         minNights: "1",
// //         maxNights: "99",
// //     });

// //     // Nouveaux états pour gérer les images
// //     const [coverImage, setCoverImage] = useState(null);
// //     const [propertyImages, setPropertyImages] = useState([]);

// //     const stepsTotal = 10;

// //     const isStepValid = () => {
// //         switch (step) {
// //             case 1:
// //                 return propertyType.length > 0;
// //             case 2:
// //                 return groups.some((group) => group.count > 0);
// //             case 3:
// //                 return size.area.length > 0 && size.guests > 0;
// //             case 4:
// //                 return coverImage !== null; // Vérifie si une image de couverture a été sélectionnée
// //             case 5:
// //                 return description.length > 0;
// //             case 6:
// //                 return (
// //                     price.weekdayPrice.length > 0 &&
// //                     price.weekendPrice.length > 0
// //                 );
// //             default:
// //                 return true;
// //         }
// //     };

// //     const handleNextStep = () => {
// //         if (isStepValid() && step < stepsTotal) {
// //             setStep(step + 1);
// //         }
// //     };

// //     // Fonction pour sélectionner l'image de couverture
// //     const pickCoverImage = async () => {
// //         let result = await ImagePicker.launchImageLibraryAsync({
// //             mediaTypes: ImagePicker.MediaTypeOptions.Images,
// //             allowsEditing: true,
// //             aspect: [4, 3],
// //             quality: 1,
// //         });

// //         if (!result.canceled) {
// //             setCoverImage(result.assets[0].uri);
// //         } else {
// //             Alert.alert("Aucune image sélectionnée !");
// //         }
// //     };

// //     // Fonction pour ajouter des images de la propriété
// //     const pickPropertyImages = async () => {
// //         let result = await ImagePicker.launchImageLibraryAsync({
// //             mediaTypes: ImagePicker.MediaTypeOptions.Images,
// //             allowsMultipleSelection: true,
// //             quality: 1,
// //         });

// //         if (!result.canceled) {
// //             const newImages = result.assets.map((asset) => asset.uri);
// //             setPropertyImages([...propertyImages, ...newImages]);
// //         } else {
// //             Alert.alert("Aucune image sélectionnée !");
// //         }
// //     };

// //     return (
// //         <ScrollView contentContainerStyle={styles.container}>
// //             <Text style={styles.title}>
// //                 Devenir Hôte - Étape {step}/{stepsTotal}
// //             </Text>

// //             {step === 1 && (
// //                 <View style={styles.stepContainer}>
// //                     <Text>Choix des catégories d'annonces</Text>
// //                     <TextInput
// //                         style={styles.input}
// //                         placeholder="Type de propriété (Chambre, Villa, Voiture, Appartement)"
// //                         value={propertyType}
// //                         onChangeText={setPropertyType}
// //                     />
// //                 </View>
// //             )}

// //             {step === 2 && (
// //                 <View style={styles.stepContainer}>
// //                     <Text>Taille de votre emplacement</Text>
// //                     <Animated.View></Animated.View>

// //                     {groups.map((item, index) => (
// //                         <View
// //                             key={index}
// //                             style={[styles.guestsItem, styles.itemborder]}
// //                         >
// //                             <View>
// //                                 <Text
// //                                     style={{
// //                                         fontFamily: "mon-b",
// //                                         fontSize: 16,
// //                                     }}
// //                                 >
// //                                     {item.name}
// //                                 </Text>
// //                                 <Text
// //                                     style={{
// //                                         fontFamily: "mon",
// //                                         fontSize: 12,
// //                                         color: Colors.gray,
// //                                     }}
// //                                 >
// //                                     {item.text}
// //                                 </Text>
// //                             </View>
// //                             <View
// //                                 style={{
// //                                     flexDirection: "row",
// //                                     alignItems: "center",
// //                                     gap: 10,
// //                                 }}
// //                             >
// //                                 <TouchableOpacity
// //                                     onPress={() => {
// //                                         const newGroups = [...groups];
// //                                         newGroups[index].count =
// //                                             newGroups[index].count > 0
// //                                                 ? newGroups[index].count - 1
// //                                                 : 0;
// //                                         setGroups(newGroups);
// //                                     }}
// //                                 >
// //                                     <Ionicons
// //                                         name="remove-circle-outline"
// //                                         size={26}
// //                                         color={
// //                                             groups[index].count > 0
// //                                                 ? Colors.gray
// //                                                 : "#cdcdcd"
// //                                         }
// //                                     />
// //                                 </TouchableOpacity>
// //                                 <Text
// //                                     style={{
// //                                         fontFamily: "mon",
// //                                         fontSize: 16,
// //                                         textAlign: "center",
// //                                         minWidth: 18,
// //                                     }}
// //                                 >
// //                                     {item.count}
// //                                 </Text>
// //                                 <TouchableOpacity
// //                                     onPress={() => {
// //                                         const newGroups = [...groups];
// //                                         newGroups[index].count++;
// //                                         setGroups(newGroups);
// //                                     }}
// //                                 >
// //                                     <Ionicons
// //                                         name="add-circle-outline"
// //                                         size={26}
// //                                         color={Colors.gray}
// //                                     />
// //                                 </TouchableOpacity>
// //                             </View>
// //                         </View>
// //                     ))}
// //                 </View>
// //             )}

// //             {step === 3 && (
// //                 <View style={styles.stepContainer}>
// //                     <Text>Taille de votre emplacement</Text>
// //                     <TextInput
// //                         style={styles.input}
// //                         placeholder="Superficie (m²)"
// //                         value={size.area}
// //                         onChangeText={(text) =>
// //                             setSize({ ...size, area: text })
// //                         }
// //                     />
// //                     <TextInput
// //                         style={styles.input}
// //                         placeholder="Invités"
// //                         value={String(size.guests)}
// //                         onChangeText={(text) =>
// //                             setSize({ ...size, guests: parseInt(text) || 0 })
// //                         }
// //                     />
// //                     <TextInput
// //                         style={styles.input}
// //                         placeholder="Chambre à coucher"
// //                         value={String(size.bedrooms)}
// //                         onChangeText={(text) =>
// //                             setSize({ ...size, bedrooms: parseInt(text) || 0 })
// //                         }
// //                     />
// //                     <TextInput
// //                         style={styles.input}
// //                         placeholder="Lits"
// //                         value={String(size.beds)}
// //                         onChangeText={(text) =>
// //                             setSize({ ...size, beds: parseInt(text) || 0 })
// //                         }
// //                     />
// //                     <TextInput
// //                         style={styles.input}
// //                         placeholder="Salle de bain"
// //                         value={String(size.bathrooms)}
// //                         onChangeText={(text) =>
// //                             setSize({ ...size, bathrooms: parseInt(text) || 0 })
// //                         }
// //                     />
// //                 </View>
// //             )}

// //             {/* Étape pour ajouter des photos */}
// //             {step === 4 && (
// //                 <View style={styles.stepContainer}>
// //                     <Text>Ajouter des Photos de votre Propriété</Text>
// //                     <Text style={styles.photoInstructions}>
// //                         Quelques belles photos aideront les clients à avoir plus
// //                         de sympathie pour votre propriété.
// //                     </Text>

// //                     <Text style={styles.photoLabel}>Image de couverture</Text>
// //                     <TouchableOpacity
// //                         style={styles.uploadButton}
// //                         onPress={pickCoverImage}
// //                     >
// //                         <Text style={styles.uploadButtonText}>
// //                             Télécharger une image
// //                         </Text>
// //                     </TouchableOpacity>
// //                     {coverImage && (
// //                         <Image
// //                             source={{ uri: coverImage }}
// //                             style={styles.imagePreview}
// //                         />
// //                     )}

// //                     <Text style={styles.photoLabel}>Photos du lieu</Text>
// //                     <TouchableOpacity
// //                         style={styles.uploadButton}
// //                         onPress={pickPropertyImages}
// //                     >
// //                         <Text style={styles.uploadButtonText}>
// //                             Télécharger des images
// //                         </Text>
// //                     </TouchableOpacity>
// //                     <View style={styles.imageGallery}>
// //                         {propertyImages.map((image, index) => (
// //                             <Image
// //                                 key={index}
// //                                 source={{ uri: image }}
// //                                 style={styles.imagePreview}
// //                             />
// //                         ))}
// //                     </View>
// //                 </View>
// //             )}

// //             {/* Étape pour la description */}
// //             {step === 5 && (
// //                 <View style={styles.stepContainer}>
// //                     <Text>Décrivez votre propriété</Text>
// //                     <TextInput
// //                         style={styles.input}
// //                         multiline
// //                         numberOfLines={4}
// //                         placeholder="Entrez une description"
// //                         value={description}
// //                         onChangeText={setDescription}
// //                     />
// //                 </View>
// //             )}

// //             {/* Étape pour établir le prix */}
// //             {step === 6 && (
// //                 <View style={styles.stepContainer}>
// //                     <Text>Établissez le prix de votre espace</Text>
// //                     <Text style={styles.photoInstructions}>
// //                         Les revenus de l'hôte dépendent directement de la
// //                         fixation des tarifs et des réglementations sur le nombre
// //                         de clients, le nombre de nuitées et la politique
// //                         d'annulation.
// //                     </Text>
// //                     {/* Sélecteur de devise */}
// //                     <Text>Devise</Text>
// //                     <RNPickerSelect
// //                         onValueChange={(value) =>
// //                             setPrice({ ...price, currency: value })
// //                         }
// //                         items={[
// //                             { label: "USD", value: "USD" },
// //                             { label: "CDF", value: "CDF" },
// //                         ]}
// //                     />
// //                     <Text>Prix de base (Lundi - Jeudi)</Text>
// //                     <TextInput
// //                         style={styles.input}
// //                         placeholder="Prix de base"
// //                         value={price.weekdayPrice}
// //                         keyboardType="numeric"
// //                         onChangeText={(text) =>
// //                             setPrice({ ...price, weekdayPrice: text })
// //                         }
// //                     />
// //                     <Text>Prix de base (Vendredi - Dimanche)</Text>
// //                     <TextInput
// //                         style={styles.input}
// //                         placeholder="Prix de base"
// //                         value={price.weekendPrice}
// //                         keyboardType="numeric"
// //                         onChangeText={(text) =>
// //                             setPrice({ ...price, weekendPrice: text })
// //                         }
// //                     />
// //                     <Text>Prix à long terme (Remise mensuelle)</Text>
// //                     <TextInput
// //                         style={styles.input}
// //                         placeholder="Remise mensuelle (%)"
// //                         value={price.monthlyDiscount}
// //                         keyboardType="numeric"
// //                         onChangeText={(text) =>
// //                             setPrice({ ...price, monthlyDiscount: text })
// //                         }
// //                     />
// //                 </View>
// //             )}

// //             <TouchableOpacity
// //                 style={styles.uploadButton}
// //                 onPress={handleNextStep}
// //             >
// //                 <Text style={styles.uploadButtonText}>
// //                     {step < stepsTotal ? "Suivant" : "Terminer"}
// //                 </Text>
// //             </TouchableOpacity>
// //         </ScrollView>
// //     );
// // };

// // const styles = StyleSheet.create({
// //     container: {
// //         flexGrow: 1,
// //         padding: 20,
// //     },
// //     title: {
// //         fontSize: 24,
// //         fontWeight: "bold",
// //         marginBottom: 20,
// //     },
// //     stepContainer: {
// //         marginBottom: 20,
// //     },
// //     input: {
// //         borderWidth: 1,
// //         borderColor: Colors.lightGray,
// //         borderRadius: 8,
// //         padding: 10,
// //         marginBottom: 15,
// //     },
// //     uploadButton: {
// //         backgroundColor: Colors.primary,
// //         padding: 10,
// //         borderRadius: 5,
// //         marginVertical: 10,
// //     },
// //     uploadButtonText: {
// //         color: "#fff",
// //         textAlign: "center",
// //     },
// //     photoLabel: {
// //         fontWeight: "bold",
// //         marginTop: 10,
// //     },
// //     imagePreview: {
// //         width: 100,
// //         height: 100,
// //         margin: 5,
// //         borderRadius: 5,
// //     },
// //     imageGallery: {
// //         flexDirection: "row",
// //         flexWrap: "wrap",
// //     },
// //     photoInstructions: {
// //         color: Colors.gray,
// //         marginVertical: 5,
// //     },
// //     guestsItem: {
// //         flexDirection: "row",
// //         justifyContent: "space-between",
// //         padding: 10,
// //         marginVertical: 5,
// //         borderWidth: 1,
// //         borderColor: Colors.lightGray,
// //         borderRadius: 8,
// //     },
// //     itemborder: {
// //         borderRadius: 8,
// //         borderWidth: 1,
// //         borderColor: Colors.lightGray,
// //     },
// // });

// // export default BecomeHost;
// import { View, Text, ScrollView, StyleSheet } from "react-native";
// import React, { useState } from "react";
// import { Ionicons } from "@expo/vector-icons";
// // import * as ImagePicker from "expo-image-picker"; // Importation du module ImagePicker
// import RNPickerSelect from "react-native-picker-select"; // Importation de react-native-picker-select

// const BecomeHost = () => {
//     const [step, setStep] = useState(1);
//     const [propertyType, setPropertyType] = useState([]);

//     const stepsTotal = 10;

//     const isStepValid = () => {
//         switch (step) {
//             case 1:
//                 return propertyType.length > 0;
//             default:
//                 return true;
//         }
//     };

//     const handleNextStep = () => {
//         if (isStepValid() && step < stepsTotal) {
//             setStep(step + 1);
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
//                 </View>
//             )}
//         </ScrollView>
//     );
// };

// const styles = StyleSheet.create({
//     container: {
//         flexGrow: 1,
//         padding: 20,
//         backgroundColor: "#fff",
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
//     pickerSelectStyles: {
//         fontSize: 16,
//         paddingVertical: 12,
//         paddingHorizontal: 10,
//         borderWidth: 1,
//         borderColor: "black",
//         borderRadius: 4,
//         color: "black",
//         paddingRight: 30, // to ensure the text is never behind the icon
//     },
// });

// export default BecomeHost;
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    StyleSheet,
} from "react-native";
import React, { useState } from "react";
import { Picker } from "@react-native-picker/picker"; // Assurez-vous d'avoir installé cette dépendance
import { Colors } from "@/constants/Colors"; // Ajoutez vos couleurs personnalisées si nécessaire

const LocationStep = () => {
    const [location, setLocation] = useState({
        country: "",
        street: "",
        propertyNumber: "",
        city: "",
        state: "",
        postalCode: "",
    });

    const countries = ["Congo", "Brazza", "Gabon", "Tanzanie"]; // Les options de pays

    const handleLocationChange = (key, value) => {
        setLocation({ ...location, [key]: value });
    };

    return (
        <View style={styles.stepContainer}>
            {/* Sélectionner le pays */}
            <Text style={styles.label}>Sélectionner le pays</Text>
            <View style={styles.pickerContainer}>
                <Picker
                    selectedValue={location.country}
                    onValueChange={(value) =>
                        handleLocationChange("country", value)
                    }
                    style={styles.picker}
                >
                    <Picker.Item label="Choisir un pays" value="" />
                    {countries.map((country) => (
                        <Picker.Item
                            label={country}
                            value={country}
                            key={country}
                        />
                    ))}
                </Picker>
            </View>

            {/* Autres champs de saisie */}
            <Text style={styles.label}>Rue</Text>
            <TextInput
                style={styles.input}
                placeholder="Rue"
                value={location.street}
                onChangeText={(value) => handleLocationChange("street", value)}
            />

            <Text style={styles.label}>Numéro de propriété</Text>
            <TextInput
                style={styles.input}
                placeholder="Numéro de propriété"
                value={location.propertyNumber}
                onChangeText={(value) =>
                    handleLocationChange("propertyNumber", value)
                }
            />

            <Text style={styles.label}>Ville</Text>
            <TextInput
                style={styles.input}
                placeholder="Ville"
                value={location.city}
                onChangeText={(value) => handleLocationChange("city", value)}
            />

            <Text style={styles.label}>État</Text>
            <TextInput
                style={styles.input}
                placeholder="État"
                value={location.state}
                onChangeText={(value) => handleLocationChange("state", value)}
            />

            <Text style={styles.label}>Code Postal</Text>
            <TextInput
                style={styles.input}
                placeholder="Code Postal"
                value={location.postalCode}
                onChangeText={(value) =>
                    handleLocationChange("postalCode", value)
                }
            />
        </View>
    );
};

const styles = StyleSheet.create({
    stepContainer: {
        padding: 20,
    },
    label: {
        fontSize: 16,
        fontWeight: "bold",
        marginBottom: 10,
    },
    pickerContainer: {
        borderWidth: 1,
        borderColor: "black",
        borderRadius: 5,
        marginBottom: 20,
    },
    picker: {
        height: 50,
        color: Colors.primary, // Couleur personnalisée si nécessaire
    },
    input: {
        height: 50,
        borderColor: "black",
        borderWidth: 1,
        borderRadius: 5,
        paddingHorizontal: 10,
        marginBottom: 20,
    },
});

export default LocationStep;
