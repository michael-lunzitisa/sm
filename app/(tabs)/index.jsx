import { View } from "react-native";
import { Stack } from "expo-router";
import ExploreHeader from "@/components/ExploreHeader";
import Listings from "@/components/Listings";
import listingsData from "@/assets/data/listings.json";
import { useState } from "react";

const Page = () => {
    const [category, setCategory] = useState("Maison");

    const onDataChanged = (category) => {
        setCategory(category);
        console.log("CHANG", category);
    };

    // Filtrage des données en fonction de la catégorie sélectionnée
    const dataFilter = listingsData?.filter(
        (item) => item.categories === category
    );

    return (
        <View style={{ flex: 1 }}>
            <Stack.Screen
                options={{
                    header: () => (
                        <ExploreHeader onCategoryChanged={onDataChanged} />
                    ),
                }}
            />
            <Listings listings={listingsData} category={category} />
            {/* <ListingsMap listings={listingsDataGeo} /> */}
        </View>
    );
};

export default Page;
