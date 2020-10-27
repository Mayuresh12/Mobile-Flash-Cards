import React from 'react';
import * as Icon from '@expo/vector-icons';
import { createStackNavigator } from 'react-navigation-stack';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import DeckList from '../components/DeckList';
import DeckDetail from '../components/DeckDetail';
import Quiz from '../components/Quiz';
import AddCard from '../components/AddCard';
import AddDeck from '../components/AddDeck';
import getDecks from '../utils/api';


function addDeck(deck) {
  getDecks[deck] = {
    "title": deck,
    "questions": []
  }
}

const AppNavigator = createBottomTabNavigator(
  {
    Home: {
      screen: DeckList,
      navigationOptions: {
        tabBarLabel: 'Decks',
        tabBarIcon: ({ tintColor }) => (
          <Icon.Entypo name="book" size={24} color="black" />
        )
      }
    },
    AddDeck: {
      screen: AddDeck,
      navigationOptions: {
        tabBarLabel: 'Add Deck',
        tabBarIcon: ({ tintColor }) => (
          <Icon.MaterialCommunityIcons name="cards-playing-outline" size={30} color="black" />
        )
      }
    },

  });


const appNavigator = createStackNavigator(
  {
    Home: {
      screen: AppNavigator,
      navigationOptions: {
        headerTintColor: '#ffffff',
        headerStyle: {
          backgroundColor: '#ffccff'
        },
        title: ''
      }
    },
    DeckDetail: {
      screen: DeckDetail,
      navigationOptions: {
        headerTintColor: 'green',
        headerStyle: {
          backgroundColor: '#ffccff'
        },
        title: 'Deck Details'
      }
    },
    Quiz: {
      screen: Quiz,
      navigationOptions: {
        headerTintColor: 'green',
        headerStyle: {
          backgroundColor: '#ffccff'
        },
        title: 'Quiz'
      }
    },
    AddCard: {
      screen: AddCard,
      navigationOptions: {
        headerTintColor: 'green',
        headerStyle: {
          backgroundColor: '#ffccff'
        },
        title: 'AddCard'
      }
    }
  },
  { headerTitleAlign: 'center' }
);


export default appNavigator;