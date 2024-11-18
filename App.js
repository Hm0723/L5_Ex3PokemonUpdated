import React from 'react';
import {StyleSheet, Text, View, SectionList, Image, TouchableOpacity, StatusBar,} from 'react-native';

const pokemonData = [
    {
        title: 'Fire',
        color: 'orange',
        data: [
            { name: 'Charmander', cardNumber: 4 },
            { name: 'Voltorb', cardNumber: 68 },
        ],
    },
    {
        title: 'Water',
        color: 'blue',
        data: [
            { name: 'Squirtle', cardNumber: 7 },
            { name: 'Psyduck', cardNumber: 54 },
        ],
    },
];

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 10,
    },
    addButton: {
        backgroundColor: 'blue',
        padding: 15,
        borderRadius: 5,
        marginBottom: 10,
        alignItems: 'center',
    },
    addButtonText: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 16,
    },
    headerContainer: {
        padding: 10,
        alignItems: 'center',
    },
    headerText: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    cardContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: 'grey',
        padding: 20,
        borderRadius: 5,
        backgroundColor: 'lightgrey'
    },
    cardText: {
        flex: 1,
        fontSize: 16,
        alignContent: 'center',
    },
    cardImage: {
        width: 200,
        height: 400,
    },
});


const getCardImageUrl = (cardNumber) =>
    `https://dz3we2x72f7ol.cloudfront.net/expansions/151/en-us/SV3pt5_EN_${cardNumber}-2x.png`;

const renderItem = ({ item }) => (
    <TouchableOpacity style={styles.cardContainer}>
        <Text style={styles.cardText}>{item.name}</Text>
        <Image
            source={{ uri: getCardImageUrl(item.cardNumber) }}
            style={styles.cardImage}
        />
    </TouchableOpacity>
);

const renderSectionHeader = ({ section: { title, color } }) => (
    <View style={[styles.headerContainer, { backgroundColor: color }]}>
        <Text style={styles.headerText}>{title}</Text>
    </View>
);


const App = () => {
    return (
        <View style={styles.container}>
            <StatusBar hidden={true} />
            <TouchableOpacity style={styles.addButton}>
                <Text style={styles.addButtonText}>ADD POKEMON</Text>
            </TouchableOpacity>
            <SectionList
                sections={pokemonData}
                renderItem={renderItem}
                renderSectionHeader={renderSectionHeader}
            />
        </View>
    );
};

export default App;
