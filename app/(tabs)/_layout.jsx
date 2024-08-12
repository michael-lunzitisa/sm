import React from "react";
import { Tabs } from "expo-router";
import { Colors } from "@/constants/Colors";
import { Ionicons } from "@expo/vector-icons";
import { FontAwesome5 } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useAuth } from "../context/contextLogin";

const Layout = () => {
    const { user } = useAuth();

    return (
        <Tabs
            screenOptions={{
                tabBarActiveTintColor: Colors.primary,
                tabBarLabelStyle: {
                    fontFamily: "mon-sb",
                },
            }}
        >
            <Tabs.Screen
                name="index"
                options={{
                    tabBarLabel: "Explorer",
                    tabBarIcon: ({ color, size }) => (
                        <Ionicons name="search" color={color} size={size} />
                    ),
                }}
            />
            <Tabs.Screen
                name="whishlists"
                options={{
                    tabBarLabel: "Favoris",
                    tabBarIcon: ({ color, size }) => (
                        <Ionicons
                            name="heart-outline"
                            color={color}
                            size={size}
                        />
                    ),
                }}
            />
            <Tabs.Screen
                name="trips"
                options={{
                    tabBarLabel: "Voyages",
                    tabBarIcon: ({ color, size }) => (
                        <FontAwesome5 name="route" color={color} size={size} />
                    ),
                }}
            />
            <Tabs.Screen
                name="inbox"
                options={{
                    tabBarLabel: "Messages",
                    tabBarIcon: ({ color, size }) => (
                        <MaterialCommunityIcons
                            name="message-outline"
                            color={color}
                            size={size}
                        />
                    ),
                }}
            />
            <Tabs.Screen
                name="loginProfil"
                options={{
                    tabBarLabel: user ? "Profil" : "Connexion",
                    headerShown: "false",
                    tabBarIcon: ({ color, size }) => (
                        <Ionicons
                            name="person-circle-outline"
                            color={color}
                            size={size}
                        />
                    ),
                }}
            />
        </Tabs>
    );
};

export default Layout;
