import React from "react";
import { View, Text, ScrollView } from "react-native";

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
    <ScrollView>
      <RestaurantsList horizontal={false} title="Big Spender" restaurants={restaurants} />
  </ScrollView>
  );
};


export default FavoritesScreen;
