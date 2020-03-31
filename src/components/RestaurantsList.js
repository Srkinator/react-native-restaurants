import React from 'react'
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native'
import RestaurantDetails from './RestaurantDetails'
import { useNavigation } from '@react-navigation/native';

const RestaurantsList = ({ title, restaurants }) => {
  const navigation = useNavigation()

  const renderItem = ({ item }) => (
    <TouchableOpacity onPress={() => navigation.navigate('Details', { id: item.id })}>
      <RestaurantDetails restaurant={item} />
    </TouchableOpacity>)

  if (!restaurants.length) {
    return null
  }

  return (
    <View style={styles.container}>
      <Text style={styles.titleStyle}>{title}</Text>
      <FlatList
        horizontal
        data={restaurants}
        keyExtractor={restaurant => restaurant.id}
        renderItem={renderItem}
        showsHorizontalScrollIndicator={false}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  titleStyle: {
    fontWeight: 'bold',
    fontSize: 20,
    marginLeft: 15,
    marginBottom: 5,
  },
  container: {
    marginBottom: 10,
  }
})

export default RestaurantsList