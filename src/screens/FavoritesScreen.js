import React from "react";
import { View, Text } from "react-native";

import useFavorites from '../hooks/useFavorites'
import RestaurantsList from '../components/RestaurantsList'



const FavoritesScreen = ({ route }) => {
  const [restaurants, isLoading] = useFavorites()

  if (isLoading) {
    return <View>
      <Text>Loading...</Text>
    </View>
  }

  if (!restaurants.length) {
    return <View>
      <Text>At the moment you don't have any favorite restaurants saved</Text>
    </View>
  }

  return (
    <View>
      <RestaurantsList horizontal={false} title="Big Spender" restaurants={restaurants} />
  </View>
  );
};


export default FavoritesScreen;
