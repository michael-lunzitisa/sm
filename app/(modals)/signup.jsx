// import {
//     View,
//     StyleSheet,
//     TextInput,
//     TouchableOpacity,
//     Text,
//     Alert,
//     Image,
// } from "react-native";
// import React, { useState } from "react";
// import { useRouter } from "expo-router";
// import { defaulStyles } from "../../constants/Styles";
// import { Colors } from "../../constants/Colors";
// import { Ionicons } from "@expo/vector-icons";
// import * as ImagePicker from "expo-image-picker";
// import { useAuth } from "../context/contextLogin";

// const Page = () => {
//     const { register, user } = useAuth();
//     const router = useRouter();
//     const [email, setEmail] = useState("");
//     const [password, setPassword] = useState("");
//     const [phone, setPhone] = useState("");
//     const [address, setAddress] = useState("");
//     const [selectedImage, setSelectedImage] = useState(null);

//     const handleRegister = async () => {
//         try {
//             if (!email || !password || !phone || !address || !selectedImage) {
//                 Alert.alert("Erreur", "Veuillez remplir tous les champs");
//                 return;
//             }
//             // Ajouter la logique d'enregistrement (exemple ci-dessous)
//             register(email, password, phone, address, selectedImage);

//             if (user) {
//                 router.push("/(tabs)/inbox");
//             }
//         } catch (error) {
//             Alert.alert(
//                 "Erreur",
//                 "Une erreur s'est produite lors de l'inscription"
//             );
//         }
//     };

//     const pickImage = async () => {
//         const result = await ImagePicker.launchImageLibraryAsync({
//             mediaTypes: ImagePicker.MediaTypeOptions.Images,
//             allowsEditing: true,
//             aspect: [1, 1],
//             quality: 1,
//         });

//         if (!result.canceled) {
//             setSelectedImage(result.assets[0].uri); // Chemin de l'image sélectionnée
//         }
//     };

//     return (
//         <View style={styles.container}>
//             {/* Section pour l'image de profil */}
//             <TouchableOpacity onPress={pickImage} style={styles.imagePicker}>
//                 {selectedImage ? (
//                     <Image
//                         source={{ uri: selectedImage }}
//                         style={styles.profileImage}
//                     />
//                 ) : (
//                     <Ionicons
//                         name="person-circle-outline"
//                         size={100}
//                         color={Colors.gray}
//                     />
//                 )}
//                 <Text style={styles.imagePickerText}>
//                     Ajouter une photo de profil
//                 </Text>
//             </TouchableOpacity>

//             {/* Champs d'inscription */}
//             <TextInput
//                 autoCapitalize="none"
//                 placeholder="Email"
//                 value={email}
//                 onChangeText={setEmail}
//                 style={[defaulStyles.inputField, { marginBottom: 20 }]}
//             />
//             <TextInput
//                 secureTextEntry
//                 placeholder="Mot de passe"
//                 value={password}
//                 onChangeText={setPassword}
//                 style={[defaulStyles.inputField, { marginBottom: 20 }]}
//             />
//             <TextInput
//                 placeholder="Numéro de téléphone"
//                 value={phone}
//                 onChangeText={setPhone}
//                 keyboardType="phone-pad"
//                 style={[defaulStyles.inputField, { marginBottom: 20 }]}
//             />
//             <TextInput
//                 placeholder="Adresse"
//                 value={address}
//                 onChangeText={setAddress}
//                 style={[defaulStyles.inputField, { marginBottom: 30 }]}
//             />
//             <TouchableOpacity onPress={handleRegister} style={defaulStyles.btn}>
//                 <Text style={defaulStyles.btnText}>S'inscrire</Text>
//             </TouchableOpacity>
//         </View>
//     );
// };

// const styles = StyleSheet.create({
//     container: {
//         flex: 1,
//         backgroundColor: "#fff",
//         padding: 26,
//         justifyContent: "center",
//         alignContent: "center",
//     },
//     imagePicker: {
//         alignItems: "center",
//         marginBottom: 20,
//     },
//     profileImage: {
//         width: 100,
//         height: 100,
//         borderRadius: 50,
//         marginBottom: 10,
//     },
//     imagePickerText: {
//         color: Colors.gray,
//         fontSize: 14,
//         fontFamily: "mon-sb",
//     },
// });

// export default Page;

import {
    View,
    StyleSheet,
    TextInput,
    TouchableOpacity,
    Text,
    Alert,
    Image,
} from "react-native";
import React, { useState } from "react";
import { useRouter } from "expo-router";
import { defaulStyles } from "../../constants/Styles";
import { Colors } from "../../constants/Colors";
import { Ionicons } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";
import { useAuth } from "../context/contextLogin";

const Page = () => {
    const { register, user } = useAuth();
    const router = useRouter();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [phone, setPhone] = useState("");
    const [address, setAddress] = useState("");
    const [selectedImage, setSelectedImage] = useState(null);

    const handleRegister = async () => {
        try {
            if (!email || !password || !phone || !address || !selectedImage) {
                Alert.alert("Erreur", "Veuillez remplir tous les champs");
                return;
            }

            register(email, password, phone, address, selectedImage);

            if (user) {
                router.push("/(tabs)/inbox");
            }
        } catch (error) {
            Alert.alert(
                "Erreur",
                "Une erreur s'est produite lors de l'inscription"
            );
        }
    };

    const pickImage = async () => {
        const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [1, 1],
            quality: 1,
        });

        if (!result.canceled) {
            setSelectedImage(result.assets[0].uri);
        }
    };

    return (
        <View style={styles.container}>
            {/* Section pour l'image de profil */}
            <TouchableOpacity onPress={pickImage} style={styles.imagePicker}>
                {selectedImage ? (
                    <Image
                        source={{ uri: selectedImage }}
                        style={styles.profileImage}
                    />
                ) : (
                    <Ionicons
                        name="person-circle-outline"
                        size={100}
                        color={Colors.gray}
                    />
                )}
                <Text style={styles.imagePickerText}>
                    Ajouter une photo de profil
                </Text>
            </TouchableOpacity>

            {/* Champs d'inscription */}
            <TextInput
                autoCapitalize="none"
                placeholder="Email"
                value={email}
                onChangeText={setEmail}
                style={[defaulStyles.inputField, { marginBottom: 20 }]}
            />
            <TextInput
                secureTextEntry
                placeholder="Mot de passe"
                value={password}
                onChangeText={setPassword}
                style={[defaulStyles.inputField, { marginBottom: 20 }]}
            />
            <TextInput
                placeholder="Numéro de téléphone"
                value={phone}
                onChangeText={setPhone}
                keyboardType="phone-pad"
                style={[defaulStyles.inputField, { marginBottom: 20 }]}
            />
            <TextInput
                placeholder="Adresse"
                value={address}
                onChangeText={setAddress}
                style={[defaulStyles.inputField, { marginBottom: 30 }]}
            />
            <TouchableOpacity onPress={handleRegister} style={defaulStyles.btn}>
                <Text style={defaulStyles.btnText}>S'inscrire</Text>
            </TouchableOpacity>

            {/* Lien pour se connecter */}
            <View style={styles.loginLinkContainer}>
                <Text style={styles.loginText}>
                    Vous avez déjà un compte ?{" "}
                </Text>
                <TouchableOpacity onPress={() => router.push("/login")}>
                    <Text style={styles.loginLink}>Se connecter</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
        padding: 26,
        justifyContent: "center",
        alignContent: "center",
    },
    imagePicker: {
        alignItems: "center",
        marginBottom: 20,
    },
    profileImage: {
        width: 100,
        height: 100,
        borderRadius: 50,
        marginBottom: 10,
    },
    imagePickerText: {
        color: Colors.gray,
        fontSize: 14,
        fontFamily: "mon-sb",
    },
    loginLinkContainer: {
        flexDirection: "row",
        justifyContent: "center",
        marginTop: 20,
    },
    loginText: {
        fontSize: 14,
        color: Colors.gray,
    },
    loginLink: {
        fontSize: 14,
        color: Colors.primary,
        fontFamily: "mon-b",
    },
});

export default Page;
