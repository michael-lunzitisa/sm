import { View, Text, StyleSheet, TouchableOpacity, Image } from "react-native";
import React from "react";
import { Ionicons } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";
import { defaulStyles } from "../../constants/Styles";
import { Colors } from "@/constants/Colors";

const Page = () => {
    return (
        <SafeAreaView style={defaulStyles.container}>
            <View style={styles.headerContainer}>
                <Text style={styles.header}>Profile</Text>
                <Ionicons name="notifications" size={26} />
            </View>
            {/* User Card */}

            <View style={styles.card}>
                <TouchableOpacity>
                    <Image
                        source={require("../../assets/images/user.png")}
                        style={styles.avatar}
                    />
                    <View style={{ flexDirection: "row", gap: 6 }}></View>
                </TouchableOpacity>
            </View>

            {/*User Card fin  */}
        </SafeAreaView>
    );
};
const styles = StyleSheet.create({
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

export default Page;
