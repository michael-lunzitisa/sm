// import { View } from "react-native";
// import { Stack } from "expo-router";
// import ExploreHeader from "@/components/ExploreHeader";
// import Listings from "@/components/Listings";
// import listingsData from "@/assets/data/listings.json";
// import { useState } from "react";

// const Page = () => {
//     const [category, setCategory] = useState("Maison");

//     const onDataChanged = (newCategory) => {
//         setCategory(newCategory);
//         // console.log("Category Changed:", newCategory);
//     };

//     const filteredData = listingsData?.filter(
//         (item) => item.categories?.toLowerCase() === category.toLowerCase()
//     );

//     // console.log("Filtered Data:", filteredData);

//     return (
//         <View style={{ flex: 1 }}>
//             <Stack.Screen
//                 options={{
//                     header: () => (
//                         <ExploreHeader onCategoryChanged={onDataChanged} />
//                     ),
//                 }}
//             />
//             {filteredData.length > 0 ? (
//                 <Listings listings={filteredData} category={category} />
//             ) : (
//                 <View>
//                     <Text>Aucune donnée trouvée pour cette catégorie</Text>
//                 </View>
//             )}
//         </View>
//     );
// };

import { View, Text, StyleSheet, ActivityIndicator } from "react-native";
import { Stack } from "expo-router";
import ExploreHeader from "@/components/ExploreHeader";
import Listings from "@/components/Listings";
import listingsData from "@/assets/data/listings.json";
import { useState, useMemo, useEffect } from "react";

const Page = () => {
    const [category, setCategory] = useState("Maison");
    const [loading, setLoading] = useState(true);

    const onDataChanged = (newCategory) => {
        setCategory(newCategory);
    };

    useEffect(() => {
        setLoading(true);
        const timeout = setTimeout(() => {
            setLoading(false);
        }, 1000);
        return () => clearTimeout(timeout);
    }, [category]);

    const filteredData = useMemo(() => {
        return listingsData?.filter(
            (item) => item.categories?.toLowerCase() === category.toLowerCase()
        );
    }, [category]);

    return (
        <View style={styles.container}>
            <Stack.Screen
                options={{
                    header: () => (
                        <ExploreHeader onCategoryChanged={onDataChanged} />
                    ),
                }}
            />

            {loading ? (
                <View style={styles.loaderContainer}>
                    <ActivityIndicator size="large" color="#f76705" />
                </View>
            ) : filteredData && filteredData.length > 0 ? (
                <Listings listings={filteredData} category={category} />
            ) : (
                <View style={styles.emptyContainer}>
                    <Text style={styles.emptyText}>
                        Aucune donnée trouvée pour cette catégorie.
                    </Text>
                </View>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    loaderContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    emptyContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    emptyText: {
        fontSize: 16,
        color: "#555",
    },
});

export default Page;
