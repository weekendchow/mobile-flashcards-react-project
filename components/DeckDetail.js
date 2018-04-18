import React, { Component } from 'react'
import { Text, StyleSheet, View, TouchableOpacity } from 'react-native'
import { connect } from 'react-redux'
import { purple, white, gray } from '../utils/colors'
import { setLocalNotification, clearLocalNotification } from '../utils/helpers'

class DeckDetail extends Component {
  static navigationOptions = ({ navigation }) => {
    return {
      title: `${navigation.state.params.title}`
    }
  }

  state = {
    deck: {
      questions: []
    }
  }

  addCard = () => {
    this.props.navigation.navigate(
      'AddQuestion', {
        deck: this.state.deck.title
      }
    )
  }

  startQuiz = () => {
    this.props.navigation.navigate(
      'Quiz', {
        deck: this.state.deck.title
      }
    )

    clearLocalNotification()
    .then(setLocalNotification)
  }

  componentDidMount(){
    this.setState({
      deck: this.props.deck
    })
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      deck: nextProps.deck
    })
  }

  render() {
    const deck = this.state.deck

    return (
      <View style={styles.container}>
        <View style={styles.contentContainer}>
          <Text style={styles.title}>{deck.title}</Text>
          <Text style={styles.questions}>{deck.questions.length} cards</Text>
        </View>
        <View>
          <TouchableOpacity style={styles.addCardBtn} onPress={this.addCard}>
            <Text style={styles.addCardTxt}>
              Add Card
            </Text>
          </TouchableOpacity>
          {
            deck.questions.length > 0 &&
              <TouchableOpacity style={styles.startQuizBtn} onPress={this.startQuiz}>
                <Text style={styles.startQuizTxt}>
                  Start Quiz
                </Text>
              </TouchableOpacity>
          }
        </View>
      </View>
    )
  }

}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: white,
      alignItems: 'center',
      justifyContent: 'center',
      borderColor: white,
      borderTopWidth: 40,
      borderBottomWidth: 40,
    },
    contentContainer: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center'
    },
    title: {
      fontSize: 36,
      fontWeight: 'bold',
      color: purple,
      padding: 20
    },
    questions: {
      fontSize: 20,
      color: gray,
    },
    description: {
      fontSize: 24
    },
    addCardBtn: {
      padding: 13,
      margin: 5,
      width: 200,
      backgroundColor: white,
      borderRadius: 10,
      borderWidth: 1,
      borderColor: purple,
      alignItems: 'center',
      justifyContent: 'center'

    },
    addCardTxt: {
      color: purple,
      fontWeight: 'bold',
      textAlign: 'center'
    },
    startQuizBtn: {
      padding: 13,
      margin: 5,
      width: 200,
      backgroundColor: purple,
      borderRadius: 10,
      borderWidth: 1,
      borderColor: purple,
      alignItems: 'center',
      justifyContent: 'center'
    },
    startQuizTxt: {
      fontWeight: 'bold',
      color: white,
      textAlign: 'center'

    }
})

function mapStateToProps(state, { navigation }) {
  return {
     deck:  state[navigation.state.params.title]
  }
}

export default connect(mapStateToProps)(DeckDetail)
