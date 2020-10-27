// This functional component is responsible for adding decks

import React, { useState } from 'react';
import { Alert, StyleSheet, Text, View, TouchableOpacity, TextInput } from 'react-native';
import { getDecks } from '../utils/api';
import { useAsyncStorage } from '@react-native-async-storage/async-storage';

export default function AddDeck({ navigation }) {
    const [answer, setAnswer] = useState('');
    const { getItem, setItem } = useAsyncStorage('@storage_key');
    const title = navigation.getParam('key')

    function addDeck(deck) {
        var changeObj = getDecks;
        changeObj[deck] = {
            "title": deck,
            "questions": []
        }
        return changeObj;
    }

    const writeItemToStorage = async newValue => {
        await setItem(JSON.stringify(newValue));
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>What is the title of your new flash card deck?</Text>
            <TextInput
                placeholder="Enter deck name"
                style={styles.smallTitle}
                onChangeText={text => setAnswer(text)}
                value={answer}
            />
            <TouchableOpacity
                style={styles.button}
                onPress={() => {
                    if (answer === '') {
                        Alert.alert('😔', 'Deck cannot be empty ');
                    } else {
                        Alert.alert('🎉', 'Deck ' + answer + ' added');
                        //navigation.pop();
                        navigation.navigate('Home');
                        writeItemToStorage(
                            addDeck(answer)
                        )
                    }
                }
                }
            >
                <Text>Add Deck</Text>

            </TouchableOpacity>
        </View>
    )
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingLeft: 16,
        paddingRight: 16,
        paddingBottom: 16,
        backgroundColor: "#ffccff",
        justifyContent: "center",
        alignItems: "center"
    },
    smallTitle: {
        height: 35,
        width: 300,
        backgroundColor: 'white',
        borderColor: 'grey',
        borderWidth: 0.3,
        fontSize: 20,
        textAlign: 'center',
        marginBottom: 16,
        borderRadius: 20,
    },
    title: {
        paddingTop: 20,
        fontSize: 35,
        textAlign: 'center',
        marginBottom: 50
    },
    button: {
        marginTop: 20,
        width: 200,
        height: 50,
        backgroundColor: 'green',
        borderRadius: 5,
        justifyContent: `center`,
        alignItems: `center`,
        borderWidth: 1,
        borderColor: '#999'
    }

});
