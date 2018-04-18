import React, { Component } from 'react'
import { Text, View, StyleSheet, TouchableOpacity } from 'react-native'
import { purple, orange } from '../utils/colors'
import { getDeck } from '../utils/api'
import { connect } from 'react-redux'

class Quiz extends Component {
  static navigationOptions = ({ navigation }) => {
    return {
      title: `Quiz`
    }
  }

  state = {
    currentQuestion: 1,
    correct: 0,
    showAnswer: false,
    showFinish: false
  }

  componentDidMount(){
    getDeck(this.props.navigation.state.params.deck)
      .then((deck) => {
        this.setState(deck)
      })

  }

  render() {
    const { questions, title } = this.props.deck
    const { currentQuestion, correct, showAnswer, showFinish } = this.state
    return (
      <View style={styles.container}>
        <Text style={{color: purple}}>
          {currentQuestion +'/'+ questions.length}
        </Text>
        <Text style={styles.question}>
          { (!showAnswer)
              ? (questions.length>0) && questions[currentQuestion-1].question
              : questions[currentQuestion-1].answer
          }
        </Text>
        { (!showAnswer)
            ? <TouchableOpacity onPress={() => {
                this.setState({showAnswer: true})
              }}>
                <Text style={styles.center}>Answer</Text>
              </TouchableOpacity>
            : <TouchableOpacity onPress={() => {
                this.setState({showAnswer: false})
              }}>
                <Text style={styles.center}>Question</Text>
              </TouchableOpacity>
        }

      </View>
    )
  }

}

function mapStateToProps(state, { navigation }) {
  return {
     deck:  state[navigation.state.params.deck]
  }
}

const styles=StyleSheet.create({
    container:{
      flex:1,
    },
    question:{
      fontSize:30,
      fontWeight: 'bold',
      padding:20,
      marginTop:150,
      color: purple,
      textAlign:'center'
    },
    center: {
      textAlign: 'center',
      fontSize: 20,
      color: orange,
    },

})

export default connect(mapStateToProps)(Quiz)
