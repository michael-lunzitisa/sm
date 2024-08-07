import {
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    TextInput,
    ScrollView,
    Image,
} from "react-native";
import React, { useState } from "react";
import { BlurView } from "expo-blur";
import Animated, {
    FadeIn,
    FadeOut,
    SlideInDown,
} from "react-native-reanimated";
import { defaulStyles } from "../../constants/Styles";
import { useNavigation } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import { Colors } from "../../constants/Colors";
import { places } from "../../assets/data/places";
import DateTimePicker from "@react-native-community/datetimepicker";

const AnimatedTouchableOpacity =
    Animated.createAnimatedComponent(TouchableOpacity);

const guestsGroups = [
    {
        name: "Adults",
        text: "Age 13 or above",
        count: 0,
    },
    {
        name: "Children",
        text: "Ages 2 - 12",
        count: 0,
    },
    {
        name: "Infants",
        text: "Under 2",
        count: 0,
    },
    {
        name: "Pets",
        text: "Pets allowed",
        count: 0,
    },
];

const Page = () => {
    const navigation = useNavigation();
    const [openCard, setOpenCard] = useState(2);
    const [selectedPlace, setSelectedPlace] = useState(0);
    const [date, setDate] = useState(new Date());
    const [isDatePickerVisible, setIsDatePickerVisible] = useState(false);
    const [groups, setGroups] = useState(guestsGroups);

    const onClearAll = () => {
        setOpenCard(0);
        setSelectedPlace(0);
        setIsDatePickerVisible(false);
        setGroups(guestsGroups.map((group) => ({ ...group, count: 0 })));
    };

    return (
        <BlurView intensity={-2} style={styles.container} tint="#fff">
            {/* Where */}
            <View style={styles.card}>
                {openCard !== 0 && (
                    <AnimatedTouchableOpacity
                        onPress={() => setOpenCard(0)}
                        style={styles.cardPreviex}
                        entering={FadeIn.duration(200)}
                        exiting={FadeOut.duration(200)}
                    >
                        <Text style={styles.previewText}>Où</Text>
                        <Text style={styles.previewDate}>
                            Je suis flexible.
                        </Text>
                    </AnimatedTouchableOpacity>
                )}

                {openCard === 0 && (
                    <>
                        <Animated.Text
                            entering={FadeIn}
                            style={styles.cardHeader}
                        >
                            Where to
                        </Animated.Text>
                        <Animated.View style={styles.cardBody}>
                            <View style={styles.searchSection}>
                                <Ionicons
                                    style={styles.searchIcon}
                                    name="search-outline"
                                    size={20}
                                />
                                <TextInput
                                    style={styles.inputField}
                                    placeholder="Rechercher une destination"
                                    placeholderTextColor={Colors.gray}
                                />
                            </View>
                        </Animated.View>
                        <ScrollView
                            horizontal
                            showsHorizontalScrollIndicator={false}
                            contentContainerStyle={{
                                gap: 25,
                                paddingLeft: 20,
                                paddingBottom: 30,
                            }}
                        >
                            {places.map((item, index) => (
                                <TouchableOpacity
                                    key={index}
                                    onPress={() => setSelectedPlace(index)}
                                >
                                    <Image
                                        source={{ uri: item.image }}
                                        style={
                                            selectedPlace === index
                                                ? styles.placeSelected
                                                : styles.place
                                        }
                                    />
                                    <Text
                                        style={[
                                            {
                                                fontFamily: "mon-s",
                                                paddingTop: 6,
                                            },
                                            selectedPlace === index
                                                ? { fontFamily: "mon-sb" }
                                                : { fontFamily: "mon" },
                                        ]}
                                    >
                                        {item.title}
                                    </Text>
                                </TouchableOpacity>
                            ))}
                        </ScrollView>
                    </>
                )}
            </View>
            {/* When */}
            <View style={styles.card}>
                {openCard !== 1 && (
                    <AnimatedTouchableOpacity
                        onPress={() => {
                            setOpenCard(1);
                            setIsDatePickerVisible(false);
                        }}
                        style={styles.cardPreviex}
                        entering={FadeIn.duration(200)}
                        exiting={FadeOut.duration(200)}
                    >
                        <Text style={styles.previewText}>Quand</Text>
                        <Text style={styles.previewDate}>Chaque semaine.</Text>
                    </AnimatedTouchableOpacity>
                )}

                {openCard === 1 && (
                    <>
                        <Animated.Text
                            entering={FadeIn}
                            style={styles.cardHeader}
                            onPress={() =>
                                setIsDatePickerVisible(!isDatePickerVisible)
                            }
                        >
                            Quand voulez vous-voyager ?
                        </Animated.Text>
                        {isDatePickerVisible && (
                            <Animated.View style={styles.cardBody}>
                                <DateTimePicker
                                    mode="date"
                                    display="spinner"
                                    value={date}
                                    onChange={(event, selectedDate) => {
                                        const currentDate =
                                            selectedDate || date;
                                        setDate(currentDate);
                                        setIsDatePickerVisible(false);
                                    }}
                                />
                            </Animated.View>
                        )}
                    </>
                )}
            </View>
            {/* Who */}
            <View style={styles.card}>
                {openCard !== 2 && (
                    <AnimatedTouchableOpacity
                        onPress={() => setOpenCard(2)}
                        style={styles.cardPreviex}
                        entering={FadeIn.duration(200)}
                        exiting={FadeOut.duration(200)}
                    >
                        <Text style={styles.previewText}>Qui</Text>
                        <Text style={styles.previewDate}>
                            Ajouter un invité
                        </Text>
                    </AnimatedTouchableOpacity>
                )}

                {openCard === 2 && (
                    <>
                        <Animated.Text
                            entering={FadeIn}
                            style={styles.cardHeader}
                        >
                            Qui vient ?
                        </Animated.Text>
                        <Animated.View style={styles.cardBody}>
                            {groups.map((item, index) => (
                                <View key={index} style={styles.guestsItem}>
                                    <View>
                                        <Text
                                            style={{
                                                fontFamily: "mon-sb",
                                                fontSize: 14,
                                            }}
                                        >
                                            {item.name}
                                        </Text>
                                        <Text
                                            style={{
                                                fontFamily: "mon",
                                                fontSize: 14,
                                                color: Colors.gray,
                                            }}
                                        >
                                            {item.text}
                                        </Text>
                                    </View>
                                    <View
                                        style={{
                                            flexDirection: "row",
                                            gap: 10,
                                            alignItems: "center",
                                            justifyContent: "center",
                                        }}
                                    >
                                        <TouchableOpacity
                                            onPress={() => {
                                                const newGroups = [...groups];
                                                newGroups[index].count =
                                                    newGroups[index].count > 0
                                                        ? newGroups[index]
                                                              .count - 1
                                                        : 0;
                                                setGroups(newGroups);
                                            }}
                                        >
                                            <Ionicons
                                                name="remove-circle-outline"
                                                size={26}
                                                color={
                                                    groups[index].count > 0
                                                        ? Colors.gray
                                                        : "#cdcdcd"
                                                }
                                            />
                                        </TouchableOpacity>
                                        <Text
                                            style={{
                                                fontFamily: "mon",
                                                fontSize: 16,
                                                textAlign: "center",
                                                minWidth: 18,
                                            }}
                                        >
                                            {item.count}
                                        </Text>
                                        <TouchableOpacity
                                            onPress={() => {
                                                const newGroups = [...groups];
                                                newGroups[index].count++;
                                                setGroups(newGroups);
                                            }}
                                        >
                                            <Ionicons
                                                name="add-circle-outline"
                                                size={26}
                                                color={Colors.gray}
                                            />
                                        </TouchableOpacity>
                                    </View>
                                </View>
                            ))}
                        </Animated.View>
                    </>
                )}
            </View>

            {/* Footer */}
            <Animated.View
                style={defaulStyles.footer}
                entering={SlideInDown.delay(200)}
            >
                <View
                    style={{
                        flexDirection: "row",
                        justifyContent: "space-between",
                        alignItems: "center",
                    }}
                >
                    <TouchableOpacity onPress={onClearAll}>
                        <Text
                            style={{
                                fontFamily: "mon-sb",
                                fontSize: 18,
                                textDecorationLine: "underline",
                            }}
                        >
                            Tout effacer
                        </Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        onPress={() => navigation.goBack()}
                        style={[
                            defaulStyles.btn,
                            { paddingLeft: 50, paddingRight: 20 },
                        ]}
                    >
                        <Ionicons
                            name="search-outline"
                            size={24}
                            color={"#fff"}
                            style={defaulStyles.btnIcon}
                        />
                        <Text style={defaulStyles.btnText}>Rechercher</Text>
                    </TouchableOpacity>
                </View>
            </Animated.View>
        </BlurView>
    );
};
const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 100,
    },
    card: {
        backgroundColor: "#fff",
        borderRadius: 14,
        margin: 10,
        elevation: 4,
        shadowColor: "#000",
        shadowOpacity: 0.3,
        shadowRadius: 4,
        shadowOffset: {
            width: 2,
            height: 2,
        },
        gap: 20,
    },
    previewText: {
        fontFamily: "mon-sb",
        fontSize: 14,
        color: Colors.gray,
    },
    previewDate: {
        fontFamily: "mon-sb",
        fontSize: 14,
        color: Colors.dark,
    },
    cardPreviex: {
        flexDirection: "row",
        justifyContent: "space-between",
        padding: 20,
    },
    cardHeader: {
        fontFamily: "mon-b",
        fontSize: 24,
        padding: 20,
    },
    cardBody: {
        paddingHorizontal: 20,
    },
    searchSection: {
        height: 59,
        flexDirection: "row",
        borderWidth: 1,
        borderColor: "#ABABAB",
        borderRadius: 8,
        alignContent: "center",
        alignItems: "center",
        marginBottom: 4,
    },
    inputField: {
        flex: 1,
        padding: 10,
    },
    searchIcon: {
        padding: 10,
        backgroundColor: "#fff",
    },
    place: {
        width: 120,
        height: 120,
        borderRadius: 10,
    },
    placeSelected: {
        width: 120,
        height: 120,
        borderRadius: 10,
        borderWidth: 2,
        borderColor: Colors.gray,
    },
    guestsItem: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        paddingVertical: 16,
    },
    itemborder: {
        borderBottomWidth: StyleSheet.hairlineWidth,
        borderBottomColor: Colors.gray,
    },
});

export default Page;
