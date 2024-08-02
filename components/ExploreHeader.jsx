import {
    View,
    StyleSheet,
    Text,
    TouchableOpacity,
    ScrollView,
} from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { Link } from "expo-router";
import { Colors } from "@/constants/Colors";
import { FontAwesome } from "@expo/vector-icons";
import { useRef } from "react";
// import * as Haptics from "expo-haptics";
// import Animated from "react-native-reanimated";

const ExploreHeader = ({ onCategoryChanged }) => {
    const categories = [
        {
            name: "Maison",
            icon: "home",
        },
        {
            name: "Appart",
            icon: "building",
        },
        {
            name: "Chambres",
            icon: "bed",
        },
        {
            name: "Villa",
            icon: "university",
        },
        {
            name: "Voiture",
            icon: "car",
        },
    ];

    const scrollRef = useRef([]);
    const itemsRef = useRef([]);
    const [activeIndex, setActiveIndex] = useState(0);

    const handleCategoryPress = (index) => {
        const selected = itemsRef.current[index];
        setActiveIndex(index);

        selected?.measure((x) => {
            scrollRef.current?.scrollTo({
                x: x - 16,
                y: 0,
                animated: true,
            });
        });

        // Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
        onCategoryChanged(categories[index].name);
    };

    return (
        <SafeAreaView style={{ flex: -1, backgroundColor: "#fff" }}>
            <View style={styles.container}>
                <View style={styles.actionRow}>
                    <Link href={"/(modals)/booking"} asChild>
                        <TouchableOpacity style={styles.searchBtn}>
                            <Ionicons name="search" size={24} />
                            <View>
                                <Text style={{ fontFamily: "mon-sb" }}>
                                    Où aller ?
                                </Text>
                                <Text
                                    style={{
                                        fontFamily: "mon",
                                        color: Colors.gray,
                                    }}
                                >
                                    N'importe où. Chaque semaine
                                </Text>
                            </View>
                            <TouchableOpacity style={styles.filterbtn}>
                                <Ionicons name="options-outline" size={12} />
                            </TouchableOpacity>
                        </TouchableOpacity>
                    </Link>
                </View>
                <ScrollView
                    ref={scrollRef}
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    contentContainerStyle={{
                        alignItems: "center",
                        gap: 20,
                        paddingHorizontal: 16,
                    }}
                >
                    {categories.map((item, index) => (
                        <TouchableOpacity
                            onPress={() => handleCategoryPress(index)}
                            key={index}
                            ref={(el) => (itemsRef.current[index] = el)}
                            style={
                                activeIndex === index
                                    ? styles.categotyBtnActive
                                    : styles.categotyBtn
                            }
                        >
                            <FontAwesome
                                name={item.icon}
                                size={24}
                                color={
                                    activeIndex === index ? "#000" : Colors.gray
                                }
                            />
                            <Text
                                style={
                                    activeIndex === index
                                        ? styles.categotyTextActive
                                        : styles.categotyText
                                }
                            >
                                {item.name}
                            </Text>
                        </TouchableOpacity>
                    ))}
                </ScrollView>
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: "#fff",
        paddingVertical: 8,
        height: 160,
    },
    actionRow: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        paddingHorizontal: 24,
        paddingBottom: 16,
        gap: 10,
    },
    filterbtn: {
        padding: 10,
        borderWidth: 2,
        borderColor: Colors.gray,
        borderRadius: 24,
        marginLeft: -2,
        marginRight: 0,
    },
    searchBtn: {
        flexDirection: "row",
        alignItems: "center",
        gap: 5,
        borderColor: "#c2c2c2",
        borderWidth: StyleSheet.hairlineWidth,
        flex: 1,
        padding: 14,
        borderRadius: 30,
        backgroundColor: "#fff",

        elevation: 2,
        shadowColor: "#000",
        shadowOpacity: 0.12,
        shadowRadius: 8,
        // shadowOffset: {
        //     width: 1,
        //     height: 1,
        // },
    },
    categotyText: {
        fontSize: 14,
        fontFamily: "mon-sb",
        color: Colors.gray,
    },
    categotyTextActive: {
        fontSize: 14,
        fontFamily: "mon-sb",
        color: Colors.primary,
    },
    categotyBtn: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        paddingBottom: 8,
    },
    categotyBtnActive: {
        flex: -1,
        alignItems: "center",
        justifyContent: "center",
        borderBottomColor: "#F76705",
        borderBottomWidth: 2,
        paddingBottom: 8,
    },
});

export default ExploreHeader;
