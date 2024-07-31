import {
    View,
    FlatList,
    Text,
    StyleSheet,
    TouchableOpacity,
    Image,
} from "react-native";
import React, { useEffect, useRef, useState } from "react";
import { Link } from "expo-router";

const Listings = ({ listings: items, category }) => {
    const [loading, setLoading] = useState(false);
    const listRef = useRef(null);

    useEffect(() => {
        console.log("RELOAD LISTINGS", items, "CATEGORY", category);
        setLoading(true);

        setTimeout(() => {
            setLoading(false);
        }, 200);
    }, [category, items]);

    const renderRow = ({ item }) => (
        <Link href={`/listing/${item.id}`} asChild>
            <TouchableOpacity>
                <View style={styles.listings}>
                    {item.images && (
                        <Image
                            source={{ uri: item.images[0] }}
                            style={styles.image}
                        />
                    )}
                    <Text>{item.title}</Text>
                    <Text>{item.description}</Text>
                    <Text>${item.price_per_night} per night</Text>
                    <View></View>
                </View>
            </TouchableOpacity>
        </Link>
    );

    return (
        <View>
            <FlatList
                data={loading ? [] : items}
                renderItem={renderRow}
                keyExtractor={(item) => item.id.toString()}
                ref={listRef}
            />
        </View>
    );
};
const styles = StyleSheet.create({
    listings: {
        padding: 16,
    },
});
export default Listings;
