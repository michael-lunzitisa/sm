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

// const Listings = ({ listings, category }) => {
//     const [loading, setLoading] = useState(false);

//     useEffect(() => {
//         // console.log("RELOAD LISTINGS", "CATEGORY", category);
//         setLoading(true);

//         setTimeout(() => {
//             setLoading(false);
//         }, 200);
//     }, [category]);

//     const renderItems = ({ item }) => {
//         return (
//             <Link href={`/listing/${item.id}`} asChild>
//                 <TouchableOpacity>
//                     <View style={styles.listing}>
//                         <Image
//                             source={{ uri: item.image }}
//                             style={styles.image}
//                         />
//                         <TouchableOpacity
//                             style={{ position: "absolute", right: 30, top: 30 }}
//                         >
//                             <Ionicons
//                                 name="heart-outline"
//                                 size={24}
//                                 color={"#000"}
//                             />
//                         </TouchableOpacity>
//                         <View
//                             style={{
//                                 flexDirection: "row",
//                                 justifyContent: "space-between",
//                             }}
//                         >
//                             <Text
//                                 style={{ fontStyle: 16, fontFamily: "mon-sb" }}
//                             >
//                                 {item.name}
//                             </Text>
//                             <View style={{ flexDirection: "row", gap: 4 }}>
//                                 <Ionicons
//                                     name="star-sharp"
//                                     size={16}
//                                     color="black"
//                                 />
//                                 <Text style={{ fontFamily: "mon-sb" }}>
//                                     {item.rating}
//                                 </Text>
//                             </View>
//                         </View>
//                         <Text style={{ fontFamily: "mon" }}>
//                             {item.room_type}
//                         </Text>

//                         <View style={{ flexDirection: "row", gap: 4 }}>
//                             <Ionicons
//                                 name="star-sharp"
//                                 size={16}
//                                 color="black"
//                             />
//                             <Text style={{ fontFamily: "mon-sb" }}>
//                                 ${item.price}
//                             </Text>
//                             <Text style={{ fontFamily: "mon" }}>night </Text>
//                         </View>
//                     </View>
//                 </TouchableOpacity>
//             </Link>
//         );
//     };

//     return (
//         <View style={defaulStyles.container}>
//             <FlatList
//                 data={loading ? [] : listings}
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

const Listings = ({ listings, category }) => {
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const timer = setTimeout(() => {
            setLoading(true);
        }, 2000);
        return () => clearTimeout(timer); // Clean up timeout on component unmount
    }, [category]);

    const renderItems = ({ item }) => (
        <Link href={`/listing/${item.id}`} asChild>
            <TouchableOpacity>
                <View style={styles.listing}>
                    <Image source={{ uri: item.image }} style={styles.image} />
                    <TouchableOpacity
                        style={{ position: "absolute", right: 30, top: 30 }}
                    >
                        <Ionicons
                            name="heart-outline"
                            size={24}
                            color={"#000"}
                        />
                    </TouchableOpacity>
                    <View
                        style={{
                            flexDirection: "row",
                            justifyContent: "space-between",
                        }}
                    >
                        <Text style={{ fontSize: 16, fontFamily: "mon-sb" }}>
                            {item.name}
                        </Text>
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
                            ${item.price}
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
});

export default Listings;
