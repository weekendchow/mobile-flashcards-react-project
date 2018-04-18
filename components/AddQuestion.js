import React, { Component } from 'react'
import { Text, StyleSheet, KeyboardAvoidingView, TextInput, TouchableOpacity, Platform, Alert } from 'react-native'
import { connect } from 'react-redux'
import { addQuestion } from '../actions'
import { addCardToDeck, getDeck } from '../utils/api'
import { purple, gray, white } from '../utils/colors'

class AddQuestion extends Component {
  static navigationOptions = ({ navigation }) => {
    return {
      title: `Add Card`
    }
  }

  state = {
    question:'',
    answer:''
  }


  submit = () => {
    const question = this.state.question
    const answer = this.state.answer
    const title = this.props.deck.title
    const questions = this.props.deck.questions

    if(question === '' || answer === ''){
      Alert.alert(
        'Mandatory',
        'Card cannot be empty'
      )
    }else {

      const params = {title, questions, question, answer}

      this.props.dispatch(addQuestion(params))

      addCardToDeck({
            card: {question, answer},
            deckTitle: title
        })

      this.setState(() => ({
        question:'',
        answer:''
      }))

      Alert.alert(
        'Successful', 'Question Added',
        [
          {text: 'OK', onPress: () => this.props.navigation.goBack()},
        ],
      )
  }
}

  render() {
    console.log('State',this.state)
    console.log('Props',this.props)
    return (
      <KeyboardAvoidingView style={styles.container}  behavior="padding">
        <TextInput
          style={styles.inputText}
          placeholder="Card Question"
          value={this.state.question}
          onChangeText={(question) => {
            this.setState({question})
          }}
        />
        <TextInput
          style={styles.inputText}
          placeholder="Card Answer"
          value={this.state.answer}
          onChangeText={(answer) => {
            this.setState({answer})
          }}
        />
        <TouchableOpacity
          style={Platform.OS === 'ios' ? styles.iosSubmitBtn : styles.androidSubmitBtn}
          onPress={this.submit}>
          <Text style={styles.submitBtnText}>SUBMIT</Text>
        </TouchableOpacity>
      </KeyboardAvoidingView>
    )
  }

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignContent: 'center'
  },
  inputText: {
    borderColor: gray,
    borderWidth: 1,
    borderRadius: 5,
    padding:10,
    height: 40,
    margin: 20,
    alignSelf:'stretch'
  },
  iosSubmitBtn: {
    backgroundColor: purple,
    padding: 10,
    borderRadius: 7,
    height: 45,
    marginLeft: 80,
    marginRight: 80,
    marginTop: 80,
  },
  androidSubmitBtn: {
    backgroundColor: purple,
    padding: 10,
    borderRadius: 2,
    height: 45,
    paddingLeft: 60,
    paddingRight: 60,
    paddingTop: 60,
    alignSelf: 'flex-end',
    justifyContent: 'center',
    alignItems: 'center'
  },
  submitBtnText: {
    color: white,
    fontSize: 22,
    textAlign: 'center'
  },

})

function mapStateToProps(state, { navigation }) {
  return {
     deck:  state[navigation.state.params.deck]
  }
}

export default connect(mapStateToProps)(AddQuestion)
