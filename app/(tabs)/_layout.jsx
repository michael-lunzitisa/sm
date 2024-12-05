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
                tabBarStyle: {
                    backgroundColor: "#222",
                    borderTopColor: "#fff",
                    borderWidth: 0,
                    minHeight: 74,
                },
                tabBarLabelStyle: {
                    fontFamily: "mon-sb",
                },
                tabBarItemStyle: {
                    paddingBottom: 10,
                    paddingTop: 14,
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
                    tabBarIcon: ({ color, size, focused }) => (
                        <Ionicons
                            name={focused ? "heart" : "heart-outline"}
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
                    headerShown: false,
                    tabBarIcon: ({ color, size }) => (
                        <FontAwesome5 name="route" color={color} size={size} />
                    ),
                }}
            />
            <Tabs.Screen
                name="inbox"
                options={{
                    tabBarLabel: "Messages",
                    // headerShown: false,
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
                    headerShown: false,
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
