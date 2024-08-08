import {
    View,
    StyleSheet,
    TextInput,
    TouchableOpacity,
    Text,
} from "react-native";
import React from "react";
import { useRouter } from "expo-router";
import { defaulStyles } from "../../constants/Styles";
import { Colors } from "@/constants/Colors";
import { Ionicons } from "@expo/vector-icons";
import { useAuth } from "../../app/context/contextLogin";

export const Login = () => {
    const { login } = useAuth();
    const router = useRouter();

    const handleLogin = () => {
        login();
        router.push("(tabs)/index");
    };

    return (
        <View style={styles.container}>
            <TextInput
                autoCapitalize="none"
                placeholder="Email"
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
        fontFamily: "mon-s",
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

import { Image } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Link } from "expo-router";

export const Profil = () => {
    return (
        <SafeAreaView style={defaulStyles.container}>
            <View style={styless.headerContainer}>
                <Text style={styless.header}>Profile</Text>
                <Ionicons name="notifications" size={26} />
            </View>
            {/* User Card */}

            <View style={styless.card}>
                <TouchableOpacity>
                    <Image
                        source={require("../../assets/images/user.png")}
                        style={styless.avatar}
                    />
                    <View style={{ flexDirection: "row", gap: 6 }}></View>
                </TouchableOpacity>
            </View>
            <Link href={"/(modals)/login"}>Login</Link>

            {/*User Card fin  */}
        </SafeAreaView>
    );
};
const styless = StyleSheet.create({
    headerContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        padding: 24,
    },
    header: {
        fontFamily: "mon-sb",
        fontSize: 24,
    },
    card: {
        backgroundColor: "#fff",
        padding: 24,
        borderRadius: 16,
        marginHorizontal: 24,
        marginTop: 24,
        elevation: 2,
        shadowColor: "#000",
        shadowOpacity: 0.2,
        shadowRadius: 6,
        shadowOffset: {
            width: 1,
            height: 2,
        },
        alignItems: "center",
        gap: 14,
        marginBottom: 24,
    },
    avatar: {
        width: 100,
        height: 100,
        borderRadius: 50,
        backgroundColor: Colors.gray,
    },
});

export default function loginProfil() {
    const user = useAuth();
    return <>{user ? <Login /> : <Profil />}</>;
}
