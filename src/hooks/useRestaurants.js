import { useEffect, useState } from 'react'
import yelp from '../api/yelp'

export default () => {
  const [restaurants, setRestaurants] = useState([])
  const [error, setError] = useState('')

  const searchApi = async (searchTerm) => {
    try {
      const response = await yelp.get('/search', {
        params: {
          term: searchTerm,
          location: 'Miami',
          limit: 50,
        }
      })

      setRestaurants(response.data.businesses)
    } catch (err) {
      setError('Something went wrong!')
    }
  }

  useEffect(() => {
    searchApi('pasta')
  }, [])

  return [searchApi, restaurants, error]
}