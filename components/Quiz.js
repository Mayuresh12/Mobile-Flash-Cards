import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { getNumberOfQuestionsInDeck, getQuestionforAnswer, getAnswerForQuestion } from '../utils/api';
import { getDecks } from '../utils/api';

export default function Quiz({ navigation }) {

    const key = navigation.getParam('key')
    const [count, setCount] = useState(0);
    const [showAnswer, setShowAnswer] = useState(0);
    const [correctAnswer, setCorrectAnswer] = useState(0);
    const [decks, setDecks] = useState(getDecks);
    const readData = async () => {
        try {
            decksData = await AsyncStorage.getItem(STORAGE_KEY)

            if (decksData !== null) {
                setDecks(JSON.parse(JSON.stringify(decksData)));
            } else {

                setDecks(JSON.parse(JSON.stringify(getDecks)));
            }
        } catch (e) {
        }
    }

    useEffect(() => {
        readData()
    }, [])
    return (
        <View style={styles.pageStyle}>
            {count + 1 > getNumberOfQuestionsInDeck(key, decks) ?
                (<View style={styles.result}>
                    <Text style={styles.resultHeader}>Quiz completed 🎊</Text>
                    <Text style={styles.resultText}>Correct Answer: {correctAnswer}/{getNumberOfQuestionsInDeck(key, decks)}</Text>
                    <Text style={styles.resultTextper}>Percentage:{(correctAnswer / getNumberOfQuestionsInDeck(key, decks) * 100)}%</Text>
                    <TouchableOpacity
                        style={styles.button}
                        onPress={() => {
                            navigation.pop();
                        }}
                    >
                        <Text style={styles.buttonText}>Go Back to Deck</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={styles.button}
                        onPress={() => {

                            navigation.pop();
                            navigation.pop();
                        }}
                    >
                        <Text style={styles.buttonText}>Home</Text>
                    </TouchableOpacity>
                </View>) :
                (<View>
                    <View style={styles.questionContainer}>
                        <TouchableOpacity
                            style={styles.questionText}
                            onPress={() => showAnswer === 0 ? setShowAnswer(1) : setShowAnswer(0)}>
                            {showAnswer === 0 ?
                                (<View>
                                    <View style={styles.count} >
                                        <Text style={styles.count}>
                                            Question ({count + 1}/{getNumberOfQuestionsInDeck(key, decks)})
                                </Text>
                                    </View>
                                    <Text
                                        style={styles.questionText}
                                    >{getQuestionforAnswer(key, count, decks)}</Text>
                                </View>
                                ) : (
                                    <View >
                                        <View style={styles.count} >
                                            <Text style={styles.count}>
                                                Answer:
                                </Text>
                                        </View>
                                        <Text
                                            style={styles.questionText}
                                        >{getAnswerForQuestion(key, count, decks)}</Text>
                                    </View>)}
                        </TouchableOpacity>

                    </View>
                    <View style={styles.buttonContainer}>
                        <TouchableOpacity
                            style={styles.showAnswerTextStyle}
                            onPress={() => showAnswer === 0 ? setShowAnswer(1) : setShowAnswer(0)}>
                            {showAnswer === 0 ?
                                (<Text>
                                    Show Answer
                                </Text>) :
                                (<Text>
                                    Show Question
                                </Text>)
                            }
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={styles.correctButtonStyle}
                            onPress={() => { setCount(count + 1); setCorrectAnswer(correctAnswer + 1) }}
                        >
                            <Text>
                                Correct
                            </Text>

                        </TouchableOpacity>
                        <TouchableOpacity
                            style={styles.inCorrectButtonStyle}

                            onPress={() => setCount(count + 1)}
                        >
                            <Text>
                                Incorrect
                    </Text>
                        </TouchableOpacity>
                    </View>
                </View>)
            }
        </View >
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    pageStyle: {
        flex: 1,
        paddingTop: 16,
        paddingLeft: 16,
        paddingRight: 16,
        paddingBottom: 16,
        backgroundColor: "#ffccff",
        justifyContent: 'space-around'
    },
    block: {
        marginBottom: 20
    },
    count: {
        fontSize: 25,
        textDecorationLine: "underline",
        textDecorationStyle: "solid",
        paddingBottom: 20,
        justifyContent: `center`,
        alignItems: `center`,
    },
    title: {
        fontSize: 32,
        textAlign: 'center'
    },
    questionContainer: {
        borderWidth: 1,
        borderColor: 'black',
        backgroundColor: '#fffee9',
        paddingLeft: 16,
        paddingRight: 16,
        backgroundColor: 'white',
        borderRadius: 50,
        justifyContent: `center`,
        alignItems: `center`,
        borderWidth: 1,
        borderColor: '#999',
        height: 300
    },
    questionWrapper: {
        flex: 1,
        justifyContent: 'center'
    },
    questionText: {
        textAlign: 'center',
        fontSize: 30
    },
    resultTextGood: {
        color: 'green',
        fontSize: 46,
        textAlign: 'center'
    },
    resultTextBad: {
        color: 'red',
        fontSize: 46,
        textAlign: 'center'
    },
    correctButtonStyle: {
        marginTop: 20,
        width: 200,
        height: 50,
        backgroundColor: 'green',
        borderRadius: 5,
        justifyContent: `center`,
        alignItems: `center`,
        borderWidth: 1,
        borderColor: '#999'
    },
    inCorrectButtonStyle: {
        marginTop: 20,
        width: 200,
        height: 50,
        backgroundColor: 'red',
        borderRadius: 5,
        justifyContent: `center`,
        alignItems: `center`,
        borderWidth: 1,
        borderColor: '#999'
    },
    showAnswerTextStyle: {
        width: 120,
        height: 30,
        backgroundColor: 'white',
        borderRadius: 5,
        justifyContent: `center`,
        alignItems: `center`,
        borderWidth: 1,
        borderColor: '#999'
    },
    buttonContainer: {
        paddingTop: 20,
        alignItems: 'center',
        marginBottom: 100
    },
    result: {
        paddingTop: 20,
        alignItems: 'center',
        justifyContent: "center"
    },
    resultHeader: {
        fontSize: 40,
        paddingBottom: 50
    },
    resultText: {
        fontSize: 30
    },
    resultTextper: {
        fontSize: 20,
        paddingBottom: 150
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
    buttonText: {
        fontSize: 20,
        color: '#003366'
    }

});