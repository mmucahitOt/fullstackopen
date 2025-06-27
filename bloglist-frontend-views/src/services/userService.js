import axios from 'axios'
import generateURL from './serviceConfig'

const USER_API_URL = generateURL('api', 'users')

export const getAll = async (token) => {
  const response = await axios.get(USER_API_URL, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
  return response.data
}
