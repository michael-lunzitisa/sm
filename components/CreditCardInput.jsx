import React, { useEffect } from "react";
import {
    View,
    TextInput,
    StyleSheet,
    TouchableOpacity,
    Text,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useForm, Controller } from "react-hook-form";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { defaulStyles } from "../constants/Styles";
import { Colors } from "@/constants/Colors";

const CreditCardInput = () => {
    const {
        control,
        handleSubmit,
        formState: { errors },
        setValue,
        getValues,
    } = useForm({
        defaultValues: {
            cardNumber: "",
            date: "",
            cvv: "",
            postalCode: "",
        },
    });

    useEffect(() => {
        const loadFormData = async () => {
            try {
                const storedCardNumber = await AsyncStorage.getItem(
                    "cardNumber"
                );
                const storedDate = await AsyncStorage.getItem("date");
                const storedCvv = await AsyncStorage.getItem("cvv");
                const storedPostalCode = await AsyncStorage.getItem(
                    "postalCode"
                );

                if (storedCardNumber) setValue("cardNumber", storedCardNumber);
                if (storedDate) setValue("date", storedDate);
                if (storedCvv) setValue("cvv", storedCvv);
                if (storedPostalCode) setValue("postalCode", storedPostalCode);
            } catch (error) {
                console.error("Failed to load form data:", error);
            }
        };

        loadFormData();
    }, [setValue]);

    const handleCardNumberChange = (text) => {
        let formattedText = text.replace(/[^0-9]/g, "");
        if (formattedText.length > 4 && formattedText.length <= 8) {
            formattedText =
                formattedText.slice(0, 4) + " " + formattedText.slice(4);
        } else if (formattedText.length > 8 && formattedText.length <= 12) {
            formattedText =
                formattedText.slice(0, 4) +
                " " +
                formattedText.slice(4, 8) +
                " " +
                formattedText.slice(8);
        } else if (formattedText.length > 12) {
            formattedText =
                formattedText.slice(0, 4) +
                " " +
                formattedText.slice(4, 8) +
                " " +
                formattedText.slice(8, 12) +
                " " +
                formattedText.slice(12);
        }
        if (formattedText.length > 19) {
            formattedText = formattedText.slice(0, 19);
        }
        setValue("cardNumber", formattedText);
    };

    const handleDateChange = (text) => {
        let formattedText = text.replace(/[^0-9]/g, "");
        if (formattedText.length >= 2) {
            formattedText =
                formattedText.slice(0, 2) + "/" + formattedText.slice(2);
        }
        if (formattedText.length > 5) {
            formattedText = formattedText.slice(0, 5);
        }
        setValue("date", formattedText);
    };

    const handleCvvChange = (text) => {
        let formattedText = text.replace(/[^0-9]/g, "");
        if (formattedText.length > 4) {
            formattedText = formattedText.slice(0, 4);
        }
        setValue("cvv", formattedText);
    };

    const submit = async (data) => {
        try {
            await AsyncStorage.setItem("cardNumber", data.cardNumber);
            await AsyncStorage.setItem("date", data.date);
            await AsyncStorage.setItem("cvv", data.cvv);
            await AsyncStorage.setItem("postalCode", data.postalCode);
            console.log(data);
        } catch (error) {
            console.error("Failed to save form data:", error);
        }
    };

    return (
        <View style={{ marginHorizontal: 25 }}>
            <View style={{ position: "relative", marginTop: 21 }}>
                <Controller
                    name="cardNumber"
                    control={control}
                    rules={{ required: "Le numéro de carte est requis" }}
                    render={({ field: { onChange, onBlur, value } }) => (
                        <TextInput
                            autoCapitalize="none"
                            value={value}
                            onChangeText={(text) => {
                                handleCardNumberChange(text);
                                onChange(text);
                            }}
                            placeholder="1234 5678 1234 5678"
                            keyboardType="numeric"
                            maxLength={19}
                            style={[styles.input, { paddingRight: 0 }]}
                            onBlur={onBlur}
                        />
                    )}
                />
                {errors.cardNumber && (
                    <Text style={{ color: "red" }}>
                        {errors.cardNumber.message}
                    </Text>
                )}
                <Ionicons
                    name="card-outline"
                    size={24}
                    color="#9f9f9f"
                    style={{
                        position: "absolute",
                        right: 10,
                        top: "50%",
                        transform: [{ translateY: -12 }],
                    }}
                />
            </View>
            <View
                style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                }}
            >
                <Controller
                    name="date"
                    control={control}
                    rules={{ required: "La date est requise" }}
                    render={({ field: { onChange, onBlur, value } }) => (
                        <TextInput
                            autoCapitalize="none"
                            value={value}
                            onChangeText={(text) => {
                                handleDateChange(text);
                                onChange(text);
                            }}
                            placeholder="MM/YY"
                            keyboardType="numeric"
                            maxLength={5}
                            style={[styles.input, { flex: 1, marginRight: 5 }]}
                            onBlur={onBlur}
                        />
                    )}
                />

                <Controller
                    name="cvv"
                    control={control}
                    rules={{ required: "Le numéro de CVV est requis" }}
                    render={({ field: { onChange, onBlur, value } }) => (
                        <TextInput
                            autoCapitalize="none"
                            value={value}
                            onChangeText={(text) => {
                                handleCvvChange(text);
                                onChange(text);
                            }}
                            placeholder="CVV"
                            keyboardType="numeric"
                            maxLength={4}
                            secureTextEntry={false}
                            style={[styles.input, { flex: 1, marginLeft: 5 }]}
                            onBlur={onBlur}
                        />
                    )}
                />
            </View>
            <View>
                <Controller
                    name="postalCode"
                    control={control}
                    rules={{ required: "Le code postal est requis" }}
                    render={({ field: { onChange, onBlur, value } }) => (
                        <TextInput
                            autoCapitalize="none"
                            placeholder="Code postal"
                            style={[styles.input, { paddingRight: 200 }]}
                            onChangeText={onChange}
                            onBlur={onBlur}
                            value={value}
                        />
                    )}
                />
                {errors.postalCode && (
                    <Text style={{ color: "red" }}>
                        {errors.postalCode.message}
                    </Text>
                )}
            </View>
            <View>
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

export default CreditCardInput;
