import React from 'react'
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'
import { Linking } from 'expo'
import { Ionicons, MaterialIcons, Foundation } from '@expo/vector-icons'
import { map } from 'ramda'



const onCall = number => Linking.openURL(`tel: ${number}`)

const onMessage = number => Linking.openURL(`sms: ${number}`)

const onWeb = url => Linking.openURL(url)

const onMail = email => Linking.openURL(`mailto: ${email}`)


const actionsObj = {
  call: {
    onPress: onCall,
    icon: 'call',
    property: 'phone'
  },
  message: {
    onPress: onMessage,
    icon: 'chatbubbles',
    property: 'phone'
  },
  website: {
    onPress: onWeb,
    icon: 'globe',
    property: 'url'
  },
  mail: {
    onPress: onMail,
    icon: 'mail',
    property: 'email'
  },
}



const RestaurantActions = ({ restaurant, actions = ['call', 'message', 'website', 'mail'] }) => {
  return (
    <View style={styles.container}>
      {map(action => {
        const item = actionsObj[action]
        if (item && restaurant[item.property]) {
          return <TouchableOpacity
            key={item.icon}
            onPress={_ => item.onPress(restaurant[item.property])}
          >
            <Ionicons
              name={`ios-${item.icon}`}
              style={styles.icons}
            />
          </TouchableOpacity>
        }
      }, actions)}
    </View>
  );
};


const styles = StyleSheet.create({
  name: {
    fontWeight: "bold"
  },
  container: {
    flexDirection: 'row',
    // justifyContent: 'center',
    alignItems: 'stretch',
    // flex: 1
  },
  icons: {
    fontSize: 50,
    marginHorizontal: 10
  }
});

export default RestaurantActions;

