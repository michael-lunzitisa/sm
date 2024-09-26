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

const BecomeHost = () => {
    const [step, setStep] = useState(1);
    const [propertyType, setPropertyType] = useState([]);
    const [location, setLocation] = useState({
        country: "",
        street: "",
        propertyNumber: "",
        city: "",
        state: "",
        postalCode: "",
    });
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
    const [coverImage, setCoverImage] = useState(null);
    const [propertyImages, setPropertyImages] = useState([]);

    const stepsTotal = 8;

    const isStepValid = () => {
        switch (step) {
            case 1:
                return propertyType.length > 0;
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

    const handlePublish = () => {
        // Logique pour publier l'annonce
        Alert.alert("Annonce publiée avec succès !");
    };

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

    return (
        <ScrollView contentContainerStyle={styles.container}>
            <Text style={styles.title}>
                Devenir Hôte - Étape {step}/{stepsTotal}
            </Text>
            {step === 1 && (
                <View style={styles.stepContainer}>
                    <Text style={styles.label}>
                        Choix des catégories d'annonces
                    </Text>
                    <RNPickerSelect
                        onValueChange={(value) =>
                            setPropertyType([...propertyType, value])
                        }
                        items={[
                            { label: "Appartement", value: "Appartement" },
                            { label: "Chambre", value: "Chambre" },
                            { label: "Villa", value: "Villa" },
                            { label: "Voiture", value: "Voiture" },
                            { label: "Maison", value: "Maison" },
                        ]}
                        value={propertyType}
                        useNativeAndroidPickerStyle={false}
                        placeholder={{
                            label: "Sélectionner votre catégorie",
                            value: null,
                        }}
                        style={pickerSelectStyles}
                        Icon={() => (
                            <Ionicons
                                name="arrow-down"
                                size={24}
                                color="gray"
                            />
                        )}
                    />
                </View>
            )}
            {step === 2 && (
                <View style={styles.stepContainer}>
                    <Text>Taille de votre emplacement</Text>
                    {groups.map((item, index) => (
                        <View
                            key={index}
                            style={[styles.guestsItem, styles.itemborder]}
                        >
                            <View>
                                <Text style={styles.groupName}>
                                    {item.name}
                                </Text>
                                <Text style={styles.groupDescription}>
                                    {item.text}
                                </Text>
                            </View>
                            <View style={styles.counterContainer}>
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
                                <Text style={styles.countText}>
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
                </View>
            )}
            {step === 3 && (
                <View style={styles.stepContainer}>
                    <Text>Équipements</Text>
                    {Object.keys(amenities).map((amenity) => (
                        <View style={styles.checkboxContainer} key={amenity}>
                            <CheckBox
                                value={amenities[amenity]}
                                onValueChange={(newValue) =>
                                    setAmenities({
                                        ...amenities,
                                        [amenity]: newValue,
                                    })
                                }
                                style={styles.checkbox}
                            />
                            <Text style={styles.checkboxLabel}>{amenity}</Text>
                        </View>
                    ))}
                </View>
            )}
            {step === 4 && (
                <View style={styles.stepContainer}>
                    <Text style={styles.label}>
                        Ajouter une image de couverture
                    </Text>
                    <Button
                        title="Choisir une image"
                        onPress={pickCoverImage}
                    />
                    {coverImage && (
                        <Image
                            source={{ uri: coverImage }}
                            style={styles.imagePreview}
                        />
                    )}
                </View>
            )}
            {step === 5 && (
                <View style={styles.stepContainer}>
                    <Text style={styles.label}>Description</Text>
                    <TextInput
                        multiline
                        value={description}
                        onChangeText={setDescription}
                        style={styles.textInput}
                        placeholder="Décrire votre propriété"
                    />
                </View>
            )}
            {step === 6 && (
                <View style={styles.stepContainer}>
                    <Text style={styles.label}>Prix</Text>
                    <TextInput
                        keyboardType="numeric"
                        value={price.weekdayPrice}
                        onChangeText={(value) =>
                            setPrice({ ...price, weekdayPrice: value })
                        }
                        style={styles.textInput}
                        placeholder="Prix par nuit (en USD)"
                    />
                    <TextInput
                        keyboardType="numeric"
                        value={price.weekendPrice}
                        onChangeText={(value) =>
                            setPrice({ ...price, weekendPrice: value })
                        }
                        style={styles.textInput}
                        placeholder="Prix le weekend (en USD)"
                    />
                </View>
            )}
            {step === 7 && (
                <View style={styles.stepContainer}>
                    <Text style={styles.label}>Localisation</Text>
                    <TextInput
                        value={location.country}
                        onChangeText={(value) =>
                            setLocation({ ...location, country: value })
                        }
                        style={styles.textInput}
                        placeholder="Pays"
                    />
                    <TextInput
                        value={location.street}
                        onChangeText={(value) =>
                            setLocation({ ...location, street: value })
                        }
                        style={styles.textInput}
                        placeholder="Rue"
                    />
                    <TextInput
                        value={location.propertyNumber}
                        onChangeText={(value) =>
                            setLocation({ ...location, propertyNumber: value })
                        }
                        style={styles.textInput}
                        placeholder="Numéro de propriété"
                    />
                    <TextInput
                        value={location.city}
                        onChangeText={(value) =>
                            setLocation({ ...location, city: value })
                        }
                        style={styles.textInput}
                        placeholder="Ville"
                    />
                    <TextInput
                        value={location.state}
                        onChangeText={(value) =>
                            setLocation({ ...location, state: value })
                        }
                        style={styles.textInput}
                        placeholder="État"
                    />
                    <TextInput
                        value={location.postalCode}
                        onChangeText={(value) =>
                            setLocation({ ...location, postalCode: value })
                        }
                        style={styles.textInput}
                        placeholder="Code postal"
                    />
                </View>
            )}
            {step === 8 && (
                <View style={styles.stepContainer}>
                    <Text style={styles.label}>Détails de la propriété</Text>
                    <View style={styles.card}>
                        <Image
                            source={{ uri: coverImage }}
                            style={styles.imagePreview}
                        />
                        <Text style={styles.propertyDetails}>
                            Type : {propertyType.join(", ")}
                        </Text>
                        <Text style={styles.propertyDetails}>
                            Description : {description}
                        </Text>
                        <Text style={styles.propertyDetails}>
                            Prix : {price.weekdayPrice} USD par nuit
                        </Text>
                        <Text style={styles.propertyDetails}>
                            Localisation : {location.street}, {location.city},{" "}
                            {location.state}, {location.country} -{" "}
                            {location.postalCode}
                        </Text>
                    </View>
                </View>
            )}
            <View style={styles.buttonContainer}>
                {step < stepsTotal && (
                    <Button title="Suivant" onPress={handleNextStep} />
                )}
                {step === stepsTotal && (
                    <Button title="Publier" onPress={handlePublish} />
                )}
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        padding: 20,
    },
    title: {
        fontSize: 24,
        fontWeight: "bold",
        marginBottom: 20,
    },
    stepContainer: {
        marginBottom: 20,
    },
    label: {
        fontSize: 18,
        marginBottom: 10,
    },
    textInput: {
        borderWidth: 1,
        borderColor: Colors.gray,
        borderRadius: 5,
        padding: 10,
        marginBottom: 10,
    },
    checkboxContainer: {
        flexDirection: "row",
        alignItems: "center",
        marginBottom: 10,
    },
    checkbox: {
        marginRight: 10,
    },
    checkboxLabel: {
        fontSize: 16,
    },
    buttonContainer: {
        marginTop: 20,
    },
    imagePreview: {
        width: "100%",
        height: 200,
        borderRadius: 5,
        marginTop: 10,
    },
    propertyDetails: {
        marginTop: 10,
        fontSize: 16,
    },
    card: {
        backgroundColor: Colors.lightGray,
        padding: 10,
        borderRadius: 5,
        marginTop: 10,
    },
    groupName: {
        fontWeight: "bold",
    },
    groupDescription: {
        fontSize: 12,
        color: Colors.darkGray,
    },
    countText: {
        fontSize: 18,
        marginHorizontal: 10,
    },
    counterContainer: {
        flexDirection: "row",
        alignItems: "center",
    },
});

const pickerSelectStyles = StyleSheet.create({
    inputIOS: {
        fontSize: 16,
        paddingVertical: 12,
        paddingHorizontal: 10,
        borderWidth: 1,
        borderColor: Colors.gray,
        borderRadius: 4,
        color: "black",
        paddingRight: 30,
    },
    inputAndroid: {
        fontSize: 16,
        paddingVertical: 8,
        paddingHorizontal: 10,
        borderWidth: 1,
        borderColor: Colors.gray,
        borderRadius: 4,
        color: "black",
        paddingRight: 30,
    },
});

export default BecomeHost;
