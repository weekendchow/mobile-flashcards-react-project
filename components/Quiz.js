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

  render () {
    const { questions, title } = this.props.deck
    const { currentQuestion, correct, showAnswer, showFinish } = this.state
    const accuracy = correct/questions.length*100

    if(!showFinish) {
      return (
        <View style={styles.container}>
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
              onPress={() => {
                if(questions.length > currentQuestion){
                  this.setState({
                    currentQuestion: currentQuestion+1,
                    correct: correct+1,
                  })
                }else{
                  this.setState({
                    correct:this.state.correct+1,
                    showFinish:true
                  })
                }
              }}>
              <Text style={styles.submitBtnText}>Correct</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.incorrectBtn}
              onPress={() => {
                if(questions.length > currentQuestion){
                  this.setState({
                    currentQuestion: currentQuestion+1,
                  })
                }else{
                  this.setState({
                    showFinish:true
                  })
                }
              }}>
              <Text style={styles.submitBtnText}>Incorrect</Text>
            </TouchableOpacity>
          </View>
        </View>
      )
    }else {
      return (
        <View style={styles.finish}>
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
    finish: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center'
    }

})

export default connect(mapStateToProps)(Quiz)
