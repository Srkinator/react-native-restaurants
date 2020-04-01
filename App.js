import React from 'react';
import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { Button } from 'react-native'
import SearchScreen from './src/screens/SearchScreen'
import DetailsScreen from './src/screens/DetailsScreen'
import FavoritesScreen from './src/screens/FavoritesScreen'


const Stack = createStackNavigator();


export default function App() {
  return <NavigationContainer>
    <Stack.Navigator initialRouteName="Home">
      <Stack.Screen
        name="Home"
        component={SearchScreen}
        options={({ navigation, route }) => ({
          headerRight: () => (
          <Button
            onPress={() => navigation.navigate('Favorites')}
            title="Favorites"
            color="black"
          />
        )})
        }
      />
      <Stack.Screen
        name="Details"
        component={DetailsScreen}
      />
      <Stack.Screen
        name="Favorites"
        component={FavoritesScreen}
      />
    </Stack.Navigator>
  </NavigationContainer>
}

