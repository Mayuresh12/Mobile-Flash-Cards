import React, { Component, useState, useEffect } from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { getDecks, clearLocalNotification, setLocalNotification } from '../utils/api';
import { welcomeMessage, flashCards } from '../utils/strings';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { NavigationEvents } from 'react-navigation';
import { ScrollView } from 'react-native-gesture-handler';

const STORAGE_KEY = '@storage_key'

const Deck = ({ navigation }) => {
  const [decks, setDecks] = useState(getDecks)
  var dataFromStorage = getDecks;
  const saveData = async () => {
    try {
      await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(dataFromStorage))
    } catch (e) {
    }
  }
  const readData = async () => {
    try {
      decksData = await AsyncStorage.getItem(STORAGE_KEY)
      clearLocalNotification()
        .then(setLocalNotification);
      if (decksData !== null) {
        setDecks(JSON.parse(decksData));
      } else {
        saveData()

        setDecks(JSON.parse(getDecks));
      }
    } catch (e) {
    }
  }

  useEffect(() => {
    readData()
  }, [])

  return (
    <ScrollView>
      <View>
        <NavigationEvents
          onDidFocus={() => readData()}
        />
        {Object.values(decks).map(deck => {
          if (deck.questions === undefined) { return <View> </View> } else {
            return (
              <TouchableOpacity
                style={styles.deckContainer}
                key={deck.title}
                onPress={() =>
                  navigation.navigate('DeckDetail', { title: deck.title, question: deck.questions.length }, navigation)
                }
              >
                <Text style={styles.deckText}>{deck.title}</Text>
                <View>
                  <Text style={styles.cardText} >{deck.questions.length} cards</Text>
                </View>
              </TouchableOpacity>
            )
          }
        })}
      </View>
    </ScrollView>
  )
}

class DeckList extends Component {

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.smallTitle}> {welcomeMessage} </Text>
        <Text style={styles.title}>{flashCards}</Text>
        <Deck
          navigation={this.props.navigation}
        />
      </View>
    );
  }
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
  title: {
    fontSize: 40,
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
  }

});
export default DeckList;