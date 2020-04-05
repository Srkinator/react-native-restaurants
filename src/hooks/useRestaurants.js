import { useEffect, useState } from 'react'
import * as Location from 'expo-location';
import * as Permissions from 'expo-permissions';

import yelp from '../api/yelp'
import geocode from '../api/geocode'
import alert from '../api/alert'



export default (setSearchTerm) => {
  const [restaurants, setRestaurants] = useState([])
  const [error, setError] = useState('')

  const searchApi = async (searchTerm = 'pasta') => {
    try {
      const response = await yelp.get('/search', {
        params: {
          term: searchTerm,
          location: 'Los Angeles',
          limit: 50,
        }
      })

      setRestaurants(response.data.businesses)
    } catch (err) {
      setError('Something went wrong!')
    }
  }

  getLocationAsync = async () => {
    let { status } = await Permissions.askAsync(Permissions.LOCATION);
    if (status !== 'granted') {
      alert(
        "Permission to access location was denied",
        "Please allow access in order to use locate me service",
        [
          {
            text: "Cancel",
            onPress: () => console.log("Cancel Pressed"),
            style: "cancel"
          },
          {
            text: "Try again",
            onPress: getLocationAsync,
          }
        ],
      )
    }

    let location = await Location.getCurrentPositionAsync({});
    if (location) {
      geoCodeCoordinates(location.coords.latitude, location.coords.longitude)
    } else {
      alert(
        "Sorry, we couldn't find your location",
        "",
        [
          {
            text: "Try again",
            onPress: getLocationAsync,
            style: "cancel"
          },
          {
            text: "Ok",
            onPress: () => console.log("Cancel Pressed"),
          },
        ],
      )
    }
  }

  const geoCodeCoordinates = async (lat, lon) => {
    const res = await geocode(lat, lon)
    setSearchTerm(res.data.city)
    searchApi(res.data.city)
  }

  useEffect(() => {
    searchApi()
  }, [])

  return [searchApi, getLocationAsync, restaurants, error]
}