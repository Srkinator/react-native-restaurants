import React from "react";
import { View, Text, StyleSheet, FlatList, Image } from "react-native";
import useSingleRestaurant from '../hooks/useSingleRestaurant';



const DetailsScreen = ({ route }) => {
  const id = route.params.id
  const [getRestaurant, restaurant] = useSingleRestaurant(id)

  if (!restaurant) {
    return null;
  }


  return (
    <View>
      <Text>{restaurant.name}</Text>
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
  }
});

export default DetailsScreen;