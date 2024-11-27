// import {
//     View,
//     Text,
//     StyleSheet,
//     Image,
//     TouchableOpacity,
//     FlatList,
//     Share,
// } from "react-native";
// import React, { useLayoutEffect, useState } from "react";
// import { useLocalSearchParams, useRouter, useNavigation } from "expo-router";
// import listingsData from "../../assets/data/listings.json";
// import { Ionicons } from "@expo/vector-icons";
// import { Colors } from "../../constants/Colors";
// import { defaulStyles } from "../../constants/Styles";
// import Animated, { SlideInDown } from "react-native-reanimated";
// import { useAuth } from "../context/contextLogin";

// const Page = () => {
//     const { id } = useLocalSearchParams();
//     const listing = listingsData.find((item) => item.id === id);
//     const router = useRouter();
//     const navigation = useNavigation();
//     const { user } = useAuth();

//     const [activeIndex, setActiveIndex] = useState(0);

//     const images = [listing.featuredImage, ...listing.galleryImgs];

//     const shareList = async () => {
//         try {
//             await Share.share({
//                 title: listing.title,
//                 url: listing.listing_url,
//             });
//         } catch (error) {
//             console.log(error);
//         }
//     };

//     const handleReservation = () => {
//         if (user) {
//             router.push({
//                 pathname: "(modals)/pay",
//                 params: { id: listing.id },
//             });
//         } else {
//             router.push("/login");
//         }
//     };

//     useLayoutEffect(() => {
//         navigation.setOptions({
//             headerBackground: () => <Animated.View style={[styles.header]} />,
//             headerRight: () => (
//                 <View style={styles.bar}>
//                     <TouchableOpacity
//                         style={styles.roundeButton}
//                         onPress={shareList}
//                     >
//                         <Ionicons
//                             name="share-outline"
//                             size={22}
//                             color={"#000"}
//                         />
//                     </TouchableOpacity>
//                     <TouchableOpacity
//                         style={styles.roundeButton}
//                         onPress={shareList}
//                     >
//                         <Ionicons
//                             name="heart-outline"
//                             size={22}
//                             color={"#000"}
//                         />
//                     </TouchableOpacity>
//                 </View>
//             ),
//             headerLeft: () => (
//                 <TouchableOpacity
//                     style={styles.roundeButton}
//                     onPress={() => navigation.goBack()}
//                 >
//                     <Ionicons name="chevron-back" size={24} color={"#000"} />
//                 </TouchableOpacity>
//             ),
//         });
//     }, []);

//     if (!listing) {
//         return (
//             <View style={styles.container}>
//                 <Text>Listing not found</Text>
//             </View>
//         );
//     }

//     const handleScroll = (event) => {
//         const contentOffsetX = event.nativeEvent.contentOffset.x;
//         const index = Math.floor(contentOffsetX / 300); // Largeur de chaque image
//         setActiveIndex(index);
//     };

//     return (
//         <View style={styles.container}>
//             {/* Carousel/Slider */}
//             <View style={styles.carouselContainer}>
//                 <FlatList
//                     data={images}
//                     horizontal
//                     pagingEnabled
//                     showsHorizontalScrollIndicator={false}
//                     onScroll={handleScroll}
//                     keyExtractor={(img, index) => `${listing.id}-${index}`}
//                     renderItem={({ item: imageUri }) => (
//                         <Image
//                             source={{ uri: imageUri }}
//                             style={styles.sliderImage}
//                         />
//                     )}
//                 />
//                 {/* Indicateur de pagination */}
//                 <View style={styles.paginationContainer}>
//                     <Text style={styles.paginationText}>
//                         {activeIndex + 1} / {images.length}
//                     </Text>
//                 </View>
//             </View>

//             <View style={styles.infoContainer}>
//                 <Text style={styles.name}>{listing.title}</Text>
//                 <Text style={styles.location}>
//                     {listing.room_type} in {listing.smart_location}
//                 </Text>
//                 <Text style={styles.rooms}>
//                     {listing.maxGuests} voyageurs. {listing.bedrooms} chambres.
//                     {listing.bed} lits. {listing.bathrooms} salles de bains
//                 </Text>
//                 <View style={{ flexDirection: "row", gap: 4 }}>
//                     <Ionicons name="star" size={16} />
//                     <Text style={styles.ratings}>
//                         {listing.rating}.{listing.reviewStart} reviews
//                     </Text>
//                 </View>
//                 <View style={styles.divider} />

//                 <View style={styles.hostView}>
//                     <Image
//                         source={{ uri: listing.featuredImage }}
//                         style={styles.host}
//                     />
//                     <View>
//                         <Text style={{ fontWeight: "500", fontSize: 16 }}>
//                             Hôte: {listing.host_name}
//                         </Text>
//                         <Text>{listing.host_since}</Text>
//                     </View>
//                 </View>
//                 <View style={styles.divider} />
//                 <Text style={styles.description}>{listing.description}</Text>
//             </View>
//             <Animated.View
//                 style={defaulStyles.footer}
//                 entering={SlideInDown.delay(200)}
//             >
//                 <View
//                     style={{
//                         flexDirection: "row",
//                         justifyContent: "space-between",
//                         alignItems: "center",
//                     }}
//                 >
//                     <TouchableOpacity style={styles.footerText}>
//                         <Text style={styles.footerPrice}>${listing.price}</Text>
//                         <Text>night</Text>
//                     </TouchableOpacity>

//                     <TouchableOpacity
//                         style={[defaulStyles.btn, { paddingHorizontal: 20 }]}
//                         onPress={handleReservation}
//                     >
//                         <Text style={defaulStyles.btnText}>Réserver</Text>
//                     </TouchableOpacity>
//                 </View>
//             </Animated.View>
//         </View>
//     );
// };

// const styles = StyleSheet.create({
//     container: {
//         flex: 1,
//         backgroundColor: "#fff",
//     },
//     carouselContainer: {
//         marginBottom: 20,
//     },
//     sliderImage: {
//         width: 360,
//         height: 250,
//         resizeMode: "cover",
//     },
//     paginationContainer: {
//         position: "absolute",
//         bottom: 10,
//         right: 10,
//         backgroundColor: "rgba(0, 0, 0, 0.5)",
//         borderRadius: 12,
//         paddingHorizontal: 8,
//         paddingVertical: 4,
//     },
//     paginationText: {
//         color: "#fff",
//         fontSize: 16,
//         fontWeight: "bold",
//     },
//     infoContainer: {
//         padding: 24,
//         backgroundColor: "#fff",
//     },
//     name: {
//         fontSize: 26,
//         fontWeight: "bold",
//         fontFamily: "mon-sb",
//     },
//     location: {
//         fontSize: 18,
//         fontFamily: "mon-sb",
//         marginTop: 10,
//     },
//     rooms: {
//         fontSize: 16,
//         color: Colors.gray,
//         marginVertical: 4,
//         fontFamily: "mon",
//     },
//     ratings: {
//         fontSize: 16,
//         fontFamily: "mon-sb",
//     },
//     divider: {
//         height: StyleSheet.hairlineWidth,
//         backgroundColor: Colors.gray,
//         marginVertical: 6,
//     },
//     host: {
//         width: 50,
//         height: 50,
//         borderRadius: 50,
//         backgroundColor: Colors.gray,
//     },
//     hostView: {
//         flexDirection: "row",
//         alignItems: "center",
//         gap: 12,
//     },
//     description: {
//         fontSize: 16,
//         marginTop: 10,
//         fontFamily: "mon",
//     },
//     footerText: {
//         height: "100%",
//         justifyContent: "center",
//         flexDirection: "row",
//         alignItems: "center",
//         gap: 4,
//     },
//     footerPrice: {
//         fontSize: 18,
//         fontFamily: "mon-sb",
//     },
//     bar: {
//         flexDirection: "row",
//         alignItems: "center",
//         justifyContent: "center",
//         gap: 10,
//     },
//     roundeButton: {
//         width: 40,
//         height: 40,
//         borderRadius: 50,
//         backgroundColor: "#fff",
//         alignItems: "center",
//         justifyContent: "center",
//         color: Colors.primary,
//         borderWidth: StyleSheet.hairlineWidth,
//         borderColor: Colors.gray,
//     },
// });

// export default Page;

import {
    View,
    Text,
    StyleSheet,
    Image,
    TouchableOpacity,
    FlatList,
    Share,
    Modal,
    ScrollView,
} from "react-native";
import React, { useLayoutEffect, useState } from "react";
import { useLocalSearchParams, useRouter, useNavigation } from "expo-router";
import listingsData from "../../assets/data/listings.json";
import { Ionicons } from "@expo/vector-icons";
import { Colors } from "../../constants/Colors";
import { defaulStyles } from "../../constants/Styles";
import Animated, { SlideInDown } from "react-native-reanimated";
import { useAuth } from "../context/contextLogin";

const Page = () => {
    const { id } = useLocalSearchParams();
    const listing = listingsData.find((item) => item.id === id);
    const router = useRouter();
    const navigation = useNavigation();
    const { user } = useAuth();

    const [activeIndex, setActiveIndex] = useState(0);
    const [modalVisible, setModalVisible] = useState(false);
    const [modalImageIndex, setModalImageIndex] = useState(0);

    const images = [listing.featuredImage, ...listing.galleryImgs];

    const shareList = async () => {
        try {
            await Share.share({
                title: listing.title,
                url: listing.listing_url,
            });
        } catch (error) {
            console.log(error);
        }
    };

    const handleReservation = () => {
        if (user) {
            router.push({
                pathname: "(modals)/pay",
                params: { id: listing.id },
            });
        } else {
            router.push("/login");
        }
    };

    useLayoutEffect(() => {
        navigation.setOptions({
            headerBackground: () => <Animated.View style={[styles.header]} />,
            headerRight: () => (
                <View style={styles.bar}>
                    <TouchableOpacity
                        style={styles.roundeButton}
                        onPress={shareList}
                    >
                        <Ionicons
                            name="share-outline"
                            size={22}
                            color={"#000"}
                        />
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={styles.roundeButton}
                        onPress={shareList}
                    >
                        <Ionicons
                            name="heart-outline"
                            size={22}
                            color={"#000"}
                        />
                    </TouchableOpacity>
                </View>
            ),
            headerLeft: () => (
                <TouchableOpacity
                    style={styles.roundeButton}
                    onPress={() => navigation.goBack()}
                >
                    <Ionicons name="chevron-back" size={24} color={"#000"} />
                </TouchableOpacity>
            ),
        });
    }, []);

    if (!listing) {
        return (
            <View style={styles.container}>
                <Text>Listing not found</Text>
            </View>
        );
    }

    const handleScroll = (event) => {
        const contentOffsetX = event.nativeEvent.contentOffset.x;
        const index = Math.floor(contentOffsetX / 300); // Largeur de chaque image
        setActiveIndex(index);
    };

    const openImageModal = (index) => {
        setModalImageIndex(index);
        setModalVisible(true);
    };

    const closeImageModal = () => {
        setModalVisible(false);
    };

    const handleImageChange = (index) => {
        setModalImageIndex(index);
    };

    return (
        <View style={styles.container}>
            {/* Carousel/Slider */}
            <View style={styles.carouselContainer}>
                <FlatList
                    data={images}
                    horizontal
                    pagingEnabled
                    showsHorizontalScrollIndicator={false}
                    onScroll={handleScroll}
                    keyExtractor={(img, index) => `${listing.id}-${index}`}
                    renderItem={({ item: imageUri, index }) => (
                        <TouchableOpacity onPress={() => openImageModal(index)}>
                            <Image
                                source={{ uri: imageUri }}
                                style={styles.sliderImage}
                            />
                        </TouchableOpacity>
                    )}
                />
                {/* Indicateur de pagination */}
                <View style={styles.paginationContainer}>
                    <Text style={styles.paginationText}>
                        {activeIndex + 1} / {images.length}
                    </Text>
                </View>
            </View>
            {/* Modal pour afficher l'image en plein écran */}

            <Modal
                visible={modalVisible}
                animationType="fade"
                transparent={true}
                onRequestClose={closeImageModal}
            >
                <View style={styles.modalContainer}>
                    <ScrollView
                        horizontal
                        pagingEnabled
                        onMomentumScrollEnd={(e) => {
                            const contentOffsetX =
                                e.nativeEvent.contentOffset.x;
                            const index = Math.floor(contentOffsetX / 360);
                            handleImageChange(index);
                        }}
                    >
                        {images.map((imageUri, index) => (
                            <Image
                                key={index}
                                source={{ uri: imageUri }}
                                style={styles.modalImage}
                            />
                        ))}
                    </ScrollView>
                    <TouchableOpacity
                        style={styles.closeButton}
                        onPress={closeImageModal}
                    >
                        <Ionicons name="close" size={30} color="#fff" />
                    </TouchableOpacity>
                </View>
            </Modal>

            <View style={styles.infoContainer}>
                <Text style={styles.name}>{listing.title}</Text>
                <Text style={styles.location}>
                    {listing.room_type} in {listing.smart_location}
                </Text>
                <Text style={styles.rooms}>
                    {listing.maxGuests} voyageurs. {listing.bedrooms} chambres.
                    {listing.bed} lits. {listing.bathrooms} salles de bains
                </Text>
                <View style={{ flexDirection: "row", gap: 4 }}>
                    <Ionicons name="star" size={16} />
                    <Text style={styles.ratings}>
                        {listing.rating}.{listing.reviewStart} reviews
                    </Text>
                </View>
                <View style={styles.divider} />

                <View style={styles.hostView}>
                    <Image
                        source={{ uri: listing.featuredImage }}
                        style={styles.host}
                    />
                    <View>
                        <Text style={{ fontWeight: "500", fontSize: 16 }}>
                            Hôte: {listing.host_name}
                        </Text>
                        <Text>{listing.host_since}</Text>
                    </View>
                </View>
                <View style={styles.divider} />
                <Text style={styles.description}>{listing.description}</Text>
            </View>
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
                    <TouchableOpacity style={styles.footerText}>
                        <Text style={styles.footerPrice}>${listing.price}</Text>
                        <Text>night</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={[defaulStyles.btn, { paddingHorizontal: 20 }]}
                        onPress={handleReservation}
                    >
                        <Text style={defaulStyles.btnText}>Réserver</Text>
                    </TouchableOpacity>
                </View>
            </Animated.View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
    },
    carouselContainer: {
        marginBottom: 20,
    },
    sliderImage: {
        width: 360,
        height: 250,
        resizeMode: "cover",
    },
    paginationContainer: {
        position: "absolute",
        bottom: 10,
        right: 10,
        backgroundColor: "rgba(0, 0, 0, 0.5)",
        borderRadius: 12,
        paddingHorizontal: 8,
        paddingVertical: 4,
    },
    paginationText: {
        color: "#fff",
        fontSize: 16,
        fontWeight: "bold",
    },
    modalContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "rgba(0, 0, 0, 0.8)",
    },
    modalImage: {
        width: 360,
        height: 600,
        resizeMode: "contain",
    },
    closeButton: {
        position: "absolute",
        top: 40,
        right: 20,
        zIndex: 100,
    },
    infoContainer: {
        // padding: 24,
        paddingHorizontal: 24,
        backgroundColor: "#fff",
    },
    name: {
        fontSize: 26,
        fontWeight: "bold",
        fontFamily: "mon-sb",
    },
    location: {
        fontSize: 18,
        fontFamily: "mon-sb",
        marginTop: 10,
    },
    rooms: {
        fontSize: 16,
        color: Colors.gray,
        marginVertical: 4,
        fontFamily: "mon",
    },
    ratings: {
        fontSize: 16,
        fontFamily: "mon-sb",
    },
    divider: {
        height: StyleSheet.hairlineWidth,
        backgroundColor: Colors.gray,
        marginVertical: 6,
    },
    host: {
        width: 50,
        height: 50,
        borderRadius: 50,
        backgroundColor: Colors.gray,
    },
    hostView: {
        flexDirection: "row",
        alignItems: "center",
        gap: 12,
    },
    description: {
        fontSize: 16,
        marginTop: 10,
        fontFamily: "mon",
    },
    footerText: {
        height: "100%",
        justifyContent: "center",
        flexDirection: "row",
        alignItems: "center",
        gap: 4,
    },
    footerPrice: {
        fontSize: 18,
        fontFamily: "mon-sb",
    },
    bar: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        gap: 10,
    },
    roundeButton: {
        width: 40,
        height: 40,
        borderRadius: 50,
        backgroundColor: "#fff",
        alignItems: "center",
        justifyContent: "center",
        color: Colors.primary,
        borderWidth: StyleSheet.hairlineWidth,
        borderColor: Colors.gray,
    },
});

export default Page;
