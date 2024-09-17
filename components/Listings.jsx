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

// const Listings = ({ listings, category }) => {
//     const [loading, setLoading] = useState(false);
//     const [favorites, setFavorites] = useState("");

//     useEffect(() => {
//         const timer = setTimeout(() => {
//             setLoading(true);
//         }, 2000);
//         return () => clearTimeout(timer);
//     }, [category]);

//     useEffect(() => {}, [favorites]);

//     const toggleFavorite = (id) => {
//         setFavorites((prevFavorites) => ({
//             ...prevFavorites,
//             [id]: !prevFavorites[id],
//         }));
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
//                         onPress={() => toggleFavorite(item.id)}
//                     >
//                         <Ionicons
//                             name={
//                                 favorites[item.id] ? "heart" : "heart-outline"
//                             }
//                             size={24}
//                             color={
//                                 favorites[item.id] ? "Colors.primary" : "#000"
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
//                     <Text style={{ fontFamily: "mon" }}>{item.room_type}</Text>

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
//         marginVertical: 16,
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
import {
    View,
    FlatList,
    Text,
    Image,
    StyleSheet,
    TouchableOpacity,
} from "react-native";
import React, { useEffect, useState } from "react";
import { Link } from "expo-router";
import { defaulStyles } from "@/constants/Styles";
import { Ionicons } from "@expo/vector-icons";
import { Colors } from "@/constants/Colors";
import { useAuth } from "../app/context/contextLogin";
const Listings = ({ listings, category }) => {
    const [loading, setLoading] = useState(false);

    const { favorites, addFavorite, removeFavorite } = useAuth();

    useEffect(() => {
        const timer = setTimeout(() => {
            setLoading(true);
        }, 2000);
        return () => clearTimeout(timer);
    }, [category]);

    const toggleFavorite = (item) => {
        if (favorites[item.id]) {
            removeFavorite(item.id);
        } else {
            addFavorite(item);
        }
    };

    const renderItems = ({ item }) => (
        <Link href={`/listing/${item.id}`} asChild>
            <TouchableOpacity>
                <View style={styles.listing}>
                    <Image
                        source={{ uri: item.featuredImage }}
                        style={styles.image}
                    />
                    <TouchableOpacity
                        style={{ position: "absolute", right: 30, top: 30 }}
                        onPress={() => toggleFavorite(item)}
                    >
                        <Ionicons
                            name={
                                favorites[item.id] ? "heart" : "heart-outline"
                            }
                            size={24}
                            color={favorites[item.id] ? Colors.primary : "#000"}
                            style={styles.roundeButton}
                        />
                    </TouchableOpacity>
                    <View
                        style={{
                            flexDirection: "row",
                            justifyContent: "space-between",
                        }}
                    >
                        <View style={{ flexDirection: "column" }}>
                            <Text
                                style={{ fontSize: 16, fontFamily: "mon-sb" }}
                            >
                                {item.title}
                            </Text>

                            <Text style={{ fontSize: 16, fontFamily: "mon" }}>
                                {item.titles}
                            </Text>
                        </View>
                        <View style={{ flexDirection: "row", gap: 4 }}>
                            <Ionicons
                                name="star-sharp"
                                size={16}
                                color="black"
                            />
                            <Text style={{ fontFamily: "mon-sb" }}>
                                {item.rating}
                            </Text>
                        </View>
                    </View>
                    <Text style={{ fontFamily: "mon" }}>{item.room_type}</Text>

                    <View style={{ flexDirection: "row", gap: 4 }}>
                        <Ionicons name="star-sharp" size={16} color="black" />
                        <Text style={{ fontFamily: "mon-sb" }}>
                            {item.price}
                        </Text>
                        <Text style={{ fontFamily: "mon" }}>night </Text>
                    </View>
                </View>
            </TouchableOpacity>
        </Link>
    );

    return (
        <View style={defaulStyles.container}>
            <FlatList
                data={loading ? listings : []}
                renderItem={renderItems}
                keyExtractor={(item) => item.id.toString()}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    listing: {
        padding: 16,
        gap: 10,
        marginVertical: 16,
    },
    image: {
        width: "100%",
        height: 200,
        borderRadius: 10,
    },
    roundeButton: {
        width: 29,
        height: 30,
        borderRadius: 50,
        backgroundColor: "#fff",
        alignItems: "center",
        justifyContent: "center",
        color: Colors.primary,
        borderWidth: StyleSheet.hairlineWidth,
        borderColor: Colors.gray,
        padding: 3,
    },
});

export default Listings;
