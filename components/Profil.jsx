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
            vertical
            showsVerticalScrollIndicator={false}
            inverted={true}
        >
            <SafeAreaView style={defaulStyles.container}>
                <View style={styless.headerContainer}>
                    <Text style={styless.header}>Profil</Text>
                    <Ionicons name="notifications" size={26} />
                </View>

                <View style={styless.card}>
                    <TouchableOpacity>
                        <Image
                            source={require("../assets/images/user.png")}
                            style={styless.avatar}
                        />
                        <View
                            style={{
                                flexDirection: "column",
                                gap: 6,
                                marginTop: 12,
                            }}
                        >
                            <Text style={{ fontSize: 20 }}>{user.email}</Text>
                        </View>
                        <View>
                            <Text style={{ fontSize: 16 }}>
                                {user.password}
                            </Text>
                        </View>
                    </TouchableOpacity>
                </View>
                <TouchableOpacity style={styless.logoutButton} onPress={logout}>
                    <Text style={styless.logoutText}>Logout</Text>
                </TouchableOpacity>

                {/* becomHost */}
                <View style={styless.card}>
                    <TouchableOpacity
                        onPress={() => router.push("/(modals)/becomehost")}
                    >
                        <Image
                            source={require("../assets/images/maison.png")}
                            style={{
                                width: 200,
                                height: 150,
                                borderRadius: 5,
                            }}
                        />

                        <View
                            style={{
                                flexDirection: "column",
                                gap: 6,
                                marginTop: 12,
                            }}
                        >
                            <Text style={{ fontSize: 15, fontFamily: "mon-b" }}>
                                Devenez Hote de votre propriété en toute
                                sécurité avec SODEICO IMMO
                            </Text>
                        </View>
                    </TouchableOpacity>
                </View>
            </SafeAreaView>
        </ScrollView>
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
    logoutText: {
        fontFamily: "mon-b",
        fontSize: 15,
    },
    logoutButton: {
        backgroundColor: Colors.primary,
        padding: 12,
        borderRadius: 8,
        marginHorizontal: 115,
        marginBottom: 24,
        alignItems: "center",
    },
});

export default Profil;
