import React, { useState } from 'react'
import { ScrollView, Text, StyleSheet, View, TouchableOpacity } from 'react-native'
import { Ionicons } from '@expo/vector-icons'

import { filter } from 'ramda'


import SearchBar from '../components/SearchBar'
import useRestaurants from '../hooks/useRestaurants'
import RestaurantsList from '../components/RestaurantsList'

const SearchScreen = () => {
  const [term, setTerm] = useState('')
  const [searchApi, getLocation, restaurants, error] = useRestaurants(setTerm)

  const filterRestaurantsByPrice = price => filter(restaurant => restaurant.price === price, restaurants)

  return (
    <>
      <SearchBar
        term={term}
        onTermChange={newTerm => setTerm(newTerm)}
        onTermSubmit={() => searchApi(term)}
      />
      <TouchableOpacity onPress={getLocation}>
        <View style={styles.backgroundStyle}>
          <Ionicons name="md-locate" style={styles.iconStyle} />
          <Text style={styles.inputStyle}>
            Locate me
          </Text>
        </View>
      </TouchableOpacity>

      {error ? <Text>{error}</Text> : null}
      <ScrollView>
        <RestaurantsList title="Cost Effective" restaurants={filterRestaurantsByPrice("$")} />
        <RestaurantsList title="Bit Pricier" restaurants={filterRestaurantsByPrice("$$")} />
        <RestaurantsList title="Big Spender" restaurants={filterRestaurantsByPrice("$$$")} />
      </ScrollView>
    </>
  )
}


const styles = StyleSheet.create({
  backgroundStyle: {
    backgroundColor: '#F0EEEE',
    height: 50,
    margin: 15,
    borderRadius: 5,
    flexDirection: 'row',
  },
  inputStyle: {
    flex: 1,
    fontSize: 18,
    alignSelf: 'center',
  },
  iconStyle: {
    fontSize: 35,
    alignSelf: 'center',
    marginHorizontal: 10,
    marginTop: 5
  }
})



export default SearchScreen