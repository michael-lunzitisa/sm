import { View, Text } from "react-native";
import React from "react";
import { SliderBox } from "react-native-image-slider-box";
import { Colors } from "@/constants/Colors";

const caroussel = () => {
    const slides = [
        "https://images.pexels.com/photos/1268871/pexels-photo-1268871.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
        "https://images.pexels.com/photos/1179156/pexels-photo-1179156.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
        "https://images.pexels.com/photos/2506988/pexels-photo-2506988.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
        "https://images.pexels.com/photos/2373201/pexels-photo-2373201.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
    ];
    return (
        <View style={styles.carousselContainer}>
            <SliderBox
                images={slides}
                dotColor={Colors.primaty}
                inactiveDotColor={Colors.dark}
                ImageComponentStyle={{
                    borderRaduis: 15,
                    width: "92%",
                    marginTop: 15,
                }}
                autoplay
                circleLoop
            />
        </View>
    );
};

export default caroussel;

const styles = StyleSheet.create({
    carousselContainer: {
        flex: 1,
        alignItems: "center",
    },
});
