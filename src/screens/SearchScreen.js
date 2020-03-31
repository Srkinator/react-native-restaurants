import React, { useState } from 'react'
import { ScrollView, Text } from 'react-native'
import { filter } from 'ramda'


import SearchBar from '../components/SearchBar'
import useRestaurants from '../hooks/useRestaurants'
import RestaurantsList from '../components/RestaurantsList'

const SearchScreen = () => {
  const [term, setTerm] = useState('')
  const [searchApi, restaurants, error] = useRestaurants()

  const filterRestaurantsByPrice = price => filter(restaurant => restaurant.price === price, restaurants)

  return (
    <>
      <SearchBar
        term={term}
        onTermChange={newTerm => setTerm(newTerm)}
        onTermSubmit={() => searchApi(term)}
      />

      {error ? <Text>{error}</Text> : null}
      <ScrollView>
        <RestaurantsList title="Cost Effective" restaurants={filterRestaurantsByPrice("$")} />
        <RestaurantsList title="Bit Pricier" restaurants={filterRestaurantsByPrice("$$")} />
        <RestaurantsList title="Big Spender" restaurants={filterRestaurantsByPrice("$$$")} />
      </ScrollView>
    </>
  )
}


export default SearchScreen