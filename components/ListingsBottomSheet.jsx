import { StyleSheet, Text, View } from "react-native";
import React, { useMemo, useRef } from "react";
import BottomSheet, { BottomSheetScrollView } from "@gorhom/bottom-sheet";
import Listings from "./Listings";
import {
    GestureHandlerRootView,
    ScrollView,
} from "react-native-gesture-handler";
import { Colors } from "../constants/Colors";
import { TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";

const ListingsBottomSheet = ({ listings, category }) => {
    const BottomSheetRef = useRef(null);
    const snapPoints = useMemo(() => ["5%", "100%"], []);
    const showMap = () => {
        BottomSheetRef.current?.collapse();
    };

    return (
        <GestureHandlerRootView>
            <BottomSheet
                ref={BottomSheetRef}
                index={1}
                enablePanDownToClose={false}
                snapPoints={snapPoints}
                handleIndicatorStyle={{ backgroundColor: Colors.gray }}
                style={styles.sheetContainer}
            >
                <BottomSheetScrollView
                    contentContainerStyle={{ flexGrow: 1 }}
                    nestedScrollEnabled={true}
                >
                    {/* <View
                    style={{ flex: 1 }}
                    contentContainerStyle={{ flexGrow: 1 }}
                    nestedScrollEnabled={true}
                > */}
                    <Listings listings={listings} category={category} />
                </BottomSheetScrollView>

                <View style={styles.absoluteBtn}>
                    <TouchableOpacity onPress={showMap} style={styles.btn}>
                        <Text style={{ fontFamily: "mon-sb", color: "#fff" }}>
                            Map
                        </Text>
                        <Ionicons
                            name="map"
                            size={20}
                            color={"#FFF"}
                        ></Ionicons>
                    </TouchableOpacity>
                </View>
            </BottomSheet>
        </GestureHandlerRootView>
    );
};

export default ListingsBottomSheet;

const styles = StyleSheet.create({
    absoluteBtn: {
        position: "absolute",
        bottom: 30,
        width: "100%",
        alignItems: "center",
    },
    btn: {
        backgroundColor: Colors.primary,
        padding: 16,
        flexDirection: "row",
        height: 50,
        borderRadius: 30,
        alignItems: "center",
        gap: 8,
    },
    sheetContainer: {
        backgroundColor: "#fff",
        borderRadius: 5,
        alignItems: "center",
        justifyContent: "center",
        elevation: 4,
        shadowColor: "#000",
        shadowOpacity: 0.1,
        shadowRadius: 6,
        shadowOffset: {
            width: 1,
            height: 10,
        },
    },
});
