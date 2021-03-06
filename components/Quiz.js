import React, { Component } from 'react'
import { Text, View, StyleSheet, TouchableOpacity } from 'react-native'
import { purple, orange, green, red, white } from '../utils/colors'
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

  correctSubmit = () => {
    if(this.props.deck.questions.length > this.state.currentQuestion){
      this.setState({
        currentQuestion: this.state.currentQuestion+1,
        correct: this.state.correct+1,
      })
    }else{
      this.setState({
        correct: this.state.correct+1,
        showFinish: true
      })
    }
  }

  incorrectSubmit = () => {
    if(this.props.deck.questions.length > this.state.currentQuestion){
      this.setState({
        currentQuestion: this.state.currentQuestion+1,
      })
    }else{
      this.setState({
        showFinish: true
      })
    }
  }

  restartQuiz = () => {
    this.props.navigation.goBack()
    this.props.navigation.navigate(
      'Quiz', {
        questions: this.props.deck.questions,
        deck: this.props.deck.title
      },
    )


  }

  backToDeck = () => {
    this.props.navigation.goBack()
  }

  render () {
    const { questions, title } = this.props.deck
    const { currentQuestion, correct, showAnswer, showFinish } = this.state
    const accuracy = correct/questions.length*100

    if(!showFinish) {
      return (
        <View style={styles.containerQuiz}>
          <Text style={{color: purple}}>
            {currentQuestion +'/'+ questions.length}
          </Text>
          <Text style={styles.question}>
            {(!showAnswer)
              ? (questions.length>0) && questions[currentQuestion-1].question
              : questions[currentQuestion-1].answer
            }
          </Text>
          {(!showAnswer)
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
          <View style={{flex:1, justifyContent: 'flex-end'}}>
            <TouchableOpacity
              style={styles.correctBtn}
              onPress={this.correctSubmit}>
              <Text style={styles.submitBtnText}>Correct</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.incorrectBtn}
              onPress={this.incorrectSubmit}>
              <Text style={styles.submitBtnText}>Incorrect</Text>
            </TouchableOpacity>
          </View>
        </View>
      )
    }else {
      return (
        <View style={styles.containerFinish}>
          <View style={styles.contentContainer}>
            <Text style={{fontSize:30, fontWeight:'bold', color: purple, margin:10}}>
              Congratulation!
            </Text>
            <Text style={{fontSize:25, color: purple, margin:5}}>
              You have complete the Quiz!
            </Text>
            <Text style={{fontSize:20, color: orange, margin:20}}>
              accuracy: {accuracy.toFixed(2)}%
            </Text>
          </View>
          <View style={styles.finish}>
            <TouchableOpacity
              style={styles.restartQuizBtn}
              onPress={this.restartQuiz}>
              <Text style={styles.restartQuizTxt}>Restart Quiz</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.backToDeckBtn}
              onPress={this.backToDeck}>
              <Text style={styles.backToDeckTxt}>Back to Deck</Text>
            </TouchableOpacity>
          </View>
        </View>

      )
    }
  }
}

function mapStateToProps(state, { navigation }) {
  return {
     deck:  state[navigation.state.params.deck]
  }
}

const styles=StyleSheet.create({
  containerQuiz: {
    flex: 1,
  },
  containerFinish:{
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
  correctBtn: {
    backgroundColor: green,
    padding: 10,
    borderRadius: 7,
    height: 45,
    marginLeft: 80,
    marginRight: 80,
  },
  incorrectBtn: {
    backgroundColor: red,
    padding: 10,
    borderRadius: 7,
    height: 45,
    marginLeft: 80,
    marginRight: 80,
    marginTop: 20,
    marginBottom: 60,
  },
  submitBtnText: {
    color: white,
    fontSize: 22,
    textAlign: 'center'
  },
  restartQuizBtn: {
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
  restartQuizTxt: {
    color: purple,
    fontWeight: 'bold',
    textAlign: 'center'
  },
  backToDeckBtn: {
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
  backToDeckTxt: {
    fontWeight: 'bold',
    color: white,
    textAlign: 'center'
  }

})

export default connect(mapStateToProps)(Quiz)
