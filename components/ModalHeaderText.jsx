import { View, Text, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import { Colors } from "../constants/Colors";

const ModalHeaderText = () => {
    const [active, setActive] = useState(0);
    return (
        <View
            style={{ flexDirection: "row", justifyContent: "center", gap: 10 }}
        >
            <TouchableOpacity onPress={() => setActive(0)}>
                <Text
                    style={{
                        fontFamily: "mon-sb",
                        fontSize: 18,
                        color: active === 0 ? "#000" : Colors.gray,
                        textDecorationLine: active === 0 ? "underline" : "none",
                    }}
                >
                    Séjour
                </Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => setActive(1)}>
                <Text
                    style={{
                        fontFamily: "mon-sb",
                        fontSize: 18,
                        color: active === 1 ? "#000" : Colors.gray,
                        textDecorationLine: active === 1 ? "underline" : "none",
                    }}
                >
                    Expériences
                </Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => setActive(2)}>
                <Text
                    style={{
                        fontFamily: "mon-sb",
                        fontSize: 18,
                        color: active === 2 ? "#000" : Colors.gray,
                        textDecorationLine: active === 2 ? "underline" : "none",
                    }}
                >
                    Cars
                </Text>
            </TouchableOpacity>
        </View>
    );
};

export default ModalHeaderText;
