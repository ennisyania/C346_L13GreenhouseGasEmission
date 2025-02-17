import React, { useState, useEffect } from "react";
import { StatusBar, Button, FlatList, StyleSheet, Text, View, TextInput, TouchableOpacity } from "react-native";
import { Audio } from 'expo-av';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#F2F2F2",
        padding: 10,
    },
    searchContainer: {
        flexDirection: "row",
        alignItems: "center",
        marginBottom: 15,
        backgroundColor: "#fff",
        borderRadius: 30,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
        paddingHorizontal: 15,
        paddingVertical: 5,
    },
    textInput: {
        flex: 1,
        height: 40,
        borderColor: "#ccc",
        borderWidth: 1,
        borderRadius: 25,
        paddingLeft: 10,
        fontSize: 16,
        backgroundColor: "#fff",
    },
    listStyle: {
        backgroundColor: "#fff",
        borderRadius: 10,
        padding: 15,
        marginVertical: 8,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.15,
        shadowRadius: 5,
        elevation: 5,
    },
    titleText: {
        fontWeight: "bold",
        fontSize: 18,
        color: "#333",
    },
    subtitleText: {
        fontSize: 14,
        color: "#777",
    },
    itemContainer: {
        borderBottomWidth: 1,
        borderBottomColor: "#E0E0E0",
        paddingBottom: 10,
        marginBottom: 10,
    },
});

const Home = ({ navigation }) => {
    const [myData, setMyData] = useState([]);
    const [filteredData, setFilteredData] = useState([]);
    const [searchText, setSearchText] = useState("");
    const [clickSound, setClickSound] = useState();

    async function playSound() {
        const soundfile = require('./mixkit-modern-technology-select-3124.wav');
        const { sound } = await Audio.Sound.createAsync(soundfile);
        setClickSound(sound);
        await sound.playAsync();
    }

    useEffect(() => {
        return clickSound ? () => {
                console.log('Unloading Sound');
                clickSound.unloadAsync();
            }
            : undefined;
    }, [clickSound]);

    useEffect(() => {
        const datasetId = "d_1b8dcef6bf32ece26deca60e59d99f71";
        const url = `https://data.gov.sg/api/action/datastore_search?resource_id=${datasetId}`;

        fetch(url)
            .then(response => {
                if (!response.ok) {
                    throw new Error("Failed to fetch data");
                }
                return response.json();
            })
            .then(data => {
                console.log("Fetched Data:", data);
                if (data.success && data.result.records) {
                    setMyData(data.result.records);
                }
            })
            .catch(error => {
                console.error("Error fetching data:", error);
            });
    }, []);

    useEffect(() => {
        const newData = myData.filter(item =>
            item.DataSeries.toLowerCase().includes(searchText.toLowerCase())
        );
        setFilteredData(newData);
    }, [searchText, myData]);

    const renderItem = ({ item }) => (
        <TouchableOpacity
            onPress={() => {
                playSound();
                navigation.navigate("Info", {
                    DataSeries: item.DataSeries,
                    data2020: item["2020"],
                    data2021: item["2021"]
                });
            }}
        >
            <View style={styles.listStyle}>
                <Text style={styles.titleText}>{item.DataSeries}</Text>
            </View>
        </TouchableOpacity>
    );

    return (
        <View style={styles.container}>
            <StatusBar />

            {/* Search Input */}
            <View style={styles.searchContainer}>
                <TextInput
                    style={styles.textInput}
                    placeholder="Search..."
                    value={searchText}
                    onChangeText={setSearchText}
                />
            </View>

            {/*Filtered Data List*/}
            <FlatList
                data={filteredData}
                renderItem={renderItem}
                keyExtractor={(item) => item._id.toString()}
            />
        </View>
    );
};

export default Home;
