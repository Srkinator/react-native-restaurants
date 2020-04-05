import React from "react";
import { View, Text, StyleSheet, FlatList, Image, TouchableOpacity } from "react-native";
import { contains } from 'ramda'
import { AntDesign } from '@expo/vector-icons'
import useSingleRestaurant from '../hooks/useSingleRestaurant';
import useStorage from '../hooks/useStorage';
import RestaurantActions from '../components/RestaurantActions'

import { storeData } from '../api/storage'


const DetailsScreen = ({ route }) => {
  const id = route.params.id
  const [getRestaurant, restaurant] = useSingleRestaurant(id)
  const [favRestaurants, refreshStorage] = useStorage()

  if (!restaurant) {
    return null;
  }


  return (
    <View>
      <View style={styles.nameContainer}>
        <Text style={styles.nameStyle}>{restaurant.name}</Text>

        <TouchableOpacity onPress={() => storeData('favRestaurants', id, refreshStorage)}>
          <AntDesign name={contains(id, favRestaurants) ? 'heart' : 'hearto'} style={styles.iconStyle} />
        </TouchableOpacity>
      </View>
      <RestaurantActions restaurant={restaurant} />

      <FlatList
        data={restaurant.photos}
        keyExtractor={photo => photo}
        renderItem={({ item }) => {
          return <Image source={{ uri: item }} style={styles.image} />;
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  image: {
    width: 300,
    height: 200,
    borderRadius: 4
  },
  iconStyle: {
    fontSize: 35,
    alignSelf: 'center',
    marginHorizontal: 10,
    marginBottom: 5,
    color: 'red'
  },
  nameStyle: {
    fontWeight: 'bold',
    fontSize: 20
  },
  nameContainer: {
    flexDirection: 'row',
  }
});

export default DetailsScreen;