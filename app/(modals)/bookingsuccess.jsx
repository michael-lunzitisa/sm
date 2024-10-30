import { StyleSheet, Text, View } from "react-native";
import React from "react";
import BookingSuccess from "../../components/BookingSuccess";
import { GestureHandlerRootView } from "react-native-gesture-handler";

const bookingsuccess = () => {
    return (
        <GestureHandlerRootView style={{ flex: 1 }}>
            <BookingSuccess />
        </GestureHandlerRootView>
    );
};

export default bookingsuccess;

const styles = StyleSheet.create({});
