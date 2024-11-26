import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity } from 'react-native';
import {Picker} from "@react-native-picker/picker";

const Add = ({ route, navigation }) => {
    const [name, setName] = useState('');
    const [cardNumber, setCardNumber] = useState('');
    const [element, setElement] = useState('Water');  // Default to "Water"

    const { handleAddPokemon } = route.params;

    const handleAddPokemonPress = () => {
        if (name && cardNumber && element) {
            const newPokemon = { name, cardNumber, element };
            handleAddPokemon(newPokemon);
            navigation.goBack();
        } else {
            alert('Please fill in all fields.');
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.label}>Name</Text>
            <TextInput
                style={styles.input}
                placeholder="Enter Pokémon Name"
                value={name}
                onChangeText={setName}
            />
            <Text style={styles.label}>Card Number</Text>
            <TextInput
                style={styles.input}
                placeholder="Enter Card Number"
                value={cardNumber}
                onChangeText={setCardNumber}
                keyboardType="numeric"
            />
            <Text style={styles.label}>Element</Text>
            <Picker
                selectedValue={element}
                onValueChange={(itemValue) => setElement(itemValue)}
                style={styles.input}
            >
                <Picker.Item label="Water" value="Water" />
                <Picker.Item label="Fire" value="Fire" />
            </Picker>
            <TouchableOpacity style={styles.addButton} onPress={handleAddPokemonPress}>
                <Text style={styles.addButtonText}>Add Pokémon</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
    },
    label: {
        fontSize: 16,
        marginBottom: 5,
    },
    input: {
        borderWidth: 1,
        borderColor: 'grey',
        borderRadius: 5,
        padding: 10,
        marginBottom: 15,
    },
    addButton: {
        backgroundColor: 'blue',
        padding: 15,
        borderRadius: 5,
        alignItems: 'center',
    },
    addButtonText: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 16,
    },
});

export default Add;
