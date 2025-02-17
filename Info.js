import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F2F2F2',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 15,
        color: '#333',
    },
    dataText: {
        fontSize: 18,
        color: '#555',
        marginVertical: 5,
    },
    diffText: {
        fontSize: 18,
        fontWeight: 'bold',
        color: 'blue',
        marginTop: 20,
    },
    card: {
        backgroundColor: '#fff',
        borderRadius: 15,
        padding: 20,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.15,
        shadowRadius: 5,
        elevation: 5,
        width: '90%',
        alignItems: 'center',
    },
});

const Info = ({ route }) => {

    const { DataSeries, data2020, data2021 } = route.params;

    const difference = parseFloat(data2021) - parseFloat(data2020);
    const formattedDifference = difference > 0 ? `+${difference.toFixed(2)}` : difference.toFixed(2); // Add "+" if positive

    return (
        <View style={styles.container}>
            <View style={styles.card}>
                <Text style={styles.title}>{DataSeries}</Text>
                <Text style={styles.dataText}>2020: {data2020}</Text>
                <Text style={styles.dataText}>2021: {data2021}</Text>
                <Text style={styles.diffText}>Difference: {formattedDifference}</Text>
            </View>
        </View>
    );
};

export default Info;
