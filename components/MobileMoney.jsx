import React, { useEffect } from "react";
import {
    View,
    TextInput,
    StyleSheet,
    TouchableOpacity,
    Text,
} from "react-native";
import { useForm, Controller } from "react-hook-form";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { defaulStyles } from "../constants/Styles";
import { Colors } from "@/constants/Colors";

const MobileMoney = () => {
    const {
        control,
        handleSubmit,
        formState: { errors },
        setValue,
    } = useForm({
        defaultValues: {
            phoneNumber: "",
        },
    });

    useEffect(() => {
        const loadFormData = async () => {
            try {
                const storedPhoneNumber = await AsyncStorage.getItem(
                    "phoneNumber"
                );
                if (storedPhoneNumber)
                    setValue("phoneNumber", storedPhoneNumber);
            } catch (error) {
                console.error("Failed to load form data:", error);
            }
        };

        loadFormData();
    }, [setValue]);

    const handlePhoneNumberChange = (text) => {
        let formattedText = text.replace(/[^0-9]/g, "");
        if (formattedText.length > 3 && formattedText.length <= 6) {
            formattedText =
                formattedText.slice(0, 3) + " " + formattedText.slice(3);
        } else if (formattedText.length > 6) {
            formattedText =
                formattedText.slice(0, 3) +
                " " +
                formattedText.slice(3, 6) +
                " " +
                formattedText.slice(6);
        }
        setValue("phoneNumber", formattedText);
    };

    const submit = async (data) => {
        try {
            await AsyncStorage.setItem("phoneNumber", data.phoneNumber);
            console.log(data);
        } catch (error) {
            console.error("Failed to save form data:", error);
        }
    };

    return (
        <View>
            <Controller
                name="phoneNumber"
                control={control}
                rules={{ required: "Le numéro de téléphone est requis" }}
                render={({ field: { onChange, onBlur, value } }) => (
                    <TextInput
                        autoCapitalize="none"
                        value={value}
                        onChangeText={(text) => {
                            handlePhoneNumberChange(text);
                            onChange(text);
                        }}
                        placeholder="123 456 7890"
                        keyboardType="numeric"
                        maxLength={12}
                        style={[styles.input, { paddingRight: 200 }]}
                        onBlur={onBlur}
                    />
                )}
            />
            {errors.phoneNumber && (
                <Text style={{ color: "red" }}>
                    {errors.phoneNumber.message}
                </Text>
            )}
            <View
                style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                    marginTop: 20,
                }}
            >
                <Text style={styles.btnText}>Annuler</Text>
                <TouchableOpacity
                    style={[
                        defaulStyles.btn,
                        {
                            paddingHorizontal: 20,
                            paddingRight: 20,
                        },
                    ]}
                    onPress={handleSubmit(submit)}
                >
                    <Text style={defaulStyles.btnText}>Terminé</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    input: {
        height: 44,
        borderWidth: 1,
        borderColor: "#ABABAB",
        borderRadius: 8,
        padding: 10,
        backgroundColor: "#fff",
        marginBottom: 10,
    },
    btnText: {
        color: Colors.primary,
        paddingTop: 15,
        fontSize: 16,
        fontFamily: "mon-b",
    },
});

export default MobileMoney;
