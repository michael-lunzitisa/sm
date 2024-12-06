import {
    StyleSheet,
    View,
    TouchableOpacity,
    Text,
    Image,
    ScrollView,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { defaulStyles } from "../constants/Styles";
import { Colors } from "../constants/Colors";
import { useAuth } from "../app/context/contextLogin";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";

const Profil = () => {
    const router = useRouter();
    const { user, logout } = useAuth();

    return (
        <ScrollView
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styless.scrollContent}
        >
            <SafeAreaView style={defaulStyles.container}>
                {/* Header */}
                <View style={styless.headerContainer}>
                    <Text style={styless.header}>Profil</Text>
                    <TouchableOpacity>
                        <Ionicons
                            name="notifications"
                            size={26}
                            color={Colors.primary}
                        />
                    </TouchableOpacity>
                </View>

                {/* User Info Card */}
                <View style={styless.card}>
                    <Image
                        source={require("../assets/images/user.png")}
                        style={styless.avatar}
                    />
                    <Text style={styless.userEmail}>{user.email}</Text>
                    <Text style={styless.userPassword}>{user.password}</Text>
                </View>

                {/* Logout Button */}
                <TouchableOpacity style={styless.logoutButton} onPress={logout}>
                    <Text style={styless.logoutText}>Se déconnecter</Text>
                </TouchableOpacity>

                {/* Become Host Card */}
                <View style={styless.card}>
                    <TouchableOpacity
                        onPress={() => router.push("/(modals)/becomehost")}
                        style={styless.hostContainer}
                    >
                        <Image
                            source={require("../assets/images/maison.png")}
                            style={styless.hostImage}
                        />
                        <Text style={styless.hostText}>
                            Devenez hôte de votre propriété en toute sécurité
                            avec SODEICO IMMO
                        </Text>
                    </TouchableOpacity>
                </View>
            </SafeAreaView>
        </ScrollView>
    );
};

const styless = StyleSheet.create({
    scrollContent: {
        paddingBottom: 30,
    },
    headerContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        paddingHorizontal: 24,
        paddingTop: 16,
    },
    header: {
        fontFamily: "mon-sb",
        fontSize: 24,
        color: Colors.primary,
    },
    card: {
        backgroundColor: "#fff",
        padding: 20,
        borderRadius: 16,
        marginHorizontal: 24,
        marginTop: 24,
        elevation: 3,
        shadowColor: "#000",
        shadowOpacity: 0.1,
        shadowRadius: 4,
        shadowOffset: {
            width: 0,
            height: 2,
        },
        alignItems: "center",
    },
    avatar: {
        width: 100,
        height: 100,
        borderRadius: 50,
        backgroundColor: Colors.grayLight,
        marginBottom: 16,
    },
    userEmail: {
        fontSize: 18,
        fontFamily: "mon-b",
        color: Colors.textDark,
        marginBottom: 4,
    },
    userPassword: {
        fontSize: 14,
        fontFamily: "mon",
        color: Colors.textGray,
    },
    logoutButton: {
        backgroundColor: Colors.primary,
        paddingVertical: 12,
        paddingHorizontal: 20,
        borderRadius: 8,
        marginHorizontal: 100,
        marginTop: 24,
        alignItems: "center",
    },
    logoutText: {
        fontSize: 14,
        fontFamily: "mon-b",
        color: "#fff",
    },
    hostContainer: {
        alignItems: "center",
    },
    hostImage: {
        width: "100%",
        height: 150,
        borderRadius: 8,
    },
    hostText: {
        marginTop: 12,
        fontSize: 16,
        fontFamily: "mon",
        textAlign: "center",
        color: Colors.textDark,
    },
});

export default Profil;
