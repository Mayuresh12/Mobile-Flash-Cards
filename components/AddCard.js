// This functional component is responsible for Add cards to particular deck

import React, { useState, useEffect } from 'react';
import { Alert, StyleSheet, Text, View, TouchableOpacity, TextInput } from 'react-native';
import { getDecks } from '../utils/api';
import { useAsyncStorage } from '@react-native-async-storage/async-storage';

export default function AddCard({ navigation }) {
    const [question, onChangeText] = useState('');
    const [answer, setAnswer] = useState('');
    const [mystring, setValue] = useState('value');
    const { getItem, setItem } = useAsyncStorage('@storage_key');
    const title = navigation.getParam('key')

    function addQuestion(key, mystring) {
        var changeObj = getDecks;
        changeObj[key].questions.push(mystring);
        return changeObj;
    }
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

    const readData = async () => {
        try {
            const deckDataFromStorage = await getItem()
            if (deckDataFromStorage !== null) {
                setItem(deckDataFromStorage)
            }
        } catch (e) {
        }
    }

    useEffect(() => {
        readData();
    }, []);
    return (
        <View style={styles.container}>
            <Text style={styles.title}>Write a questions</Text>
            <TextInput
                placeholder="Enter Your Question"
                style={styles.smallTitle}
                onChangeText={text => onChangeText(text)}
                value={question}
            />
            <TextInput
                placeholder="Enter Your Answer"
                style={styles.smallTitle}
                onChangeText={text => setAnswer(text)}
                value={answer}
            />
            <TouchableOpacity
                style={styles.button}
                onPress={() => {
                    if (question === '' || answer === '') {
                        Alert.alert('😔', 'Question or Answer cannot be empty ');
                    } else {
                        Alert.alert('🎉', 'Card Added to ' + title + ' deck');
                        navigation.pop();
                        writeItemToStorage(
                            addQuestion(title, {
                                "question": question,
                                "answer": answer
                            })
                        )
                    }
                }}
            >
                <Text>Submit</Text>
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
        borderRadius: 20
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
