import { AsyncStorage } from 'react-native'
import {
  reject,
  contains
 } from 'ramda'



const storeData = async (key, value, refreshStorage) => {
  try {
    // removeData()
    const alreadySavedData = await retrieveData()
    const dataToSave = contains(value, alreadySavedData)
    ? reject(r => r === value, alreadySavedData)
    : [value, ...alreadySavedData]

    await AsyncStorage.setItem(key, JSON.stringify(dataToSave))
    refreshStorage()
    return dataToSave
  } catch (error) {
    // Error saving data
  }
};

const removeData = async (key = 'favRestaurants') => {
  try {
    await AsyncStorage.removeItem(key)
  } catch (error) {
    // Error saving data
  }
};

const retrieveData = async (key = 'favRestaurants') => {
  try {
    const value = await AsyncStorage.getItem(key)
    if (value !== null) {
      return JSON.parse(value)
    }
    return []
  } catch (error) {
    // Error retrieving data
  }
};


module.exports = {
  storeData,
  removeData,
  retrieveData
}
