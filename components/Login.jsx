import {
    View,
    StyleSheet,
    TextInput,
    TouchableOpacity,
    Text,
} from "react-native";
import React, { useState } from "react";
import { useRouter } from "expo-router";
import { defaulStyles } from "../constants/Styles";
import { Colors } from "../constants/Colors";
import { Ionicons } from "@expo/vector-icons";
import { useAuth } from "../app/context/contextLogin";

const Login = () => {
    const { login, user } = useAuth();
    const router = useRouter();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleLogin = async () => {
        try {
            login(email, password);

            if (user) {
                router.push("/(tabs)/index");
            }
            console.log("Erreur", "Email ou mot de passe incorrect");
        } catch (error) {
            console.log("Une erreur s'est produite lors de la connexion");
        }
    };

    return (
        <View style={styles.container}>
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
                style={[defaulStyles.inputField, { marginBottom: 30 }]}
            />
            <TouchableOpacity onPress={handleLogin} style={defaulStyles.btn}>
                <Text style={defaulStyles.btnText}>Continuer</Text>
            </TouchableOpacity>

            <View style={styles.separatorView}>
                <View
                    style={{
                        flex: 1,
                        borderBottomColor: "#000",
                        borderBottomWidth: StyleSheet.hairlineWidth,
                    }}
                />
                <Text style={styles.separator}>Ou</Text>
                <View
                    style={{
                        flex: 1,
                        borderBottomColor: "#000",
                        borderBottomWidth: StyleSheet.hairlineWidth,
                    }}
                />
            </View>
            <View style={{ gap: 10 }}>
                <TouchableOpacity style={styles.bntOutline}>
                    <Ionicons
                        name="call-outline"
                        size={24}
                        style={defaulStyles.btnIcon}
                    />
                    <Text style={styles.btnOutlineText}>
                        Continuer avec Phone
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.bntOutline}>
                    <Ionicons
                        name="logo-apple"
                        size={24}
                        style={defaulStyles.btnIcon}
                    />
                    <Text style={styles.btnOutlineText}>
                        Continuer avec Apple
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.bntOutline}>
                    <Ionicons
                        name="logo-google"
                        size={24}
                        style={defaulStyles.btnIcon}
                    />
                    <Text style={styles.btnOutlineText}>
                        Continuer avec Google
                    </Text>
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
    },
    separatorView: {
        flexDirection: "row",
        gap: 10,
        marginVertical: 30,
    },
    separator: {
        fontFamily: "mon-b",
        color: Colors.gray,
    },
    bntOutline: {
        backgroundColor: "#fff",
        borderWidth: 1,
        borderColor: Colors.gray,
        height: 50,
        borderRadius: 8,
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "row",
        paddingHorizontal: 10,
    },
    btnOutlineText: {
        color: "#000",
        fontSize: 16,
        fontFamily: "mon-sb",
    },
});

export default Login;
