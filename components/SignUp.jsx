import React, { useState } from "react";
import { View, TextInput, Button, Text, StyleSheet } from "react-native";
import { useAuth } from "./AuthProvider"; // Assurez-vous que ce chemin est correct

const SignUp = () => {
    const [prenom, setPrenom] = useState("");
    const [nom, setNom] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const { signUp } = useAuth();
    const [message, setMessage] = useState("");

    const handleSignUp = () => {
        if (prenom && nom && email && password) {
            const success = signUp(prenom, nom, email, password);
            if (success) {
                setMessage("Inscription réussie !");
            }
        } else {
            setMessage("Veuillez remplir tous les champs.");
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.label}>Prénom</Text>
            <TextInput
                style={styles.input}
                value={prenom}
                onChangeText={setPrenom}
                placeholder="Prénom"
            />

            <Text style={styles.label}>Nom</Text>
            <TextInput
                style={styles.input}
                value={nom}
                onChangeText={setNom}
                placeholder="Nom"
            />

            <Text style={styles.label}>Email</Text>
            <TextInput
                style={styles.input}
                value={email}
                onChangeText={setEmail}
                placeholder="Email"
                keyboardType="email-address"
            />

            <Text style={styles.label}>Mot de passe</Text>
            <TextInput
                style={styles.input}
                value={password}
                onChangeText={setPassword}
                placeholder="Mot de passe"
                secureTextEntry
            />

            {message ? <Text style={styles.message}>{message}</Text> : null}

            <Button title="S'inscrire" onPress={handleSignUp} />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        padding: 20,
    },
    input: {
        borderWidth: 1,
        borderColor: "#ccc",
        padding: 10,
        marginVertical: 10,
        borderRadius: 5,
    },
    label: {
        fontSize: 16,
    },
    message: {
        color: "green",
        marginVertical: 10,
    },
});

export default SignUp;
