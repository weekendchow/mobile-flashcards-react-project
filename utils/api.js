import { AsyncStorage } from 'react-native'

export const FLASHCARDS_STORAGE_KEY = 'Flashcards: decks'

let decks = {
  React: {
    title: 'React',
    questions: [
      {
        question: 'What is React?',
        answer: 'A library for managing user interfaces'
      },
      {
        question: 'Where do you make Ajax requests in React?',
        answer: 'The componentDidMount lifecycle event'
      }
    ]
  },
  JavaScript: {
    title: 'JavaScript',
    questions: [
      {
        question: 'What is a closure?',
        answer: 'The combination of a function and the lexical environment within which that function was declared.'
      }
    ]
  }
}

export function getDecks() {
  return AsyncStorage.getItem(FLASHCARDS_STORAGE_KEY)
    .then((results) => {
      console.log('Data from helpers!',results)
      if(JSON.parse(results) !== null) {
        return JSON.parse(results)
      } else {
        AsyncStorage.setItem(FLASHCARDS_STORAGE_KEY, JSON.stringify(decks))
        return AsyncStorage.getItem(FLASHCARDS_STORAGE_KEY)
          .then((results) => {
            console.log('Data from helpers!',results)
            return JSON.parse(results)
          })

      }
    })
}


export function getDeck() {
// take in a single id argument and return the deck associated with that id.
}

export function saveDeckTitle(deck) {
  return AsyncStorage.mergeItem(FLASHCARDS_STORAGE_KEY, JSON.stringify(deck))
}

export function addCardToDeck() {
// take in two arguments, title and card, and will add the card to the list of questions for the deck with the associated title.
}
