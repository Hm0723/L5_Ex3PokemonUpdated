import React, { useState } from 'react';
import { StyleSheet, Text, View, SectionList, Image, TouchableOpacity, StatusBar } from 'react-native';
import { useNavigation } from '@react-navigation/native'; // Importing useNavigation hook

// Default Pokémon data
const initialPokemonData = [
    {
        title: 'Fire',
        color: 'orange',
        data: [
            { name: 'Charmander', cardNumber: 4, element: 'Fire' },
            { name: 'Voltorb', cardNumber: 68, element: 'Fire' },
        ],
    },
    {
        title: 'Water',
        color: 'blue',
        data: [
            { name: 'Squirtle', cardNumber: 7, element: 'Water' },
            { name: 'Psyduck', cardNumber: 54, element: 'Water' },
        ],
    },
];

const getCardImageUrl = (cardNumber) =>
    `https://dz3we2x72f7ol.cloudfront.net/expansions/151/en-us/SV3pt5_EN_${cardNumber}-2x.png`;

const App = () => {
    const [pokemonData, setPokemonData] = useState(initialPokemonData);
    const navigation = useNavigation(); // Use the navigation hook

    const handleAddPokemon = (newPokemon) => {
        const updatedData = [...pokemonData];
        const section = updatedData.find((section) => section.title === newPokemon.element);
        if (section) {
            section.data.push(newPokemon);
        } else {
            updatedData.push({ title: newPokemon.element, color: 'grey', data: [newPokemon] });
        }
        setPokemonData(updatedData);
    };

    const handleCardPress = (pokemon) => {
        navigation.navigate('Edit', {
            pokemon,
            handleUpdatePokemon: (updatedPokemon) => {
                const updatedData = pokemonData.map((section) => {
                    // Filter out the updated Pokémon from its current section
                    const updatedSectionData = section.data.filter((p) => p.name !== pokemon.name);

                    return { ...section, data: updatedSectionData };
                }).filter((section) => section.data.length > 0); // Remove empty sections

                // Find or create the new section for the updated Pokémon
                let newSection = updatedData.find((section) => section.title === updatedPokemon.element);
                if (!newSection) {
                    newSection = { title: updatedPokemon.element, color: 'grey', data: [] };
                    updatedData.push(newSection);
                }
                newSection.data.push(updatedPokemon);

                setPokemonData(updatedData);
            },
        });
    };


    const renderItem = ({ item }) => (
        <TouchableOpacity style={styles.cardContainer} onPress={() => handleCardPress(item)}>
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

    return (
        <View style={styles.container}>
            <StatusBar hidden={true} />
            <TouchableOpacity
                style={styles.addButton}
                onPress={() => navigation.navigate('Add', { handleAddPokemon })}
            >
                <Text style={styles.addButtonText}>ADD POKEMON</Text>
            </TouchableOpacity>
            <SectionList
                sections={pokemonData}
                renderItem={renderItem}
                renderSectionHeader={renderSectionHeader}
                keyExtractor={(item, index) => index.toString()}
            />
        </View>
    );
};

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

export default App;
