import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import React from 'react';

export default function DeckDetails({ navigation }) {
    const title = navigation.getParam('title')
    const questions = navigation.getParam('question')
    return (
        <View style={styles.container}>
            <View style={styles.deckContainer}>
                <Text style={styles.deckText}>
                    {title}
                </Text>
                <Text style={styles.cardText}>
                    {questions + " cards"}
                </Text>
            </View>
            <View style={styles.buttonContainer}>
                <TouchableOpacity
                    style={styles.button}
                    onPress={() => {
                        navigation.pop();
                        navigation.navigate('AddCard', { key: title })
                    }}
                >
                    <Text style={styles.buttonText}>Add Card</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={styles.button}
                    onPress={() =>
                        navigation.navigate('Quiz', { key: title }, navigation)
                    }                    >
                    <Text style={styles.buttonText}>Start Quiz</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingLeft: 16,
        paddingRight: 16,
        paddingBottom: 16,
        backgroundColor: "#ffccff"
    },
    smallTitle: {
        fontSize: 20,
        textAlign: 'center',
        marginBottom: 16,
        color: 'green'
    },
    deckContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        flexBasis: 120,
        minHeight: 120,
        borderWidth: 1,
        borderColor: '#002699',
        backgroundColor: '#fffee9',
        borderRadius: 20,
        marginBottom: 10
    },
    deckText: {
        fontSize: 28,
        color: "#4da6ff"

    },
    cardText: {
        fontSize: 18,
        color: "#ff884d"
    },
    button: {
        marginTop: 20,
        width: 200,
        height: 50,
        backgroundColor: '#fffee9',
        borderRadius: 5,
        justifyContent: `center`,
        alignItems: `center`,
        borderWidth: 1,
        borderColor: '#999'
    },
    buttonContainer: {
        alignItems: 'center',
        marginBottom: 20
    },
    buttonText: {
        fontSize: 20,
        color: '#003366'
    }

});
