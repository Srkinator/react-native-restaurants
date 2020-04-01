import { useEffect, useState } from 'react'

import { retrieveData } from '../api/storage'


export default (key = 'favRestaurants') => {
  const [favRestaurants, setFavRestaurants] = useState([])

  useEffect(() => {
    getData()
  }, [])

  const getData = async _ => {
    const res = await retrieveData(key)
    if (res) {
      setFavRestaurants(res)
    }
  }

  return [favRestaurants, getData]
}