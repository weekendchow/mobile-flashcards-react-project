import React, { Component } from 'react'
import { View, Text, StyleSheet, KeyboardAvoidingView, Keyboard, TextInput, TouchableOpacity, Platform, Alert } from 'react-native'
import { purple, white, gray } from '../utils/colors'
import { addDeck } from '../actions'
import { connect } from 'react-redux'
import { saveDeckTitle } from '../utils/api'
import { NavigationActions } from 'react-navigation'

class AddDeck extends Component {
  state = {
    text:''
  }

  submit = () => {
    const entry = this.state
    const { decks } = this.props;

    if(!entry.text){
      Alert.alert(
        'Mandatory',
        'Deck Name cannot be empty'
      )
    }else if(decks[entry.text]) {
      Alert.alert(
        'Error!',
        'Deck Already exists'
      )
    }else {
      const newDeck = {[entry.text]: {title: entry.text, questions: []}};

      this.props.dispatch(addDeck(newDeck))

      saveDeckTitle(newDeck)

      this.setState(() => ({
        text: ''
      }))

      Alert.alert(
        'Successful', 'Deck Added',
        [
          {text: 'OK', onPress: () => this.toHome()},
        ],
      )

    }



  }

  toHome = () => {
    this.props.navigation.dispatch(NavigationActions.back({
      key: 'AddDeck'
    }))
  }

  render() {
    console.log('Props', this.props)
    console.log('State', this.state)
    return (
      <KeyboardAvoidingView style={styles.container}  behavior="padding">
        <Text style={styles.center}>What is the title of your new Deck?</Text>
        <TextInput
          style={styles.inputText}
          placeholder="Deck Tiltle"
          value={this.state.text}
          maxLength = {10}
          numberOfLines = {4}
          onChangeText={(text) => {
            this.setState({text})
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
    marginLeft: 30,
    marginRight: 30,
    marginTop: 40,
    marginBottom: 60,
    alignSelf:'stretch'
  },
  iosSubmitBtn: {
    backgroundColor: purple,
    padding: 10,
    borderRadius: 7,
    height: 45,
    marginLeft: 80,
    marginRight: 80,
  },
  androidSubmitBtn: {
    backgroundColor: purple,
    padding: 10,
    borderRadius: 2,
    height: 45,
    paddingLeft: 60,
    paddingRight: 60,
    alignSelf: 'flex-end',
    justifyContent: 'center',
    alignItems: 'center'
  },
  submitBtnText: {
    color: white,
    fontSize: 22,
    textAlign: 'center'
  },
  center: {
    	textAlign: 'center',
      fontSize: 30,
      fontWeight: 'bold'
  },


})

function mapStateToProps(state) {
    return {
        decks: state,
    };
}

export default connect(mapStateToProps)(AddDeck)
