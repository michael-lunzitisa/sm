// import React from "react";
// import {
//     View,
//     Text,
//     FlatList,
//     TouchableOpacity,
//     Image,
//     StyleSheet,
// } from "react-native";
// import { useAuth } from "../context/contextLogin";
// import { Ionicons } from "@expo/vector-icons";
// import { Link } from "expo-router";

// const Whishlists = () => {
//     const { favorites, removeFavorite } = useAuth();

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
//                         onPress={() => removeFavorite(item)}
//                     >
//                         <Ionicons
//                             name="heart"
//                             size={24}
//                             color="red"
//                             style={styles.roundeButton}
//                         />
//                     </TouchableOpacity>
//                     <Text style={{ fontSize: 16, fontFamily: "mon-sb" }}>
//                         {item.title}
//                     </Text>
//                 </View>
//             </TouchableOpacity>
//         </Link>
//     );

//     return (
//         <View>
//             {favorites.length > 0 ? (
//                 <FlatList
//                     data={favorites}
//                     renderItem={renderItems}
//                     keyExtractor={(item) => item.id.toString()}
//                 />
//             ) : (
//                 <Text>Aucun élément dans votre liste de favorites</Text>
//             )}
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
//         padding: 3,
//     },
// });

// export default Whishlists;
import React from "react";
import {
    View,
    Text,
    FlatList,
    TouchableOpacity,
    Image,
    StyleSheet,
} from "react-native";
import { useAuth } from "../context/contextLogin";
import { Ionicons } from "@expo/vector-icons";
import { Link } from "expo-router";

const Whishlists = () => {
    const { favorites, removeFavorite } = useAuth();

    const renderItems = ({ item }) => (
        <Link href={`/listing/${item.id}`} asChild>
            <TouchableOpacity>
                <View style={styles.listing}>
                    <Image
                        source={{ uri: item.featuredImage }}
                        style={styles.image}
                    />
                    <TouchableOpacity
                        style={styles.favoriteButton}
                        onPress={() => removeFavorite(item)}
                    >
                        <Ionicons name="heart" size={24} color="#f76705" />
                    </TouchableOpacity>
                    <Text style={styles.title}>{item.title}</Text>
                </View>
            </TouchableOpacity>
        </Link>
    );

    return (
        <View style={styles.container}>
            {favorites.length > 0 ? (
                <FlatList
                    data={favorites}
                    renderItem={renderItems}
                    keyExtractor={(item) => item.id.toString()}
                    contentContainerStyle={styles.listContainer}
                />
            ) : (
                <Text style={styles.emptyMessage}>
                    Aucun élément dans votre liste de favorites
                </Text>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
        backgroundColor: "#f9f9f9",
    },
    listContainer: {
        paddingBottom: 16,
    },
    listing: {
        backgroundColor: "#fff",
        borderRadius: 10,

        marginVertical: 8,
        shadowColor: "#000",

        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 2, // Pour Android
    },
    image: {
        width: "100%",
        height: 200,
        borderRadius: 10,
        marginBottom: 10,
    },
    favoriteButton: {
        position: "absolute",
        right: 16,
        top: 16,
        backgroundColor: "#fff",
        borderRadius: 50,
        padding: 6,
        elevation: 3,
    },
    title: {
        fontSize: 16,
        fontFamily: "mon-sb",
        color: "#333",
        paddingLeft: 5,
    },
    emptyMessage: {
        textAlign: "center",
        fontSize: 18,
        marginTop: 20,
        color: "#888",
    },
});

export default Whishlists;
