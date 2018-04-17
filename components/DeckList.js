import React, { Component } from 'react'
import { View, Text, FlatList, StyleSheet, Dimensions, Platform, TouchableOpacity } from 'react-native'
import { connect } from 'react-redux'
import { purple, white, gray } from '../utils/colors'
import { receiveDecks, addDeck } from '../actions'
import { getDecks } from '../utils/api'
import { AppLoading } from 'expo'

class DeckList extends Component  {
  state = {
    ready: false
  }

  componentDidMount() {
    const { dispatch } = this.props

    getDecks()
      .then((decks) => dispatch(receiveDecks(decks)))
      .then(() => this.setState(() => ({ready: true})))
  }

  renderItem = ({item}) => (
    <View style={styles.item}>
      <TouchableOpacity
        onPress={() => this.props.navigation.navigate('DeckDetail', item)}>
        <View style={{justifyContent: 'center', alignItems: 'center'}}>
            <Text style={{fontSize: 24}}>{item.title}</Text>
            <Text style={{fontSize: 18, color: gray}}>
                {item.questions && item.questions.length} cards
            </Text>
        </View>
      </TouchableOpacity>
    </View>
  )

  render () {
    console.log('Props',this.props)
    const { decks } = this.props
    const { ready } = this.state

    if(ready === false){
      return <AppLoading />
    }

    return (
      <View style={styles.deck}>
        <FlatList
          data={Object.values(decks)}
          renderItem={this.renderItem}
          keyExtractor={(item, index) => index}/>
      </View>
    )
  }
}

function mapStateToProps(decks) {
  return {
    decks
  }
}

const styles = StyleSheet.create({
  deck: {
    flexDirection: 'row',
    height: Dimensions.get('window').height
  },
  item: {
    backgroundColor: white,
    borderRadius: Platform.OS === 'ios' ? 16 : 2,
    padding: 20,
    height: 120,
    marginLeft: 10,
    marginRight: 10,
    marginTop: 17,
    justifyContent: 'center',
    shadowRadius: 3,
    shadowOpacity: 0.8,
    shadowColor: 'rgba(0,0,0,0.24)',
    shadowOffset: {
      width: 1,
      height: 3,
    }
  },
})


export default connect(mapStateToProps)(DeckList)
