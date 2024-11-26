import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity } from 'react-native';
import RNPickerSelect from 'react-native-picker-select'; // Use this for dropdowns

const Edit = ({ route, navigation }) => {
    const { pokemon } = route.params;

    const [name, setName] = useState(pokemon.name);
    const [cardNumber, setCardNumber] = useState(pokemon.cardNumber);
    const [element, setElement] = useState(pokemon.element);

    const handleSave = () => {

        route.params.handleUpdatePokemon({ name, cardNumber, element });
        navigation.goBack();
    };


    return (
        <View style={styles.container}>
            <Text style={styles.label}>Name</Text>
            <TextInput
                style={styles.input}
                value={name}
                onChangeText={setName}
            />
            <Text style={styles.label}>Card Number</Text>
            <TextInput
                style={styles.input}
                value={cardNumber}
                onChangeText={setCardNumber}
                keyboardType="numeric"
            />
            <Text style={styles.label}>Element</Text>
            <RNPickerSelect
                style={pickerSelectStyles}
                value={element}
                onValueChange={(value) => setElement(value)}
                items={[
                    { label: 'Water', value: 'Water' },
                    { label: 'Fire', value: 'Fire' },
                ]}
            />
            <TouchableOpacity style={styles.addButton} onPress={handleSave}>
                <Text style={styles.addButtonText}>Save Changes</Text>
            </TouchableOpacity>
        </View>
    );
};

// Custom styles for the Picker (both iOS and Android)
const pickerSelectStyles = StyleSheet.create({
    inputIOS: {
        borderWidth: 1,
        borderColor: 'grey',
        borderRadius: 5,
        padding: 10,
        marginBottom: 15,
        fontSize: 16,
        color: 'black',
    },
    inputAndroid: {
        borderWidth: 1,
        borderColor: 'grey',
        borderRadius: 5,
        padding: 10,
        marginBottom: 15,
        fontSize: 16,
        color: 'black',
    },
});

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
        backgroundColor: 'green',
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

export default Edit;
