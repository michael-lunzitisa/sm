import { View } from "react-native";
// import React, { useMemo, useState } from "react";
import { Stack } from "expo-router";

import ExploreHeader from "@/components/ExploreHeader";
import Listings from "@/components/Listings";
import listingsData from "@/assets/data/listings.json";
import { useState } from "react";

const Page = () => {
    const [category, setCategory] = useState("Maison");
    // const items = useMemo(() => listingsData, []);
    const onDataChanged = (category) => {
        setCategory(category);
        console.log("CHANG", category);
    };
    return (
        <View style={{ flex: -1 }}>
            <Stack.Screen
                options={{
                    header: () => (
                        <ExploreHeader onCategoryChanged={onDataChanged} />
                    ),
                }}
            />
            <Listings listings={listingsData} category={category} />
            {/* <Link href={"/(modals)/login"}>Login</Link> */}
        </View>
    );
};

export default Page;
