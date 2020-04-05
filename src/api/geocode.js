

import axios from 'axios';

export default (lon, lat) => {
  return axios.get(`https://geocode.xyz/${lon},${lat},?json=1`)
}