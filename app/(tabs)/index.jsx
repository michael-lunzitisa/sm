import { View } from "react-native";
import { Stack } from "expo-router";
import ExploreHeader from "@/components/ExploreHeader";
import Listings from "@/components/Listings";
import listingsData from "@/assets/data/listings.json";
import { useState } from "react";

const Page = () => {
    const [category, setCategory] = useState("Maison");

    const onDataChanged = (newCategory) => {
        setCategory(newCategory);
        // console.log("Category Changed:", newCategory);
    };

    const filteredData = listingsData?.filter(
        (item) => item.categories?.toLowerCase() === category.toLowerCase()
    );

    // console.log("Filtered Data:", filteredData);

    return (
        <View style={{ flex: 1 }}>
            <Stack.Screen
                options={{
                    header: () => (
                        <ExploreHeader onCategoryChanged={onDataChanged} />
                    ),
                }}
            />
            {filteredData.length > 0 ? (
                <Listings listings={filteredData} category={category} />
            ) : (
                <View>
                    <Text>Aucune donnée trouvée pour cette catégorie</Text>
                </View>
            )}
        </View>
    );
};

export default Page;
