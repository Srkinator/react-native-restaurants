import { useState, useEffect } from "react";
import yelp from "../api/yelp";

export default id => {
  const [restaurant, setRestaurant] = useState(null);

  const getRestaurant = async id => {
    const response = await yelp.get(`/${id}`);
    setRestaurant(response.data);
  };

  useEffect(() => {
    getRestaurant(id);
  }, [id]);

  return [getRestaurant, restaurant];
};