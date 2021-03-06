import { useCallback, useState } from 'react'

import { map } from 'ramda'
import { useFocusEffect } from '@react-navigation/native';

import { retrieveData } from '../api/storage'
import yelp from "../api/yelp";


export default () => {
  const [favRestaurants, setFavRestaurants] = useState([])
  const [isLoading, setIsLoading] = useState(false)

  useFocusEffect(
    useCallback(() => {
      getData()
    }, [])
  )

  const getData = async _ => {
    setIsLoading(true)
    try {
      const idsFromStorage = await retrieveData('favRestaurants')
      if (idsFromStorage) {
        const data = await Promise.all(map(r =>  yelp.get(`/${r}`), idsFromStorage))
        setFavRestaurants(map(r => r.data, data))
        setIsLoading(false)
      }
    } catch (e) {
      setIsLoading(false)
    }
  }

  return [favRestaurants, isLoading]
}