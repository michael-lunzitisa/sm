import {
    View,
    FlatList,
    Text,
    Image,
    StyleSheet,
    TouchableOpacity,
    Dimensions,
} from "react-native";
import React, { useEffect, useState } from "react";
import { Link } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { Colors } from "@/constants/Colors";
import { useAuth } from "../app/context/contextLogin";

const { width } = Dimensions.get("window");

const Listings = ({ listings, category }) => {
    const [loading, setLoading] = useState(false);
    const { favorites, addFavorite, removeFavorite } = useAuth();
    const [localFavorites, setLocalFavorites] = useState(favorites);
    const [activeIndex, setActiveIndex] = useState(0);

    useEffect(() => {
        const timer = setTimeout(() => {
            setLoading(true);
        }, 2000);
        return () => clearTimeout(timer);
    }, [category]);

    const toggleFavorite = (item) => {
        if (localFavorites[item.id]) {
            removeFavorite(item.id);
            setLocalFavorites((prev) => ({ ...prev, [item.id]: false }));
        } else {
            addFavorite(item);
            setLocalFavorites((prev) => ({ ...prev, [item.id]: true }));
        }
    };

    const handleScroll = (event) => {
        const contentOffsetX = event.nativeEvent.contentOffset.x;
        const index = Math.floor(contentOffsetX / width);
        setActiveIndex(index);
    };

    const renderCarousel = ({ item }) => {
        // Créer une liste d'images avec featuredImage en premier
        const images = [item.featuredImage, ...item.galleryImgs];

        return (
            <View style={styles.carouselContainer}>
                <FlatList
                    data={images}
                    horizontal
                    pagingEnabled
                    showsHorizontalScrollIndicator={false}
                    onScroll={handleScroll}
                    keyExtractor={(img, index) => `${item.id}-${index}`}
                    renderItem={({ item: imageUri }) => (
                        <Image
                            source={{ uri: imageUri }}
                            style={styles.sliderImage}
                        />
                    )}
                />
                <View style={styles.dotContainer}>
                    {images.map((_, index) => (
                        <View
                            key={index}
                            style={[
                                styles.dot,
                                activeIndex === index ? styles.activeDot : null,
                            ]}
                        />
                    ))}
                </View>
            </View>
        );
    };

    const renderItems = ({ item }) => (
        <Link href={`/listing/${item.id}`} asChild>
            <TouchableOpacity>
                <View style={styles.listing}>
                    {renderCarousel({ item })}
                    <TouchableOpacity
                        style={styles.favoriteButton}
                        onPress={() => toggleFavorite(item)}
                    >
                        <Ionicons
                            name={
                                localFavorites[item.id]
                                    ? "heart"
                                    : "heart-outline"
                            }
                            size={24}
                            color={
                                localFavorites[item.id]
                                    ? Colors.primary
                                    : "#000"
                            }
                        />
                    </TouchableOpacity>
                    <View style={styles.details}>
                        <View
                            style={{
                                flexDirection: "row",
                                justifyContent: "space-between",
                            }}
                        >
                            <Text style={styles.title}>{item.title}</Text>
                            {/* <Ionicons
                                name="star-sharp"
                                size={16}
                                color="black"
                            /> */}
                            <Text style={styles.ratingText}>{item.rating}</Text>
                        </View>
                        <Text>{item.titles}</Text>
                        <View style={styles.ratingContainer}></View>
                        <Text style={styles.price}>
                            {item.price}
                            <Text style={styles.nightText}>/ night</Text>
                        </Text>
                    </View>
                </View>
            </TouchableOpacity>
        </Link>
    );

    return (
        <View style={styles.container}>
            <FlatList
                data={loading ? listings : []}
                renderItem={renderItems}
                keyExtractor={(item) => item.id.toString()}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#f8f8f8",
    },
    listing: {
        padding: 16,
        marginVertical: 8,
        backgroundColor: "#fff",
        borderRadius: 10,
        overflow: "hidden",
    },
    carouselContainer: {
        width: "100%",
        height: 250,
        overflow: "hidden",
        borderRadius: 10,
    },
    sliderImage: {
        width: width - 32,
        height: 250,
        borderRadius: 10,
        resizeMode: "cover",
    },
    dotContainer: {
        position: "absolute",
        bottom: 10,
        left: 0,
        right: 0,
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
    },
    dot: {
        width: 8,
        height: 8,
        borderRadius: 4,
        backgroundColor: "#ccc",
        marginHorizontal: 4,
    },
    activeDot: {
        backgroundColor: Colors.primary,
    },
    favoriteButton: {
        position: "absolute",
        right: 20,
        top: 20,
        backgroundColor: "#fff",
        borderRadius: 50,
        padding: 5,
        alignItems: "center",
        justifyContent: "center",
        shadowColor: "#000",
        shadowOpacity: 0.1,
        shadowRadius: 4,
    },
    details: {
        marginTop: 10,
    },
    title: {
        fontSize: 16,
        fontWeight: "bold",
    },
    ratingContainer: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        marginTop: 4,
    },
    ratingText: {
        marginLeft: 4,
        fontSize: 14,
        fontWeight: "600",
    },
    price: {
        fontSize: 16,
        fontWeight: "600",
        color: Colors.primary,
    },
    nightText: {
        fontSize: 14,
        fontWeight: "400",
        color: "#888",
    },
});

export default Listings;

// import {
//     View,
//     FlatList,
//     Text,
//     Image,
//     StyleSheet,
//     TouchableOpacity,
// } from "react-native";
// import React, { useEffect, useState } from "react";
// import { Link } from "expo-router";
// import { defaulStyles } from "@/constants/Styles";
// import { Ionicons } from "@expo/vector-icons";
// import { Colors } from "@/constants/Colors";
// import { useAuth } from "../app/context/contextLogin";

// const Listings = ({ listings, category }) => {
//     const [loading, setLoading] = useState(false);
//     const { favorites, addFavorite, removeFavorite } = useAuth();

//     const [localFavorites, setLocalFavorites] = useState(favorites);

//     useEffect(() => {
//         const timer = setTimeout(() => {
//             setLoading(true);
//         }, 2000);
//         return () => clearTimeout(timer);
//     }, [category]);

//     const toggleFavorite = (item) => {
//         if (localFavorites[item.id]) {
//             removeFavorite(item.id);
//             setLocalFavorites((prev) => ({ ...prev, [item.id]: false }));
//         } else {
//             addFavorite(item);
//             setLocalFavorites((prev) => ({ ...prev, [item.id]: true }));
//         }
//     };

//     const renderItems = ({ item }) => (
//         <Link href={`/listing/${item.id}`} asChild>
//             <TouchableOpacity>
//                 <View style={styles.listing}>
//                     <Image
//                         source={{ uri: item.featuredImage }}
//                         style={styles.image}
//                     />
//                     <TouchableOpacity
//                         style={{ position: "absolute", right: 30, top: 30 }}
//                         onPress={() => toggleFavorite(item)}
//                     >
//                         <Ionicons
//                             name={
//                                 localFavorites[item.id]
//                                     ? "heart"
//                                     : "heart-outline"
//                             }
//                             size={24}
//                             color={
//                                 localFavorites[item.id]
//                                     ? Colors.primary
//                                     : "#000"
//                             }
//                             style={styles.roundeButton}
//                         />
//                     </TouchableOpacity>
//                     <View
//                         style={{
//                             flexDirection: "row",
//                             justifyContent: "space-between",
//                         }}
//                     >
//                         <View style={{ flexDirection: "column" }}>
//                             <Text
//                                 style={{ fontSize: 16, fontFamily: "mon-sb" }}
//                             >
//                                 {item.title}
//                             </Text>

//                             <Text style={{ fontSize: 16, fontFamily: "mon" }}>
//                                 {item.titles}
//                             </Text>
//                         </View>
//                         <View style={{ flexDirection: "row", gap: 4 }}>
//                             <Ionicons
//                                 name="star-sharp"
//                                 size={16}
//                                 color="black"
//                             />
//                             <Text style={{ fontFamily: "mon-sb" }}>
//                                 {item.rating}
//                             </Text>
//                         </View>
//                     </View>

//                     <View style={{ flexDirection: "row", gap: 4 }}>
//                         <Ionicons name="star-sharp" size={16} color="black" />
//                         <Text style={{ fontFamily: "mon-sb" }}>
//                             {item.price}
//                         </Text>
//                         <Text style={{ fontFamily: "mon" }}>night </Text>
//                     </View>
//                 </View>
//             </TouchableOpacity>
//         </Link>
//     );

//     return (
//         <View style={defaulStyles.container}>
//             <FlatList
//                 data={loading ? listings : []}
//                 renderItem={renderItems}
//                 keyExtractor={(item) => item.id.toString()}
//             />
//         </View>
//     );
// };

// const styles = StyleSheet.create({
//     listing: {
//         padding: 16,
//         gap: 10,
//         marginVertical: 0,
//     },
//     image: {
//         width: "100%",
//         height: 200,
//         borderRadius: 10,
//     },
//     roundeButton: {
//         width: 29,
//         height: 30,
//         borderRadius: 50,
//         backgroundColor: "#fff",
//         alignItems: "center",
//         justifyContent: "center",
//         color: Colors.primary,
//         borderWidth: StyleSheet.hairlineWidth,
//         borderColor: Colors.gray,
//         padding: 3,
//     },
// });

// export default Listings;
