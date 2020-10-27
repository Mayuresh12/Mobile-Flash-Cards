import { AsyncStorage } from 'react-native'
import * as Notifications from 'expo-notifications';
import * as Permissions from 'expo-permissions'; 
import { flashCardData } from './data';
const NOTIFICATION_KEY = 'FlashCards:notifications'

// get all data 
export const getDecks = JSON.parse(JSON.stringify(flashCardData))

// Get the number of Q's from deck
export function getNumberOfQuestionsInDeck(key, decks) {
  var obj = JSON.parse(JSON.stringify(decks));
  const numberOfquestions = obj[key].questions.length;
  return numberOfquestions;
}

// Get questions from deck
export function getQuestions(key, decks) {
  var obj = JSON.parse(JSON.stringify(decks))
  numberOfquestions = getNumberOfQuestionsInDeck(key, decks)
  for (i = 0; i < numberOfquestions; i++) {
    return "Question #" + (i + 1) + " " + obj[key].questions[i].question + "\n" + "Answer #" + (i + 1) + " " + obj[key].questions[i].answer
  }
}

// Get Questions on the screen
export function getQuestionforAnswer(key, i, decks) {
  var obj = JSON.parse(JSON.stringify(decks))
  return obj[key].questions[i].question
}

// Get Answer for the questions on the screen
export function getAnswerForQuestion(key, i, decks) {
  var obj = JSON.parse(JSON.stringify(decks))
  return obj[key].questions[i].answer
}
// clear the notification from aync storage
export function clearLocalNotification() {
  return AsyncStorage.removeItem(NOTIFICATION_KEY)
    .then(Notifications.cancelAllScheduledNotificationsAsync)
}

// create object for the local notifications to be displayed

function createNotification() {
  return {
    title: 'Hello!',
    body: "👋 don't forget to Play FlashCards!",
    ios: {
      sound: true,
    },
    android: {
      sound: true,
      priority: 'high',
      sticky: false,
      vibrate: true,
    }
  }
}

// set the local notification on the app launch
export function setLocalNotification() {
  AsyncStorage.getItem(NOTIFICATION_KEY)
    .then(JSON.parse)
    .then((data) => {
      if (data === null) {
        Permissions.askAsync(Permissions.NOTIFICATIONS)
          .then(({ status }) => {
            if (status === 'granted') {
              Notifications.cancelAllScheduledNotificationsAsync()

              let tomorrow = new Date()
              tomorrow.setDate(tomorrow.getDate() + 1)
              tomorrow.setHours(20)
              tomorrow.setMinutes(0)

              Notifications.scheduleLocalNotificationAsync(
                createNotification(),
                {
                  time: tomorrow,
                  repeat: 'day',
                }
              )
              AsyncStorage.setItem(NOTIFICATION_KEY, JSON.stringify(true))
            }
          })
      }
    })
}